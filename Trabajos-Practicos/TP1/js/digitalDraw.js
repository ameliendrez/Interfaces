document.addEventListener("DOMContentLoaded", function(event) {

    var descargar = document.getElementById("descargarProyecto");
    var subir = document.getElementById("subirImagen");
    var btnUpload = document.getElementById("addImage");
    var paginaBlanco = document.getElementById("nuevoProyecto");

    var infoAdicional = document.getElementById('infoAdicional');
    var posicionCanvas = document.getElementById('editor-canvas');
    var lienzo = document.getElementById('lienzo');
    var ctxLienzo = lienzo.getContext('2d');
    var imagen = new Image();

    var seleccionarLapiz = document.getElementById("seleccionar-lapiz");
    var seleccionarBorrador = document.getElementById("seleccionar-borrar");
    var mostrarConfig = document.getElementById("ver-config");
    var mostrarFiltros = document.getElementById("ver-filtros");

    var configFiltros = document.getElementById("config-filtros");
    var selectorFiltro = document.getElementsByClassName('filtrosCanvas');

    var config = document.getElementById("config");
    var selectorTamanioLapiz = document.getElementById('tamanio-lapiz');
    var colores = document.getElementsByClassName("colores");
    var tamanio = 5;
    var pintando = false;
    var posicionCursor = {
        x : -1,
        y : -1
    };



    

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    
    preparePreventDefault();
    prepareColoresClick();
    prepareSelectoresFiltro();
    prepareFiltros();


  
    mostrarFiltros.onclick = function () {
        if(mostrarConfig.classList.contains('active')){
            mostrarConfig.classList.remove('active');
            if(infoAdicional.classList.contains('oculto'))
                mostrarFiltroColores();
        }
        else
            toggleFiltroColores();

        this.classList.toggle('active');
        configFiltros.classList.remove('oculto');
        config.classList.add('oculto');
    }

    mostrarConfig.onclick = function () {
        mostrarConfiguracion();
    }

    function mostrarConfiguracion() {
        if (mostrarFiltros.classList.contains('active')){
            mostrarFiltros.classList.remove('active');
            if(infoAdicional.classList.contains('oculto'))
                mostrarFiltroColores();
        }
        else
            toggleFiltroColores();

        mostrarConfig.classList.toggle('active');
        configFiltros.classList.add('oculto');
        config.classList.remove('oculto');
    }

    subir.onclick = function (e) {
        btnUpload.click();
    }

    selectorTamanioLapiz.onchange = function(){
        tamanio = this.value;
    }

    paginaBlanco.onclick = function(e) {
        imagen = new Image();
        ctx = lienzo.getContext('2d');
        width = lienzo.width;
        height = lienzo.height;
        modifyImage(ctx, width, height, 'vacio');
        prepareFiltros();
    }

    descargar.onclick = function(e){
        let nombreArchivo = prompt("Seleccione nombre del archivo","");
        if (nombreArchivo === null){
            return false;
        }
        else if (nombreArchivo === ""){
            this.download = "My Digital Draw.png";
            this.href = lienzo.toDataURL("image/png");
        }
        else{
            this.download = nombreArchivo+".png";
            this.href = lienzo.toDataURL("image/png");
        }
    }

    btnUpload.onchange = function (e) {
        var files = e.target.files; // FileList object
        var file = files[0];
        if(file.type.match('image.*')) {
            imagen.src = window.URL.createObjectURL(file);
            imagen.onload = function () {
                myDrawImageMod(imagen);		
                changeFiltros(imagen);
                if(infoAdicional.classList.contains('oculto')){
                    mostrarFiltroColores();
                    // mostrarFiltros.classList.add('active');
                }
                // if(mostrarFiltros.classList.contains('active')){
                //     // mostrar(filtros);	
                // }
            }
        } 
        else {
            console.log("no es una imagen");
        }
    }

    seleccionarLapiz.onclick = function (e) {
        this.classList.toggle('active');
        if (seleccionarBorrador.classList.contains('active'))
            seleccionarBorrador.classList.remove('active');

        for (let i = 0; i < colores.length; i++) {
            if(colores[i].classList.contains('negro')){
                colores[i].classList.add('active');
                break;
            }   
        }
    }

    seleccionarBorrador.onclick = function (e) {
        this.classList.toggle('active');
        if (seleccionarLapiz.classList.contains('active'))
            seleccionarLapiz.classList.remove('active');
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

    function toggleFiltroColores() {
        if(infoAdicional.classList.contains('oculto'))
            mostrarFiltroColores();
        else
            ocultarFiltroColores();
    }

    /**
     * Muestra el bloque que contiene los colores o los filtros
     */
    function mostrarFiltroColores (){
        posicionCanvas.classList.remove('offset-md-1');
        infoAdicional.classList.remove('oculto');
    }

     /**
     * Oculta el bloque que contiene los colores o los filtros
     */
    function ocultarFiltroColores(){
        posicionCanvas.classList.add('offset-md-1');
        infoAdicional.classList.add('oculto');
    }

    function myDrawImageMod(image, ctx, width, height){
        ctx = lienzo.getContext("2d");
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

        var azul = {
            'r' : Math.floor(imageData.data[index+0] - 100),
            'g' : Math.floor(imageData.data[index+0] - 25),
            'b' : Math.floor(imageData.data[index+0] + 100)
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
            'r' : (gris.r > (255/2)) ? 255 : 0,
            'g' : (gris.g > (255/2)) ? 255 : 0,
            'b' : (gris.b > (255/2)) ? 255 : 0
        }

        var vacio = {
            'r' : 255,
            'g' : 255,
            'b' : 255
        }


        if(filtro === 'filtroVerde')
            return verde;
        else if (filtro === 'filtroRojo')
            return rojo;
        else if (filtro === 'filtroAzul')
        return azul;
        else if (filtro === 'escalaGrises')
            return gris;
        else if (filtro === 'negativo')
            return negativo;
        else if (filtro === 'sepia')
            return sepia;
        else if (filtro === 'binario')
            return binario;
        else if (filtro === 'vacio')
            return vacio;
        else 
            return ninguno;
    }

    function changeFiltros(img){
        pasteFiltro (img, 'inicial');
        pasteFiltro (img, 'sepia');
        pasteFiltro (img, 'negativo');
        pasteFiltro (img, 'escalaGrises');
        pasteFiltro (img, 'binario');
        pasteFiltro (img, 'filtroRojo');
        pasteFiltro (img, 'filtroVerde');
        pasteFiltro (img, 'filtroAzul');
    }

    function prepareFiltros() {
        img = new Image();
        img.src = 'images/imagenInicial.jpg';
        img.onload = function () {
            changeFiltros(this);  
        }
    }

    lienzo.onmousedown = function (e) {
        if(seleccionarLapiz.classList.contains('active') || seleccionarBorrador.classList.contains('active'))
            pintando = true;
    }

    lienzo.onmouseup = function () {
        pintando = false;
        posicionCursor.x = -1;
        posicionCursor.y = -1;
    }

    lienzo.onmousemove = function (e) {
        if (pintando){
            if (seleccionarBorrador.classList.contains('active'))
                pintar(e, 'blanco');
            else
                pintar(e);
        }; 
    }

    function pintar(e, color=null) {
        var coordenadas ={};
        coordenadas.x = e.layerX - 20;
        coordenadas.y = e.layerY;
        var color = getColorActivo(color);

        ctxLienzo.lineCap = 'round';
        ctxLienzo.lineWidth = tamanio;
        ctxLienzo.strokeStyle = color; // color de la linea

        ctxLienzo.beginPath(); // comenzamos a dibujar
        if (posicionCursor.x != -1)
            ctxLienzo.moveTo (posicionCursor.x, posicionCursor.y);
        else
            ctxLienzo.moveTo (coordenadas.x, coordenadas.y);

        ctxLienzo.lineTo(coordenadas.x, coordenadas.y);
        ctxLienzo.stroke();

        posicionCursor.x = coordenadas.x;
        posicionCursor.y = coordenadas.y;
    }
    

    
    function getColorActivo(color=null) {
        if (color === null) {
            for (let i = 0; i < colores.length; i++) {
                if(colores[i].classList.contains('active')){
                    color = colores[i].id;
                }   
            }
        }

        var coloresHash = {
            'verde' : '#16cf0a',
            'rojo' : '#f10202',
            'amarillo' : '#f1ef44',
            'violeta' : '#ca0cdb', 
            'azul' : '#170acf',
            'celeste' : '#0ee2e2',
            'naranja' : '#f35f1a', 
            'rosa' : '#fc4fe5', 
            'negro' : '#000000',
            'marron' : '#692803',
            'blanco' : '#ffffff'
        }
        return coloresHash[color];
    }
});









