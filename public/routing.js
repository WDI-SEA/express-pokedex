console.log("hello from routing");

$(".delete-link").click(function(e){
	console.log("clicked");
	e.preventDefault();
	$.ajax({
		url: $(this).attr("href"),
		method: "DELETE"
	}).done(function(data){
		window.location.href = "/pokemon"
	});
});