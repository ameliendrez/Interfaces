class Ficha{
    constructor(x, y, color, jugador){
        this.x = x;
        this.y = y;
        this.radio = 25;
        this.color = color;
        this.jugador = jugador;
        this.estado = '';
        this.imagen = new Image();
        this.setSrc();
    }

    setSrc(){
        this.imagen.src = 'images/ficha.png'
    }

    getJugador(){
        if (this.jugador === 0)
            return this.jugador;
        else 
            return this.jugador.getNroJugador();
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
        return this.jugador.getNombre();
    }

    setColor(color){
        this.color = color;
    }

    setEstado(estado) {
        this.estado = estado;
    }

    getEstado() {
        return this.estado;
    }


}
	