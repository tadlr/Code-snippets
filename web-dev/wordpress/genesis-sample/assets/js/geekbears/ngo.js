var _latitude = 39.880647; 
var _longitude = -99.639978;
var jsonPath = urlCompleta+'assets/json/organizer.json';

// Load JSON data and create Google Maps

$.getJSON(jsonPath)
        .done(function(json) {
            createHomepageGoogleMap(_latitude,_longitude,json);
        })
        .fail(function( jqxhr, textStatus, error ) {
            console.log(error);
        })
;

// Set if language is RTL and load Owl Carousel

$(window).load(function(){
    var rtl = false; // Use RTL
    initializeOwl(rtl);
});

autoComplete();