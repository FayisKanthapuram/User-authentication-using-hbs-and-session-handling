import userSchema from "../model/userModel.js";
import bcrypt from "bcrypt";

const saltround = 10;

const registerUser = async (req, res) => {
  try {
    const { email, password ,username} = req.body;

    const user = await userSchema.findOne({ email });

    if (user)
      return res.render("user/register", { message: "User already exist" ,title:"Sign up"});

    const hashedPassword = await bcrypt.hash(password, saltround);

    const newUser = new userSchema({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.render("user/login", { message: "User Created Successfully" ,title:"User Login"});
  } catch (error) {
    res.render("user/register", { message: "something went wrong" ,title:"Sign up"});
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user)
      return res.render("user/login", { message: "User does not exit" ,title:"User Login"});

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.render("user/login", { message: "Incorrect Password" ,title:"User Login"});
    
    req.session.user=user.username;

    res.render("user/home", { message: "Login Successfully" ,user:user.username,title:"User Dashboard"});
  } catch (error) {
    res.render("user/login", { message: "something went wrong" ,title:"User Login"});
  }
};

const logout=(req,res)=>{
  req.session.user=null;
  res.redirect('/user/login');
}

const loadRegister = (req, res) => {
  res.render("user/register",{title:"User SignUp"});
};

const loadLogin = (req, res) => {
  res.render("user/login",{title:"User Login"});
};

const loadHome = (req, res) => {
  res.render('user/home',{user:req.session.user,title:"User Dashboard"});
};

export default { registerUser, loadLogin, loadRegister, login,loadHome ,logout};
