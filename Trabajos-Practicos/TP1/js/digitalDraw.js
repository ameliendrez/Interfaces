document.addEventListener("DOMContentLoaded", function(event) {

    var subir = document.getElementById("subirImagen");
    var descargar = document.getElementById("descargarProyecto");
    var paginaBlanco = document.getElementById("nuevoProyecto");
    var seleccionarLapiz = document.getElementById("seleccionar-lapiz");
    var seleccionarBorrador = document.getElementById("seleccionar-borrar");
    var mostrarSeleccionarColor = document.getElementById("ver-colores");
    var mostrarFiltros = document.getElementById("ver-filtros")


    preparePreventDefault();
    

    subir.onclick = function (e) {
        var btnUpload = document.getElementById("addImage");
        btnUpload.click();
    }

    mostrarSeleccionarColor.onclick = function () {
        var posicionCanvas = document.getElementsByClassName('editor-canvas');
        var infoAdicional = document.getElementsByClassName('infoAdiccional');

        if(infoAdicional[0].classList.contains('oculto')){
            posicionCanvas[0].classList.remove('col-md-offset-1');
            infoAdicional[0].classList.remove('oculto');
        }
        else{
            posicionCanvas[0].classList.add('col-md-offset-1');
            infoAdicional[0].classList.add('oculto');
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

