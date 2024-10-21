<?php
    get_header();
include ('./wp-content/themes/genesis-sample/assets/elements/js-required.php');
include ('./wp-content/themes/genesis-sample/assets/functions/organizers-load.php');
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
        <div id="page-canvas" class="NGOPAGE">
            <!--Off Canvas Navigation-->
            <?php include ('./wp-content/themes/genesis-sample/assets/elements/Responsive-Menu.php'); ?>
            <!--end Off Canvas Navigation-->
            <!--Page Content-->
            <div id="page-content">
                <!-- Map Canvas-->
                <div class="map-canvas list-solid">
                    <!-- Map -->
                    <div class="map">
                        <div class="toggle-navigation">
                            <div class="icon">
                                <div class="line"></div>
                                <div class="line"></div>
                                <div class="line"></div>
                            </div>
                        </div>
                        <!--/.toggle-navigation-->
                        <div id="map" class="has-parallax"></div>
                    </div>
                    <!-- end Map -->
                    <!--Items List-->
                    <div class="items-list">
                        <div class="inner">
                            <div id="StudentForm">
                                <?php include ('./wp-content/themes/genesis-sample/assets/elements/NGOSearch.php'); ?>
                            </div>
                            <!--end Filter--> 
                            <div class="MapResultsList">
                            <header class="clearfix">
                                <h3 class="pull-left">Results</h3>
                                <div class="buttons pull-right">
                                    <span>Display:</span>
                                    <span class="icon active" id="display-grid"><i class="fa fa-th"></i></span>
                                    <span class="icon" id="display-list"><i class="fa fa-th-list"></i></span>
                                </div>
                            </header>
                            <ul class="results grid">

                            </ul>
                        </div>
                        </div>
                        <!--results-->
                    </div>
                    <!--end Items List-->
                </div>
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

<?php
    get_footer();
?>