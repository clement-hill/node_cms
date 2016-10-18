/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  req.session.user = {name:"管理员",gender:1,id:1};
  if (req.session.user || req.url.indexOf("login/submit")>-1) {
    return next();
  }
  return res.redirect("/login");
};
