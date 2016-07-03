var express=require("express");
var bodyParser = require('body-parser')
var app=express();
var exphbs = require('hbs');


var port=process.env.PORT||3000;

app.use('/',express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'hbs');

require('./server/routes')(app);


app.listen(port,function(){
  console.log("Express server is listening on port ")
})
