// DESSINER LE JOUEUR (SLIMY)
export function DrawPlayer(){
	if (nbAtome > 0) {
		for(var i = 0; i < drawables.length; i++){
			drawables[i].Draw();
		}
	} else if (nbAtome <= 0) {		
		context.drawImage(mort,mortPerso.Steps[mortPerso.IdleAnimationStep][0],
		mortPerso.Steps[mortPerso.IdleAnimationStep][1],mortPerso.Steps[mortPerso.IdleAnimationStep][2],
		mortPerso.Steps[mortPerso.IdleAnimationStep][3],joueur.x,joueur.y,15*8,15*8);
		mortslimy.play();
	}
}

// DESSINER L'ENNEMI
export function DrawEnemy(){

	for (var i = 0, enemy; i < window.ennemi.length; i++){
		enemy = window.ennemi[i];

		if (enemy.type == 1) {
			context.drawImage(ennemis,enemy.x,enemy.y,enemy.width,enemy.height);
		} else if (enemy.type == 2){
			context.drawImage(ennemis1,enemy.x,enemy.y,enemy.width,enemy.height);
		} else if (enemy.type == 3){
			context.drawImage(atkEnemy3,atkEnnemi3.Steps[atkEnnemi3.IdleAnimationStep][0],
			atkEnnemi3.Steps[atkEnnemi3.IdleAnimationStep][1],atkEnnemi3.Steps[atkEnnemi3.IdleAnimationStep][2],
			atkEnnemi3.Steps[atkEnnemi3.IdleAnimationStep][3],enemy.x,enemy.y,enemy.width,enemy.height);	
		}
	}
}

// DESSINER LE BOSS
export function DrawBoss(){
	for (var i = 0, Fboss; i < window.bossStats.length; i++){
		Fboss = window.bossStats[i];

		if (bossMort === false) {
			context.drawImage(bossImg,theBoss.Steps[theBoss.IdleAnimationStep][0],
			theBoss.Steps[theBoss.IdleAnimationStep][1],theBoss.Steps[theBoss.IdleAnimationStep][2],
			theBoss.Steps[theBoss.IdleAnimationStep][3],Fboss.x,Fboss.y,Fboss.width,Fboss.height);
		} else {
			context.drawImage(mort,theBossDeath.Steps[theBossDeath.IdleAnimationStep][0],
			theBossDeath.Steps[theBossDeath.IdleAnimationStep][1],theBossDeath.Steps[theBossDeath.IdleAnimationStep][2],
			theBossDeath.Steps[theBossDeath.IdleAnimationStep][3],Fboss.x,Fboss.y,Fboss.width,Fboss.height);
		}

	}
}

// DESSINER L'ATOME
export function DrawItem(){
	for (var i = 0, objet; i < window.objets.length; i++){
		objet = window.objets[i];
		context.drawImage(item,objet.x,objet.y,objet.width,objet.height);
		context.drawImage(bonus,theBonus.Steps[theBonus.IdleAnimationStep][0],
		theBonus.Steps[theBonus.IdleAnimationStep][1],theBonus.Steps[theBonus.IdleAnimationStep][2],
		theBonus.Steps[theBonus.IdleAnimationStep][3],objet.x,objet.y,objet.width,objet.height);
	}
}