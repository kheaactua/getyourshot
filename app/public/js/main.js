$( document ).ready(function() {

	// Countdown clock
	var clock = $('#countdown div.clock').FlipClock(3600 * 24 * 3, {
		clockFace: 'DailyCounter',
		countdown: true,
		showSeconds: false,
	});

});
