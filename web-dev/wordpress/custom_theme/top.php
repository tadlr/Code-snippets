<!DOCTYPE html>

<!-- Check if it's home page and add class to html tag -->
<?php
$spanish_pages = get_field('spanish_pages', 'option');
$french_pages = get_field('french_pages', 'option');

$lang = getLanguage();
$version = get_sk_version();
$postID = get_the_ID();


$pageLang = 'en';

$sk_sc = 'skp-sc';
if (($postID && in_array($postID, $spanish_pages)) || $lang == 'es') {
    $pageLang = 'es-US';
    $class = $sk_sc;
} elseif (($postID && in_array($postID, $french_pages)) || $lang == 'fr') {
    $pageLang = 'fr-CA';
    $class = $sk_sc;
} else {
    if (is_homepage()) {
        $class .= ' header-offset-homepage header-background-color';
    }
}
?>

<html xml:lang="<?= $pageLang ?>" lang="<?= $pageLang ?>" class="<?= $sk_sc ?> lang-<?= $lang ?>">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1">

    <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
    <META HTTP-EQUIV="EXPIRES" CONTENT="Tuesday, 10 October 2023 12:00:00 GMT">


    <?php wp_head(); ?>

    <link rel="apple-touch-icon" sizes="180x180" href="/wp-content/themes/custom_theme/assets/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/wp-content/themes/custom_theme/assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/wp-content/themes/custom_theme/assets/favicon/favicon-16x16.png">
    <link rel="manifest" href="/wp-content/themes/custom_theme/assets/favicon/site-<?= $lang ?>.webmanifest">
    <link rel="mask-icon" href="/wp-content/themes/custom_theme/assets/favicon/safari-pinned-tab.svg" color="#002ea6">
    <link rel="shortcut icon" href="/wp-content/themes/custom_theme/assets/favicon/favicon.ico">
    <meta name="msapplication-TileColor" content="#002ea6">
    <meta name="msapplication-config" content="/wp-content/themes/custom_theme/assets/favicon/browserconfig.xml">
    <meta name="theme-color" content="#002ea6">

    <?php if ($postID && !has_post_thumbnail($postID)) : ?>
        <!-- OG Image -->
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image" content="<?= get_domain_theme_path() ?>/assets/media/images/og-image.webp" />
    <?php endif; ?>



</head>

<body id="body" <?php body_class(); ?>>

