$(document).ready( function() {
    console.log("Gotta catch 'em all!");
    $('.btn-danger').on('click', function(e){
        e.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            method: 'DELETE',
            url: url
        }).done( function(data) {
            console.log('pokemans dleeeeeeted');
            window.location = '/pokemon';
        })
    })
})