// listen for clicks on "delete" links. use AJAX to send a DELETE HTTP request
// to the appropriate URL

// code here ...

$('.delete-pokemon').on('click', function(e) {
	e.preventDefault();
	var specificPokemon = $(this);
	var destination = specificPokemon.attr('action');
	$.ajax({
		method: 'DELETE', 
		url: destination
	}).done(function(data) {
		console.log(data);
		window.location = '/pokemon';
	});
});

$(".button-collapse").sideNav();