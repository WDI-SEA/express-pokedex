$(function(){
	$('.add-favorite').submit(function(e){
		e.preventDefault();
		var name = $(this).attr('url');
		var data = $(this).serialize();

		$.ajax({
			name: name,
			method: 'POST',
			data: data
		}).done(function(){
			window.location.href = '/pokemon';
		});
	});
});