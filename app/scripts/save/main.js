// Libs
import Leap from 'leapjs';

// Custom scripts
import { canvas, ctx } from './canvas';
import { to2D, drawCircle } from './utils';
import { Ball } from './Ball';

var controller = new Leap.Controller({enableGestures: true});

controller.connect();
let balls = [];

Leap.loop( (frame) => {

	// console.info( frame.hands.length, 'main détectées !' );

	ctx.fillStyle = "black";
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// BOUCLE PARCOURANT CHAQUE MAIN DÉTECTÉE DANS L'ESPACE LEAP
	frame.hands.forEach((hand) => {

		let palmPos = to2D(hand.stabilizedPalmPosition, frame);

		circle(palmPos, 40, "grey");

		// BOUCLE PARCOURANT CHAQUE DOIGTS DE CETTE MAIN
		
		hand.fingers.forEach((finger) => {

			let tipPos = to2D(finger.stabilizedTipPosition, frame);

			circle(tipPos, 10, "black");


			let fingPos = finger.positions.slice(1);

			ctx.beginPath();
			fingPos.forEach((phal) =>{

				let phalPos = to2D(phal, frame);

				ctx.lineTo(phalPos.x, phalPos.y);
				ctx.stroke();

				circle(phalPos, 10, 'black');

			});
			ctx.closePath();

		});

	}); // FIN DE LA BOUCLE DES MAINS

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
			let gesturePos = to2D(gesture.position, frame);
			balls.push(new Ball(gesturePos.x, gesturePos.y, 30, 0.7));
		}

		if (gesture.type === 'circle') {
			let gesturePos = to2D(gesture.center, frame);
			balls.push(new Ball(gesturePos.x, gesturePos.y, 30, 0.7));
		}

	}); // FIN DE LA BOUCLE DES GESTES

	function to2D(leapPoint, frame) {
		let iBox = frame.interactionBox;
		let normalizedPoint = iBox.normalizePoint(leapPoint, true);

		return {
			x : normalizedPoint[0] * canvas.width,
			y : (1 - normalizedPoint[1]) * canvas.height
		};
	}

	function circle(pos, radius, color){
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc( pos.x, pos.y, radius, 0, Math.PI*2 );
		ctx.fill();
		ctx.closePath();
	}

	function drop(pos, radius, color){
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc( pos.x, pos.y, radius, 0, Math.PI*2 );
		ctx.fill();
		ctx.closePath();
	}

	// Dessin des balles (si il en existe)
		balls.forEach((ball, index) => {
		if (ball.dead) {
		  return balls.splice(index, 1);
		}

		ball.update();
		ball.render();
		});

});