<?php

/**
 * Template Name: Redirect to Home
 * Template Post Type: post, page, industries, rates, equipment
 */

$language = getLanguage();

switch ($language) {
    case 'en':
        wp_redirect(home_url());
        exit();
        break;
    case 'fr':
        wp_redirect(home_url() . '/fr');
        exit();
        break;
    case 'es':
        wp_redirect(home_url() . '/es');
        exit();
        break;
    default:
        wp_redirect(home_url());
        exit();
        break;
}
