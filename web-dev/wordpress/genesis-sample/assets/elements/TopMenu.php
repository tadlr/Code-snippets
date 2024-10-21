<?php global $current_user;
      get_currentuserinfo();
?>

<div class="header">
            <div class="wrapper">
                <div class="brand">
                    <!--<a href="index-real-estate.html"><img src="<?php /* echo get_stylesheet_directory_uri();*/ ?>/assets/img/logo-real-estate.png" alt="logo"></a>-->
                    <a href="/"><!--<h3 class="synchronize">Synchronize</h3>--><img src="/wp-content/themes/genesis-sample/assets/img/logo.png" class="SyncLogo"/></a>
                </div>
                <nav class="navigation-items">
                    <div class="wrapper">
                        <ul class="main-navigation navigation-top-header"></ul>
                        <div class="DesktopMenu">
                        <ul class="user-area about-our-mission-co SyncMenu">
                            <li><a class="MenuItem" href="/about">About Us</a></li>
                             <!--<div class="dropdown">
                                      <button class="dropbtn HowItWorks">How It Works <span class="icon-chevron-down MenuDrownIcon"></span></button>
                                      <div class="dropdown-content HowItWorksDrop">
                                        <a href="#">For Students</a>
                                        <a href="#">For Organizers</a>
                                      </div>
                                    </div>-->
                            <li><a class="MenuItem" href="/student">Browse Students</a></li>
                            <li><a class="MenuItem" href="/organizer">Browse Organizers</a></li>
                            <li><a class="MenuItem" href="/faq">FAQ</a></li>
                            <img class="HeaderLineImg" src="/wp-content/themes/genesis-sample/assets/img/line.png">
                            <?php if ( is_user_logged_in() ) { ?> 
                                    <a href="/profile"><button class="dropbtn ProfileButtons Loginheader"><?php echo $current_user->user_firstname; echo ' '.$current_user->user_lastname; ?></button></a>
                                        <div class="dropdown">
                                          <button class="dropbtn AccountButtons Signupheader">My Account</button>
                                          <div class="dropdown-content DropDownUserAccount">
                                              <?php $current_user = wp_get_current_user();
                                                    if (user_can( $current_user, 'administrator' )) {
                                                      echo '<a href="/wp-admin">WP Admin</a>';
                                                        echo '<a href="/wp-admin/users.php">Manage Users</a>';
                                                    } else if (user_can( $current_user, 'user_administrator' ))  {
                                                        echo '<a href="/wp-admin/users.php">Manage Users</a>';
                                                    }
                                              ?>
                                            <a href="/user/?profiletab=main&um_action=edit">Edit my Profile</a>
                                            <a href="/account">Account Settings</a>
                                            <a href="/account/notifications/">Email Settings</a>
                                            <a href="/um-logout">Log Out</a>
                                          </div>
                                        </div> 
                            <?php } else { ?>
                                    <a href="/login"><button class="dropbtn LogInButtons Loginheader">Log In</button></a>
                                        <div class="dropdown">
                                          <button class="dropbtn LogInButtons Signupheader">Sign Up <span class="icon-chevron-down MenuSignUpIcon"> </span></button>
                                          <div class="dropdown-content">
                                            <a href="/signup">As Student</a>
                                            <a href="/signup/organizer">As Organizer</a>
                                          </div>
                                        </div>
                            <?php } ?>
                        </ul>
                        </div>    
                        <!--<a href="#" class="submit-item">
                            <div class="content"><span>Submit Your Item</span></div>
                            <div class="icon">
                                <i class="fa fa-plus"></i>
                            </div>
                        </a> -->
                        <div class="ResponsiveMenu">
                            <div class="toggle-navigation">
                                <div class="icon">
                                    <div class="line"></div>
                                    <div class="line"></div>
                                    <div class="line"></div> 
                                </div>
                            </div> 
                        </div>
                    </div>
                </nav>
            </div>
        </div>