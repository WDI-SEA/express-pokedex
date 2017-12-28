console.log("Hello from script.js");

$('.rmv-favorite').submit(function(e){
	e.preventDefault();
	$.ajax({
		url: $(this).attr('action'),
		method: 'DELETE'
	}).done(function(){
		window.location.href = '/pokemon';
	});
});