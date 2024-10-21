<?php require('top.php');

$Language = (getLanguage()) ?? 'en';

$fields = get_fields();

?>


<!-- header default -->
<header id="header" class="header header-<?= $Language; ?> main-header offset-x-desktop-35">
    <div class="max-w-container w-1850 op-0">
        <div class="content-wrap offset-x-desktop-164 prel offset-x-mobile-47">
            <a href="<?php echo home_url() . t('/') ?>" aria-label="<?= t('CustomTheme Payment Experts'); ?>" class="header-logo-link inline_block prel">
                <?php
                $headerLogoBlue = get_field('header_logo_blue');
                $size = 'full';
                if ($headerLogoBlue) {
                    $headerLogoBlue_url = wp_get_attachment_image_url($headerLogoBlue, $size);
                }



                $logoPath = get_theme_file_path() . "/assets/logo/";
                $logoUrl = get_domain_theme_path() . "/assets/logo/";

                if (file_exists("$logoPath/$Language/logo-white-descriptor-tagline.json")) {
                    echo "<span aria-hidden='true' class='lottie-anim-logo logo-anim-white logo-no-scroll' data-lottie-anim-name='logo-anim-white' data-url='$logoUrl/$Language/logo-white-descriptor-tagline.json'></span>";
                } else {
                    echo "<span aria-hidden='true' class='lottie-anim-logo logo-anim-white logo-no-scroll' data-lottie-anim-name='logo-anim-white' data-url='$logoUrl/en/logo-white-descriptor-tagline.json'></span>";
                }

                if (file_exists("$logoPath/$Language/logo-blue-descriptor-tagline.json")) {
                    echo "<span aria-hidden='true' class='lottie-anim-logo logo-anim-blue logo-no-scroll' data-lottie-anim-name='logo-anim-blue' data-url='$logoUrl/$Language/logo-blue-descriptor-tagline.json'></span>";
                } else {
                    echo "<span aria-hidden='true' class='lottie-anim-logo logo-anim-blue logo-no-scroll' data-lottie-anim-name='logo-anim-blue' data-url='$logoUrl/en/logo-blue-descriptor-tagline.json'></span>";
                }


                if (file_exists("$logoPath/$Language/logo-white-descriptor-tagline.json")) {
                    echo "<span aria-hidden='true' class='lottie-anim-logo logo-anim-white logo-on-scroll' data-lottie-anim-name='logo-anim-white' data-url='$logoUrl/$Language/logo-white-descriptor.json'></span>";
                } else {
                    echo "<span aria-hidden='true' class='lottie-anim-logo logo-anim-white logo-on-scroll' data-lottie-anim-name='logo-anim-white' data-url='$logoUrl/en/logo-white-descriptor.json'></span>";
                }

                if (file_exists("$logoPath/$Language/logo-blue-descriptor-tagline.json")) {
                    echo "<span aria-hidden='true' class='lottie-anim-logo logo-anim-blue logo-on-scroll' data-lottie-anim-name='logo-anim-blue' data-url='$logoUrl/$Language/logo-blue-descriptor.json'></span>";
                } else {
                    echo "<span aria-hidden='true' class='lottie-anim-logo logo-anim-blue logo-on-scroll' data-lottie-anim-name='logo-anim-blue' data-url='$logoUrl/en/logo-blue-descriptor.json'></span>";
                }


                ?>
            </a>


            <nav role="navigation">
                <button aria-label="Toggle mobile menu button" class="mobile-menu-btn" aria-controls="menu" aria-expanded="false">
                    <span class="line-el"></span>
                    <span class="line-el"></span>
                    <span class="line-el"></span>
                </button>
                <div class="nav-wrap">


                    <div class="header-links-wrap offset-x-mobile-47">
                        <div class="header-links-content-wrap">
                            // This is the code has been removed to complied with NDA
                        </div>
                    </div>



                </div><

                <a href="<?= $button_href; ?>" class="<?= $button_classes; ?> mobile-btn ltr-spc-pos-0_1 btn-default c-blue-1 btn-green-1 section-color-white btn-offset-8 fw-700">
                    <span class="btn-bg-el"></span>
                    <span class="btn-txt"><?= $button_text; ?></span>
                </a>
            </nav>
        </div>
    </div>
</header>




<!-- main content container: start -->
<?= '<main id="main-content">' ?>
<!-- main content container: start -->