console.log("Hello from script.js");

	$('.add-favorite').submit(function(e){
		e.preventDefault();
		var name = $(this).val();
		var data = $(this).serialize();
		console.log("added: ", name);
		$.ajax({
			name: name,
			method: 'PUT',
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
			name: name,
			method: 'DELETE'
		}).done(function(){
			window.location.href = '/pokemon';
		});
	});
