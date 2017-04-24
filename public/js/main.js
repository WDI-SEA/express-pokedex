// Jquery to select name of pokemon, give span to sections with different color.
// give it data-types to access the type and assign class there.
// http://stackoverflow.com/questions/19421950/different-colors-for-alternate-letters-in-a-word

// need to test
$(function() {
    var secondType = $("#pokemon-name").data("secondtype");
    if (secondType) {
        $("#pokemon-name").each(function(index) {
            var originalText = $(this).text();

            var newText = "";
            for (var i = 0; i < originalText.length; i++) {
                if (i % 2 === 0) {
                    newText += "<span class=" + secondType + ">" + originalText.charAt(i) + "</span>";
                    console.log(newText);
                } else {
                    newText += originalText.charAt(i);
                }
            }
            $(this).html(newText);
        });
    }
});
