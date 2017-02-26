$('document').ready(function() {
	console.log('everything all set and ready to go');


	$('.pokeFav').on('submit', function(e) {
		e.preventDefault();
		var pokemonFavForm = $(this);
		var pokemon = pokemonFavForm.attr('action');
		var pokemonData = pokemonFavForm.serialize();

		$.ajax({
			method: 'POST',
			url: pokemon,
			data: pokemonData
		}).done(function(data) {
			window.location = '/pokemon';
		});
	});

})