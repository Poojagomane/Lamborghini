var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/lamborghiniDB", { useUnifiedTopology: true, useNewUrlParser: true });
const SECRET= "shinchan";
const carSchema= new mongoose.Schema({
    car_name: String,
    model: String,
    powerCV: String,
    powerKW: String,
    speed: String,
    acceleration: String,
    desc1: String,
    desc2: String,
    desc3: String,
    audio: String,
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    img5: String,
    img6: String,
    dummy_name: String,
    dummy_image: String
});

const loginSchema= new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String
});
const Car= mongoose.model("car",carSchema);
const Login= mongoose.model("login",loginSchema);

router.get('/cars/:name', function(req,res){
  Car.find({model: req.params.name}, function(err,result){
    if(result){
      res.status(200).send(result);
    }
    else
    {
      res.status(200).send(err);
    }
  });
});

router.get('/header/:carname', function(req,res){
  Car.find({dummy_name: req.params.carname}, function(err,result){
    if(result){
      res.status(200).send(result);
    }
    else
    {
      res.status(200).send(err);
    }
  });
});
router.post('/login', function(req,res){
  Login.findOne({email: req.body.email, password: req.body.password}, function(err, result){
    if(result){
      var payload = {
        first_name : result.first_name
      }
      var token= jwt.sign(payload,SECRET);

      res.status(200).send({
        "access_token":token,
        "message":"Login Successful"
      });
    }
    else
    {
      res.status(200).send(err);
    }
  });
});

router.post('/register', function(req,res){
  const customer = new Login({
    first_name: req.body.first_name,
  last_name: req.body.last_name,
  email: req.body.email,
  password: req.body.password
  });

  customer.save(function(err){
    if(!err){
      res.status(200).send({
        message: "Successful Registered!"
      });
    }
    else
    {
      res.status(200).send(err);
    }
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Express' });
 res.send("Hi");
});

module.exports = router;
