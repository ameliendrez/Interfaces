class Juego{
    constructor(){
        this.background = document.getElementById('paralax-background-content');
        this.naveJugador = new Nave(480, -470, true); // True indica si la nave es jugador humano
        this.navesEnemigas = [];
        this.animaciones = new Animacion(this.background, this.naveJugador.getNave());
        this.jugando = false;
        this.limiteIzquierdo = 100;
        this.limiteDerecho = 850;
        this.limiteSuperior = 15;
        this.limiteInferior = -470;
        this.intervaloMovimiento = null;
        this.cantidadNaves = 1;
    }

    jugar() {
        this.jugando = true;
        this.iniciarAnimacionFondo();
        this.agregarNaveJugador();
        this.iniciarJuego();

        //var posicionX = Math.random() * (this.limiteDerecho - this.limiteIzquierdo) + this.limiteIzquierdo;
        var naveEnemiga = new Nave(250, 0); // -5
        naveEnemiga.setPosicionInicial();
        
        this.background.append(naveEnemiga.getNave());


    }

    iniciarAnimacionFondo(){
        this.animaciones.iniciarAnimacionFondo();
    }

    agregarNaveJugador(){
        this.naveJugador.setPosicionInicial();
        this.background.append(this.naveJugador.getNave());
    }

    iniciarJuego(){
        let juego = this;
            this.intervaloMovimiento = setInterval(function () {

                /**
                 * Funcion que controla el movimiento del jugador
                 */
                document.addEventListener("keydown", function (e) {
                    var posicion = juego.naveJugador.getPosicionNave();
                    var movimiento = juego.naveJugador.getMovimiento();
                    var direccion = e.code;

                    if(juego.movimientoValido(direccion, posicion, movimiento)){
                        juego.animaciones.agregarMovimientoNave(direccion);
                        juego.naveJugador.moverNave(direccion);
                    }

                    //juego.agregarNavesEnemigas();
            
                        // thisClass.gameOver();
                    clearInterval(juego.intervaloMovimiento);
                });
                
        }, 20);

        document.addEventListener("keyup", function (e) {
            clearInterval(juego.intervaloMovimiento);
            juego.animaciones.eliminarMovimientoNave();

        });
    }

    agregarNavesEnemigas(){
        var posicionX = Math.random() * (this.limiteDerecho - this.limiteIzquierdo) + this.limiteIzquierdo;
        var nave = new Nave(posicionX, 20); // -5
        nave.setPosicionInicial();



        
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