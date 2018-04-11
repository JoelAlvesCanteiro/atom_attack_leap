import {alpha} from './utils.js';
import {badEnd, goodEnd} from './end.js';

let tirslimy = new Audio('./music/Tire_Slimy3.ogg');
let tirvirus = new Audio('./music/Tire_Virus.ogg');
let mortvirus = new Audio('./music/Mort_Virus.ogg');


// DESSINER LES DIFFÉRENTS TIRS
export function lesTirs(){
	// Parcourir tous les tirs du tableau (si ils existent) et les dessiner
	for (var i = 0, tir; i < window.tirs.length; i++){
		tir = window.tirs[i];

		if (game == "vertical") {
			context.drawImage(pTirVer,tir.x,tir.y,tir.width,tir.height);
		} else if (game == "horizontal") {
			context.drawImage(pTirHor,tir.x,tir.y,tir.width,tir.height);
		}
	}

	for (var j = 0, tirE; j < window.tirEnnemis.length; j++){
		tirE = window.tirEnnemis[j];

		context.fillStyle = tirE.couleurFond;
		context.lineWidth = tirE.epaisseur;
		context.strokeStyle = tirE.couleurContour;
		context.beginPath();
		context.arc(tirE.x, tirE.y, tirE.rayon, 0, 2 * Math.PI, false);
		// context.strokeRect(tirE.x-25, tirE.y-25, 50, 50);	
		context.fill();
		context.stroke();
		context.closePath();
	}

	for (var k = 0, bossT; k < window.bossTir.length; k++){
		bossT = window.bossTir[k];

		context.drawImage(laser,theBossTir.Steps[theBossTir.IdleAnimationStep][0],
		theBossTir.Steps[theBossTir.IdleAnimationStep][1],theBossTir.Steps[theBossTir.IdleAnimationStep][2],
		theBossTir.Steps[theBossTir.IdleAnimationStep][3],bossT.x,bossT.y,bossT.width,bossT.height);
		// context.strokeRect(bossT.x, bossT.y+260, bossT.width, bossT.height-490);
		

		// context.drawImage(ennemis1,bossT.x,bossT.y,bossT.width,bossT.height);
	}
}

// AJOUT DES TIRS DU JOUEUR
export function Tir(){

	if (window.keyboard.espace && Date.now() - joueur.tempsDernierTir > joueur.cadenceTir && game == "vertical" && gameover === false) {
		// Création d'un nouveau tir dans le tableau de tirs
		window.tirs.push({
			x : joueur.x+25,
			y : joueur.y+50,
			width : 75,
			height : 75,
			vitesse : 10,
			direction : -Math.PI/2,
			couleurFond : '#04541D',
			couleurContour : '#A9A9A9',
			epaisseur : 5,
			rayon : 15,
			checkCollision : function(){
				for (var i = 0, enemy; i < window.ennemi.length; i++){
					enemy = window.ennemi[i];

					if (enemy.y-50 <= tir.y && enemy.y+enemy.width >= tir.y && enemy.x-20 <= tir.x && enemy.x+enemy.width >= tir.x) {
						window.ennemi.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
						window.tirs.splice(tirs.indexOf(this), 1); // Supprime cet element à l'indice 'i' dans le tableau
						console.log('hey');
						score += 250;
						mortvirus.play();
					}
				}
			}
		});

		joueur.tempsDernierTir = Date.now();
		tirvirus.currentTime = 0;
		tirslimy.play();
	} else if (window.keyboard.espace && Date.now() - joueur.tempsDernierTir > joueur.cadenceTir && game == "horizontal"  && gameover === false) {
		// Création d'un nouveau tir dans le tableau de tirs
		window.tirs.push({
			x : joueur.x+50,
			y : joueur.y+25,
			width : 75,
			height : 75,
			vitesse : 10,
			direction : -Math.PI/180,
			couleurFond : '#04541D',
			couleurContour : '#A9A9A9',
			epaisseur : 5,
			rayon : 15,
			checkCollision : function(){
				for (var i = 0, enemy; i < window.ennemi.length; i++){
					enemy = window.ennemi[i];

					if (enemy.y-50 <= tir.y && enemy.y+enemy.width >= tir.y && enemy.x-20 <= tir.x && enemy.x+enemy.width >= tir.x) {
						window.ennemi.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
						window.tirs.splice(tirs.indexOf(this), 1); // Supprime cet element à l'indice 'i' dans le tableau
						console.log('hey');
						score += 250;
						mortvirus.play();
					}
				}

				for (var j = 0, Fboss; j < window.bossStats.length; j++){
					Fboss = window.bossStats[j];

					if (Fboss.y-50 <= tir.y && Fboss.y+Fboss.width >= tir.y && Fboss.x-20 <= tir.x && Fboss.x+Fboss.width >= tir.x) {
						window.tirs.splice(tirs.indexOf(this), 1); // Supprime cet element à l'indice 'i' dans le tableau
						bossVie--;
						context.globalAlpha = 0.8;
						setTimeout(alpha(), 200);
						goodEnd();
					}
				}
			}
		});

		joueur.tempsDernierTir = Date.now();
		tirslimy.play();
	}

	// Parcourir tous les tirs du tableau (sils existent) et les faire avancer
	for (var i = 0, tir; i < window.tirs.length; i++){
		tir = window.tirs[i];

		tir.x += Math.cos(tir.direction) * tir.vitesse;
		tir.y += Math.sin(tir.direction) * tir.vitesse;

		//Vérifier si ce tir est encore affiché à l"écran, sinon on le supprimeen mémoire
		if (tir.x < 0 || tir.x > canvas.width || tir.y < 0 || tir.y > canvas.height) {
			window.tirs.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
		}
	}

	for (var j = tirs.length - 1; j >= 0; j--) {
		tirs[j].checkCollision();
	}
}

// AJOUT DES TIRS DE L'ENNEMI
export function TirEnnemi(){
	for (var i = 0, enemy; i < window.ennemi.length; i++){
		enemy = window.ennemi[i];

		if (Date.now() - enemy.tempsDernierTir > enemy.cadenceTir && game == "vertical" && gameover === false && enemy.type == 3) {
			// Création d'un nouveau tir dans le tableau de tirs
			window.tirEnnemis.push({
				x : enemy.x+35,
				y : enemy.y+35,
				vitesse : 10,
				direction : Math.PI/2,
				couleurFond : '#07872E',
				couleurContour : '#0BE04D',
				epaisseur : 2,
				rayon : 9,
				checkCollision : function(){
					for (var i = 0, tirE; i < window.tirEnnemis.length; i++){
						tirE = window.tirEnnemis[i];

						if (tirE.y+10 >= joueur.y && tirE.y-10 <= joueur.y && tirE.x+10 >= joueur.x && tirE.x-100 <= joueur.x) {
							window.tirEnnemis.splice(i, 1);
							badEnd();
						}
					}
				}
			});

			enemy.tempsDernierTir = Date.now();
			tirvirus.currentTime = 0;
			tirvirus.play();
		} else if (Date.now() - enemy.tempsDernierTir > enemy.cadenceTir && game == "horizontal" && gameover === false && enemy.type == 3) {
			// Création d'un nouveau tir dans le tableau de tirs
			window.tirEnnemis.push({
				x : enemy.x,
				y : enemy.y+40,
				vitesse : 10,
				direction : Math.PI,
				couleurFond : '#07872E',
				couleurContour : '#0BE04D',
				epaisseur : 2,
				rayon : 9,
				checkCollision : function(){
					for (var i = 0, tirE; i < window.tirEnnemis.length; i++){
						tirE = window.tirEnnemis[i];

						if (tirE.y+10 >= joueur.y && tirE.y-100 <= joueur.y && tirE.x+10 >= joueur.x && tirE.x-100 <= joueur.x) {
							window.tirEnnemis.splice(i, 1);
							console.log('kjhgfyiop');
							badEnd();
						}
					}
				}
			});

			enemy.tempsDernierTir = Date.now();
			tirvirus.currentTime = 0;
			tirvirus.play();
		}
	}

	// Parcourir tous les tirs du tableau (sils existent) et les faire avancer
	for (var j = 0, tirE; j < window.tirEnnemis.length; j++){
		tirE = window.tirEnnemis[j];

		tirE.x += Math.cos(tirE.direction) * tirE.vitesse;
		tirE.y += Math.sin(tirE.direction) * tirE.vitesse;

		//Vérifier si ce tirE est encore affiché à l"écran, sinon on le supprimeen mémoire
		if (tirE.x < 0 || tirE.x > canvas.width || tirE.y < 0 || tirE.y > canvas.height && game == "vertical") {
			window.tirEnnemis.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
		}
	}

	for (var k = tirEnnemis.length - 1; k >= 0; k--) {
		tirEnnemis[k].checkCollision();
	}
}

// AJOUT DES TIRS DU JOUEUR
export function TirBoss(){
	for (var i = 0, Fboss; i < window.bossStats.length; i++){
		Fboss = window.bossStats[i];

		if (theBoss.IdleAnimationStep >= 33 && gameover === false && boss === true && bossMort === false && bossCooldown === false) {
			// Création d'un nouveau tir dans le tableau de tirs
			window.bossTir.push({
				x : Fboss.x - 400,
				y : Fboss.y - 150,
				width : 70*8,
				height : 70*8,
				vitesse : 10,
				direction : Math.PI,
				epaisseur : 2,
				rayon : 9,
				checkCollision : function(){
					for (var i = 0, bossT; i < window.bossTir.length; i++){
						bossT = window.bossTir[i];

						if (bossT.y+bossT.height+100 >= joueur.y && bossT.y-100 <= joueur.y) {
							window.bossTir.splice(i, 1);
							console.log('JE SUIS TON PERE');
						}
					}
				}
			});
			bossCooldown = true;
			Fboss.tempsDernierTir = Date.now();
			setTimeout(function(){bossCooldown = false;}, 2000);
		}
	}

	// Parcourir tous les tirs du tableau (sils existent) et les faire avancer
	for (var j = 0, bossT; j < window.bossTir.length; j++){
		bossT = window.bossTir[j];

		bossT.x += Math.cos(bossT.direction) * bossT.vitesse;

		//Vérifier si ce bossT est encore affiché à l"écran, sinon on le supprimeen mémoire
		if (bossT.x < -bossT.width || bossT.x > canvas.width+50 || bossT.y < 150 || bossT.y > canvas.height - 150) {
			window.bossTir.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
		}
	}

	// for (var i = bossTir.length - 1; i >= 0; i--) {
	// 	bossTir[i].checkCollision();
	// }
}