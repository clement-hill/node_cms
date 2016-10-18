
$(function(){
  $("body").click(function(e){
    // clear dropdown
    var $dorpdown = $(".dropdown.open");
    if($dorpdown.length && $dorpdown.has(e.target).length<1){
      $dorpdown.removeClass("open");
    }
  });
  // 默认
  CLICK("body",{
    dropdown:function(e){
      var isOpen = this.className.indexOf("open")>-1;
      if(isOpen){
        this.className = this.className.replace("open","").trim();
      }else{
        $(".dropdown").removeClass("open");
        this.className += " open";
      }
    },
    tab:function(e){
      var title = e.target.getAttribute("d-title");
      if(title && !e.target.className){
        var $this = $(this);
        var _t = $(e.target);
        _t.addClass("active").siblings().removeClass("active");
        $this.find('[d-content="'+title+'"]').addClass("active").siblings().removeClass("active");
      }
    }
  });
  //
  CLICK("#b_menu",{
    onMenuClick:function(e){
      var $t = e.target.nodeName=="A"?$(e.target):$(e.target).parent("a");
      var url = $t.attr("d-url");
      if($t.length<1){
        return;
      }
      //
      if(url){
        MENU(url);
      }else{
        var $parent = $t.parent();
        var cls = $parent.attr("class");
        cls?$parent.removeClass("active"):$parent.addClass("active");
      }
    }
  });

});
