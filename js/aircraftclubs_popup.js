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

var gcal = function(){
"use strict";
    // @corecode_begin getProtectedData
    xhrWithAuth( method, url, interactive, oData, callback ){
        var access_token  = null,
            retry         = true,
            deferred      = Q.defer(),
            batchBoundary = 'batch_foobarbaz';

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
        };

        function requestStart() {
            var xhr   = new XMLHttpRequest(),
                sData = '';

            xhr.open(method, url);
            xhr.onload = requestComplete;
            xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);

            if( oData.length ){//Considerig it a batch request
                xhr.setRequestHeader("Content-Type", "multipart/mixed; boundary=" + batchBoundary);
                sData = buildBatchRequest( oData );
                xhr.setRequestHeader("Content-Length", sData.length);
                xhr.send( sData );
            }else if( oData ){//
                xhr.setRequestHeader("Content-Type", "application/json;");//charset=UTF-8
                xhr.send( JSON.stringify(oData) );
            }else{
                xhr.send();
            }
        };

        function requestComplete() {
            if (this.status == 401 && retry) {
                retry = false;
                chrome.identity.removeCachedAuthToken({ token: access_token }, getToken);
            } else {
                callback(null, this.status, this.response);
                deferred.resolve( { status:this.status, response:this.response } );
            }
        };
        
        function buildBatchRequest( aData ){
            return '';
        };
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
        this.sBatchURL    = this.sCalendarsURL + 'batch/';
        this.aClear  = [];
        this.aDelete = [];
        this.aGet    = [];
        this.aInsert = [];
        this.aPatch  = [];
        this.aUpdate = [];
    }
    Calendars.prototype = {
        execute:function(){
            var aAll = Array.prototpye.concat.call( this.aClear, this.aDelete, this.aGet, this.aInsert, this.aPatch, this.aUpdate );
            debugger;
        },
        //Clears a primary calendar. This operation deletes all data associated with the primary calendar of an account and cannot be undone
        clear:function( primary ){
            var sURL = this.sCalendarsURL;
            sURL += 'primary/clear';
            
            if( primary ){
                this.aClear.push(
                    {
                        method:'POST',
                        url:sURL,
                        headers:[
                            'Content-Type':'application/http',
                            'Content-ID':md5(sURL)
                        ]
                    }
                );
            }
            /*
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
            */
            return this;
        },
        //Deletes a secondary calendar
        delete:function( id ){
            var sURL = this.sCalendarsURL;
            sURL += id;
            
            if( id ){
                this.aDelete.push(
                    {
                        method:'DELETE',
                        url:sURL,
                        headers:[
                            'Content-Type':'application/http',
                            'Content-ID':md5(sURL)
                        ]
                    }
                );
            }
            /*
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
            */
            return this;
        },
        //Returns metadata for a calendar
        get:function( id ){
            var sURL = this.sCalendarsURL;
            sURL += id;
            if(id){ 
                this.aGet.push(
                    {
                        method:'GET',
                        url:sURL,
                        headers:[
                            'Content-Type':'application/http',
                            'Content-ID':md5(sURL)
                        ]
                    }
                );
            }
            /*
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
            */
            return this;
        },
        insert:function( oCalendar ){
            var sURL  = this.sCalendarsURL;
            
            if( oCalendar ){
                var body = JSON.stringify(oCalendar);
                this.aInsert.push(
                    {
                        method:'POST',
                        url:sURL,
                        body:body,
                        headers:[
                            'Content-Type':'application/json',
                            'Content-Length':body.length,
                            'Content-ID':md5(sURL + body)
                        ]
                    }
                );
            }
            /*
            return xhrWithAuth( 'POST', sURL, true, oCalendar ).then(
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
            */
            return this;
        },
        //Updates metadata for a calendar.
        patch:function( id, oPatch ){
            var sURL  = this.sCalendarsURL + id;

            if( id && oPatch ){
                var body = JSON.stringify(oPatch);
                this.aInsert.push(
                    {
                        method:'PATCH',
                        url:sURL,
                        body:body,
                        headers:[
                            'Content-Type':'application/json',
                            'Content-Length':body.length,
                            'Content-ID':md5(sURL + body)
                        ]
                    }
                );
            }
            /*
            return xhrWithAuth( 'PATCH', sURL, true, oPatch ).then(
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
            */
            return this;
        },
        //Updates metadata for a calendar. can udpate the summary. Summary seems to be required
        update:function( id, oUpdate ){
            var sURL  = this.sCalendarsURL + id;

            if( id && oUpdate ){
                var body = JSON.stringify(oUpdate);
                this.aInsert.push(
                    {
                        method:'PUT',
                        url:sURL,
                        body:body,
                        headers:[
                            'Content-Type':'application/json',
                            'Content-Length':body.length,
                            'Content-ID':md5(sURL + body)
                        ]
                    }
                );
            }
            /*
            return xhrWithAuth( 'PUT', sURL, true, oUpdate ).then(
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
            */
            return this;
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

    function Event(){
        this.kind = 'calendar#event';
        this.etag = '';
        this.id = '';
        this.status             = '';
        this.htmlLink           = '';
        this.created            = '';
        this.updated            = '';
        this.summary            = '';
        this.description        = '';
        this.location           = '';
        this.colorId            = '';
        this.creator            = new Event.Attendee();
        this.organizer          = new Event.Attendee();
        this.start              = new Event.Date();
        this.end                = new Event.Date();
        this.endTimeUnspecified = false;
        this.recurrence         = [];
        this.recurringEventId   = '';
        this.originalStartTime = new Event.Date();
        this.transparency = '';
        this.visibility = '';
        this.iCalUID = '';
        this.sequence = 0;
        this.attendees = [];
        this.attendeesOmitted = false;
        this.extendedProperties new Event.ExtendedProperties();
        this.hangoutLink = '';
        this.gadget = new Event.Gadget();
        this.anyoneCanAddSelf = false;
        this.guestsCanInviteOthers = false;
        this.guestsCanModify = false;
        this.guestsCanSeeOtherGuests = true;
        this.privateCopy = false;
        this.locked = false;
        this.reminders = new Event.Reminders(); 
        this.source = new Source();
    };
    Event.prototype = {
    };
    Event.Attendee = function(){
        this.id          = '';
        this.email       = '';
        this.displayName = '';
        this.self        = false;
        this.resource    = false;
        this.optional    = true;
        this.responseStatus = '';
        this.comment     = '';
        this.additionalGuests = 0;
    };
    Event.Date = function(){
        this.date     = new Date(),
        this.dateTime = '';
        this.timeZone = '';
    };
    Event.ExtendedProperties = function(){
        this.private = {
            //(key): string
        };
        this.shared = {
            //(key): string
        };
    };
    Event.Gadget = function(){
        this.type        = '';
        this.title       = '';
        this.link        = '';
        this.iconLink    = '';
        this.width       = 0;
        this.height      = 0;
        this.display     = '';
        this.preferences = {
          //(key): string
        };
    };
    Event.Reminders = function(){
        this.useDefault = false;
        this.overrides  = [];
    };
    Event.Reminders.Overrides = function(){
        this.method  = ''; //"email" - Reminders are sent via email.  "sms" - Reminders are sent via SMS.  "popup"
        this.minutes = 0;
    };
    Event.Source = function(){
        this.url   = '';
        this.title = '';
    };

    function Events(){
        this.sBaseCalendarURL = 'https://www.googleapis.com/calendar/v3/';
        this.sCalendarsURL    = this.sBaseCalendarURL + 'calendars/';
        this.sBatchURL    = this.sCalendarsURL + 'batch/';

        this.aDelete = [];
        this.aGet    = [];
        this.aImport = [];
        this.aInsert = [];
        this.aInstance = [];
        this.aPatch  = [];
        this.aUpdate = [];
        this.aQuickAdd = [];
    };

    Events.prototype = {
        execute:function(){
            var aAll = Array.prototpye.concat.call( this.aClear, this.aDelete, this.aGet, this.aInsert, this.aPatch, this.aUpdate );
            debugger;
        },

        delete:function( calId, eventId, sendNotificaiton ){
            var sURL = this.sCalendarsURL;
            sURL += calId + '/events/' + eventId ;
            sendNotificaiton = sendNotificaiton ? true : false; 
            if( sendNotificaiton ){
                sURL += '?sendNotificaiton=true';
            }

            if( calId && eventId ){
                this.aDelete.push(
                    {
                        method:'DELETE',
                        url:sURL,
                        headers:[
                            'Content-Type':'application/http',
                            'Content-ID':md5(sURL)
                        ]
                    }
                );
            }
            return this;
        },

        get:function( calId, eventId, alwaysIncludeEmail, maxAttendees, timeZone ){
            var sURL = this.sCalendarsURL;
            sURL += calId;
            
            if( eventId ){
                sURL += '/events/' + eventId;
            }
            if( calId ){
                this.aDelete.push(
                    {
                        method:'GET',
                        url:sURL,
                        headers:[
                            'Content-Type':'application/http',
                            'Content-ID':md5(sURL)
                        ]
                    }
                );
            }
            return this;
        },

        insert:function( calId, oEvent ){
            var sURL  = this.sCalendarsURL;
            
            if( oCalendar ){
                var body = JSON.stringify(oCalendar);
                this.aInsert.push(
                    {
                        method:'POST',
                        url:sURL,
                        body:body,
                        headers:[
                            'Content-Type':'application/json',
                            'Content-Length':body.length,
                            'Content-ID':md5(sURL + body)
                        ]
                    }
                );
            }
            /*
            return xhrWithAuth( 'POST', sURL, true, oCalendar ).then(
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
            */
            return this;
        },
        //Updates metadata for a calendar.
        patch:function( id, oPatch ){
            var sURL  = this.sCalendarsURL + id;

            if( id && oPatch ){
                var body = JSON.stringify(oPatch);
                this.aInsert.push(
                    {
                        method:'PATCH',
                        url:sURL,
                        body:body,
                        headers:[
                            'Content-Type':'application/json',
                            'Content-Length':body.length,
                            'Content-ID':md5(sURL + body)
                        ]
                    }
                );
            }
            /*
            return xhrWithAuth( 'PATCH', sURL, true, oPatch ).then(
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
            */
            return this;
        },
        //Updates metadata for a calendar. can udpate the summary. Summary seems to be required
        update:function( id, oUpdate ){
            var sURL  = this.sCalendarsURL + id;

            if( id && oUpdate ){
                var body = JSON.stringify(oUpdate);
                this.aInsert.push(
                    {
                        method:'PUT',
                        url:sURL,
                        body:body,
                        headers:[
                            'Content-Type':'application/json',
                            'Content-Length':body.length,
                            'Content-ID':md5(sURL + body)
                        ]
                    }
                );
            }
            /*
            return xhrWithAuth( 'PUT', sURL, true, oUpdate ).then(
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
            */
            return this;
        }
        get:function(){},
        import:function(){},
        insert:function(){},
        instance:function(){},
        list:function(){},
        move:function(){},
        patch:function(){},
        quickAdd:function(){},
        update:function(){},
        watch:function(){}
    };
    
    return {
        Calendar:Calendar,
        Calendars:Calendars,
        CalendarList:CalendarList,
        CalendarListEntry:CalendarListEntry,
        Event:Event,
        Events:Events
    };
}();

/** Batch Notes **
 * Limited to 50 calls in a single batch request.
 */
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
