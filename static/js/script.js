$(document).ready(() => {
  var pack = "";
  var numOfCard = 10;
  var numOfCardOpened = 0;
  var noRepeatArray = [];
  var firstPlayer = "";
  var secondPlayer = "";
  var finalUrl = "";

  // GAME PLAY
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
      modal.style.display = "none";
  })

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
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
  
  $('.js-tilt').click(function(event) {
    
    $(this).css('transition', 'transform 0.8s')
    $(this).css('transform-style', 'preserve-3d')
    $(this).css('transform', 'rotateY(180deg)')   

    $(this).replaceWith('<img src="/static/images/empty.svg" style="width: 250px; max-height: 250px;">') 

    modal.style.display = "block";
    numOfCardOpened++;
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: 'openCard?' + 'pack=' + pack,
      success: function(response) {
        var cardJSONData = JSON.parse(JSON.stringify(response));
        console.log(cardJSONData)
        if (numOfCardOpened == 1) {
          noRepeatArray = Array.from(Array(cardJSONData.length-1).keys());
          shuffle(noRepeatArray);
          console.log(noRepeatArray);
        }
        var cardImage = cardJSONData[numOfCardOpened-1].fields['image'];
        $('#shownCard').attr('src', cardImage);
      }
    })

      // if (numOfCardOpened == numOfCard && modal.style.display != "block") {
      //   alert("udah selese");
      // }
  })

  $('#formGameplayButton').click(function(event) {

    event.preventDefault();
    pack = $('#pack').val();
    var numOfPlayer = $('#numOfPlayer').val();
    
    if (numOfPlayer == 2) {
      firstPlayer =  $('#firstPlayer').val();
      secondPlayer =  $('#secondPlayer').val();
      finalUrl = 'showCard?' + 'pack=' + pack + '&player_one=' + firstPlayer + '&player_two=' + secondPlayer;   
      console.log(firstPlayer)
      console.log(secondPlayer)
    } else {
      finalUrl = '/showCard?' + 'pack=' + pack;
    }
    var appended = '<div class="js-tilt"><lottie-player src="https://assets4.lottiefiles.com/packages/lf20_apuwyk3o.json"  background="transparent"  speed="2"  style="width: 250px; height: 250px;" hover loop  ></lottie-player></div>'
    var plus = numOfCard/5;
    for (var i = 0; i < 20; i+=plus) {
      $('#gamePlace').append('appended')
      $('#gamePlace').append('appended')
      $('#gamePlace').append('appended')
      $('#gamePlace').append('appended')
      $('#gamePlace').append('appended')
    }

    $.ajax({
      method: 'GET',
      url: finalUrl,
      success: function(response) {
        if (data['success']) {
          alert('bisa');
        }
      }
    }) 

  })

  $('#playButton').click(function(event) {
    player = (numOfCardOpened % 2 != 0) ? firstPlayer : secondPlayer;
    $('#playerTurnName').text(player);
  })

})
