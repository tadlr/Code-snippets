<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://customThememerchants.com
 * @since             1.0.0
 * @package           CustomTheme_Lang
 *
 * @wordpress-plugin
 * Plugin Name:       CustomTheme Multilang
 * Plugin URI:        https://customThememerchants.com
 * Description:       The foundation for multilingual support for CustomTheme's Website
 * Version:           1.0.0
 * Author:            CustomTheme Payment Experts
 * Author URI:        https://customThememerchants.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       customTheme-lang
 * Domain Path:       /languages
 */

// Plugin boilerplate by https://wppb.me/

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die();
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('LANG_VERSION', '1.0.0');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require ModulePath('CustomThemeLang') . 'includes/class-customTheme-lang.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_customTheme_lang() {
    $plugin = new CustomTheme_Lang();
    $plugin->run();
}
run_customTheme_lang();
