<?php /* Template Name: Organizer Profile */ ?>

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
         <div style="height: 20px;"> </div>
        <!-- Page Canvas-->
        <div id="page-canvas">
            <?php include ('./wp-content/themes/genesis-sample/assets/elements/Responsive-Menu.php'); ?>

            <!--Page Content-->
            <div id="page-content">
                <section class="container ProfileContainer">
                    <header>
                        <ul class="nav nav-pills">
                            <li class="active" UserNameProfile><a href="#profile.html"><h1 class="page-title">MARK STONE</h1></a></li>
                            <!--<li><a href="my-items.html"><h1 class="page-title">My Items</h1></a></li>-->
                        </ul>
                    </header>
                     <div class="row">
                        <div class="col-md-9">
                                <div class="row">
                                    <!--Profile Picture-->
                                    <div class="col-md-3 col-sm-3">
                                        <section>
                                           <!-- <h3>Profile Picture</h3> -->
                                            <div style="height: 20px;"> </div>
                                            <div id="profile-picture" class="profile-picture ProfilePicture">
                                                <!--<input name="file" type="file">
                                                <div class="dz-default dz-message"><span>Click or drop picture here</span></div> -->
                                                <img src="/wp-content/themes/genesis-sample/assets/img/demo-profile-ngo.png" alt="">
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
                                                        <p class="ProfileFields">Mark Stone</p>
                                                    </div>
                                                    <!--/.form-group-->
                                                </div>
                                                <!--/.col-md-3-->
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="form-group1 RightProfileSide">
                                                        <label for="email">Email</label>
                                                        <p class="ProfileFields">mstone@gmail.com</p>
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
                                            <div class="form-group">
                                                <label for="state">Mobile</label>
                                                <p class="ProfileFields">(123) 456-7890</p>
                                            </div>
                                        </section>
                                         <div style="height: 20px;"> </div>
                                        <section>
                                            <h3>About Me</h3>
                                            <div style="height: 30px;"> </div>
                                            <div>
                                                <div class="ProfileLeftSection">
                                                     <div class="form-group1">
                                                            <label for="email">What I do</label>
                                                            <p class="ProfileFields WhatIDoText">I’m a regional director of development with a history of working in the public policy industry.</p>
                                                        </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="form-group2">
                                                        <label for="email">Achievements</label>
                                                            <p class="ProfileFields AchivementsText">Guest speaker at NYU Sustainability Summit</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <div class="ProfileLeftSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Skills</label>
                                                        <p class="ProfileFields ProfileBoldedFields">Leadership, Decision making</p>
                                                    </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Focus</label>
                                                        <p class="ProfileFields ProfileBoldedFields">Bottle, Foodware</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <div class="ProfileLeftSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Seeking</label>
                                                        <p class="ProfileFields ProfileBoldedFields">Volunteers</p>
                                                    </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Skype ID</label>
                                                        <p class="ProfileFields ProfileBoldedFields">pear.pool</p>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <section>
                                                <div class="form-group">
                                                    
                                                </div>
                                            </section>
                                            
                                            <!--/.form-group-->
                                        </section>
                                        
                                        <!-- /.form-group -->
                                    </div>
                                    <!--/.col-md-6-->
                                </div>
                            <div class="NGOBusinessInfo">
                                <hr class="NGODivider">
                                <div class="businessinfo">
                                    <h3 class="BusinessName">Plastic Pollution Coalition</h3>
                                    <div class="MapAndInfo">
                                        <img class="BusinessImage" src="/wp-content/uploads/2018/02/businesspic.png" alt="business"/>
                                        <img class="BusinessMap" src="/wp-content/themes/genesis-sample/assets/img/map.png" alt="business"/>
                                    </div>
                                    
                                    <div class="BusinessContainers">
                                            <div class="BusinessComunOne">
                                                <h3><span class="BusinessInformation">ADDRESS</span></h3>
                                                <div style="height: 10px;"> </div>
                                                <p class="ProfileFields">2150 Allston Way, Suite 460
                                                    Berkeley, CA 94704</p>
                                            </div>
                                            <div class="BusinessComunTwo">
                                                <h3><span class="BusinessInformation">CONTACT</span></h3>
                                                <div style="height: 24px;"> </div>
                                                <label for="state">Website</label>
                                                <p class="ProfileFields">http://www.plasticpollutioncoalition.org/</p>
                                            </div>
                                            <div class="BusinessComunThree">
                                                <h3><span class="BusinessInformation">ABOUT US</span></h3>
                                                <div style="height: 14px;"> </div>
                                                <p class="ProfileFields">Plastic Pollution Coalition is a growing global alliance of individuals, organizations, businesses, and policymakers working toward a world free of plastic pollution and its toxic impacts on humans, animals, waterways and oceans, and the environment. </p>
                                            </div>
                                    </div>
                                        <div class="BusinessComunFour">
                                            <h3><span class="BusinessInformation">SOCIAL PROFILES</span></h3>
                                            <a href="#">
                                                <div class="SocialProfileBox BusinessSocialPrincipal">
                                                    <i class="fa fa-linkedin-square SocialIcon"></i>
                                                </div>
                                            </a>
                                            <a href="#">
                                                <div class="SocialProfileBox BusinessSocial">
                                                    <i class="fa fa-facebook SocialIcon"></i>
                                                </div>
                                            </a>
                                        </div>
                                </div>
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