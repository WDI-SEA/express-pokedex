// $('.add-fav').click(function(e){
//   e.preventDefault()
//   $.ajax({
//     url: $(this).attr('href'),
//     method: 'POST'
//   }).done(function(data){
//     //reloads page
//     window.location.href = '/favorites';
//   });
// });

$('.delete-fav').click(function(e){
  e.preventDefault()
  $.ajax({
    url: $(this).attr('href'),
    method: 'DELETE'
  }).done(function(data){
    //reloads page
    window.location.href = '/favorites';
  });
});