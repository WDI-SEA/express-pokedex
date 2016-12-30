$(".delete-form").on("submit", function(event) {
  console.log("delete clicked");
  event.preventDefault();
  var form_element = $(event.target);
  var cell_element = $(event.target).closest('.pokemon-cell'); // could be null
  var url = form_element.attr("action");
  var form_data = form_element.serialize();

  $.ajax({
    method: "DELETE",
    url: url,
    data: form_data
  }).then(function(data) {
    console.log("deleting");
  });

  if (cell_element !== null) {
    cell_element.remove();
  }

});
