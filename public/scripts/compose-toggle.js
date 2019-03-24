// toggle for Compose button in nav-bar
$(document).ready(function() {
  $(".compose-toggle").click(function() {
      $(".new-tweet").fadeToggle(800);
      $("textarea").focus();
  });
})