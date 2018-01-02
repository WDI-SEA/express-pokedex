$('.delete-btn').click(function(e){
    e.preventDefault(); 
    console.log($(this).attr('data-id'));

     $.ajax({
        url: 'pokemon/'+$(this).attr('data-id'),
        method: 'DELETE'
     }).then(function(pokemon){
        console.log(pokemon);
     })
})