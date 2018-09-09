document.addEventListener("DOMContentLoaded", function(event) {
    

    // SELECTORES PRINCIPALES Y VARIABLES GLOBALES NECESARIAS //

    // BARRA DE HERRAMIENTAS DEL HEADER //
    var descargar = document.getElementById("descargarProyecto");
    var subir = document.getElementById("subirImagen");
    var btnUpload = document.getElementById("addImage");
    var paginaBlanco = document.getElementById("nuevoProyecto");

    // CANVAS //
    var posicionCanvas = document.getElementById('editor-canvas');
    var lienzo = document.getElementById('lienzo');
    var ctxLienzo = lienzo.getContext('2d');
    var configAdicional = document.getElementById('configAdicional');

    // BARRA DE HERRAMIENTAS LATERAL //
    var seleccionarLapiz = document.getElementById("seleccionar-lapiz");
    var seleccionarBorrador = document.getElementById("seleccionar-borrar");
    var mostrarConfig = document.getElementById("ver-config");
    var mostrarFiltros = document.getElementById("ver-filtros");

    // FILTROS //
    var configFiltros = document.getElementById("config-filtros");
    var selectorFiltro = document.getElementsByClassName('filtrosCanvas');
    var filtrosObligatorios = document.getElementById('filtrosEspeciales');
    var bordes = document.getElementById('bordes');
    var blur = document.getElementById('blur');
    
    // EDITOR LAPIZ //
    var config = document.getElementById("config");
    var selectorTamanioLapiz = document.getElementById('tamanio-lapiz');
    var colores = document.getElementsByClassName("colores");

    // VARIABLES GLOBALES //
    var tamanio = 5;
    var pintando = false;
    var posicionCursor = { x : -1, y : -1 };
    var imagen = new Image();


    initFunciones();
  


    function initFunciones() {
        preparePreventDefault();
        prepareColoresClick();
        prepareSelectoresFiltro();
        prepareFiltros();

        $(function () {$('[data-toggle="tooltip"]').tooltip()});

        paginaBlanco.onclick = function(e) {
            deleteLienzo();
        }

        subir.onclick = function (e) {
            btnUpload.click();
        }

        btnUpload.onchange = function (e) {
            uploadImage(e);
        }
    
        descargar.onclick = function(e){
            downloadImage(this);
        }
    
        seleccionarLapiz.onclick = function (e) {
            getLapiz(this);
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

        seleccionarBorrador.onclick = function (e) {
            getEraser(this);
        }

        mostrarConfig.onclick = function () {
            mostrarConfiguracion();
        }

        selectorTamanioLapiz.onchange = function(){
            tamanio = this.value;
        }

        mostrarFiltros.onclick = function () {
            showFiltros(this);
        }

        bordes.onclick = function() {
            deteccionBordes(ctxLienzo);
        }
    
        blur.onclick = function() {
            realizarBlur(ctxLienzo);
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
    
    function prepareColoresClick() {
        for (let i = 0; i < colores.length; i++) {
            colores[i].onclick = function(e){
                removeColorActive();
                colores[i].classList.add('active');
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

    function prepareFiltros() {
        img = new Image();
        img.src = 'images/imagenInicial.jpg';
        img.onload = function () {
            changeFiltros(this);  
        }
    }

    function deleteLienzo() {
        imagen = new Image();
        ctx = lienzo.getContext('2d');
        width = lienzo.width;
        height = lienzo.height;
        modifyImage(ctx, width, height, 'vacio');
        prepareFiltros();
    }

    function uploadImage(e) {
        var files = e.target.files; // FileList object
        var file = files[0];
        if(file.type.match('image.*')) {
            imagen.src = window.URL.createObjectURL(file);
            imagen.onload = function () {
                if(imagen.height > lienzo.height){
                    let resize = (lienzo.height/imagen.height) * 100;
                    imagen.width = (resize * imagen.width) / 100;
                    imagen.height = (resize * imagen.height) / 100;
                }
                if(imagen.width > lienzo.width && imagen.width > imagen.height){
                    let resize = (lienzo.width/imagen.width) * 100;
                    imagen.width = (resize * imagen.width) / 100;
                    imagen.height = (resize * imagen.height) / 100;
                }
                myDrawImageMod(imagen, ctxLienzo, imagen.width, imagen.height);		
                changeFiltros(imagen);
                if(configAdicional.classList.contains('oculto')){
                    mostrarFiltroColores();
                    showFiltros();
                }
            }
        } 
        else {
            console.log("no es una imagen");
        }
    }
    
    function downloadImage(e) {
        let nombreArchivo = prompt("Seleccione nombre del archivo","");
        if (nombreArchivo === null){
            return false;
        }
        else if (nombreArchivo === ""){
            e.download = "My Digital Draw.png";
            e.href = lienzo.toDataURL("image/png");
        }
        else{
            e.download = nombreArchivo+".png";
            e.href = lienzo.toDataURL("image/png");
        }
    }

    function getLapiz(e) {
        e.classList.toggle('active');
        if (seleccionarBorrador.classList.contains('active'))
            seleccionarBorrador.classList.remove('active');

        for (let i = 0; i < colores.length; i++) {
            if(colores[i].classList.contains('negro')){
                colores[i].classList.add('active');
                break;
            }   
        }
    }

    function getEraser(e) {
        e.classList.toggle('active');
        if (seleccionarLapiz.classList.contains('active'))
            seleccionarLapiz.classList.remove('active');
    }


    function mostrarConfiguracion() {
        showConfig();
    }

    function showConfig() {
        if (mostrarFiltros.classList.contains('active')){
            mostrarFiltros.classList.remove('active');
            if(configAdicional.classList.contains('oculto'))
                mostrarFiltroColores();
        }
        else
            toggleFiltroColores();

        mostrarConfig.classList.toggle('active');
        configFiltros.classList.add('oculto');
        filtrosObligatorios.classList.add('oculto');
        config.classList.remove('oculto');
    }

    function showFiltros(e) {
        if(mostrarConfig.classList.contains('active')){
            mostrarConfig.classList.remove('active');
            if(configAdicional.classList.contains('oculto'))
                mostrarFiltroColores();
        }
        else
            toggleFiltroColores();

        e.classList.toggle('active');
        configFiltros.classList.remove('oculto');
        filtrosObligatorios.classList.remove('oculto');
        config.classList.add('oculto');
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

    

    function removeFiltroActive(){
        for (let i = 0; i < selectorFiltro.length; i++) {
            if(selectorFiltro[i].classList.contains('active')){
                selectorFiltro[i].classList.remove('active');
            }
        }
    }

    function toggleFiltroColores() {
        if(configAdicional.classList.contains('oculto'))
            mostrarFiltroColores();
        else
            ocultarFiltroColores();
    }

    /**
     * Muestra el bloque que contiene los colores o los filtros
     */
    function mostrarFiltroColores (){
        posicionCanvas.classList.remove('offset-md-1');
        configAdicional.classList.remove('oculto');
    }

     /**
     * Oculta el bloque que contiene los colores o los filtros
     */
    function ocultarFiltroColores(){
        posicionCanvas.classList.add('offset-md-1');
        configAdicional.classList.add('oculto');
    }

    function myDrawImageMod(image, ctx=null, width=null, height=null){
        if (ctx === null){
            ctx = lienzo.getContext("2d");
            width = image.width;
            height = image.height;
        }
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

    function setPixel(imageData, x, y, r, g, b, a=255, width=null) {
        if (width === null)
            index = (x + y * imageData.width) * 4;	
        else 
            index = (y * width + x)*4;
        imageData.data[index+0] = r;
        imageData.data[index+1] = g;
        imageData.data[index+2] = b;
        imageData.data[index+3] = a;
    }

    function getFiltro(filtro, imageData, x, y) {
        index = (x + y * imageData.width) * 4;			
        
        var verde = {
            'r' : Math.floor(imageData.data[index+0] - 30),
            'g' : Math.floor(imageData.data[index+1] + 80),
            'b' : Math.floor(imageData.data[index+2] - 30)
        };

        var azul = {
            'r' : Math.floor(imageData.data[index+0] - 30),
            'g' : Math.floor(imageData.data[index+1] - 30),
            'b' : Math.floor(imageData.data[index+2] + 80)
        };

        var rojo = {
            'r' : Math.floor(imageData.data[index+0] + 80),
            'g' : Math.floor(imageData.data[index+1] -30),
            'b' : Math.floor(imageData.data[index+2] -30)
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

    function changeFiltros(imagen){
        var img = new Image();
        img = imagen;
        pasteFiltro (img, 'inicial');
        pasteFiltro (img, 'sepia');
        pasteFiltro (img, 'negativo');
        pasteFiltro (img, 'escalaGrises');
        pasteFiltro (img, 'binario');
        pasteFiltro (img, 'filtroRojo');
        pasteFiltro (img, 'filtroVerde');
        pasteFiltro (img, 'filtroAzul');
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

    function deteccionBordes(ctx) {
        var matriz = [[-1,-1,-1],[-1, 8,-1],[-1,-1,-1]];
        document.getElementById('escalaGrises').click();
        var image = ctx.getImageData(0, 0, lienzo.width, lienzo.height)
        var imgData = convolucion(image, matriz);
        ctx.putImageData(imgData, 0, 0);
    }
      
    function realizarBlur() {
        var image = ctxLienzo.getImageData(0, 0, lienzo.width, lienzo.height)
        var radio = 1;
      
        var matriz = [];
        var dimension = radio*2 + 1;
        var vol = dimension*dimension;
      
        for (var i = 0; i < dimension; i++) {
          matriz[i] = [];
          for (var j = 0; j < dimension; j++) {
            matriz[i][j] = 1/vol;
          }
        }
      
        var imgData = convolucion(image, matriz);
        ctxLienzo.putImageData(imgData, 0, 0);
    }
    
    function convolucion(imagen, matriz) {
        var width = imagen.width;
        var height = imagen.height;
        var imgRetorno = ctxLienzo.createImageData(width, height);

        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                setRGB(imagen, width, height, matriz, imgRetorno, x, y)
            }
        }
        return imgRetorno;
    };

    function setRGB(imagen, width, height, matriz, imgRetorno, x, y) {
        var r = 0, g = 0, b = 0;
        var dimension = matriz.length;
        var radio = Math.floor(dimension/2);
        for (var matrizY = 0; matrizY < dimension; matrizY++) {
            for (var matrizX = 0; matrizX < dimension; matrizX++) {
                var variables = getRGB(y, matrizY, x, matrizX, radio, imagen, width, height, matriz);
                r += variables.r;
                g += variables.g;
                b += variables.b;
            }
        }
        setPixel(imgRetorno, x, y, r, g, b, 255, width);
    }

    function getRGB(y, matrizY, x, matrizX, radio, imagen, width, height, matriz) {
        var imageData = imagen.data;
        var difY = y + matrizY - radio;
        var difX = x + matrizX - radio;
        var variables = {'r' : 0, 'g' : 0, 'b' : 0}
        if (difY >= 0 && difY < height && difX >= 0 && difX < width) {
            var index = (difY * width + difX)*4;
            var valor = matriz[matrizY][matrizX];
            variables.r = imageData[index] * valor;
            variables.g = imageData[index+1] * valor;
            variables.b = imageData[index+2] * valor;
        }
        return variables;
    }
});









