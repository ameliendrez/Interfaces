class Jugador{
    constructor(ctx, nombre, nroJugador){
        this.ctx = ctx;
        this.nombre = nombre;
        this.nroJugador = nroJugador;
        //Fichas deberian ser de cada jugador
        //Implementar si tengo tiempo
    }

    getNombre(){
        return this.nombre;
    }

    getNroJugador() {
        return this.nroJugador;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }

}