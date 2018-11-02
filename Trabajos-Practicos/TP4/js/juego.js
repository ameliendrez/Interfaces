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
        this.intervaloCreacionNavesEnemigas = null;
        this.cantidadNavesEnemigas = 5;
    }

    jugar() {
        this.jugando = true;
        this.iniciarAnimacionFondo();
        this.agregarNaveJugador();
        this.iniciarJuego();
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
            juego.getMovimientoJugador();
            clearInterval(juego.intervaloMovimiento);
        }, 20);

        this.agregarNavesEnemigas();

        document.addEventListener("keyup", function (e) {
            clearInterval(juego.intervaloMovimiento);
            juego.animaciones.eliminarMovimientoNave();
        });
    }

    getMovimientoJugador(){
        var juego = this;
        document.addEventListener("keydown", function (e) {
            var posicion = juego.naveJugador.getPosicionNave();
            var movimiento = juego.naveJugador.getMovimiento();
            var direccion = e.code;

            if(juego.movimientoValido(direccion, posicion, movimiento)){
                juego.animaciones.agregarMovimientoNave(direccion);
                juego.naveJugador.moverNave(direccion);
            }
        });
    }

    agregarNavesEnemigas(){
        if(this.navesEnemigas.length > 0) 
            this.navesEnemigas.splice(0, this.navesEnemigas.length);
        
        var juego = this;

        this.creacionNavesEnemigas = setInterval(function () {
            var posicionX = Math.random() * (juego.limiteDerecho - juego.limiteIzquierdo) + juego.limiteIzquierdo + 20;
            var naveEnemiga = new Nave(posicionX, 850); // -5
            naveEnemiga.setPosicionInicial();
            juego.background.append(naveEnemiga.getNave());
            juego.navesEnemigas.push(naveEnemiga);      

            clearInterval(juego.intervaloCreacionNavesEnemigas);
        }, 1000);


        // for (let index = 0; index < this.cantidadNavesEnemigas; index++) {
         
        // }        
        // clearInterval(this.intervaloCreacionNavesEnemigas);

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