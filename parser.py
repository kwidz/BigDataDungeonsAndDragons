#!/usr/bin/python3
import json
from lxml import html
import requests

def generURL(a):
    url = 'http://www.dxcontent.com/SDB_SpellBlock.asp?SDBID='+str(a)
    return url


data=[]
for i in range(1,1972):
    if(i!=1841):
        print(i)
        url = generURL(i)
        page = requests.get(url)
        tree = html.fromstring(page.content)
        name=tree.xpath("/html/body/div[2]/div[2]/div[1]/p/text()")
        #print(name)
        levels=tree.xpath("/html/body/div[2]/div[2]/p[1]/text()[2]")
        levels=levels[0]
        levelList=(levels.split(","))
        level=10000000
        isWizard=False
        for i in levelList :
            #print(i)
            if 'wizard' in i:
                #print("#################### SUCCESS ##############")
                level=int(i.split(' ')[-1])
                isWizard=True
            #else:
                #print("#################### FAIL ##############")
        if level==10000000:
            level=int(levelList[0].split(' ')[-1])


        components=tree.xpath("/html/body/div[2]/div[2]/p[3]/text()")
        components=components[0].split(',')

        #print(components)
        spell_resistance=tree.xpath("/html/body/div[2]/div[2]/p[7]/text()[2]")
        if spell_resistance=='no':
            spell_resistance=False
        else:
            spell_resistance=True
        #print(spell_resistance)
        description=tree.xpath("/html/body/div[2]/div[2]/div[5]/p/text()")
        #print(description)
        data.append({
            "name":name[0],
            "level":level,
            "isWizard":isWizard,
            "components":components,
            "spell_resistance":spell_resistance,
            "description":description
        
        })
print()
print(data)
with open('data.json', 'w') as outfile:  
    json.dump(data, outfile)

