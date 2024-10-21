var _latitude = 31.557257; 
var _longitude = -105.436276;
var jsonPath = urlCompleta+'assets/json/student.json';

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
