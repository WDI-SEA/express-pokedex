$('.delete-button').on('click', function(e){
  e.preventDefault();

  var element = $(this);
  var pokemonUrl = element.attr('href');

  $.ajax({
    method: 'DELETE',
    url: pokemonUrl
  }).done(function(data){
    console.log(data);
    window.location = '/pokemon';
  });
});
