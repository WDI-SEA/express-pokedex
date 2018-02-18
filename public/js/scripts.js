$('#delete-link').click(function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    console.log(url);
    $.ajax({
      url: url,
      method: 'DELETE'
    }).done(function() {
      window.location = '/pokemon';
    });
});
