class Juego{
    constructor(){
        this.background = document.getElementById('paralax-background-content');
        this.naveJugador = new Nave(true); // True indica si la nave es jugador humano
        this.animaciones = new Animacion(this.background, this.naveJugador.getNave());
        this.jugando = false;
        this.limiteIzquierdo = 100;
        this.limiteDerecho = 850;
        this.limiteSuperior = 550;
        this.limiteInferior = 15;
        this.intervaloMovimiento = null;
    }

    jugar() {
        this.jugando = true;
        this.iniciarAnimacionFondo();
        this.agregarNaveJugador();
        this.iniciarMovimientos();
    }

    iniciarAnimacionFondo(){
        this.animaciones.iniciarAnimacionFondo();
    }

    agregarNaveJugador(){
        this.naveJugador.setPosicionInicial();
        this.background.append(this.naveJugador.getNave());
    }

    iniciarMovimientos(){
        let juego = this;
            this.intervaloMovimiento = setInterval(function () {
                document.addEventListener("keydown", function (e) {
                    
                    var posicion = juego.naveJugador.getPosicionNave();
                    var movimiento = juego.naveJugador.getMovimiento();
                    var direccion = e.code;

                    if(juego.movimientoValido(direccion, posicion, movimiento)){
                        juego.animaciones.agregarMovimientoNave(direccion);
                        juego.naveJugador.moverNave(direccion);
                    }
                    
                        // thisClass.gameOver();
                    if(juego.jugando)
                        clearInterval(juego.intervaloMovimiento);
                });
        }, 20);

        document.addEventListener("keyup", function (e) {
            clearInterval(juego.intervaloMovimiento);
            juego.animaciones.eliminarMovimientoNave();

        });
    }

    movimientoValido(direccion, posicion, movimiento){
        var puedeMover = false;
        if(direccion === "ArrowLeft" && (posicion.posX - movimiento) > this.limiteIzquierdo)
            puedeMover = true;
        else if (direccion === "ArrowRight" && (posicion.posX + movimiento) < this.limiteDerecho)
            puedeMover = true;
        
        if (direccion === "ArrowUp" && (posicion.posY + movimiento) < this.limiteSuperior) 
            puedeMover = true;
        else if(direccion === "ArrowDown" && (posicion.posY - movimiento) > this.limiteInferior)
            puedeMover = true;

        return puedeMover;
    }




}