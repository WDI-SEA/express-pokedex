$(".delete-pokemon").on('click', function(e){
  e.preventDefault;
  $.ajax({
    method: "DELETE",
    url: $(this).attr('action'),
  }).done(function(data){
    window.location = "/pokemon";
  });
});
