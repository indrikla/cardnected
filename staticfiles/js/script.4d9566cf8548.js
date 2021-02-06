var numOfCard = 10;
var numOfCardOpened = 0;
var noRepeatArray = [];
var finalUrl;
var level = 1;

function shuffle(array) {
	var i = array.length,
		j = 0,
		temp;

	while (i--) {
		j = Math.floor(Math.random() * (i+1));
		// swap randomly chosen element with current element
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function updateSession(key, value) {
	sessionStorage.setItem(key, value)
	$.ajax({
		method: 'POST',
		url: 'updateSession?' + 'key=' + key + '&value=' + value,
		data: {
			key: key, 
			value: value,
			'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
		},
		success: function(response) {
			console.log(response)
		}
	})
}

$(document).ready(() => {

	$('#shownCard').tilt({
		scale: 1.02,	
	})

	$('.js-tilt').tilt({
		scale: 1.2,
		glare: true,
		maxGlare: .11
	})
  
	var modal = document.getElementById("myModal");
	$('.close').click(function(event) {
		event.preventDefault();
		modal.style.display = "none";
	})

	window.onclick = function(event) {
		event.preventDefault();
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
  
	$('.js-tilt').click(function(event) {
		$(this).css('transition', 'transform 0.8s')
		$(this).css('transform-style', 'preserve-3d')
		$(this).css('transform', 'rotateY(180deg)')

		// $(this).removeClass("js-tilt")
		// $(this).children("lottie-player").replaceWith('<img src="/static/images/empty.svg" style="width: 240px; max-height: 240px;">') 
		$(this).replaceWith('<div class="padding-y"><img src="/static/images/empty.svg" style="width: 250px; max-height: 250px;"></div>') 


		modal.style.display = "block";
		numOfCardOpened++;

		player = (numOfCardOpened % 2 != 0) ? sessionStorage.getItem("firstPlayer") : sessionStorage.getItem("secondPlayer");
		$('#playerTurn').text(player);

		$.ajax({
			method: 'GET',
			url: 'openCard?' + 'pack=' + sessionStorage.getItem("pack"),
			success: function(response) {
				console.log(response)
				if (response.success === false) {
					updateSession("gameStateOnGoing", "No")
					window.location = '/';

				} else {
					var cardJSONData = JSON.parse((response))

					if (numOfCardOpened == 1) {
						noRepeatArray = Array.from(Array(cardJSONData.length-1).keys());
						shuffle(noRepeatArray);
					}
					var cardImage = cardJSONData[noRepeatArray[numOfCardOpened-1]].fields['image'];
					$('#shownCard').attr('src', cardImage);
				}
			}
				
		})


		// if (numOfCardOpened == numOfCard && modal.style.display != "block") {
		//   alert("udah selese");
		// }
	})

  $('#numOfPlayer').on('change', function (event) {
	event.preventDefault();

    $('#pack').val('');
    var valueSelected = this.value;

    if (valueSelected == 'Two Players') {
			$('.playerName').toggleClass('show')

			$('#DigDeeperOption').removeAttr('disabled');
			$('#DigDeeperOption').css('color', '#495057');

			$('#LoveBirdsOption').removeAttr('disabled');
			$('#LoveBirdsOption').css('color', '#495057');

			$('#MixAndMatchOption').removeAttr('disabled');
			$('#MixAndMatchOption').css('color', '#495057');

		} else {
			$('.playerName').removeClass('show')

			$('#DigDeeperOption').attr('disabled', 'disabled');
			$('#DigDeeperOption').css('color', '#d3d3d3');

			$('#LoveBirdsOption').attr('disabled', 'disabled');
			$('#LoveBirdsOption').css('color', '#d3d3d3');

			$('#MixAndMatchOption').attr('disabled', 'disabled');
			$('#MixAndMatchOption').css('color', '#d3d3d3');
		}
  	});

  	$('#pack').on('change', function(event) {
		event.preventDefault();

		var valueSelected = this.value;

		if (valueSelected == 'Dig Deeper') {
			$('.level').toggleClass('show')
			level =  $('#levelSelection').val();
		} else {
			$('.level').removeClass('show')
		}

	});

 
	$('#formGamePlayButton').click(function(event) {
		event.preventDefault();

		sessionStorage.setItem("gameStateOnGoing", "Yes")

		var pack = $('#pack').val();
		
		// sessionStorage.setItem("pack", NAMA MODEL DI DJANGOMODEL)
		if (pack == "Dig Deeper") {
			sessionStorage.setItem("pack", "DigDeeper")
		} else if (pack == "Break the Ice: Let the Fun Begin!") {
			sessionStorage.setItem("pack", "IceBreak")
		} else if (pack == "Mix & Match") {

		} else if (pack == "Lovebirds Edition") {

		} else if (pack == "Hello, Nice to Meet You, Stranger") {

		}

		if ($('#numOfPlayer').val() == 'Two Players') {
			$('.playerName').toggleClass('.show')
			
			var firstPlayer = $('#firstPlayer').val() != "" ? sessionStorage.setItem("firstPlayer", $('#firstPlayer').val()) : sessionStorage.setItem("firstPlayer", "Player 1")
			var secondPlayer = $('#secondPlayer').val() != "" ? sessionStorage.setItem("secondPlayer", $('#secondPlayer').val()) : sessionStorage.setItem("secondPlayer", "Player 2")

			finalUrl = 'form?' + 'pack=' + pack + '&firstPlayer=' + firstPlayer + '&secondPlayer=' + secondPlayer;   

		} else {
			finalUrl = 'form?' + 'pack=' + pack;
		}

		$.ajax({
			method: 'POST',
			url: finalUrl,
			data: {
				pack: pack, 
				gameStateOnGoing: "Yes",
				'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
			},
			success: function(response) {
				window.location = '/play'
			}
		}) 
  	})
	  

	$('#finishButton').click(function (event) {
		event.preventDefault()
		updateSession("gameStateOnGoing", "No")
		sessionStorage.clear()
		window.location = '/'
	})

	$('#terminateLink').click(function (event) {
		event.preventDefault()
		sessionStorage.clear()
		window.location = '/'
	})

	$('.nav-link').click(function (event) {
		if (sessionStorage.getItem("gameStateOnGoing") != undefined) {

			if (sessionStorage.getItem("gameStateOnGoing") === "Yes" && window.location.pathname === '/play/') {
				var alertPopUp = confirm("Oops! You have a game going on. Do you wish to terminate the game?");
	
				if (alertPopUp == true) {
					event.preventDefault();
					updateSession("gameStateOnGoing", "No")
					sessionStorage.clear()
					
					if ($(this).attr('id') == "playNavBar") {
						window.location = '/';
					} else {
						window.location = $(this).attr('href');
					}
				}

			} else {
				window.location = $(this).attr('href');
			}

		} else {
			window.location = $(this).attr('href');
		}

	})

	// $(window).on("beforeunload", function(e) { 
	// 	updateSession("gameStateOnGoing", "No")

	// 	// if (window.location.pathname === '/play/') {
	// 	// 	return confirm("Do you really want to close?"); 
	// 	// 	// console.log(conf)
	// 	// 	// if (conf == true) {
	// 	// 	// 	updateSession("gameStateOnGoing", "No")
	// 	// 	// } else {

	// 	// 	// }
	// 	// }
        
    // });

})
