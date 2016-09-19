CONFIG = {
  SHOWMENU: true,
  VMCONTENT: void 0
};
function RS(res, callback) {
  var body = res.body;
  if (body.s == 0) {
    callback(body.msg);
  } else {
    alert("error");
  }
};

define(function(require, exports, module) {
  require('editor-config');
  require('editor');
  require('vue-gesture');
  require('vue-resource');

  // head
  CONFIG.__b_header = new Vue({
    el: ".b_header",
    data: {
      CONFIG: CONFIG
    },
    methods: {
      click_menu_btn: function () {
        CONFIG.SHOWMENU = !CONFIG.SHOWMENU;
      }
    }
  });

  //menu
  CONFIG.__b_menu = new Vue({
    el: '.b_menu',
    data: {
      CONFIG: CONFIG,
      showIndex: -1,
      active: -1,
      list: [
        {id: 0, url: "article", text: "Jpress面板", icon: ""},
        {
          id: 1, text: "文章", icon: "fa-file-text-o", children: [
          {id: 10, url: "article", text: "所有文章", icon: ""},
          {id: 11, url: "article_add", text: "撰写文章", icon: ""},
          {id: 12, url: "article_category", text: "分类", icon: ""},
          {id: 13, url: "article_special", text: "专题", icon: ""},
          {id: 14, url: "article_tip", text: "标签", icon: ""},
          {id: 15, url: "article_opinion", text: "评论", icon: ""}
        ]
        },
        {
          id: 2, text: "论坛", icon: "fa-file-text-o", children: [
          {id: 20, url: "article", text: "所有帖子", icon: ""},
          {id: 21, url: "article", text: "发布帖子", icon: ""},
          {id: 22, url: "article", text: "板块", icon: ""},
          {id: 23, url: "article", text: "标签", icon: ""},
          {id: 24, url: "article", text: "所有回帖", icon: ""}
        ]
        },
        {
          id: 3, text: "附件", icon: "fa-file-text-o", children: [
          {id: 30, url: "article", text: "所有附件", icon: ""},
          {id: 31, url: "article", text: "上传", icon: ""}
        ]
        },
        {
          id: 4, text: "微信", icon: "fa-file-text-o", children: [
          {id: 40, url: "article", text: "自动回复", icon: ""},
          {id: 41, url: "article", text: "默认回复", icon: ""},
          {id: 42, url: "article", text: "菜单设置", icon: ""},
          {id: 43, url: "article", text: "默认设置", icon: ""}
        ]
        },
        {
          id: 5, text: "用户", icon: "fa-file-text-o", children: [
          {id: 50, url: "article", text: "所有用户", icon: ""},
          {id: 51, url: "article", text: "添加", icon: ""},
          {id: 52, url: "article", text: "我的资料", icon: ""}
        ]
        },
        {
          id: 6, text: "模板", icon: "fa-file-text-o", children: [
          {id: 60, url: "article", text: "所有模板", icon: ""},
          {id: 61, url: "article", text: "模板安装", icon: ""},
          {id: 62, url: "article", text: "菜单", icon: ""},
          {id: 63, url: "article", text: "设置", icon: ""},
          {id: 64, url: "article", text: "编辑", icon: ""}
        ]
        },
        {
          id: 7, text: "插件", icon: "fa-file-text-o", children: [
          {id: 70, url: "article", text: "所有插件", icon: ""},
          {id: 71, url: "article", text: "安装", icon: ""}
        ]
        },
        {
          id: 8, text: "设置", icon: "fa-file-text-o", children: [
          {id: 80, url: "article", text: "常规", icon: ""},
          {id: 81, url: "article", text: "评论", icon: ""},
          {id: 82, url: "article", text: "通知", icon: ""},
          {id: 83, url: "article", text: "SEO", icon: ""},
          {id: 84, url: "article", text: "水印", icon: ""},
          {id: 85, url: "article", text: "连接形式", icon: ""},
          {id: 86, url: "article", text: "登陆注册", icon: ""},
          {id: 87, url: "article", text: "CDN加速", icon: ""},
          {id: 88, url: "article", text: "API应用", icon: ""}
        ]
        },
        {
          id: 9, text: "工具", icon: "fa-file-text-o", children: [
          {id: 90, url: "article", text: "导入", icon: ""},
          {id: 91, url: "article", text: "导出", icon: ""},
          {id: 92, url: "article", text: "同步", icon: ""}
        ]
        }

      ]
    },
    methods: {
      click_menu_list: function (one,paramData) {
        var _this = this;
        if (one.url) {
          _this.$data.active = one.id;
          var temp_url = "/web/" + one.url + ".html";
          var js_url = "/js/web/"+one.url.split("_")[0];
          seajs.use(js_url);
          _this.$http.get(temp_url).then(function (res) {// 加载内容
            if (CONFIG.VMCONTENT) {
              CONFIG.VMCONTENT.$destroy();
            }
            var myVmFn = CONFIG[one.url];
            var myComponent = Vue.extend({
              template: res.body
            });
            document.getElementById("b_content_html").innerHTML = "";
            CONFIG.VMCONTENT = myVmFn(myComponent,paramData);
            CONFIG.VMCONTENT.$mount().$appendTo('#b_content_html');
            CONFIG.VMCONTENT.$emit("afterEvent");
          });
        } else if (one.children.length) {
          if (_this.$data.showIndex == one.id) {
            _this.$data.showIndex = -1;
          } else {
            _this.$data.showIndex = one.id;
          }
        }
      }
    }
  });

  //menu
  CONFIG.__b_content = new Vue({
    el: '.b_content',
    data: {
      CONFIG: CONFIG
    },
    methods: {
      action_show_menu: function (val) {
        CONFIG.SHOWMENU = val;
      }
    }
  });
});


