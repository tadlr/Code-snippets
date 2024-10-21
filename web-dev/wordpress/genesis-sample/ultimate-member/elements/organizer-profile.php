<!-- PHP Code -->
    <?php
        $display_business_address = um_profile('business-address');
        $address = um_profile('business-address');
        $UserAddress = um_profile('business-address');                                  
                        $prepAddr = str_replace(' ','+',$UserAddress);                                     
                        $geocode=file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address='.$prepAddr.'&key=AIzaSyDhjbEGPnK5HcDRoKSU0gVzPK40rFlejlk');
                        $output= json_decode($geocode);
                        $Userlatitude = $output->results[0]->geometry->location->lat;
                        $UserLongitude = $output->results[0]->geometry->location->lng;
        if($Userlatitude == '' || $UserLongitude == '') {
            $UserAddress = um_profile('business-address');                                  
                        $prepAddr = str_replace(' ','+',$UserAddress);                                     
                        $geocode=file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address='.$prepAddr.'&key=AIzaSyDhjbEGPnK5HcDRoKSU0gVzPK40rFlejlk');
                        $output= json_decode($geocode);
                        $Userlatitude = $output->results[0]->geometry->location->lat;
                        $UserLongitude = $output->results[0]->geometry->location->lng;
        }
        $user_id = get_current_user_id();
        $display_userID = um_profile_id();
        $display_profilepic = um_profile('ProfilePic');
        $display_linkedin = um_profile('linkedin');
        $display_email = um_user('user_email');
        $display_phone = um_user('phone_number');
        $display_what_i_do = um_user('what-i-do');
        $display_achievements = um_user('user-achievements');
        $display_skills = um_user('skills');
        $display_focus_multiple = um_user('Focus');
        $display_commitment = um_user('Seeking');
        $display_skypeid = um_user('skype');
        $display_business_logo = um_profile('business-logo');
        $display_business_name = um_profile('business-name');
        $display_business_website = um_profile('website');
        $display_business_facebook = um_profile('facebook');
        $display_business_linkedin = um_profile('business-linkedin');
        $display_business_about = um_profile('about-business');
        $display_business_website = um_profile('website');
    ?>

<!--Page Content-->
            <div id="page-content">
                <section class="container ProfileContainer">
                    <header>
                        <ul class="nav nav-pills">
                            <li class="active" UserNameProfile><a href="#profile.html"><h1 class="page-title">
                                    <?php 
                                        $user_info = get_userdata(um_profile_id());
                                        $first_name = $user_info->first_name;
                                        $last_name = $user_info->last_name;
                                        echo "$first_name $last_name";
                                    ?>
                                </h1></a></li>
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
                                                <img src="<?php 
                                                        if($display_profilepic != '') { echo ('/wp-content/uploads/ultimatemember/'.$display_userID.'/'.$display_profilepic);} else { echo('/wp-content/themes/genesis-sample/assets/img/member-1.jpg');}                                                       
                                                     ?>" />
                                            </div>
                                            <h3><i class="icon-share2 SocialProfileIcon ProfileIcons"></i>Social Profile</h3>
                                            <a href="http://<?php echo $display_linkedin; ?>" target="_blank">
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
                                                    <?php if (is_user_logged_in()):
                                                        if ($user_id == $display_userID) {
                                                            echo '<a id="user" href="/user/?profiletab=main&um_action=edit"><button>Edit Profile</button></a>'; }
                                                        endif; ?>
                                                </div>
                                            <div style="height: 20px;"> </div>
                                            <div class="row">
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="form-group">
                                                        <label for="name">Name</label>
                                                        <p class="ProfileFields">
                                                            <?php 
                                                                $user_info = get_userdata(um_profile_id());
                                                                $first_name = $user_info->first_name;
                                                                $last_name = $user_info->last_name;
                                                                echo "$first_name $last_name";
                                                            ?>
                                                        </p>
                                                    </div>
                                                    <!--/.form-group-->
                                                </div>
                                                <!--/.col-md-3-->
                                                <div class="col-md-6 col-sm-6">
                                                    <div class="form-group1 RightProfileSide">
                                                        <label for="email">Email</label>
                                                        <p class="ProfileFields"><a href="mailto:<?php echo $display_email; ?>"><?php echo $display_email; ?></a></p>
                                                    </div>
                                                    <!--/.form-group-->
                                                </div>
                                                <!--/.col-md-3-->
                                            </div>
                                        </section>
                                        <section>
                                            <div class="form-group">
                                                <label for="state">Mobile</label>
                                                <p class="ProfileFields"><a href="tel:<?php echo $display_phone; ?>"><?php echo $display_phone; ?></a></p>
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
                                                            <p class="ProfileFields WhatIDoText"><?php echo $display_what_i_do; ?></p>
                                                        </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="form-group2">
                                                        <label for="email">Achievements</label>
                                                            <p class="ProfileFields AchivementsText"><?php echo $display_achievements; ?></p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <div class="ProfileLeftSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Skills</label>
                                                        <p class="ProfileFields ProfileBoldedFields"><?php echo $display_skills; ?></p>
                                                    </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Focus</label>
                                                        <p class="ProfileFields ProfileBoldedFields"><?php echo $display_focus_multiple; ?></p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <div class="ProfileLeftSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Seeking</label>
                                                        <p class="ProfileFields ProfileBoldedFields"><?php echo $display_commitment ?></p>
                                                    </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Skype ID</label>
                                                        <p class="ProfileFields ProfileBoldedFields"><?php echo $display_skypeid ?></p>
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
                                    <h3 class="BusinessName"><?php echo $display_business_name; ?></h3>
                                    <div class="MapAndInfo">
                                        <div class="BusinessLogoImg">
                                            <img src="/wp-content/uploads/ultimatemember/<?php echo $display_userID; echo '/'.$display_business_logo; ?>" class="BusinessImage" />
                                        </div>
                                        <div class="BusinessMapSection">
                                            <section id="map-simple" class="map-profile"> </section>                                            
                                        </div>    
                                    </div>
                                    
                                    <div class="BusinessContainers">
                                            <div class="BusinessComunOne">
                                                <h3><span class="BusinessInformation">ADDRESS</span></h3>
                                                <div style="height: 10px;"> </div>
                                                <p class="ProfileFields"><?php echo $display_business_address; ?></p>
                                            </div>
                                            <div class="BusinessComunTwo">
                                                <h3><span class="BusinessInformation">CONTACT</span></h3>
                                                <div style="height: 24px;"> </div>
                                                <label for="state">Website</label>
                                                <p class="ProfileFields"><a href="<?php echo $display_business_website; ?>" target="_blank"><?php echo $display_business_website; ?></a></p>
                                            </div>
                                            <div class="BusinessComunThree">
                                                <h3><span class="BusinessInformation">ABOUT US</span></h3>
                                                <div style="height: 14px;"> </div>
                                                <p class="ProfileFields"><?php echo $display_business_about; ?></p>
                                            </div>
                                    </div>
                                        <div class="BusinessComunFour">
                                            <h3><span class="BusinessInformation">SOCIAL PROFILES</span></h3>
                                            <a href="http://<?php echo $display_business_linkedin; ?>" target="_blank">
                                                <div class="SocialProfileBox BusinessSocialPrincipal">
                                                    <i class="fa fa-linkedin-square SocialIcon"></i>
                                                </div>
                                            </a>
                                            <a href="<?php echo $display_business_facebook; ?>">
                                                <div class="SocialProfileBox BusinessSocial" target="_blank">
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

<!-- Script -->
<script>
    $(window).load(function(){
        _latitude = '<?php echo $Userlatitude ?>';
        _longitude = '<?php echo $UserLongitude ?>';
        var draggableMarker = false;
        var  zoomControl= false;
        simpleMap(_latitude, _longitude,draggableMarker);
    });
</script>