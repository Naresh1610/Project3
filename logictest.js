var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://172.18.6.142:27017/FountainHead';
var str = "";

app.route('/name').get(function(req, res) {
   MongoClient.connect(url, function(err, db) {
       var collection = db.collection('junket');
       var cursor = collection.find({});
       str = "";
       cursor.forEach(function(item) {
           if (item != null) {
                   str = str + "    Name  " + item.name + "</br>";
           }
       }, function(err) {
           res.send(str);
           db.close();
          }
       );
   });
});
var server = app.listen(3001, function() {});