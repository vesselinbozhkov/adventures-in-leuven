$('#game-field').css("display", "none");
$('.player').on('click', function() {
	$.ionSound.play("button_click_on");
	$('.player').removeClass('active-player');
	$(this).addClass('active-player');
});

function begin() {
	location.reload();
}

function startGame() {
	$('#start-screen').css('display', 'none');
	$('#game-field').css('display', 'block');
	gameEngine();
	startTimer();
}

function endGame() {
	$('#game-field').css('display', 'none');
	gameEngine('stop');
	clearInterval(setTimerStopper);
	$('#end-screen').css('display', 'block');
}

var timer = $('#timer');

function startTimer() {
	setTimerStopper = setInterval(changeTime, 1000);
}

function changeTime() {
	var curr = parseInt(timer.text());
	curr--;
	timer.text(curr);
	if (curr==0) {
		endGame();
	};
}
