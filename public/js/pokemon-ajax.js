$(document).ready(function() {

  $('.delete').click(function(e){
    console.log("clicked");
    e.preventDefault();
    // ajax call that uses method POST
    $.ajax({
      url: $(this).attr('href'),
      method: 'DELETE'
      //if return successfully
    }).done(function(data){
      window.location.href = '/pokemon';
    });
  });

});