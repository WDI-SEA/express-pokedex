console.log("Connected to script-js");

$(document).ready(function() {
	$(".delete").on("click", function(e) {
		e.preventDefault();
		var url = $(this).attr("href");
		$.ajax({
			method: "DELETE",
			url: url
		}).done(function(data) {
			console.log("Pokemon Removed");
			window.location = "/pokemon";
		});
	});
});