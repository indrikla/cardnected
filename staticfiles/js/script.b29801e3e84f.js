$(document).ready(() => {

    $('.nav-link').hover(function (event) { 
        $(this).css("color", "#ec4646")
    })

    var firstPlayer = "";
    var secondPlayer = "";
    var numberOfTurn = 1;

    $('#formGameplayButton').click( function(event) {
        event.preventDefault();
        var numOfCard = $('#numOfCard').val();
        var cardPack = $('#cardPack').val();
        var numOfPlayer = $('#numOfPlayer').val();
        if (numOfPlayer == 2) {
            firstPlayer =  $('#firstPlayer').val();
            secondPlayer =  $('#secondPlayer').val();
            var finalUrl = '/showCard?' + 'card_pack=' + cardPack + '&card_num=' + numOfCard + '&player_num=' + numOfPlayer + '&player_one=' + firstPlayer + '&player_two=' + secondPlayer;        
        } else {
            finalUrl = '/showCard?' + 'card_pack=' + cardPack + '&card_num=' + numOfCard + '&player_num=' + numOfPlayer;
        }
        $.ajax({
            method: 'GET',
            url: finalUrl,
            success: function(response) {

            }
        }) 
    })

    $('#playButton').click( function(event) {
        player = (numberOfTurn % 2 != 0) ? firstPlayer : secondPlayer;
        $('#playerTurnName').text(player);
        console.log(numberOfTurn);
        numberOfTurn++;
    })

    $('.js-tilt').click( function(event) {
        event.preventDefault();
        var number = Math.floor(Math.random() * JSON.parse(response).length) + 1;
        $.ajax({
            method: 'POST',
            url: '/gameplay/showCard?',
            data: {
                quoteRec: quoteRec, 
               'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val()
            },
            datatype:'json',
            success: function(data) {
            if (data['success']) {
                alert("Successfully added your recommendation! Have a nice day!! :=D")
                
            } else {
                alert("gatau salah dmn :=C")
                $('#quoteInput').empty();
            }
                
            }
        })
        console.log(quoteRec)
    })

    $('#generate').click( function(event){
        $(this).css("background-color", "#ffdf80");
        $(this).css("color", "#253031");
        event.preventDefault();
        console.log(data);
        $.ajax({
            method: 'GET',
            url: '/quotes/getQuotes',
            success: function(response) {
                $('#data').empty();
                var quotesJSONData = JSON.parse(response);
                var number = Math.floor(Math.random() * quotesJSONData.length) + 1;
                var result = quotesJSONData[number].fields.quote;
                $('#data').append(result);
                $('#data').append('</p>');
            }
        })
    })
})
