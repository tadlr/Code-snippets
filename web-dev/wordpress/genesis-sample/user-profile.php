<?php /* Template Name: Student Profile */ ?>

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
                            <li class="active" UserNameProfile><a href="/profile/#"><h1 class="page-title"><?php $display_first_name = um_profile('user-first-name'); echo $display_first_name; ?> <?php $display_last_name = um_profile('user-last-name'); echo $display_last_name; ?></h1></a></li>
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
                                                <img src="#" alt="">
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

                                 <!--   um_view_field", $res, $data, $type );
						$res = apply_filters("um_view_field_value_{$type} -->
                                    
                                    <!--Contact Info-->
                                    <div class="col-md-9 col-sm-9">
                                        <section>
                                            <h3><i class="icon-user PersonalInfoIcon ProfileIcons"></i>Personal Info</h3>
                                            <div class="EditProfile">
                                                <a href="/profie/edit?profiletab=main&um_action=edit"><button>Edit Profile</button></a>
                                            </div>
                                            <div style="height: 20px;"> </div>
                                            <div class="row">
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="form-group">
                                                        <label for="name">Name</label>
                                                        <p class="ProfileFields">
                                                            <?php $display_first_name = um_profile('user-first-name'); echo $display_first_name; ?> <?php $display_last_name = um_profile('user-last-name'); echo $display_last_name; ?>
                                                        </p>
                                                    </div>
                                                    <!--/.form-group-->
                                                </div>
                                                <!--/.col-md-3-->
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="form-group1 RightProfileSide">
                                                        <label for="email">Email</label>
                                                        <p class="ProfileFields"><?php $display_email = um_user('user_email'); echo $display_email; ?></p>
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
                                                <p class="ProfileFields"><?php $display_address = um_user('Current-Address'); echo $display_address; ?></p>
                                            </div>
                                        </section>
                                        <section>
                                            <h3>About Me</h3>
                                            <div>
                                                <div class="ProfileLeftSection">
                                                     <div class="form-group1">
                                                            <label for="email">What I do</label>
                                                            <p class="ProfileFields WhatIDoText"><?php $display_what_i_do = um_user('what-i-do'); echo $display_what_i_do; ?></p>
                                                        </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="form-group2">
                                                        <label for="email">Achievements</label>
                                                        <p class="ProfileFields AchivementsText"><?php $display_university = um_user('user-achievements'); echo $display_university; ?></p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <div class="ProfileLeftSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">University</label>
                                                        <p class="ProfileFields ProfileBoldedFields"><?php $display_university = um_user('University-Name'); echo $display_university; ?></p>
                                                    </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Field of Study</label>
                                                        <p class="ProfileFields ProfileBoldedFields"><?php $display_field_study = um_user('Field-Study'); echo $display_field_study; ?></p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <div class="ProfileLeftSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Availability</label>
                                                        <p class="ProfileFields ProfileBoldedFields"><?php $display_commitment = um_user('Commitment-Type'); echo $display_commitment ?></p>
                                                    </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Commitment</label>
                                                        <p class="ProfileFields ProfileBoldedFields"><?php $display_commitment = um_user('Commitment-Type'); echo $display_commitment ?></p>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <section>
                                                <div class="form-group">
                                                    <label for="state">Focus</label>
                                                    <p class="ProfileFields ProfileBoldedFields"><?php $display_focus = um_user('Focus'); echo $display_focus ?></p>
                                                </div>
                                            </section>
                                            
                                            
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