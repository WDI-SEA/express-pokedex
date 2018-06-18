$(document).ready(function() {
	console.log('doc ready');

	$('.remove-btn').click(function(e) {
		e.preventDefault();
		url = $(this).attr('href');
		$.ajax({
			method: 'DELETE',
			url: url
		}).done(function(data) {
			window.location = '/pokemon';
		});
	});	

	$("#sortable").sortable({
		revert: true,
		stop: function() {
			console.log('drag stop')
		}
	});
});