import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import commonRoutes from "./routes/common.js";
import connectDB from "./db/connectDB.js";
import session from "express-session";
import nocache from "nocache";
import path from "path";
const __dirname = path.resolve();
import hbs from "hbs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Set view engine
app.set("view engine", "hbs");

// Register helper to start index from 1
hbs.registerHelper("inc", function (value) {
  return parseInt(value) + 1;
});

app.use(express.static("public"));

app.use(
  session({
    secret: "mySecretKey",
    resave: false, // only saved if something changes in req.session (it improves performance)
    saveUninitialized: true, // save new session if it empty
    cookie: {
      httpOnly: true, // prevents client-side JS from reading cookie
      secure: false, // set true only if using HTTPS
      sameSite: "strict", // cross-site is not allowed
      maxAge: 1000 * 60 * 60, // session lasts 1 hour
    },
  })
);

app.use(nocache());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/", commonRoutes);
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "404.html"));
});

connectDB();
app.listen(PORT, () => {
  console.log("===============================================");
  console.log("\tServer listen at the port", PORT);
  console.log("===============================================");
});
