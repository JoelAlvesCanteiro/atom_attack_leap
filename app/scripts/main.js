// Libs
import Leap from 'leapjs';

// INSERTION DES MUSIQUES
var mortslimy = new Audio('./music/Mort_Slimy.ogg');
var tirslimy = new Audio('./music/Tire_Slimy3.ogg');
var tirvirus = new Audio('./music/Tire_Virus.ogg');
var mortvirus = new Audio('./music/Mort_Virus.ogg');

document.body.onload = LoadGame;

// CHARGEMENT INITIAL DU JEU + AJOUT DES VARIABLES, TABLEAUX ET OBJETS
function LoadGame(){
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
		cadencePop : 1000, //en millisecondes
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
		cadencePop : 15000,
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

	//ajout de la balise au body
	LoadImages();

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

// ANIMATION POUR LE JOUEUR (SLIMY)
window.AtomeCentre = {
		//L'étape d'animation en entier
		IdleAnimationStep : 0,
		//en float
		IdleAnimationStepFloat : 0,
		
		LeftAnimationStep : 0,

		LeftAnimationStepFloat : 0,

		RightAnimationStep : 0,

		RightAnimationStepFloat : 0,

		AtkAnimationStep : 0,

		AtkAnimationStepFloat : 0,
		//les variables de l'animation
		Steps : [
		[60,520,200,203],
		[300,520,200,203],
		[520,520,200,203],
		[750,520,200,203],
		[45,755,200,203],
		[300,755,200,203],
		[540,755,200,203],
		[760,755,200,203],
		],

		//Mouvement à gauche
		StepsGauche : [
		[14,500,200,203],
		[196,500,200,203],
		[380,490,200,203],
		[596,490,200,203],
		[786,485,200,203],
		[14,728,200,203],
		[244,728,200,203],
		[460,728,200,203],
		[710,728,200,203]
		],

		//Mouvement à droite
		StepsDroite : [
		[14,10,200,203],
		[196,10,200,203],
		[380,10,200,203],
		[566,10,200,203],
		[766,10,200,203],
		[14,225,200,203],
		[244,215,200,203],
		[490,215,200,203],
		[750,215,200,203]
		],

		//Mouvement d'attaque
		StepsAttack : [
		[14,10,200,203],
		[196,10,200,203],
		[420,10,250,203],
		[700,10,250,203],
		[34,280,300,203],
		[390,280,300,203],
		[670,280,300,203],
		[14,630,250,203],
		[280,630,250,203],
		[550,630,250,203],
		[770,630,200,203],
		],
		Draw : function(){
			if (window.keyboard.gauche === true || left === true) {
				context.drawImage(charSheet2,this.StepsGauche[this.LeftAnimationStep][0],
				this.StepsGauche[this.LeftAnimationStep][1],this.StepsGauche[this.LeftAnimationStep][2],
				this.StepsGauche[this.LeftAnimationStep][3],joueur.x,joueur.y,15*8,15*8);
			}else if (window.keyboard.droite === true || right === true) {
				context.drawImage(charSheet2,this.StepsDroite[this.RightAnimationStep][0],
				this.StepsDroite[this.RightAnimationStep][1],this.StepsDroite[this.RightAnimationStep][2],
				this.StepsDroite[this.RightAnimationStep][3],joueur.x,joueur.y,15*8,15*8);
			}else if (window.keyboard.espace === true || shoot === true) {
				context.drawImage(charSheet3,this.StepsAttack[this.AtkAnimationStep][0],
				this.StepsAttack[this.AtkAnimationStep][1],this.StepsAttack[this.AtkAnimationStep][2],
				this.StepsAttack[this.AtkAnimationStep][3],joueur.x,joueur.y,15*8,15*8);
			}else{
				context.drawImage(charSheet,this.Steps[this.IdleAnimationStep][0],
				this.Steps[this.IdleAnimationStep][1],this.Steps[this.IdleAnimationStep][2],
				this.Steps[this.IdleAnimationStep][3],joueur.x,joueur.y,15*8,15*8);
			}
		},		
		Animate : function(){
			// anim immobile
			//anim gauche
			if (window.keyboard.gauche === true || left === true) {
				this.LeftAnimationStepFloat += 0.08;
				this.LeftAnimationStep = Math.floor(this.LeftAnimationStepFloat);
				if(this.LeftAnimationStep == 9){
					this.LeftAnimationStepFloat = 0;
					this.LeftAnimationStep = 8;

					left = false;
					}
			}else if (window.keyboard.droite === true || right === true) {
				this.RightAnimationStepFloat += 0.08;
				this.RightAnimationStep = Math.floor(this.RightAnimationStepFloat);
					if(this.RightAnimationStep == 9){
					this.RightAnimationStepFloat = 0;
					this.RightAnimationStep = 8;

					right = false;
					}
			}else if (window.keyboard.espace === true || shoot === true){
				this.AtkAnimationStepFloat += 0.35;
				this.AtkAnimationStep = Math.floor(this.AtkAnimationStepFloat);
					if(this.AtkAnimationStep == 11){
					this.AtkAnimationStepFloat = 0;
					this.AtkAnimationStep = 10;

					shoot = false;
					}
			}else{
				this.IdleAnimationStepFloat += 0.15;
				this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
				if(this.IdleAnimationStep == 8){
					this.IdleAnimationStepFloat = 0;
					this.IdleAnimationStep = 7;
				}
			}
		}
};

// ANIMATION POUR LE TIR DU JOUEUR (SLIMY)
window.tirPerso = {
	//L'étape d'animation en entier
	IdleAnimationStep : 0,
	//en float
	IdleAnimationStepFloat : 0,
	
	//les variables de l'animation
	Steps : [
	[342,50,300,303],
	[342,350,300,303],
	[342,680,300,303],
	],
	
	Draw : function(){
		context.drawImage(charSheet,this.Steps[this.IdleAnimationStep][0],
		this.Steps[this.IdleAnimationStep][1],this.Steps[this.IdleAnimationStep][2],
		this.Steps[this.IdleAnimationStep][3],300,200,35*8,35*8);
	},
	
	Animate : function(){
		this.IdleAnimationStepFloat += 0.10;
		this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
		if(this.IdleAnimationStep == 3){
			this.IdleAnimationStepFloat = 0;
			this.IdleAnimationStep = 2;
		}
	}
};

// ANIMATION POUR LA MORT DU JOUEUR (SLIMY)
window.mortPerso = {
		//L'étape d'animation en entier
		IdleAnimationStep : 0,
		//en float
		IdleAnimationStepFloat : 0,
		
		//les variables de l'animation
		Steps : [
		[2,10,200,203],
		[142,10,200,203],
		[282,10,200,203],
		[422,10,200,203],
		[582,10,200,203],
		[722,10,200,203],
		[0,216,200,203],
		[117,215,200,203],
		[250,215,180,203],
		[365,240,160,203],
		[472,240,160,203],
		],
		
		Animate : function(){
			this.IdleAnimationStepFloat += 0.15;
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			if(this.IdleAnimationStep == 11){
				this.IdleAnimationStepFloat = 0;
				this.IdleAnimationStep = 13;
			}
		}
};

window.theBonus = {
		//L'étape d'animation en entier
		IdleAnimationStep : 0,
		//en float
		IdleAnimationStepFloat : 0,
		
		//les variables de l'animation
		Steps : [
		[0,0,75,80],
		[75,0,75,80],
		[150,0,75,80],
		],

		Animate : function(){
			this.IdleAnimationStepFloat += 0.10;
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			if(this.IdleAnimationStep == 3){
				this.IdleAnimationStepFloat = 0;
				this.IdleAnimationStep = 2;
			}
		}
	};

// ANIMATION DE L'ENNEMI QUI TIRE
window.atkEnnemi3 = {
		//L'étape d'animation en entier
		IdleAnimationStep : 0,
		//en float
		IdleAnimationStepFloat : 0,
		
		//les variables de l'animation
		Steps : [
		[120,1,500,503],
		[602,1,500,503],
		[1122,1,500,503],
		[100,470,500,503],
		[590,480,500,503],
		[1090,490,500,503],
		[100,925,500,503],
		[620,925,500,503],
		[1170,960,500,503],
		[70,1450,500,503],
		[572,1450,500,503],
		[1092,1470,500,503],
		[100,1970,500,503],
		[590,1970,500,503],
		[1200,1970,500,503],
		[100,2450,500,503],
		[650,2450,500,503],
		[710,2450,500,503],
		[140,2850,500,503],
		[642,2850,500,503],
		[1242,2900,500,503],
		],
		
		Animate : function(){
			this.IdleAnimationStepFloat += 0.15;
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			if(this.IdleAnimationStep == 21){
				this.IdleAnimationStepFloat = 0;
				this.IdleAnimationStep = 20;
			}
		}
};

// ANIMATION POUR LE BOSS
window.theBoss = {
	//L'étape d'animation en entier
	IdleAnimationStep : 0,
	//en float
	IdleAnimationStepFloat : 0,
	
	//les variables de l'animation
	Steps : [
	[40,-80,300,303],
	[340,-80,300,303],
	[621,-80,300,303],
	[905,-80,300,303],
	[1200,-80,300,303],
	[35,197,270,273],
	[347,195,280,273],
	[663,196,300,273],
	[1000,194,330,273],
	[45,1200,315,273],
	[15,460,315,273],
	[387,460,315,273],
	[790,455,315,273],
	[1140,455,315,273],
	[1520,455,315,273],
	[30,695,315,273],
	[392,695,315,273],
	[750,695,315,273],
	[1080,695,315,273],
	[1450,685,315,273],
	[30,950,315,273],
	[392,950,315,273],
	[45,1195,315,273],
	[382,1195,315,273],
	[694,1180,300,273],
	[975,1185,280,273],
	[1233,1195,255,273],
	[1470,1195,235,273],
	[1670,1195,270,273],
	[45,1475,280,280],
	[278,1475,270,280],
	[505,1475,230,280],
	[730,1475,300,273],
	[1085,1475,335,273],
	[1490,1475,335,273],
	[45,1775,315,273],
	[422,1755,315,273],
	[804,1745,315,273],
	],

	Animate : function(){
		this.IdleAnimationStepFloat += 0.10;
		this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
		if(this.IdleAnimationStep == 36){
			this.IdleAnimationStepFloat = 9;
			this.IdleAnimationStep = 35;
		}
	}
};

// ANIMATION POUR LA MORT DU BOSS
window.theBossDeath = {
		//L'étape d'animation en entier
		IdleAnimationStep : 0,
		//en float
		IdleAnimationStepFloat : 0,
		
		//les variables de l'animation
		Steps : [
		[142,400,300,303],
		[422,400,300,303],
		[722,380,300,303],
		[162,670,300,303],
		[432,680,300,303],
		[702,690,300,303],
		],
		
		Animate : function(){
			this.IdleAnimationStepFloat += 0.10;
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			if(this.IdleAnimationStep == 6){
				this.IdleAnimationStepFloat = 0;
				this.IdleAnimationStep = 7;
			}
		}
};

// ANIMATION POUR LE TIR DU BOSS
window.theBossTir = {
		//L'étape d'animation en entier
		IdleAnimationStep : 0,
		//en float
		IdleAnimationStepFloat : 0,
		
		//les variables de l'animation
		Steps : [
		[110,-80,700,303],
		[110,110,700,303],
		[110,290,700,303],
		],
		
		Animate : function(){
			this.IdleAnimationStepFloat += 0.02;
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			if(this.IdleAnimationStep == 3){
				this.IdleAnimationStepFloat = 0;
				this.IdleAnimationStep = 2;
			}
		}
};
	
	//les objets à dessiner
	window.drawables = [
	//background
	{
		Draw : function(){
			context.drawImage(imgFond,fondx,fondy,fondweight,fondheight);
		}
	}, AtomeCentre];
	
	//Les objets à animation
	window.animables = [
	AtomeCentre, atkEnnemi3, theBoss, theBossTir, mortPerso, theBossDeath, theBonus
	];
	
	//Lancement Initial du jeu
	leap();
	requestAnimationFrame(GameLoop);
}

// CHARGER TOUTES LES IMAGES DANS LE JEU
function LoadImages(){
	window.imgFond = new Image();
	imgFond.src = './img/Fond_Veine_4.png';

	window.imgFond2 = new Image();
	imgFond2.src = './img/Fond_Veine_4.png';

	window.charSheet = new Image();
	charSheet.src = './img/planchemarche.png';

	window.charSheet2 = new Image();
	charSheet2.src = './img/D&Gatom1.png';

	window.charSheet3 = new Image();
	charSheet3.src = './img/ATKatom1.png';

	window.mort = new Image();
	mort.src = './img/mortfinale.png';

	window.ennemis = new Image();
	ennemis.src ='./img/Ennemie1.png';

	window.ennemis1 = new Image();
	ennemis1.src ='./img/Ennemie2.png';

	window.ennemis2 = new Image();
	ennemis2.src ='./img/Ennemie3.png';

	window.atkEnemy3 = new Image();
	atkEnemy3.src = './img/Planche_Ennemie3.png';

	window.bossImg = new Image();
	bossImg.src = './img/reveil_mouvementbase_attaque.png';

	window.item = new Image();
	item.src ='./img/atome.png';

	window.pTirVer = new Image();
	pTirVer.src ='./img/tirVer.png';

	window.pTirHor = new Image();
	pTirHor.src ='./img/TirHor.png';

	window.text = new Image();
	text.src = './img/point.png';

	window.laser = new Image();
	laser.src = './img/laser.png';

	window.bonus = new Image();
	bonus.src = './img/bonus.png';
}

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

// TOUS LES DRAW() + DESSIN DE LA CAMÉRA
function render() {
	// Effacement du canvas
	context.clearRect(0, 0, canvas.width, canvas.height);
	context2.clearRect(0, 0, canvas2.width, canvas2.height);

	// Dessin d'un fond
	context.drawImage(imgFond, fondx, fondy);

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

// LES ANIMATIONS
function Animate(){
	// Animation des élémentsà l'écran
	for(var i = 0; i < animables.length; i++){
		animables[i].Animate();
	}

	// Défilement en boucle du fond de la zone de jeu
	if (game == "vertical" && gameover === false) {
		fondy+=2;
		fondy2+=2;
	}
	if (fondy >= 0 && game == "vertical" && gameover === false) {
		fondy=-1575;
	}

	if (game == "horizontal" && gameover === false) {
		fondx-=2;
		fondx2-=2;
	}
	if (fondx <= -1575 && game == "horizontal" && gameover === false) {
		fondx=0;
	}
}

// DESSINER LE JOUEUR (SLIMY)
function DrawPlayer(){
	if (nbAtome > 0) {
		for(var i = 0; i < drawables.length; i++){
			drawables[i].Draw();
		}
	} else {		
		context.drawImage(mort,mortPerso.Steps[mortPerso.IdleAnimationStep][0],
		mortPerso.Steps[mortPerso.IdleAnimationStep][1],mortPerso.Steps[mortPerso.IdleAnimationStep][2],
		mortPerso.Steps[mortPerso.IdleAnimationStep][3],joueur.x,joueur.y,15*8,15*8);
		mortslimy.play();
	}
}

// DESSINER L'ENNEMI
function DrawEnemy(){

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
function DrawBoss(){
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
function DrawItem(){
	for (var i = 0, objet; i < window.objets.length; i++){
		objet = window.objets[i];
		context.drawImage(item,objet.x,objet.y,objet.width,objet.height);
		context.drawImage(bonus,theBonus.Steps[theBonus.IdleAnimationStep][0],
		theBonus.Steps[theBonus.IdleAnimationStep][1],theBonus.Steps[theBonus.IdleAnimationStep][2],
		theBonus.Steps[theBonus.IdleAnimationStep][3],objet.x,objet.y,objet.width,objet.height);
	}
}

// DESSINER LES DIFFÉRENTS TIRS
function lesTirs(){
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

		console.log('arzea');

		context.drawImage(laser,theBossTir.Steps[theBossTir.IdleAnimationStep][0],
		theBossTir.Steps[theBossTir.IdleAnimationStep][1],theBossTir.Steps[theBossTir.IdleAnimationStep][2],
		theBossTir.Steps[theBossTir.IdleAnimationStep][3],bossT.x,bossT.y,bossT.width,bossT.height);
		// context.strokeRect(bossT.x, bossT.y+260, bossT.width, bossT.height-490);
		

		// context.drawImage(ennemis1,bossT.x,bossT.y,bossT.width,bossT.height);
	}
}

// AJOUT DES TIRS DU JOUEUR
function Tir(){

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
function TirEnnemi(){
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
function TirBoss(){
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

// AJOUT DES MOUVEMENTS DU JOUEUR
function MovePlayer(){

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
function MoveEnnemies(){
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

		if (enemy.type == 2 && enemy.x >= 160 && enemy.x <= 650 && gameover === false && game == "vertical") {enemy.x+= Math.floor((Math.random() *50)- 25);}
		if (enemy.type == 2 && enemy.y >= 160 && enemy.y <= 650 && gameover === false && game == "horizontal") {enemy.y+= Math.floor((Math.random() *50)- 25);}

		//Vérifier si cet ennemi est encore affiché à l"écran, sinon on le supprimeen mémoire
		if (game == "vertical" && enemy.x < 185 || enemy.x > 975 || enemy.y < -75 || enemy.y > canvas.height) {
			window.ennemi.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
		} else if (game == "horizontal" && enemy.y < 185 || enemy.y > 800 || enemy.x < 0 || enemy.x > 975) {
			window.ennemi.splice(i, 1); // Supprime cet element à l'indice 'i' dans le tableau
		}
	}

	for (var j = ennemi.length - 1; j >= 0; j--) {
		ennemi[j].checkCollision();
	}
}

// CALCUL DU SCORE + AFFICHAGE
function Scoring(){
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
function changeGame(){
	window.game = "horizontal";
	update();
}

// AJOUT DE L'APPARITION DE L'ATOME
function SpawnAtome(){
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
function SpawnBoss(){
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

// TEST NON CONCLUANT DE CHANGEMENT D'IMAGE EN FONCTION DU NOMBRE D'ATOMES
function DetectAtome(){
	if (nbAtome == 1) {
		charSheet.src = './img/planchemarche.png';
	} else if (nbAtome == 2) {
		window.charSheet = new Image();
		charSheet.src = './img/marcheAtom2-3.png';
	} else if (nbAtome == 3) {
		// Placer l'animation 3 atomes
	} else if (nbAtome === 0) {
		// Placer l'animation mort
	}
}

// NETTOYAGE DU TERRAIN QUAND LE BOSS APPARAIT
function Nettoyage(){
	if (boss === false) {
		MoveEnnemies();
		TirEnnemi();
		SpawnAtome();
	}
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

	// Dessin (rendering)
	render();
	Scoring();

	//boucle de la GameLoop
	requestAnimationFrame(GameLoop);
	context2.drawImage(canvas, 0, 0, canvas2.width, canvas2.height);
}

// QUAND ON MEURT
function badEnd(){
	nbAtome--;
	if (nbAtome <= 0) {
		gameover = true;
		setTimeout(function(){
			context.clearRect(0, 0, canvas.width, canvas.height);
			context2.clearRect(0, 0, canvas2.width, canvas2.height);
			canvas.style.display = "none";
			dead.style.display = "initial";
			document.getElementById('leScore1').innerHTML = score;
			tirs = [];
			tirEnnemis = [];
			ennemi = [];
			setTimeout(function(){location.reload();}, 2000);
		}, 1000);
	}
}

// QUAND ON GAGNE
function goodEnd(){
	if (bossVie <= 0) {
		bossMort = true;
		score+= 250000;
		setTimeout(function(){
			context.clearRect(0, 0, canvas.width, canvas.height);
			context2.clearRect(0, 0, canvas2.width, canvas2.height);
			end.style.display = "initial";
			canvas.style.display = "none";
			document.getElementById('leScore2').innerHTML = score;
			tirs = [];
			tirEnnemis = [];
			ennemi = [];
		}, 1000);
	}
}


function alpha(){
	context.globalAlpha = 1;
}

function leap(){

	var controller = new Leap.Controller({enableGestures: true});

	controller.connect();

	Leap.loop( (frame) => {

		// BOUCLE PARCOURANT CHAQUE MAIN DÉTECTÉE DANS L'ESPACE LEAP
		frame.hands.forEach((hand) => {

			if (hand.direction[0] > 0 && joueur.x < 615 && game == "vertical") {joueur.x += joueur.vitesse; right = true; left = false;}
			else if (hand.direction[0] < 0 && joueur.x > 185 && game == "vertical") {joueur.x -= joueur.vitesse; right = false; left = true;}
			else {right = false; left = false;}

			if (hand.palmPosition[1] < 200 && joueur.y < 600 && game == "horizontal") {joueur.y += joueur.vitesse;}
			if (hand.palmPosition[1] > 200 && joueur.y > 200 && game == "horizontal") {joueur.y -= joueur.vitesse;}

			// console.log(hand.palmPosition[1]);

		}); // FIN DE LA BOUCLE DES MAINS

		frame.gestures.forEach((gesture) => {

			if (gesture.type == "keyTap") {
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