document.addEventListener("DOMContentLoaded", function(event) {

    var jugar = document.getElementById('jugar');
    var jugando = false;
    var nave = document.createElement('div');
    var posX = 480;
    var posY = 50;
    var movimiento = 5;
    var limiteIzquierdo = 100;
    var limiteDerecho = 850;
    var limiteSuperior = 550;
    var limiteInferior = 15;
    

    jugar.onclick = function () {
        var paralaxBackground = document.getElementById('paralax-background-content');
        paralaxBackground.classList.toggle('playing');
        nave.id = 'nave';
        nave.width = '20px';
        nave.height = '20px';
        nave.top = 0;
        nave.style.bottom = posY+'px';
        nave.style.left = posX+'px';
        nave.right = 0;

        paralaxBackground.append(nave);
        jugando = true;
    }

    document.addEventListener("keydown", function (e) {
        if(jugando){
            if(e.code === "ArrowLeft"){
                if(posX - movimiento > limiteIzquierdo){
                    posX -= movimiento;
                    nave.classList.add('izquierda');
                }
            }
            else if (e.code === "ArrowRight"){
                if(posX + movimiento< limiteDerecho){
                    posX += movimiento;
                    nave.classList.add('derecha');
                }
            }
            else if (e.code === "ArrowUp") {
                if(posY + movimiento < limiteSuperior){
                    posY += movimiento;
                    nave.classList.add('arriba');
                }
            }
            else if(e.code === "ArrowDown"){
                if(posY - movimiento > limiteInferior){
                    posY -= movimiento;
                    
                    nave.classList.add('abajo');
                }
            }

            nave.getBoundingClientRect();
            nave.style.left = posX+'px';
            nave.style.bottom = posY+'px';


        }
    });

    document.addEventListener("keypress", function (e) {
        if(jugando){
            if(e.code === "ArrowLeft"){
                if(posX - movimiento > limiteIzquierdo){
                    posX -= movimiento;
                    nave.classList.add('izquierda');
                }
            }
            else if (e.code === "ArrowRight"){
                if(posX + movimiento< limiteDerecho){
                    posX += movimiento;
                    nave.classList.add('derecha');
                }
            }
            else if (e.code === "ArrowUp") {
                if(posY + movimiento < limiteSuperior){
                    posY += movimiento;
                    nave.classList.add('arriba');
                }
            }
            else if(e.code === "ArrowDown"){
                if(posY - movimiento > limiteInferior){
                    posY -= movimiento;
                    
                    nave.classList.add('abajo');
                }
            }

            nave.style.left = posX+'px';
            nave.style.bottom = posY+'px';


        }
    });

    document.addEventListener("keyup", function (e) {
        if(jugando){
            
            nave.classList.remove('izquierda');
            nave.classList.remove('derecha');
            nave.classList.remove('abajo');
            nave.classList.remove('arriba');
        }
    });


});