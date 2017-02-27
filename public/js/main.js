$('document').ready(function() {
	console.log('everything all set and ready to go');

	$('.deleteBtn').on('click', function(e) {
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