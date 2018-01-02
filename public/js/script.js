$('.delete-btn').click(function(e){
    e.preventDefault(); 
    var url = 'pokemon/'+$(this).attr('data-id')

     $.ajax({
        url: url,
        method: 'DELETE'
     });
});