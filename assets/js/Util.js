$(function(){
  // == event
  var CLICK = function(name,fns){
    $.extend(CLICK.fns,fns);
    //
    var $el = $(name);
    for(var key in fns){
      (function(key){
        $el.off("click."+key).on('click.'+key,'.'+key,function(event){
          if(CLICK.fns[key]){
            CLICK.fns[key].call(this,event);
          }
        });
      })(key)
    }
  };
  CLICK.fns = {};
  // self - event
  window.ON = function(name,events){
    for(var key in events){
      $(name).off(key).on(key,events[key]);
    }
  };
  //
  var MENU = function(url,param,data){
    var boxName = url.split("/").pop();
    $("#b_menu a.active").removeClass("active");
    $("#b_menu a[d-url='"+url+"']").addClass("active");
    $.ajax({
      url:url+".tmp"+(param?"?"+ $.param(param):""),
      type:"get",
      success:function(res){
        $("#body").html('<div id="'+boxName+'">'+res+'</div>').ready(function(){
          $("#"+boxName).trigger("after",data);
        });
      },
      error:function(e) {
        $("#body").html('<div class="error-body">'+e.status + ': 加载失败了！</div>');
      }
    });
  };

  window.CLICK = CLICK;
  window.ON = ON;
  window.MENU = MENU;



  // self === table  ============================================
  $.fn.table = function(type,data){
    var opts = $(this).data("options");
    switch(type){
      case 'get':
        return opts[type];
        break;
      default:
        return opts[type] && opts[type](data);
        break;
    }
  };
  // self === form  ============================================
  $.fn.form = function(type,data){
    var _this = this;
    switch(type){
      case 'get':
        return formDataFn.call(_this);
        break;
      case 'set':
        return formSetFn.call(_this,data);
        break;
      case 'clear':
        return formClearFn.call(_this,data);
        break;
    };
  };
  function formClearFn(){
    var $dom = $(this).find("[name]");
    var val = "";
    $dom.each(function(i,one){
      var nodeName = one.nodeName;
      switch(nodeName){
        case 'INPUT':
          $(one).val(val);
          break;
        case 'TEXTAREA':
          $(one).val(val);
          break;
        case 'SELECT':
          $(one).val(val);
          break;
        case 'DIV':
          $(one).setAttr('val',val);
          break;
      }
    });
  };
  function formDataFn(){
    var obj = {};
    $(this).find("[name]").each(function(i,one){
      var nodeName = one.nodeName;
      var name = one.getAttribute("name");
      var val;
      switch(nodeName){
        case 'INPUT':
          val = $(one).val();
          break;
        case 'TEXTAREA':
          val = $(one).val();
          break;
        case 'SELECT':
          val = $(one).val();
          break;
        case 'DIV':
          val = decodeURIComponent($(one).attr('val'));
          break;
      }
      obj[name] = val;
    });
    return obj;
  };
  function formSetFn(data){
    for(var key in data){
      var $dom = $(this).find("[name='"+key+"']");
      var val = data[key];
      $dom.each(function(i,one){
        var nodeName = one.nodeName;
        switch(nodeName){
          case 'INPUT':
            $(one).val(val);
            break;
          case 'TEXTAREA':
            $(one).val(val);
            break;
          case 'SELECT':
            $(one).val(val);
            break;
          case 'TD':
            $(one).setAttr('value',encodeURIComponent(val));
            break;
        }
      });
    }
  };
});
