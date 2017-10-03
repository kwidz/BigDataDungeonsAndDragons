var mapFunction1 = function() {
	emit(this.name, this.level,this.isWizard, this.components, this.description);
};
var reduceFunction1 = function(keyName, keyLevel, keyIsWizard, keyTableComp, keyDescr) {
	if(keyLevel <4 && keyIsWizard && (keyTableComp.indexOf(" V") != -1 )){
        return keyName + " " + keyDescr;
	}
	
};
db.spells.mapReduce(
	mapFunction1,
	reduceFunction1,
	{ out: "map_reduce_saving_spell" }
	)
