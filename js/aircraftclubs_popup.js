var client_id        = '920486903505-r6bkir5pv6td8iqh84rbu1k0gngv0s8n.apps.googleusercontent.com',
    api_key          = 'AIzaSyBnsVaei45mMVPHAlrdxr6jVKnj2nBeaYc',
    //              https://www.googleapis.com/apiName/apiVersion/resourcePath?parameters            
    sBaseCalendarURL = 'https://www.googleapis.com/calendar/v3/users/me/';

!function(){
"use strict";
    var oScrapeBtn = document.querySelector('button#scrape');

    oScrapeBtn.addEventListener('click',function(e){
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id, {command: "scrape", sAircraftId:915, sInstructorId:0 }, function(response) {
                console.log(response);
                debugger;
                //window.close();
            });
        });
        /*
        chrome.tabs.executeScript(null,{
                code:'scrape();',
                allFrames:false,
                runAt:"document_start"
            },
            function( a ){
                debugger;
            }
        );
        */
    });
}();

/** Batch Notes **
 * Limited to 50 calls in a single batch request.
 * https://www.googleapis.com/calendar/v3/batch/
 */
document.getElementById('run').addEventListener('click',function(){
    var calendarlist = new gcal.CalendarList();
    /*
    gcal.xhrWithAuth( 'GET', 'https://www.googleapis.com/calendar/v3/users/me/calendarList', true, null, function(r){
        debugger;
    });
    */
    calendarlist.list().execute().then(
        function( obj ){
            debugger;
        },
        function( error ){
            console.error(error);
        }
    ).done();
});
