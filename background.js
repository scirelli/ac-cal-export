// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  // If the letter 'g' is found in the tab's URL...
  if (tab.url.indexOf('aircraftclubs.com') > -1) {
    chrome.pageAction.setPopup({
        tabId:tabId,
        popup:'aircraftclubs_popup.html'
    });
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.runtime.onMessage.addListener(function( oResponse, sender, sendResponse) {
    //console.log(sender.tab ?  "from a content script:" + sender.tab.url : "from the extension");
    console.log("Scraped: ");
    console.log(oResponse);

    //Group by booker
    if( oResponse.success ){
        acc.export(oResponse.data);
    }
    return true;
});

//Name space for this app
var acc = function(){
    var tz = jstz.determine().name(); // Determines the time zone of the browser client
    
    function exportToGCal( oData ){
        var oResMap         = resGroupByCallSign(oData.aInst.concat(oData.aPlanes)),
            oEventDateRange = { nStart:oData.nStart, nEnd:oData.nEnd, sStart:oData.sStart, sEnd:oData.sEnd };
   
        attachGCalendarsToScrappedResources(oResMap)
          .then(function(o){
            return attachGCalEventsToScrappedResources( oResMap, oEventDateRange );
        }).then(function(o){
            return removeAlreadyCreatedEventsFromMap( oResMap );
        }).then(function(o){
            return insertScrapedEventsToGCal( oResMap );
        }).done();
    }

    function attachGCalendarsToScrappedResources( oResMap ){
        var calList = new gcal.CalendarList(),
            promise = null;

        promise = calList.list().then(function( aList ){
            var oCalListMap = oCalListMap = calGroupBySummary( aList ),
                aNoCLE      = [],
                cal         = new gcal.Calendars(),
                aPromises   = [];

            for( var callSign in oResMap ){
                if( oResMap.hasOwnProperty(callSign) && oCalListMap.hasOwnProperty(callSign) ){
                    oResMap[callSign].cle = oCalListMap[callSign].cle;
                }else{
                    aNoCLE.push( oResMap[callSign] );
                }
            }

            for( var i=0,l=aNoCLE.length,itm=null,evt=null; i<l; i++ ){
                itm = aNoCLE[i];
                evt = itm.events[0];
                aPromises.push( cal.insert( scrapedEventToCalObj(evt) ).then(function( oCal ){
                    oResMap[oCal.summary].cle = [oCal];
                    return oCal.summary;
                }));
            }
            cal.execute();
            return Q.allSettled(aPromises);
        });
        calList.execute();

        return promise;
    }
    
    function removeAlreadyCreatedEventsFromMap( oResMap ){
        for( var sRes in oResMap ){
            var gCalEventsMap = {};
            if( oResMap.hasOwnProperty(sRes) ){
                oResMap[sRes].cle[0].events.items.forEach(function( currentValue, index, array ){
                    var key = currentValue.summary + currentValue.start.dateTime + currentValue.end.dateTime;
                    gCalEventsMap[key] = true;
                });
                oResMap[sRes].events = oResMap[sRes].events.filter(function( element ){
                    var key = element.booker + element.start + element.end;
                    return gCalEventsMap[key] ? false : true;
                });
            }
        }
        /*
         * summary
         * desctiption
         * start { dateTime }
         * end { dateTime }
         */
        return true;
    }
    
    function attachGCalEventsToScrappedResources( oResMap, oEventDateRange ){
        var events    = new gcal.Events(),
            aPromises = [],
            tmp       = null;

        for( var sRes in oResMap ){
            if( oResMap.hasOwnProperty(sRes) ){
                !function(sRes){
                    aPromises.push(events.list(oResMap[sRes].cle[0].id, {minTime:oEventDateRange.sStart, maxTime:oEventDateRange.sEnd}).then(
                        function(evnts){
                            console.log(evnts);
                            oResMap[sRes].cle[0].events = evnts;
                        },
                        function( reason ){ console.log(reason); }
                    ));
                    events.execute();
                }(sRes);
            }
        }

        return Q.allSettled(aPromises);
    }

    function insertScrapedEventsToGCal( oResMap ){
        var aPromises = [],
            events    = new gcal.Events(),
            aRes      = [];

        debugger;
        for( var sRes in oResMap ){
            if( oResMap.hasOwnProperty(sRes) ){
                aRes = oResMap[sRes].events;
                aRes.forEach(function( element ){
                    aPromises.push(events.insert( oResMap[sRes].cle[0].id, {
                        summary:element.booker,
                        start: new gcal.Event.Date({
                            dateTime:element.start
                        }),
                        end: new gcal.Event.Date({
                            dateTime:element.end
                        })
                    }));
                });
            }
        }
        events.execute();
        return Q.allSettled(aPromises);
    }

    function resGroupByBooker( aoEvents ){
        var oMap = {};
        for( var i=0,l=aoEvents.length,itm=null; i<l; i++ ){
            itm = aoEvents[i];
            if( oMap.hasOwnProperty(itm.booker) ){
                oMap[itm.booker].push(itm);
            }else{
                oMap[itm.booker] = [itm];
            }
        }
        return oMap;
    }

    function resGroupByCallSign( aResouces ){
        var oMap = {};
        for( var i=0,l=aResouces.length,itm=null,res={}; i<l; i++ ){
            itm = aResouces[i];
            if( itm.oInstructor ) res = itm.oInstructor;
            if( itm.oAircraft ) res = itm.oAircraft;

            if( oMap.hasOwnProperty( res.callSign ) ){
                oMap[res.callSign].events.push( itm );
            }else{
                oMap[res.callSign] = { events:[itm] };
            }
        }
        return oMap;
    }

    function calGroupBySummary( aCalListEntry ){
        var oMap = {};
        for( var i=0,l=aCalListEntry.length,itm=null,res={}; i<l; i++ ){
            itm = aCalListEntry[i];

            if( oMap.hasOwnProperty( itm.summary ) ){
                oMap[itm.summary].cle.push( itm );
            }else{
                oMap[itm.summary] = { cle:[itm] };
            }
        }
        return oMap;
    }

    function scrapedEventToCalObj( oEvt ){
        var str = "",
            callSign = "";
        try{
            if( oEvt.oInstructor ){
                callSign = oEvt.oInstructor.callSign;
                str += "Instructor: " + oEvt.oInstructor.name + "\n" +
                       "Call Sign: " + oEvt.oInstructor.callSign + "\n"
            }else if( oEvt.oAircraft ){
                callSign = oEvt.oAircraft.callSign;
                str += "Aircraft: " + oEvt.oAircraft.name + "\n" +
                       "Call Sign: " + oEvt.oAircraft.callSign + "\n" +
                       "Tail#: " + oEvt.oAircraft.tailNumber + "\n"
            }
        }catch( e ){}
        return {
            summary:callSign,
            description:str,
            timeZone:tz
        };
    }

    return { 
        export:exportToGCal
    }
}();
