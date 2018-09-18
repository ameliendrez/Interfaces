class Ficha{
    constructor(posX, posY, radio, color, nombre){
        this.posX = posX;
        this.posY = posY;
        this.radio = radio;
        this.color = color;
        this.nombre = nombre;
    }

    setContext(ctx){
        this.ctx = ctx;
    }

    dibujar(){
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI*2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    isClicked(x, y) {
        var xLayer = x - this.posX;
        var yLayer = y - this.posY;
        return Math.sqrt(xLayer*xLayer + yLayer*yLayer) < this.radio;
    }

    getNombre() {
        return this.nombre;
    }

    remove() {
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);
        this.ctx.clip();
        this.ctx.clearRect(this.posX - this.radio - 1,this.posY - this.radio - 1, this.radio * 2 + 2, this.radio * 2 + 2);
    }
}
	// isClicked (x, y) // En un circulo
		// nx = x- x.layerX
		// ny = y - y.layerY
		// d = Math.sqrt (nx*nx + ny*ny)
		// return d < this.radio)
		// d = Math.sqrt()