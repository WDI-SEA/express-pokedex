$(document).ready(function(){
  $('.delete').on('click', function(e){
    e.preventDefault();
    var element = $(this);
    var pokeUrl = element.attr('href');

    $.ajax({
      method: 'DELETE',
      url: pokeUrl
    }).done(function(data){
      console.log(data);
      element.remove();
      window.location = '/pokemon';
    });
  });
});
