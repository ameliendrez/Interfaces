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
  });

  $('.price-input').on('change', function () {
    var preDesde = 'Desde $';
    var preHasta = ', hasta $';
    var preUnico = 'Juegos de $';  
    var desdeSpan = $('#precio-desde');
    var hastaSpan = $('#precio-hasta');
    var preSpan = $('#precio-pre-desde');
    var preHastaSpan = $('#precio-pre-hasta');
    var priceSlider = $('.price-slider input');

    var value1 = parseInt(priceSlider[0].value);
    var value2 = parseInt(priceSlider[1].value);
    
    mostrarValores(preDesde, preHasta, preUnico, desdeSpan, hastaSpan, preSpan, preHastaSpan, value1, value2);
  });

  $('.age-input').on('change', function () {
    var preDesde = 'Desde ';
    var preHasta = ', hasta ';
    var preUnico = 'Juegos para ';  
    var post = ' años';
    var desdeSpan = $('#age-desde');
    var hastaSpan = $('#age-hasta');
    var preSpan = $('#age-pre-desde');
    var preHastaSpan = $('#age-pre-hasta');
    var ageSlider = $('.age-slider input');
    var value1 = parseInt(ageSlider[0].value);
    var value2 = parseInt(ageSlider[1].value);
    var mayor = '';
    if(value1 === 20 || value2 === 20)
      mayor = '+';
    mostrarValores(preDesde, preHasta, preUnico, desdeSpan, hastaSpan, preSpan, preHastaSpan, value1, value2, post, mayor);
  });

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

function mostrarValores(preDesde, preHasta, preUnico, desdeSpan, hastaSpan, preSpan, preHastaSpan, value1, value2, post='', mayor='') {
  var firstValue = 0;
  var secondValue = 0;

  if(value1 == value2){
    firstValue = value1;
    preDesde = preUnico;
    secondValue = '';
    preHasta = '';
  }
  else if (value1 < value2){
    firstValue = value1;
    secondValue = value2;
  }
  else{
    firstValue = value2;
    secondValue = value1;
  }
  

  if (firstValue == 0)
    firstValue = '0(Free)';

  secondValue = mayor+secondValue+post;

  desdeSpan.text(firstValue);
  hastaSpan.text(secondValue);
  preSpan.text(preDesde);
  preHastaSpan.text(preHasta);
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

