Cette partie du projet consiste à executer une requette qui permet de trouver un sort qui sauve un sorcier dans dongeons et dragons. Cette partie utilise seulement SQL car le but était de comparer map_reduce/mongoDB à une architecture "basique" en SQL. 

Pour lancer l'execution du projet il suffit d'executer le fichier createDB.py

BDDScript.sql
=============
Contient la requette sql pour répondre à l'énnoncé, celle-ci est commentée pour expliquer chaque ligne

createDB.py
=============
Script python (python3) qui crée la BDD à l'aide du fichier de DATA généré par le parseur
Il affiche aussi le résultat de la requette SQL à la fin.

DandDspells.db
==============
DataBase générée par le script python et utilisée pour faire la requette

Data.json
=========
Fichier contenant tous les spells

MCD.png
=======
Image montrant notre modèle de base de données normalisé (Merise)

