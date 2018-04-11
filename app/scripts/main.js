// Libs
// import Leap from 'leapjs';
import {lesTirs, Tir, TirBoss, TirEnnemi} from './tirs.js';
import {LoadImages} from './load_img.js';
import {MovePlayer, MoveEnnemies} from './move.js';
import {Scoring, changeGame, Nettoyage, alpha, update} from './utils.js';
import {Anims, Animate} from './anims.js';
import {DrawPlayer, DrawEnemy, DrawBoss, DrawItem} from './draw.js';
import {SpawnAtome, SpawnBoss} from './spawn.js';
// import {leap} from './leap.js';




import {badEnd, goodEnd} from './end.js';

// let controller = new Leap.Controller({enableGestures: true});
// controller.connect();

// INSERTION DES MUSIQUES
var mortslimy = new Audio('./music/Mort_Slimy.ogg');

document.body.onload = LoadGame;

// CHARGEMENT INITIAL DU JEU + AJOUT DES VARIABLES, TABLEAUX ET OBJETS
function LoadGame(){
	// leap();
	window.canvas  = document.createElement("canvas"),
	window.context = canvas.getContext('2d');
	canvas.width = 900;
	canvas.height = 900;

	window.canvas2 = document.getElementById('canvas2');
	window.context2 = canvas2.getContext('2d');
	canvas2.width = window.innerHeight-20;
	canvas2.height = window.innerHeight-20;

    window.fondx = 0;
    window.fondy = -1575;
    window.fondweight = 900;
	window.fondheight = 900;
    window.fondx2 = 0;
    window.fondy2 = -1575;

	//ajout de la balise au body
	LoadImages();

    window.joueur = {
    	x : 400,
		y : 750,
		vitesse : 5,
		cadenceTir : 500, //en millisecondes
		tempsDernierTir : 0, // stockage du timing du dernier tir player
		checkCollision : function(){
			for (var i = 0, bossT; i < window.bossTir.length; i++){
				bossT = window.bossTir[i];

				if (bossT.y+150 <= joueur.y && bossT.y+bossT.height-250 >= joueur.y && bossT.x <= joueur.x) {
					window.bossTir.splice(i, 1);
					badEnd();
					console.log(bossT.x +" | "+ bossT.y +" | "+ bossT.width +" | "+ bossT.height);
				}
			}
		}
    };
    window.mort = false;

	window.tirs = [];

	window.camera = {
		x : 149,
		y : 0,
		width: 600,
		height: 900,
		rotation: 0
	};

	window.ennemi = [];
	window.spawn = {
		cadencePop : 5000, //en millisecondes
		lastPop : 0
	};
	window.tirEnnemis = [];
	window.ennemiCadence = {
		cadenceTir : 1500,
		tempsDernierTir : 0
	};

	window.wait = true;

	window.objets = [];
	window.spawnObjet ={
		cadencePop : 30000,
		lastPop : 0
	};

	window.boss = false;
	window.bossMort = false;
	window.bossCooldown = false;
	window.bossStats = [];
	window.bossTir = [];
	window.bossVie = 50;

	window.score = 0;
	window.nbAtome = 1;
	window.game = "vertical";
	window.gameover = false;

	window.speed = 1.1;
	window.keyboard ={
		gauche: false,
		droite: false,
		haut: false,
		bas: false,
		espace: false
	};

	window.left 	= false,
	window.right 	= false,
	window.shoot 	= false;

	window.document.addEventListener('keydown',function(e){
		if (e.keyCode == 37){ window.keyboard.gauche = true;}
		if (e.keyCode == 38){ window.keyboard.haut = true;}
		if (e.keyCode == 39){ window.keyboard.droite = true;}
		if (e.keyCode == 40){ window.keyboard.bas = true;}
		if (e.keyCode == 32){ window.keyboard.espace = true;}
	}, false);

	window.document.addEventListener('keyup',function(e){
		if (e.keyCode == 37){ window.keyboard.gauche = false;}
		if (e.keyCode == 38){ window.keyboard.haut = false;}
		if (e.keyCode == 39){ window.keyboard.droite = false;}
		if (e.keyCode == 40){ window.keyboard.bas = false;}
		if (e.keyCode == 32){ window.keyboard.espace = false;}
	}, false);

	Anims();
	
	//Lancement Initial du jeu
	requestAnimationFrame(GameLoop);
}

// TOUS LES DRAW() + DESSIN DE LA CAMÉRA
function render() {
	// Effacement du canvas
	context.clearRect(0, 0, canvas.width, canvas.height);
	context2.clearRect(0, 0, canvas2.width, canvas2.height);

	// Dessin d'un fond
	context.drawImage(imgFond, fondx, fondy);

	context2.font = "bold 30px Verdana";
	let gradient=context.createLinearGradient(0,0,canvas.width,500);
	gradient.addColorStop("0","white");
	context2.fillStyle=gradient

	// Dessin du joueur
	DrawPlayer();

	// Dessin des ennemis
	DrawEnemy();
	DrawBoss();

	// Dessin de l'atome
	DrawItem();

	context.globalCompositeOperation = 'destination-atop';

	// Dessin des contours de la camera
	context.fillStyle = '#000';
	context.save();
	context.translate(camera.x + camera.width/2, camera.y + camera.height/2);
	context.rotate(camera.rotation);
	context.fillRect(-camera.width/2, -camera.height/2, camera.width, camera.height);
	context.restore();
	context.globalCompositeOperation = 'source-over';

	lesTirs();
}

// LA GAMELOOP
function GameLoop(){
	// Calculs (updating)
	Animate();
	MovePlayer();
	Tir();
	TirBoss();

	Nettoyage();

	SpawnBoss();

	joueur.checkCollision();

	window.spawn.cadencePop -= 1;
	// Dessin (rendering)
	render();
	Scoring();

	//boucle de la GameLoop
	requestAnimationFrame(GameLoop);
	context2.drawImage(canvas, 0, 0, canvas2.width, canvas2.height);
}

