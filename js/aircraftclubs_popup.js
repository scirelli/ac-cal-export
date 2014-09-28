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

    // @corecode_begin getProtectedData
function xhrWithAuth(method, url, interactive, callback){
    var access_token;

    var retry = true;

    getToken();

    function getToken() {
        chrome.identity.getAuthToken({ interactive: interactive }, function(token) {
            if (chrome.runtime.lastError) {
                callback(chrome.runtime.lastError);
                return;
            }

            access_token = token;
            requestStart();
        });
    }

    function requestStart() {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.onload = requestComplete;
        xhr.send();
    }

    function requestComplete() {
        if (this.status == 401 && retry) {
            retry = false;
            chrome.identity.removeCachedAuthToken({ token: access_token }, getToken);
        } else {
            callback(null, this.status, this.response);
        }
    }
}

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

document.getElementById('run').addEventListener('click',function(){
    xhrWithAuth( 'GET', sBaseCalendarURL + 'calendarList', true, function(error, status, response){
        debugger;
    });
});
