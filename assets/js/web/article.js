seajs.use("/js/lodash");
// menu_index
CONFIG.article = function (component) {
  var vm = new component({
    parent: CONFIG.__b_content,
    data: {
      checkAllFlag: false,
      checkOprFlag:"",
      list: []
    },
    methods: {
      http_get:function(){
        var _this = this;
        this.$http.get("article", "").then(function (res) {
          RS(res, function (rs) {
            rs.map(function (v) {
              v.checked = false;
            });
            _this.$set("list",rs);
          });
        });
      },
      http_del:function(arr,callback){
        if(arr.length!=1){
          alert("请选择一条数据");
          return;
        }
        this.$http.delete("article",{params:{id:arr.join(",")}}).then(function (res) {
          RS(res, function (rs) {
            callback(rs);
          });
        });
      },
      action_show_menu: function (val) {
        CONFIG.SHOWMENU = val;
      },
      click_checkAll: function (e) {
        var $data = this.$data;
        $data.list.map(function (v) {
          v.checked = !$data.checkAllFlag;
        });
      },
      click_opr:function(){
        var _this = this;
        var $data = _this.$data;

        if($data.checkOprFlag=="del"){
          var delArr = [];
          $data.list.map(function(v){
            if(v.checked){
              delArr.push(v.id);
            }
          });
          _this.http_del(delArr,function(){
            _this.http_get();
          });
        }
      },
      dclick_show:function(one){
        console.log("alert")
        CONFIG.__b_menu.click_menu_list({url:"article_add"},one);
      }
    }
  });
  vm.$on("afterEvent", function () {
    this.http_get();
  });
  return vm;
};
// menu_article_add
CONFIG.article_add = function (component,one) {
  one || (one = {});
  var vm_data = {
    id:one.id,
    title:one.title,
    text:one.text
  };
  //
  var vm = new component({
    data: {
      attributeSettingIndex: 0,
      data:vm_data
    },
    methods: {
      http_post: function (data) {
        data.id = void 0;
        this.$http.post("article", data).then(function (res) {
          RS(res, function () {
            alert("ok");
          });
        });
      },
      http_put: function (data) {
        if(data.id){
          this.$http.put("article", data).then(function (res) {
            RS(res, function () {
              alert("ok");
            });
          });
        }
      },
      //
      click_noteActicle:function(){
        var _this = this;
        var data = _this.$data.data;
        data.text = UE.getEditor("editor").getContent();
        if(data.id){
          _this.http_put(data);
        }else{
          _this.http_post(data);
        }
      }
    }
  });
  vm.$on("afterEvent", function () {
    var text = this.$data.data.text;
    UE.delEditor("editor");
    UE.getEditor('editor').ready(function(){
      if(text){
        UE.getEditor('editor').setContent(text);
      }
    });
  });
  return vm;
};
