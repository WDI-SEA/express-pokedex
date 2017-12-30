console.log('hello from routing.js!');
$('.delete').click(function(e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr('action'),
    method: 'DELETE'
  }).success(function(data){
    window.location.href = '/pokemon';
  });
});
