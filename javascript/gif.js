$(document).ready(function() {
  var topics = [
    "gardening",
    "dwarf hamsters",
    "futurama",
    "cake decorating",
    "fifth element"
  ];

  function showButtons() {
    $("#buttons-view").empty();
    $("#gif-input").val("");

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

  $(document).on("click", ".gif", function(response) {
    // console.log(response);
    var searchTerm = $(this).attr("data-name");
    // console.log(searchTerm);
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=8Exgf9tU7mNJScplIIgNLTVYWdbiaWcL&q=" +
      searchTerm +
      "&rating=PG-13&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        var indGifDiv = $("<div>");
        indGifDiv
          .append(`<img src="${response.data[i].images.original_still.url}">`)
          .append(`<h5>Rating: ${response.data[i].rating}</h5>`);
        $("#gifs-view").append(indGifDiv);
      }
    });
  });
  showButtons();
});
