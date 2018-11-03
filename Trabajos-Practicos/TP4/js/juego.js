class Juego{
    constructor(){
        this.background = document.getElementById('paralax-background-content');
        this.naveJugador = new Nave(480, 20, true); // True indica si la nave es jugador humano
        this.navesEnemigas = [];
        this.animaciones = new Animacion(this.background, this.naveJugador.getNave());
        this.jugando = false;
        this.limiteIzquierdo = 100;
        this.limiteDerecho = 850;
        this.limiteSuperior = 550;
        this.limiteInferior = 0;
        this.intervalo = null;
        this.cantidadNavesEnemigas = 5;
        this.movimientos = {'ArrowDown':false, 'ArrowUp':false, 'ArrowLeft':false, 'ArrowRigth':false};
        this.movimientoActual = '';
        this.contadorEnemigosCreados = 1;
    }

    jugar() {
        this.jugando = true;
        this.iniciarAnimacionFondo();
        this.agregarNaveJugador();
        this.setMovimientosJugador();
        this.iniciarJuego();
    }

    iniciarAnimacionFondo(){
        this.animaciones.iniciarAnimacionFondo();
    }

    agregarNaveJugador(){
        this.naveJugador.setPosicionInicial('naveJugador');
        this.background.append(this.naveJugador.getNave());
    }

    iniciarJuego(){
        this.intervalo = setInterval(() => {
            this.movimientoValido();
        }, 10);
        this.agregarNavesEnemigas();
    }

    setMovimientosJugador(){
        var juego = this;
        document.addEventListener("keydown", function (e) {
            var direccion = e.code;
            juego.movimientos[direccion] = true;
            juego.movimientoActual = direccion;
        });
        document.addEventListener("keyup", function (e) {
            juego.movimientos[direccion] = false;
            juego.movimientoActual = '';
            juego.animaciones.eliminarMovimientoNave();
        });
    }

    agregarNavesEnemigas(){
        this.creacionNavesEnemigas = setInterval(() => {
            var idNaveEnemiga = this.crearEnemigo();
            // console.log(naveEnemiga);
            
            this.comprobarColisiones(idNaveEnemiga);
        }, 1000);  
    }

    comprobarColisiones(idNaveEnemiga){
        this.intervaloEnemigo = setInterval(() => {
            console.log(idNaveEnemiga);
            var nave = document.getElementById(idNaveEnemiga);
            nave.remove();
            clearInterval(this.intervaloEnemigo);
            // this.navesEnemigas[idNaveEnemiga] = null;
            // this.background.removeChild('#'+idNaveEnemiga);
//             var elem = document.getElementById("myDiv");
// elem.remove();
            // naveEnemiga.
            // naveEnemiga.parentNode.removeChild(naveEnemiga);
        },3000);
    }

    crearEnemigo(){
        var posicionX = Math.random() * (this.limiteDerecho - this.limiteIzquierdo) + this.limiteIzquierdo + 20;
        var naveEnemiga = new Nave(posicionX, 700); // -5
        var id = 'enemigo' + this.contadorEnemigosCreados;
        this.contadorEnemigosCreados++;

        naveEnemiga.setPosicionInicial(id);
        this.background.append(naveEnemiga.getNave());
        this.navesEnemigas[id] = naveEnemiga; 
        return id;
    }

    movimientoValido(){
        var posicion = this.naveJugador.getPosicionNave();
        var movimiento = this.naveJugador.getMovimiento();

        if(this.puedeMoverHorizontal(posicion, movimiento)){
            this.animaciones.agregarMovimientoNave(this.movimientoActual);
            this.naveJugador.moverNave(this.movimientoActual);
        }
        if(this.puedeMoverVertical(posicion, movimiento)){
            this.animaciones.agregarMovimientoNave(this.movimientoActual);
            this.naveJugador.moverNave(this.movimientoActual);
        }
    }

    puedeMoverHorizontal(posicion, movimiento){
        return ((this.movimientos.ArrowLeft && (posicion.posX - movimiento) > this.limiteIzquierdo) ||
                (this.movimientos.ArrowRight && (posicion.posX + movimiento) < this.limiteDerecho));
    }

    puedeMoverVertical(posicion, movimiento){
        return ((this.movimientos.ArrowUp && (posicion.posY + movimiento) < this.limiteSuperior) ||
                (this.movimientos.ArrowDown && (posicion.posY - movimiento) > this.limiteInferior));
    }
}