export function variables(){
	let joueur = {
    	x : 400,
		y : 750,
		vitesse : 5,
		cadenceTir : 500, //en millisecondes
		tempsDernierTir : 0, // stockage du timing du dernier tir player
		checkCollision : function(){
			for (var i = 0, bossT; i < bossTir.length; i++){
				bossT = bossTir[i];

				if (bossT.y+150 <= joueur.y && bossT.y+bossT.height-250 >= joueur.y && bossT.x <= joueur.x) {
					bossTir.splice(i, 1);
					badEnd();
					console.log(bossT.x +" | "+ bossT.y +" | "+ bossT.width +" | "+ bossT.height);
				}
			}
		}
    };
    let mort = false;

	let tirs = [];

	let camera = {
		x : 149,
		y : 0,
		width: 600,
		height: 900,
		rotation: 0
	};

	let ennemi = [];
	let spawn = {
		cadencePop : 1000, //en millisecondes
		lastPop : 0
	};
	let tirEnnemis = [];
	let ennemiCadence = {
		cadenceTir : 1500,
		tempsDernierTir : 0
	};

	let wait = true;

	let objets = [];
	let spawnObjet ={
		cadencePop : 15000,
		lastPop : 0
	};

	let boss = false;
	let bossMort = false;
	let bossCooldown = false;
	let bossStats = [];
	let bossTir = [];
	let bossVie = 50;

	let score = 0;
	let nbAtome = 1;
	let game = "vertical";
	let gameover = false;

	let speed = 1.1;
	let keyboard ={
		gauche: false,
		droite: false,
		haut: false,
		bas: false,
		espace: false
	};

	let left 	= false,
		right 	= false,
		shoot 	= false;

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
}