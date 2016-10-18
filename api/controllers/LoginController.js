module.exports = {
  submit:function(req,res){
    var param = req.body;
    User.login(param,function(info){
      if(info.id){
        req.session.user = info;
        res.redirect("/");
      }else{
        res.view("login",{layout:false,msg:info});
      }
    });
  }
};
