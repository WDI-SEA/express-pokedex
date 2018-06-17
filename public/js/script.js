$(document).ready(function() {


$('.delete').on("click", function(e) {
   e.preventDefault();
   var pokeElement = $(this);
   var pokeUrl = pokeElement.attr('href');
   $.ajax({
     method: 'DELETE',
     url: pokeUrl
   }).done(function(data) {
     window.location = "/pokemon";
   });
 });

$('.sidenav').sidenav();

});

function catchPokemon() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
};


