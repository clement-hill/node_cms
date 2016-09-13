

module.exports = {
  index:function(req,res){
    var url = req.url.substr(1).replace(".html","");
    res.view(url,{layout:false});
  }
};
