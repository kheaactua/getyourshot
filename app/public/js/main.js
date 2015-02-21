$( document ).ready(function() {

	// Countdown clock
	var now = new Date;
	//var flu_start = Date.now((now.getYear() -1) + "-11-01T00:00:00");
	var flu_end = new Date((now.getYear()+1900) + "-05-01T00:00:00");
	var seconds_diff = (flu_end - now)/1000;
	var clock = $('#countdown div.clock').FlipClock(seconds_diff, {
		clockFace: 'DailyCounter',
		countdown: true,
		showSeconds: false,
	});

});
