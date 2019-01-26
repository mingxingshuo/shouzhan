var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url);

var ReplySchema = new Schema({
    code:Number,
    type:Number, //事件类型:0文本 1点击 2关注
    replyType:Number,//返回类型:0文字或图文 1图片
    text:String, //请求发送的文字
    key:String, //请求点击的key
    url:String,
    showUrl:String,
    media:Object,
    msgId:Number
});

var ReplyModel = db.model('Reply', ReplySchema);
module.exports = ReplyModel;

