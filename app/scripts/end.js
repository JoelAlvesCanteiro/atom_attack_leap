// QUAND ON MEURT
export function badEnd(){
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
export function goodEnd(){
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