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
       console.log("deleted");
     });
     window.location = '/pokemon';
   });
});
