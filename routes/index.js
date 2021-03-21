var express = require('express');
var router = express.Router();


var Registration = require('../models/Registration');
var Product = require('../models/Product');
var Contact = require('../models/Contact');
var Catagory = require('../models/Catagory');



var bodyParser = require('body-parser')
var session = require('express-session');
const bcrypt = require("bcrypt");


var session = require('express-session');
router.use(session({
  name : 'app.sid',
  secret: "1234567890QWERTY",
  resave: true,
  saveUninitialized: true
}));


/* GET home page. */
router.get('/', (req, res) => {
	if(!req.session.password){ 
  		res.render('login')
	}else{
  		res.redirect('/home')
	}
})



 
router.get('/home',(req,res)=>{
	if(!req.session.password){
		console.log("success2");
		res.redirect('/');		
	}else{
		var password = req.session.password
		var username = req.session.username	
			Catagory.count({}, function (err, count){				
				res.render('home',{
						password:password,
						username:username,						
						count:count,
						Loginsuccess: req.flash('Loginsuccess')
					});
		});
	}
})



router.post('/auth', (req, res) => {
	const username  = req.body.username;
	const password  = req.body.password;
	Registration.findOne({username})
		.then(user => {
			if(user){
				bcrypt.compare(password, user.password, function(err, result) {					
					console.log(result);
      				 if(result){
      					req.session.password = password;      					      					
      					req.session.username = username; 
      					req.flash('Loginsuccess', 'Login is success');       					
						res.redirect('/home');						
      				 }else{      				 	
						res.redirect('/');
      				 }
				});
				}else{
				res.redirect('/');
			}
		}) 
})


router.get('/logout',(req,res)=>{
	console.log("req.session.password");
	console.log(req.session.password);
  req.session.destroy(function (err) {
  	if(!err){
  		res.locals.title = "Abel's Home Page";  
    	res.redirect('/'); 
  	}
   });
})


router.get('/regi', (req, res) => {
	// if(!req.session.password){				
	//  	res.redirect('/');
	// }else{
 	res.render('regis')
	// }
})


router.post('/regissubmit', (req, res) => {	
	const kitte = new Registration({
    		username:req.body.username,
    		email:req.body.email,
    		password:req.body.password,    		
    		conpassword:req.body.conpassword
  		});
  	kitte.save();
    res.redirect("/");
})






const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rajondemo:NhV17jjarIbpk2v4@cluster0.s63fi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/test', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(data=>{
		console.log("connecting successfully");
	})
	.catch(error=> {
		console.log(error);
	})



module.exports = router;
