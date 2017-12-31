$('.delete-fav').click(function(e){
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href'),
    method: 'DELETE'
  }).done(function(data){
    window.location.href = '/pokemon';
  });
});
