var numOfCard;
var numOfCardOpened = 0;
var noRepeatArray = [];
var finalUrl;

function finishRedirect() {	
	updateSession("gameStateOnGoing", "No");
	sessionStorage.clear();
	window.location = 'feedback';
}
function alertPopUp() {	
	alert("You've finished the game! You will be directed to the feedback page in 3 seconds");
}

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
	
	$('.readMore').click(function(e) {
		if ($('.dots').css('display') === "none") {
			$('.dots').css('display', 'inline');
			$('.readMore').text('Read more');
			$('.more').css('display', 'none');
		} else {
			$('.dots').css('display', 'none');
			$('.readMore').text('Read less');
			$('.more').css('display', 'inline');
		}
	})

	$('.expand').click(function(e) {
		var mamake = $(this).parents("div.item-details.text-center");
		var dots = $(this).parents("div.item-details.text-center").children("span.dots2");
		var more = $(this).parents("div.item-details.text-center").children("span.more2")

		if (dots.css('display') === "none") {
			dots.css('display', 'inline');
			$(this).text('▼');
			more.css('display', 'none');
		} else {
			dots.css('display', 'none');
			$(this).text('▲');
			more.css('display', 'inline');
		}

	})
	

	$('.playNowButton').click(function(e) {
		window.location.pathname = '/play/'
	})
	
	$('#logoHome').click(function(e) {
		window.location.pathname = '/'
	})

	$('#customers-testimonials').owlCarousel( {
		loop: false,
		
		center: false,
		items: 3,
		margin: 30,
		autoplay: true,
		dots:true,
    	nav:true,
		autoplayTimeout: 8500,
		smartSpeed: 450,
  		navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			1170: {
				items: 3
			}
		}
	});

	$('#customers-testimonials2').owlCarousel( {
		loop: true,
		center: true,
		items: 3,
		margin: 10,
		autoplay: true,
		dots:true,
    	nav:true,
		autoplayTimeout: 8500,
		smartSpeed: 450,
  		navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			1170: {
				items: 3
			}
		}
	});

	$('#shownCard').tilt({
		scale: 1.02,	
	})

	$('.js-tilt').tilt({
		scale: 1.2,
		glare: true,
		maxGlare: .11
	})

	$('.img-responsive').tilt({
		scale: 1.2,
		glare: true,
		maxGlare: .11
	})

	$('.img-responsive').hover(function() {
		$(this).css('border-radius', '10px');
		}, function() { 
			$(this).css('border-radius', '0')
		});

	
  
	var modal = document.getElementById("myModal");
	$('.close').click(function(event) {
		event.preventDefault();
		modal.style.display = "none";
		if (numOfCardOpened == numOfCard && modal.style.display != "block") {
			setTimeout(alertPopUp, 2000);
			setTimeout(finishRedirect, 3000);
		}
	})

	window.onclick = function(event) {
		event.preventDefault();
		if (event.target == modal) {
			modal.style.display = "none";
			if (numOfCardOpened == numOfCard && modal.style.display != "block") {
				setTimeout(alertPopUp, 2000);
				setTimeout(finishRedirect, 3000);
			}
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
		if (sessionStorage.getItem('Players') == 'Two') {
			player = (numOfCardOpened % 2 != 0) ? sessionStorage.getItem("firstPlayer") : sessionStorage.getItem("secondPlayer");
			$('#playerTurn').text(player);
		} else if (sessionStorage.getItem('Players') == 'Multi'){
			$('#multiHide').css('display', 'none');
		}


		$.ajax({
			method: 'GET',
			url: 'openCard?' + 'pack=' + sessionStorage.getItem("pack"),
			success: function(response) {
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

		if (numOfCardOpened == numOfCard && modal.style.display != "block") {
			alert("udah selese")
		}
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

		} else {
			$('.playerName').removeClass('show')

			$('#DigDeeperOption').attr('disabled', 'disabled');
			$('#DigDeeperOption').css('color', '#d3d3d3');

			$('#LoveBirdsOption').attr('disabled', 'disabled');
			$('#LoveBirdsOption').css('color', '#d3d3d3');
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
		var level = $('#levelSelection').val();
		numOfCard = $('#numOfCardSelection').val();
		sessionStorage.setItem("numOfCard", numOfCard)

		// sessionStorage.setItem("pack", NAMA MODEL DI DJANGOMODEL)
		if (pack == "Dig Deeper") {
			
			if (level == 3) {
				sessionStorage.setItem("pack", "DigDeeper3")
			} else if (level == 2) {
				sessionStorage.setItem("pack", "DigDeeper2")
			} else if (level == 1) {
				sessionStorage.setItem("pack", "DigDeeper1")
			}
			
		} else if (pack == "Break the Ice: Let the Fun Begin!") {
			sessionStorage.setItem("pack", "IceBreak")
		} else if (pack == "Mix & Match") {

		} else if (pack == "Lovebirds Edition") {

		} else if (pack == "Hello Nice to Meet You, Stranger") {

		} else if (pack == "Perspective") {
			sessionStorage.setItem("pack", "Perspective")
		}
		

		if ($('#numOfPlayer').val() == 'Two Players') {
			sessionStorage.setItem('Players', 'Two')
			$('.playerName').toggleClass('.show')
			
			var firstPlayer = $('#firstPlayer').val() != "" ? sessionStorage.setItem("firstPlayer", $('#firstPlayer').val()) : sessionStorage.setItem("firstPlayer", "Player 1")
			var secondPlayer = $('#secondPlayer').val() != "" ? sessionStorage.setItem("secondPlayer", $('#secondPlayer').val()) : sessionStorage.setItem("secondPlayer", "Player 2")

			finalUrl = 'form?' + 'pack=' + pack + '&firstPlayer=' + firstPlayer + '&secondPlayer=' + secondPlayer;   

		} else {
			sessionStorage.setItem('Players', 'Multi')
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

	$('#showCard').click(function (event) {
		var numOfCard = sessionStorage.getItem("numOfCard")
		if (numOfCard == 12) {
			$("#gamePlace12").toggleClass("hidden");
		} else if (numOfCard == 16) {
			$("#gamePlace16").toggleClass("hidden");
		} else if (numOfCard == 20) {
			$("#gamePlace20").toggleClass("hidden");
		}
	})

	

	$('#finishButton').click(function (event) {
		event.preventDefault();
		var alertPopUp = confirm("Oops! You haven't picked all the cards yet. Are you sure you want to finish the game?");
	
			if (alertPopUp == true) {
				updateSession("gameStateOnGoing", "No")
				sessionStorage.clear()
				window.location = '/'
			}
	})

	$('#terminateLink').click(function (event) {
		event.preventDefault()
		sessionStorage.clear()
		window.location = '/'
	})

	$('.nav-link').click(function (event) {
		if (sessionStorage.getItem("gameStateOnGoing") != undefined) {

			if (sessionStorage.getItem("gameStateOnGoing") === "Yes" && window.location.pathname === '/play/') {
				var alertPopUp = confirm("Oops! You still have a game going on. Do you wish to terminate the game?");
	
				if (alertPopUp == true) {
					event.preventDefault();
					updateSession("gameStateOnGoing", "No")
					sessionStorage.clear()
					
					if ($(this).attr('id') == "playNavBar") {
						window.location = 'form';
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

	$('.link').click(function (e){
		e.preventDefault();
		window.open($(this).attr('href'), '_blank')
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
