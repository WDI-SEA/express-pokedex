$(document).ready( function() {
    console.log("Gotta catch 'em all!");
    $('.ball').on('click', function() {
        $(this).children('.top').addClass('rotate');
    })
    $('.btn-danger').on('click', function(e){
        e.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            method: 'DELETE',
            url: url
        }).done( function(data) {
            window.location = '/pokemon';
        })
    })
})