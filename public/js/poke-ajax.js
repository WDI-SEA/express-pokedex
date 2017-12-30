$(document).ready(function(){


	$("#delete").on("click", function(e){
		e.preventDefault();
		console.log("click reached");
		var pokeElement = $(this);
		var pokeUrl = pokeElement.attr('href');

	$.ajax({
		method: 'DELETE',
		url: pokeUrl
	}).done(function(response){
		window.location.href = '/pokemon';
	});
});
});