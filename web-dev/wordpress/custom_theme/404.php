<?php error_reporting(E_ERROR | E_WARNING | E_PARSE); ?>
<?php defined('ABSPATH') || die(); ?>
<?php get_header(); ?>



<!-- Content -->
<section data-scroll-section class="translate-y-section-default prel ov-hidden offset-x-mobile-38  center page-404">
    <div class="op-0">
        <div class="content-404">
            <p class="txt-size-12 txt-post-rtf upper lh-1 fw-400 ltr-spc-pos-4_6 current-page-breadcrumb-title c-blue-1 heading-anim">

                404 page not found

            </p>
            <h1 class="txt-size-30 c-blue-1 fw-700 anim-translate-y main-four-o-four">
                <span class="txt-size-120 c-blue-1 fw-700 anim-translate-y accent-oops"><?= get_field(
                    'page_title',
                    'option',
                ) ?></span><br />
                <?= get_field('heading', 'option') ?>
            </h1>
            <p class="txt-size-18 txt-post-rtf c-blue-1 anim-translate-y"><?= get_field(
                'main_text',
                'option',
            ) ?></p>

            <div class="helpful-links">

                <?php if (have_rows('link', 'option')): ?>
                    <?php while (have_rows('link', 'option')):

                        the_row(); // Get sub field values.
                        $linkText = get_sub_field('link_text');
                        $linkUrl = get_sub_field('link_url');
                        ?>
                        <div class="fade-in-last">
                            <a href="<?= $linkUrl ?>" class="txt-size-30 c-blue-1 fw-700"><?= $linkText ?></a>
                            <img src="<?= get_template_directory_uri() ?>/assets/media/images/pictograms/plain-txt-green-arrow.webp" alt="" class="prel">
                        </div>
                    <?php
                    endwhile; ?>
                <?php endif; ?>

                <div class="homepage-link pabs fade-in-last">
                    <a class="txt-size-24 c-blue-1 fw-700" href="<?php echo home_url(); ?>">Home Page</a>
                </div>
            </div>

        </div>
        <div class="pictograms">
            <img class="pabs pictogram-404-1 b-lazy dont-show fade-in-last" data-src="<?= get_template_directory_uri() ?>/assets/media/images/pictograms/shape-404-1.webp" alt="">
            <img class="pabs pictogram-404-2 b-lazy dont-show fade-in-last" data-src="<?= get_template_directory_uri() ?>/assets/media/images/pictograms/shape-404-2.webp" alt="">
            <img class="pabs pictogram-404-3 b-lazy dont-show fade-in-last" data-src="<?= get_template_directory_uri() ?>/assets/media/images/pictograms/shape-404-3.webp" alt="">
            <img class="pabs pictogram-404-4 b-lazy dont-show fade-in-last" data-src="<?= get_template_directory_uri() ?>/assets/media/images/pictograms/shape-404-4.webp" alt="">
            <img class="pabs pictogram-404-5 b-lazy dont-show fade-in-last" data-src="<?= get_template_directory_uri() ?>/assets/media/images/pictograms/shape-404-5.webp" alt="">
            <img class="pabs pictogram-404-6 b-lazy dont-show fade-in-last" data-src="<?= get_template_directory_uri() ?>/assets/media/images/pictograms/shape-404-6.webp" alt="">
        </div>
    </div>
</section>



<?php get_footer(); ?>
