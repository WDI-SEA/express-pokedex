$(document).ready(function(){
  $('.pokemonDelete').click(function(e){
    e.preventDefault();
    var that = this;
    console.log($(this).prev().html());
    $.ajax({
      url: '/pokemon/' + $(this).prev().html(),
      method: 'DELETE',
      success: function(){
        $(that).parent().remove();
      }
    });
  });
  $('.home').click(function(e){
    e.preventDefault();
    
  });
});