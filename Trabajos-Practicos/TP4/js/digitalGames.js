document.addEventListener("DOMContentLoaded", function(event) {

    var jugar = document.getElementById('jugar');
    var jugando = false;
    var nave = document.createElement('div');
    var posX = 0;
    var posY = 0;


    jugar.onclick = function () {
        var paralaxBackground = document.getElementById('paralax-background-content');
        paralaxBackground.classList.toggle('playing');
        nave.id = 'nave';
        nave.width = '20px';
        nave.height = '20px';
        nave.top = 0;
        nave.style.bottom = '50px';
        nave.style.left = '480px';
        nave.right = 0;

        paralaxBackground.append(nave);
        jugando = true;
    }

    document.addEventListener("keydown", function (e) {
        if(jugando){
            if(e.keyCode === 37)
                nave.classList.add('izquierda');
            else if (e.keyCode === 39)
                nave.classList.add('derecha');
        }
    });

    document.addEventListener("keyup", function (e) {
        if(jugando){
            var posicion = nave.getBoundingClientRect();

            
            nave.classList.remove('izquierda');
            nave.classList.remove('derecha');
            
            nave.style.left = posicion.left;
            nave.style.bottom = posicion.bottom


        }
    });


});