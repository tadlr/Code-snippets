<?php /* Template Name: Home Page */ ?>

<?php get_header(); ?>

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
                <div class="page-content">
                    <div class="HomeHeader">
                        <div class="WelcomeSection">
                            <div class="WelcomeTitle">
                                <p>WELCOME TO SYNCHRONIZE</p>
                            </div>
                            <div class="LookingFor">
                                <p>Who are you looking for?</p>
                            </div>
                            <div class="NavigationButtonsHome">
                                <a href="/student">
                                    <button class="Student">Students</button>
                                </a>
                                <a href="/organizer">
                                    <button class="Organizer">Organizers</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="HomeSubheader">
                        <div class="FetureBoxes">
                            <div class="FeatureBox BoxNo1">
                                <div class="ItemsoftheBox FeatureBoxIcon">
                                    <i class="icon-magnifier FeatureIcon"></i>
                                </div>
                                <div class="ItemsoftheBox FeatureBoxDescription">
                                    <h3>Seek</h3>
                                    <p style="width: 234px;">Seek like-minded students and organizers within the plastic pollution movement. Whether you are looking for an internship or partnership, you will find it here.</p>
                                </div>
                            </div>
                            <div class="FeatureBox BoxNo2">
                                <div class="ItemsoftheBox FeatureBoxIcon">
                                    <i class="icon-share2 FeatureIcon"></i>
                                </div>
                                <div class="ItemsoftheBox FeatureBoxDescription">
                                    <h3>Share</h3>
                                    <p style="width: 234px;">Share ideas and resources and receive support from other activists. Let’s pool our resources together.</p>
                                </div>
                            </div>
                            <div class="FeatureBox BoxNo3">
                                <div class="ItemsoftheBox FeatureBoxIcon">
                                    <i class="icon-sync FeatureIcon"></i>
                                </div>
                                <div class="ItemsoftheBox FeatureBoxDescription">
                                    <h3>Sync</h3>
                                    <p style="width: 234px;">Sync your projects across universities and organizations. Collectively we can move the planet forward.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="StudentsProfilesSection">
                        <section class="container">
                            <h3>Trending Students</h3>
                            <center><p class="ComingSoonMessage">Coming Soon!</p></center>
                             <?php include ('./wp-content/themes/genesis-sample/assets/elements/student-featured.php'); ?>
                            <center>
                                <a href="/student">
                                    <button class="MoreListings">See more listings</button>
                                </a>
                            </center>
                        </section>
                    </div>
                    <div class="OrganizersProfilesSection">
                        <section class="container">
                            <h3>Trending Organizers</h3>
                            <center><p class="ComingSoonMessage">Coming Soon!</p></center>
                             <?php include ('./wp-content/themes/genesis-sample/assets/elements/organizer-featured.php'); ?>
                            <center>
                                <a href="/organizer">
                                    <button class="MoreListings">See more listings</button>
                                </a>
                            </center>
                        </section>
                    </div>
                    <div class="TestimonialsSection blur">
                        <section class="block background-color-white" id="testimonials">
                    <div class="container">
                        <div class="owl-carousel testimonials">
                            <blockquote>
                                <figure><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/client.jpg" alt=""></figure>
                                <div class="description">
                                    <p class="TestimonialText">
                                        “This is a placeholder for a testimonal quote. This is a placeholder for a testimonal quote.”
                                    </p>
                                    <footer><span class="TestimonialName">Natalie Jenkins, </span><span class="TestimonialCompany">CEO Plastic Pollution Coalition</span></footer>
                                    <div class="TestimonialButton">
                                        <a href="#"><i class="icon-chevron-right TestimonialsIcon"> </i></a>
                                    </div>
                                </div>
                            </blockquote>
                        </div>
                        <!--/.testimonials-->
                    </div>
                    <!--/.container-->
                </section>
                <!--/.testimonials-->
                <section id="partners" class="block hideContent">
                    <div class="container">
                        <h3 class="TeamTitle">Our Partners</h3>
                        <div class="logos">
                            <div class="logo"><a href=""><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/logo-partner-01.png" alt=""></a></div>
                            <div class="logo"><a href=""><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/logo-partner-02.png" alt=""></a></div>
                            <div class="logo"><a href=""><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/logo-partner-03.png" alt=""></a></div>
                            <div class="logo"><a href=""><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/logo-partner-04.png" alt=""></a></div>
                            <div class="logo"><a href=""><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/logo-partner-05.png" alt=""></a></div>
                        </div>
                        <!--/.logos-->
                    </div>
                    <!--/.container-->
                </section>
            </div>
            <div class="GetStartedAbout">
                <h3 class="TeamTitle">Quick Starter Guide</h3>
                <div class="StartTittles">
                    <a class="StartedButtons" href="/student"><div class="StartTittleONE">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/student-ico.jpg"/>
                        <h3>Browse Students</h3>
                        <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc.</p>-->
                    </div></a>
                   <a class="StartedButtons" href="/organizer"><div class="StartTittleTWO">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/ngo-ico.jpg"/>
                        <h3>Browse Organizers</h3>
                        <!--<p>Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus, quis mollis nisl nunc et massa. Vestibulum sed metus in lorem tristique ullamcorper id vitae erat. Nulla mollis.</p>-->
                       </div></a>
                    <a class="StartedButtons" href="/faq"><div class="StartTittleTRHEE">
                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/FAQ-ico.jpg"/>
                        <h3>FAQ</h3>
                       <!-- <p>Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at. Vestibulum nec erat ut mi sollicitudin porttitor id sit amet risus. Nam tempus vel odio vitae aliqua.</p> -->
                        </div> </a>
                </div>
                    
                    </div>

                </div>
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
<?php get_footer(); ?>