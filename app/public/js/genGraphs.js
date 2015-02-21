google.setOnLoadCallback(drawChart);

function drawChart() {
  var flu_data = [];
  flu_data.week = [35, 36, 37, 38, 39, 49, 49, 49, 49, 44, 45, 46, 47, 48, 49, 50, 51, 52, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];

  flu_data.hospital = [0, 0, 0, 0, 3, 2, 2, 1, 2, 5.5, 6.5, 6.5, 12.5, 31, 44, 66.5, 113, 163.5, 181, 129, 118.5, 109, 108.5, 102.5, 102.5, 121.5, 121.5, 149, 152, 121.5, 94.5, 60.5, 73.5, 42.5, 36, 32.5, 22.5, 18, 8, 3.5, 4, 1, 1, 0, 0, 1.5, 1.5, 0, 0, 0, 0, 1];

  flu_data.death = [0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0.5, 0, 0.5, 1, 0.5, 2.5, 5.5, 8, 13, 11.5, 9.5, 14.5, 9, 7, 5.5, 4.5, 8.5, 8.5, 7.5, 8.5, 9, 4, 3, 2.5, 2.5, 2, 1, 1, 1.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0];

  thisWeek = getCurrentWeek();

  var splitData = [];

  var i = 0,
	  soFar = 0,
	  left = 0;
  while (flu_data.week[i] != thisWeek) {
	  soFar += flu_data.death[i];
	  splitData.push([i, flu_data.death[i], 0]);
	  i++;
  }
  splitData.push([i - 1, 0, flu_data.death[i - 1]]);

  //Keep incrementing "i" with second graph for futur deaths
  for (; i < 52; i++) {
	  left += flu_data.death[i];
	  splitData.push([i, 0, flu_data.death[i]]);
  }

  var data = new google.visualization.DataTable();
  //google.visualization.arrayToDataTable(splitData);
  data.addColumn('number', 'Week');
  data.addColumn('number', 'Deaths so far');
  data.addColumn('number', 'Deaths to come');

  data.addRows(splitData);

  var options = {
	  width: 400,
	  height: 240,
	  title: 'Reported deaths in Canada from influenza in 2010-2011 by this week',
	  hAxis: {
		  ticks: [{v: 3, f: 'September'},{v: 12, f: 'November'},{v: 20, f: 'January'},{v: 29, f: 'March'},{v: 38, f: 'May'},{v: 46, f: 'July'}]
	  },
	  vAxis: {
		  minValue: 0
	  },
	  legend: {
		  position: 'none'
	  },
	  colors: ['orange', 'red']
  };
	/*
  var dataView = new google.visualization.DataView(data);
  dataView.setColumns([{calc: function(data, row) { return ''; }, type:'string'}, 2, 1,0]);
  */
  var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

function getCurrentDay() {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getCurrentWeek() {
  return Math.min(Math.floor(getCurrentDay() / 7) + 1, 52);
}