
console.log("Hello from AJAX!");

$(document).ready(function(){
	$(".delete-btn").click(function(e){
		e.preventDefault();
		var url = $(this).attr("href");
			$.ajax({
			method: "DELETE",
			url: url
		}).done(function(data){
			window.location="/pokemon";
		}).fail(function(err){
			console.log("error!", error);
		});
	});
});
