$(".delete-button").click(function(e) {
   e.preventDefault();
   $(this).off("click");
   $("#spinner-"+e.target.id).removeClass("hidden");

   $.ajax({
      url: $(this).attr("href"),
      method: "DELETE"
   }).success(function(data) {
      window.location.href="/pokemon";
   }).error(function(err) {
      console.log("Ajax error.",err);
   });
});

$(".star-button").click(function(e) {
   $("#spinner-"+e.target.id).removeClass("hidden");
});

$(".info-button").click(function(e) {
   $("#spinner-"+e.target.id).removeClass("hidden");
});
