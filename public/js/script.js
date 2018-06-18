$(document).ready(function() {

$('.delete').on("click", function(e) {
   e.preventDefault();
   var pokeDiv = $(this);
   var pokeUrl = pokeDiv.attr('href');
   $.ajax({
     method: 'DELETE',
     url: pokeUrl
   }).done(function(data) {
   	releasePokemon();
   	window.setTimeout(function(){location.reload()},2000)
   });
 });

$('.sidenav').sidenav();

$('.modal').modal();

});

function catchPokemon() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    var y = document.getElementById("pokeball");
    y.className = "show";
    setTimeout(function(){ y.className = y.className.replace("show", ""); }, 3000);
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
};

function releasePokemon() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
};
