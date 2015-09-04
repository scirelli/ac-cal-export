ac-cal-export
=============

AircraftClubs.com calendar export to Google Calendar.

I don't like the calendar interface that Aircraft Clubs uses on their site. And there is no feature to export the data to other calendars. So I'm creating a Chrome extension to do so.

This extension will add a "Export to Calendar" button which will create a calendar for each resource, and add each reasources events to that calendar. A resource is a plane or instructor.

I've also added view buttons that change the view of FullCalendar to week and day. I'm not sure why they are not there by default.
Requires:
--------
* https://github.com/scirelli/googlecalendar_v3_chrome_extenstion
    Placed into /js/lib/calendar
