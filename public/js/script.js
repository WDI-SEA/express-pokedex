$(document).ready(function(){
    console.log("hello");
    $('.delete').on('click', function(e) {
        console.log("delete button clicked");
        e.preventDefault();
        var url = $(this).attr('href');
        $.ajax({
            method: 'DELETE',
            url: url
        }).done(function(data) {
            console.log(data);
            window.location = '/pokemon';
        })
    })
});