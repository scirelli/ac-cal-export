var client_id  = '920486903505-r6bkir5pv6td8iqh84rbu1k0gngv0s8n.apps.googleusercontent.com',
    api_key    = 'AIzaSyBnsVaei45mMVPHAlrdxr6jVKnj2nBeaYc',
    token      = '';

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

function auth() {
    var config = {
        'client_id':client_id,
        'scope': 'https://www.googleapis.com/auth/calendar'
    };
    gapi.auth.authorize(config, function() {
        console.log('login complete');
        console.log(gapi.auth.getToken());
    });
}
function init(){
    chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
        // Use the token.
        debugger;
        console.log(token);
        gapi.auth.setToken(token);
        gapi.client.setApiKey(api_key);
        gapi.client.load('calendar', 'v3', onReady);
    });
    //auth();
    //gapi.client.setApiKey(api_key);
    //gapi.client.load('calendar', 'v3', onReady);
};

document.getElementById('run').addEventListener('click',function(){
    var script = document.createElement('script');

    console.log('before init called');

    script.src = "https://apis.google.com/js/client.js?onload=init";
    (document.head||document.documentElement).appendChild(script);
});
