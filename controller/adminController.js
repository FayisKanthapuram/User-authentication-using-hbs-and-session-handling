import adminSchema from "../model/adminModel.js";
import bcrypt from "bcrypt";

const loadLogin = (req, res) => {
  res.render("admin/login");
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminSchema.findOne({ email });

    if (!admin)
      return res.render("admin/login", { message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch)
      return res.render("admin/login", { message: "Invalid Credentials" });

    req.session.admin = true;

    res.redirect("admin/dashboard");
  } catch (error) {
    res.render("admin/login", { message: "something went wrong" });
  }
};

export default { loadLogin, login };
