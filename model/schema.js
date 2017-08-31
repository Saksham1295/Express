const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema({
	name : {type: String, required: true},
	age : Number,
	address : String,
},{collection:'userData',versionKey: false});

module.exports = mongoose.model('userData',schema);