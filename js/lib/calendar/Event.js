if( gcal === undefined ){ var gcal = {}; }

!function(gcal){

    function Event( o ){
        this.kind                    = 'calendar#event';
        this.etag                    = '';
        this.id                      = '';
        this.status                  = '';
        this.htmlLink                = '';
        this.created                 = '';
        this.updated                 = '';
        this.summary                 = '';
        this.description             = '';
        this.location                = '';
        this.colorId                 = '';
        this.creator                 = new Event.Attendee();
        this.organizer               = new Event.Attendee();
        this.start                   = new Event.Date();
        this.end                     = new Event.Date();
        this.endTimeUnspecified      = false;
        this.recurrence              = [];
        this.recurringEventId        = '';
        this.originalStartTime       = new Event.Date();
        this.transparency            = '';
        this.visibility              = '';
        this.iCalUID                 = '';
        this.sequence                = 0;
        this.attendees               = [];
        this.attendeesOmitted        = false;
        this.extendedProperties      = new Event.ExtendedProperties();
        this.hangoutLink             = '';
        this.gadget                  = new Event.Gadget();
        this.anyoneCanAddSelf        = false;
        this.guestsCanInviteOthers   = false;
        this.guestsCanModify         = false;
        this.guestsCanSeeOtherGuests = true;
        this.privateCopy             = false;
        this.locked                  = false;
        this.reminders               = new Event.Reminders(); 
        this.source                  = new Event.Source();
        
        if( typeof(o) == 'object' ){
            this.copy(o);
        }
    };
    Event.prototype = {
        copy:function(o){
            this.kind                    = 'calendar#event';
            this.etag                    = o.etag;
            this.id                      = o.id;
            this.status                  = o.status;
            this.htmlLink                = o.htmlLink;
            this.created                 = o.created;
            this.updated                 = o.updated;
            this.summary                 = o.summary;
            this.description             = o.description;
            this.location                = o.location;
            this.colorId                 = o.colorId;
            this.creator                 = new Event.Attendee(o.creator);
            this.organizer               = new Event.Attendee(o.organizer);
            this.start                   = new Event.Date(o.start);
            this.end                     = new Event.Date(o.end);
            this.endTimeUnspecified      = o.endTimeUnspecified;
            this.recurrence              = o.recurrence;
            this.recurringEventId        = o.recurringEventId;
            this.originalStartTime       = new Event.Date(o.originalStartTime);
            this.transparency            = o.transparency;
            this.visibility              = o.visibility;
            this.iCalUID                 = o.iCalUID;
            this.sequence                = o.sequence;
            this.attendees               = o.attendees;
            this.attendeesOmitted        = o.attendeesOmitted;
            this.extendedProperties      = new Event.ExtendedProperties(o.extendedProperties);
            this.hangoutLink             = o.hangoutLink;
            this.gadget                  = new Event.Gadget(o.gadget);
            this.anyoneCanAddSelf        = o.anyoneCanAddSelf;
            this.guestsCanInviteOthers   = o.guestsCanInviteOthers;
            this.guestsCanModify         = o.guestsCanModify;
            this.guestsCanSeeOtherGuests = o.guestsCanSeeOtherGuests;
            this.privateCopy             = o.privateCopy;
            this.locked                  = o.locked;
            this.reminders               = new Event.Reminders(o.reminders); 
            this.source                  = new Event.Source(o.source);
            return this;
        },
        clone:function(){
            return this.copy(this);
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
        getStatus:function(){
            return this.status;
        },
        getHtmlLink:function(){
            return this.htmlLink;
        },
        getCreated:function(){
            return this.created;
        },
        getUpdated:function(){
            return this.updated;
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
        getColorId:function(){
            return this.colorId;
        },
        getCreator:function(){
            return this.creator;
        },
        getOrganizer:function(){
            return this.organizer;
        },
        getStart:function(){
            return this.start;
        },
        getEnd:function(){
            return this.end;
        },
        getEndTimeUnspecified:function(){
            return this.endTimeUnspecified;
        },
        getRecurrence:function(){
            return this.recurrence;
        },
        getRecurringEventId:function(){
            return this.recurringEventId;
        },
        getOriginalStartTime:function(){
            return this.originalStartTime;
        },
        getTransparency:function(){
            return this.transparency;
        },
        getVisibility:function(){
            return this.visibility;
        },
        getICalUID:function(){
            return this.iCalUID;
        },
        getSequence:function(){
            return this.sequence;
        },
        getAttendees:function(){
            return this.attendees;
        },
        getAttendeesOmitted:function(){
            return this.attendeesOmitted;
        },
        getExtendedProperties:function(){
            return this.extendedProperties;
        },
        getHangoutLink:function(){
            return this.hangoutLink;
        },
        getGadget:function(){
            return this.gadget;
        },
        getAnyoneCanAddSelf:function(){
            return this.anyoneCanAddSelf;
        },
        getGuestsCanInviteOthers:function(){
            return this.guestsCanInviteOthers;
        },
        getGuestsCanModify:function(){
            return this.guestsCanModify;
        },
        getGuestsCanSeeOtherGuests:function(){
            return this.guestsCanSeeOtherGuests;
        },
        getPrivateCopy:function(){
            return this.privateCopy;
        },
        getLocked:function(){
            return this.locked;
        },
        getReminders:function(){
            return this.reminders;
        },
        getSource:function(){
            return this.source;
        },

        setEtag:function( etag ){
            this.etag = etag;
        },
        setId:function( id ){
            this.id = id;
        },
        setStatus:function( status ){
            this.status = status;
        },
        setHtmlLink:function( htmlLink ){
            this.htmlLink = htmlLink;
        },
        setCreated:function( created ){
            this.created = created;
        },
        setUpdated:function( updated ){
            this.updated = updated;
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
        setColorId:function( colorId ){
            this.colorId = colorId;
        },
        setCreator:function( creator ){
            this.creator = creator;
        },
        setOrganizer:function( organizer ){
            this.organizer = organizer;
        },
        setStart:function( start ){
            this.start = start;
        },
        setEnd:function( end ){
            this.end = end;
        },
        setEndTimeUnspecified:function( endTimeUnspecified ){
            this.endTimeUnspecified = endTimeUnspecified;
        },
        setRecurrence:function( recurrence ){
            this.recurrence = recurrence;
        },
        setRecurringEventId:function( recurringEventId ){
            this.recurringEventId = recurringEventId;
        },
        setOriginalStartTime:function( originalStartTime ){
            this.originalStartTime = originalStartTime;
        },
        setTransparency:function( transparency ){
            this.transparency = transparency;
        },
        setVisibility:function( visibility ){
            this.visibility = visibility;
        },
        setICalUID:function( iCalUID ){
            this.iCalUID = iCalUID;
        },
        setSequence:function( sequence ){
            this.sequence = sequence;
        },
        setAttendees:function( attendees ){
            this.attendees = attendees;
        },
        setAttendeesOmitted:function( attendeesOmitted ){
            this.attendeesOmitted = attendeesOmitted;
        },
        setExtendedProperties:function( extendedProperties ){
            this.extendedProperties = extendedProperties;
        },
        setHangoutLink:function( hangoutLink ){
            this.hangoutLink = hangoutLink;
        },
        setGadget:function( gadget ){
            this.gadget = gadget;
        },
        setAnyoneCanAddSelf:function( anyoneCanAddSelf ){
            this.anyoneCanAddSelf = anyoneCanAddSelf;
        },
        setGuestsCanInviteOthers:function( guestsCanInviteOthers ){
            this.guestsCanInviteOthers = guestsCanInviteOthers;
        },
        setGuestsCanModify:function( guestsCanModify ){
            this.guestsCanModify = guestsCanModify;
        },
        setGuestsCanSeeOtherGuests:function( guestsCanSeeOtherGuests ){
            this.guestsCanSeeOtherGuests = guestsCanSeeOtherGuests;
        },
        setPrivateCopy:function( privateCopy ){
            this.privateCopy = privateCopy;
        },
        setLocked:function( locked ){
            this.locked = locked;
        },
        setReminders:function( reminders ){
            this.reminders = reminders;
        },
        setSource:function( source ){
            this.source = source;
        }
    };

    Event.Attendee = function(o){
        this.id          = '';
        this.email       = '';
        this.displayName = '';
        this.self        = false;
        this.resource    = false;
        this.optional    = true;
        this.responseStatus = '';
        this.comment     = '';
        this.additionalGuests = 0;
        if( typeof(o) == 'object' ){
            this.copy(o);
        }
    };
    Event.Attendee.prototype = {
        copy:function(o){
            this.id               = o.id;
            this.email            = o.email;
            this.displayName      = o.displayName;
            this.self             = o.self;
            this.resource         = o.resource;
            this.optional         = o.optional;
            this.responseStatus   = o.responseStatus;
            this.comment          = o.comment;
            this.additionalGuests = o.additionalGuests;
            return this;
        },
        clone:function(){
            return this.copy(this);
        }
    };

    /***********************
        The dateTime field is a string representing a date-time in the (RFC 3339) format "yyyy-mm-ddTHH:MM:ss" with an optional milliseconds and offset elements. The following examples are valid values:

            2011-06-03T10:00:00 — no milliseconds and no offset.
            2011-06-03T10:00:00.000 — no offset.
            2011-06-03T10:00:00-07:00 — no milliseconds with a numerical offset.
            2011-06-03T10:00:00Z — no milliseconds with an offset set to 00:00.
            2011-06-03T10:00:00.000-07:00 — with milliseconds and a numerical offset.
            2011-06-03T10:00:00.000Z — with milliseconds and an offset set to 00:00.

        If an offset is not provided when creating, importing or updating an event, the timeZone field has to be set to a valid time zone value.
        
        Date.js
            new Date().toString("yyyy-MM-ddTHH:mm:ssZ");  // "2008-04-13T04:11:05Z"
    *************************/
    Event.Date = function(o){
        this.date     = undefined;//"yyyy-mm-dd"
        this.dateTime = undefined;//yyyy-mm-ddTHH:MM:ss
        this.timeZone = undefined;

        if( typeof(o) == 'object' ){
            this.copy(o);
        }
    };
    Event.Date.prototype = {
        copy:function(o){
            this.date     = o.date;
            this.dateTime = o.dateTime;
            this.timeZone = o.timeZone;
            return this;
        },
        clone:function(){
            return this.copy(this);
        }
    };

    Event.ExtendedProperties = function(o){
        this.private = {
            //(key): string
        };
        this.shared = {
            //(key): string
        };
        if( typeof(o) == 'object' ){
            this.copy(o);
        }
    };
    Event.ExtendedProperties.prototype = {
        copy:function(o){
            this.private = o.private;
            this.shared  = o.shared;
            return this;
        },
        clone:function(){
            return this.copy(this);
        }
    };

    Event.Gadget = function(o){
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
        if( typeof(o) == 'object' ){
            this.copy(o);
        }
    };
    Event.Gadget.prototype = {
        copy:function(o){
            this.type        = o.type;
            this.title       = o.title;
            this.link        = o.link;
            this.iconLink    = o.iconLink;
            this.width       = o.width;
            this.height      = o.height;
            this.display     = o.display;
            this.preferences = o.preferences;
            return this;
        },
        clone:function(){
            return this.copy(this);
        }
    };


    Event.Reminders = function(o){
        this.useDefault = false;
        this.overrides  = [];
        if( typeof(o) == 'object' ){
            this.copy(o);
        }
    };
    Event.Reminders.prototype = {
        copy:function(o){
            this.useDefault = o.useDefault;
            this.overrides  = o.overrides;
            return this;
        },
        clone:function(){
            return this.copy(this);
        }
    };

    Event.Reminders.Overrides = function(o){
        this.method  = ''; //"email" - Reminders are sent via email.  "sms" - Reminders are sent via SMS.  "popup"
        this.minutes = 0;
        if( typeof(o) == 'object' ){
            this.copy(o);
        }
    };
    Event.Reminders.Overrides.prototype = {
        copy:function(o){
            this.method  = o.method;
            this.minutes = o.minutes;
            return this;
        },
        clone:function(){
            return this.copy(this);
        }
    };

    Event.Source = function(o){
        this.url   = '';
        this.title = '';
        if( typeof(o) == 'object' ){
            this.copy(o);
        }
    };
    Event.Source.prototype = {
        copy:function(o){
            this.url   = o.url;
            this.title = o.title;
            return this;
        },
        clone:function(){
            return this.copy(this);
        }
    };

    gcal.Event = Event;
}(gcal);
