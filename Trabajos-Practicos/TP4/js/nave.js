class Nave{
    constructor(posX, posY, esHumano = false){
        this.nave = document.createElement('div');
        this.posX = posX;
        this.posY = posY;
        this.movimientoJugador =15;
        this.esHumano = esHumano;
    }

    setPosicionInicial(id=false){
        if(this.esHumano) {
            this.nave.id = 'nave';
            this.nave.classList.add('volando');
        }
        else{
            this.nave.classList.add('enemigo');
        }

        this.nave.width = '20px';
        this.nave.height = '20px';
        this.nave.style.bottom = this.posY+'px';
        this.nave.style.left = this.posX+'px';
    }

    moverNave(direccion){        
        if(this.esHumano){
            if(direccion === "ArrowLeft")
            this.posX -= this.movimientoJugador;
        else if (direccion === "ArrowRight")
            this.posX += this.movimientoJugador;
        
        if (direccion === "ArrowUp") 
            this.posY += this.movimientoJugador;
        else if(direccion === "ArrowDown")
            this.posY -= this.movimientoJugador;

        this.nave.style.left = this.posX+'px';
        this.nave.style.bottom = this.posY+'px';
        }   
    }

    getNave(){
        return this.nave;
    }

    getPosicionNave(){
        return {
            'posX': this.posX,
            'posY': this.posY 
        };
    }

    getMovimiento() {
        return this.movimientoJugador;
    }

}