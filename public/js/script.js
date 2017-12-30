$(".delete-pokemon").click(function(e){
		e.preventDefault();
		console.log("delete this shit");
		$.ajax({
			method: "DELETE",
			url: $(this).attr("action"),
		}).done(function(data){
			window.location.href = "/pokemon";
		});
	});