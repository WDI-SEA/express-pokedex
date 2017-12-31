$(".delete-button").click(function(e) {
   e.preventDefault();
   $(this).off("click");

   $.ajax({
      url: $(this).attr("href"),
      method: "DELETE"
   }).success(function(data) {
      //$(this).remove();
      window.location.href="/pokemon";
      // $.ajax({
      //    url: "/pokemon",
      //    method: "GET"
      // });
   }).error(function(err) {
      console.log("Ajax error.",err);
   });
});

$(".star-button").click(function(e) {
   $($(this).siblings()[0]).removeClass("hidden");
   console.log($(this).siblings());
});
