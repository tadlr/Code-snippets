<?php
    get_header();
    //<body onunload="" class="map-fullscreen page-homepage navigation-off-canvas" id="page-top">
?>

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
            <!--Off Canvas Navigation-->
            <?php include ('./wp-content/themes/genesis-sample/assets/elements/Responsive-Menu.php'); ?>
            <!--end Off Canvas Navigation-->

            
            
            <!--end Sub Header-->

            <!--Page Content-->
            <div id="page-content">
                <section class="container">
                    <header>
                        <h1 class="page-title">404</h1>
                    </header>
                    <div class="block">
                        <div id="title-404">
                            <aside>404
                                <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/scissors.png" alt="">
                            </aside>
                            <h2>Page Not Found</h2>
                            <p>Unfortunately the page you are looking for is not here.<br>You can go back or check these featured items:</p>
                        </div>
                    </div>
                </section>
                <!-- /.block-->

            </div>
            <!-- end Page Content-->
             <!--Page Footer-->
                <footer id="PageFooter"> <!--style="position: fixed; bottom:0; width:100%">-->
                    <?php include ('./wp-content/themes/genesis-sample/assets/elements/footer.php'); ?>
                </footer>
            <!--end Page Footer-->
        </div>
        <!-- end Page Canvas-->
        <!--end Page Footer-->
    </div>
    <!-- end Inner Wrapper -->
</div>
<!-- end Outer Wrapper-->


<script>
    $(window).load(function(){
        var rtl = false; // Use RTL
        initializeOwl(rtl);
    });
</script>


    <?php
    get_footer();
?>