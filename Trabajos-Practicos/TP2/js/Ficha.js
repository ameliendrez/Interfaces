class Ficha{
    constructor(x, y, radio, color, nombre, jugador){
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.color = color;
        this.nombre = nombre;
        this.jugador = jugador;
    }

    getJugador(){
        return this.jugador;
    }

    setContext(ctx){
        this.ctx = ctx;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    dibujar(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, Math.PI*2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    isClicked(x, y) {
        var xLayer = x - this.x;
        var yLayer = y - this.y;
        return Math.sqrt(xLayer*xLayer + yLayer*yLayer) < this.radio;
    }

    getNombre() {
        return this.nombre;
    }

    setColor(color){
        this.color = color;
    }


}
	