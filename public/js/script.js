$('document').ready(function() {
	$('.remove').on('click', function(e) {
		e.preventDefault();
		var toRemove = $(this);
		var url = toRemove.attr('href');

		$.ajax({
			method: 'delete',
			url: url
		}).done(function(data) {
			console.log(data);
		});
		window.location = '/pokemon/'
	})
})