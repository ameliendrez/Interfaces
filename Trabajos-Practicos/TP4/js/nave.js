class Nave{
    constructor(posX, posY, esHumano = false){
        this.nave = document.createElement('div');
        this.posicionInicialX = posX;
        this.posicionInicialY = posY;
        this.posX = posX;
        this.posY = posY;
        this.movimientoJugador = 15;
        this.esHumano = esHumano;
    }

    getNave(){
        document.getElementById(this.id);
    }

    setPosicionInicial(id){

        if(!this.esHumano) 
            this.nave.classList.add('enemigo');
        
        this.nave.id = id;
        this.nave.width = '20px';
        this.nave.height = '20px';
        this.nave.style.bottom = this.posicionInicialY+'px';
        this.nave.style.left = this.posicionInicialX+'px';
    }

    moverHorizontal(direccion){
        if(direccion === "ArrowLeft")
            this.posX -= this.movimientoJugador;
        else if (direccion === "ArrowRight")
            this.posX += this.movimientoJugador;
        this.moverNave();
    }

    moverVertical(direccion){                  
        if (direccion === "ArrowUp") 
            this.posY += this.movimientoJugador;
        else if(direccion === "ArrowDown")
            this.posY -= this.movimientoJugador;
        this.moverNave();
    }

    moverNave(){
        this.nave.style.left = this.posX+'px';
        this.nave.style.bottom = this.posY+'px';
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

    detectarColision(naveEnemiga){
        // console.log('enemigo');
        // var posicionEnemigo = naveEnemiga.getPosicionNave();

        // console.log(posicionEnemigo.posX);
        // console.log(posicionEnemigo.posY);

        // console.log('jugador');
        // console.log(this.posX);
        // console.log(this.posY);
        
        
        
        
        
    }

}