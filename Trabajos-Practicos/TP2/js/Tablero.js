class Tablero{

    constructor(ctx){
        this.ctx = ctx;
        this.ranuras = [];
        this.ranurasX = [];
        this.ranurasY = [];
        this.limiteY = 93;
        this.inicioRanuraGanadora = {'x':-1, 'y':-1};
        this.finalRanuraGanadora = {'x':-1, 'y':-1};
        this.direccionGanador = '';
        this.initRanuras();

    }

    initRanuras() {
        var diferenciaX = 95;
        var diferenciaY = 65;
        var fxInit = 320;
        var fy = 130;
        for (let y = 0; y < 7; y++) {
            var fx = fxInit;
            this.ranuras[fy+'-fila'] = [];
            for (let x = 0; x < 6; x++) {
                var ficha = new Ficha (fx, fy, 'white', 0);
                ficha.setContext(this.ctx);  
                this.ranuras[fy+'-fila'][fx+'-columna'] = ficha;
                this.ranurasX.push(fx);
                fx += diferenciaX;
            } 
            this.ranurasY.push(fy);
            fy += diferenciaY;           
        }
    }

    /**
     * Dibuja el tablero y los casilleros para el juego
     */
    dibujarTablero() {
        this.ctx.fillStyle = '#5f9d9f';
        this.ctx.fillRect(0,0,1100,550);
        this.ctx.fillStyle="#213aef";
        this.ctx.fillRect(260,95,600,460);

        for (let columna = 0; columna < this.ranurasX.length; columna++) {
            for (let fila = 0; fila < this.ranurasY.length; fila++) {
               var ficha = this.ranuras[this.ranurasY[fila]+'-fila'][this.ranurasX[columna]+'-columna'];
                ficha.dibujar();
            }   
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
    pudoInsertarFicha(x, y, fichaActual) {
        if (y < this.limiteY)
            return this.buscarRanura(x, fichaActual);
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
    buscarRanura(x, fichaActual) {
        if (x > 250 && x < 850) {
            for(var i = 0; i < 7; i++) {
                if (this.ranurasX[i] > x - 25 && this.ranurasX[i] < x + 25){
                    return this.insertarFicha(this.ranurasX[i], fichaActual);
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
    insertarFicha(x, fichaActual) {
        var posTmpY = -1;
        var pudoInsertar = false;        

        for (let y = 0; y < this.ranurasY.length; y++) {
            var tmpy = this.ranurasY[y];
            if (this.ranuras[tmpy+'-fila'][x+'-columna'].getJugador() === 0){
                posTmpY = tmpy;
                pudoInsertar = true;
            }
        }
        if (posTmpY !== -1) {
            fichaActual.setX(x);
            fichaActual.setY(posTmpY);
            fichaActual.setEstado('inactiva');
            this.ranuras[posTmpY+'-fila'][x+'-columna'] = fichaActual;
        }        
        return pudoInsertar;  
    }

    comprobarVertical() {
        var contador = 0;
        var jugador = -1;
        var hayGanador = false;
        
        for (let columna = 0; columna < 6; columna++) {
            contador = 0;
            for (let fila = 0; fila < 7; fila++) {
                var ficha = this.ranuras[this.ranurasY[fila]+'-fila'][this.ranurasX[columna]+'-columna'];
                var valor = ficha.getJugador();

                if (valor === 0) {
                    contador = 0;
                    jugador = -1;
                }
                else if (valor !== jugador){
                    jugador = valor;
                    contador = 1;
                    this.inicioRanuraGanadora.x = columna;
                    this.inicioRanuraGanadora.y = fila;
                }
                else
                    contador++;
                
                if (contador === 4){                    
                    hayGanador = true; 
                    this.direccionGanador = 'vertical';
                    this.finalRanuraGanadora.x = columna;
                    this.finalRanuraGanadora.y = fila;                  
                    return hayGanador;
                }                
            }
        }

        this.finalRanuraGanadora.x = -1;
        this.finalRanuraGanadora.y = -1;
        return hayGanador;
    }

    comprobarHorizontal() {
        var contador = 0;
        var jugador = -1;
        var hayGanador = false;
        
        for (let fila = 0; fila < this.ranurasY.length; fila++) {
            contador = 0;

            for (let columna = 0; columna < this.ranurasX.length; columna++) {
                var ficha = this.ranuras[this.ranurasY[fila]+'-fila'][this.ranurasX[columna]+'-columna'];
                var valor = ficha.getJugador();

                if (valor === 0) {
                    contador = 0;
                    jugador = -1;
                }
                else if (valor !== jugador){
                    jugador = valor;
                    contador = 1;
                    this.inicioRanuraGanadora.x = columna;
                    this.inicioRanuraGanadora.y = fila;
                }
                else
                    contador++;
                
                if (contador === 4){
                    hayGanador = true;
                    this.direccionGanador = 'horizontal';
                    this.finalRanuraGanadora.x = columna;
                    this.finalRanuraGanadora.y = fila;
                    return hayGanador;
                }
            }
        }
        this.finalRanuraGanadora.x = -1;
        this.finalRanuraGanadora.y = -1;

        return hayGanador;
    }

    comprobarDiagonal(){

    }

    pintarFichasGanador(){
        if (this.direccionGanador === 'vertical'){
            
            var columna = this.inicioRanuraGanadora.x;
            for(var fila = this.inicioRanuraGanadora.y; fila <= this.finalRanuraGanadora.y; fila++) {
               var ficha = this.ranuras[this.ranurasY[fila]+'-fila'][this.ranurasX[columna]+'-columna'];
               ficha.setColor('green');
               ficha.dibujar();
            }
        }
        else if (this.direccionGanador === 'horizontal'){
            var fila = this.inicioRanuraGanadora.y;
            for(var columna = this.inicioRanuraGanadora.x; columna <= this.finalRanuraGanadora.x; columna++) {
                var ficha = this.ranuras[this.ranurasY[fila]+'-fila'][this.ranurasX[columna]+'-columna'];
                ficha.setColor('green');
                ficha.dibujar();                
            }
        }
    }
}