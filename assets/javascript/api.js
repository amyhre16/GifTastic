$(document).ready(function() {
	var topics = ["Will Ferrell", "Will Smith", "Julia Louis-Dreyfus", "Tom Cruise", "Steve Carell", "John Cleese", "Amy Poehler", "Dana Carvey"];
	
	createButtons();

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
			btn.addClass('btn actor');
			btn.attr('data-name', topics[i]);
			btn.text(topics[i]);
			$('#buttonHolder').append(btn);
		}
	}

	$('.actor').on('click', function() {
		var actor = $(this).data('name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=" + actor + "&fmt=json";
		$.ajax({
				url: queryURL,
				method: "GET"})
			.done(function(response) {
				for (var i = 0; i < response.data.length; i++) {
					console.log(response.data[i]);
					var gifDiv = $('<div class="gif">');
					var rating = "<p>Rating: " + response.data[i].rating + "</p>";
					console.log(rating);
					var gif = "<img class='gifImg' src='" + response.data[i].images.fixed_height.url
						 + "' alt='" + actor + "' data-state='animated' data-animated='" + response.data[i].images.fixed_height.url 
						 + "' data-still='" + response.data[i].images.fixed_height_still.url + "'>";
					gifDiv.append(rating + gif);
					$('#giphyHolder').prepend(gifDiv);
				}
			});

	});

	$('.gifImg').on('click', function() {
		if ($(this).attr('data-state') == "animated") {
			$(this).attr('data-state', 'still');
			$(this).attr('src', $(this).data('still'));
		}
		else {
			$(this).attr('data-state', 'animated');
			$(this).attr('src', $(this).data('animated'));
		}
	});

	/*
		
	*/
	$('#addActor').on('click', function() {
		var input = $('#actor-input').val().trim();
		if ((input != "") && (topics.indexOf(input) == -1)) {
			topics.push($('#actor-input').val().trim());
			createButtons();
		}
		else if (input == "") {
			alert("Oops! Looks like you forgot to a name.")
		}
		else {
			alert("Sorry! A button for this actor/actress already exists. Please try again.");
		}
		return false;
	});
	// createButtons();
});