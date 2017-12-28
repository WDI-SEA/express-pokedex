console.log("Hello from script.js");

	$('.add-favorite').submit(function(e){
		e.preventDefault();
		var name = $(this).val();
		var data = $(this).serialize();
		console.log("added: ", name);
		$.ajax({
			url: name,
			method: 'DELETE',
			data: data
		}).done(function(){
			window.location.href = '/pokemon';
		});
	});

	$('.rmv-favorite').submit(function(e){
		e.preventDefault();
		var name = $(this).val();
		var data = $(this).serialize();
		console.log("Deleted: ",name);
		$.ajax({
			url: name,
			method: 'DELETE',
			data: data
		}).done(function(){
			window.location.href = '/pokemon';
		});
	});
