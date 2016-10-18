module.exports = {
  hostname:'127.0.0.1',
  port:'8080',
  http:function(opt,params,cb){
    const http = require('http');
    const iconv = require('iconv-lite');
    opt.hostname = this.hostname;
    opt.port = this.port;

    // 配置
    if(params && opt.method=="get") {
      var paramArr = [];
      for (var key in params) {
        params[key] && (paramArr.push([key] + "=" + params[key]));
      }
      opt.path += "?" + paramArr.join("&");
    }else{
      opt.headers = {'Content-Type':'application/json'};
    }

    // 发起请求 sails.log(opt);
    sails.log.debug("http-api :  "+opt.method+"   :    "+opt.path+"");
    var request=http.request(opt,function(response){
      var result = "";
      response.on('data', function (chunk) {
        var context = iconv.decode(chunk, 'utf8');
        result += context;
      }).on('end',function(){
        if(result.indexOf("<html>")===-1){// 过滤 ：接口返回异常页面
          try{
            result = JSON.parse(result.replace(/\n/g, ''));
            cb(result);
          }catch(e){
            cb({"s":1,"msg":"返回值不是json！"});
          }
        }else{
          cb({"s":1,"msg":"网络异常"});
        }
      });
    }).on('error', function(e) {
      cb({"s":1,"msg":"网络异常"});
    });
    // 结束
    if(opt.method!="get" && params){
      if(typeof params == "object"){
        params = JSON.stringify(params);
      }
      console.log(opt.path +"("+opt.method+") : params ->"+params);
      request.write(params);
    }
    request.end();
  },

  // === 加载表数据 ===
  table:function(obj,url,config,cb){
    var tableName = obj.tableName;
    obj.$data[tableName] = config;
    //TestApi.article(_this._param(obj.$search),function(res){
    //  if(res.s==0){
    //    _this._result(config,res.rs);
    //  }
    //})
    var _this = this;
    CMSApi.http({path:url,method:"get"},_this._param(obj.$search),function(res){
      if(res.s==0){
        _this._result(obj.$data[tableName],res);
      }
      cb();
    });
  },

  _param:function(obj){
    var pageIndex = obj.pageIndex || 1;
    var pageSize = obj.pageSize || 5;
    return {
      pageIndex:pageIndex,
      pageSize:pageSize,
      queryParams:obj.search
    }
  },
  _result:function(obj,result){
    var limit = 2;// 页码限制
    var page = result.pageIndex;
    var size = result.totalRowCount;
    var pageSize = result.pageSize;
    //
    var pageCount = Math.ceil(size/pageSize);
    var pageStart = page - limit;
    var pageEnd = page + limit;
    pageStart < 1 && (pageStart = 1);
    pageEnd > pageCount && (pageEnd = pageCount);

    obj.page = page;
    obj.size = size;
    obj.pageSize = pageSize;
    obj.pageCount = pageCount;
    obj.pageStart = pageStart;
    obj.pageEnd = pageEnd;
    obj.data = result.list;
  }
};
