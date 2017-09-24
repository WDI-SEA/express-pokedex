$( document ).ready(function(){
  $(".delete-link").click(function(e){
     e.preventDefault();
     var element = $(this);
     console.log('clicked');
     var url = element.attr('href');
     $.ajax({
       method: 'DELETE',
       url: url
     }).done(function(data){
       window.location = "/pokemon";
       console.log("deleted");
     });
   });
});
