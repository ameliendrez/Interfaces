document.addEventListener("DOMContentLoaded", function(event) {

    var jugar = document.getElementById('jugar');
    var juego = new Juego();
 
    jugar.onclick = function () {
        juego.jugar();
    }

});