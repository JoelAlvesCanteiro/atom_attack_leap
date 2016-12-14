import {MoveEnnemies} from './move.js';
import {TirEnnemi} from './tirs.js';
import {SpawnAtome} from './spawn.js';

// SWITCH ENTRE VERTICAL ET HORIZONTAL
function update() {
	if (camera.rotation < Math.PI/2){
		camera.rotation += 0.01;
	}

	if (joueur.x >= 30 && joueur.y >= 30) {
		joueur.x-=3;
		joueur.y-=3;
		aze.style.display = "initial";
		setTimeout(function(){ aze.style.display = "none"; }, 3000);
		imgFond.src = './img/Fond_Veine2.png';
		imgFond2.src = './img/Fond_Veine2.png';
		fondy = 0;
		fondx = 0;
		ennemi = [];
		tirs = [];
		tirEnnemis = [];
	}
}

// CALCUL DU SCORE + AFFICHAGE
export function Scoring(){
	context.font = "bold 30px Verdana";
	context.textAlign = "end";
	var gradient=context.createLinearGradient(0,0,canvas.width,0);
	gradient.addColorStop("0","white");
	// Fill with gradient
	context.fillStyle=gradient;
	context.fillText(score,440,50);
	context.drawImage(text, 450, 10, 677/5, 246/5);
	if (game == "horizontal") {
		context.fillText("Vous avez "+nbAtome+" atome(s)",440,750);
	}
}

// CHANGEMENT DU MODE DE JEU
export function changeGame(){
	window.game = "horizontal";
	update();
}

// NETTOYAGE DU TERRAIN QUAND LE BOSS APPARAIT
export function Nettoyage(){
	if (boss === false) {
		MoveEnnemies();
		TirEnnemi();
		SpawnAtome();
	}
}

export function alpha(){
	context.globalAlpha = 1;
}