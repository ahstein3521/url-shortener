var validator = require('valid-url');
var Link=require('./model');
var url=require('url');
var ROOT_URL="https://fcc-3.herokuapp.com/" //'http://localhost:3000/';

module.exports=function(req,res,next){
    var link=!req.body.link? url.parse(req.url).path.replace("/new/","").toLowerCase() : req.body.link; 


    if(!validator.isUri(link)){
      return next(null,{error:"Not a valid URL format"})
    }
    else{
      Link.findOne({original:link},function(error,data){
        if(error){
          return next(error,null)
        }
        else if(!data){         
          Link.create({original:link},function(err,d){
            if(err){
              return next(err,null)
            }
              // res.render('results',{origninal:link+":",link:ROOT_URL+d._id}) 
            return next(null,{origninal:link , link:ROOT_URL+d._id})   
          })
        }
        else{  
          // res.render('results',{original:data.original ,link:ROOT_URL+data._id})
          return next(null,{original:data.original , link:ROOT_URL+data._id})
        }     
      })
    }
}    
