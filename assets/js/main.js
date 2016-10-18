require.config({
  baseUrl:"/",
  //urlArgs:function(url,moduleName){},
  paths: {
    'text':'js/require.text',
    /* libs */
    'index':'js/index',
    'jquery':'js/jquery',
    'base64':'js/Base64',
    'util':'js/Util',
    'luck':'js/dialog/luck',
    'datepicker':"js/datepicker",
    'ZeroClipboard':"js/ueditor/third-party/ZeroClipboard/ZeroClipboard",
    'ueditor':'js/ueditor/ueditor.all',
    'ueconfig':'js/ueditor/ueditor.config'
  },
  map: {
    '*': {
      'css': 'js/require.css'
    }
  },
  shim:{
    "util":{
      deps:["jquery"]
    },
    "luck":['css!js/dialog/luck.css'],
    "ueditor":{
      deps:["ueconfig"]
    }
  }
});
//
require(["jquery","util","base64","luck"],function(){
  window.Base64 = new Base64();

  require(['ZeroClipboard',"index",'ueconfig','ueditor','datepicker'],function(ZeroClipboard){
    window['ZeroClipboard'] = ZeroClipboard;
    window.bodyHeight = window.body.offsetHeight - 150;
  });
});


