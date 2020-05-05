var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


//post function
function MongoInsert(myobj, res){
       MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("connected")
        var dbo = db.db("FountainHead");
        dbo.collection("covid").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
      });
    });
    res.end( "posted successfully" );
}


function MongoGet(res){
    MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     console.log("connected")
     var dbo = db.db("FountainHead");
     dbo.collection("covid").find({}).toArray(function(err, result) {
        if (err) throw err;
        //console.log(result);
        db.close();
        res.end( JSON.stringify(result, null,2) );
      });
    });
}

function Highest(req,res){
  MongoClient.connect(url,function(err,db){
    if (err) throw err;
    var dbo = db.db("FountainHead");
    var query = [
      {$unwind : "$covid"},
      {
          "$group" : {
              _id: null, max: { $max : "$covid.total_cases" }}}]
  
dbo.collection("covid").aggregate(query).toArray(function(err, result) {
  if (err) throw err;
  //console.log(result);
  db.close();
  res.end( JSON.stringify(result,null,2) );
});
}); 
}




function MongoGetSpecific(req,res,location,date){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("FountainHead");
    var query = [{ $match : {"covid.location": location, "covid.date": date}},{ $unwind : "$covid" },{ $match : {"covid.location": location,"covid.date": date}}];
    dbo.collection("covid").aggregate(query).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      db.close();
      res.end( JSON.stringify(result,null,2) );
    });
  }); 
}


//post function
function MongoUpdate(myobj, res,){
  MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   console.log("connected")
   var dbo = db.db("FountainHead");
  query = { "data":data}
  newvalues = {$push:{"covid":{$each:[myobj]}}}
  console.log(myobj);
  dbo.collection("covid").updateMany(query, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
res.end( "updated successfully" );
}


//Export methods in the file mongoDB.js
module.exports = {MongoInsert,MongoGet,MongoGetSpecific,Highest,MongoUpdate}