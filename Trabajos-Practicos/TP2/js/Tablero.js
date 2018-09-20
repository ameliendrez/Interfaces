class Tablero{

    constructor(ctx){
        this.J1 = 'AA';
        this.J2 = 'BB';
        this.ctx = ctx;
        this.fichas = [];
        //this.casilleros = [];
        this.matriz = [];
        this.limiteY = 93;
        this.ranurasX = [];
        this.ranurasY = [];
        this.radio = 25;
        this.mtmp = [];

    }

    dibujarTablero() {

        this.ctx.fillStyle="#213aef";
		// //margen izquierdo, margen arriba, ancho, alto del dibujo!
        this.ctx.fillRect(250,95,600,400);
        var diferenciaX = Math.floor((691 - 100)/6);
        var diferenciaY = Math.floor((340 - 10)/5);

        // var fichaJ1 = new Ficha (50, 100, 10, 'yellow', 'J1');
        // fichaJ1.setContext(this.ctx);
        // fichaJ1.dibujar();
        // this.fichas.push(fichaJ1);
        // var fichaJ2 = new Ficha (850, 100, 10, 'red', 'J2');
        // fichaJ2.setContext(this.ctx);
        // fichaJ2.dibujar();
        // this.fichas.push(fichaJ2);


        var fxInit = 300;
        var fy = 130;
        for (let y = 0; y < 7; y++) {
            var fx = fxInit;
            this.mtmp[fy+'-fila'] = [];
            for (let x = 0; x < 6; x++) {
                var ficha = new Ficha (fx, fy, 25, 'white', 'vacio');
                ficha.setContext(this.ctx);
                ficha.dibujar();
                this.matriz.push({"x":fx, "y":fy, "id":0});
                this.mtmp[fy+'-fila'][fx+'-columna'] = 0;
                if (y === 0)
                    this.ranurasX.push(fx);
                fx += diferenciaX;
            } 
            this.ranurasY.push(fy);
            fy += diferenciaY;           
        }
    }

    isClickedFicha(x, y) {       
        for (var i=0; i<this.fichas.length; i++) {
            if (this.fichas[i].isClicked(x, y)) {
                console.log('clickeado' + this.fichas[i].getNombre());
                //this.fichas[i].remove();
                this.fichas.splice(i,1);                        
                break;
            }                
        }
    }

    puedeInsertarFicha(x, y) {

        if (y < this.limiteY)
            return this.buscarRanura(x);
        return false;
    } 

    buscarRanura(x) {
        
        if (x > 250 && x < 850) {
            for(var i = 0; i < 7; i++) {
                if (this.ranurasX[i] > x - this.radio && this.ranurasX[i] < x + this.radio){

                    this.insertarFicha(this.ranurasX[i]);
                    return true;
                }                    
            };
        }
        return false;
    }

    insertarFicha(x) {
        var posTmpY = 0;
        console.log(this.mtmp);


        for (let y = 0; y < this.ranurasY.length-1; y++) {

            var tmpy = this.ranurasY[y];
            console.log('tmpy ' + tmpy);
            
            //console.log(this.mtmp[tmp][x]);
            
            if (this.mtmp[tmpy+'-fila'][x+'-columna'] === 0){

                posTmpY = tmpy;
                console.log(this.mtmp[tmpy+'-fila'][x+'-columna']);
                
            }
            

        }
        
        this.mtmp[posTmpY+'-fila'][x+'-columna'] = 1;
        var ficha = new Ficha (x, posTmpY, 25, 'red', 'j1');
        ficha.setContext(this.ctx);
        ficha.dibujar();

    }

}