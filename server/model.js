var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

//require('../secret'); Uncomment to run on local env

var connect=mongoose.connect(process.env.MONGO_URI);

autoIncrement.initialize(connect)

var urlSchema=new Schema({
	original:String,
	modified:String,
	_id:Number
});

urlSchema.plugin(autoIncrement.plugin,'Url')

module.exports= connect.model('Url',urlSchema)





