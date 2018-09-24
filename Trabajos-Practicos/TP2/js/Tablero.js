class Tablero{

    constructor(ctx){
        this.ctx = ctx;
        this.ranuras = [];
        this.ranurasX = [];
        this.ranurasY = [];
        this.limiteY = 93;
        this.radio = 25;
    }

    /**
     * Dibuja el tablero y los casilleros para el juego
     */
    dibujarTablero() {
        this.ctx.fillStyle = '#5f9d9f';
        this.ctx.fillRect(0,0,1100,550);
        this.ctx.fillStyle="#213aef";
        this.ctx.fillRect(250,95,600,460);
        var diferenciaX = 95;
        var diferenciaY = 65;

        var fxInit = 300;
        var fy = 130;
        for (let y = 0; y < 7; y++) {
            var fx = fxInit;
            this.ranuras[fy+'-fila'] = [];
            for (let x = 0; x < 6; x++) {
                var ficha = new Ficha (fx, fy, 25, 'white', 'vacio');
                ficha.setContext(this.ctx);
                ficha.dibujar();    
                this.ranuras[fy+'-fila'][fx+'-columna'] = 0;
                this.ranurasX.push(fx);
                fx += diferenciaX;
            } 
            this.ranurasY.push(fy);
            fy += diferenciaY;           
        }
    }

    /**
     * 
     * Funcion booleana que intenta insertar una ficha y devuelve el resultado (booleana)
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} turno 
     * @param {*} jugador 
     */
    pudoInsertarFicha(x, y, turno, jugador, fichaActual) {
        if (y < this.limiteY)
            return this.buscarRanura(x, turno, jugador, fichaActual);
        return false;
    } 


    /**
     * 
     * Indica si se esta intentando insertar una ficha en una ranura permitida o no
     * En caso de encontrar la ranura, inserta la ficha
     * 
     * @param {*} x 
     * @param {*} turno 
     * @param {*} jugador 
     * 
     * Retorna si pudo o no
     */
    buscarRanura(x, turno, jugador, fichaActual) {
        if (x > 250 && x < 850) {
            for(var i = 0; i < 7; i++) {
                if (this.ranurasX[i] > x - this.radio && this.ranurasX[i] < x + this.radio){
                    this.insertarFicha(this.ranurasX[i], turno, jugador, fichaActual);
                    return true;
                }                    
            };
        }
        return false;
    }

    /**
     * 
     * Inserta la ficha en una ranura, en el caso de que no este la columna completa
     * 
     * @param {*} x 
     * @param {*} turno
     * @param {*} jugador 
     * 
     * Retorna si pudo o no
     */
    insertarFicha(x, turno, jugador, fichaActual) {
        var posTmpY = -1;
        var puedeInsertar = false;
        var color = (turno === 1) ? 'red': 'yellow';

        for (let y = 0; y < this.ranurasY.length; y++) {
            var tmpy = this.ranurasY[y];
            if (this.ranuras[tmpy+'-fila'][x+'-columna'] === 0){
                posTmpY = tmpy;
                puedeInsertar = true;
            }
        }
        if (posTmpY !== -1) {
            this.ranuras[posTmpY+'-fila'][x+'-columna'] = turno;
            fichaActual.x = x;
            fichaActual.y = posTmpY;
            // var ficha = new Ficha (x, posTmpY, 25, color, jugador);
            // ficha.setContext(this.ctx);
            // ficha.dibujar();
        }
        return puedeInsertar;  
    }

    comprobarVertical() {
        var contador = 0;
        var jugador = -1;
        var hayGanador = false;

        for (let columna = 0; columna < this.ranurasX.length; columna++) {
            contador = 0;
            for (let fila = 0; fila < this.ranurasY.length; fila++) {

                var valor = this.ranuras[this.ranurasY[fila]+'-fila'][this.ranurasX[columna]+'-columna'];
                if (valor === 0) {
                    contador = 0;
                    jugador = -1;
                }
                else if (valor !== jugador){
                    jugador = valor;
                    contador = 1;
                }
                else
                    contador++;
                
                if (contador === 4){
                    hayGanador = true;
                    return hayGanador;
                }
            }
        }

        return hayGanador;
    }

    comprobarHorizontal() {
        var contador = 0;
        var jugador = -1;
        var hayGanador = false;
        
        for (let fila = 0; fila < this.ranurasY.length; fila++) {
            contador = 0;

            for (let columna = 0; columna < this.ranurasX.length; columna++) {

                var valor = this.ranuras[this.ranurasY[fila]+'-fila'][this.ranurasX[columna]+'-columna'];
                if (valor === 0) {
                    contador = 0;
                    jugador = -1;
                }
                else if (valor !== jugador){
                    jugador = valor;
                    contador = 1;
                }
                else
                    contador++;
                
                if (contador === 4){
                    hayGanador = true;
                    return hayGanador;
                }
            }
        }

        return hayGanador;
    }

    comprobarDiagonal(){

    }


}