import Leap from 'leapjs';
import {alpha} from './utils.js';
import {badEnd, goodEnd} from './end.js';
import {LoadImages} from './load_img.js';

let tirslimy = new Audio('./music/Tire_Slimy3.ogg');
let tirvirus = new Audio('./music/Tire_Virus.ogg');
let mortvirus = new Audio('./music/Mort_Virus.ogg');

let controller = new Leap.Controller({enableGestures: true});

export function detectLeap(){
	console.log(controller);	
}

export function leap(){
	controller.connect();

	controller.on('deviceAttached', function() {
		console.log("A Leap device has been connected.");
		$('.leap').css("display", "none");
			$('#canvas2').fadeIn();
	});

	Leap.loop( (frame) => {

		// BOUCLE PARCOURANT CHAQUE MAIN DÉTECTÉE DANS L'ESPACE LEAP
		frame.hands.forEach((hand) => {

			if (hand.stabilizedPalmPosition[0] > 30 && joueur.x < 615 && game == "vertical") {joueur.x += joueur.vitesse; right = true; left = false;}
			else if (hand.stabilizedPalmPosition[0] < -30 && joueur.x > 185 && game == "vertical") {joueur.x -= joueur.vitesse; right = false; left = true;}
			else {right = false; left = false;}

			if (hand.palmPosition[1] < 200 && joueur.y < 600 && game == "horizontal") {joueur.y += joueur.vitesse;}
			if (hand.palmPosition[1] > 200 && joueur.y > 200 && game == "horizontal") {joueur.y -= joueur.vitesse;}

			// console.log(hand.palmPosition[1]);

		}); // FIN DE LA BOUCLE DES MAINS

		frame.gestures.forEach((gesture) => {

			if (gesture.type == "circle") {
				if (Date.now() - joueur.tempsDernierTir > joueur.cadenceTir && game == "vertical" && gameover === false) {
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
					shoot = true;
				} else if (Date.now() - joueur.tempsDernierTir > joueur.cadenceTir && game == "horizontal"  && gameover === false) {
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
					shoot = true;
				}

				// Parcourir tous les tirs du tableau (sils existent) et les faire avancer
				for (var i = 0, tir; i < window.tirs.length; i++){
					tir = window.tirs[i];

					tir.x += Math.cos(tir.direction) * tir.vitesse;
					tir.y += Math.sin(tir.direction) * tir.vitesse;

					//Vérifier si ce tir est encore affiché à l"écran, sinon on le supprime en mémoire
					if (tir.x < 0 || tir.x > canvas.width || tir.y < 0 || tir.y > canvas.height) {
						window.tirs.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
					}
				}

				for (var j = tirs.length - 1; j >= 0; j--) {
					tirs[j].checkCollision();
				}
			}
		});

	});
}