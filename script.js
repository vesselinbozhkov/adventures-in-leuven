$.ionSound({
    sounds: [                       // set needed sounds names
        "button_click_on",
        "bell_ring:0.3",            // :0.3 - individual volume
        "glass",
        "metal_plate",
        "pop_cork:0.8",             // :0.8 - individual volume
        "staple_gun",
        "water_droplet:0.4"         // :0.4 - individual volume
    ],
    path: "sounds/",                // set path to sounds
    multiPlay: true,               // playing only 1 sound at once
    volume: "0.3"                   // not so loud please
});

function gameEngine(stop) {

	if (stop == 'stop') {
		clearInterval(createObjectStopper);
		clearInterval(createObjectStopper);
		
		return
	};

	var leftPosition = 0;
	var topPosition = 0;
	var pixelPlayerMove = 40;
	var pixelObjectMove = 3;

	var playerWidth = $('#player').width();
	var playerHeight = $('#player').height();
	var fieldWidth = $('#game-field').width();
	var fieldHeight = $('#game-field').height();
	var objectHeight = 48;

	var beerScore = $('#beer-score');
	var bookScore = $('#book-score');

	var gameField = $('#game-field');

	var player = $('#player');


	var appearSpeed = 500;
	var movementSpeed = 1;
	var speedIncreaseInterval = 1000;

	var chosenPlayerPic = $('.active-player').children('img').attr('src');
	player.css('background', 'url(' + chosenPlayerPic + ')');


	createObjectStopper = setInterval(createObject, appearSpeed);
	ojectMovementStopper = setInterval(objectMovement, movementSpeed);


	var $newObject = $('<div />').addClass('incoming-object')
									.css('left', fieldWidth);
	function createObject() {
		var goodOrEvil = getRandom(0, 10) > 6 ? 'good' : 'evil';
		var $current = $newObject.clone(true); 
		$current.css('top', getRandom(0, fieldHeight - objectHeight))
				.addClass(goodOrEvil);
		gameField.append($current);
	}

	function objectMovement() {
		$('.incoming-object').each(function() {
			var newPosition = $(this).css('left').replace(/[^-\d\.]/g, '');
			newPosition -= pixelObjectMove;
			if (newPosition > -1 * objectHeight) {
				$(this).css('left', newPosition);		
			}
			else {
				$(this).remove();
			}

			if (newPosition <= playerWidth) {
				var playerCurrTopStart = $('#player').css('top').replace(/[^-\d\.]/g, '');
				var	playerCurrTopEnd = parseInt(playerCurrTopStart) + parseInt(playerHeight); 

				var objectCurrTopStart = $(this).css('top').replace(/[^-\d\.]/g, '');
				var objectCurrTopEnd = parseInt(objectCurrTopStart) + objectHeight;

				if ((playerCurrTopStart <=  objectCurrTopStart && playerCurrTopEnd >= objectCurrTopStart)
					||
					(playerCurrTopStart >= objectCurrTopStart && playerCurrTopStart <= objectCurrTopEnd)) {
					if ($(this).hasClass('good')) {
						$.ionSound.play("bell_ring");
						var old = bookScore.html();
						var newScore = parseInt(old) + 1;
						bookScore.html(newScore);
						$(this).remove();
					}
					else if ($(this).hasClass('evil')) {
						$.ionSound.play("glass");
						var old = beerScore.html();
						var newScore = parseInt(old) + 1;
						beerScore.html(newScore);
						$(this).remove();
					};
				};
			};

		});
	}

	function getRandom(max, min) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	$(document).keypress(function(key) {
		//right
		// if (key.keyCode == 68 || key.keyCode == 100) {
		// 	if (leftPosition < (fieldWidth - playerWidth)) {
		// 		leftPosition += pixelPlayerMove;
		// 	};
		// }
		//down
		if (key.keyCode == 83 || key.keyCode == 115 || key.keyCode == 1057 || key.keyCode == 1089) {
			if (topPosition < (fieldHeight - playerHeight)) {
				topPosition += pixelPlayerMove;
			};
		}
		// //left
		// else if (key.keyCode == 97 || key.keyCode == 65) {
		// 	if (leftPosition > 0) {
		// 		leftPosition -= pixelPlayerMove;
		// 	};
		// }
		//top
		else if (key.keyCode == 87 || key.keyCode == 119 || key.keyCode == 1042 || key.keyCode == 1074) {
			if (topPosition > 0) {
				topPosition -= pixelPlayerMove;
			};
		}

		player.css('left', leftPosition)
					.css('top', topPosition);

		});
}

