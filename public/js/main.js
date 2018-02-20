// Event handler for delete button
$('.delete-link').on('click', function(e) {
    e.preventDefault();
    var namePokemon = $(this);
    var deleteUrl = namePokemon.attr('href');
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    }).done(function(data) {
        window.location = '/pokemon';
    });
});
