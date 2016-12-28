$('.delete-link').on('click', function(e) {
  e.preventDefault();
  var element = $(this);
  var url = element.attr('href');
  $.ajax({
    method: 'DELETE',
    url: url
  }).done(function(data) {
    // get data returned from the DELETE route
    console.log(data);

    // go back to the favorites after deleting anything.
    window.location = '/pokemon/favorite';
  });
});
