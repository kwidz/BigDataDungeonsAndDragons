/**
* Created by edmond on 2015-11-15.
*/

var MongoClient = require('mongodb').MongoClient(),
test = require('assert');
MongoClient.connect('mongodb://localhost:27017/DandDspells', function(err, db) {

   // Create a test collection
   var collection = db.collection('spells');

   var map = function () {

   	var level = this.level;
   	var isWizard = this.isWizard;
   	var components = this.components;
   	var description = this.description;
   	var name = this.name;
   	var sortUtilisable = true;

   	if(isWizard == true  && level<4 && (components.indexOf(" V") != -1)){
   		sortUtilisable = "oui";
   	}else{
		sortUtilisable = "non";
   	}
   	var obj= {level:level, isWizard:isWizard,components:components,sortUtilisable:sortUtilisable};
	emit(this.name,obj);

   };


   var reduce = function (key, values)
   {
   		emit(key,values);
   };

   collection.mapReduce(map, reduce, {out: {replace: "spells2"}})

   db.close();
   console.log("fin");

})