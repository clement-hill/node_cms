

module.exports = {
  index:function(req,res){
    var url = req.url.substr(1).replace(".html","");
    res.view(url,{layout:false});
  },

  file:function(req,res){
    req.file('avatar').upload(function (err, uploadedFiles) {
      sails.log(uploadedFiles);
      res.send(Rs.ok(""));
    });
  }
};
