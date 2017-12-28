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

// $('.delete-link').on('click', function(e) {
//   e.preventDefault();
//   var teamElement = $(this);
//   var teamUrl = teamElement.attr('href');
//   $.ajax({
//     method: 'DELETE',
//     url: teamUrl
//   }).done(function(data) {
//     // get data returned from the DELETE route
//     console.log(data);

//     // do stuff when the DELETE action is complete
//     teamElement.remove();

//     // or, you can redirect to another page
//     window.location = '/teams';
//   });
// });