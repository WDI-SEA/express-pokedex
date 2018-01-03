$(function(){
 	$('.add-favorite').submit(function(e){
 		e.preventDefault();
 	$.ajax ({
 		url:$(this).attr('href'),
 		method: POST
 	}).success(function(data){
 		window.location.href = '/views/pokemon';
 	});
 });


//from Seattle Restaurants
//  $('.delete-link').click(function(e){
//  	e.preventDefault();
// $.ajax ({
//  	url:$(this).attr('href'),
//  	method: 'POST'
// 	}).success(function(data){
// 	window.location.href = '/pokemon';
//  });
// });