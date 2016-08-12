$(document).ready(function() {
  $('.add').on('click', function(e) {
    e.preventDefault();
    var pokeElement = $(this);
    var pokeUrl = pokeElement.attr('action');
    var pokeData = pokeElement.serialize();
    $.ajax({
      method: 'PUT',
      url: pokeUrl,
      data: pokeData
    }).done(function(data) {
      // get data returned from the PUT route
      console.log(data);

      // do stuff when the PUT action is complete
      pokeElement.remove();

      // or, you can redirect to another page
      window.location = '/pokemon';
    });
  });
});