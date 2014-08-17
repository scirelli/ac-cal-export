var client_id  = '920486903505-r6bkir5pv6td8iqh84rbu1k0gngv0s8n.apps.googleusercontent.com';
var api_key = 'AIzaSyBnsVaei45mMVPHAlrdxr6jVKnj2nBeaYc';

!function(){
"use strict";
    var oScrapeBtn = document.querySelector('button#scrape');

    oScrapeBtn.addEventListener('click',function(e){
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.sendMessage(tab.id, {command: "scrape"}, function(response) {
                console.log(response);
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

function onReady(){
    var request = gapi.client.calendar.calendarList.list({});
    request.execute(function( jsonResponse, rawResponse ){
        console.log(jsonResponse);
        debugger;
    });
};

function steve(){
    debugger;
    console.log('steve');
    //gapi.client.setApiKey(api_key);
    //gapi.client.load('calendar', 'v3', onReady);
};
window.addEventListener('load',function(){
    document.

    <!--<script src="https://apis.google.com/js/client.js?onload=steve"></script>-->
});
