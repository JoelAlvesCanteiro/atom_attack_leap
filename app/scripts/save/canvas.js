let canvas = document.getElementById('drawzone');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export { canvas, ctx };