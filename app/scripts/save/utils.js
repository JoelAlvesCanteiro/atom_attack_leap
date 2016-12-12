import { canvas, ctx } from './canvas';

export function to2D(leapPoint, frame) {
  let iBox = frame.interactionBox;
  let normalizedPoint = iBox.normalizePoint(leapPoint, true);

  return {
    x : normalizedPoint[0] * canvas.width,
    y : (1 - normalizedPoint[1]) * canvas.height
  };
}

export function drawCircle(x, y, size, color = 'black') {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc( x, y, size, 0, Math.PI*2 );
  ctx.fill();
  ctx.closePath();
}