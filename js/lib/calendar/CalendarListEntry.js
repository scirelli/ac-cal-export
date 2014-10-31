if( gcal === undefined ){ var gcal = {}; }

!function(gcal){
    function CalendarListEntry( oCalendarListEntry ){
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

        if( oCalendarListEntry && typeof(oCalendarListEntry) == 'object' ){
            this.copy(oCalendarListEntry);
        }
    };

    CalendarListEntry.prototype = {
        copy:function(o){
            //this.setKind(o.kind);
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
            this.setPrimary(o.primary);
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

    gcal.CalendarListEntry = CalendarListEntry;
}(gcal);
