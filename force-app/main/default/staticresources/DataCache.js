window.cache = (function() {
    var values = {};

    return {
        set: function(name, data) {
            values[name] = data;
        },

        get: function(name) {
            return values[name];
        },
    };
})();
