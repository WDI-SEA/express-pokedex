$(function(){
	$('.add-favorite').submit(function(e){
		e.preventDefault();
		var url = $(this).attr('name');
		var data = $(this).serialize();

		$.ajax({
			url: url,
			method: 'POST',
			data: data
		}).done(function(){
			window.location.href = '/pokemon';
		});
	});
});