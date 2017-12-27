$('.delete-link').click(function(event){
	event.preventDefault(); //Defaut behavior of the link is to go to the URL linked
	//But we want to intercept it and change it to delete
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE'
	}).success(function(data){
		window.location.href = '/pokemon'; //Reloads the current page on success
	});
});

// $('.catch-link').click(function(event){
// 	event.preventDefault().success(function(data){
	
		

// 	});
// });


