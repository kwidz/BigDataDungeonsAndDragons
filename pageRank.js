/**
* Created by edmond on 2015-11-15.
*/

var MongoClient = require('mongodb').MongoClient(),
test = require('assert');
MongoClient.connect('mongodb://localhost:27017/BddPageRank', function(err, db) {

   // Create a test collection
   var collection = db.collection('pageRank');
   //Pour garder le chemin, enregistrer un backpointer.
   var graph =
   [
   { _id:"PageA" ,  value:{ pageRank:1, pointeVers: ["PageB", "PageC"], estPointePar: ["PageC"]}},
   { _id:"PageB", value:{ pageRank:1, pointeVers: ["PageC"], estPointePar: ["PageA"]}},
   {_id:"PageC",value:{ pageRank:1, pointeVers: ["PageA"], estPointePar: ["PageA","PageB","PageD"]}},
   { _id:"PageD", value:{ pageRank:1, pointeVers: ["PageC"], estPointePar: []}}
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
           var pageRank = this.value.pageRank;

          emit(name, 0); //Re-émettre la même chose


           for (var i = 0; i < pointeVers.length; i++) {

               var pagePointe = pointeVers[i]; //valere, julien etc
               //  print(adj, distance+1);
               var pageRankModifie = pageRank/pointeVers.length;

               //   print("map ", adj, tojson(objet));
               emit(pagePointe, pageRankModifie);
             }

             emit(name,pointeVers);

           };

       //Find lowest distance and write it
       var reduce = function (key, values)
       {

        var pointeVers = [];
        var pageRank = 0;

        for(var i=0;i<values.length;i++){
          if (values[i] instanceof Array ){
            pointeVers =values[i];
          }else{
            pageRank += values[i];
          }


        }

        pageRank = 1 - 0.85 + ( 0.85 * pageRank);
        return {name:key,pageRank:pageRank,pointeVers:pointeVers};


      }

      collection.mapReduce(map, reduce, {out: {replace: "pageR"}}).then(function (collection)
      {
        collection.find().toArray()
        .then(function (docs)
        {
         
      console.log(docs);


      db.close();
      console.log("fin");
    });
      });

});

    });
