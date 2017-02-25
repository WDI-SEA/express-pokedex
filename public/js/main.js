$(function(){
	console.log("shit linked");
	$(".delete-fav").on("click", function(e) {
		e.preventDefault();
		var favElement = $(this);
		var favURL = favElement.attr("href");
		$.ajax({
			method: "DELETE",
			url: favURL
		}).done(function(data){
			console.log(data);
			favElement.remove();
			window.location = '/favorites';
		});
	});
});