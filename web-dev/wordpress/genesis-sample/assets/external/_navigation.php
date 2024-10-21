<?php
    require('../../../../../wp-load.php');
?>
<ul>
    <li><a href="/">Home</a>
    <li><a href="/about">About Us</a></li>
    <!--<li><a href="#sub-level-1" class="has-child" data-toggle="collapse" aria-expanded="false" aria-controls="sub-level-1">How It Works</a>
        <div class="collapse" id="sub-level-1">
            <ul>
                <li><a href="#">For Students</a></li>
                <li><a href="#">For Organizers</a></li>
            </ul>
        </div>
    </li>-->
    <li><a href="/student">Browse Students</a></li>
    <li><a href="/organizer">Browse Organizers</a></li>
    <li><a href="/faq">FAQ</a></li>
    <?php if ( is_user_logged_in() ) { ?>
        <li><a href="/profile">My Profile</a></li>
        <li><a href="#sub-level-12" class="has-child" data-toggle="collapse" aria-expanded="false" aria-controls="sub-level-1">My Account</a>
            <div class="collapse" id="sub-level-12">
                <ul>
                    <li><a href="/user/?profiletab=main&um_action=edit">Edit my Profile</a></li>
                    <li><a href="/account">Account Settings</a></li>
                </ul>
            </div>
        </li>
        <li><a href="/um-logout">Log Out</a></li>
    <?php } else { ?>
        <li><a href="/login">Log In</a></li>
        <li><a href="#sub-level-12" class="has-child" data-toggle="collapse" aria-expanded="false" aria-controls="sub-level-1">Sign Up</a>
            <div class="collapse" id="sub-level-12">
                <ul>
                    <li><a href="/signup">As Students</a></li>
                    <li><a href="/signup/organizer">As Organizer</a></li>
                </ul>
            </div>
        </li>
    <?php } ?>
</ul>
