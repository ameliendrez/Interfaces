class Animacion{
    constructor(background){
        this.paralaxBackground = background;
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




}