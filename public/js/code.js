$(document).ready(function() {
  document.getElementsByClassName("more-info-button")[0].addEventListener("click", function() {
    document.getElementsByClassName("pokemon-stats")[0].style.display = "block";
    document.getElementsByClassName("pokemon-sprite")[0].style.height = "100%";
    document.getElementsByClassName("pokemon-sprite")[0].style.width = "80%";
    document.getElementsByClassName("pokemon-sprite")[0].style.float = "left";

    document.getElementsByClassName("pokemon-sprite")[0].style.margin = "0 0 0 -25%";
  });


  console.log("I have access to this at some point");

  $(".delete-link").click(function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr("href"),
      method: 'DELETE'
    }).done(function(data) {
      window.location.href="/pokemon";
    });
  });

});