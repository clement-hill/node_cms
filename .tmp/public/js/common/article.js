// menu_index
CONFIG.article = function (component) {
  var vm = new component({
    parent: CONFIG.__b_content,
    data: {
      checkAllFlag: false,
      list: []
    },
    methods: {
      action_show_menu: function (val) {
        CONFIG.SHOWMENU = val;
      },
      click_checkAll: function (e) {
        var $data = this.$data;
        $data.list.map(function (v) {
          v.checked = !$data.checkAllFlag;
        });
      }
    }
  });
  vm.$on("afterEvent", function () {
    var _this = this;
    _this.$http.get("article", "").then(function (res) {
      RS(res, function (rs) {
        rs.map(function (v) {
          v.checked = false;
        });
        _this.$set("list", rs);
      });
    });
  });
  return vm;
};
// menu_article_add
CONFIG.article_add = function (component) {
  var vm = new component({
    parent: CONFIG.__b_content,
    data: {
      attributeSettingIndex: 0,
      data: {
        title: ""
      }
    },
    methods: {
      postActicle: function () {
        var _this = this;
        var data = _this.$data.data;
        _this.$http.post("article", data).then(function (res) {
          RS(res, function () {
            alert("ok");
          });
        });
      }
    }
  });
  vm.$on("afterEvent", function () {
    UE.delEditor("editor");
    UE.getEditor('editor');
  });
  return vm;
};
