console.log("JS is actually working!");

$('.delete-pokemon').on('click', function(e){
  e.preventDefault();
  var element = $(this);
  var url = element.attr('data-delete');
  $.ajax({
      method: 'DELETE',
      url: url
  }).done(function(data) {
    console.log(data);
    window.location = '/mypokedex';
  });
});
