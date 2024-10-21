
if (is_page('student')) {
    include ('./wp-content/themes/genesis-sample/assets/functions/student-load.php');
} else if (is_page('student/u-volunteers')) {
    include ('./wp-content/themes/genesis-sample/assets/functions/student/volunteers.php');
} else if (is_page('student/u-interns')) {
    include ('./wp-content/themes/genesis-sample/assets/functions/student/interns.php');
} else if (is_page('student/u-partnerships')) {
    include ('./wp-content/themes/genesis-sample/assets/functions/student/partnerships.php');
} else if (is_page('student/f-bottle')) {
    include ('./wp-content/themes/genesis-sample/assets/functions/student/bottle.php');
} else if (is_page('student/f-bag')) {
    include ('./wp-content/themes/genesis-sample/assets/functions/student/bag.php');
} else if (is_page('student/f-straw')) {
    include ('./wp-content/themes/genesis-sample/assets/functions/student/straw.php');
} else if (is_page('student/u-foodware')) {
    include ('./wp-content/themes/genesis-sample/assets/functions/student/foodware.php');
} else if (is_page('student/u-volunteers_f-bottle/')) {
    include ('./wp-content/themes/genesis-sample/assets/functions/student/volunteers-bottle.php');
} else if (is_page('student/u-volunteers_f-bag/')) {
    include ('./wp-content/themes/genesis-sample/assets/functions/student/volunteers-bag.php');
} else if (is_page('student/u-volunteers_f-foodware/')) {
    include ('./wp-content/themes/genesis-sample/assets/functions/student/volunteers-foodware.php');
} else if (is_page('student/u-volunteers_f-straw/')) {
    include ('./wp-content/themes/genesis-sample/assets/functions/student/volunteers-straw.php');
}