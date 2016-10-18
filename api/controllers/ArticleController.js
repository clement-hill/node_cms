module.exports = {
  article:function(req,res,data){
    //Promise.all([
    //  Article.get(data,"/article")
    //]).then(function(){
    //  sails.log(data);
    //  cb();
    //});
    var name = data.tableName || (data.tableName = "tableArticle");
    CMSApi.table(data,"/article",{
      url:'article/article',
      isPage:true,
      isCheckOne:true,
      columns:[
        {name:"id",text:"",hidden:"1"},
        {name:"categoryid",text:"",hidden:"1"},
        {name:"title",text:"标题",style:{width:"150px"}},
        {name:"content",text:"内容",style:{width:"150px",'max-height':'60px',overflow:'hidden'}},
        {name:"category",text:"类别",style:{width:"150px"},template:function(v){
          var list = ["新闻","媒体"];
          v || (v = 0);
          return list[v];
        }}
      ]
    },function(){
      res.view(data.tmp,data);
    });
  },
  article_category:function(req,res,data){
    var name = data.tableName || (data.tableName = "tableArticleCategory");
    data.$data[name] = {
      url:'article/article',
      columns:[
        {name:"title",text:"标题",style:{width:"150px"}},
        {name:"content",text:"内容",style:{width:"150px",'max-height':'60px',overflow:'hidden'}},
        {name:"category",text:"类别",style:{width:"150px"},template:function(v){
          var list = ["新闻","媒体"];
          v || (v = 0);
          return list[v];
        }},
        {name:"id",text:"",hidden:"1"},
        {name:"categoryid",text:"",hidden:"1"}
      ],
      data:[
        {id:1,content:"title",title:"图片测试",children:[
          {id:11,name:"title",title:"妹子"},
          {id:12,name:"title",title:"家具"}
        ]},
        {id:2,content:"title",title:"下载测试",children:[
          {id:21,name:"title",title:"jar"},
          {id:22,name:"title",title:"tar"}
        ]}
      ]
    };
    res.view(data.tmp,data);
  },
  //
  put:function(req,res){
    var data = req.body;
    CMSApi.http({path:"/article",method:"put"},data,function(msg){
      res.send(msg);
    });
  },
  post:function(req,res){
    var data = req.body;
    CMSApi.http({path:"/article",method:"post"},data,function(msg){
      res.send(msg);
    });
  },
  del:function(req,res){
    var data = req.body;
    CMSApi.http({path:"/article/"+data.ids,method:"delete"},"",function(msg){
      res.send(msg);
    });
  }
};
