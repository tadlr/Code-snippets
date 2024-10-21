<?php  get_header(); ?>
<style>
    .btn.btn-default:hover, select.btn-default:hover {
    background-color: #FC5246;
    color: #c2c2c2;
}

.btn.btn-default.icon.ContactButton {

    padding: 20px 23px !important;

}
</style>
<!-- Outer Wrapper-->
<div id="outer-wrapper">
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
            <div>
                <?php
                
                    $address = 'New York, NY';
                    $prepAddr = str_replace(' ','+',$address);
                    $geocode=file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address='.$prepAddr.'&key=AIzaSyDhjbEGPnK5HcDRoKSU0gVzPK40rFlejlk');
                    $output= json_decode($geocode);
                     $lat = $output->results[0]->geometry->location->lat;
                     $long = $output->results[0]->geometry->location->lng;
                
                            while(($lat == '') || ($long == '')) {
                            $prepAddr = str_replace(' ','+',$address);
                                $geocode=file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address='.$prepAddr.'&key=AIzaSyDhjbEGPnK5HcDRoKSU0gVzPK40rFlejlk');
                                $output= json_decode($geocode);
                                $lat = $output->results[0]->geometry->location->lat;
                                $long = $output->results[0]->geometry->location->lng; 
                         }
                ?>
            </div>
            <!--Page Content-->
            <div id="page-content">
                <section id="map-simple" class="map-contact"> </section>
                <!--<img src="/wp-content/themes/genesis-sample/assets/img/map-contact.png" alt="ContactMap" class="ContactMapImage">-->
                <div style="height:25px"> </div>
                <section class="container">
                    <div class="row ResponsiveContact">
                        <!--Content-->
                        <div>
                            <header>
                                <h1 class="page-title">Contact us</h1>
                            </header>
                            <section>
                                <div class="row">
                                    <div class="col-md-4 col-sm-4">
                                        <header class="no-border ContactHeaders"><h3>Address</h3></header>
                                        <address>
                                            <div><strong>Synchronize</strong></div>
                                            <div>New York, NY</div>
                                            <div>USA, 10003</div>
                                            <br>
                                            <figure>
                                                <div class="info">
                                                    <!--<a class="SupportEmail" href="mailto:support@synchronizehub.com">support@synchronizehub.com</a>-->
                                                </div>
                                            </figure>
                                            <div class="SocialContactPage">
                                                <!--<header class="no-border"><h3>Social Profiles</h3></header>
                                                <a href="#">
                                                    <div class="FooterSocialProfileBox">
                                                        <i class="fa fa-linkedin-square FooterSocialIcon LinkedIn"></i>
                                                    </div>
                                                    </a>
                                                    <a href="#">
                                                    <div class="FooterSocialProfileBox ContactSocialSeparator">
                                                        <i class="fa fa-facebook FooterSocialIcon Facebook"></i>
                                                    </div>
                                                </a>-->
                                            </div>
                                        </address>
                                    </div>
                                    <!--/.col-md-4-->
                                    <div class="col-md-4 col-sm-4 ContactInformation">
                                        <header class="no-border ContactHeaders"><h3>Support and account inquiries</h3></header>
                                        <!--<div><strong>Website</strong></div>
                                            <div><a href="http://www.plasticpollutioncoalition.org/" target="blank">http://www.plasticpollutioncoalition.org/</a></div> -->
                                        <div><a href="mailto:support@synchronizehub.com">support@synchronizehub.com</a></div>
                                    </div>
                                    <!--/.col-md-4-->
                                    <div class="col-md-4 col-sm-4">
                                        <header class="no-border ContactHeaders"><h3>About us</h3></header>
                                        <p>Synchronize brings students and professional organizers together to accelerate plastic pollution solutions. Join the network to access the talent and resources you need to build the coalition.
                                        </p>
                                        <a href="/about" class="read-more icon ReadMoreLink">Read More</a>
                                    </div>
                                    <!--/.col-md-4-->
                                </div>
                                <!--/.row-->
                            </section>
                            <hr>
                            <section>
                                <header class="no-border"><h3>Write us a message</h3></header>
                                <form id="contact-form" role="form" method="post" action="?" class="background-color-white">
                                    <div class="row">
                                        <div class="col-md-6 col-sm-6">
                                            <div class="form-group">
                                                <label for="company-form-name">Name</label>
                                                <input type="text" class="form-control" id="company-form-name" name="company-form-name" required="">
                                            </div>
                                            <!-- /.form-group -->
                                        </div>
                                        <!--/.col-md-6-->
                                        <div class="col-md-6 col-sm-6">
                                            <div class="form-group">
                                                <label for="company-form-email">Email</label>
                                                <input type="email" class="form-control" id="company-form-email" name="company-form-email" required="">
                                            </div>
                                            <!-- /.form-group -->
                                        </div>
                                        <!--/.col-md-6-->
                                    </div>
                                    <div class="form-group">
                                        <label for="company-form-message">Message</label>
                                        <textarea class="form-control" id="company-form-message" name="company-form-message"  rows="3" required=""></textarea>
                                    </div>
                                    <!-- /.form-group -->
                                    <div class="form-group"> 
                                        <button type="submit" class="btn btn-default icon ContactButton">Send a Message</button>
                                    </div>
                                    <!-- /.form-group -->
                                </form>
                                <!--/#contact-form-->
                            </section>
                        </div>
                    </div>
                </section>
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
<!-- end Outer Wrapper-->
<script type="text/javascript" src="/wp-content/themes/genesis-sample/assets/js/jquery-2.1.0.min.js"></script>
<script type="text/javascript" src="/wp-content/themes/genesis-sample/assets/js/before.load.js"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&amp;libraries=places"></script>
<script type="text/javascript" src="/wp-content/themes/genesis-sample/assets/js/richmarker-compiled.js"></script>
<script type="text/javascript" src="/wp-content/themes/genesis-sample/assets/js/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript" src="/wp-content/themes/genesis-sample/assets/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/wp-content/themes/genesis-sample/assets/js/smoothscroll.js"></script>
<script type="text/javascript" src="/wp-content/themes/genesis-sample/assets/js/bootstrap-select.min.js"></script>
<script type="text/javascript" src="/wp-content/themes/genesis-sample/assets/js/jquery.hotkeys.js"></script>
<script type="text/javascript" src="/wp-content/themes/genesis-sample/assets/js/custom.js"></script>
<script type="text/javascript" src="/wp-content/themes/genesis-sample/assets/js/maps.js"></script>


<script>
    $(window).load(function(){
        _latitude = '<?php echo $lat; ?>';
        _longitude = '<?php echo $long; ?>';
        //var address = Avenida Presidente Masaryk 101, Polanco, Polanco V Sección, Mexico City, CDMX, Mexico;
        var draggableMarker = false;
        simpleMap(_latitude, _longitude,draggableMarker);
    });
</script>
      
            
<?php 

    get_footer();
?> 