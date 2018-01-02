//run this everytime I hit this crazy ass button
$(".delete-pokemon").click(function(e){
		console.log("DELETED!");
		e.preventDefault();
		$.ajax({
			url: $(this).attr("action"),
			method: "DELETE",
		}).done(function(data){
			window.location.href = "/pokemon";
		});
});