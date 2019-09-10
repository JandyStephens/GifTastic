$(document).ready(function() {
  var topics = [
    "gardening",
    "dwarf hamsters",
    "futurama",
    "cake decorating",
    "fifth element"
  ];

  for (let i = 0; i < topics.length; i++) {
    var topicBtn = $("<button>");
    topicBtn.text(topics[i]);
    $("#buttons-view").append(topicBtn);
  }
});
