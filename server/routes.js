var Link=require('./model');
var url=require('url')
var shorten=require('./url-shortener')


module.exports=function(app){
	
	app.get('/all',function(req,res){
	  Link.find({},function(error,data){
		var results=error?error:data;
		res.send(results)
	  })
	})//display entire db

	app.get('/:url',function(req,res){
		Link.findOne({_id:req.params.url}, function(error,data){
			if(error|| !data){
				return res.status(422)
						  .json({error:"The URL you entered can not be located in our database"})
			}
			return res.redirect(data.original)
		})
	})//Redirect a shortened url 

	app.get('/new/:url*',function(req,res){

		shorten(req,res,function(err,d){
			if(err){
				return res.status(422).json({error:err});
			}
			res.send(d)
		})
		
	})

	app.post('/new',function(req,res){
		shorten(req,res,function(err,d){
			if(err){
				return res.status(422).json({error:err});
			}
			res.render('results',d)
		})
	})
}
