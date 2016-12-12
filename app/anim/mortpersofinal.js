document.body.onload = LoadGame;

function LoadGame(){
	//création de la balise canvas
	window.canvas 	= document.createElement("canvas"),
	window.context = canvas.getContext("2d");
	canvas.width = 1280;
	canvas.height = 720;
	//ajout de la balise au body
	document.body.appendChild(canvas);
	LoadImages();
	
	var AtomeCentre = {
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
		
		Draw : function(){
			context.drawImage(charSheet,this.Steps[this.IdleAnimationStep][0],
			this.Steps[this.IdleAnimationStep][1],this.Steps[this.IdleAnimationStep][2],
			this.Steps[this.IdleAnimationStep][3],300,200,35*8,35*8);
		},
		
		Animate : function(){
			this.IdleAnimationStepFloat += 0.15;
			this.IdleAnimationStep = Math.floor(this.IdleAnimationStepFloat);
			console.log(this.IdleAnimationStep);
			if(this.IdleAnimationStep == 11){
				this.IdleAnimationStepFloat = 0;
				this.IdleAnimationStep = 10;
			}
		}
	};
	
	//les objets à dessiner
	window.drawables = [
	//background
	{
		Draw : function(){
			context.drawImage(imgFond,0,0,1280,720);
		}
	}
	,AtomeCentre];
	
	//Les objets à animation
	window.animables = [
	AtomeCentre
	];
	
	//Lancement Initial du jeu
	requestAnimationFrame(GameLoop);
}

function LoadImages(){
	//import image de fond
	window.imgFond = new Image();
	imgFond.src = 'ssf2-01-ryu.jpg';
	
	window.charSheet = new Image();
	charSheet.src = 'mortfinale.png';
}

function GameLoop(){
	Animate();
	Draw();

	//boucle de la GameLoop
	requestAnimationFrame(GameLoop);
}

function Animate(){
	for(var i = 0; i < animables.length; i++){
		animables[i].Animate();
	}
}

function Draw(){
	context.clearRect(0,0,canvas.width,canvas.height);
	for(var i = 0; i < drawables.length; i++){
		drawables[i].Draw();
	}
}