<?php /* Template Name: Complete Your Profile */ ?>


<?php  get_header(); ?>

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
        <div id="page-canvas1">
            <!--Off Canvas Navigation-->
            <?php include ('./wp-content/themes/genesis-sample/assets/elements/Responsive-Menu.php'); ?>
            <!--end Off Canvas Navigation-->

            <!--Sub Header-->
            <section class="sub-header">
                <div class="search-bar horizontal collapse" id="redefine-search-form"></div>
                <!-- /.search-bar -->
                <div class="breadcrumb-wrapper">
                    <div class="container">
                        <ol class="breadcrumb">
                            <li><a href="index-directory.html"><i class="fa fa-home"></i></a></li>
                            <li><a href="/login"><?php wp_title(''); ?></a></li>
                        </ol>
                        <!-- /.breadcrumb-->
                    </div>
                    <!-- /.container-->
                </div>
                <!-- /.breadcrumb-wrapper-->
            </section>
            <!--end Sub Header-->

            <!--Page Content-->
            <div id="page-content">
                <section class="container">
                    <?php dynamic_sidebar( 'welcome-to-sync' ); ?> 
                </section>
                <!-- /.block-->
            </div>
            <!-- end Page Content-->
            <!--Page Footer--> <div style="height:35px;"> </div>
            <footer id="PageFooter" style="position:relative; bottom:0; width: 100%;">
                <?php include ('./wp-content/themes/genesis-sample/assets/elements/footer.php'); ?>
            </footer>
            <!--end Page Footer--> 
        </div>
        <!-- end Page Canvas-->
    </div>
    <!-- end Inner Wrapper -->
</div>
<!-- end Outer Wrapper-->


<script>
     var input = document.getElementById('location');
        var autocomplete = new google.maps.places.Autocomplete(input, {
            types: ["(cities)"],
            componentRestrictions: {country: ["us","mx"]}
        });
        
        autocomplete.bindTo('bounds', map); 
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
                map.setZoom(11);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(11);
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
</script>
<?php
    get_footer();
?>
