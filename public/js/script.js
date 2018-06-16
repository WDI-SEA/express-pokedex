$(document).ready(function () {
  console.log('jQuery working');

  // DELETE a specific article from the database
	$(".delete").on('click', function(e) {
		e.preventDefault();
    var url = $(this).attr('href');
    $.ajax({
    	method: 'DELETE',
    	url: url
    }).done(function(data) {
    	window.location = '/pokemon';
    })
    console.log('done!');
	});
})