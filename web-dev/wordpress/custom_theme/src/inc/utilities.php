<?php

require_once get_template_directory() . '/vendor/autoload.php';
require_once get_template_directory() . '/src/functions.php';
require 'autoload.php';

use ThemeServices\ThemeServices;
use ThemeServices\Theme\Render;

function get_sk_skip_smooth_scroll() {
    $skip_smooth_scroll = [
        72,
        3090,
    ];

    $post_type = get_post_type();
    $postID = get_the_ID();
    $template = strtok(get_page_template_slug(), '.');

    $skip = false;
    if ($postID) {
        $skip = in_array($postID, $skip_smooth_scroll);
    }

    if (!$skip && $post_type) {
        $skip = in_array($post_type, $skip_smooth_scroll);
    }

    if (!$skip && $template) {
        $skip = in_array($template, $skip_smooth_scroll);
    }

    return $skip;
}

function SkThemeServices() {
    static $ThemeServices = null;
    if ($ThemeServices === null) {
        $ThemeServices = new ThemeServices();
    }
    return $ThemeServices;
}
do_action('qm/start', 'SkThemeServices');
SkThemeServices();
do_action('qm/stop', 'SkThemeServices');

function get_sk_language() {
    $ThemeServices = SkThemeServices();
    return $ThemeServices->Language;
}

function get_sk_version() {
    $ThemeServices = SkThemeServices();
    return $ThemeServices->Version;
}

function get_sk_content_blocks() {
    $ThemeServices = SkThemeServices();
    return $ThemeServices->ContentBlocks;
}

function get_sk_render() {
    $render = Render::getInstance();
    return $render;
}

function render_twig($template, $context = []) {
    $render = get_sk_render();
    $render->TwigRender($template, $context);
}

function render_lander($post = null) {
    $render = get_sk_render();
    $render->Lander($post);
}

function render_single($post = null, $template = null) {
    $render = get_sk_render();
    $render->Single($post, $template);
}

function render_page($page, $post = null) {
    $render = get_sk_render();
    if ($page === 'lander') {
        $render->Lander($post);
    } elseif ($page === 'blog') {
        $render->BlogHome();
    } else {
        $render->Single($post);
    }
}

function is_dev_env() {
    $env = ['development', 'staging'];

    return in_array(wp_get_environment_type(), $env);
}

function newsletter_shortcode($args = []) {
    ob_start();
    echo '<div class="newsletter-form form-shortcode">';

    if (isset($args['id'])) {
        render_twig('inline-newsletter-form.twig', ['args' => $args]);
    } else {

        include get_template_directory() . '/src/shortcodes/newsletter.php';
    }
    echo '</div>';
    return ob_get_clean();
}

add_shortcode('newsletter-form', 'newsletter_shortcode');

function inline_form_shortcode($args = []) {
    ob_start();
    render_twig('inline-form.twig', ['args' => $args]);
    return ob_get_clean();
}

add_shortcode('form', 'inline_form_shortcode');

function grid_example() {
    ob_start();
    render_twig('grid-example.twig');
    return ob_get_clean();
}

add_shortcode('grid-example', 'grid_example');

function phone_number() {

    $post = get_the_ID();
    $formatPhone = '0000000000';
    $formattedNumber = '(000) 000-0000';


    if ($post) {
        $field = get_field('sticky_bar_phone_number', $post);


        if (isset($field)) {
            $return = $field;

            if (is_numeric($return)) {
                $formatPhone = preg_replace('/[^0-9]/', '', $return);

                if (strlen($formatPhone) == 10) {
                    $formattedNumber =
                        '(' .
                        substr($formatPhone, 0, 3) .
                        ') ' .
                        substr($formatPhone, 3, 3) .
                        '-' .
                        substr($formatPhone, 6);
                }

                // Update the return statement to use the formatted number
            }
        }
    }
    $return = '<a href="tel:' . $formatPhone . '">' . $formattedNumber . '</a>';

    return $return;
}

add_shortcode('phone', 'phone_number');

function filter_search() {
    $Search = new \ThemeServices\Services\Search();
    $output = $Search->doFilters();

    if (is_array($output)) {
        echo json_encode($output);
    }
    exit();
}

add_action('wp_ajax_filter_search', 'filter_search');
add_action('wp_ajax_nopriv_filter_search', 'filter_search');

function is_homepage() {
    $translated_home = 28632;

    global $post;

    if (is_home() || (isset($post->ID) && $post->ID == $translated_home)) {
        return true;
    } else {
        return false;
    }
}

function getImage($image, $size = 'full', $args = [], $lazyload = true) {
    $render = get_sk_render();

    $return = $render->Image($image, $size, $args, $lazyload);

    return $return;
}

function getImageSrc($args) {
    $image = isset($args['src']) && $args['src'] ? $args['src'] : intval($args['id']);
    $size = isset($args['size']) && $args['size'] ?? 'full';
    $args = isset($args['args']) &&  $args['args'] ?? ['width' => '100%', 'height' => 'auto'];
    $lazyload = isset($args['lazyload']) && $args['lazyload'] ?? true;


    $return = getImage($image, $size, $args, $lazyload);

    return $return;
}


add_shortcode('image', 'getImageSrc');
add_shortcode('img', 'getImageSrc');

add_filter('rest_page_query', 'allow_draft', 1, 1);
add_filter('rest_rates_query', 'allow_draft', 1, 1);
add_filter('rest_landings_query', 'allow_draft', 1, 1);
add_filter('rest_post_query', 'allow_draft', 1, 1);
add_filter('rest_equipment_query', 'allow_draft', 1, 1);
add_filter('rest_industries_query', 'allow_draft', 1, 1);

function allow_draft($dropdown_args) {
    $dropdown_args['post_status'] = ['publish', 'draft', 'private'];
    return $dropdown_args;
}

add_filter(
    'acf/fields/post_object/query/name=en_translation',
    'translation_match_post_en',
);
add_filter(
    'acf/fields/post_object/query/name=es_translation',
    'translation_match_post_es',
);
add_filter(
    'acf/fields/post_object/query/name=fr_translation',
    'translation_match_post_fr',
);

function translation_match_post_en($field) {
    return translation_match_post_helper($field, 'en');
}

function translation_match_post_es($args) {
    return translation_match_post_helper($args, 'es_US');
}

function translation_match_post_fr($field) {
    return translation_match_post_helper($field, 'fr_CA');
}

function translation_match_post_helper($field, $lang = 'en') {
    if (acfe_is_admin()) {
        $url = strtolower(wp_get_referer());

        if (!$url) {
            return $field;
        }
        $url = parse_url($url);
        if (!isset($url['query'])) {
            return $field;
        }
        parse_str($url['query'], $query);

        if (isset($query['post'])) {
            $post_id = $query['post'];

            if ($post_id) {
                $field['post_type'] = [get_post_type($post_id)];
                $field['meta_key'] = 'content_language';
                $field['meta_value'] = $lang;
            }
        }
    }

    // dump($field);

    return $field;
}




function ModulePath($module) {
    $modulePath = 'src/ThemeServices/Modules/';
    return get_theme_file_path($modulePath) . $module . '/';
}

function ModulePathUrl($module) {
    $modulePath = 'src/ThemeServices/Modules/';
    return get_theme_file_uri($modulePath) . $module . '/';
}

function print_svg($file, $description = '', $width = "100%", $height = 'auto') {


    $iconfile = new DOMDocument();
    $iconfile->load($file);

    $svg = $iconfile->getElementsByTagName('svg')[0];

    //Auto width
    $svg->setAttribute('width', $width);
    $svg->setAttribute('height', $height);



    $desc = $iconfile->createElement('desc');
    $desc->appendChild($iconfile->createTextNode($description));



    $svg->insertBefore($desc, $svg->firstChild);

    echo $iconfile->saveHTML($svg);
}


function print_svg_scr($args) {
    $image = $args['src'] ? $args['src'] : intval($args['id']);
    $width = $args['width'] ?? '100%';
    $height = $args['height'] ?? 'auto';
    $size = 'full';


    if (is_string($image)) {
        $image = attachment_url_to_postid($image);
    }

    $mobile_image = get_field('mobile_img', $image);

    $imageSrc = wp_get_attachment_image_url($image, $size);
    global $post;
    $lang = get_field('content_language', $post->ID);

    if ($imageSrc) {

        $alt = get_post_meta($image, '_wp_attachment_image_alt', true);

        if (is_object($post) && isset($post->ID)) {

            switch ($lang) {
                case 'es_US':
                    $alt = get_field('spanish_alt_text', $image) ?? $alt;
                    break;
                case 'fr_CA':
                    $alt = get_field('french_alt_text', $image) ?? $alt;
                    break;
            }
        }

        ob_start();

        $mobileImageSrc = ($mobile_image) ? wp_get_attachment_image_url($mobile_image['ID'], $size) : false;

        if ($mobileImageSrc) {
            echo '<span class="resp-svg d-tablet-none d-desktop-none">';
            print_svg($mobileImageSrc, esc_attr($alt));
            echo '</span>';
            echo '<span class="resp-svg d-mobile-none">';
            print_svg($imageSrc, esc_attr($alt), $width, $height);
            echo '</span>';
        } else {
            print_svg($imageSrc, esc_attr($alt), $width, $height);
        }

        $return = ob_get_clean();
    } else {
        $return = '<!-- No image found -->';
    }






    return $return;
}


add_shortcode('svg', 'print_svg_scr');



add_filter('render_block', 'wp_image_block_alter', 10, 2);
function wp_image_block_alter($block_content, $block) {

    if ('core/image' !== $block['blockName']) return $block_content;

    if (!isset($block['attrs']['id'])) return $block_content;

    $attrs = $block['attrs'];

    try {
        $block_content = '<div>' . getImage($attrs['id'], $attrs['sizeSlug'], [], true) . '</div>';
    } catch (Exception $e) {
        $block_content = '<!-- Error: ' . $e->getMessage() . ' -->' . $block_content;
    }

    return $block_content;
}
