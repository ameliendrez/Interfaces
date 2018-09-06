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
    var ctxLienzo = lienzo.getContext('2d');
    var pintando = false;
    var posicionCursor;
    var filtros = document.getElementsByClassName('filtros');
    var selectorFiltro = document.getElementsByClassName('filtrosCanvas');
    var imagen = new Image();

    preparePreventDefault();
    prepareColoresClick();
    prepareSelectoresFiltro();
    prepareCanvas();

    subir.onclick = function (e) {
        btnUpload.click();
    }

    paginaBlanco.onclick = function(e) {
        imagen = new Image();
        ocultarFiltros();
        ctx = lienzo.getContext('2d');
        width = lienzo.width;
        height = lienzo.height;
        modifyImage(ctx, width, height, 'vacio');
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
        if (seleccionarLapiz.classList.contains('active'))
            seleccionarLapiz.classList.remove('active');
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
        this.classList.add('active');
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
            'r' : (gris.r > (255/2)) ? 255 : 0,
            'g' : (gris.g > (255/2)) ? 255 : 0,
            'b' : (gris.b > (255/2)) ? 255 : 0
        }

        var vacio = {
            'r' : 255,
            'g' : 255,
            'b' : 255
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
        else if (filtro === 'vacio')
            return vacio;
        else 
            return ninguno;
    }

    
	function prepareCanvas(){
        //canvasLimites=lienzo.getBoundingClientRect(); // obtenemos los limites del canvas
		lienzo.addEventListener('mousedown',cambiarEstado,false);
        lienzo.addEventListener('mouseup',cambiarEstado,false);
		lienzo.addEventListener('mousemove',pintarLinea,false);
		//lienzo.style.cursor="hand";
		//borrador=document.getElementById("borrador");
		//borrador.addEventListener('click',erase,false);
	}

	function cambiarEstado(){
        if (seleccionarLapiz.classList.contains('active')){
            pintando = true;
            posicionCursor=obtenerCoordenadas(event);
        }
        else{
            pintando = false;
            posicionCursor.x = -1;
            posicionCursor.y = -1;
        }          
	}

	function pintarLinea(event){
		if(pintando){
            var color = getColorActivo();
            var coordenadas=obtenerCoordenadas(event);
			ctxLienzo.beginPath(); // comenzamos a dibujar
			ctxLienzo.moveTo(posicionCursor.x, posicionCursor.y); // ubicamos el cursor en la posicion (10,10)
            ctxLienzo.lineTo(coordenadas.x,coordenadas.y);
            ctxLienzo.closePath();
			posicionCursor.x = coordenadas.x;
			posicionCursor.y = coordenadas.y;
            ctxLienzo.lineCap = 'round';
            ctxLienzo.lineJoin = 'round';
            ctxLienzo.lineWidth = 5;
			ctxLienzo.strokeStyle = color; // color de la linea
            ctxLienzo.stroke(); // dibujamos la linea
		}
    }
    
    function getColorActivo() {
        var color = 'negro';
        for (let i = 0; i < colores.length; i++) {
            if(colores[i].classList.contains('active')){
                color = colores[i].id;
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

	function obtenerCoordenadas(event){

		var posX = event.layerX - lienzo.offsetLeft;
        var posY = event.layerY - lienzo.offsetTop;

        
            //     var x = event.layerX+offsetx;
    //     var y = event.layerY+offsety;

		// if (event.pageX || event.pageY) {
		// 	posX = event.pageX- canvasLimites.left;
		// 	posY = event.pageY- canvasLimites.top;
		// }else{
		// 	posX = event.layerX-lienzo.offsetLeft;//event.clientX -lienzo.offsetLeft;// - canvasLimites.left;
		// 	posY = event.layerY-lienzo.offsetLeft//event.clientY - lienzo.offsetTop;// canvasLimites.top;
        // }        


		return {x:posX,
			y:posY
		};
    }
    

	function erase(){
		contexto.clearRect(0, 0, lienzo.width, lienzo.height);
	}



});









