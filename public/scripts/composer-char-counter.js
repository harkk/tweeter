$(document).ready(function() {
  // --- our code goes here ---
  var charCount;
  $("#textarea").on("input", function() {
    var charCount = 140 - $(this).val().length;
    $(".counter").text(140 - $(this).val().length);
    if (charCount < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
})
})