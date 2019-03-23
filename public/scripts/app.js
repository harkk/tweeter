$(document).ready(function() {
  function renderTweets(tweets) {
    tweets.forEach(tweet => {
      let renderedTweet = createTweetElement(tweet);
      $(".container").prepend(renderedTweet);
    });
  };

  function createTweetElement(tweet) {
    let content =
      `<section class = "tweet-container">
        <article class="tweet">
          <header>
            <img src="${tweet.user.avatars.small}" />
            <h2>${tweet.user.name}</h2>
            <h5>${tweet.user.handle}</h5>
          </header>
          <p>${escape(tweet.content.text)}</p>
          <footer>
            <p>${moment(tweet.created_at).fromNow()}</p>
            <div class="social-bar">
              <img src="../images/flag.png" alt="flag">
              <img src="../images/retweet.png" alt="retweet">
              <img src="../images/heart.png" alt="heart">
            </div>
          </footer>
        </article>
      </section>`

    $(".post-tweet").prepend(content);
  };

  function escape(str) {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  };

  function loadTweets() {
    $.get("http://localhost:8080/tweets", function(allTweets) {
      renderTweets(allTweets);
    });
  };
  loadTweets();

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();
    if ($("#textarea").val().length > 140) {
      $("#errormsg").text("Your tweet is too long!");
      $(".error").fadeIn();
    } else if ($("#textarea").val() === "") {
      $("#errormsg").text("There is nothing to tweet!");
      $(".error").FadeIn();
    } else {
      $(".error").fadeOut();
      $.ajax( {
        type: "POST",
        url: "/tweets",
        data: $(this).serialize()
      }).then(function(tweets) {
        loadTweets();
        $("#textarea").val('');
      });
    };
  });

  $("#compose").click(function() {
    $(".new-tweet").toggle( "fast", function() {
  });
    $("textarea").focus();
  });
});