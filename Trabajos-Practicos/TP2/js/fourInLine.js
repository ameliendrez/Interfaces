document.addEventListener("DOMContentLoaded", function(event) {

    var canvas = document.getElementById('tablero');
    var juego = new Juego(canvas);
    juego.prepareJuego();
    initEvents();



    function initEvents() {
        canvas.onmousedown = function (e) {
            var x = e.layerX - e.currentTarget.offsetLeft;
            var y = e.layerY - e.currentTarget.offsetTop;            
            juego.isClickedFicha(x, y);
        }
    
        canvas.onmouseup = function (e) {
            var x = e.layerX - e.currentTarget.offsetLeft;
            var y = e.layerY - e.currentTarget.offsetTop;
            juego.insertarFicha(x,y);            
        };
        
    }
});

