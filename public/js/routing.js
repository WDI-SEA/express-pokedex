console.log('hello from routing.js!');
$('.delete-link').click(function(e) {
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href'),
    method: 'DELETE'
  }).success(function(data){
    window.location.href = '/pokemon';
  });
});
