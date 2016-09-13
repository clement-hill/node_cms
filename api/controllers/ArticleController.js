/**
 * ContentController
 *
 * @description :: Server-side logic for managing contents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find:function(req,res){
    JpressContent.find({}).exec(function(error,list){
      res.send(Rs.ok(list));
    });
  },
  add:function(req,res){
    JpressContent.create(req.body).exec(function(error,list){
      if(error){
        res.send(Rs.bad(""));
      }else{
        res.send(Rs.ok(""));
      }
    });

  },
  update:function(req,res){
    var opr = req.body;
    JpressContent.update(opr.id,opr).exec(function(error,list){
      if(error){
        res.send(Rs.bad(""));
      }else{
        res.send(Rs.ok(""));
      }
    });
  },
  del:function(req,res){
    var opr = req.param("id");
    if(opr){
      JpressContent.destroy({id:opr}).exec(function(error,list){
        if(error){
          res.send(Rs.bad(error));
        }else{
          res.send(Rs.ok(""));
        }
      });
    }
  }
};

