/**
* Created by edmond on 2015-11-15.
*/

var MongoClient = require('mongodb').MongoClient(),
   test = require('assert');
MongoClient.connect('mongodb://localhost:27017/DandDspells', function(err, db) {

   // Create a test collection
   var collection = db.collection('pageRank');
   //Pour garder le chemin, enregistrer un backpointer.
   var graph =
       [
           { _id:"PageA" ,  value:{ backpointer: "", changed: false, type: "full", poid: 0, pointeVers: ["PageB", "PageC"], estPointePar: ["PageC"]}},
           { _id:"PageB", value:{ backpointer: "",changed: false,type: "full", poid: Infinity, pointeVers: ["PageC"], estPointePar: ["PageA"]}},
           {_id:"PageC",value:{ backpointer: "",changed: false,type: "full", poid: Infinity, pointeVers: ["PageA"], estPointePar: ["PageA","PageB"]}},
           { _id:"PageD", value:{ backpointer: "",changed: false,type: "full", poid: Infinity, pointeVers: ["PageC"], estPointePar: []}}
       ];

   // console.log(graph);

   collection.removeMany(); //Efface tout (sync)

   // Insert some documents to perform map reduce over
   //Utilise une promise
   collection.insertMany(graph, {w:1}).then(function (result) {

       //Map utilise l'objet this
       var map = function () {

           //    print(tojson(this));

           var name = this._id;
           var pointeVers = this.value.pointeVers;
           var estPointePar = this.value.estPointePar;
           var poid = this.value.poid;

           // print("Full objet emit");
           //print(vertex, this);
           emit(name, this.value); //Re-émettre la même chose

           if (poid== Infinity) return; //Si la distance est infinie, pas besoin d'emitter des trucs...

           for (var i = 0; i < pointeVers.length; i++) {

               var pagePointe = pointeVers[i]; //valere, julien etc
               //  print(adj, distance+1);
               var objet = {type:"compact", poid:poid+1, backpointer:name};

               //   print("map ", adj, tojson(objet));
               emit(pagePointe, objet);
           }

       };

       //Find lowest distance and write it
       var reduce = function (key, values)
       {
           print("1er Reduce : ", tojson(key), tojson(values));
           var full = {};

           //First, find the original one
           for (var i = 0; i < values.length; i++)
           {
               var val = values[i];
               if (val.type == "full") {
                   full = val;
               }
           }

           //On met full a "aucun changement"
           full.changed = false;

           //Then improve on it
           for (var i = 0; i < values.length; i++)
           {
               var val = values[i];
               if (val.type == "compact") {
                   if (val.poid < full.poid) {
                       full.changed = true;
                       full.poid = val.poid;
                       full.backpointer = val.backpointer;
                   }
               }
           }

           print("Full object de ", key);
           print(tojson(full));
           return full;
       };

       //tf = test function
       function bfs_iteration(i, max, cb)
       {
           // Peform the map reduce
           collection.mapReduce(map, reduce, {out: {replace: "pageRank"}})
           .then(function (collection)
           {
               collection.find().toArray()
                   .then(function (docs)
                   {
                       console.log(docs);
                       console.log("************************************************************************");
                       console.log("************************************************************************");
                       console.log("************************************************************************");

                       //1ere condition d'arrêt. Le graphe converge (algo fini)
                       //Sinon, on a egalement un maximum d'iterations
                       //Nombre max d'iterations atteint
                       console.log("VALEUR DE I = ", i);
                       if (i == max)
                           cb();

                       // Peform a simple find and return all the documents
                       collection.find({"value.changed": true}).toArray()
                           .then(function (docs)
                           {

                               console.log("GROS LOG DES DOCS TROUVES");
                               console.log("************************************************************************");
                               console.log(docs);

                               if (docs.length == 0) {
                                   console.log("SORTIE TAKEN");
                                   cb();
                               }
                               else {
                                   console.log("ENCORE UNE ITERATION");
                                   bfs_iteration(i + 1, max, cb);
                               }
                           })
                   })
           })
       }

   bfs_iteration(0, 10, function fin() {
       console.log("Fin du programme!!!");
       db.close();
   })

})
}) 
