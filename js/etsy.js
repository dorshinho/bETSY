;
(function() {

    function EtsyClient(api_key) {
        this.api_key = api_key;

        var self = this;
        var etsyRouter = Backbone.Router.extend({
            routes: {
                "listing/:id": "details",
                /// ...
                "*default": "home" // default route if nothing above matches
            },
            home: function() {
                self.drawHome();
            },
            details: function(id) {
                self.drawDetails(id)

            },
            initialize: function() {
                Backbone.history.start();
            }
        })
        var router = new etsyRouter();
    };


    EtsyClient.prototype = {
        drawHome: function() {
            // 1. setup url
            var url = "https://openapi.etsy.com/v2/listings/active.js?includes=Images&api_key=" + this.api_key + "&callback=?";
            // 2. make the request to Etsy and to load the template
            var etsyPromise = $.getJSON(url).then(function(d) {
                    return d
                })
                /// load template
            var template = "./templates/search.html"
            var templatePromise = $.get(template).then(function(d) {
                return d
            })

            // 3. write to DOM
            $.when(etsyPromise, templatePromise).then(function(data, html) {
                var templatingFn = _.template(html);
                document.querySelector(".container").innerHTML = templatingFn(data);
            })
        },
        drawDetails: function(id) {
            // 1. setup url
            var url = "https://openapi.etsy.com/v2/listings/" + id + ".js?includes=Images&api_key=" + this.api_key + "&callback=?";


            var etsyPromise = $.getJSON(url).then(function(d) {
                return d
            })
            var template = "./templates/details.html"
            var templatePromise = $.get(template).then(function(d) {
                return d
            })
            $.when(etsyPromise, templatePromise).then(function(data, html) {
                var templatingFn = _.template(html);
            document.querySelector(".container").innerHTML = templatingFn(data);
            })
        },



    };




    window.EtsyClient = EtsyClient;

})();
