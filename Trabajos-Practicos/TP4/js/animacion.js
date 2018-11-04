class Animacion{
    constructor(background, nave){
        this.paralaxBackground = background;
        this.nave = nave;
    }

    iniciarAnimacionFondo() {
        this.paralaxBackground.classList.add('playing');
    }

    finalizarAnimacionFondo(){
        this.paralaxBackground.classList.remove('playing');
    }

    getContainer() {
        return this.paralaxBackground;
    }

    agregarMovimientoNave(direccion){
        this.nave.classList.remove('volando');

        if(direccion === "ArrowLeft")
            this.nave.classList.add('izquierda');
        else if (direccion === "ArrowRight")
            this.nave.classList.add('derecha');
    }

    eliminarMovimientoNave(){
        this.nave.classList.remove('izquierda');
        this.nave.classList.remove('derecha');
        this.nave.classList.add('volando');
    }

    destruccionNaveJugador(){
        this.nave.classList.remove('izquierda');
        this.nave.classList.remove('derecha');
        this.nave.classList.remove('volando');
        this.nave.classList.add('cayendo');
    }




}