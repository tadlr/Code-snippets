<?php /* Template Name: User Profile */ ?>

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
        <div id="page-canvas">
            <?php include ('./wp-content/themes/genesis-sample/assets/elements/Responsive-Menu.php'); ?>
            <div style="height:30px;"> </div>

            <!--Page Content-->
            <div id="page-content">
                <section class="container ProfileContainer">
                    <header>
                        <ul class="nav nav-pills">
                            <li class="active" UserNameProfile><a href="#profile.html"><h1 class="page-title">JULIA GRIFFERTY</h1></a></li>
                            <!--<li><a href="my-items.html"><h1 class="page-title">My Items</h1></a></li>-->
                        </ul>
                    </header>
                     <div class="row">
                        <div class="col-md-9">
                                <div class="row">
                                    <!--Profile Picture-->
                                    <div class="col-md-3 col-sm-3">
                                        <section>
                                            <!--<h3>Profile Picture</h3>-->
                                            <div style="height: 20px;"> </div>
                                            <div id="profile-picture" class="profile-picture ProfilePicture">
                                                <!--<input name="file" type="file">
                                                <div class="dz-default dz-message"><span>Click or drop picture here</span></div> -->
                                                <img src="/wp-content/themes/genesis-sample/assets/img/demo-profile.png" alt="">
                                            </div>
                                            <h3><i class="icon-share2 SocialProfileIcon ProfileIcons"></i>Social Profile</h3>
                                            <a href="#">
                                                <div class="SocialProfileBox">
                                                    <i class="fa fa-linkedin-square SocialIcon"></i>
                                                </div>
                                            </a>
                                        </section>
                                    </div>
                                    <!--/.col-md-3-->
                                    
                                    <!--Contact Info-->
                                    <div class="col-md-9 col-sm-9">
                                        <section>
                                            <h3><i class="icon-user PersonalInfoIcon ProfileIcons"></i>Personal Info</h3>
                                            <div class="EditProfile">
                                                <a href="./?profiletab=main&um_action=edit"><button>Edit Profile</button></a>
                                            </div>
                                            <div style="height: 20px;"> </div>
                                            <div class="row">
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="form-group">
                                                        <label for="name">Name</label>
                                                        <p class="ProfileFields">Julia Grifferty</p>
                                                    </div>
                                                    <!--/.form-group-->
                                                </div>
                                                <!--/.col-md-3-->
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="form-group1 RightProfileSide">
                                                        <label for="email">Email</label>
                                                        <p class="ProfileFields">jgrifferty@gmail.com</p>
                                                    </div>
                                                    <!--/.form-group-->
                                                </div>
                                                <!--/.col-md-3-->
                                                <?php /* <div class="col-md-6 col-sm-6">
                                                    <div class="form-group">
                                                        <label for="mobile">Mobile</label>
                                                        <input type="text" class="form-control" id="mobile" name="mobile" pattern="\d*" value="903-675-5323">
                                                    </div>
                                                    <!--/.form-group-->
                                                </div> 
                                                <!--/.col-md-3-->
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="form-group">
                                                        <label for="phone">Phone</label>
                                                        <input type="text" class="form-control" id="phone" name="phone" pattern="\d*" value="(0)123 456 7890">
                                                    </div>
                                                    <!--/.form-group-->
                                                </div> */ ?>
                                             <!--/.col-md-3-->
                                            </div>
                                        </section>
                                        <section>
                                            <h3><i class="icon-map-marker-check AddressIcon ProfileIcons"></i>Current Address</h3>
                                            <div class="form-group">
                                                <p class="ProfileFields">Washington, DC, USA</p>
                                            </div>
                                        </section>
                                        <section>
                                            <h3>About Me</h3>
                                            <div>
                                                <div class="ProfileLeftSection">
                                                     <div class="form-group1">
                                                            <label for="email">What I do</label>
                                                            <p class="ProfileFields WhatIDoText">Member of my college’s environmental club</p>
                                                        </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="form-group2">
                                                        <label for="email">Achievements</label>
                                                        <p class="ProfileFields AchivementsText">Petitioned to ban plastic bottle sales in my school dorm</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <div class="ProfileLeftSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">University</label>
                                                        <p class="ProfileFields ProfileBoldedFields">The George Washington University</p>
                                                    </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Field of Study</label>
                                                        <p class="ProfileFields ProfileBoldedFields">International Affairs and Sustainability</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <div class="ProfileLeftSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Commitment</label>
                                                        <p class="ProfileFields ProfileBoldedFields">Long-term Project</p>
                                                    </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Focus</label>
                                                        <p class="ProfileFields ProfileBoldedFields">Bottles</p>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                           <!-- <section>
                                                <div class="form-group">
                                                    <label for="state">Focus</label>
                                                    <p class="ProfileFields ProfileBoldedFields">Bottles</p>
                                                </div>
                                            </section> -->
                                            
                                            
                                            <div style="height:30px;"> </div>
                                            
                                            <!--/.form-group-->
                                        </section>
                                        
                                        <!-- /.form-group -->
                                    </div>
                                    <!--/.col-md-6-->
                                </div>
                        </div>

                        <!-- /.col-md-3-->
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
</div>
<!-- end Outer Wrapper-->

<?php get_footer(); ?>