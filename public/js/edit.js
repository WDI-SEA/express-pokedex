
    //this adds a specific pokemon to our database, once the button for a pokemon is clicked on in index.ejs, using the submit button
    //this happens because our index.ejs button form calls a POST function in pokemon.js.
    //that POST function knows to call this PUT javascript function? I don't know how - can't find a linked #id call.
      $('#put-form').on('submit', function(e) {
        e.preventDefault();
        var articleForm = $(this);
        var articleUrl = articleForm.attr('action');
        var articleData = articleForm.serialize(); //sending form data to the backend with serialize
        $.ajax({
          method: 'PUT',
          url: articleUrl,
          data: articleData
        }).done(function(data) {
          console.log(data);
          // update the client-side wUI
        })
      });

      //pulled this script from my cruddy board games project & from booktown project
      $('.delete-pokemon').on('click', function(e) {
        e.preventDefault();
        // var pokemonElement = $(this); //not needed
        var pokemonUrl = $(this).attr('action');
        $.ajax({
          url: pokemonUrl,
          method: 'DELETE'
        }).done(function(data) {
          console.log(data);
          // do stuff when the DELETE action is complete
          // pokemonElement.remove(); //this line may not be needed anymore
          window.location = '/pokemon/favorites';
        });
      });
