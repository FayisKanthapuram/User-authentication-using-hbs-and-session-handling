const loadHome=(req,res)=>{
    res.render("common/home", { title: "Home page" });
}

const load404=(req,res)=>{
    res.render('common/404',{page:req.params.id})
}

export default {loadHome,load404};