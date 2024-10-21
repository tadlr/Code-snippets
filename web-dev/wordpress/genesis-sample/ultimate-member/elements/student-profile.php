<!--PHP Code -->
    <?php
        $user_id = get_current_user_id();
        $display_userID = um_profile_id();
        $display_profilepic = um_profile('ProfilePic');
        $display_email = um_user('user_email');
        $display_address = um_user('Current-Address');
        $display_what_i_do = um_user('what-i-do');
        $display_achievements = um_user('user-achievements');
        $display_focus = um_user('Focus');
        $display_commitment = um_user('Commitment-Type');
        $display_field_study = um_user('Field-Study');
        $display_university = um_user('University-Name');
    ?>

<!--Page Content-->
            <div id="page-content">
                <section class="container ProfileContainer">
                    <header>
                        <ul class="nav nav-pills">
                            <li class="active" UserNameProfile><a href="/profile/#">
                                <h1 class="page-title">
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
                                            <!--<h3>Profile Picture</h3>-->
                                            <div style="height: 20px;"> </div>
                                            <div id="profile-picture" class="profile-picture ProfilePicture">
                                                <!--<input name="file" type="file">
                                                <div class="dz-default dz-message"><span>Click or drop picture here</span></div> -->
                                                <img src="<?php 
                                                        if($display_profilepic != '') { echo ('/wp-content/uploads/ultimatemember/'.$display_userID.'/'.$display_profilepic);} else { echo('/wp-content/themes/genesis-sample/assets/img/member-1.jpg');}                                                       
                                                     ?>" />
                                            </div>
                                            <h3><i class="icon-share2 SocialProfileIcon ProfileIcons"></i>Social Profile</h3>
                                            <a href="http://<?php $display_linkedin = um_profile('linkedin'); echo $display_linkedin; ?>" target="_blank">
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
                                            </div>
                                        </section>
                                        <section>
                                            <h3><i class="icon-map-marker-check AddressIcon ProfileIcons"></i>Current Address</h3>
                                            <div class="form-group">
                                                <p class="ProfileFields"><?php echo $display_address; ?></p>
                                            </div>
                                        </section>
                                        <div style="height:15px;"> </div>
                                        <section>
                                            <h3>About Me</h3>
                                            <div style="height:10px;"> </div>
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
                                                        <label for="state">University</label>
                                                        <p class="ProfileFields ProfileBoldedFields"><?php echo $display_university; ?></p>
                                                    </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Field of Study</label>
                                                        <p class="ProfileFields ProfileBoldedFields"><?php echo $display_field_study; ?></p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <div class="ProfileLeftSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Commitment</label>
                                                        <p class="ProfileFields ProfileBoldedFields"><?php echo $display_commitment ?></p>
                                                    </div>
                                                </div>
                                                <div class="ProfileRightSection">
                                                    <div class="ProfileUniversity">
                                                        <label for="state">Focus</label>
                                                        <p class="ProfileFields ProfileBoldedFields"><?php echo $display_focus ?></p>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <!-- <section>
                                                <div class="form-group">
                                                    <label for="state">Focus</label>
                                                    <p class="ProfileFields ProfileBoldedFields"><?php /* $display_focus = um_user('Focus'); echo $display_focus */ ?></p>
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