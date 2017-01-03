$( document ).ready(function(){

//AJAX request to delete pokemon from favorites
$(".delete").on('click', function(e){
  e.preventDefault();
  console.log("you clicked delete pokemon!");
  var element = $(this);
  var url = element.attr('href');

  $.ajax({
    method: 'DELETE',
    url: url
  }).done(function(data){
    console.log("this is data that got deleted, sad:", data);

    window.location = '/pokemon';
  });
});










});
