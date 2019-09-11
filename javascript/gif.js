$(document).ready(function() {
  var topics = [
    "reading rainbow",
    "invader zim",
    "futurama",
    "captain planet",
    "simpsons"
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
        var indGif = $(
          `<img src="${response.data[i].images.original_still.url}">`
        );
        indGif.attr("data-still", response.data[i].images.original_still.url);
        indGif.attr("data-animate", response.data[i].images.original.url);
        indGif.attr("data-state", "still");

        indGif.on("click", onImageClick);

        indGifDiv
          .prepend(indGif)
          .prepend(`<h5>Rating: ${response.data[i].rating}</h5>`);
        $("#gifs-view").prepend(indGifDiv);
      }
    });
  });

  function onImageClick() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

  showButtons();
});
