class Tablero{

    constructor(ctx){
        this.J1 = 'AA';
        this.J2 = 'BB';
        this.ctx = ctx;
        this.fichas = [];
    }

    dibujarTablero() {

        var fichaJ1 = new Ficha (100, 100, 50, 'yellow', 'J1');
        fichaJ1.setContext(this.ctx);
        fichaJ1.dibujar();
        this.fichas.push(fichaJ1);
        var fichaJ2 = new Ficha (400, 100, 50, 'red', 'J2');
        fichaJ2.setContext(this.ctx);
        fichaJ2.dibujar();
        this.fichas.push(fichaJ2);
    }

    isClicked(x, y) { 
        console.log(this.fichas);
      
        for (var i=0; i<this.fichas.length; i++) {
            if (this.fichas[i].isClicked(x, y)) {
                console.log('clickeado' + this.fichas[i].getNombre());
                //this.fichas[i].remove();
                this.fichas.splice(i,1);                        
                break;
            }                
        }
        console.log(this.fichas);

    }


}