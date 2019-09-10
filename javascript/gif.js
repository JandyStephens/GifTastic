$(document).ready(function() {
  var topics = [
    "gardening",
    "dwarf hamsters",
    "futurama",
    "cake decorating",
    "fifth element"
  ];

  showButtons();

  function showButtons() {
    $("#buttons-view").empty();

    for (let i = 0; i < topics.length; i++) {
      var topicBtn = $("<button>");
      topicBtn.addClass("gif");
      topicBtn.attr("data-name", topics[i]);
      topicBtn.text(topics[i]);
      $("#buttons-view").append(topicBtn);
    }
  }

  $("#add-gif").on("click", function() {
    event.preventDefault();
    var gif = $("#gif-input")
      .val()
      .trim();
    topics.push(gif);
    showButtons();
  });
});
