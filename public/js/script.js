
  $('a.delete').on('click', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    $.ajax({
      method: "DELETE",
      url: url
    }).done(function(data) {
      console.log(data);
      window.location = '/index';
    });
  });
});
