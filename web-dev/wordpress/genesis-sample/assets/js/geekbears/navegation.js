var _latitude = 51.541216;
var _longitude = -0.095678;
var jsonPath = '/wp-content/themes/genesis-sample/assets/json/real-estate.json.txt';


var user = "none";
    
function choose(choice){
    jsonPath = choice;
}

function test(click){
    $('script').each(function() {
    if ($(this).attr('src') !== '/wp-content/themes/genesis-sample/assets/js/geekbears/ngo.js') {
        var old_src = $(this).attr('src');
        $(this).attr('src', '');
        setTimeout(function(){ $(this).attr('src', old_src + '?'+new Date()); }, 250);
    }
});
}


// Load JSON data and create Google Maps


      $.getJSON(jsonPath)
            .done(function(json) {
                createHomepageGoogleMap(_latitude,_longitude,json);
            })
            .fail(function( jqxhr, textStatus, error ) {
                console.log(error);
            });
            

    
// Set if language is RTL and load Owl Carousel

$(window).load(function(){
    var rtl = false; // Use RTL
    initializeOwl(rtl);
});

autoComplete();



function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    
} 

document.getElementById("defaultOpen").click();