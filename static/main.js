var forms = $('.delete').on('submit', function(e) {
  e.preventDefault();
  var element = $(this);
  var url = element.attr('action');
  $.ajax({
    method: 'DELETE',
    url: url
  }).done(function(data) {
    window.location = '/pokemon';
  });
});
