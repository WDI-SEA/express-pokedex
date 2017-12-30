$(".delete-button").click(function(e) {
   e.preventDefault();
   $.ajax({
      url: $(this).attr("href"),
      method: "DELETE"
   }).done(function(data) {
      $(this).removeClass("delete-button");
      // window.location.href="/pokemon";
      $.ajax({
         url: "/pokemon",
         method: "GET"
      })
   });
});
