var MonthlyCalendar = require('/ui/common/MonthlyCalendar');

var theme = function(a, b){for(i in b){if(!a[i] && typeof b[i] !== 'function') a[i]=b[i];}return a;};

var MONTH = ["Januery", "Febrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];;
function getPrevMonth(_current){return _current.month == 0 ? {year:_current.year-1, month:11} : {year:_current.year, month:_current.month-1};}
function getNextMonth(_current){return _current.month == 11 ? {year:_current.year+1, month:0} : {year:_current.year, month:_current.month+1};}
function compare(a, b){return (a.month == b.month && a.year == b.year);}
function getPrevMonthes(cal){
	var ms=[], rms=[]; 
	ms.push(getNextMonth(cal));
	for(var i=0;i<13;i++) ms.push(getPrevMonth(ms[i])); // 몇개월 뒤를 미리 준비해 둘 것인지 결정한다. 약 12개월까지 칼렌더를 뒤로 보낼 수 있다.
	for(var i=ms.length-1;i>-1;i--){
		rms[rms.length]=ms[i];
	}
	return rms;
}
function getMonthTitle(cal){ return MONTH[cal.month]+' '+(cal.year+1900); }



function MonthlyCalendarView() {
	
	var win = Ti.UI.createView({
		top:0, 
		left:0,
		width:'100%', 
		height:'auto',
		layout:'vertical'
	});	
	var titleView = Ti.UI.createView({
		width:'100%',
		height:40,
		top:0,
		left:0,
		backgroundColor:'#999'
	});
	
	var day = new Date();
	var prev = Ti.UI.createButton({title: ' < ',left:0,});
	var next = Ti.UI.createButton({title:' > ',right:0,});
	var _current = { // month 객체...
		year:day.getYear(),
		month:day.getMonth()
	};
	var title = Ti.UI.createLabel({text:getMonthTitle(_current)});
	
	titleView.add(prev);
	titleView.add(title);
	titleView.add(next);
	win.add(titleView);
	
	Ti.API.info((day.getYear()+1900)+':'+day.getMonth()+'... were initial values...');
	
	var months = getPrevMonthes(_current);
	var pointer = {
		prev:months[0],
		current:_current,
		next:getNextMonth(_current)
	};
	
	var views = [];
	months.map(function(m){views.push(MonthlyCalendar(m))});
	
	var calendars = Ti.UI.createScrollableView({
		views:views,
		showPagingControl:false,
		pagingControlHeight:0,
		maxZoomScale:1.0,
		currentPage:views.length-2
	});
	prev.addEventListener('click', function(e){
		//calendars.movePrevious(); // 안드로이드 인 경우...
		var _current = calendars.getCurrentPage();
		if(_current > 0)
			calendars.scrollToView(calendars.getViews()[_current-1]);
	});
	next.addEventListener('click', function(e){
		// calendars.moveNext(); // 안드로이드인 경우...
		var _current = calendars.getCurrentPage();
		calendars.scrollToView(calendars.getViews()[_current+1]);
	});
	
	
	calendars.addEventListener('scroll', function(e)
	{
		var activeView = e.view;
		var i = e.currentPage;
		Titanium.API.info("scroll called - current index " + i + ' active view ' + activeView);
		
		pointer.current=activeView.p;
		if(compare(pointer.current, pointer.next)){
			pointer.next=getNextMonth(pointer.current);
			calendars.addView(MonthlyCalendar(pointer.next));
    	
		}
		// else if(compare(pointer.current, pointer.prev)){
			// pointer.prev=getPrevMonth(pointer.current);
			// views=[MonthlyCalendar(pointer.prev)].push(views);
		// }
		title.setText(getMonthTitle(pointer.current));
	});
	win.add(calendars);
	
	return win;
}

module.exports = MonthlyCalendarView;
