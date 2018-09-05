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
    var sepia = document.getElementById('sepia');
    var negativo = document.getElementById('negativo');
    var escalaGrises = document.getElementById('escala-grises');
    var imagen = new Image();


    preparePreventDefault();
    prepareColoresClick();
    

    subir.onclick = function (e) {
        btnUpload.click();
    }

    btnUpload.onchange = function (e) {
		// image.src = 'Tulips.jpg';

		// image.onload = function() {
		// 	myDrawImageMod(this);			
        // }

        
        var files = e.target.files; // FileList object
        var file = files[0];
        if(file.type.match('image.*')) {

            imagen.src = window.URL.createObjectURL(file);

            imagen.onload = function () {
                myDrawImageMod(imagen);			
            }





            // var reader = new FileReader();
            // // Read in the image file as a data URL.
            // reader.readAsDataURL(file);
            // reader.onload = function(e){
            //     if( e.target.readyState == FileReader.DONE) {
            //         image.src = e.target.result;
            //         myDrawImageMod(image);			
            //     }
            // }    

        } else {
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
    }

    seleccionarLapiz.onclick = function (e) {
        mostrarFiltroColores();
        mostrarColores();
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

    function removeColorActive() {
        for (let i = 0; i < colores.length; i++) {
            if(colores[i].classList.contains('active')){
                colores[i].classList.remove('active');
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

    function mostrarFiltroColores (){
        posicionCanvas[0].classList.remove('col-md-offset-1');
        infoAdicional[0].classList.remove('oculto');
    }

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
    }

    function myDrawImageMod(image, ctx, width, height){
        ctx = lienzo.getContext("2d");

        var imgResize = image;


        // imgResize.setAttribute("height", "768");
        // imgResize.setAttribute("width", "1024");
        imgResize.setAttribute("class", "img-responsive");

        pasteFiltros (imgResize, 'sepia');
        pasteFiltros (imgResize, 'negativo');
        pasteFiltros (imgResize, 'grises');


        // imgSepia = image;
        // imgSepia.setAttribute("class", "img-responsive");

        // imgNegativo = image;
        // imgNegativo.setAttribute("class", "img-responsive");

        // imgEscalaGrises = image;
        // imgEscalaGrises.setAttribute("class", "img-responsive");


        // sepia.append(imgSepia);
        // negativo.append(imgNegativo);
        //escalaGrises.appendChild(imgEscalaGrises);


        // elem.setAttribute("alt", "Flower");

        var width = document.getElementById("lienzo").width;
        var height = document.getElementById("lienzo").height;
        ctx.drawImage(image, 0, 0, width, height);
    }

    function pasteFiltros(img, filtro) {
        var imagenNueva = new Image();
        imagenNueva = img;

        if(filtro === 'sepia')
            sepia.appendChild(imagenNueva);
        else if (filtro === 'negativo')
            negativo.appendChild(imagenNueva);
        else
            escalaGrises.appendChild(imagenNueva); 
    }






});





function loadCanvasWithInputFile(){
	// canvas
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext("2d"); 
	var fileinput = document.getElementById('ab'); // input file
	var img = new Image();

	fileinput.onchange = function(evt) {
	    var files = evt.target.files; // FileList object
	    var file = files[0];
	    if(file.type.match('image.*')) {
	        var reader = new FileReader();
	        // Read in the image file as a data URL.
	        reader.readAsDataURL(file);
	    	reader.onload = function(evt){
	    		if( evt.target.readyState == FileReader.DONE) {
	    			img.src = evt.target.result;
				context.drawImage(img,100,100);
			}
	    	}    

	    } else {
	        alert("not an image");
	    }
	};
}

function cargarImagen(){

  //<input type="file" id="input"/>
  //<canvas width="400" height="300" id="canvas"/>
  window.onload = function() {
    var input = document.getElementById('input');
    input.addEventListener('change', handleFiles);
  }

  function handleFiles(e) {
      var ctx = document.getElementById('canvas').getContext('2d');
      ctx.drawImage(e.target.files[0], 20,20);
      alert('the image is drawn');
  }

  //CORRECCION DEL CODIGO//

  var ctx = document.getElementById('canvas').getContext('2d');
  var img = new Image;
  img.onload = function() {
      ctx.drawImage(img, 20,20);
      alert('the image is drawn');
  }
  img.src = URL.createObjectURL(e.target.files[0]);
};



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
