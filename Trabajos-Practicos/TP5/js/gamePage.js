getDatos();


function getDatos() {
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json())
    .then(function (json) {
      mostrarDatos(json);
    });  
}

function mostrarDatos(json) {
  let html = '';
  for (var i = 0; i < 5; i++) {

    html += '<div id="c-'+json[i].id+'" class="container single-comment oculto">';
    html += '<div class="row"><div class="col-1"><div class="thumbnail">';
    html += '<img class="img-fluid user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"></div></div>';
    html += '<div class="col-11"><div class="card"><div class="card-header">';
    html += '<strong>' + json[i].email + '</strong> <span class="text-muted">commented 5 days ago</span></div></div>'
    html += '<div class="likes">' + Math.floor(Math.random()*100) + '</div><div class="heart"></div>'
    html += '<div class="card-body">' +json[i].body+ '</div></div></div></div></div>';

  }
  let jqHTML = $(html);
  $(".comments").html('').append(jqHTML);

  var comentarios = $('.single-comment');
  var contador = 1000;
  var suma = 2000;

  $.each(comentarios, function( index, value ) {
    var temporizador = setTimeout(function(){ 
      $('.single-comment').removeClass('oculto');
      $('.single-comment').addClass('aparicion');

      clearTimeout(temporizador);
    }, contador);
    contador += suma;
  });




}

