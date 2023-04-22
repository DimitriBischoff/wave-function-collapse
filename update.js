function update() {
	const myCanvas = document.querySelector('canvas');
	const size = document.querySelector('#choice input').value;
	const step =  myCanvas.width / size | 0;
	layers.innerHTML = '';

	const mirror = [
		(c) => {c.ctx.translate(size, 0); c.ctx.scale(-1, 1)},
		(c) => {c.ctx.translate(size, size); c.ctx.scale(-1, -1)},
		(c) => {c.ctx.translate(0, size); c.ctx.scale(1, -1)},
	];
	const rotate = [
		(c) => {c.ctx.translate(size, 0); c.ctx.rotate(Math.PI/2)},
		(c) => {c.ctx.translate(size, size); c.ctx.rotate(Math.PI)},
		(c) => {c.ctx.translate(0, size); c.ctx.rotate(-Math.PI/2)},
	];
	
	let unique = new Set();

	for (let j = 0; j < step; j++) {
		for (let i = 0; i < step; i++) {
			let d = document.createElement('div');
			d.style = 'display:flex;flex-direction:row;'

			let tmp = newCanvas(size, size);
			tmp.ctx.putImageData(myCanvas.ctx.getImageData(i * size, j * size, size, size), 0, 0);

			{
				let c = newCanvas(size, size);
				c.style.width = `${size*10}px`;
				c.ctx.drawImage(tmp, 0, 0);
				
				let key = String(c.ctx.getImageData(0,0,c.width,c.height).data);
				if (!unique.has(key)) {
					unique.add(key);
					d.appendChild(c);
				}
			}

			for (let m = 0; m < 3; m++) {
				{
					let c = newCanvas(size, size);
					c.style.width = `${size*10}px`;

					mirror[m](c);

					c.ctx.drawImage(tmp, 0, 0);

					let key = String(c.ctx.getImageData(0,0,c.width,c.height).data);
					if (!unique.has(key)) {
						unique.add(key);
						d.appendChild(c);
					}

				}
				for (let r = 0; r < 3; r++) {
					let c = newCanvas(size, size);
					c.style.width = `${size*10}px`;

					mirror[m](c);
					rotate[r](c)

					c.ctx.drawImage(tmp, 0, 0);

					let key = String(c.ctx.getImageData(0,0,c.width,c.height).data);
					if (!unique.has(key)) {
						unique.add(key);
						d.appendChild(c);
					}
				}
			}
			if (d.children.length) {
				layers.appendChild(d);
			}
		}
	}
}