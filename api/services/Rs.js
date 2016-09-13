/**
 */

module.exports = {
  ok:function(msg){
    return {s:0,msg:msg};
  },
  bad:function(msg){
    return {s:1,msg:msg};
  }
};

