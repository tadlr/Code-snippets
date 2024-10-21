<?php /* Template: Profile Sync */ ?>

    <div id="content" <?php if (um_user('role') == 'organizer'){ echo 'style="display:none;"'; } ?>>
       <?php include ('./wp-content/themes/genesis-sample/ultimate-member/elements/student-profile.php'); ?>
    </div>

    <div id="content" <?php if (um_user('role') == 'student'){ echo 'style="display:none;"'; } ?>>
       <?php include ('./wp-content/themes/genesis-sample/ultimate-member/elements/organizer-profile.php'); ?>
    </div>
