import {badEnd, goodEnd} from './end.js';

// AJOUT DES MOUVEMENTS DU JOUEUR
export function MovePlayer(){

	if (window.keyboard.gauche && joueur.x > 185 && game == "vertical" && gameover === false) {
		joueur.x -= joueur.vitesse;
	}

	if (window.keyboard.droite && joueur.x < 615 && game == "vertical" && gameover === false) {
		joueur.x += joueur.vitesse;
	}

	if (window.keyboard.haut && joueur.y > 200 && game == "horizontal" && gameover === false) {
		joueur.y -= joueur.vitesse;
	}

	if (window.keyboard.bas && joueur.y < 600 && game == "horizontal" && gameover === false) {
		joueur.y += joueur.vitesse;
	}
}

// AJOUT DES MOUVEMENTS DE L'ENNEMI
export function MoveEnnemies(){
	if (Date.now() - spawn.lastPop > spawn.cadencePop && gameover === false && game == "vertical" && wait === false) {
		window.ennemi.push({
			x : Math.floor((Math.random() * 415	)+ 185),
			y : -50,
			width : 80,
			height : 80,
			vitesse : 3,
			cadenceTir : 1500,
			tempsDernierTir : 0,
			direction : Math.PI/2,
			move : Math.floor((Math.random() *100)+ 1),
			type : Math.floor((Math.random() *3)+ 1),
			// type : 3,
			checkCollision : function(){
			for (var i = 0, enemy; i < window.ennemi.length; i++){
				enemy = window.ennemi[i];

				if (enemy.y-100 <= joueur.y && enemy.y+enemy.height >= joueur.y && enemy.x-75 <= joueur.x && enemy.x+50 >= joueur.x) {
					window.ennemi.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
					badEnd();
				}
			}
		}

		});

		spawn.lastPop = Date.now();
	} else if (Date.now() - spawn.lastPop > spawn.cadencePop && gameover === false && game == "horizontal" && wait === false) {
		window.ennemi.push({
			x : 950,
			y : Math.floor((Math.random() * 385)+ 185),
			width : 80,
			height : 80,
			vitesse : 3,
			cadenceTir : 1500,
			tempsDernierTir : 0,
			direction : -Math.PI,
			move : Math.floor((Math.random() *100)+ 1),
			type : Math.floor((Math.random() *3)+ 1),
			checkCollision : function(){
			for (var i = 0, enemy; i < window.ennemi.length; i++){
				enemy = window.ennemi[i];

				if (enemy.y-100 <= joueur.y && enemy.y+enemy.height >= joueur.y && enemy.x-75 <= joueur.x && enemy.x+50 >= joueur.x) {
					window.ennemi.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
					badEnd();
				}
			}
		}

		});

		spawn.lastPop = Date.now();
	} else if (wait === true) {
		setTimeout(function(){wait = false;}, 5000);
	}
	
	
	for (var i = 0, enemy; i < window.ennemi.length; i++){
		enemy = window.ennemi[i];

		if (gameover === false && game == "vertical") {
			enemy.x += Math.cos(enemy.direction) * enemy.vitesse;
			enemy.y += Math.sin(enemy.direction) * enemy.vitesse;
		} else if (gameover === false && game == "horizontal") {
			enemy.x += Math.cos(enemy.direction) * enemy.vitesse;
			enemy.y += Math.sin(enemy.direction) * enemy.vitesse;
		} else if (gameover === true) {
			enemy.x = enemy.x;
			enemy.y = enemy.y;
		}

		if (enemy.type == 2 && enemy.move > 50 && enemy.x >= 160 && enemy.x <= 650 && gameover === false && game == "vertical") {
			enemy.x+= Math.floor((Math.random() *1)+ 1);
		} else if (enemy.type == 2 && enemy.move < 50 && enemy.x >= 160 && enemy.x <= 650 && gameover === false && game == "vertical") {
			enemy.x-= Math.floor((Math.random() *1)+ 1);
		}
		if (enemy.type == 2 && enemy.y >= 160 && enemy.y <= 650 && gameover === false && game == "horizontal") {enemy.y+= Math.floor((Math.random() *50)- 25);}

		//Vérifier si cet ennemi est encore affiché à l"écran, sinon on le supprimeen mémoire
		if (game == "vertical" && enemy.x < 150 || enemy.x > 975 || enemy.y < -75 || enemy.y > canvas.height) {
			window.ennemi.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
		} else if (game == "horizontal" && enemy.y < 185 || enemy.y > 800 || enemy.x < 0 || enemy.x > 975) {
			window.ennemi.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
		}
	}

	for (var j = ennemi.length - 1; j >= 0; j--) {
		ennemi[j].checkCollision();
	}
}