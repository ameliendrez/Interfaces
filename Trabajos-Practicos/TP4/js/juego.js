class Juego{
    constructor(){
        this.background = document.getElementById('paralax-background-content');
        this.naveJugador = new Nave(480, 20, true); // True indica si la nave es jugador humano
        this.animaciones = new Animacion(this.background, this.naveJugador.getNave());
        this.puntaje = new Puntaje();
        this.limiteIzquierdo = 100;
        this.limiteDerecho = 750;
        this.limiteSuperior = 420;
        this.limiteInferior = 0;
        this.jugando = false;
        this.resultado = {'perdio':false, 'gano':false};

        this.movimientos = {'ArrowDown':false, 'ArrowUp':false, 'ArrowLeft':false, 'ArrowRigth':false};
        this.direccionActual = '';
        this.intervalo = null;

        this.navesEnemigas = [];
        this.cantidadNavesEnemigas = 1;
        this.contadorEnemigosCreados = 1;
        this.menuPrincipal = document.getElementById('menu');
        this.puntaje.actualizarPuntajes();

    }

    jugar() {
        this.jugando = true;
        this.iniciarAnimacionFondo();
        this.agregarNaveJugador();
        this.setMovimientosJugador();
        this.iniciarJuego();
        this.chequearColisiones();
        this.chequearPuntaje();
    }

    iniciarAnimacionFondo(){
        this.animaciones.iniciarAnimacionFondo();
    }

    agregarNaveJugador(){
        this.naveJugador.setPosicionInicial('naveJugador');
        this.background.append(this.naveJugador.getNave());
    }

    quitarNaveJugador(){
        this.naveJugador.getNave().remove();
    }

    iniciarJuego(){
        this.intervalo = setInterval(() => {
            if(this.jugando)
                this.moverNave();
            else{
                this.finalizarJuego();
                clearInterval(this.intervalo);
            }
        }, 35);
        this.agregarNavesEnemigas();
    }

    finalizarJuego(){
        var intervaloFinalizacion = setInterval(()=>{
            this.animaciones.finalizarAnimacionFondo();
            this.puntaje.actualizarPuntajes();
            this.quitarNaveJugador();
            this.mostrarMenu();
            clearInterval(intervaloFinalizacion);
        },2000);
    }

    setMovimientosJugador(){
        var juego = this;
        document.addEventListener("keydown", function (e) {
            var direccion = e.code;
            juego.movimientos[direccion] = true;
            juego.direccionActual = direccion;
        });
        document.addEventListener("keyup", function (e) {
            juego.movimientos[e.code] = false;
            juego.direccionActual = '';
            juego.animaciones.eliminarMovimientoNave();
        });
    }

    agregarNavesEnemigas(){
        var creacionNavesEnemigas = setInterval(() => {
            //Segun el nivel, crear la cantidad de naves this.cantidadNavesEnemigas?
            if(this.jugando){
                var idNaveEnemiga = this.crearEnemigo();            
                this.quitarNaveEnemiga(idNaveEnemiga);
            }
            else
               clearInterval(creacionNavesEnemigas); 
     
        }, 500);  
    }

    quitarNaveEnemiga(idNaveEnemiga){
        var intervaloEnemigo = setInterval(() => {
            var nave = document.getElementById(idNaveEnemiga);
            nave.remove();
            delete this.navesEnemigas[idNaveEnemiga]
            clearInterval(intervaloEnemigo);
        },3500);
    }

    chequearColisiones(){
        var detectorColisiones = setInterval(() => {
            for (const naveEnemiga in this.navesEnemigas) {
                var nave = this.navesEnemigas[naveEnemiga];
                var hayColision = this.comprobarColision(nave);
                if(hayColision){
                    this.animaciones.destruccionNaveJugador();
                    this.resultado.perdio = true;
                    this.jugando = false;
                    clearInterval(detectorColisiones);
                }
            }
        }, 50); 
    }

    getPosicion(nave){
        return {
            'x' : Math.round(nave.getPosicionNave().posX),
            'y' : Math.round(nave.getNave().getBoundingClientRect().y)
        }
    }

    comprobarColision(naveEnemiga){
        var posicionNaveEnemiga = this.getPosicion(naveEnemiga); 
        var posicionNaveJugador = this.getPosicion(this.naveJugador);
        var hayColision = false;
      
        if(this.colisionAncho(posicionNaveEnemiga.x, posicionNaveJugador.x) &&
        this.colisionAlto(posicionNaveEnemiga.y, posicionNaveJugador.y))
            hayColision = true;
        
        return hayColision;
    }

    colisionAncho(posicionNaveEnemiga, posicionX){
        return posicionX-80 < posicionNaveEnemiga && posicionNaveEnemiga <  posicionX+20;
    }

    colisionAlto(posicionNaveEnemiga, posicionY){
        return posicionY-35 < posicionNaveEnemiga  && posicionNaveEnemiga < posicionY+35;
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

    moverNave(){
        var posicion = this.naveJugador.getPosicionNave();
        var movimiento = this.naveJugador.getMovimiento();
        var puedeMover = this.puedeMover(posicion, movimiento);

        if(puedeMover === 'horizontal')
            this.naveJugador.moverHorizontal(this.direccionActual);
        else if (puedeMover === 'vertical')
            this.naveJugador.moverVertical(this.direccionActual);

        this.animaciones.agregarMovimientoNave(this.direccionActual);        
    }

    puedeMover(posicion, movimiento){
        var puedeMover = '';
        if(this.puedeMoverHorizontal(posicion, movimiento))
            puedeMover = 'horizontal';
        else if(this.puedeMoverVertical(posicion, movimiento))
            puedeMover = 'vertical';
        return puedeMover;
    }

    puedeMoverHorizontal(posicion, movimiento){
        return ((this.movimientos.ArrowLeft && (posicion.posX - movimiento) > this.limiteIzquierdo) ||
                (this.movimientos.ArrowRight && (posicion.posX + movimiento) < this.limiteDerecho));
    }

    puedeMoverVertical(posicion, movimiento){
        return ((this.movimientos.ArrowUp && (posicion.posY + movimiento) < this.limiteSuperior) ||
                (this.movimientos.ArrowDown && (posicion.posY - movimiento) > this.limiteInferior));
    }

    mostrarMenu(){
        this.menuPrincipal.classList.remove('oculto');
        this.menuPrincipal.classList.add('mostrar-menu');
    }

    chequearPuntaje(){
        var intervaloPuntaje = setInterval(()=>{
            if(this.jugando){
                this.puntaje.sumarPuntaje();
                this.puntaje.mostrarPuntajeActual();
            }
            else
                clearInterval(intervaloPuntaje);

        },3000);
    }
}