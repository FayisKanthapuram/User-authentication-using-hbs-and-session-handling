const checkSession = (req, res, next) => {
  if (req.session.user && req.session.user.role == "admin") {
    next();
  } else {
    res.redirect("/admin/login");
  }
};
const isLogin = (req, res, next) => {
  if (req.session.user && req.session.user.role == "admin") {
    res.redirect("/admin/dashboard");
  } else {
    next();
  }
};

function isUser(req,res,next)
{
    if (req.session?.user?.role === "user") {
        return res.status(403).render('common/accessDenied',{title:"Denied Access"})
    }
    next();
}

export default { checkSession, isLogin ,isUser};
