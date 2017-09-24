
 $(document).ready(function() {
   $('.delete-link').on('click', function(e) {
     var url = "/pokemon/" + e.target.parentNode.id;
     $.ajax({
       method: 'DELETE',
       url: url
     }).done(function(data) {
       $(e.target).parent().remove();
     });
   });
 });
