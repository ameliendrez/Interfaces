class Jugador{
    constructor(ctx, nombre){
        this.ctx = ctx;
        this.fichas = [];
        this.nombre = nombre;
        //this.drawFichas();

    }

    drawFichas(){
        var xTmpInit = 50;
        var tmpY = 130;
        var radio = 25;

        for (var fila = 0; fila < 7; fila++) {
            var tmpX = xTmpInit;
            for(var columna = 0; columna < 3; columna++) {
                var ficha = new Ficha (tmpX, tmpY, radio, 'yellow', 'J1');
                ficha.setContext(this.ctx);
                ficha.dibujar();
                this.fichas.push(ficha);
                tmpX += 65;
            }

            tmpY += 65;
        }
        
    }

        // var fichaJ2 = new Ficha (850, 100, 10, 'red', 'J2');
        // fichaJ2.setContext(this.ctx);
        // fichaJ2.dibujar();
        // this.fichas.push(fichaJ2);
    
}