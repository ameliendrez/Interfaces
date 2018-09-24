class Juego{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.tablero = new Tablero(this.ctx);
        this.j1 = new Jugador (this.ctx, 'Jugador 1');
        this.j2 = new Jugador (this.ctx, 'Jugador 2');
        this.fichas = [];
        this.turno = 1;
        this.fichaActual = null;
        this.posInicialX;
        this.posInicialY;
        this.fichaClickeada = false;
        this.drawFichasInit();
    }

    prepareJuego(){        
        this.tablero.dibujarTablero();       
        this.setFichas();
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
        var xTmpInit = 50;
        var tmpY = 130;
        var radio = 25;

        for (var fila = 0; fila < 7; fila++) {
            var tmpX = xTmpInit;
            for(var columna = 0; columna < 3; columna++) {
                var ficha = new Ficha (tmpX, tmpY, radio, 'yellow', 'J1');
                ficha.setContext(this.ctx);
                //ficha.dibujar();
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
            if (this.fichas[i].isClicked(x, y)) {
                this.fichaActual = this.fichas[i];
                this.fichaClickeada = true;
                this.fichas.splice(i,1);     
                this.posInicialX = this.fichaActual.x;
                this.posInicialY = this.fichaActual.x;    
                return true;
            }                
        }
    }

    insertarFicha(x, y){
        var jugador = (this.turno === 1) ? this.j1:this.j2;

        if(this.tablero.pudoInsertarFicha(x, y, this.turno, jugador, this.fichaActual)){
            this.prepareJuego();
            this.turno = (this.turno === 1) ? 2:1;
            if (this.hayGanador()) {
                               
            }
        }
        else{
            // Volver a poner la ficha en su lugar
        }
    }

    hayGanador(){

        var hayGanador = false;


        if(this.tablero.comprobarVertical()) {
            hayGanador = true;
            console.log('hay ganador vertical'); 
            // Pintar la Vertical ganadora y bloquear el juego

        }
        else if (this.tablero.comprobarHorizontal()){
            hayGanador = true;
            console.log('hay ganador horizontal'); 
            // Pintar la horizontal ganadora y bloquear el juego
        }
        // else if (this.tablero.comprobarDiagonal()) {
        //     hayGanador = true;
        //     //pintar diagonal ganadora;
        // }

        return hayGanador;

    }

}