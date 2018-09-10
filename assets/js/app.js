 // Initial array of gifs
 var gifButtons = ["Elephant", "Penguin", "Giraffe", "Lion", "Tiger", "Panda", "Gorilla", "Monkey", "Rhino", "Otter"];

 var newGif;

 function renderGifs() {
     var gif = $(this).attr("value");

     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
         gif + "&api_key=dc6zaTOxFJmzC&limit=10";

     $.ajax({
         url: queryURL,
         method: 'GET'
     }).then(function (response) {

         var results = response.data;

         console.log(results)

         for (var i = 0; i < results.length; i++) {

             var gifDiv = $("<div>")

             var p = $("<p>").text("Rating: " + results[i].rating)

             var gifImage = $('<img>')

             gifImage.attr({
                 src: results[i].images.original_still.url,
                 datastate: "still",
                 datastill: results[i].images.original_still.url,
                 dataanimate: results[i].images.original.url
             }).addClass("gifsA")

             gifDiv.append(p).append(gifImage)

             $('#gifs-view').prepend(gifDiv)
         }
     })
 }


 // This function handles events where one button is clicked
 $("#add-gif").on("click", function (event) {
     event.preventDefault()

     newGif = $("#gif-input").val()

     console.log(newGif)

     gifButtons.push(newGif);

     renderButtons()
 });


 // Function for displaying movie data
 function renderButtons(newGif) {

     $("#gifs-view").empty()

     for (var i = 0; i < gifButtons.length; i++) {

         $('<input>').attr({
             type: "submit",
             value: gifButtons[i]
         }).addClass("gifs").appendTo($("#gifs-buttons"))

     }
 }


 //PAUSE
 function changeState() {

     console.log("clicked")

     var state = $(this).attr("datastate")

     if (state === "still") {
         var animateSRC = $(this).attr("dataanimate")
         $(this).attr("src", animateSRC)
         $(this).attr("datastate", "animate")
         console.log("first")
     } else {
         var stillSRC = $(this).attr("datastill")
         $(this).attr("src", stillSRC)
         $(this).attr("datastate", "still")
         console.log("second")
     }
 };


 $(document).on("click", ".gifs", renderGifs)

 $(document).on("click", ".gifsA", changeState)

 // Calling the renderButtons function to display the initial list of gifs
 renderButtons();