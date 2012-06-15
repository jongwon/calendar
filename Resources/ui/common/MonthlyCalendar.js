//var DAYS =  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var DAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var ONEDAY = 24*60*60*1000;

function makeDays(day){
	var month = day.getMonth();
	var weeks = [];
	var result = makeWeek(day);
	weeks.push(result.w);
	while(result.next.getMonth() == month){
		result = makeWeek(result.next);
		weeks.push(result.w);
	}
	return weeks;
}

function makeWeek(day){
	if(day.getDay() != 0) day.setTime(day.getTime()-day.getDay()*ONEDAY);
	var week = [];
	for(var i=0;i<7;i++){
		week.push(new Date(day.getTime()+(i*ONEDAY)));
	}
	return {w:week, next:new Date(day.getTime()+7*ONEDAY)};
}

var CELL_WIDTH = 320/7;
var MARGIN = 2;
var HEIGHT = 50;
var COLOR_TOP = 10;
var DAY_HEIGHT = 20;

function MonthlyCalendar(cal){
	var day = new Date(cal.year+1900, cal.month, 1);
	var monthPanel = Ti.UI.createView({
		width:'100%',
		height:'auto',
		top:10,
		left:0
	});
	
	for(var i=0;i<7;i++){
		var wp = Ti.UI.createView({
			top:0,
			left:(CELL_WIDTH*i)+MARGIN,
			width:CELL_WIDTH-2*MARGIN,
			height:DAY_HEIGHT,
			backgroundColor:'#aaa'
		});
		wp.add(Ti.UI.createLabel({
			text:DAY[i],
			top:0,
			left:0,
			width:'100%',
			height:DAY_HEIGHT,
			textAlign:'center',
			font:{fontSize:12}
		}));
		monthPanel.add(wp);
	}
	
	var year = day.getYear();
	var month = day.getMonth();
	var weeks = makeDays(day);
	
	for(var i=0; i<weeks.length; i++){
		var week = weeks[i];
		for(var j=0; j<week.length; j++){
			var d = week[j];
			var dayPanel = Ti.UI.createView({
				top:(HEIGHT+MARGIN+MARGIN)*(i) + DAY_HEIGHT+MARGIN,
				left:(CELL_WIDTH*j)+MARGIN,
				width:CELL_WIDTH-2*MARGIN,
				backgroundColor:'#999',
				height:HEIGHT
			});
			dayPanel.add(Ti.UI.createView({
				top:0, 
				width:'100%', 
				height:COLOR_TOP, 
				backgroundColor:'#ddd'
			}));
			dayPanel.add(Ti.UI.createLabel({
				top:COLOR_TOP, 
				left:0, 
				width:'100%',
				height:HEIGHT-COLOR_TOP, 
				text:d.getMonth() == month ? ''+d.getDate() : '',
				textAlign:'center'
			}));
			monthPanel.add(dayPanel);
		}
	}
	monthPanel.year = year;
	monthPanel.month = month;
	monthPanel.p={year:year, month:month};
	
	return monthPanel;
};


module.exports =  MonthlyCalendar;
