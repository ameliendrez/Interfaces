document.addEventListener("DOMContentLoaded", function (event) {

  $('.filtros-container .card .btn-link').on('click', function (e) {
    var btnAcordion = $(this).children('span.fa');
    var close = (btnAcordion.hasClass('fa-plus')) ? false:true;

    $('.filtros-container .card .btn-link span.fa').removeClass('fa-minus');
    $('.filtros-container .card .btn-link span.fa').addClass('fa-plus');
    if (!close) {
      btnAcordion.removeClass('fa-plus');
      btnAcordion.addClass('fa-minus');
    }
  });

  $(".comments").on('click', '.heart', function (e) {
    var likes = $(this).parents('.col-11').children('.likes');
    var value = parseInt(likes.text());
    if($(this).hasClass('clickeado')) {
      $(this).removeClass('clickeado');
      value--;
    }
    else {
      $(this).addClass('clickeado');
      value++;
    }
    likes.html(value);
  })

  createSticky($('header'), 8);
  createSticky($('.filtros-container'), 80);
  createSticky($('.filtros-utilizados'),80);
  // updatePriceLabels();
  createInfiniteScroll();
});

function createSticky(sticky, distancia) {
	
	if (typeof sticky !== "undefined") {
		var	pos = sticky.offset().top,
    win = $(window);			
		win.on("scroll", function() {
    		win.scrollTop() >= (pos - distancia) ? sticky.addClass("fixed") : sticky.removeClass("fixed");      
		});			
  }
};

function updatePriceLabels() { 
  //avoids slider overlap 
  var sliders = document.querySelectorAll(".price-slider input"); 
  var val1 = parseInt(sliders[0].value); 
  var val2 = parseInt(sliders[1].value); 
  
  if (val1 >= val2) { sliders[0].value = val2 - 3; return; } 
  if (val2 <= val1) { sliders[1].value = val1 + 3; return; } 
  
  //adds color when a range is selected 
  if (val1 > 0 || val2 < 99) { 
      sliders[0].style.background = sliders[1].style.background = "-webkit-gradient(linear, 0 0,100% 0, color-stop(0, white), color-stop(" + (val1 / 100) + ", white),color-stop(" + (val1 / 100) + ", #f0f0f0), color-stop(" + (val2 / 100) + ", #f0f0f0), color-stop(" + (val2 / 100) + ", white))"; 
  } 
  else { 
      sliders[0].style.background = sliders[1].style.background = ''; 
  } 
} 

function createInfiniteScroll() {
  win = $(window);			
  win.on("scroll", function() {    
    var windowHeight = win.scrollTop();
    if(windowHeight >= 110 && $('.seccion-2').hasClass('oculto'))
      createEfectScroll();  
  });
}

function createEfectScroll() {
  $('.cargando').removeClass('oculto');

  var temporizador = setTimeout(function(){ 
    $('.cargando').addClass('oculto');
    $('.seccion-2').removeClass('oculto');
    clearTimeout(temporizador);
  }, 6000);
}

