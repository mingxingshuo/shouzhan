var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var TuiGuangSchema = new Schema({
    type: Number,
	id: String,
	pageTitle: String,
	articleTit: String,
	name: String,
	desc: String,
	picurl: String,
	capter1: String,
	capter2: String,
	linkUrl: String,
	statisticsUrl1: String,
	statisticsUrl2: String,
	tokenCodes: String,
	channel: String,
	remarks: String
});

var TuiGuangModel = db.model('TuiGuang', TuiGuangSchema);
module.exports = TuiGuangModel;
