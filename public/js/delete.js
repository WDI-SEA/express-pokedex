$('document').ready(function() {
	$('.delete-link').on('click', function(e) {
		e.preventDefault();
		pokemonElement = $(this);
		pokemonUrl = pokemonElement.attr('href');
		$.ajax({
			method: 'DELETE',
			url: pokemonUrl
		}).done(function(){
			pokemonElement.remove();
			console.log("I am in the delete function");
		});
		
		window.location ='/pokemon';
	});
});