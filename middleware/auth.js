const checkSession =(req,res,next)=>{
    if(req.session.user&& req.session.user.role == 'user'){
        next();
    }else{
        res.redirect('/user/login');
    }
}
const isLogin =(req,res,next)=>{
    if(req.session.user&& req.session.user.role == 'user'){
        res.redirect('/user/home')
    }else{
        next();
    }
}

function isAdmin(req,res,next)
{
    if (req.session?.user?.role === "admin") {
        return res.status(403).render('common/accessDenied',{title:"Denied Access"})
    }
    next();
}

export default {checkSession,isLogin,isAdmin}; 