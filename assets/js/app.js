 // Initial array of gifs
 var gifButtons = ["Elephant", "Penguin", "Giraffe", "Lion", "Tiger", "Panda", "Gorilla", "Monkey", "Rhino", "Otter"];

 //empty variable to store our new gif to be pushed to array
 var newGif;

 //put the gifs on the page
 function renderGifs() {
     //take the gif term we want to pull in
     var gif = $(this).attr("value");

     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
         gif + "&api_key=dc6zaTOxFJmzC&limit=10";

     //pull in the data
     $.ajax({
         url: queryURL,
         method: 'GET'
     }).then(function (response) {
         //make the container/assign attributes needed/append to view
         var results = response.data;

         for (var i = 0; i < results.length; i++) {

             var gifDiv = $("<div>")

             var p = $("<p>").text("Rating: " + results[i].rating).addClass("rating")

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

 //on the click of the add new button
 $("#add-gif").on("click", function (event) {
     event.preventDefault()

     //take the value of the input/assign to array/re-render the buttons
     newGif = $("#gif-input").val()

     console.log(newGif)

     gifButtons.push(newGif);

     renderButtons()
 });

 //to render the buttons on the page - needs to run initially as well
 function renderButtons() {

     //empty the view so we don't have duplicates
     $("#gifs-buttons").empty()

     //loop through the array and assign attributes and classes as needed
     for (var i = 0; i < gifButtons.length; i++) {

         $('<input>').attr({
             type: "submit",
             value: gifButtons[i]
         }).addClass("gifs").appendTo($("#gifs-buttons"))

     }
 }

 //change the state of the gifs when clicked
 function changeState() {

     //assign the inital state of the gif
     var state = $(this).attr("datastate")

     //if the image isnt moving, animate it / else un-animate it
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

 //global event listeners so that they will work after functions run each time
 $(document).on("click", ".gifs", renderGifs)

 $(document).on("click", ".gifsA", changeState)

 //inital call to render the default buttons on screen
 renderButtons()