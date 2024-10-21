<?php

get_header();

the_content();


$context = [
    'field' => get_fields(),
];

render_twig('page-bk5--rate-sekurity.twig', $context);

get_template_part('banner-talk-to-us'); ?>

<div class="popup-form">
    <div class="mobile-contact-form landing-page-form">
        <button aria-label="Close form popup" class="form-popup-close-btn">
            <span class="x-icon"></span>
        </button>
        <h3 class="txt-size-36 c-white"><?= t('Start saving today'); ?></h3>
        <p class="form-subheading txt-size-14 c-green-1"></p>
        <div class="form-wrap my-3">
            <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
            <script>
                hbspt.forms.create({
                    region: "na1",
                    portalId: "4438792",
                    formId: "2ef297cc-cd3d-4bef-94cf-e12cdc13a3e8"
                });
            </script>
        </div>
    </div>
</div>

<?php get_footer(); ?>