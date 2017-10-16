select s.name, s.idSpell as sid from Spell s 
    inner join Compose c on s.idSpell = c.idSpell
    inner join Component co on c.idComponent = co.idComponent 
    where co.libelleComponent='V' --Tous les sorts verboses
    and (Select count(*) from Compose where idSpell = sid)=1 --Seulement les sorts verboses
    and s.isWizard=1 --Tous les sorts du  Wizard
    and s.level<=4 -- De niveau <= 4
    order by s.name; --On classe par orde alphabétique pour simplifier la lecture

select s.name, s.idSpell as sid from Spell s 
    inner join Compose c on s.idSpell = c.idSpell
    inner join Component co on c.idComponent = co.idComponent 
    where co.libelleComponent='V'
    and (Select count(*) from Compose where idSpell = sid)=1 
    and s.isWizard=1 
    and s.level<=4
    order by s.name; 
