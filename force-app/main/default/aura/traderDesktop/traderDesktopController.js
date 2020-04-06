({
    handleMessage: function (component, event, helper) {
        var message = event.getParams();
        var watchLists = [
            ['GM', 'GE', 'MCD', 'UAL'],
            ['WMT', 'AAL', 'LLY', 'JPM'],
            ['BAC', 'BA', 'GE', 'AAL']
        ];
        var msg = {
            name: 'General',
            watchLists: watchLists
        };
        component.find('jsApp').message(msg);
    },

    handleError: function (component, event, helper) {}
});
