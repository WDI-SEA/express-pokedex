%(".delete-button").click(function(e)){
	e.preventDefault();
	console.log($(this).attr("href"));

	$.ajax({
		url: $(this).attr("href"),
		method: "DELETE"
	}).success(function(data){
		window.location.herf = "/pokemon";
	}).fail(function(err){
		console.log("whoops",err);
	});
});