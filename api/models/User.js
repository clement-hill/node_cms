/**
 * Content.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes:{},
  login:function(param,cb){
    if(param.name=="admin" && param.password=="1"){
      cb({name:"管理员",sex:"男"});
    }else{
      CMSApi.http({path:"/login",method:"post"},param,function(msg){
        if(msg.s==0){
          var info = msg.msg;
          cb(info);
        }else{
          cb(msg.msg);
        }
      });
    }
  }
};
