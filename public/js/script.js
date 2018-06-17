$(document).ready(function() {
  $('.pokemon').on('click', function(event) {
    $(this).removeClass('pokemon');
    $(this).addClass('tint');
  });

   $('.delete').on('click', function(event) {
      event.preventDefault();
      console.log('delete clicked');
      var url = $(this).attr('href');
      console.log(url);
      $.ajax({
        method: 'DELETE',
        url: url
      }).done(function(data) {
        console.log(data);
        window.location = '/pokemon';
      });
    });
});
