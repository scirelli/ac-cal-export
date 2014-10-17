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
function xhrWithAuth( method, url, interactive, oData, callback ){
    var access_token = null,
        retry        = true,
        deferred     = Q.defer();

    callback = callback || function(){};

    getToken();

    function getToken() {
        chrome.identity.getAuthToken({ interactive: interactive }, function(token) {
            if (chrome.runtime.lastError) {
                callback(chrome.runtime.lastError);
                deferred.reject(chrome.runtime.lastError); 
                return;
            }

            access_token = token;
            requestStart();
        });
    }

    function requestStart() {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = requestComplete;
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        if( oData ){
            xhr.setRequestHeader("Content-Type", "application/json;");//charset=UTF-8
            xhr.send( JSON.stringify(oData) );
        }else{
            xhr.send();
        }
    }

    function requestComplete() {
        if (this.status == 401 && retry) {
            retry = false;
            chrome.identity.removeCachedAuthToken({ token: access_token }, getToken);
        } else {
            callback(null, this.status, this.response);
            deferred.resolve( { status:this.status, response:this.response } );
        }
    }

    return deferred.promise;
};

function Calendar( etag, id, summary, description, location, timeZone ){
    this.kind        = "calendar#calendar";
    this.etag        = etag || '';
    this.id          = id || '';
    this.summary     = summary || '';
    this.description = description || '';
    this.location    = location || '';
    this.timeZone    = timeZone || '';
    if( etag && typeof(etag) == 'object' ){
        this.copy(etag);
    }
};
Calendar.prototype = {
    copy:function( o ){
        this.setEtag( o.etag );
        this.setId( o.id );
        this.setSummary( o.summary );
        this.setDescription( o.description );//optional
        this.setLocation( o.location );//optional
        this.setTimeZone( o.timeZone );//optional
    },
    clone:function(){
        return new Calendar( this );
    },
    getKind:function(){
        return this.kind;
    },
    getEtag:function(){
        return this.etag;
    },
    getId:function(){
        return this.id;
    },
    getSummary:function(){
        return this.summary;
    },
    getDescription:function(){
        return this.description;
    },
    getLocation:function(){
        return this.location;
    },
    getTimeZone:function(){
        return this.timeZone;
    },

    setEtag:function( etag ){
        this.etag = etag;
    },
    setId:function( id ){
        this.id = id;
    },
    setSummary:function( summary ){
        this.summary = summary;
    },
    setDescription:function( description ){
        this.description = description;
    },
    setLocation:function( location ){
        this.location = location;
    },
    setTimeZone:function( timeZone ){
        this.timeZone = timeZone;
    }
};

function Calendars(){
    this.sBaseCalendarURL = 'https://www.googleapis.com/calendar/v3/';
    this.sCalendarsURL    = this.sBaseCalendarURL + 'calendars/';
}
calendars.prototype = {
    //Clears a primary calendar. This operation deletes all data associated with the primary calendar of an account and cannot be undone
    clear:function( primary ){
        var sURL = this.sCalendarsURL;
        sURL += 'primary/clear';

        return xhrWithAuth( 'POST', sURL, true ).then(
            function( resolved ){
                if( resolved.status == 200 || resolved.status == 204 ){
                    return JSON.parse(resolved.response);
                }
                return resolved;
            },
            function( error ){
                debugger;
                return error;
            }
        );
    },
    //Deletes a secondary calendar
    delete:function( id ){
        var sURL = this.sCalendarsURL;
        sURL += id;

        return xhrWithAuth( 'DELETE', sURL, true ).then(
            function( resolved ){
                if( resolved.status == 200 || resolved.status == 204 ){
                    return JSON.parse(resolved.response);
                }
                return resolved;
            },
            function( error ){
                debugger;
                return error;
            }
        );
    },
    //Returns metadata for a calendar
    get:function( id ){
        var sURL = this.sCalendarsURL;
        sURL += id;

        return xhrWithAuth( 'GET', sURL, true ).then(
            function( resolved ){
                if( resolved.status == 200 ){
                    return JSON.parse(resolved.response);
                }
                return resolved;
            },
            function( error ){
                debugger;
                return error;
            }
        );
    },
    insert:function( sSummary, sDescription ){
        var sURL  = this.sCalendarsURL,
            oData = {};
        if( sSummary ){
            oData.summary = sSummary;
        }
        if( sDescription ){
            oData.description = sDescription;
        }
        return xhrWithAuth( 'POST', sURL, true, oData ).then(
            function( resolved ){
                if( resolved.status == 200 ){
                    return JSON.parse(resolved.response);
                }
                return resolved;
            },
            function( error ){
                debugger;
                return error;
            }
        );
    },
    patch:function(){
    },
    update:function(){
    }
}
functin CalendarListEntry( oCalendarListEntry ){
    this.kind                 = "calendar#calendarListEntry";
    this.etag                 = '';
    this.id                   = '';
    this.summary              = '';
    this.description          = '';
    this.location             = '';
    this.timeZone             = '';
    this.summaryOverride      = '';
    this.colorId              = '';
    this.backgroundColor      = '';
    this.foregroundColor      = '';
    this.hidden               = false;
    this.selected             = false;
    this.accessRole           = '';
    this.defaultReminders     = [];
    this.notificationSettings = {};
    this.primary              = false;
    this.deleted              = false;

    if( oCalenderListEntry && typeof(oCalendarListEntry) == 'object' ){
        this.copy(oCalendarListEntry);
    }
};
CalendarListEntry.prototype = {
    copy:function(o){
        this.setKind(o.kind);
        this.setEtag(o.etag);
        this.setId(o.id);
        this.setSummary(o.summary);
        this.setDescription(o.description);
        this.setLocation(o.location);
        this.setTimeZone(o.timeZone);
        this.setSummaryOverride( o.summaryOverride );
        this.setColorId(o.colorId);
        this.setBackgroundColor(o.backgroundColor);
        this.setForegroundColor( o.foregroundColor );
        this.setHidden(o.hidden);
        this.setSelected(o.selected);
        this.setAccessRole( o.accessRole );
        this.setDefaultReminders( o.defaultReminders );
        this.setNotificationSettings(o.notificationSettings);
        this.setNrimary(o.primary);
        this.setDeleted(o.deleted);
    },
    clone:function(){
        return new CalendarListEntry(this);
    },
    getKind:function(){
        return this.kind;
    },
    getEtag:function(){
        return this.etag;
    },
    getId:function(){
        return this.id;
    },
    getSummary:function(){
        return this.summary;
    },
    getDescription:function(){
        return this.description;
    },
    getLocation:function(){
        return this.location;
    },
    getTimeZone:function(){
        return this.timeZone;
    },
    getSummaryOverride:function(){
        return this.summaryOverride;
    },
    getColorId:function(){
        return this.colorId;
    },
    getBackgroundColor:function(){
        return this.backgroundColor;
    },
    getForegroundColor:function(){
        return this.foregroundColor;
    },
    getHidden:function(){
        return this.hidden;
    },
    getSelected:function(){
        return this.selected;
    },
    getAccessRole:function(){
        return this.accessRole;
    },
    getDefaultReminders:function(){
        return this.defaultReminders;
    },
    getNotificationSettings:function(){
        return this.notificationSettings;
    },
    getPrimary:function(){
        return this.primary;
    },
    getDeleted:function(){
        return this.deleted;
    },
    get:function(){
        return this.;
    }

    setEtag:function( etag ){
        this.etag = etag;
    },
    setId:function( id ){
        this.id = id;
    },
    setSummary:function( summary ){
        this.summary = summary;
    },
    setDescription:function( description ){
        this.description = description;
    },
    setLocation:function( location ){
        this.location = location;
    },
    setTimeZone:function( timeZone ){
        this.timeZone = timeZone;
    },
    setSummaryOverride:function( summaryOverride ){
        this.summaryOverride = summaryOverride;
    },
    setColorId:function( colorId ){
        this.colorId = colorId;
    },
    setBackgroundColor:function( backgroundColor ){
        this.backgroundColor = backgroundColor;
    },
    setForegroundColor:function( foregroundColor ){
        this.foregroundColor = foregroundColor;
    },
    setHidden:function( hidden ){
        this.hidden = hidden;
    },
    setSelected:function( selected ){
        this.selected = selected;
    },
    setAccessRole:function( accessRole ){
        this.accessRole = accessRole;
    },
    setDefaultReminders:function( defaultReminders ){
        this.defaultReminders = defaultReminders;
    },
    setNotificationSettings:function( notificationSettings ){
        this.notificationSettings = notificationSettings;
    },
    setPrimary:function( primary ){
        this.primary = primary;
    },
    setDeleted:function( deleted ){
        this.deleted = deleted;
    }
};

function CalendarList(){
    this.sBaseCalendarURL = 'https://www.googleapis.com/calendar/v3/';
    this.sCalendarListURL = this.sBaseCalendarURL + 'users/me/';
    /*this.sCalendarsURL    = this.sBaseCalendarURL + 'calendars/';
    this.sEventsURL       = this.sBaseCalendarURL + 'calendars/';
    this.sColorsURL       = this.sBaseCalendarURL + 'colors';
    this.sFreeBusyURL     = this.sBaseCalendarURL + 'freeBusy/';
    this.sSettingsURL     = this.sBaseCalendarURL + 'users/me/settings';
    this.sChannels        = this.sBaseCalendarURL + 'channels/stop';
    */
};
CalendarList.prototype = {
    list:function( id ){
        var sURL = this.sCalendarListURL + 'calendarList';
        id = '/' + id || '';
        sURL += id;

        return xhrWithAuth( 'GET', sURL, true ).then(
            function( resolved ){
                if( resolved.status == 200 ){
                    return JSON.parse(resolved.response);
                }
                return {};
            },
            function( error ){
                debugger;
                return error;
            }
        );
    },
    get:function( id ){
        return this.list(id);
    },
    //Inserts defaults for calendar events and notifications found under a calendars reminders and notifications tab
    insert:function( calendar ){
        var sURL = this.sCalendarListURL;

        return xhrWithAuth( 'POST', sURL, true ).then(
            function( resolved ){
                if( resolved.status == 200 ){
                    return JSON.parse(resolved.response);
                }
                return {};
            },
            function( error ){
                debugger;
                return error;
            }
        );
    },
    //Deletes a subcalendar
    delete:function( id ){
        var sURL = this.sCalendarListURL + 'calendarList';
        id = '/' + id || '';
        sURL += id;

        return xhrWithAuth( 'DELETE', sURL, true ).then(
            function( resolved ){
                if( resolved.status == 200 ){
                    return JSON.parse(resolved.response);
                }
                return {};
            },
            function( error ){
                debugger;
                return error;
            }
        );
    },
};

document.getElementById('run').addEventListener('click',function(){
    var calendar = new Calendars();
    calendar.list( "ktukt423032jk0figv9i1vp154@group.calendar.google.com" ).then(
        function( obj ){
            debugger;
        },
        function( error ){
            console.error(error);
        }
    ).done();
});
