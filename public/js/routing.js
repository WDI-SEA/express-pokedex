console.log('hello from routing.js!');
$('.delete').click(function(e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href'),
    method: 'DELETE'
  }).success(function(data){
    window.location.href = '/pokemon';
  });
});
