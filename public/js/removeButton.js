$(document).ready( () => {
  console.log('jquery');

  $('.remove-btn').on('click', function(e) {
    e.preventDefault();
    const favUrl = $(this).attr('href');
    console.log(this);
    $.ajax({
      method: 'DELETE',
      url: favUrl
    }).done( (data) => {
      console.log('delete successful', data);
      window.location = '/pokemon';
    }).fail( (err) => {
      console.log('error', err);
    })
  });
});
