function drawPoint(canvas, x, y, c) {
	if (canvas.img == undefined) {
		canvas.img = canvas.ctx.getImageData(0,0, canvas.width, canvas.height);
	}
	for (let i = (y * canvas.width + x) * 4, j = 0; j < 4; i++, j++) {
		canvas.img.data[i] = c[j];
	}
	canvas.ctx.putImageData(canvas.img, 0, 0);
}

function newCanvas(w, h, drawable=false) {
	let c = document.createElement('canvas');
	c.width = w;
	c.height = h;
	c.ctx = c.getContext('2d');

	if (drawable) {
		c.inputEvent = new Event('input');
		c.draw = (e) => {
			const y = (e.clientY - e.target.offsetTop) / e.target.offsetHeight * e.target.height | 0;
			const x = (e.clientX - e.target.offsetLeft) / e.target.offsetWidth * e.target.width | 0;
			if (c.button_draw == 0) {
				drawPoint(c, x, y, [0,0,0,255]);
			}
			else if (c.button_draw == 2) {
				drawPoint(c, x, y, [0,0,0,0]);
			}
			c.dispatchEvent(c.inputEvent);
		}
		c.oncontextmenu = () => false;
		c.addEventListener("mousedown", (e) => {
			c.button_draw = e.button;

			c.draw(e);
			c.addEventListener("mousemove", c.draw);
			
		});
		
		window.addEventListener('mouseup', () => {
			c.removeEventListener('mousemove', c.draw);
		})
	}
	c.clear = () => {c.ctx.clearRect(0,0,c.width,c.height); c.img = undefined};
	return c;
}