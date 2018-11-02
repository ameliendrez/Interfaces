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
        
        if (direccion === "ArrowUp") 
            this.nave.classList.add('arriba');
        else if(direccion === "ArrowDown")
            this.nave.classList.add('abajo');
    }

    eliminarMovimientoNave(){
        this.nave.classList.remove('izquierda');
        this.nave.classList.remove('derecha');
        this.nave.classList.remove('arriba');        
        this.nave.classList.remove('abajo');
        this.nave.classList.add('volando');
    }




}