

$('document').ready(function() {
 	$('.delete-link').on('click', function(e) {
 		e.preventDefault();
 		pokemonElement = $(this);
 		pokemonUrl = pokemonElement.attr('href');
 		$.ajax({
 			method: 'DELETE',
 			url: pokemonUrl
 		}).done(function() {
 			pokemonElement.remove();
 			window.location = '/pokemon';
 		});
 	});
 })
