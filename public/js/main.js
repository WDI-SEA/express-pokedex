console.log('JS main is running')

$('.delete').on('click', function(e) {
	console.log('in delete route');
	e.preventDefault();
	var deleteUrl = $(this).attr('href');
	$.ajax({
		method: 'delete',
		url: deleteUrl
	}).done(function(data) {
		window.location = '/pokemon';
	})
})