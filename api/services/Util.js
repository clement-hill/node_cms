module.exports = {
  initTempData:function(req,url){
    var rs = {
      $data:{},
      $search:{// 当前搜索参数
        search:req.param("search"),
        pageIndex:req.param("page"),
        pageSize:req.param("pageSize")
      },
      tableName:req.param("tableName"),// 当前操作表
      param:Util.param,
      tmp:req.param("tmp")
    };
    // url
    if(url){
      var arr = url.split("/");
      var _controller = sails.controllers[arr[0]];
      var _functionName = arr[1];
      if(_controller && _controller[_functionName]){
        rs._load = _controller[_functionName];
      }
      if(!rs.tmp){
        rs.tmp = "tmp/"+_functionName;
      }
    }else{
      rs.tmp = "tmp/index";
    }

    return rs;
  },
  param:function(obj){
    var arr = [];
    for(var key in obj){
      arr.push(key+":"+obj[key]);
    }
    return arr.join("&");
  }

};
