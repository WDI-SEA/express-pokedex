// delete pokemon here
$(document).ready(function() {
	console.log('delete ready');
	$('.delete-link').on('click', function(e){
		e.preventDefault();
		var pokeElement = $(this);
  		var pokeUrl = pokeElement.attr('href');
		$.ajax({
			method: 'DELETE',
			url: pokeUrl
		}).done(function(data){
			window.location= '/pokemon';
		});
	});
});
