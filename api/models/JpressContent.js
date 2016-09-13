/**
 * Content.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: true,
  tableName:"content",
  connection:"someMysqlServer",
  attributes: {
    id:{
      type: 'integer',
      unique: true,
      primaryKey: true
    },
    title:"STRING",//标题
    // 内容
    text:"STRING",//
    user_id:"STRING",//作者
    moudle:"STRING",//专题
    created:"STRING" // 创建时间
  }
};

