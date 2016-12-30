$(".delete-form").on("submit", function(event) {
  event.preventDefault();
  var form_element = $(event.target);
  var url = form_element.attr("action");
  var form_data = form_element.serialize();

  $.ajax({
    method: "DELETE",
    url: url,
    data: form_data
  }).done(function(data) {
    console.log("deleting");
    window.location.href = "/pokemon/";
  });

});
