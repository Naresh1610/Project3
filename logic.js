var fs = require("fs");
var database =  require('../databaseconnection/mongoDB')


//logic.js conatins the API methods

//Get the data from json file 
function Get(req, res){
    database.MongoGet(res)
 }
 
//Post Data
function Post(req, res){
   let a = req.body  //receievesJSON data
   database.MongoInsert(a,res)
   
 }

//Get Particular Data
function GetSpecific(req, res){
    var location = req.param('location')
    var date = req.param('date')
    //res.end( username ); 
    database.MongoGetSpecific(req,res,location,date);
 }

 //Get Highest Data
 function Highest(req,res){
    database.Highest(req,res);
 }

 //Update
 function Update(req,res){
   let a = req.body  //receievesJSON data
   var data = req.param('data')
   database.MongoUpdate(a,res,data)
 }
//Export methods in the file logic.js
 module.exports = {Get,Post,GetSpecific,Highest,Update}