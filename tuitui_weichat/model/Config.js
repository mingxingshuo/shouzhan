var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url);
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

var ConfigSchema = new Schema({
    name: String,
    appid: String,
    appsecret: String,
    token: String,
    EncodingAESKey: {type: String, default: "tw4a1yTUv0VJURGNif96ibI4z3oWPJJWpuo2mHTvzLb"},
    status: {type: Number, default: -2},  // -2未接管,-1接管中,1已接管
    group: {type: String, default: ""}
});

ConfigSchema.plugin(autoIncrement.plugin, {
    model: 'Config',
    field: 'code',
    startAt: 1,
    incrementBy: 1
});

var ConfigModel = db.model('Config', ConfigSchema);
module.exports = ConfigModel;

