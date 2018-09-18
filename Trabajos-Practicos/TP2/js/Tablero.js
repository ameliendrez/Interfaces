class Tablero{

    constructor(ctx){
        this.J1 = 'AA';
        this.J2 = 'BB';
        this.ctx = ctx;
        this.fichas = [];
        this.matriz = [];
    }

    dibujarTablero() {

        ctx.fillStyle="#FF0000";
		// //margen izquierdo, margen arriba, ancho, alto del dibujo!
        ctx.fillRect(145,10,600,400);
        var diferenciaX = Math.floor((691 - 100)/7);
        var diferenciaY = Math.floor((340 - 10)/5);

        // var fichaJ1 = new Ficha (50, 100, 10, 'yellow', 'J1');
        // fichaJ1.setContext(this.ctx);
        // fichaJ1.dibujar();
        // this.fichas.push(fichaJ1);
        // var fichaJ2 = new Ficha (850, 100, 10, 'red', 'J2');
        // fichaJ2.setContext(this.ctx);
        // fichaJ2.dibujar();
        // this.fichas.push(fichaJ2);


        var fx = 110;
        
        for (var x = 0; x < 7; x++){
            fx += diferenciaX;
            var fy = 45;
            for (var y = 0; y < 6; y++) {
                var ficha = new Ficha (fx, fy, 25, 'yellow', 'vacio');
                ficha.setContext(this.ctx);
                ficha.dibujar();
                this.matriz[[fx][fy]] = 0;
                fy += diferenciaY;
            }
        }
    }

    isClicked(x, y) {       
        for (var i=0; i<this.fichas.length; i++) {
            if (this.fichas[i].isClicked(x, y)) {
                console.log('clickeado' + this.fichas[i].getNombre());
                //this.fichas[i].remove();
                this.fichas.splice(i,1);                        
                break;
            }                
        }
    }


}