import {changeGame} from './utils.js';

// AJOUT DE L'APPARITION DE L'ATOME
export function SpawnAtome(){
	if (score >= 750 && nbAtome < 3) {
		if (Date.now() - spawnObjet.lastPop > spawnObjet.cadencePop && game == "vertical" && gameover === false) {
			window.objets.push({
				x : Math.floor((Math.random() * 415	)+ 185),
				y : -250,
				width : 250,
				height : 250,
				vitesse : 3,
				direction : Math.PI/2,
				checkCollision : function(){
					for (var i = 0, objet; i < window.objets.length; i++){
						objet = window.objets[i];

						if (objet.y-20 <= joueur.y && objet.y+100 >= joueur.y && objet.x-10 <= joueur.x && objet.x+150 >= joueur.x) {
							window.objets.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
							nbAtome++;
							setInterval(changeGame, 10);
						}
					}
				}

			});

			spawnObjet.lastPop = Date.now();
		} else if (Date.now() - spawnObjet.lastPop > spawnObjet.cadencePop && game == "horizontal" && gameover === false) {
			window.objets.push({
				x : 950,
				y : Math.floor((Math.random() * 385)+ 185),
				width : 250,
				height : 250,
				vitesse : 3,
				direction : -Math.PI,
				checkCollision : function(){
					for (var i = 0, objet; i < window.objets.length; i++){
						objet = window.objets[i];

						if (objet.y-20 <= joueur.y && objet.y+100 >= joueur.y && objet.x-10 <= joueur.x && objet.x+150 >= joueur.x) {
							window.objets.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
							nbAtome++;
							setInterval(changeGame, 10);
						}
					}
				}

			});

			spawnObjet.lastPop = Date.now();
		}
		
		
		for (var i = 0, objet; i < window.objets.length; i++){
			objet = window.objets[i];

			if (gameover === false && game == "vertical") {
				objet.x += Math.cos(objet.direction) * objet.vitesse;
				objet.y += Math.sin(objet.direction) * objet.vitesse;
			} else if (gameover === false && game == "horizontal") {
				objet.x += Math.cos(objet.direction) * objet.vitesse;
				objet.y += Math.sin(objet.direction) * objet.vitesse;
			} else if (gameover === true) {
				objet.x = objet.x;
				objet.y = objet.y;
			}

			if (game == "vertical" && objet.x < 185 || objet.x > 975 || objet.y < -275 || objet.y > canvas.height) {
				window.objets.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
			}
		}


		for (var j = objets.length - 1; j >= 0; j--) {
			objets[j].checkCollision();
		}
	}
}

// AJOUT DE L'APPARITION DE L'ATOME
export function SpawnBoss(){
	if (score >= 5000 && nbAtome >= 3 && boss === false && bossMort === false && game == "horizontal") {
		boss = true;
		tirEnnemis = [];
		ennemi = [];

		window.bossStats.push({
			x : 950,
			y : Math.floor((Math.random() * 385)+ 185),
			width : 300,
			height : 300,
			vitesse : 3,
			cadenceTir : 1500,
			tempsDernierTir : 0,
			direction : -Math.PI
		});		
	}



	for (var i = 0, Fboss; i < window.bossStats.length; i++){
		Fboss = window.bossStats[i];

		if (gameover === false && Fboss.x > 600) {
			Fboss.x += Math.cos(Fboss.direction) * Fboss.vitesse;
			Fboss.y += Math.floor((Math.random() * 30)- 15);
		} else if (gameover === false && Fboss.x <= 600) {
			Fboss.y += Math.floor((Math.random() * 30)- 15);			
		} else if (gameover === true) {
			Fboss.x = Fboss.x;
			Fboss.y = Fboss.y;
		}

		if (Fboss.y < 150 || Fboss.y > 550) {
			Fboss.y = 350;
		}
	}
}