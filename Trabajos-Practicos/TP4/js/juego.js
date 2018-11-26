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
        this.disparos = [];
        this.contadorDisparos = 1;

        this.acciones = {'ArrowDown':false, 'ArrowUp':false, 'ArrowLeft':false, 'ArrowRigth':false, 'Space':false};
        this.accionActual = '';
        this.intervalo = null;

        this.navesEnemigas = [];
        this.intervalosEnemigos = [];
        this.cantidadNavesEnemigas = 1;
        this.contadorEnemigosCreados = 1;
        this.menuPrincipal = document.getElementById('menu');
        this.puntaje.actualizarPuntajes();
    }

    jugar() {
        this.jugando = true;
        this.resetMoves();
        this.iniciarAnimacionFondo();
        this.agregarNaveJugador();
        this.setAccionesJugador();
        this.iniciarJuego();
        this.chequearColisiones();
        this.chequearPuntaje();
        this.chequearDisparos();
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

    resetMoves(){
        this.acciones.ArrowDown = false; 
        this.acciones.ArrowUp = false;
        this.acciones.ArrowLeft = false;
        this.acciones.ArrowRigth = false;
        this.accionActual = '';
    }

    setAccionesJugador(){
        var juego = this;
        document.addEventListener("keydown", function (e) {
            var accion = e.code;
            juego.acciones[accion] = true;
            juego.accionActual = accion;            
        });
        document.addEventListener("keyup", function (e) {
            juego.acciones[e.code] = false;
            juego.accionActual = '';
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
        this.intervalosEnemigos[idNaveEnemiga] = setInterval(() => {
            var nave = document.getElementById(idNaveEnemiga);
            if(nave.length > 0) {
                nave.remove();
                delete this.navesEnemigas[idNaveEnemiga];
            }      
            clearInterval(this.intervalosEnemigos[idNaveEnemiga]);
        },3500);
    }

    chequearColisiones(){
        var detectorColisiones = setInterval(() => {
            for (const naveEnemiga in this.navesEnemigas) {
                var nave = this.navesEnemigas[naveEnemiga];
                var hayColision = this.comprobarColision(nave);
                var hayColisionDisparo = this.comprobarColisionDisparos(nave);
                if(hayColisionDisparo){
                    var idNave = nave.getNave().id;                    
                    var divNave = document.getElementById(idNave);
                    divNave.remove();
                    delete this.navesEnemigas[idNave];
                    clearInterval(this.intervalosEnemigos[idNave] )
                    this.puntaje.sumarPuntaje(50);                    
                }
                if(hayColision){
                    this.animaciones.destruccionNaveJugador();
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

    comprobarColisionDisparos(naveEnemiga){
        var posicionNaveEnemiga = this.getPosicion(naveEnemiga); 
        for (const disparo in this.disparos) {
            var disparoTmp = this.disparos[disparo];
            var divDisparo = document.getElementById(disparoTmp.id);
            var posicionDisparo = divDisparo.getBoundingClientRect();

            if(this.colisionAncho(posicionNaveEnemiga.x, parseInt(posicionDisparo.x-100), 30, 30) &&
            this.colisionAlto(posicionNaveEnemiga.y, parseInt(posicionDisparo.y))){
                delete this.disparos[disparo];
                divDisparo.remove();
                return true;
            }
        }
        return false;
    }

    colisionAncho(posicionNaveEnemiga, posicionX, valorResta = 80, valorSuma = 20){
        return posicionX-valorResta < posicionNaveEnemiga && posicionNaveEnemiga <  posicionX+valorSuma;
    }

    colisionAlto(posicionNaveEnemiga, posicionY, valorResta=35, valorSuma=35){
        return posicionY-valorResta < posicionNaveEnemiga  && posicionNaveEnemiga < posicionY+valorSuma;
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
            this.naveJugador.moverHorizontal(this.accionActual);
        else if (puedeMover === 'vertical')
            this.naveJugador.moverVertical(this.accionActual);
        
        this.animaciones.agregarMovimientoNave(this.accionActual);        
    }

    chequearDisparos(){
        var intervaloDisparo = setInterval( ()=>{
            if(this.jugando){
                if(this.accionActual === 'Space'){
                    var idDisparo = this.disparar();
                    this.eliminarDisparo(idDisparo);
                }
            }
            else
                clearInterval(intervaloDisparo)            
        }, 60);
    }

    disparar(){
        var disparo = document.createElement('div');
        var posicionNave =  this.naveJugador.getPosicionNave();
        disparo.id = 'disparo' + this.contadorDisparos;
        disparo.style.left = (posicionNave.posX + 25)+'px';
        disparo.style.bottom = posicionNave.posY+'px';
        disparo.classList.add('disparos');
        this.contadorDisparos++;
        this.disparos[disparo.id] = disparo;
        this.background.append(disparo);
        return disparo.id;
    }

    eliminarDisparo(idDisparo){
        var intervaloDisparo = setInterval(() => {
            var disparo = document.getElementById(idDisparo);
                disparo.remove();
            delete this.disparos[idDisparo];
            clearInterval(intervaloDisparo);
        },2000);
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
        return ((this.acciones.ArrowLeft && (posicion.posX - movimiento) > this.limiteIzquierdo) ||
                (this.acciones.ArrowRight && (posicion.posX + movimiento) < this.limiteDerecho));
    }

    puedeMoverVertical(posicion, movimiento){
        return ((this.acciones.ArrowUp && (posicion.posY + movimiento) < this.limiteSuperior) ||
                (this.acciones.ArrowDown && (posicion.posY - movimiento) > this.limiteInferior));
    }

    mostrarMenu(){
        this.menuPrincipal.classList.remove('oculto');
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