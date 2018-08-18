$(document).ready(function(){
    
    $('#delete-btn').click(function (e){
        e.preventDefault();

        var url = $(this).attr('href');

        console.log(url);
        $.ajax({
            method:"DELETE",
            url: url
        }).done(function(data){
            window.location = '/pokemon';
        });
    });
});
