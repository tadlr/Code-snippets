<?php

use ThemeServices\Theme\Blog;

add_filter('the_content', 'toc_content');

function toc_content($content) {
    global $post;
    if ($post->post_type == 'post' || $post->post_type == 'case-studies') {
        $blog = new Blog();
        $content = \CustomTheme\CustomTheme::getInstance()->addTocIds($content);
    }
    return $content;
}

function isMobile() {
    return preg_match(
        '/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i',
        $_SERVER['HTTP_USER_AGENT'],
    );
}

function get_domain_theme_path() {
    return 'https://' . $_SERVER['HTTP_HOST'] . '/wp-content/themes/customTheme';
}

function na_parse_request($query) {
    if (
        !$query->is_main_query() ||
        2 != count($query->query) ||
        !isset($query->query['page'])
    ) {
        return;
    }

    if (!empty($query->query['name'])) {
        $query->set('post_type', ['post', 'landings', 'page', 'case-studies']);
    }
}
// add_action('pre_get_posts', 'na_parse_request');

/*
 * Segment CTA tracking functions
 *
 */
function get_segtrack_atts() {
    global $wp;
    if (get_field('cta_event')) {
        $segtrack_event = preg_replace(
            '/<!--.*?-->/',
            '',
            get_field('cta_event'),
        );
        if (isset($_SERVER['HTTP_REFERER'])) {
            $segment = [
                'event_date' => date('F j, Y'),

                'event_time' => date('g:i a'),
                'event_user_ip' => getUserIPAddress(),
                'event_user_language' => substr(
                    $_SERVER['HTTP_ACCEPT_LANGUAGE'],
                    0,
                    2,
                ),
                'event_device_type' => getDevice(),
                'event_browser_type' => getBrowser(),
                'event_current_url' => home_url($wp->request),
                'event_previous_url' => $_SERVER['HTTP_REFERER'],
                'event_source' => get_field('cta_text'),
            ];

            $segtrack_data = get_field('cta_data');

            if (is_array($segtrack_data)) {
                foreach ($segtrack_data as $data) {
                    switch ($data) {
                        case 'cta item':
                            $segment[$data] = 'content section';
                            break;
                        case 'CTA Popup':
                            $segment[$data] = 'Header Form';
                            break;
                        case 'clear':
                            $segment = [];
                            break;
                    }
                }

                return 'data-segtrack-event="' .
                    $segtrack_event .
                    '" data-segtrack-data="' .
                    htmlspecialchars(
                        json_encode($segment),
                        ENT_QUOTES,
                        'UTF-8',
                    ) .
                    '"';
            }
        }
    }
}

function getUserIPAddress() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $address = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $address = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $address = $_SERVER['REMOTE_ADDR'];
    }

    return $address;
}

function getBrowser() {
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    $browser = 'N/A';

    $browsers = [
        '/msie/i' => 'Internet explorer',
        '/firefox/i' => 'Firefox',
        '/safari/i' => 'Safari',
        '/chrome/i' => 'Chrome',
        '/edge/i' => 'Edge',
        '/opera/i' => 'Opera',
        '/mobile/i' => 'Mobile browser',
    ];

    foreach ($browsers as $regex => $value) {
        if (preg_match($regex, $user_agent)) {
            $browser = $value;
        }
    }

    return $browser;
}

function getDevice() {
    // Check if the "mobile" word exists in User-Agent
    $isMob = is_numeric(
        strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'mobile'),
    );

    // Check if the "tablet" word exists in User-Agent
    $isTab = is_numeric(
        strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'tablet'),
    );

    // Platform check
    $isWin = is_numeric(
        strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'windows'),
    );
    $isAndroid = is_numeric(
        strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'android'),
    );
    $isIPhone = is_numeric(
        strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'iphone'),
    );
    $isIPad = is_numeric(
        strpos(strtolower($_SERVER['HTTP_USER_AGENT']), 'ipad'),
    );
    $isIOS = $isIPhone || $isIPad;

    $device_type = '';
    $os_type = '';

    if ($isMob) {
        if ($isTab) {
            $device_type = 'Tablet';
        } else {
            $device_type = 'Mobile';
        }
    } else {
        $device_type = 'Desktop';
    }

    if ($isIOS) {
        $os_type = 'iOS';
    } elseif ($isAndroid) {
        $os_type = 'Android';
    } elseif ($isWin) {
        $os_type = 'Windows';
    }

    return $device_type . ', ' . $os_type;
}

/*
function remove_jquery_migrate_notice()
{
    $m = $GLOBALS['wp_scripts']->registered['jquery-migrate'];
    $m->extra['before'][] = 'temp_jm_logconsole = window.console.log; window.console.log=null;';
    $m->extra['after'][] = 'window.console.log=temp_jm_logconsole;';
}
add_action('init', 'remove_jquery_migrate_notice', 5);
*/

/* ADD CODE MIRROR CSS */
function codemirror_style() {
    wp_enqueue_style(
        'cm-style',
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/codemirror.min.css',
    );
    wp_enqueue_style(
        'cm-theme-blackboard',
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/theme/blackboard.min.css',
    );
}

/* ENQEUE CODE MIRROR JS */
function codemirror_scripts() {
    wp_enqueue_script(
        'codemirror_script1',
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/codemirror.min.js',
    );
    wp_enqueue_script(
        'codemirror_script2',
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/addon/hint/css-hint.min.js',
    );
    wp_enqueue_script(
        'codemirror_script3',
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/addon/hint/html-hint.min.js',
    );
    wp_enqueue_script(
        'codemirror_script4',
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.15/mode/htmlmixed/htmlmixed.min.js',
    );
}

function code_mirror() {
    echo '
	<style>
	.tmce-active .mce-tinymce{display:block !important;visibility:visible !important;}
	.html-active .mce-tinymce{display:none !important;visibility:hidden !important;}
	.tmce-active .CodeMirror{display:none;}
	</style>
	<script>
	jQuery(document).ready(function($){
		function rundCodeMirror(){
			var areas = $(".wp-editor-area:not(#content)")
			for(var i = 0; i < areas.length; i++) {
                CodeMirror.fromTextArea(areas[i], { // In some cases `areas.item(i)` needs to be changed to `areas[i]`
					mode : "htmlmixed",
					htmlMode: true,
					theme: "blackboard",
					lineNumbers: true
				});
			}
		}
		setTimeout(rundCodeMirror, 5000);
	});
	</script>
	';
    echo '<style>
	.CodeMirror {
		resize: vertical;
		overflow-y: auto !important;
	}
  </style>';
}
// add_action('admin_head', 'my_custom_styles');
// add_action('admin_enqueue_scripts', 'admin_style');
// add_action('admin_enqueue_scripts', 'my_enqueue');

function get_blog_excerpt($count, $post) {
    $permalink = get_permalink($post->ID);

    $excerpt = get_the_excerpt();
    $excerpt = strip_tags($excerpt);
    $excerpt = mb_substr($excerpt, 0, $count);
    $excerpt = mb_substr($excerpt, 0, strripos($excerpt, ' '));
    $excerpt = rtrim($excerpt, ",.;:- _!$&#");
    $excerpt =
        $excerpt .
        '<a href="' .
        $permalink .
        '" style="text-decoration: none;">&nbsp;(...)</a>';

    return $excerpt;
}

function getLanguage() {
    global $post;
    if (is_object($post) && isset($post->ID)) {
        $lang = get_field('content_language', $post->ID);

        switch ($lang) {
            case 'es_US':
                return 'es';
                break;
            case 'fr_CA':
                return 'fr';
                break;
            default:
                return 'en';
        }
    }

    return 'en';
}

function sm_toll_free_number($default) {
    $tf_number = isset($default) ? $default : '8669874135';

    // campaign controls
    if (
        isset($_GET['utm_campaign']) &&
        $_GET['utm_campaign'] == 'best-ccp-comparizone'
    ) {
        $tf_number = '8773696639';
    }
    /*
    if (isset($_GET['utm_campaign']) && $_GET['utm_campaign'] == 'website-planet') {
        $tf_number = '8336653337';
    }
    */

    return $tf_number;
}

function disable_wp_auto_p($content) {
    remove_filter('the_content', 'wpautop');
    remove_filter('the_excerpt', 'wpautop');
    return $content;
}
add_filter('the_content', 'disable_wp_auto_p', 0);

// used in twig templates to check if a page and block has A/B testing and if so which version to output
function ab_testing_check() {
    $id = get_the_ID();
    $post_meta = intval(get_post_meta(23960, 'a_b_trial', true));
    $post_meta++;
    update_post_meta(23960, 'a_b_trial', $post_meta);

    if ($post_meta % 2 == 0) {
        return "A";
    } else {
        return "B";
    }
}

function admin_dump($data) {
    if (current_user_can('manage_options')) {
        echo '<pre>';
        var_dump($data);
        echo '</pre>';
    }
}

function remove_private_prefix($title) {
    $title = str_replace('Private: ', '', $title);
    return $title;
}
add_filter('the_title', 'remove_private_prefix');
