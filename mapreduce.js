var mapFunction1 = function() {
	var level = this.level,
	var isWizard = this.isWizard
	var components = this.components
	var description = this.description
	
	if( this.isWizard == false ){
		return;
	}
	if( his.level>4){
		return;
	}
	if( (data.components.indexOf(" V") == -1){
		return;
	}
	var objet = {level:level, isWizard=isWizard,description=description}

	emit(description,objet)

};
var reduceFunction1 = function(result) {
emit(result)
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


	/*
	
	if(this.isWizard == true  && this.level<4 && (data.components.indexOf(" V") != -1 ){
		emit(this.name,this.isWizard);
	}*/