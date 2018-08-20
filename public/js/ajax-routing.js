$(document).ready(function() {
  console.log('ajax routing reached on this page');

  // get route and param

  var unfav = $('#del-fav').click(function(e) {
    e.preventDefault();

    var url = $('#del-fav').attr('href');

    $.ajax({
      url: url,
      method: 'DELETE'
    }).done(function(data) {
      console.log('finished unfavorite', data);
    }).fail(function(err) {
      console.log('failed to unfavorite with err', err);
    });
  });
});
