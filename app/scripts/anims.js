export function Anims(){
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
}

// LES ANIMATIONS
export function Animate(){
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