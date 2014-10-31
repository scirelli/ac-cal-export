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
                            {header:'Content-Type', value:'application/http'},
                            {header:'Content-ID', value:md5(sURL)}
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
                            {header:'Content-Type', value:'application/http'},
                            {header:'Content-ID', value:md5(sURL)}
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
                            {header:'Content-Type', value:'application/http'},
                            {header:'Content-ID', value:md5(sURL)}
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
                            {header:'Content-Type', value:'application/json'},
                            {header:'Content-Length', value:body.length},
                            {header:'Content-ID', value:md5(sURL + body) }
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
                            {header:'Content-Type', value:'application/json'},
                            {header:'Content-Length', value:body.length},
                            {header:'Content-ID', value:md5(sURL + body) }
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
                            {header:'Content-Type', value:'application/json'},
                            {header:'Content-Length', value:body.length},
                            {header:'Content-ID', value:md5(sURL + body) }
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
    gcal.Calendars = Calendars;
}(gcal);
