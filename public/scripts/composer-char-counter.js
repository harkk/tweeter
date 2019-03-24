// counts characters and changes text colour of counter to red
// if it exceeds the 140 character limit

$(document).ready(function() {
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