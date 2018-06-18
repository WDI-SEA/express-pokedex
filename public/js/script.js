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
	//Grabs the value of the input field on submit and redirects to a show page
	$(".searchBar").on("submit", function(e) {
		e.preventDefault();
		var search = $("#search").val();
		search = search.toLowerCase();
		window.location = "/pokemon/" + search
	});
});