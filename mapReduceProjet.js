/**
* Created by edmond on 2015-11-15.
*/

var MongoClient = require('mongodb').MongoClient(),
   test = require('assert');
MongoClient.connect('mongodb://localhost:27017/DandDspells', function(err, db) {

   // Create a test collection
   var collection = db.collection('spells');





       //Map utilise l'objet this
       var map = function () {

          	var level = this.level
			var isWizard = this.isWizard
			var components = this.components
			var description = this.description
			var name = this.name
           // print("Full objet emit");
           //print(vertex, this);
           emit(level,isWizard); //Re-émettre la même chose


       };

       //Find lowest distance and write it
       var reduce = function (key, values)
       {
       emit(key,values);
       };

       //tf = test function
    
           // Peform the map reduce
   collection.mapReduce(map, reduce, {out: {replace: "spells2"}})
           
db.close();
console.log("fin");

 })