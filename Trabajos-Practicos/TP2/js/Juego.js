class Juego{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.tablero = new Tablero(this.ctx);
        this.j1;
        this.j2;
        this.fichas = [];
        this.turno = 1;
    }

    prepareJuego(){
        this.tablero.dibujarTablero();
        this.j1 = 'Agustin';
        this.j2 = 'Pepe';
    }

    isClickedFicha(x, y) {       
        for (var i=0; i<this.fichas.length; i++) {
            if (this.fichas[i].isClicked(x, y)) {
                this.fichas.splice(i,1);                        
                break;
            }                
        }
    }

    insertarFicha(x, y){
        var jugador = (this.turno === 1) ? this.j1:this.j2;

        if(this.tablero.pudoInsertarFicha(x, y, this.turno, jugador)){
            this.turno = (this.turno === 1) ? 2:1;
            if (this.hayGanador()) {
                console.log('hay ganador');                
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
            // Pintar la Vertical ganadora y bloquear el juego

        }
        else if (this.tablero.comprobarHorizontal()){
            hayGanador = true;
            // Pintar la horizontal ganadora y bloquear el juego
        }
        // else if (this.tablero.comprobarDiagonal()) {
        //     hayGanador = true;
        //     //pintar diagonal ganadora;
        // }

        return hayGanador;

    }

}