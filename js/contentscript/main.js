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

chrome.extension.onRequest.addListener( function(request, sender, sendResponse ){
    switch( request.command ){
    case "scrape":
        var data = scrape();
        sendResponse({success:true, data:data});
        break;
    default:
        sendResponse({success:false});
    }
});
