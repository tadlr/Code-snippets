"use strict";
var $ = jQuery.noConflict();

var mapStyles = urlCompleta+'assets/json/map-style.json';

// Set map height to 100% ----------------------------------------------------------------------------------------------

var $body = $('body');
if ($body.hasClass('map-fullscreen')) {
    if ($(window).width() > 768) {
        $('.map-canvas').height($(window).height() - $('.header').height());
    }
    else {
        $('.map-canvas #map').height($(window).height() - $('.header').height());
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Homepage map - Google
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createHomepageGoogleMap(_latitude, _longitude, originalJson) {
    $.get(urlCompleta + "assets/external/_infobox.js", function () {
        gMap();
    });
    function gMap() {
        var mapCenter = new google.maps.LatLng(_latitude, _longitude);
        var mapOptions = {
            zoom: 4,
            center: mapCenter,
            disableDefaultUI: false,
            scrollwheel: false,
            styles: mapStyles,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.BOTTOM_CENTER
            },
            panControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.RIGHT_TOP
            }
        };
        var json = $.extend({}, originalJson);
        var mapElement = document.getElementById('map');
        var map = new google.maps.Map(mapElement, mapOptions);
        var newMarkers = [];
        var markerClicked = 0;
        var activeMarker = true;
        var lastClicked = true;


// Student Search --------------------------------------------------------------------------------

        // Handle search form submit 

        const formSelector = '#user-search-form';
        $(formSelector).on("submit", function (event) {
            // prevent for from submitting and refreshing the page
            event.preventDefault();
            var filters = $(formSelector).serializeArray().reduce(function (obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});

           /* var myMap = map
            window.myPlaceService = new google.maps.places.PlacesService(map)
            window.myAutoCompleteService = new google.maps.places.AutocompleteService()
            
        */

            console.log(filters);
            
            // set json with filtered data
            json.data = originalJson.data.filter((data) => {
                let shouldPass = false;
                let tests = [];
                for (const filter in filters) {
                    if (filters.hasOwnProperty(filter)) {
                        const filterValue = filters[filter];
                        // if the filter has a valid value
                        if(filterValue) {
                            let regex = new RegExp(filterValue,"gi");
                            tests.push(regex.test(data[filter]));
                        }
                    }
                }
                // code behid makes an "and" comparacion,
                // multiplying result above in series, at the end
                // if all tests have passed (have value 1), then result will be true
                shouldPass = tests.reduce((previous, test) => {
                    let number = test? 1 : 0;
                    return previous * number;
                }, 1)? true : false;
                return shouldPass;
            });

            // repaint markers and data
            loadMarkersAndData();
            redrawMap('google', map);
        })
    
 
        for (var i = 0; i < json.data.length; i++) {

            // Google map marker content -----------------------------------------------------------------------------------

            if (json.data[i].color) var color = json.data[i].color;
            else color = '';

            var markerContent = document.createElement('DIV');
            if (json.data[i].featured == 1) {
                markerContent.innerHTML =
                    '<div class="map-marker featured' + color + '">' +
                    '<div class="icon">' +
                    '<img src="' + json.data[i].type_icon + '">' +
                    '</div>' +
                    '</div>';
            }
            else {
                markerContent.innerHTML =
                    '<div class="map-marker ' + json.data[i].color + '">' +
                    '<div class="icon">' +
                    '<!--<img src="' + json.data[i].type_icon + '">--><i class="' + json.data[i].MapIcon + ' MapIcon"> </i>' +
                    '</div>' +
                    '</div>';
            }

            // Create marker on the map ------------------------------------------------------------------------------------

            var marker = new RichMarker({
                position: new google.maps.LatLng(json.data[i].latitude, json.data[i].longitude),
                map: map,
                draggable: false,
                content: markerContent,
                flat: true
            });

            newMarkers.push(marker);

            // Create infobox for marker -----------------------------------------------------------------------------------

            var infoboxContent = document.createElement("div");
            var infoboxOptions = {
                content: infoboxContent,
                disableAutoPan: false,
                pixelOffset: new google.maps.Size(-18, -42),
                zIndex: null,
                alignBottom: true,
                boxClass: "infobox",
                enableEventPropagation: true,
                closeBoxMargin: "0px 0px -30px 0px",
                closeBoxURL: "/wp-content/themes/genesis-sample/assets/img/close.png",
                infoBoxClearance: new google.maps.Size(1, 1)
            };

            // Infobox HTML element ----------------------------------------------------------------------------------------

            var category = json.data[i].category;
            infoboxContent.innerHTML = drawInfobox(category, infoboxContent, json, i);

            // Create new markers ------------------------------------------------------------------------------------------

            newMarkers[i].infobox = new InfoBox(infoboxOptions);

            // Show infobox after click ------------------------------------------------------------------------------------

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    google.maps.event.addListener(map, 'click', function (event) {
                        lastClicked = newMarkers[i];
                    });
                    activeMarker = newMarkers[i];
                    if (activeMarker != lastClicked) {
                        for (var h = 0; h < newMarkers.length; h++) {
                            newMarkers[h].content.className = 'marker-loaded';
                            newMarkers[h].infobox.close();
                        }
                        newMarkers[i].infobox.open(map, this);
                        newMarkers[i].infobox.setOptions({ boxClass: 'fade-in-marker' });
                        newMarkers[i].content.className = 'marker-active marker-loaded';
                        markerClicked = 1;
                    }
                }
            })(marker, i));

            // Fade infobox after close is clicked -------------------------------------------------------------------------

            google.maps.event.addListener(newMarkers[i].infobox, 'closeclick', (function (marker, i) {
                return function () {
                    activeMarker = 0;
                    newMarkers[i].content.className = 'marker-loaded';
                    newMarkers[i].infobox.setOptions({ boxClass: 'fade-out-marker' });
                }
            })(marker, i));
        }

        // Close infobox after click on map --------------------------------------------------------------------------------

        google.maps.event.addListener(map, 'click', function (event) {
            if (activeMarker != false && lastClicked != false) {
                if (markerClicked == 1) {
                    activeMarker.infobox.open(map);
                    activeMarker.infobox.setOptions({ boxClass: 'fade-in-marker' });
                    activeMarker.content.className = 'marker-active marker-loaded';
                }
                else {
                    markerClicked = 0;
                    activeMarker.infobox.setOptions({ boxClass: 'fade-out-marker' });
                    activeMarker.content.className = 'marker-loaded';
                    setTimeout(function () {
                        activeMarker.infobox.close();
                    }, 350);
                }
                markerClicked = 0;
            }
            if (activeMarker != false) {
                google.maps.event.addListener(activeMarker, 'click', function (event) {
                    markerClicked = 1;
                });
            }
            markerClicked = 0;
        });

        // Create marker clusterer -----------------------------------------------------------------------------------------

        /*var clusterStyles = [
            {
                url: urlCompleta+'assets/img/cluster.png',
                height: 34,
                width: 34
            }
        ];

        var markerCluster = new MarkerClusterer(map, newMarkers, { styles: clusterStyles, maxZoom: 19 });
        markerCluster.onClick = function(clickedClusterIcon, sameLatitude, sameLongitude) {
            return multiChoice(sameLatitude, sameLongitude, json);
        };*/

        // Dynamic loading markers and data from JSON ----------------------------------------------------------------------

        google.maps.event.addListener(map, 'idle', loadMarkersAndData);

        function loadMarkersAndData() {
            var visibleArray = [];
            let filteredJson = json;
            for (var i = 0; i < filteredJson.data.length; i++) {
                if (map.getBounds().contains(newMarkers[i].getPosition())) {
                    visibleArray.push(newMarkers[i]);
                    $.each(visibleArray, function (i) {
                        setTimeout(function () {
                            if (map.getBounds().contains(visibleArray[i].getPosition())) {
                                if (!visibleArray[i].content.className) {
                                    visibleArray[i].setMap(map);
                                    visibleArray[i].content.className += 'bounce-animation marker-loaded';
                                    markerCluster.repaint();
                                }
                            }
                        }, i * 50);
                    });
                } else {
                    newMarkers[i].content.className = '';
                    newMarkers[i].setMap(null);
                }
            }

            var visibleItemsArray = [];
            $.each(filteredJson.data, function (a) {
                if (map.getBounds().contains(new google.maps.LatLng(filteredJson.data[a].latitude, filteredJson.data[a].longitude))) {
                    var category = filteredJson.data[a].category;
                    pushItemsToArray(filteredJson, a, category, visibleItemsArray);
                }
            });

            // Create list of items in Results sidebar ---------------------------------------------------------------------

            $('.items-list .results').html(visibleItemsArray);

            // Check if images are cached, so will not be loaded again

            $.each(filteredJson.data, function (a) {
                if (map.getBounds().contains(new google.maps.LatLng(filteredJson.data[a].latitude, filteredJson.data[a].longitude))) {
                    is_cached(filteredJson.data[a].gallery[0], a);
                }
            });

            // Call Rating function ----------------------------------------------------------------------------------------

            rating('.results .item');

            var $singleItem = $('.results .item');
            $singleItem.hover(
                function () {
                    newMarkers[$(this).attr('id') - 1].content.className = 'marker-active marker-loaded';
                },
                function () {
                    newMarkers[$(this).attr('id') - 1].content.className = 'marker-loaded';
                }
            );
        }

        redrawMap('google', map);

        function is_cached(src, a) {
            var image = new Image();
            var loadedImage = $('.results li #' + json.data[a].id + ' .image');
            image.src = src;
            if (image.complete) {
                $(".results").each(function () {
                    loadedImage.removeClass('loading');
                    loadedImage.addClass('loaded');
                });
            }
            else {
                $(".results").each(function () {
                    $('.results li #' + json.data[a].id + ' .image').addClass('loading');
                });
                $(image).load(function () {
                    loadedImage.removeClass('loading');
                    loadedImage.addClass('loaded');
                });
            }
        }

        // Geolocation of user -----------------------------------------------------------------------------------------

        $('.geolocation1').on("click", function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success);
            } else {
                console.log('Geo Location is not supported');
            }
        });

        function success(position) {
            var locationCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(locationCenter);
            map.setZoom(14);

            var markerContent = document.createElement('DIV');
            markerContent.innerHTML =
                '<div class="map-marker">' +
                '<div class="icon">' +
                '</div>' +
                '</div>';

            // Create marker on the map ------------------------------------------------------------------------------------

            var marker = new RichMarker({
                position: locationCenter,
                map: map,
                draggable: false,
                content: markerContent,
                flat: true
            });

            marker.content.className = 'marker-loaded';

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                "latLng": locationCenter
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var lat = results[0].geometry.location.lat(),
                        lng = results[0].geometry.location.lng(),
                        placeName = results[0].address_components[0].long_name,
                        latlng = new google.maps.LatLng(lat, lng);

                    $("#location").val(results[0].formatted_address);
                }
            });

        }

        // Autocomplete address ----------------------------------------------------------------------------------------

        
       var input = document.getElementById('location');
        var autocomplete = new google.maps.places.Autocomplete(input, {
            types: ["(regions)"]
        });
        
        autocomplete.bindTo('bounds', map); 
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
                map.setCenter(bounds.getCenter());
            } else {
                map.setCenter(place.geometry.location);
                map.setCenter(bounds.getCenter());
            }

            //marker.setPosition(place.geometry.location);
            //marker.setVisible(true);

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }
        });

        

    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Item Detail Map - Google
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function itemDetailMap(json) {
    var mapCenter = new google.maps.LatLng(json.latitude, json.longitude);
    var mapOptions = {
        zoom: 14,
        center: mapCenter,
        disableDefaultUI: true,
        scrollwheel: false,
        styles: mapStyles,
        panControl: false,
        zoomControl: false,
        draggable: true
    };
    var mapElement = document.getElementById('map-detail');
    var map = new google.maps.Map(mapElement, mapOptions);
    if (json.type_icon) var icon = '<img src="' + json.type_icon + '">';
    else icon = '';

    // Google map marker content -----------------------------------------------------------------------------------

    var markerContent = document.createElement('DIV');
    markerContent.innerHTML =
        '<div class="map-marker">' +
        '<div class="icon">' +
        icon +
        '</div>' +
        '</div>';

    // Create marker on the map ------------------------------------------------------------------------------------

    var marker = new RichMarker({
        position: new google.maps.LatLng(json.latitude, json.longitude),
        map: map,
        draggable: false,
        content: markerContent,
        flat: true
    });

    marker.content.className = 'marker-loaded';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Simple Google Map (contat, submit...)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function simpleMap(_latitude, _longitude, draggableMarker) {
    //console.log(_latitude,_longitude,draggableMarker );
    var mapCenter = new google.maps.LatLng(_latitude, _longitude);
    var mapOptions = {
        zoom: 14,
        center: mapCenter,
        disableDefaultUI: true,
        scrollwheel: false,
        styles: mapStyles,
        panControl: false,
        zoomControl: true,
        draggable: true
    };
    var mapElement = document.getElementById('map-simple');
    var map = new google.maps.Map(mapElement, mapOptions);

    // Google map marker content -----------------------------------------------------------------------------------

    var markerContent = document.createElement('DIV');
    markerContent.innerHTML =
        '<div class="map-markerw">' +
        '<div class="iconw"><i class="icon-map-marker MapMark"></i></div>' +
        '</div>';

    // Create marker on the map ------------------------------------------------------------------------------------

    var marker = new RichMarker({
        //position: mapCenter,
        position: new google.maps.LatLng(_latitude, _longitude),
        map: map,
        draggable: draggableMarker,
        content: markerContent,
        flat: true
    });

    marker.content.className = 'marker-loaded';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Push items to array and create <li> element in Results sidebar ------------------------------------------------------

function pushItemsToArray(json, a, category, visibleItemsArray) {
    var itemPrice;
    visibleItemsArray.push(
        '<li>' +
        '<div class="item" id="' + json.data[a].id + '">' +
        '<a href="/profile/' + json.data[a].id + '" class="image">' +
        '<div class="inner">' +
        '<div class="item-specific">' +
        drawItemSpecific(category, json, a) +
        '</div>' +
        '<img src="' + json.data[a].gallery[0] + '" alt="">' +
        '</div>' +
        '</a>' +
        '<div class="wrapper">' +
        '<a href="/profile/' + json.data[a].id + '" id="' + json.data[a].id + '"><h3 class="ResultsName">' + '<i class="' + json.data[a].MapIcon + ' Titleicon"></i>' + json.data[a].title + '</h3></a>' +
        '<figure class="UniversityNameTitle">' + json.data[a].university + '</figure>' + '<figure>' + json.data[a].location + '</figure>' +
        /* drawPrice(json.data[a].price) + */
        '<div class="info">' +
        '<div class="type">' +
        '<span class="TypeName">' + json.data[a].type + '</span>' +
        '<i class="' + json.data[a].type_icon + ' TypeIcon"> </i>' +
        '</div>' +
        /* '<div class="rating" data-rating="' + json.data[a].rating + '"></div>' + */
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>'
    );

    /* function drawPrice(price){
         if( price ){
             itemPrice = ' <!-- <div class="price">' + price +  '</div> -->';
             return itemPrice;
         }
         else {
             return '';
         }
     } */
}

// Center map to marker position if function is called (disabled) ------------------------------------------------------

function centerMapToMarker() {
    $.each(json.data, function (a) {
        if (json.data[a].id == id) {
            var _latitude = json.data[a].latitude;
            var _longitude = json.data[a].longitude;
            var mapCenter = new google.maps.LatLng(_latitude, _longitude);
            map.setCenter(mapCenter);
        }
    });
}

// Create modal if more items are on the same location (example: one building with floors) -----------------------------

/*function multiChoice(sameLatitude, sameLongitude, json) {
    //if (clickedCluster.getMarkers().length > 1){
        var multipleItems = [];
        $.each(json.data, function(a) {
            if( json.data[a].latitude == sameLatitude && json.data[a].longitude == sameLongitude ) {
                pushItemsToArray(json, a, json.data[a].category, multipleItems);
            }
        });
        $('body').append('<div class="modal-window multichoice fade_in"></div>');
        $('.modal-window').load( urlCompleta+'assets/external/_modal-multichoice.html', function() {
            $('.modal-window .modal-wrapper .items').html( multipleItems );
            rating('.modal-window');
        });
        $('.modal-window .modal-background, .modal-close').live('click',  function(e){
            $('.modal-window').addClass('fade_out');
            setTimeout(function() {
                $('.modal-window').remove();
            }, 300);
        });
    //}
} */

// Animate OSM marker --------------------------------------------------------------------------------------------------

function animateOSMMarkers(map, loadedMarkers, json) {
    var bounds = map.getBounds();
    var visibleItemsArray = [];
    var multipleItems = [];

    $.each(loadedMarkers, function (i) {
        if (bounds.contains(loadedMarkers[i].getLatLng())) {
            var category = json.data[i].category;
            pushItemsToArray(json, i, category, visibleItemsArray);

            setTimeout(function () {
                if (loadedMarkers[i]._icon != null) {
                    loadedMarkers[i]._icon.className = 'leaflet-marker-icon leaflet-zoom-animated leaflet-clickable marker-loaded';
                }
            }, i * 50);
        }
        else {
            if (loadedMarkers[i]._icon != null) {
                loadedMarkers[i]._icon.className = 'leaflet-marker-icon leaflet-zoom-animated leaflet-clickable';
            }
        }
    });

    // Create list of items in Results sidebar -------------------------------------------------------------------------

    $('.items-list .results').html(visibleItemsArray);

    rating('.results .item');

    $('.results .item').hover(
        function () {
            if (loadedMarkers[$(this).attr('id') - 1]._icon) {
                loadedMarkers[$(this).attr('id') - 1]._icon.className = 'leaflet-marker-icon leaflet-zoom-animated leaflet-clickable marker-loaded marker-active';
            }
        },
        function () {
            if (loadedMarkers[$(this).attr('id') - 1]._icon) {
                loadedMarkers[$(this).attr('id') - 1]._icon.className = 'leaflet-marker-icon leaflet-zoom-animated leaflet-clickable marker-loaded';
            }
        }
    );

}

// Redraw map after item list is closed --------------------------------------------------------------------------------

function redrawMap(mapProvider, map) {
    $('.map .toggle-navigation').click(function () {
        $('.map-canvas').toggleClass('results-collapsed');
        $('.map-canvas .map').one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
            if (mapProvider == 'osm') {
                map.invalidateSize();
            }
            else if (mapProvider == 'google') {
                google.maps.event.trigger(map, 'resize');
            }
        });
    });
}