function ColorEvents() {
  //Define colors to use. See list here: https://developers.google.com/apps-script/reference/calendar/event-color
  var personal_color = CalendarApp.EventColor.PALE_BLUE;
  var meetings_color = CalendarApp.EventColor.YELLOW;
  var study_color = CalendarApp.EventColor.CYAN;
  var transportation_color = CalendarApp.EventColor.GRAY;

  //Define keywords for each group
  var personal_keywords = ['Almoço', 'Café da Manhã', 'Jantar', 'Janta', 'Break','Escalada', 'Cinema', 'BGZO', 'Date Night']
  var study_keywords = ['DataCamp', 'Estudar', 'Python', 'Ruby', 'JavaScript']
  var transportation_keywords = ['Transporte', 'Transporation', 'Uber']

  var days_ahead = 31 //how many days starting today should the script check?


  //Setting beginning and end dates
  var today = new Date();
  var end_date = new Date();
  end_date.setDate(end_date.getDate() + days_ahead);
  //Logger.log(today + " " + end_date);

  //Getting calendars
  var calendars = CalendarApp.getAllOwnedCalendars();
  Logger.log("found number of calendars: " + calendars.length);


  for (var i = 0; i < calendars.length; i++) {
      var calendar = calendars[i];
      var events = calendar.getEvents(today, end_date);
      for (var j = 0; j < events.length; j++) {
        var e = events[j];
        var title = e.getTitle();

        // Personal activities
        for (var k = 0; k < personal_keywords.length; k++){
          if (title.toLowerCase().includes(personal_keywords[k].toLowerCase())){
            e.setColor(personal_color);
          }
        }

        //Study activities
        for (var k = 0; k < study_keywords.length; k++){
          if (title.toLowerCase().includes(study_keywords[k].toLowerCase())){
            e.setColor(study_color);
          }
        }

        //Transportation activities
        for (var k = 0; k < transportation_keywords.length; k++){
          if (title.toLowerCase().includes(transportation_keywords[k].toLowerCase())){
            e.setColor(transportation_color);
          }
        }
        
        //Meetings
        //No keywords. If there is at least one guest, change color.
        if (e.getGuestList().length > 0){
            e.setColor(meetings_color);
        } 
        
      }
  }
}
