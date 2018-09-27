class Juego{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.tablero = new Tablero(this.ctx);
        this.j1 = new Jugador (this.ctx, 'Jugador 1', 1);
        this.j2 = new Jugador (this.ctx, 'Jugador 2', 2);
        this.fichas = [];
        this.turno = 1;
        this.fichaActual = null;
        this.posInicialX;
        this.posInicialY;
        this.fichaClickeada = false;
        this.juegoFinalizado = false;
        this.cantidadFichas = 42;
        this.drawFichasInit();
        this.initJuego();
    }

    initJuego() {
        this.tablero.dibujarTablero();       
    }

    prepareJuego(){        
        this.tablero.dibujarTablero();       
        this.setFichas();
        this.marcarTurnoActual();
    }

    setFichas() {
        for (var i = 0; i < this.fichas.length; i++){
            this.fichas[i].dibujar();
        }
    }

    moveFicha(x, y) {
        this.fichaActual.x = x;
        this.fichaActual.y = y;
        this.fichas.push(this.fichaActual);
        this.prepareJuego();
    }

    drawFichasInit(){
        this.drawFichasJugador(50, 'j1', this.j1);
        this.drawFichasJugador(920, 'j2', this.j2);

    }

    drawFichasJugador(xTmpInit, color, jugador) {
        var tmpY = 130;
        for (var fila = 0; fila < 7; fila++) {
            var tmpX = xTmpInit;
            for(var columna = 0; columna < 3; columna++) {
                var ficha = new Ficha (tmpX, tmpY, color, jugador);
                ficha.setContext(this.ctx);
                this.fichas.push(ficha);
                tmpX += 65;
            }
            tmpY += 65;
        } 
    }

    resetFichaClickeada() {
        this.fichaActual = null;
        this.fichaClickeada = false;
    }

    hayFichaClickeada() {
        return this.fichaClickeada;
    }

    isClickedFicha(x, y) {       
        for (var i=0; i<this.fichas.length; i++) {
                var fichaTmp = this.fichas[i];
            if (fichaTmp.isClicked(x, y) && fichaTmp.getJugador() === this.turno && fichaTmp.getEstado() !== 'inactiva' && !this.juegoFinalizado) {
                this.fichaActual = fichaTmp;
                this.fichaClickeada = true;
                this.fichas.splice(i,1);     
                this.posInicialX = this.fichaActual.x;
                this.posInicialY = this.fichaActual.y;    
                return true;
            }                
        }
    }

    marcarTurnoActual() {
        if (this.turno === 1){
            document.getElementById('J1').classList.add('turno-actual');
            document.getElementById('J2').classList.remove('turno-actual');
        }
        else if(this.turno === 2) {
            document.getElementById('J2').classList.add('turno-actual');
            document.getElementById('J1').classList.remove('turno-actual');
        }
        else{
            document.getElementById('J1').classList.remove('turno-actual');
            document.getElementById('J2').classList.remove('turno-actual');
        }
    }

    insertarFicha(x, y){

        if(this.tablero.pudoInsertarFicha(x, y, this.fichaActual)){
            this.cantidadFichas--;
            if (this.hayGanador()) {
                var mensajeGanador = document.getElementById('info-ganador');
                if(this.turno === 1)
                    mensajeGanador.innerHTML = 'Gano el JUGADOR 1';
                else
                    mensajeGanador.innerHTML = 'Gano el JUGADOR 2';

                mensajeGanador.classList.remove('oculto');

                this.tablero.pintarFichasGanador();
                this.juegoFinalizado = true;
            }
            else if(this.cantidadFichas === 0){
                this.juegoFinalizado = true;
                var alerta = document.getElementById('info-empate');
                alerta.classList.remove('oculto');
            }
            else
                this.turno = (this.turno === 1) ? 2:1;

        }
        else{
            this.fichaActual.x = this.posInicialX;
            this.fichaActual.y = this.posInicialY;
            this.fichas.push(this.fichaActual);
        }
        this.resetFichaClickeada();
        this.prepareJuego();
    }

    hayGanador(){
        var hayGanador = false;

        if(this.tablero.comprobarVertical() || this.tablero.comprobarHorizontal() ||
        this.tablero.comprobarHorizontal() || this.tablero.comprobarDiagonal()) 
            hayGanador = true;
        
        return hayGanador;

    }

}