$(document).ready(function() {
  // --- our code goes here ---
  $("#textarea").on("input", function() {
    let tweetLength = $(this).val().length;
    let tweetCount = 140 - tweetLength;
    let count = $(".counter");
    if (tweetCount > 0) {
      count.css("color", "black");
      count.text(tweetCount);
    } else {
      count.css("color", "red");
      count.text(tweetCount);
    };
  });
});