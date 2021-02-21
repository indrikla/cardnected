var numOfCard;
var numOfCardOpened = 0;
var noRepeatArray = [];
var finalUrl;
var cardImage; var cardQuestion; var cardIndex; var cardID;

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

	$('#reportCard').click(function(e) {
		e.preventDefault()

		$.ajax({
			method: 'GET',
			url: 'report?' + 'id=' + cardID + '&question=' + cardQuestion,
			success: function(data) {
			}
		})
	})

	$('#formReport').click(function(e) {
		var issue = $('#issueForm').val();
		var desc = $('#descForm').val();
		console.log("masuk")
		e.preventDefault()
		$.ajax({
			method: 'POST',
			data: {
                pack: sessionStorage.getItem("pack"),
				issue: issue,
				desc: desc,
               'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
            },
			url: '',
			success: function(data) {
				if (data['success']) {
					$('#descForm').empty();
					$('#issueForm').empty();
					alert("[SUCCESS] Thank you for letting us know! Enjoy your game! (This tab will close automatically)")
					window.top.close();
				} else {
					$('#descForm').empty();
					$('#issueForm').empty();
					alert("Oops! I think there's a problem... Please try again. (This tab will close automatically)")
					window.top.close();
				}
			}
		})
	})

	$('#gameplayOWL').owlCarousel( {
		loop: false,
		center: false,
		items: 1,
		margin: 10,
		autoplay: false,
		dots:true,
		autoplayTimeout: 8500,
		smartSpeed: 450,
  		navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
	});

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
	
	$('#cardHero').owlCarousel( {
		loop: true,
		center: true,
		items: 1,
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

	$('#cardpack-carousel').owlCarousel( {
		items: 1,
		loop: true,
		center: true,
		margin: 10,
		callbacks: true,
		URLhashListener: true,
		autoplayHoverPause: true,
		startPosition: 'URLHash',
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

	if( $(window).width() > 992) {
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
		})
	}

	var modal = document.getElementById("myModal");
	$('.close').click(function(event) {
		event.preventDefault();
		modal.style.display = "none";
		// $('.shownCard').attr('src', '#')
		if (numOfCardOpened == sessionStorage.getItem("numOfCard") && modal.style.display != "block") {
			setTimeout(alertPopUp, 2000);
			setTimeout(finishRedirect, 3000);
		}
	})
	$('.modal-close').click(function(event) {
		// $('.shownCard').attr('src', '#')
		
		if (numOfCardOpened == sessionStorage.getItem("numOfCard")) {
			$('.js-tilt').replaceWith('<div class="padding-y"><img src="/static/images/empty.svg" style="width: 300px; max-height: 300px;margin-bottom:2vw;"></div>') 	

			setTimeout(alertPopUp, 2000);
			setTimeout(finishRedirect, 3000);
		}
	})

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
			if (numOfCardOpened == sessionStorage.getItem("numOfCard") && modal.style.display != "block") {
				setTimeout(alertPopUp, 2000);
				setTimeout(finishRedirect, 3000);
			}
		}
	}

	$('.cardpack').click(function(event) {
		$(this).css('transition', 'transform 0.8s')
		$(this).css('transform-style', 'preserve-3d')
		$(this).css('transform', 'rotateY(180deg)')
	})
  
	$('.js-tilt').click(function(event) {

		if ($(window).width() > 768) {
			event.preventDefault();
			window.onbeforeunload = null;
			$(window).bind("beforeunload", function(){ return(false); });
			$(this).css('transition', 'transform 0.8s')
			$(this).css('transform-style', 'preserve-3d')
			$(this).css('transform', 'rotateY(180deg)')
	
			$(this).replaceWith('<div class="padding-y"><img src="/static/images/empty.svg" style="width: 250px; max-height: 250px;"></div>') 	
			modal.style.display = "block";

		} else {
			
			window.onbeforeunload = null;
			$(window).bind("beforeunload", function(){ return(false); });
			$(this).css('transition', 'transform 0.8s')
			$(this).css('transform-style', 'preserve-3d')
			$(this).css('transform', 'rotateY(360deg)')
		}

		
		numOfCardOpened++;

		if (sessionStorage.getItem('Players') == 'Two') {
			player = (numOfCardOpened % 2 != 0) ? sessionStorage.getItem("firstPlayer") : sessionStorage.getItem("secondPlayer");
			$('.playerTurn').text(player);
		}
		// else if (sessionStorage.getItem('Players') == 'Multi'){
		// 	$('.multiHide').css('display', 'none');
		// 	if ($(window).width() < 768) {
		// 		$('.shownCard').removeClass('center');
		// 	}
		// }

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
					$(this).css('transform', 'rotateY(-360deg)');
					cardIndex = noRepeatArray[numOfCardOpened-1];
					cardID = cardJSONData[cardIndex].pk
					cardQuestion = cardJSONData[cardIndex].fields['question'];
					cardImage = cardJSONData[cardIndex].fields['image'];
					
					$('.shownCard').attr('src', cardImage);
				}
			}
				
		})

	})

  $('#numOfPlayer').on('change', function (event) {
	event.preventDefault();

    $('#pack').val('');
    var valueSelected = this.value;
	if ($(window).width() < 768) {
		if (valueSelected == 'Two Players') {

			$('#DigDeeperOption').removeAttr('disabled');
			$('#DigDeeperOption').css('color', '#495057');

			$('#LoveBirdsOption').removeAttr('disabled');
			$('#LoveBirdsOption').css('color', '#495057');

		} else {

			$('#DigDeeperOption').attr('disabled', 'disabled');
			$('#DigDeeperOption').css('color', '#d3d3d3');

			$('#LoveBirdsOption').attr('disabled', 'disabled');
			$('#LoveBirdsOption').css('color', '#d3d3d3');
		}

	} else {
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


		if ($('#numOfPlayer').val() == 'Two Players') {
			sessionStorage.setItem('Players', 'Two')
			$('.playerName').toggleClass('.show')
			var first = $('#firstPlayer').val();
			var second = $('#secondPlayer').val();
			var firstPlayerClean = first.substring(0,36);
			var secondPlayerClean = second.substring(0,36);
			console.log(firstPlayerClean)

			var firstPlayer = $('#firstPlayer').val() != "" ? sessionStorage.setItem("firstPlayer", firstPlayerClean) : sessionStorage.setItem("firstPlayer", "Player 1")
			var secondPlayer = $('#secondPlayer').val() != "" ? sessionStorage.setItem("secondPlayer", secondPlayerClean) : sessionStorage.setItem("secondPlayer", "Player 2")

			finalUrl = 'form?' + 'pack=' + pack + '&firstPlayer=' + firstPlayer + '&secondPlayer=' + secondPlayer;   

		} else if ($('#numOfPlayer').val() == 'Multi Players') {
			sessionStorage.setItem('Players', 'Multi')
			finalUrl = 'form?' + 'pack=' + pack;

		} else {
			alert("Please select one 'Number of Players'")
			return ;
		}
		
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
			sessionStorage.setItem("pack", "MixNMatch")
		} else if (pack == "Lovebirds Edition") {
			sessionStorage.setItem("pack", "Lovebirds")
		} else if (pack == "Hello Nice to Meet You, Stranger") {
			sessionStorage.setItem("pack", "Stranger")
		} else if (pack == "Perspective") {
			sessionStorage.setItem("pack", "Perspective")
		} else {
			alert("Please select one 'Card Pack'")
			return ;
		}

		$.ajax({
			method: 'POST',
			url: finalUrl,
			data: {
				player: sessionStorage.getItem("Players"),
				pack: pack, 
				numOfCard: numOfCard,
				gameStateOnGoing: "Yes",
				'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
			},
			success: function(response) {
				window.location = '/play'
				
			}
		}) 
  	})

	$('#showCard').click(function (event) {
		event.preventDefault();
		if (sessionStorage.getItem("gameStateOnGoing") != undefined) {

			if (sessionStorage.getItem("gameStateOnGoing") === "Yes") {
				var numOfCard = sessionStorage.getItem("numOfCard")
				if (numOfCard == 12) {
					$("#gamePlace12").toggleClass("hidden");
				} else if (numOfCard == 16) {
					$("#gamePlace16").toggleClass("hidden");
				} else if (numOfCard == 20) {
					$("#gamePlace20").toggleClass("hidden");
				}
			} else {
				alert("Oops! There's something wrong here... You'll be directed to the form page")
				window.location = '/play'
			}
		} else {
			alert("Oops! There's something wrong here... You'll be directed to the form page")
			window.location = '/play'
		}
		

	})



	$('#finishButton').click(function (event) {
		event.preventDefault();
		window.onbeforeunload = null;
		var alertPopUp = confirm("Oops! You haven't picked all the cards yet. Are you sure you want to finish the game?");
	
			if (alertPopUp == true) {
				finishRedirect()
			}
	})

	$('#terminateLink').click(function (event) {
		event.preventDefault()
		window.onbeforeunload = null;
		sessionStorage.clear()
		window.location = '/'
	})

	$('.nav-link').click(function (event) {
		event.preventDefault();
		window.onbeforeunload = null;
		$(this).addClass("active");
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

	$('.linkin').click(function (e){
		window.location = ($(this).attr('href'))
	})

})
