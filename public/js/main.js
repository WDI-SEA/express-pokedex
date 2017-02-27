$(document).ready(function(){
  console.log("DOM ready");

  $(".delete-link").click(function(e){
    e.preventDefault();
    var element = $(this);
    var url = element.attr('href');
    $.ajax({
      method: 'DELETE',
      url: url,
    }).done(function(data){
      element.remove();
      window.location = "/pokemon";
      console.log("deleted");
    });
  });
});

function welcomeMessage(){
  $(".element").typed({
  strings: ["Welcome to your Pokedex, I am Dexter!"],
  typeSpeed: 0
});
}
