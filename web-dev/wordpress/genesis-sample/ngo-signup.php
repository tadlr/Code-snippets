<?php /* Template Name: NGO Signup */ ?>

<?php  get_header(); ?>
<?php include ('./wp-content/themes/genesis-sample/assets/elements/js-required.php'); ?>

<script>

var autocomplete;

function initialize() {
  "use strict";

  autocomplete = new google.maps.places.Autocomplete(document.getElementById("business-address-210"), {types: ["address"]});
}

function geolocate() {
  "use strict";

  var geolocation, circle;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
} 

var placeSearch, autocomplete, geocoder;
google.maps.event.addDomListener(window, 'load', initAutocomplete);

function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('business-address-210')), {
      types: ['address']
    });

  autocomplete.addListener('place_changed', fillInAddress);
}

function codeAddress(address) {
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == 'OK') {
      // This is the lat and lng results[0].geometry.location
      //alert(results[0].geometry.location);
    } else {
      //alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function fillInAddress() {
  var place = autocomplete.getPlace();

  codeAddress(document.getElementById('business-address-210').value);
}
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhjbEGPnK5HcDRoKSU0gVzPK40rFlejlk&libraries=places&callback=initAutocomplete" async defer></script>

<!-- Outer Wrapper-->
<div id="outer-wrapper" >
    <!-- Inner Wrapper -->
    <div id="inner-wrapper">
        <!-- Navigation-->
        <div class="FixedHeader">
            <?php include ('./wp-content/themes/genesis-sample/assets/elements/TopMenu.php'); ?>
        </div>

        <div class="HeaderSpace"></div>
        <!-- end Navigation-->
        <!-- Page Canvas-->
        <div id="page-canvas">
            <?php include ('./wp-content/themes/genesis-sample/assets/elements/Responsive-Menu.php'); ?>

            <!--Page Content-->
            <div id="page-content">
                <section class="container">
                    <div class="SignUpTittleContainer">
                        <p class="SignUpTittle">Sign Up</p>
                    </div>
                    <div class="DirectionsButtons">
                            <a class="SignUpStudent" href="/signup/">
                                <button class="SignUpSearchButton NGOSigunBUttonIdle">
                                    <p>Student</p> 
                                </button>
                            </a>
                            <a class="SignUpngo" href="/signup/organizer/">
                                <button class="SignUpNGOSearchButton NGOSigunBUttonActive">
                                    <p>Organizer</p>
                                </button>
                            </a>
                    </div>
                    <div class="RequiredText">
                        <p><i>Please fill in all of the fields below.</i></p>
                    </div>
                    <div class="SignUpForm">
                        <?php dynamic_sidebar( 'ngo-sign-up' ); ?>
                    </div>
                          <div class="checkbox NewsLetterCheckbox">
                            <label>
                                <input type="checkbox" name="newsletter" checked><p class="News">Receive Newsletter</p>
                            </label>
                        </div>                    
                    
                    <div class="block LegalNotes">
                        <div class="row">
                            <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">

                                   
                                <hr>
                                <div class="center">
                                    <figure class="note">By clicking the “Create an Account” button you agree with our <a href="/terms_conditions/" class="link">Terms and conditions</a></figure>
                                    <div style="height:20px"></div>
                                    <figure class="note">Already a member? <a href="/login" class="link">Log In</a></figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- /.block-->
            </div>
            <!-- end Page Content-->
            <!--Page Footer-->
        <footer id="PageFooter">      
            <?php include ('./wp-content/themes/genesis-sample/assets/elements/footer.php'); ?>
        </footer>
        <!--end Page Footer-->   
        </div>
        <!-- end Page Canvas--> 
    </div>
    <!-- end Inner Wrapper -->
</div>

<?php  get_footer(); ?>