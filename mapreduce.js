var mapFunction1 = function() {
	if(this.isWizard){
emit(this.name);
	}else{
emit("NON");
	}

	
};
var reduceFunction1 = function(result) {
        return result ;
	
};
db.spells.mapReduce(
	mapFunction1,
	reduceFunction1,
	{ out: "map_reduce_saving_spell" }
	)

//&& data.isWizard  == true && (data.components.indexOf(" V") != -1 )

/*	emit(this.name, {
		"level" : this.level,
		"isWizard" : this.isWizard,
		"components" : this.components,
		"description" : this.description
	});*/

//	if(this.isWizard && this.level<4 && (data.components.indexOf(" V") != -1 ){
