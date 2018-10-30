document.addEventListener("DOMContentLoaded", function(event) {

    var jugar = document.getElementById('jugar');

    jugar.onclick = function () {
        var paralaxBackground = document.getElementById('paralax-background-content');
        paralaxBackground.classList.toggle('playing');
    }


});