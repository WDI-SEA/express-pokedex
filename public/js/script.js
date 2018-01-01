//run this everytime I hit this crazy ass button
$(".delete-pokemon").click(function(e){
		e.preventDefault();
		console.log("DELETED!");
		$.ajax({
			method: "DELETE",
			url: $(this).attr("action"),
		}).done(function(data){
			window.location.href = "/pokemon";
		});
});