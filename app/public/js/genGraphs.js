      google.setOnLoadCallback(drawChart);

      function drawChart() {
          var flu_data = [];
          flu_data.week = [35, 36, 37, 38, 39, 49, 49, 49, 49, 44, 45, 46, 47, 48, 49, 50, 51, 52, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];

          flu_data.hospital = [0, 0, 0, 0, 3, 2, 2, 1, 2, 5.5, 6.5, 6.5, 12.5, 31, 44, 66.5, 113, 163.5, 181, 129, 118.5, 109, 108.5, 102.5, 102.5, 121.5, 121.5, 149, 152, 121.5, 94.5, 60.5, 73.5, 42.5, 36, 32.5, 22.5, 18, 8, 3.5, 4, 1, 1, 0, 0, 1.5, 1.5, 0, 0, 0, 0, 1];

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

          var i = 0,
              soFar = 0,
              left = 0;
          while (flu_data.week[i] != thisWeek) {
              soFar += flu_data.death[i][2];
              splitData.push([i, flu_data.death[i][0], flu_data.death[i][1], flu_data.death[i][2], NaN, NaN, NaN]);
              i++;
          }
          splitData.push([i - 1, 0, 0, 0, flu_data.death[i - 1][0], flu_data.death[i - 1][1], flu_data.death[i - 1][2]]);

          //Keep incrementing "i" with second graph for futur deaths
          for (; i < 52; i++) {
              left += flu_data.death[i][2];
              splitData.push([i, NaN, NaN, NaN, flu_data.death[i][0], flu_data.death[i][1], flu_data.death[i][2]]);
          }

          $('.death .hindcast .number-stat').html(soFar);
          $('.death .forecast .number-stat').html(left);

          var data = new google.visualization.DataTable();
          //google.visualization.arrayToDataTable(splitData);
          data.addColumn('number', 'Week');
          data.addColumn('number', 'under 20');
          data.addColumn('number', 'under 65');
          data.addColumn('number', 'total');
          data.addColumn('number', 'under 20');
          data.addColumn('number', 'under 65');
          data.addColumn('number', 'total');

          data.addRows(splitData);

          var options = {
              height: 240,
              backgroundColor: 'transparent',
              title: 'Reported deaths in Canada from influenza in 2012-2013 by this week',
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
          /*
          var dataView = new google.visualization.DataView(data);
          dataView.setColumns([{calc: function(data, row) { return ''; }, type:'string'}, 2, 1,0]);
          */
          var chart = new google.visualization.AreaChart(document.getElementById('chart_div-deaths'));
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