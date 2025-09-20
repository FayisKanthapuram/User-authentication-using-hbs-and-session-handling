import adminSchema from "../model/adminModel.js";
import userSchema from "../model/userModel.js";
import bcrypt from "bcrypt";
const saltround = 10;

const loadLogin = (req, res) => {
  res.render("admin/login", { title: "Admin Login Page" });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminSchema.findOne({ email });

    if (!admin)
      return res.render("admin/login", {
        message: "Invalid Credentials",
        title: "Admin Login Page",
      });

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch)
      return res.render("admin/login", {
        message: "Invalid Credentials",
        title: "Admin Login Page",
      });

    req.session.admin = admin.username;
    req.session.login = admin.username;
    res.redirect("/admin/dashboard");
  } catch (error) {
    res.render("admin/login", {
      message: "something went wrong",
      title: "Admin Login Page",
    });
  }
};

const laodDashboard = async (req, res) => {
  try {
    const users = await userSchema.find();
    let message = "";

    if (req.session.userLoggined) {
      message = "User already exist";
    } else if (req.session.addUser) {
      message = req.session.addUser + " Added Successfully";
    } else if (req.session.deleteUser) {
      message = req.session.deleteUser + " Deleted Successfully";
    } else if (req.session.editUser) {
      message = req.session.editUser + " Edited Successfully";
    } else if (req.session.login) {
      message = req.session.login + " Login Successfully";
    }

    res.render("admin/dashboard", {
      adminName: req.session.admin,
      title: "Admin Dashboard",
      users: users,
      message: message,
    });
    // reset session messages (optional)
    req.session.userLoggined = null;
    req.session.addUser = null;
    req.session.deleteUser = null;
    req.session.editUser = null;
    req.session.login = null;
  } catch (error) {
    res.status(404).send("Failed to load Dashboard");
  }
};

const logout = (req, res) => {
  req.session.admin = null;
  res.redirect("/admin/login");
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    await userSchema.findOneAndUpdate(
      { _id: id },
      { $set: { email, username } }
    );

    req.session.editUser = username;
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findOne({ _id: id });
    await userSchema.findOneAndDelete({ _id: id });
    req.session.deleteUser = user.username;
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const user = await userSchema.findOne({ email });

    if (user) {
      req.session.userLoggined = email;
      return res.redirect("/admin/dashboard");
    }

    const hashedPassword = await bcrypt.hash(password, saltround);

    const newUser = new userSchema({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    req.session.addUser = username;
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export default {
  loadLogin,
  login,
  laodDashboard,
  logout,
  editUser,
  deleteUser,
  addUser,
};
