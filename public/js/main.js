// console.log("main js on board");

// DELETE
$('.delete-item').on('click', function(e){
  e.preventDefault();
  var pokemonToDelete = $(this);
  var pokemonUrl = pokemonToDelete.attr('href');
  console.log(pokemonUrl);
  console.log("you clicked delete");
  $.ajax({
    method: 'DELETE',
    url: pokemonUrl
  }).done(function(data){
    window.location = '/';
  });
});

// PUT
$('.update-item').on('submit', function(e){
  e.preventDefault();
  var pokemonToUpdate = $(this);
  var pokemonUrl = pokemonToUpdate.attr('href');
  console.log(pokemonUrl);
  console.log("you clicked update for " + $(this));
  $.ajax({
    method: 'PUT',
    url: pokemonUrl
  }).done(function(data){
    console.log("item updated")
  });
});
