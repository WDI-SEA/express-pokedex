$(document).ready(function(){
    $('.modal').modal({
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      complete: function() {  // Callback for Modal close
        $('#capture-form').submit();
      }
    });

    $('.capture-button').on('click', function(e) {
        var name = $(this).attr('data-name');
        $('#pokemon-name').attr('value', name);
    });
});

// Event handler for 'delete' link on list of favorite pokemon
$('.delete-link').on('click', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    var id = $(this).attr('data-id');
    $.ajax({
        method: 'DELETE',
        url: url
    }).done(function() {
        $('#li-' + id).remove();
    });
});