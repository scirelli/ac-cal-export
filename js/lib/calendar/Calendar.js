    /*
    var TimeZone = {
        //this gives me offsets so I don't need timezone strings
        //datejsTimeZones = [{"name":"UTC","offset":"-000"},{"name":"GMT","offset":"-000"},{"name":"EST","offset":"-0500"},{"name":"EDT","offset":"-0400"},{"name":"CST","offset":"-0600"},{"name":"CDT","offset":"-0500"},{"name":"MST","offset":"-0700"},{"name":"MDT","offset":"-0600"},{"name":"PST","offset":"-0800"},{"name":"PDT","offset":"-0700"}];
        '':{'zone':"America/New_York", 	'note':"Eastern Time"},
        '':{'zone':"America/Detroit", 	'note':"Eastern Time - Michigan - most locations"},
        '':{'zone':"America/Kentuc", 'note':"ky/Louisville 	Eastern Time - Kentucky - Louisville area"},
        '':{'zone':"America/Kentuc", 'note':'note':"ky/Monticello 	Eastern Time - Kentucky - Wayne County"},
        '':{'zone':"America/India",'note':"na/Indianapolis 	Eastern Time - Indiana - most locations"},
        '':{'zone':"America/India",'note':"na/Vincennes 	Eastern Time - Indiana - Daviess, Dubois, Knox & Martin Counties"},
        '':{'zone':"America/India",'note':"na/Winamac 	Eastern Time - Indiana - Pulaski County"},
        '':{'zone':"America/India",'note':"na/Marengo 	Eastern Time - Indiana - Crawford County"},
        '':{'zone':"America/India",'note':"na/Petersburg 	Eastern Time - Indiana - Pike County"},
        '':{'zone':"America/India",'note':"na/Vevay 	Eastern Time - Indiana - Switzerland County"},
        '':{'zone':"America/Chicago",'note': 	"Central Time"},
        '':{'zone':"America/India",'note':"na/Tell_City 	Central Time - Indiana - Perry County"},
        '':{'zone':"America/India",'note':"na/Knox 	Central Time - Indiana - Starke County"},
        '':{'zone':"America/Menominee",'note': 	"Central Time - Michigan - Dickinson, Gogebic, Iron & Menominee Counties"},
        '':{'zone':"America/North_Dako",'note':"ta/Center 	Central Time - North Dakota - Oliver County"},
        '':{'zone':"America/North_Dako",'note':"ta/New_Salem 	Central Time - North Dakota - Morton County (except Mandan area)"},
        '':{'zone':"America/North_Dako",'note':"ta/Beulah 	Central Time - North Dakota - Mercer County"},
        '':{'zone':"America/Denver",'note': 	"Mountain Time"},
        '':{'zone':"America/Boise",'note': 	"Mountain Time - south Idaho & east Oregon"},
        '':{'zone':"America/Phoenix",'note': 	"Mountain Standard Time - Arizona (except Navajo)"},
        '':{'zone':"America/Los_Angeles",'note': 	"Pacific Time"},
        '':{'zone':"America/Anchorage",'note': 	"Alaska Time"},
        '':{'zone':"America/Juneau",'note': 	"Alaska Time - Alaska panhandle"},
        '':{'zone':"America/Sitka",'note': 	"Alaska Time - southeast Alaska panhandle"},
        '':{'zone':"America/Yakutat",'note': 	"Alaska Time - Alaska panhandle neck"},
        '':{'zone':"America/Nome",'note': 	"Alaska Time - west Alaska"},
        '':{'zone':"America/Adak",'note': 	"Aleutian Islands"},
        '':{'zone':"America/Metlakatla",'note': 	"Metlakatla Time - Annette Island"},
        '':{'zone':"Pacific/Honolulu",'note': 	"Hawaii"}
    };
    */
if( gcal === undefined ){ var gcal = {}; }

!function(gcal){
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
    
    gcal.Calendar = Calendar;
}(gcal);
