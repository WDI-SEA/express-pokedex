$(".delete-pokemon").on('click', function(e){
  $.ajax({
    method: "DELETE",
    url: $(this).attr('action'),
  }).done(function(){
    window.location = "/games";
  });
});
