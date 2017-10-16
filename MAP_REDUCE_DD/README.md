Cette partie du projet consiste à executer un algorithme de map_reduce avec mongoDB afin de découvrir le sort utile à pitto pour se sortir de sa mauvaise posture ! 

Pour lancer l'execution du projet il suffit d'executer le fichier mapReduceProjet.js
(node mapReduceProjet.js)

formatted.json
==============
exemple sur un  nombre limité de sorts de notre fichier data.json en mode formaté pour une meilleure lisibilité.
On peut voir l'architecture correctement avec les différents attributs : 
name -> Nom du sort 
level -> Niveau du sort (Si plusieurs niveaux on prend le niveau du wizard)
isWizard -> Étant donné que nous avons choisi de prendre tous les sorts (y compris ceux qui n'appartiennent pas au wizard, il fallait un moyen de savoir que le sort était utilisable par un wizard
components -> composition du sort (V,S,M)
spell_resistance -> resistance 
description -> description du sort

Data.json
=========
Fichier contenant tous les spells.

mapReduceProjet.js
=======
fichier clé de l'exercice qui permet de créer la BDD, la replir avec les valuers de data.json et afficher le résultat de la requette. 
