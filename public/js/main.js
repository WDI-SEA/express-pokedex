//this prevents the default functionality upon 
//clicking the delete pokemon button
//it picks the specific pokemon that's being deleted,
//gets the destination and specifies the DELETE method
//and then reloads back to the /pokemon page
$('#delete-pokemon').on('click', function(e) {
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

//for mobile nav
$(".button-collapse").sideNav();

//for carousel
$(document).ready(function(){$('.carousel').carousel();});