if( gcal === undefined ){ var gcal = {}; }

!function(gcal){
    function Events(){
        this.sBaseCalendarURL = 'https://www.googleapis.com/calendar/v3/';
        this.sCalendarsURL    = this.sBaseCalendarURL + 'calendars/';
        this.sBatchURL    = this.sCalendarsURL + 'batch/';

        this.aDelete = [];
        this.aGet    = [];
        this.aImport = [];
        this.aInsert = [];
        this.aInstance = [];
        this.aList = [];
        this.aPatch  = [];
        this.aMove = [];
        this.aUpdate = [];
        this.aQuickAdd = [];
        this.aWatch = [];
        this.aAll = [];
    };

    Events.prototype = {
        execute:function(){
            var aAll         = this.aAll, //Array.prototpye.concat.call( this.aClear, this.aDelete, this.aGet, this.aInsert, this.aPatch, this.aUpdate );
                batchRequest = new gcal.GoogleAPIRequest();
            this.aAll = [];
            if( aAll.length ){
                return batchRequest.execute( aAll );
            }else{
                var deferred = Q.defer();
                deferred.reject("Events.execute(): Nothing to process.");
                return deferred.promise;
            }
        },

        list:function( calId ){
            var sURL     = this.sCalendarsURL + calId + '/events/',
                deferred = Q.defer();

            if( calId ){
                this.aAll.push(
                    {
                        method:'GET',
                        url:sURL,
                        headers:[],
                        deferred:deferred
                    }
                );
            }
            return deferred.promise.then(function( oResponse ){
                for( var i=0,a=oResponse.items,l=oResponse.items.length; i<l; i++ ){
                    a[i] = new gcal.Event(a[i]);
                }
                return oResponse;
            });
        },

        get:function( calId, eventId, alwaysIncludeEmail, maxAttendees, timeZone ){
            var sURL     = this.sCalendarsURL,
                deferred = Q.defer();

            sURL += calId + '/events/' + eventId;
            
            if( calId && eventId ){
                this.aAll.push(
                    {
                        method:'GET',
                        url:sURL,
                        headers:[],
                        deferred:deferred
                    }
                );
            }
            return deferred.promise.then(function( oResponse ){
                return new gcal.Event(oResponse);
            });
        },

        insert:function( calId, oEvent, maxAttendees, sendNotificaiton ){
            var sURL = this.sCalendarsURL,
                deferred = Q.defer();
            
            if( calId && oEvent ){
                var body = JSON.stringify(oEvent);

                sURL += calId + '/events/';
                this.aAll.push(
                    {
                        method:'POST',
                        url:sURL,
                        body:body,
                        headers:[
                            {header:'Content-Type', value:'application/json'}
                        ],
                        deferred:deferred
                    }
                );
            }
            return deferred.promise.then(function( oResponse ){
                return new gcal.Event(oResponse);
            });
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
                            {header:'Content-Type', value:'application/http'},
                            {header:'Content-ID',   value:md5(sURL)}
                        ]
                    }
                );
            }
            return this;
        },

        import:function( calId, oEvent ){
            var sURL = this.sCalendarsURL;
            sURL += calId + '/events/import';
            
            if(oEvent){
                var body = JSON.stringify(oEvent);
                this.aImport.push(
                    {
                        method:'POST',
                        url:sURL,
                        body:body,
                        headers:[
                            {header:'Content-Type', value:'application/json'},
                            {header:'Content-Length', value:body.length},
                            {header:'Content-ID', value:md5(sURL + body) }
                        ]
                    }
                );
            }
            return this;
        },

        instance:function( calId, eventId, alwaysIncludeEmail, maxAttendees, maxResults, originalStart, pageToken, showDeleted, timeMax, timeMin, timeZone ){
            var sURL = this.sCalendarsURL;
            sURL += calId + '/events/' + eventId + '/instances';
            
            if( calId && eventId ){
                this.aInstance.push(
                    {
                        method:'GET',
                        url:sURL,
                        headers:[
                            {header:'Content-Type', value:'application/http'},
                            {header:'Content-ID', value:md5(sURL)}
                        ]
                    }
                );
            }
            return this;
        },

        move:function( calId, eventId, destCalId, sendNotifications ){
            var sURL = this.sCalendarsURL;
            sURL += calId + '/events/' + eventId + '/move?destination=' + destCalId;
            
            if( calId && eventId && destCalId ){
                this.aMove.push(
                    {
                        method:'POST',
                        url:sURL,
                        headers:[
                            {header:'Content-Type', value:'application/http'},
                            {header:'Content-ID', value:md5(sURL)}
                        ]
                    }
                );
            }
            return this;
        },

        patch:function( calId, eventId, oEvent, alwaysIncludeEmail, maxAttendees, sendNotifications ){
            var sURL  = this.sCalendarsURL + calid + '/events/' + eventId;

            if( calId && eventId && oEvent ){
                var body = JSON.stringify(oEvent);
                this.aPatch.push(
                    {
                        method:'PATCH',
                        url:sURL,
                        body:body,
                        headers:[
                            {header:'Content-Type', value:'application/json'},
                            {header:'Content-Length', value:body.length},
                            {header:'Content-ID', value:md5(sURL + body) }
                        ]
                    }
                );
            }
            return this;
        },

        quickAdd:function( calId, text, sendNotifications ){
            var sURL  = this.sCalendarsURL + calId + '/events/quickAdd/?text=' + encodeURIComponent(text);

            if( calId && text ){
                this.aQuickAdd.push(
                    {
                        method:'POST',
                        url:sURL,
                        headers:[
                            {header:'Content-Type', value:'application/http'},
                            {header:'Content-ID', value:md5(sURL)}
                        ]
                    }
                );
            }
            return this;
        },

        update:function( calId, eventId, oEvent, alwaysIncludeEmail, maxAttendees, sendNotifications ){
            var sURL  = this.sCalendarsURL + calId + '/events/' + eventId;

            if( calId && eventId && oEvent ){
                var body = JSON.stringify(oEvent);
                this.aUpdate.push(
                    {
                        method:'PUT',
                        url:sURL,
                        body:body,
                        headers:[
                            {header:'Content-Type', value:'application/json'},
                            {header:'Content-Length', value:body.length},
                            {header:'Content-ID', value:md5(sURL + body) }
                        ]
                    }
                );
            }
            return this;
        },

        watch:function( calId, oRequest ){
            var sURL  = this.sCalendarsURL + calId + '/events/watch';

            if( calId ){
                var body = JSON.stringify(oRequest);
                this.aWatch.push(
                    {
                        method:'POST',
                        url:sURL,
                        body:body,
                        headers:[
                            {header:'Content-Type', value:'application/json'},
                            {header:'Content-Length', value:body.length},
                            {header:'Content-ID', value:md5(sURL + body) }
                        ]
                    }
                );
            }
            return this;
        }
    };

    gcal.Events = Events;
}(gcal); 
