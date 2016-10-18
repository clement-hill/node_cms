module.exports = {
  article:function(param,cb){
    var data;
    if(param.search){
      data = [{id:1,categoryid:1,title:"test",content:'xxx',category:"文章"}];
    }else{
      data = [
        {id:1,categoryid:1,title:"test",content:'xxx',category:"文章"},
        {id:2,categoryid:1,title:"test2",content:'xxx1',category:"文章2"},
        {id:3,categoryid:1,title:"test3",content:'xxx2',category:"文章3"},
        {id:4,categoryid:1,title:"test4",content:'xxx3',category:"文章4"},
        {id:5,categoryid:1,title:"test5",content:'xxx4',category:"文章5"},
        {id:6,categoryid:1,title:"test6",content:'xxx5',category:"文章6"},
        {id:7,categoryid:1,title:"test7",content:'xxx6',category:"文章7"},
        {id:8,categoryid:1,title:"test8",content:'xxx7',category:"文章8"},
        {id:9,categoryid:1,title:"test9",content:'xxx8',category:"文章9"}
      ];
    }
    cb(this.page(data,param));
  },
  page:function(data,param){
    var size = data.length;
    var page = param.page;
    var pageSize = param.pageSize;
    var pageCount = Math.ceil(size/pageSize);
    var start = (page-1) * pageSize;
    var end = start + pageSize;
    return {
      s:0,
      rs:{
        list:data.splice(start,end),
        page:page,
        size:size,
        pageSize:pageSize
      }
    }
  }
}
