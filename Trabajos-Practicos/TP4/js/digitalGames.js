document.addEventListener("DOMContentLoaded", function(event) {

    var jugar = document.getElementById('jugar');
    var jugando = false;
    var nave = document.createElement('div');


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

            console.log('nave izquierda : ' + posicion.left);
            console.log('nave derecha : ' + posicion.right);
            
            nave.classList.remove('izquierda');
            nave.classList.remove('derecha');
            console.log('izquierda : ' + posicion.left);
            console.log('derecha : ' + posicion.right);

            
            nave.style.left = posicion.left;
            nave.style.bottom = posicion.bottom

            console.log('nave izquierda : ' + posicion.left);
            console.log('nave derecha : ' + posicion.right);

        }
    });


});