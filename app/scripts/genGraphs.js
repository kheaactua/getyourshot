google.setOnLoadCallback(drawChart);

function drawChart() {
	var flu_data = [];
	flu_data.month = ['August', 'September', 'September', 'September', 'September', 'October', 'October', 'October', 'October', 'October', 'November', 'November', 'November', 'November', 'December', 'December', 'December', 'December', 'February', 'February', 'February', 'February', 'February', 'March', 'March', 'March', 'March', 'April', 'April', 'April', 'April', 'May', 'May', 'May', 'May', 'May', 'March', 'March', 'March', 'March', 'June', 'June', 'June', 'June', 'July', 'July', 'July', 'July', 'July', 'August', 'August', 'August']; 
	flu_data.week = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];

	// Will probably move this to a data.js or something
	/* Flu data taken from http://open.canada.ca/data/en/dataset/178f04f7-5a3a-40ad-991f-25be84b4868c */
	flu_data.hospital = [0, 0, 0, 0, 3, 2, 2, 1, 2, 5.5, 6.5, 6.5, 12.5, 31, 44, 66.5, 113, 163.5, 181, 129, 118.5, 109, 108.5, 102.5, 102.5, 121.5, 121.5, 149, 152, 121.5, 94.5, 60.5, 73.5, 42.5, 36, 32.5, 22.5, 18, 8, 3.5, 4, 1, 1, 0, 0, 1.5, 1.5, 0, 0, 0, 0, 1];
	flu_data.death = [0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0.5, 0, 0.5, 1, 0.5, 2.5, 5.5, 8, 13, 11.5, 9.5, 14.5, 9, 7, 5.5, 4.5, 8.5, 8.5, 7.5, 8.5, 9, 4, 3, 2.5, 2.5, 2, 1, 1, 1.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0];



	thisWeek = getCurrentWeek();
          
	var splitData = [];
	splitData.push(['Week', 'Deaths so far', 'Deaths to come']);
          
	var i = 0, soFar = 0, left = 0;
	while (flu_data.week[i] != thisWeek) {
		soFar += flu_data.death[i];
		splitData.push([flu_data.month[i],flu_data.death[i],0]);
		i++;
	}
	//Keep incrementing "i" with the next graph
	for (;i<52;i++) {
		left += flu_data.death[i];
		splitData.push([flu_data.month[i],0,flu_data.death[i]]);
	}
        
	var data = google.visualization.arrayToDataTable(splitData);

	var options = {
		title: 'Deaths from influenza in 2010-2011 by today',
		hAxis: {title: 'Week',  titleTextStyle: {color: '#333'}},
		vAxis: {minValue: 0}
	};

	var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}

function getCurrentDay(){
	var now = new Date();
	var start = new Date(now.getFullYear(), 0, 0);
	var diff = now - start;
	var oneDay = 1000 * 60 * 60 * 24;
	return Math.floor(diff / oneDay);
}

function getCurrentWeek(){
	return Math.min(Math.floor(getCurrentDay()/7)+1,52);
}
