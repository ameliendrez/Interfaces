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

    html += '<div class="container single-comment">';
    html += '<div class="row"><div class="col-12"></div></div>';
    html += '<div class="row"><div class="col-1"><div class="thumbnail">';
    html += '<img class="img-fluid user-photo" src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"></div></div>';
    html += '<div class="col-11"><div class="card"><div class="card-header">';
    html += '<strong>' + json[i].email + '</strong> <span class="text-muted">commented 5 days ago</span></div></div><div id="' + json[i].id +'" class="heart"></div>'
    html += '<div class="card-body">' +json[i].body+ '</div></div></div></div></div>';


    // html += "<tr id=" + json[i].id + ">"
    // html += "<td>" + json[i].email
    // html += "</td><td>" + json[i].name
    // html += "</td><td>" + json[i].body
    // html += "</td></tr>";
  }
  let jqHTML = $(html);
  $(".comments").html('').append(jqHTML);

}

