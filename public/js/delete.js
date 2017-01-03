$(document).ready(function() {

  console.log("HOLLATCHABOY");

  // DELETE AN ARTICLE

  $('.delete-link').on('click', function(e) {

    console.log(e.target.parentNode.id);
    var url = "/pokemon/" + e.target.parentNode.id;

    $.ajax({
      method: 'DELETE',
      url: url
    }).done(function(data) {
      $(e.target).parent().remove();
    });
  });

});