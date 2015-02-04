;
(function() {

    function EtsyShop(api_key) {
        this.api_key = api_key;
        this.listings = [];

        var self = this;
        var etsyRouter = Backbone.Router.extend({
            routes: {
                ":listing_id": "getListingInfo",

            },
            getListingInfo: function(listing_id) {
                self.getListingInfo(listing_id);
                alert();
                document.querySelector(".main").style.opacity = "1";
            },

            initialize: function() {
                Backbone.history.start();
            }
        })
        var router = new etsyRouter();

        this.draw();
    };


    EtsyShop.prototype = {
        URLs: {
            listings: "https://openapi.etsy.com/v2/listings/active.js?callback=$&api_key=f15u1lv3m0cck4st1213vuqk"
        },
        draw: function(){}
    }

    window.EtsyShop = EtsyShop;

})();
