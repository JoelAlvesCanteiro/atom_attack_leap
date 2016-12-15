var son = new Audio('./music/boutons.ogg')


$(document).ready(function(){
	$('#btn').on('click', function(){
		son.play();
		setTimeout(function(){window.location = 'game.html'}, 500)
	})

	$('#btn2').on('click', function(){
		son.play();
		setTimeout(function(){window.location = 'game.html'}, 500)
	})

	$('#btn3').on('click', function(){
		son.play();
		setTimeout(function(){window.location = 'Credits.html'}, 500)
	})
})