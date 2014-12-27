if( gcal === undefined ){ var gcal = {}; }

!function(gcal){
    function CalendarList(){
        this.sGoogleAPIsURL   = 'https://www.googleapis.com/',
        this.sBaseCalendarURL = this.sGoogleAPIsURL + 'calendar/v3/';
        this.sCalendarListURL = this.sBaseCalendarURL + 'users/me/calendarList/';
        this.sBatchBoundary   = 'batch_foobarbaz';
        this.aAll             = [];
        /*this.sCalendarsURL    = this.sBaseCalendarURL + 'calendars/';
        this.sEventsURL       = this.sBaseCalendarURL + 'calendars/';
        this.sColorsURL       = this.sBaseCalendarURL + 'colors';
        this.sFreeBusyURL     = this.sBaseCalendarURL + 'freeBusy/';
        this.sSettingsURL     = this.sBaseCalendarURL + 'users/me/settings';
        this.sChannels        = this.sBaseCalendarURL + 'channels/stop';
        */
    };

    CalendarList.prototype = {
        execute:function(){
            var aAll         = this.aAll,
                batchRequest = new gcal.GoogleAPIRequest();
            this.aAll = [];
            if( aAll.length ){
                return batchRequest.execute( aAll );
            }else{
                var deferred = Q.defer();
                deferred.reject("CalendarList.execute(): Nothing to process.");
                return deferred.promise;
            }
        },

        list:function( id ){
            var sURL     = this.sCalendarListURL,
                deferred = Q.defer();
            
            if(id){ 
                sURL += id;
            }
            this.aAll.push(
                {
                    method:'GET',
                    url:sURL,
                    headers:[
                        //{header:'Content-Type', value:'application/http'}
                    ],
                    deferred:deferred
                }
            );
            //Parse out all CalendarListEntry's first
            return deferred.promise.then(function( oResponse ){
                var items = [];

                if( oResponse.items ){
                    for( var i=0,a=oResponse.items,l=a.length,itm=null; i<l; i++ ){
                        items.push( new gcal.CalendarListEntry(a[i]) );
                    }
                }else{
                    items = new gcal.CalendarListEntry(oResponse);
                }

                return items;
            });
        },

        get:function( id ){
            return this.list(id);
        },

        //Inserts defaults for calendar events and notifications found under a calendars reminders and notifications tab
        insert:function( oCalendarList ){
            var sURL     = this.sCalendarListURL,
                deferred = Q.defer();

            if( oCalendarList ){
                var body = JSON.stringify(oCalendarList);
                this.aAll.push(
                    {
                        method:'POST',
                        url:sURL,
                        body:body,
                        headers:[
                            {header:'Content-Type', value:'application/json'}
                            //{header:'Content-Length', value:body.length}
                            //{header:'Content-ID', value:CryptoJS.MD5(sURL + body).toString() }
                        ],
                        deferred:deferred
                    }
                );
            }
            return deferred.promise.then(function( oResponse ){
                return new gcal.CalendarListEntry(oResponse);
            });
        },

        //Deletes a subcalendar
        delete:function( id ){
            var sURL     = this.sCalendarListURL + id,
                deferred = Q.defer();
            
            if( id ){
                this.aAll.push(
                    {
                        method:'DELETE',
                        url:sURL,
                        headers:[
                            //{header:'Content-Type', value:'application/http'}
                            //{header:'Content-ID', value:CryptoJS.MD5(sURL).toString()}
                        ],
                        deferred:deferred
                    }
                );
            }
            return deferred.promise;
        },

        patch:function( calId, oCalendarList, colorRgbFormat ){
            var sURL     = this.sCalendarListURL + calId,
                deferred = Q.defer();
            if( colorRgbFormat ){
                sURL += '?colorRgbFormat=' + colorRgbFormat;
            }
            if( calId && oCalendarList ){
                var body = JSON.stringify(oCalendarList);
                this.aAll.push(
                    {
                        method:'PATCH',
                        url:sURL,
                        body:body,
                        headers:[
                            {header:'Content-Type', value:'application/json'}
                            //{header:'Content-Length', value:body.length}
                            //{header:'Content-ID', value:CryptoJS.MD5(sURL + body).toString() }
                        ],
                        deferred:deferred
                    }
                );
            }
            return deferred.promise.then(function( oResponse ){
                return new gcal.CalendarListEntry(oResponse);
            });
        },

        update:function( calId, oCalendarList ){
            var sURL     = this.sCalendarListURL + calId,
                deferred = Q.defer();

            if( calId && oCalendarList ){
                var body = JSON.stringify(oCalendarList);
                this.aAll.push(
                    {
                        method:'PUT',
                        url:sURL,
                        body:body,
                        headers:[
                            {header:'Content-Type', value:'application/json'}
                            //{header:'Content-Length', value:body.length}
                            //{header:'Content-ID', value:CryptoJS.MD5(sURL + body).toString() }
                        ],
                        deferred:deferred
                    }
                );
            }
            return deferred.promise.then(function( oResponse ){
                return new gcal.CalendarListEntry(oResponse);
            });
        },

        watch:function( oWatch ){
            var sURL     = this.sCalendarListURL + 'watch',
                deferred = Q.defer();

            if( oWatch ){
                var body = JSON.stringify(oWatch);
                this.aAll.push(
                    {
                        method:'POST',
                        url:sURL,
                        body:body,
                        headers:[
                            {header:'Content-Type', value:'application/json'}
                            //{header:'Content-Length', value:body.length}
                            //{header:'Content-ID', value:CryptoJS.MD5(sURL + body).toString() }
                        ],
                        deferred:deferred
                    }
                );
            }
            return deferred.promise;
        }
    };

    gcal.CalendarList = CalendarList;
}(gcal);
