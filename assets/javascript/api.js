$(document).ready(function() {
	/*
		array of names for the initial buttons
	*/
	var topics = ["Will Ferrell",
		"Will Smith",
		"Julia Louis-Dreyfus",
		"Tom Cruise",
		"Steve Carell",
		"John Cleese",
		"Amy Poehler",
		"Dana Carvey",
		"Chris Pratt",
		"Wayne Knight",
		"James Earl Jones",
		"Alfonso Ribeiro"];
	
	/*
		want to run this function to create the inital buttons when the page is loaded
	*/
	createButtons();


	/*
		gets run when an actor/actress button is clicked
	*/
	function apiCall() {
		/*
			actor is the attribute data-name of the buton that was clicked
			queryURL is the url of the api with the actor var concatenated into the string
				limit 10 gif o
				format will return in json
		*/
		var actor = $(this).data('name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + actor + "&fmt=json";
		/*
			run the ajax method to request the api
			send an object w/ url and method properties
		*/
		$.ajax({
				url: queryURL,
				method: "GET"})
			/*
				when the reqest is finished, run this function w/ parameter response
			*/
			.done(function(response) {
				/*
					response.data is an array of objects
				*/
				for (var i = 0; i < response.data.length; i++) {
					// console.log(response.data[i]);
					/*
						create a jQuery div object
						this will hold each img/rating
					*/
					var gifDiv = $('<div class="gif">');
					/*
						rating is the gif's rating
					*/
					var rating = "<p>Rating: " + response.data[i].rating + "</p>";
					/*
						gif creates an img element w/
							still image is the initial src
							actor name is the alt
							data-state is still at first (this will change to animated when img is clicked on)
							data-animated is the object path to the animated gif url
							data-still is the object path to the still image url
					*/
					var gif = "<img class='gifImg' src='" + response.data[i].images.fixed_height_still.url
						 + "' alt='" + actor + "' data-state='still' data-animated='" + response.data[i].images.fixed_height.url 
						 + "' data-still='" + response.data[i].images.fixed_height_still.url + "'>";
					/*
						append the rating element and the gif element to gifDiv
						prepend the gifDiv to div element w/ giphyHolder id
					*/
					gifDiv.append(rating + gif);
					$('#giphyHolder').prepend(gifDiv);
				}
			}); // end of $.ajax
	} // end of apiCall funciton

	/*
		when a div w/ actor class is clicked on, run the apiCall function
		have to do the event listener like this b/c when you add a button dynamically,
			event listeners are no longer attached to them
		to fix this, we attach the event listener to a parent element of the element, class, or id we want to listen to
			then we send in the selector we want to target (in this case, .actor)
	*/
	$(document).on('click', '.actor', apiCall);

	/*
		this function is run when the page loads and when you add a button
	*/
	function createButtons() {
		// empty the button holder
		$('#buttonHolder').empty();
		/*
			for each index in the topics array
				create a button element
				add btn class, add data-name attribute and assign the actor/actress name to it
				display the actor name in the button text
		*/
		for (var i = 0; i < topics.length; i++) {
			var btn = $('<button>');
			btn.addClass('btn btn-warning actor');
			btn.attr('data-name', topics[i]);
			btn.text(topics[i]);
			$('#buttonHolder').append(btn);
		}
	} // end of createButtons function

	/*
		on click event listener for the gif images
	*/
	$(document).on('click', '.gifImg', function() {
		/*
			if the image is animated when the user clicks on it,
				change the state of image to 'still'
				change the src to the still image
		*/
		if ($(this).attr('data-state') == "animated") {
			$(this).attr('data-state', 'still');
			$(this).attr('src', $(this).data('still'));
		}
		/*
			if the image is still when the user clicks on it,
				change the state of image to 'animated'
				change the src to the animated image
		*/
		else {
			$(this).attr('data-state', 'animated');
			$(this).attr('src', $(this).data('animated'));
		}
	}); // end of .gifImg event listener

	/*
		on click event listener for the add actor button
	*/
	$('#addActor').on('click', function() {
		/*
			grabs what the user typed in the actor input box and gets and trims the whitespace
		*/
		var input = $('#actor-input').val().trim();
		/*
			if the user has typed something in the box and has not already added this button
				push the input to the topics array and create the buttons
		*/
		if ((input != "") && (topics.indexOf(input) == -1)) {
			topics.push(input);
			createButtons();
		}
		/*
			if the user does not type anything in the box,
				alert them and let them know they forgot
		*/
		else if (input == "") {
			alert("Oops! Looks like you forgot to a name.")
		}
		/*
			if what the user typed in the box is already in topics array,
				alert them and let them know they can't do that
		*/
		else {
			alert("Sorry! A button for this actor/actress already exists. Please try again.");
		}
		/*
			empty out the text box
		*/
		$('#actor-input').val("");
		/*
			if you don't return false here, the screen will refresh
				b/c the add actor button is type submit
		*/
		return false;
	}); // end of #addActor event listener
}); // end of $(document).ready(function() { })