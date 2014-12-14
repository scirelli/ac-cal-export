if( gcal === undefined ){ var gcal = {}; }

!function(gcal){
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
        this.aAll    = [];
    }

    Calendars.prototype = {
        execute:function(){
            var aAll = this.aAll; //Array.prototpye.concat.call( this.aClear, this.aDelete, this.aGet, this.aInsert, this.aPatch, this.aUpdate );
                batchRequest = new gcal.GoogleAPIRequest();
            this.aAll = [];
            return batchRequest.execute( aAll );
        },
        //Returns metadata for a calendar
        get:function( id ){
            var sURL     = this.sCalendarsURL,
                deferred = Q.defer();

            if(id){ 
                sURL += id;
            }
            this.aAll.push(
                {
                    method:'GET',
                    url:sURL,
                    headers:[
                        //{header:'Content-Type', value:'application/http'},
                    ],
                    deferred:deferred
                }
            );

            return deferred.promise.then(function( oResponse ){
                //If successful you get a Calendars resource
                return oResponse;
            });
        },
        //Clears a primary calendar. This operation deletes all data associated with the primary calendar of an account and cannot be undone
        clear:function( primary /* string: 'primary' */ ){
            var sURL     = this.sCalendarsURL,
                deferred = Q.defer();

            if( primary == 'primary' ){
                sURL += primary + '/clear';
            
                this.aAll.push(
                    {
                        method:'POST',
                        url:sURL,
                        headers:[],
                        deferred:deferred
                    }
                );
            }
            return deferred.promise.then(function( oResponse ){
                return oResponse;
            });
        },
        //Creats a secondary calendar
        insert:function( oCalendar ){
            var sURL     = this.sCalendarsURL,
                deferred = Q.defer();
            
            if( oCalendar ){
                var body = JSON.stringify(oCalendar);
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
                return new gcal.Calendar(oResponse);
            });
        },

        //Deletes a secondary calendar
        delete:function( id ){
            var sURL     = this.sCalendarsURL + id,
                deferred = Q.defer();

            if( id ){
                this.aAll.push(
                    {
                        method:'DELETE',
                        url:sURL,
                        headers:[],
                        deferred:deferred
                    }
                );
            }
            return deferred.promise;
        },
        //Updates metadata for a calendar.
        patch:function( id, oPatch ){
            var sURL     = this.sCalendarsURL + id,
                deferred = Q.defer();

            if( id && oPatch ){
                var body = JSON.stringify(oPatch);
                this.aAll.push(
                    {
                        method:'PATCH',
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
                return new gcal.Calendar(oResponse);
            });
        },
        //Updates metadata for a calendar. can udpate the summary. Summary seems to be required
        update:function( id, oUpdate ){
            var sURL     = this.sCalendarsURL + id,
                deferred = Q.defer();

            if( id && oUpdate ){
                var body = JSON.stringify(oUpdate);
                this.aAll.push(
                    {
                        method:'PUT',
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
                return new gcal.Calendar(oResponse);
            });
        }
    }
    gcal.Calendars = Calendars;
}(gcal);
