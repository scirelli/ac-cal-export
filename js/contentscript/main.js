var acc = function( acc ){
"use strict";
    function scrape(){
    "use strict";
        var oBottomframe    = document.querySelector('frameset frame[name="bottomframe"]').contentDocument,
            oRightframe     = oBottomframe.querySelector('frameset frame[name="rightframe"]').contentDocument,
            oResourceSelect = oRightframe.querySelector('select[name="id"]'),
            oMonth          = oRightframe.querySelector('body > form > table:nth-child(4) > tbody > tr > td:nth-child(4) > font > strong'),
            oYear           = oRightframe.querySelector('body > form > table:nth-child(4) > tbody > tr > td:nth-child(8) > font > strong'),
            oCal            = oRightframe.querySelector('body > form > table:nth-child(5)'),
            oWeeks          = oRightframe.querySelectorAll('body > form > table:nth-child(5) > tbody > tr'),
            oDays           = oRightframe.querySelectorAll('body > form > table:nth-child(5) > tbody > tr > td'),
            //sMonth          = oMonth.innerText,
            sMonth          = parseInt(oRightframe.querySelector('input[name="M"]').value),
            //nYear           = parseInt(oYear.innerText),
            nYear           = parseInt(oRightframe.querySelector('input[name="Y"]').value),
            sResource       = oResourceSelect.selectedOptions[0].innerText,
            oResource       = {};

        oResource.name = sResource;
        oResource.aCal = [];

        for( var i=0,l=oDays.length,info=null,nDay=0,oDay={}; i<l; i++ ){
            info = oDays[i].querySelectorAll('a');
            nDay = info[0];
            if( nDay ){
                oDay = {
                    date:'',
                    events:[] 
                };
                nDay = parseInt(nDay.innerText);
                oDay.date = sMonth + '/' + nDay + '/' + nYear;

                for( var j=1,jl=info.length,oEvent=null,event=null; j<jl; j++ ){
                    oEvent = {};
                    event = info[j].innerText.split(' ');
                    
                    oEvent.time = event.pop();
                    oEvent.time = oEvent.time.split('-');
                    oEvent.sResource = event.join(' ');
                    oDay.events.push(oEvent);
                }
                oResource.aCal.push(oDay);
            }
        }

        //console.log(oResource);
        return oResource;
    };

    function scrapeNew( sAircraftId, sInstructorId ){
        var url         = 'https://new.aircraftclubs.com/functions/booking/getBookingsForCalendar.php?p=&a={{aircraft}}&i={{instructor}}&e=0&f=a&start=1409457600&end=1413086400&_={{date}}',
            dDate       = new Date();

        sAircraftId   = sAircraftId   || 0;
        sInstructorId = sInstructorId || 0;
        
        function makeRequest( url ){
            var xhr      = new XMLHttpRequest(),
                deferred = Q.defer();
            xhr.open('GET', url);
            xhr.onload = function makeRequestOnload(){
                if (this.status === 200) {
                    deferred.resolve({responseText:this.responseText, response:this.response, responseXML:this.responseXML, status:this.status});
                } else {
                    deferred.reject(new Error("Status code was " + this.status));
                }
            };
            xhr.onerror = function makeRequestOnerror(){
                deferred.reject(new Error("Can't XHR " + JSON.stringify(url)));
            };
            xhr.onprogress = function makeRequestOnprogress(event){
                deferred.notify(event.loaded/event.total);
            };
            xhr.send();
            return deferred.promise;
        };

        return makeRequest( url.mustache({
            aircraft:sAircraftId,
            instructor:sInstructorId,
            date:dDate.getTime()
        })).then(
            function( response ){
                var deferred = Q.defer(),
                    data     = [],
                    obj      = [];

                if( response.status == '200' ){
                    data = JSON.parse(response.responseText);
                    for( var i=0,l=data.length,itm=null,span=document.createElement('span'),booker='',plane=false,instructor=false; i<l; i++ ){
                        itm = data[i];

                        span.innerHTML = itm.title;

                        booker     = span.querySelector('.bookingPilot');
                        booker     = booker ? booker.innerText : '';
                        plane      = span.querySelector('.airplane') ? true : false;
                        instructor = span.querySelector('.headset')? true : false;

                        obj.push({
                            dStart: new Date(itm.start),
                            dEnd:   new Date(itm.end),
                            start:  itm.start,
                            end:    itm.end,
                            id:     itm.id,
                            booker:booker,
                            plane:plane,
                            instructor:instructor
                        });
                    }
                    obj.sort(function(a,b){
                        return a.dStart.getTime() - b.dStart.getTime();
                    });
                    deferred.resolve( obj );
                }else{
                    deferred.reject( {error:{status:response.status, response:response} } );
                }
                return deferred.promise;
            }
        );
    };

    return {
        scrape:scrapeNew
    };
}( acc );

chrome.extension.onMessage.addListener( function(request, sender, sendResponse ){
    switch( request.command ){
    case "scrape":
        acc.scrape( request.sAircraftId, request.sInstructorId ).then(
            function( data ){
                debugger;
                if( data.error ){
                    sendResponse({success:false, data:data});
                }else{
                    sendResponse({success:true, data:data});
                }
            },
            function( reject ){
                console.log('rejected.');
                console.log(reject);
                sendResponse({success:false, data:reject});
            }
        ).done();
        break;
    default:
        sendResponse({success:false});
    }
    return true;
});
