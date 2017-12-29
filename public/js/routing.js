$(document).ready(function(){
	$('.delete-link').click(function(e){
		e.preventDefault();
		$.ajax({
			url: $(this).attr('href'),
			method: 'DELETE'
		}).done(function(data){
			window.location.href = '/pokemon';
		});
	});
	$('.favorite-link').click(function(e){
		e.preventDefault();
		$.ajax({
			name: $(this).attr('name'),
			method: 'POST'
		}).done(function(data){
			console.log('hi');
		});
	});
});