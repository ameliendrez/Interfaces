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
                var ficha = new Ficha (fx, fy, 'ranuras', 0);
                ficha.setContext(this.ctx);  
                this.ranuras[fy+'-fila'][fx+'-columna'] = ficha;
                this.ranurasX.push(fx);
                fx += diferenciaX;
            } 
            this.ranurasY.push(fy);
            fy += diferenciaY;           
        }
    }

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

    pudoInsertarFicha(x, y, fichaActual) {
        if (y < this.limiteY && x > 250 && x < 850)
            return this.buscarRanura(x, fichaActual);
        return false;
    } 

    buscarRanura(x, fichaActual) {
        for(var i = 0; i < 7; i++) {
            if (this.ranurasX[i] > x - 25 && this.ranurasX[i] < x + 25){
                return this.insertarFicha(this.ranurasX[i], fichaActual);
            }                    
        };
        return false;
    }

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
        
        for (let fila = 0; fila < 7; fila++) {
            contador = 0;
            for (let columna = 0; columna < 6; columna++) {
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
        var hayGanador = false;
        if (this.comprobarDiagonalDerecha() || this.comprobarDiagonalIzquierda())
            hayGanador = true;
        return hayGanador;
    }

    comprobarDiagonalDerecha() {
        var hayGanador = false;
        for (let fila = 3; fila < 7; fila++) {
            for (let columna = 0; columna < 3; columna++) {
                var valorTmpY = fila;
                var valorTmpX = columna;
                var valor = this.ranuras[this.ranurasY[valorTmpY]+'-fila'][this.ranurasX[valorTmpX]+'-columna'].getJugador();
                var fourInLine = false;
                if (valor !== 0) {
                    for (let i = 0; i < 3; i++) {
                        valorTmpY--;
                        valorTmpX++;
                        var valorTmp = this.ranuras[this.ranurasY[valorTmpY]+'-fila'][this.ranurasX[valorTmpX]+'-columna'].getJugador();
                        if (valor !== valorTmp)
                            break;
                        if (i === 2)
                            fourInLine = true;
                    }
                }

                if (fourInLine){
                    hayGanador = true;
                    this.direccionGanador = 'diagonalDerecha';
                    this.inicioRanuraGanadora.x = columna;
                    this.inicioRanuraGanadora.y = fila;
                    this.finalRanuraGanadora.x = valorTmpX;
                    this.finalRanuraGanadora.y = valorTmpY;
                    return hayGanador;
                }
            }
        }
        this.finalRanuraGanadora.x = -1;
        this.finalRanuraGanadora.y = -1;
        return hayGanador;
    }

    comprobarDiagonalIzquierda() {
        var hayGanador = false;
        for (let fila = 6; fila > 2; fila--) {
            for (let columna = 5; columna > 3; columna--) {
                var valorTmpY = fila;
                var valorTmpX = columna;
                var valor = this.ranuras[this.ranurasY[valorTmpY]+'-fila'][this.ranurasX[valorTmpX]+'-columna'].getJugador();
                var fourInLine = false;
                if (valor !== 0) {
                    for (let i = 0; i < 3; i++) {
                        valorTmpY--;
                        valorTmpX--;
                        var valorTmp = this.ranuras[this.ranurasY[valorTmpY]+'-fila'][this.ranurasX[valorTmpX]+'-columna'].getJugador();
                        if (valor !== valorTmp)
                            break;
                        if (i === 2)
                            fourInLine = true;
                    }
                }

                if (fourInLine){
                    hayGanador = true;
                    this.direccionGanador = 'diagonalIzquierda';
                    this.inicioRanuraGanadora.x = columna;
                    this.inicioRanuraGanadora.y = fila;
                    this.finalRanuraGanadora.x = valorTmpX;
                    this.finalRanuraGanadora.y = valorTmpY;                    
                    return hayGanador;
                }
            }
        }
        this.finalRanuraGanadora.x = -1;
        this.finalRanuraGanadora.y = -1;
        return hayGanador;
    }
}