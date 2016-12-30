$(document).ready(function() {
	$(".delete-link").on("click", function(e) {
		e.preventDefault();

		var url = $(".delete-form").attr("action");
			console.log("ready to delete")
		$.ajax({
			method: "DELETE",
			url: url
		}).done(function(data) {
			console.log("ran ajax!!!!!!");
			window.location = "/pokemon";
		});
	});
});