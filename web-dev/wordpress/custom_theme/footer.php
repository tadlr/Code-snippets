<!-- footer default -->
<?php
$Language = getLanguage();

switch ($Language) {
    case 'es':
        $footerID = 31331;
        break;
    case 'fr':
        $footerID = 33130;
        break;
    default:
        $footerID = 2057;
        break;
} ?>
<footer data-scroll-section id="footer" class="footer offset-x-desktop-158 footer-default">
    <div class="max-w-container w-1600 prel op-0">

        <div class="footer-top-wrap offset-x-mobile-40">
            <div class="logo-col">
                <a href="<?php echo home_url(); ?>" class="footer-logo-link inline_block prel">
                    <?php
                    $logo = get_field('footer_logo', $footerID);
                    $size = 'full';
                    if ($logo) {
                        $logo_url = wp_get_attachment_image_url($logo, $size);
                        $image_alt = get_post_meta(
                            $logo,
                            '_wp_attachment_image_alt',
                            true,
                        );
                    }
                    ?>
                    <img width="216" height="72" alt="<?= $image_alt ?>" data-src="<?= $logo_url ?>" class="b-lazy footer-logo-img">
                </a>

            </div>


        </div>



    </div>
</footer>
<!-- footer default -->


<!-- main content container: end -->
<?= '</main>' ?>
<!-- main content container: end -->


<?php require 'bottom.php'; ?>