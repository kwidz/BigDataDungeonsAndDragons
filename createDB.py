# -*- coding:utf-8 -*-
import json
import sqlite3

JSON_FILE = "data.json"
DB_FILE = "DandDspells.db"

with open(JSON_FILE) as data_file:
    myspells=json.load(data_file)
conn = sqlite3.connect(DB_FILE)
i=1
c = conn.cursor()
for spell in myspells:
    name=spell["name"]
    level=int(spell["level"])
    isWizard=1 if (spell["isWizard"]) else 0
    print(isWizard)
    spellResistance=1 if (spell["spell_resistance"]) else 0
    description=str(["description"])
    data=[i,name,level,isWizard,spellResistance,description]
    #print(data)    
    c.execute('insert into Spell(idSpell,name,level,isWizard,spellResistance, description) values(?,?,?,?,?,?)',data)
    for component in spell["components"]:
        if(component==" V"):
            data=[i,1]
            c.execute('insert into Compose values (?,?)', data)

        if(component==" S"):
            data=[i,2]
            c.execute('insert into Compose values (?,?)', data)
        if(component==" M"):
            data=[i,3]
            c.execute('insert into Compose values (?,?)', data)
    i+=1
conn.commit()
c.close()
