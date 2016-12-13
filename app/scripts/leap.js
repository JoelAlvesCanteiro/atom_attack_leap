var controller = new Leap.Controller({enableGestures: true});

controller.connect();

Leap.loop( (frame) => {

	// BOUCLE PARCOURANT CHAQUE GESTES DÉTECTÉE DANS L'ESPACE LEAP
	frame.gestures.forEach((gesture) => {

		if (gesture.type === 'keyTap') {
			let gesturePos = to2D(gesture.position, frame);
			balls.push(new Ball(gesturePos.x, gesturePos.y, 30, 0.7));
		}

		if (gesture.type === 'screenTap') {
			let gesturePos = to2D(gesture.position, frame);
			balls.push(new Ball(gesturePos.x, gesturePos.y, 30, 0.7));
		}

		if (gesture.type === 'swipe') {

		console.log(gesture);
			if (gesture.direction[0] > 0) {console.log("droite");}
			if (gesture.direction[0] < 0) {console.log("gauche");}
		}

		if (gesture.type === 'circle') {
			let gesturePos = to2D(gesture.center, frame);
			balls.push(new Ball(gesturePos.x, gesturePos.y, 30, 0.7));
		}

	}); // FIN DE LA BOUCLE DES GESTES

});

export * from './leap.js';