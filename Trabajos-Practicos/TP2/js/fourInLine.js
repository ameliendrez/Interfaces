document.addEventListener("DOMContentLoaded", function(event) {

    var canvas = document.getElementById('tablero');
    var ctx = canvas.getContext('2d');
    var tablero = new Tablero(ctx);
    tablero.dibujarTablero();
    
    canvas.onmousedown = function (e) {
        var x = e.layerX - e.currentTarget.offsetLeft;
        var y = e.layerY - e.currentTarget.offsetTop;            
        tablero.isClickedFicha(x, y);
    }

    canvas.onclick = function (e) {
        var x = e.layerX - e.currentTarget.offsetLeft;
        var y = e.layerY - e.currentTarget.offsetTop;
        var jugador = 1;
        
        tablero.puedeInsertarFicha(x,y);
        
        //console.log((tablero.puedeInsertarFicha(x, y) === true)? "Puede":"No puede");
        
        
    };

});

