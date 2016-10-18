module.exports = {
  file:function(){},
  web:function(req,res){
    var url = req.url.substr(1).replace(/\.htm.*/,"");
    var tmpData = Util.initTempData(req,url);
    tmpData.layout = true;
    // user - data
    tmpData.user = req.session.user;
    // orther - data
    if(tmpData._load){
      tmpData._load(req,res,tmpData,function(){
        res.view(tmpData.tmp,tmpData);
      });
    }else{
      res.view(tmpData.tmp,tmpData);
    }
  },
  tmp:function(req,res){
    var url = req.url.substr(1).replace(/\.tmp.*/,"");
    var tmpData = Util.initTempData(req,url);
    tmpData.layout = false;
    // user - data
    tmpData.user = req.session.user;
    //
    if(tmpData._load){
      tmpData._load(req,res,tmpData);
    }else{
      res.view(tmpData.tmp,tmpData);
    }
  },
  action:function(req,res){
    var arr = req.url.substr(1).split("/");
    var _controller = sails.controllers[arr[0]];
    var name = arr[1];
    if(name && _controller && _controller[name]){
      _controller[name](req,res);
    }else{
      res.view("404",{layout:false});
    }
  },

  //
  mobile:function(req,res){
    //var tmpData = Util.initTempData(req);
    //tmpData.layout = false;
    //tmpData.data.tableName = "table";
    //tmpData.data.search = "table";
    //Article.find(tmpData.data);
    res.view("mobile",{layout:false});
  }
};
