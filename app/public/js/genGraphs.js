      google.setOnLoadCallback(drawChart);

      function drawChart() {
          var flu_data = [];
          flu_data.week = [35, 36, 37, 38, 39, 49, 49, 49, 49, 44, 45, 46, 47, 48, 49, 50, 51, 52, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];

          flu_data.hospital = [
              [0, 0, 0],
              [0, 0, 2],
              [0, 0, 0],
              [0, 0, 2],
              [0, 0, 1],
              [0, 2, 5],
              [0, 1, 4],
              [0, 0, 2],
              [1, 2, 10],
              [2, 7, 21],
              [5, 11, 16],
              [5, 10, 19],
              [13, 24, 39],
              [7, 15, 28],
              [33, 83, 141],
              [37, 74, 141],
              [26, 56, 95],
              [58, 134, 311],
              [42, 119, 283],
              [133, 336, 832],
              [83, 237, 601],
              [61, 171, 449],
              [51, 101, 226],
              [58, 115, 238],
              [18, 55, 117],
              [55, 119, 220],
              [29, 61, 111],
              [26, 52, 110],
              [27, 49, 82],
              [31, 63, 104],
              [26, 46, 82],
              [51, 84, 132],
              [16, 48, 88],
              [36, 69, 120],
              [45, 71, 120],
              [27, 42, 69],
              [11, 22, 35],
              [12, 16, 35],
              [3, 3, 4],
              [27, 61, 111],
              [0, 0, 1],
              [15, 22, 41],
              [0, 0, 0],
              [2, 5, 9],
              [0, 0, 0],
              [1, 3, 4],
              [0, 0, 0],
              [7, 15, 20],
              [0, 0, 0],
              [1, 1, 1],
              [0, 0, 0],
              [0, 0, 2]
          ];

          flu_data.death = [
              [0, 0, 0],
              [0, 0, 1],
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 1],
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0],
              [0, 1, 1],
              [0, 0, 1],
              [0, 0, 3],
              [0, 0, 2],
              [1, 3, 11],
              [0, 1, 3],
              [0, 2, 4],
              [1, 4, 29],
              [1, 3, 19],
              [0, 12, 56],
              [1, 10, 41],
              [0, 4, 35],
              [1, 3, 18],
              [0, 2, 13],
              [0, 1, 12],
              [0, 2, 13],
              [1, 3, 11],
              [0, 3, 15],
              [0, 0, 2],
              [0, 3, 5],
              [0, 1, 4],
              [0, 1, 3],
              [0, 0, 1],
              [0, 1, 5],
              [0, 2, 9],
              [0, 0, 2],
              [0, 0, 1],
              [2, 2, 4],
              [0, 0, 0],
              [0, 1, 8],
              [0, 0, 0],
              [0, 1, 2],
              [0, 0, 0],
              [0, 0, 2],
              [0, 0, 0],
              [0, 1, 1],
              [0, 0, 0],
              [1, 2, 3],
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0]
          ];

          thisWeek = getCurrentWeek();

          var splitData = [];
          var splitData_deaths = [];
          var splitData_hospital = [];

          var i = 0,
              soFar = 0,
              left = 0;
          while (flu_data.week[i] != thisWeek) {
              soFar += flu_data.death[i][2];
              splitData_deaths.push([i, flu_data.death[i][0], flu_data.death[i][1], flu_data.death[i][2], NaN, NaN, NaN]);
              splitData_hospital.push([i, flu_data.hospital[i][0], flu_data.hospital[i][1], flu_data.hospital[i][2], NaN, NaN, NaN]);
              i++;
          }
          splitData_deaths.push([i - 1, 0, 0, 0, flu_data.death[i - 1][0], flu_data.death[i - 1][1], flu_data.death[i - 1][2]]);
          splitData_hospital.push([i - 1, 0, 0, 0, flu_data.hospital[i - 1][0], flu_data.hospital[i - 1][1], flu_data.hospital[i - 1][2]]);

          //Keep incrementing "i" with second graph for futur deaths
          for (; i < 52; i++) {
              left += flu_data.death[i][2];
              splitData_deaths.push([i, NaN, NaN, NaN, flu_data.death[i][0], flu_data.death[i][1], flu_data.death[i][2]]);
              splitData_hospital.push([i, NaN, NaN, NaN, flu_data.hospital[i][0], flu_data.hospital[i][1], flu_data.hospital[i][2]]);
          }

          $('.death .hindcast .number-stat').html(soFar);
          $('.death .forecast .number-stat').html(left);

          //Create dataTable for Deaths
          var data = new google.visualization.DataTable();
          data.addColumn('number', 'Week');
          data.addColumn('number', 'Under 20');
          data.addColumn('number', 'Under 65');
          data.addColumn('number', 'Total');
          data.addColumn('number', 'Under 20');
          data.addColumn('number', 'Under 65');
          data.addColumn('number', 'Total');

          data.addRows(splitData_deaths);

          //Create dataTable for Hospital
          var data2 = new google.visualization.DataTable();
          data2.addColumn('number', 'Week');
          data2.addColumn('number', 'Under 20');
          data2.addColumn('number', 'Under 65');
          data2.addColumn('number', 'Total');
          data2.addColumn('number', 'Under 20');
          data2.addColumn('number', 'Under 65');
          data2.addColumn('number', 'Total');

          data2.addRows(splitData_hospital);

          var options = {
              height: 400,
              backgroundColor: 'transparent',
              title: 'Deaths in Canada from influenza in 2012-2013 by today',
              titleTextStyle: {
                  fontSize: 16,
                  bold: true
              },
              hAxis: {
                  ticks: [{
                      v: 3,
                      f: 'September'
                  }, {
                      v: 12,
                      f: 'November'
                  }, {
                      v: 20,
                      f: 'January'
                  }, {
                      v: 29,
                      f: 'March'
                  }, {
                      v: 38,
                      f: 'May'
                  }, {
                      v: 46,
                      f: 'July'
                  }]
              },
              vAxis: {
                  minValue: 0
              },
              legend: {
                  position: 'none'
              },
              colors: ['yellow', 'orange', 'red', 'blue', 'purple', 'green']
          };

          //Draw charts
          var chart = new google.visualization.AreaChart(document.getElementById('chart_div-deaths'));

          chart.draw(data, options);
          var chart2 = new google.visualization.AreaChart(document.getElementById('chart_div-hospital'));
          chart2.draw(data2, options);
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