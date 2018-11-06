document.addEventListener("DOMContentLoaded", function(event) {

    var jugar = document.getElementById('jugar');
    var controles = document.getElementById('ver-controles');
    var configuracion = document.getElementById('ver-configuracion');
    var menuBotonera = document.getElementById('botonera');
    var menuControles = document.getElementById('info-controles');
    var menuConfiguracion = document.getElementById('info-configuracion');
    var menuPrincipal = document.getElementById('menu');
    var volverMenu = document.getElementsByClassName('volver');
    var musicaOn = document.getElementById('musica-on');
    var musicaOff = document.getElementById('musica-off');

    var juego = new Juego();

    jugar.onclick = function () {
        menuPrincipal.classList.add('oculto');
        juego.jugar();
    }

    controles.onclick = function () {
        menuBotonera.classList.add('oculto');
        menuControles.classList.remove('oculto');
    }

    configuracion.onclick = function () {
        menuBotonera.classList.add('oculto');
        menuConfiguracion.classList.remove('oculto');
    }

    musicaOn.onclick = function () {
        musicaOn.classList.add('active');
        musicaOff.classList.remove('active');
    }

    musicaOff.onclick = function () {
        musicaOff.classList.add('active');
        musicaOn.classList.remove('active');
    }

    for (let i = 0; i < volverMenu.length; i++) {
        volverMenu[i].onclick = () =>{
            if(!menuConfiguracion.classList.contains('oculto'))
                menuConfiguracion.classList.add('oculto');
            if(!menuControles.classList.contains('oculto'))
                menuControles.classList.add('oculto');
            menuBotonera.classList.remove('oculto'); 
        };
    }

});