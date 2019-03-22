/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  function renderTweets(tweets) {
    tweets.forEach(tweet => {
      let renderedTweet = createTweetElement(tweet);
      $(".container").prepend(renderedTweet);
    })
  }

  function createTweetElement(tweet) {
    let content =
      `<section class = "tweet-container">
        <article class="tweet">
          <header>
            <img src="${tweet.user.avatars.small}" />
            <h2>${tweet.user.name}</h2>
            <h5>${tweet.user.handle}</h5>
          </header>
          <p>${tweet.content.text}</p>
          <footer>
            <p>${tweet.created_at}</p>
          </footer>
        </article>
      </section>`

    $(".post-tweet").prepend(content);
  };

  function loadTweets() {
    $.ajax( {
      type: "GET",
      url: "/tweets"
    }).then(function(res) {
      renderTweets(res);
    });
  }

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();
    $.ajax( {
      type: "POST",
      url: "/tweets",
      data: $(this).serialize()
    }).then(function(tweets) {
      loadTweets();
    })
  });
});