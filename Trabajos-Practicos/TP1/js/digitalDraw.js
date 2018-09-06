document.addEventListener("DOMContentLoaded", function(event) {

    var subir = document.getElementById("subirImagen");
    var descargar = document.getElementById("descargarProyecto");
    var paginaBlanco = document.getElementById("nuevoProyecto");
    var seleccionarLapiz = document.getElementById("seleccionar-lapiz");
    var seleccionarBorrador = document.getElementById("seleccionar-borrar");
    var mostrarSeleccionarColor = document.getElementById("ver-colores");
    var mostrarFiltros = document.getElementById("ver-filtros");
    var btnUpload = document.getElementById("addImage");
    var colores = document.getElementsByClassName("colores");
    var infoAdicional = document.getElementsByClassName('infoAdiccional');
    var posicionCanvas = document.getElementsByClassName('editor-canvas');
    var lienzo = document.getElementById('lienzo');
    var filtros = document.getElementsByClassName('filtros');
    var selectorFiltro = document.getElementsByClassName('filtrosCanvas');
    var imagen = new Image();


    preparePreventDefault();
    prepareColoresClick();
    prepareSelectoresFiltro();

    subir.onclick = function (e) {
        btnUpload.click();
    }

    btnUpload.onchange = function (e) {
        var files = e.target.files; // FileList object
        var file = files[0];
        if(file.type.match('image.*')) {
            imagen.src = window.URL.createObjectURL(file);
            imagen.onload = function () {
                myDrawImageMod(imagen);		
                if(infoAdicional[0].classList.contains('oculto')){
                    mostrarFiltroColores();
                    mostrarFiltros.classList.add('activo');
                }
                if(mostrarFiltros.classList.contains('activo'))
                    mostrarFiltrosBasicos();	
            }
        } 
        else {
            console.log("no es una imagen");
        }
    }

    mostrarSeleccionarColor.onclick = function (e) {
        selectColor();
    }

    mostrarFiltros.onclick = function (e) {
        if (mostrarSeleccionarColor.classList.contains('activo')){
            mostrarSeleccionarColor.classList.remove('activo');    
            if(infoAdicional[0].classList.contains('oculto'))
                toggleFiltrosColores();
        }
        else
            toggleFiltrosColores();
        mostrarFiltros.classList.add('activo');
        ocultarColores();
        mostrarFiltrosBasicos();
    }

    seleccionarLapiz.onclick = function (e) {
        mostrarFiltroColores();
        mostrarColores();
        ocultarFiltros();
        for (let i = 0; i < colores.length; i++) {
            if(colores[i].classList.contains('negro')){
                colores[i].classList.add('active');
                break;
            }   
        }
    }

    /**
     * Previene la accion de los tags 'a'
     */
    function preparePreventDefault(){
        let acciones = document.getElementsByTagName('a');
        for (let i = 0; i < acciones.length; i++) {
            acciones[i].onclick = function(e){
                e.preventDefault();      
            }
        }
    }
    
    /**
     * Prepara la accion de click de un color especifico
     */
    function prepareColoresClick() {
        for (let i = 0; i < colores.length; i++) {
            colores[i].onclick = function(e){
                removeColorActive();
                colores[i].classList.add('active');
            }
        }
    }

    /**
     * Remueve la clase active de los colores
     */
    function removeColorActive() {
        for (let i = 0; i < colores.length; i++) {
            if(colores[i].classList.contains('active')){
                colores[i].classList.remove('active');
            }
        }
    }

    function prepareSelectoresFiltro(){
        for (let i = 0; i < selectorFiltro.length; i++) {
            selectorFiltro[i].onclick = function(e){
                removeFiltroActive();
                var filtro = selectorFiltro[i].id;

                if(filtro !== 'inicial') {
                    var ctx = lienzo.getContext('2d');
                    var width = lienzo.width;
                    var height = lienzo.height;
                    modifyImage(ctx, width, height, filtro);
                }
                else
                    myDrawImageMod(imagen);		
                selectorFiltro[i].classList.add('active');
            }
        }
    }

    function removeFiltroActive(){
        for (let i = 0; i < selectorFiltro.length; i++) {
            if(selectorFiltro[i].classList.contains('active')){
                selectorFiltro[i].classList.remove('active');
            }
        }
    }

    /**
     * Muestra el bloque destinado para mostrar filtros o colores para editar
     */
    function toggleFiltrosColores(){
        if(infoAdicional[0].classList.contains('oculto'))
            mostrarFiltroColores();
        else
            ocultarFiltroColores();
    }

    /**
     * Muestra el bloque que contiene los colores o los filtros
     */
    function mostrarFiltroColores (){
        posicionCanvas[0].classList.remove('col-md-offset-1');
        infoAdicional[0].classList.remove('oculto');
    }

     /**
     * Oculta el bloque que contiene los colores o los filtros
     */
    function ocultarFiltroColores(){
        posicionCanvas[0].classList.add('col-md-offset-1');
        infoAdicional[0].classList.add('oculto');
    }
    
    function mostrarColores() {
        for(let i = 0; i< colores.length; i++){
            if(colores[i].classList.contains('oculto')){
                colores[i].classList.remove('oculto');
            }
        }
    }

    function ocultarColores() {
        for(let i = 0; i< colores.length; i++){
            if(!colores[i].classList.contains('oculto')){
                colores[i].classList.add('oculto');
            }
        }
    }

    function mostrarFiltrosBasicos(){
        if (imagen.src != '') {
            for(let i = 0; i< filtros.length; i++){
                if(filtros[i].classList.contains('oculto')){
                    filtros[i].classList.remove('oculto');
                }
            }
        }
    }

    function ocultarFiltros(){
        for(let i = 0; i< filtros.length; i++){
            if(!filtros[i].classList.contains('oculto')){
                filtros[i].classList.add('oculto');
            }
        }
    }

    function selectColor(){
        if (mostrarFiltros.classList.contains('activo')){
            mostrarFiltros.classList.remove('activo');
            if(infoAdicional[0].classList.contains('oculto'))
                toggleFiltrosColores();
        }
        else
            toggleFiltrosColores();
        
        mostrarSeleccionarColor.classList.add('activo');
        mostrarColores();
        ocultarFiltros();
    }

    function myDrawImageMod(image, ctx, width, height){
        ctx = lienzo.getContext("2d");

        var img = image;

        pasteFiltro (img, 'inicial');
        pasteFiltro (img, 'sepia');
        pasteFiltro (img, 'negativo');
        pasteFiltro (img, 'escalaGrises');
        pasteFiltro (img, 'binario');

        var width = lienzo.width;
        var height = lienzo.height;
        ctx.drawImage(image, 0, 0, width, height);
    }

    function pasteFiltro(img, filtro=null) {
        var imagenNueva = new Image();
        imagenNueva = img;

        var tmp = document.getElementById(filtro);
        var ctx = tmp.getContext('2d');
        var width = tmp.width;
        var height = tmp.height;
        ctx.drawImage(imagenNueva, 0, 0, width, height);

        if(filtro !== 'inicial')
            modifyImage(ctx, width, height, filtro);
        else{
            tmp.classList.add('active');
        }
    }

    

    function modifyImage(ctx, width, height, filtro=null) {

        var imageData = ctx.getImageData(0, 0, width, height);
    
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
    
                var variables = getFiltro(filtro, imageData, x, y);
                r = (variables.r > 255) ? 255: (variables.r < 0) ? 0 : variables.r;
                g = (variables.g > 255) ? 255: (variables.g < 0) ? 0 : variables.g;
                b = (variables.b > 255) ? 255: (variables.b < 0) ? 0 : variables.b;
                setPixel(imageData, x, y, r, g, b, 255);
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function setPixel(imageData, x, y, r, g, b, a) {
        index = (x + y * imageData.width) * 4;			
        imageData.data[index+0] = r;
        imageData.data[index+1] = g;
        imageData.data[index+2] = b;
    }

    function getFiltro(filtro, imageData, x, y) {
        index = (x + y * imageData.width) * 4;			

        var verde = {
            'r' : Math.floor(imageData.data[index+0] - 100),
            'g' : Math.floor(imageData.data[index+0] + 25),
            'b' : Math.floor(imageData.data[index+0] - 60)
        };

        var rojo = {
            'r' : Math.floor(imageData.data[index+0] + 100),
            'g' : Math.floor(imageData.data[index+1] -60),
            'b' : Math.floor(imageData.data[index+2] -60)
        };
        var ninguno = {
            'r' : imageData.data[index+0],
            'g' : imageData.data[index+1],
            'b' : imageData.data[index+2]
        };
        var gris = {
            'r' : Math.floor((imageData.data[index+0] + imageData.data[index+1] + imageData.data[index+2])/3),
            'g' : Math.floor((imageData.data[index+0] + imageData.data[index+1] + imageData.data[index+2])/3),
            'b' : Math.floor((imageData.data[index+0] + imageData.data[index+1] + imageData.data[index+2])/3)
        }
        var negativo = {
            'r' : Math.floor(255 - imageData.data[index+0]),
            'g' : Math.floor(255 - imageData.data[index+1]),
            'b' : Math.floor(255 - imageData.data[index+2])
        }
        var sepia = {
            'r' : Math.floor((gris.r * .393) + (gris.g *.769) + (gris.b * .189)) ,
            'g' : Math.floor((gris.r * .349) + (gris.g *.686) + (gris.b * .168)),
            'b' : Math.floor((gris.r * .272) + (gris.g *.534) + (gris.b * .131))
        }
        var binario = {
            'r' : (Math.floor((imageData.data[index+0] + imageData.data[index+1] + imageData.data[index+2])/3) > (255/2)) ? 255 : 0,
            'g' : (Math.floor((imageData.data[index+0] + imageData.data[index+1] + imageData.data[index+2])/3) > (255/2)) ? 255 : 0,
            'b' : (Math.floor((imageData.data[index+0] + imageData.data[index+1] + imageData.data[index+2])/3) > (255/2)) ? 255 : 0
        }


        if(filtro === 'verde')
            return verde;
        else if (filtro === 'rojo')
            return rojo;
        else if (filtro === 'escalaGrises')
            return gris;
        else if (filtro === 'negativo')
            return negativo;
        else if (filtro === 'sepia')
            return sepia;
        else if (filtro === 'binario')
            return binario;
        else 
            return ninguno;
    }






});








function dibujarLinea() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext){
      var ctx = canvas.getContext('2d');
  
      ctx.beginPath();
      ctx.moveTo(75,50);
      ctx.lineTo(100,75);
      ctx.lineTo(100,25);
      ctx.closePath();
      ctx.fill();
    }
  }
