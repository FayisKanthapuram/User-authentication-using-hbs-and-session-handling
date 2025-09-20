import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js"
import adminRoutes from "./routes/admin.js"
import connectDB from "./db/connectDB.js";
import session from "express-session";
import nocache from "nocache";
import auth from "./middleware/auth.js";

dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;


app.set('view engine','hbs');
app.use(express.static('public'));

app.use(
  session({
    secret: "mySecretKey",
    resave: false, //only saved if something changes in req.session(it improves performence)
    saveUninitialized: true, //save new session if it empty
    cookie: {
      httpOnly: true, // prevents client-side JS from reading cookie
      secure: false, // set true only if using HTTPS
      sameSite: "strict", // cross-site is not allowed
      maxAge: 1000 * 60 * 60, // session lasts 1 hour
    },
  })
);

app.use(nocache())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

console.log()


app.get('/',auth.isLogin,(req,res)=>{
    res.render('home',{title:"Home page"});
})

app.use('/user',userRoutes);
app.use('/admin',adminRoutes);








connectDB();
app.listen(PORT,()=>{
    console.log('===============================================');
    console.log('\tServer listen at the port',PORT);
    console.log('===============================================');
})