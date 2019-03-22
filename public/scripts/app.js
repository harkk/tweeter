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
          <p>${escape(tweet.content.text)}</p>
          <footer>
            <p>${tweet.created_at}</p>
          </footer>
        </article>
      </section>`

    $(".post-tweet").prepend(content);
  };

  function escape(str) {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  }

  function loadTweets() {
    $.get("http://localhost:8080/tweets", function(allTweets) {
      renderTweets(allTweets);
    })
  }
  loadTweets();

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();
    if ($("#textarea").val().length > 140) {
      alert("Your tweet is too long!")
    } else if ($("#textarea").val() === "") {
      alert("There is nothing to tweet")
    } else {
      $.ajax( {
        type: "POST",
        url: "/tweets",
        data: $(this).serialize()
      }).then(function(tweets) {
        loadTweets();
      })
    }
  });

  $("#compose").click(function() {
    $(".new-tweet").toggle();
    $("textarea").focus();
  })

});