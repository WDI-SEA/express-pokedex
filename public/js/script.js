$(document).ready(function() {
  console.log('done')
  $('button.deleteButton').click(function(e) {
    e.preventDefault()
    var url = $(this).attr('href');
    $.ajax({
      method: 'DELETE',
      url: url
    }).done(function(data) {
      console.log('done')
      window.location = '/pokemon';
    })
  })

});
