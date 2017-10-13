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

   	if(isWizard == true  && level<=4 && (components.indexOf(" V") != -1) && components.length == 1){
   		sortUtilisable = true;
   	}else{
   		sortUtilisable = false;
   	}
   	var obj= {level:level, isWizard:isWizard,components:components,sortUtilisable:sortUtilisable};
   	emit(this.name,obj);

   };


   var reduce = function (key, values)
   {
   	emit(key,values);
   	
   };

   collection.mapReduce(map, reduce, {out: {replace: "spells2"}}).then(function (collection)
   {
   	collection.find().toArray()
   	.then(function (docs)
   	{
   		for(var i=0;i<docs.length;i++){
   			  //console.log(docs[i]);
   			  if(docs[i] != null){
   			  	if(docs[i].value != null){
   			  		var boolSortUtilisable = docs[i].value.sortUtilisable;
   				if(boolSortUtilisable == true){
   					console.log(docs[i]._id);
   				}
   			  	}
   			  }
   				

   			
   		}
   		//console.log(docs);


   		db.close();
   		console.log("fin");
   	})
   })



})