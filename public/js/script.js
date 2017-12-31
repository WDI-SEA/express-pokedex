$(".delete-pokemon").click(function(e){
		e.preventDefault();
		console.log("DELETEDÍ");
		$.ajax({
			method: "DELETE",
			url: $(this).attr("action"),
		}).done(function(data){
			window.location.href = "/pokemon";
		});
});