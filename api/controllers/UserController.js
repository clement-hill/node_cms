module.exports = {
  user:function(req,res,data){
    //Promise.all([
    //  Article.get(data,"/article")
    //]).then(function(){
    //  sails.log(data);
    //  cb();
    //});
    var name = data.tableName || (data.tableName = "tableUser");
    CMSApi.table(data,"/user",{
      url:'user/user',
      isCheckOne:true,
      columns:[
        {name:"id",text:"",hidden:"1"},
        {name:"name",text:"用户名",style:{width:"150px"}},
        {name:"nickname",text:"别名",template:function(v){return v || ""}},
        {name:"createtime",text:"创建时间"}
      ]
    },function(){
      res.view(data.tmp,data);
    });
  },
  put:function(req,res){
    var data = req.body;
    CMSApi.http({path:"/user",method:"put"},data,function(msg){
      res.send(msg);
    });
  },
  post:function(req,res){
    var data = req.body;
    CMSApi.http({path:"/user",method:"post"},data,function(msg){
      res.send(msg);
    });
  },
  del:function(req,res){
    var data = req.body;
    CMSApi.http({path:"/user/"+data.ids,method:"delete"},"",function(msg){
      res.send(msg);
    });
  }
};
