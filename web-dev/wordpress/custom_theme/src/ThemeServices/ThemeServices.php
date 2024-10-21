<?php

namespace ThemeServices;

use ThemeServices\Theme\ContentBlocks;

use ThemeServices\Helper\TinyMCE;
use ThemeServices\Helper\EnvSwitcher;
use ThemeServices\Helper\AdminLangSwitcher;
use ThemeServices\Helper\Modules;
use ThemeServices\Services\Search;
use ThemeServices\Theme\Render;
use ThemeServices\Theme\AdminFields;

class ThemeServices {
    public $ThemePath;
    public $ThemeURI;
    public $Blog;
    public $Version;
    public $Language;
    public $ThemeServices;
    public $MultiLang;
    public $ContentBlocks;

    protected $EnvDomains;

    protected $templatePath;
    protected $previewPath = '/assets/templates/preview/blocks/';
    protected $PhPTemplate = 'assets/templates/blocks/';

    public function __construct() {
        if (!defined('THEME_MODULES')) {
            define('THEME_MODULES', plugin_dir_path(__FILE__) . '/Modules/');
        }

        $this->classVariables();
        $this->Actions();
        $this->Filters();
        $this->Shortcodes();
        // $this->disableComments();

        $this->init();

        EnvSwitcher::enable($this->EnvDomains);

        Modules::enable();
        AdminFields::enable();

        if (ENVIRONMENT == 'local_ddev') {
            $browserSync = new \ThemeServices\Helper\TriggerBrowsersync();
        }
    }

    private function classVariables() {
        $this->templatePath = get_template_directory() . '/templates';
        $this->ThemePath = get_template_directory();
        $this->ThemeURI = get_template_directory_uri();
        $this->ThemeServices = $this;
        $this->Language = $this->getLanguage();
        $this->Version = $this->getVersion();
        $envDomains = [
            'public' => [
                'label' => 'Prod Frontend',
                'url' => 'https://customThememerchants.com',
            ],
            'production' => [
                'label' => 'Prod Backend',
                'url' => 'https://wordpress-prod-appsvc.azurewebsites.net',
            ],
            'dev' => [
                'label' => 'Dev Environment',
                'url' => 'https://wordpress-dev-appsvc.azurewebsites.net',
            ],
            'qa' => [
                'label' => 'QA Environment',
                'url' => 'https://wordpress-qa-appsvc.azurewebsites.net',
            ],
        ];

        $user = wp_get_current_user();
        if (
            is_object($user) &&
            isset($user->data) &&
            $user->user_login == 'grodriguez'
        ) {
            $envDomains['local'] = [
                'label' => 'Local Environment',
                'url' => 'https://customTheme.ddev.site',
            ];
            // $envDomains['local-qa'] = [
            //     'label' => 'Local QA Environment',
            //     'url' => 'https://customTheme.qa.ddev.site',
            // ];
        }

        $this->EnvDomains = $envDomains;
    }

    protected function getLanguage() {
        $postID = get_the_ID();
        if ($postID) {
            $lang = get_field('content_language', $postID);

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
    }

    private function getContentBlocks() {
        $render = Render::getInstance();
        $ContentBlocks = new ContentBlocks($render);

        return $ContentBlocks;
    }

    private function init() {
        $this->ContentBlocks = $this->getContentBlocks();
        $TinyMCE = new TinyMCE();

        $upload_path = get_option('upload_path');
        $upload_url = get_option('upload_url_path');
        // add_action('plugins_loaded', );

        if (WP_CONTENT_URL && WP_CONTENT_DIR) {
            $folder = '/uploads';
            $media_path = WP_CONTENT_DIR . $folder;
            $media_url = WP_CONTENT_URL . $folder;

            if ($upload_path != $media_path) {
                update_option('upload_path', $media_path);
            }

            if ($upload_url != $media_url) {
                update_option('upload_url_path', $media_url);
            }
        }
    }

    public function ImageSize() {
        if (!current_theme_supports('post-thumbnails')) {
            add_theme_support('post-thumbnails');
        }
        add_image_size('hero-article', 1100, 560, false);
        add_image_size('panel-img', 1200, 1305, false);
        add_image_size('related-article', 500, 263, false);
        add_image_size('sm-desktop', 1024, 450, false);
        add_image_size('tablet', 880, 400, false);
        add_image_size('sm-tablet', 767, 350, false);
        add_image_size('mobile', 400, 300, false);
        add_image_size('img-800-800', 800, 800, false);
        add_image_size('img-664-664', 664, 664, false);
        add_image_size('img-500-500', 500, 500, false);
        add_image_size('img-450-450', 450, 450, false);
        add_image_size('img-400-400', 400, 400, false);
        add_image_size('img-350-350', 350, 350, false);
        add_image_size('img-330-330', 330, 330, false);
        add_image_size('img-300-300', 300, 300, false);
        add_image_size('img-200-200', 200, 200, false);
        add_image_size('img-200-280', 200, 280, false);
        add_image_size('img-200-65', 200, 65, false);
        add_image_size('img-150-55', 150, 55, false);
        add_image_size('img-130-130', 130, 130, false);
        add_image_size('img-100-100', 100, 100, false);
        add_image_size('img-50', 50, 50, true);
    }

    function image_sizes($sizes) {
        return array_merge($sizes, [
            'related-article' => __('Related Article'),
            'hero-article' => __('Hero Article'),
        ]);
    }

    function customTheme_search() {
        $Search = new Search();
        $Search->doSearch();
    }

    private function Actions() {
        add_action('wp_ajax_customTheme_search', [$this, 'customTheme_search']);
        add_action('wp_ajax_nopriv_customTheme_search', [$this, 'customTheme_search']);

        add_action('wp', [$this, 'wp_init']);
        add_action('init', [$this, 'blog_campaigns']);
        add_action('admin_init', [$this, 'admin_init']);


        add_action('wp_enqueue_scripts', [$this, 'templateStyle']);
        add_action('wp_enqueue_scripts', [$this, 'templateScript']);

        add_action('job_manager_job_filters_search_jobs_end', function () {
            echo '<button class="btn reset" onclick="FWP.reset()">Reset</button>';
        });

        if (ENVIRONMENT == 'local_ddev') {
            add_action('acf/init', [$this, 'acf_dev_mode']);
        }
    }

    public function acf_dev_mode() {
        acf_update_setting('acfe/dev', false);
        acf_update_setting('acfe/json', false);
        acf_update_setting('acfe/php', false);
    }

    private function register_assets() {
        wp_register_style(
            'sk-style-lander',
            $this->ThemeURI . '/assets/css/styles/landers.css',
            [],
            $this->getVersion(),
        );

        wp_register_style(
            'sk-blocks',
            $this->ThemeURI . '/assets/css/styles/blocks/blocks.css',
            [],
            $this->getVersion(),
        );
        wp_register_style(
            'sk-lightslider',
            $this->ThemeURI .
                '/assets/vendors/lightslider/dist/css/lightslider.min.css',
            [],
            $this->getVersion(),
        );
        wp_register_style(
            'sk-style-blog',
            $this->ThemeURI . '/assets/css/styles/blogs.css',
            [],
            $this->getVersion(),
        );

        wp_register_script(
            'sk_match-height',
            $this->ThemeURI .
                '/assets/vendors/jquery-match-height/dist/jquery.matchHeight-min.js',
            [],
            $this->getVersion(),
            ['strategy' => 'defer', 'in_footer' => true],
        );
        wp_register_script(
            'sk-scripts',
            $this->ThemeURI . '/assets/js/dist/app.js',
            ['jquery', 'sk_match-height'],
            $this->getVersion(),
            ['strategy' => 'defer', 'in_footer' => true],
        );
    }

    private function Filters() {
        global $pagenow;
        add_filter('body_class', [$this, 'bodyClass']);
        add_filter('script_loader_tag', [$this, 'asyncJs'], 10, 2);

        add_filter('after_setup_theme', [$this, 'ImageSize']);
        add_filter('image_size_names_choose', [$this, 'image_sizes']);


        if (class_exists('acf_revisions')) {
            if (!is_admin() && $pagenow == 'index.php') {
                // Reference to ACF's <code>acf_revisions</code> class
                // We need this to target its method, acf_revisions::acf_validate_post_id
                $acf_revs_cls = acf()->revisions;
                //   // This hook is added the ACF file: includes/revisions.php:36 (in ACF PRO v5.11)
                remove_filter('acf/validate_post_id', [
                    $acf_revs_cls,
                    'acf_validate_post_id',
                    10,
                ]);
            }
        }
    }


    private function Shortcodes() {
        // add_shortcode('img', [$this, 'img_shortcode']);
        add_shortcode('yes', [$this, 'marker_yes']);
        add_shortcode('no', [$this, 'marker_no']);
        add_shortcode('button-modal', [$this, 'button_modal']);
        add_shortcode('button-call', [$this, 'button_call']);
        add_shortcode('savings-calculator', [$this, 'savings_calculator']);
    }

    public function asyncJs($tag, $handle) {
        if (!(strpos($handle, 'app_js') === 0)) {
            return $tag;
        }

        // return str_replace(' src', ' defer src', $tag); // defer the script
        return str_replace(' src', ' async src', $tag); // OR async the script
        // return str_replace(' src', ' async defer src', $tag); // OR do both!
    }

    public function bodyClass($classes) {
        $classes[] = '';

        $post = get_post();
        $template = basename(get_page_template($post));

        if ($template) {
            $template = str_replace('.php', '', $template);
            $template = str_replace('page-', '', $template);
            $classes[] = $template;
        }

        if (ENVIRONMENT != 'production') {
            $classes[] =
                'env-' . str_replace('_', '-', strtolower(ENVIRONMENT));
        } else {
            $classes[] = 'envprd';
        }
        if (function_exists('get_current_user_id')) {
            $classes[] = 'user-' . get_current_user_id();
        }
        return $classes;
    }

    public function marker_yes() {
        return '<img class="b-lazy img-yes b-loaded" alt="Yes" src="' .
            $this->ThemeURI .
            '/assets/media/icons/sk-check.svg">';
    }



    public function marker_no() {
        return '<img class="b-lazy img-no b-loaded" alt="No" src="' .
            $this->ThemeURI .
            '/assets/media/icons/sk-cross.svg">';
    }

    public function button_modal($atts) {
        return '<button class="btn-default size-18-txt c-blue-1 btn-green-1 section-color-white btn-offset-9 open-form-modal" >
			<span class="btn-bg-el"></span><span class="btn-txt">' .
            $atts['title'] .
            '</span></button>';
    }

    public function button_call($atts) {
        $tf_number = isset($atts['number']) ? $atts['number'] : '8669874135';

        /*
    if (isset($_GET['utm_campaign']) && $_GET['utm_campaign'] == 'best-ccp-comparizone') {
      $tf_number = '8773696639';
    }

    if (isset($_GET['utm_campaign']) && $_GET['utm_campaign'] == 'website-planet') {
      $tf_number = '8336653337';
    }
    */

        return "<a href='tel:{$tf_number}' class='btn-default size-18-txt c-blue-1 btn-green-1 section-color-white btn-offset-9'>
			<span class='btn-bg-el'></span><span class='btn-txt'>{$atts['title']}</span></a>";
    }


    protected function getVersion() {
        $version = date('y') . date('m') . date('d');
        return $version;
    }

    public function admin_init() {
        wp_enqueue_style(
            'sk-admin-style',
            $this->ThemeURI . '/assets/css/styles/admin.css',
            [],
            $this->getVersion(),
        );
        wp_enqueue_script(
            'sk-admin-script',
            $this->ThemeURI . '/assets/js/dist/admin.min.js',
            ['acf-input'],
            $this->getVersion(),
            true,
        );
        // die;
    }

    public function wp_init() {
        global $post;
        $this->register_assets();

        AdminLangSwitcher::enable();

        if ($this->isBlog()) {
            wp_enqueue_style('sk-style-blog');
        }

        // Post type must be 'post'.
        $post_type = get_post_type();

        if ($css = get_field('custom_css')) {
            add_action('wp_head', [$this, 'custom_css']);
        }

        if (ENVIRONMENT == 'local_ddev') {
            if (function_exists('wpfc_exclude_current_page')) {
                // wpfc_exclude_current_page();
            }
        } else {
            if ($post_type == 'landings') {
                if (function_exists('wpfc_exclude_current_page')) {
                    // wpfc_exclude_current_page();
                }
            }
        }
    }

    public function templateStyle() {

        wp_enqueue_style(
            'sk-style-bootstrap',
            $this->ThemeURI . '/assets/css/styles/bootstrap.css',
            [],
            $this->getVersion(),
        );
        $post = get_post();

        if ($post && !is_404()) {
            $pageTemplate = basename(get_page_template($post));
            $pageTemplate = $pageTemplate
                ? str_replace('.php', '', $pageTemplate)
                : null;


            if (ENVIRONMENT == 'local_ddev') {
                wp_enqueue_script(
                    'sk_dev_LR_script',
                    $this->ThemeURI . '/assets/js/dist/browser-sync.min.js',
                    [],
                    '',
                    true,
                );
                wp_localize_script('sk_dev_LR_script', 'BS_CONFIG', [
                    'url' =>
                    'https://localhost:3000/browser-sync/browser-sync-client.js?v=2.29.3',
                ]);
                // }

                // wp_enqueue_style(
                //     'sk_dev_local_style' . $pageTemplate,
                //     $this->ThemeURI . '/assets/css/styles/local-dev.css',
                //     [],
                //     $this->getVersion(),
                // );
            }

            // if (!get_sk_skip_smooth_scroll()) {
            //     wp_enqueue_style(
            //         'sk_smooth_scroll',
            //         $this->ThemeURI .
            //             '/assets/css/styles/smooth-scroll/smooth-scroll.css',
            //         [],
            //         $this->getVersion(),
            //     );
            // }

            if ($pageTemplate) {
                $cssFile = "/assets/css/styles/pages/$pageTemplate.css";
                if (file_exists($this->ThemePath . $cssFile)) {

                    wp_enqueue_style(
                        'sk_style_' . $pageTemplate,
                        $this->ThemeURI . $cssFile,
                        [],
                        $this->getVersion(),
                    );
                }

                $pageTemplate = str_replace('.php', '', $pageTemplate);
                $pageTemplate = str_replace('page-', '', $pageTemplate);



                $cssFile = "/assets/css/styles/$pageTemplate.css";

                if (file_exists($this->ThemePath . $cssFile)) {

                    wp_enqueue_style(
                        'sk_style_tn_' . $pageTemplate,
                        $this->ThemeURI . $cssFile,
                        [],
                        $this->getVersion(),
                    );
                }
            }

            if ($post->post_name) {
                $cssFile = "/assets/css/styles/pages/{$post->post_name}.css";

                if (file_exists($this->ThemePath . $cssFile)) {
                    wp_enqueue_style(
                        'sk_style_pn_' . $post->post_name,
                        $this->ThemeURI . $cssFile,
                        [],
                        $this->getVersion(),
                    );
                }
                $cssFile = "/assets/css/styles/pages/page-{$post->post_name}.css";

                if (file_exists($this->ThemePath . $cssFile)) {

                    wp_enqueue_style(
                        'sk_style_pn_type' . $post->post_name,
                        $this->ThemeURI . $cssFile,
                        [],
                        $this->getVersion(),
                    );
                }
            }

            $postName = isset($post->post_type) ? $post->post_type : null;


            if ($postName) {
                $cssFile = "/assets/css/styles/pages/$postName.css";

                if (file_exists($this->ThemePath . $cssFile)) {
                    wp_enqueue_style(
                        'sk_style_pt-' . $postName,
                        $this->ThemeURI . $cssFile,
                        [],
                        $this->getVersion(),
                    );
                }

                $cssFile = "/assets/css/styles/post/$postName-$post->ID.css";

                if (file_exists($this->ThemePath . $cssFile)) {
                    wp_enqueue_style(
                        'sk_style_pt-pn--' . $postName,
                        $this->ThemeURI . $cssFile,
                        [],
                        $this->getVersion(),
                    );
                }
            }
        } elseif (is_404()) {
            wp_enqueue_style(
                'sk_style_404',
                $this->ThemeURI . '/assets/css/styles/pages/404.css',
                [],
                $this->getVersion(),
            );
        }
    }

    public function templateScript() {
        $post = get_post();


        $pageTemplate = basename(get_page_template($post));
        $pageTemplate = $pageTemplate
            ? str_replace('.php', '', $pageTemplate)
            : null;



        if ($pageTemplate) {
            $jsFile = "/assets/js/post/$pageTemplate.js";
            if (file_exists($this->ThemePath . $jsFile)) {
                wp_enqueue_script(
                    'sk_style_' . $pageTemplate,
                    $this->ThemeURI . $jsFile,
                    [],
                    $this->getVersion(),
                );
            }

            $pageTemplate = str_replace('.php', '', $pageTemplate);
            $pageTemplate = str_replace('page-', '', $pageTemplate);

            $jsFile = "/assets/js/post/$pageTemplate.js";

            if (file_exists($this->ThemePath . $jsFile)) {
                wp_enqueue_script(
                    'sk_style_' . $pageTemplate,
                    $this->ThemeURI . $jsFile,
                    [],
                    $this->getVersion(),
                );
            }
        }

        if (isset($post->post_type) && $postName = $post->post_type) {
            $jsFile = "/assets/js/post/$postName.js";
            if (file_exists($this->ThemePath . $jsFile)) {
                wp_enqueue_script(
                    'sk_style_pt-' . $postName,
                    $this->ThemeURI . $jsFile,
                    [],
                    $this->getVersion(),
                );
            }

            $jsFile = "/assets/js/post/$postName-$post->ID.js";
            if (file_exists($this->ThemePath . $jsFile)) {
                wp_enqueue_script(
                    'sk_style_pt-' . $postName,
                    $this->ThemeURI . $jsFile,
                    [],
                    $this->getVersion(),
                );
            }
        }
    }

    public function disableComments() {
        add_action('admin_init', function () {
            // Redirect any user trying to access comments page
            global $pagenow;

            if ($pagenow === 'edit-comments.php') {
                // wp_safe_redirect(admin_url());
                exit();
            }

            // Remove comments metabox from dashboard
            remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');

            // Disable support for comments and trackbacks in post types
            foreach (get_post_types() as $post_type) {
                if (post_type_supports($post_type, 'comments')) {
                    remove_post_type_support($post_type, 'comments');
                    remove_post_type_support($post_type, 'trackbacks');
                }
            }
        });

        // Close comments on the front-end
        add_filter('comments_open', '__return_false', 20, 2);
        add_filter('pings_open', '__return_false', 20, 2);

        // Hide existing comments
        add_filter('comments_array', '__return_empty_array', 10, 2);

        // Remove comments page in menu
        add_action('admin_menu', function () {
            remove_menu_page('edit-comments.php');
        });

        // Remove comments links from admin bar
        add_action('init', function () {
            if (is_admin_bar_showing()) {
                remove_action(
                    'admin_bar_menu',
                    'wp_admin_bar_comments_menu',
                    60,
                );
            }
        });
    }

    /**
     * WordPress' missing isBlog_page() function.  Determines if the currently viewed page is
     * one of the blog pages, including the blog home page, archive, category/tag, author, or single
     * post pages.
     *
     * @return bool
     */
    public function isBlog() {
        // Check all blog-related conditional tags, as well as the current post type,
        // to determine if we're viewing a blog page.
        return ((is_archive() ||
            is_author() ||
            is_category() ||
            is_homepage() ||
            is_single() ||
            is_tag()) &&
            'post' == get_post_type()) ||
            'case-studies' == get_post_type() ||
            basename(get_page_template()) == 'page-blog.php';
        // return ($post_type === 'post') && (is_homepage() || is_archive() || is_single());
    }

    public function custom_css() {
        global $post;
        $css = get_field('custom_css', $post);
        $css = trim($css);

        echo "<style>$css</style>";
    }

    public function savings_calculator($atts, $content = null) {
        // ob_start();
        wp_enqueue_script(
            'sc_jquery',
            get_template_directory_uri() .
                '/assets/js/dist/savings-calculator.js',
            [],
            $this->Version,
            ['strategy' => 'defer', 'in_footer' => true],
        );
        include_once $this->ThemePath . '/savings-calculator.php';
        return savings_calculator($atts, $content);
    }

    public function blog_campaigns() {
        register_taxonomy(
            'campaigns',
            [
                0 => 'post',
                0 => 'case-studies',
            ],
            [
                'labels' => [
                    'name' => 'Blog Campaigns',
                    'singular_name' => 'Blog Campaign',
                    'menu_name' => 'Blog Campaigns',
                    'all_items' => 'All Blog Campaigns',
                    'edit_item' => 'Edit Campaigns',
                    'view_item' => 'View Campaigns',
                    'update_item' => 'Update Campaigns',
                    'add_new_item' => 'Add New Campaigns',
                    'new_item_name' => 'New Campaigns Name',
                    'search_items' => 'Search Blog Campaigns',
                    'popular_items' => 'Popular Blog Campaigns',
                    'separate_items_with_commas' =>
                    'Separate blog campaigns with commas',
                    'add_or_remove_items' => 'Add or remove blog campaigns',
                    'choose_from_most_used' =>
                    'Choose from the most used blog campaigns',
                    'not_found' => 'No blog campaigns found',
                    'no_terms' => 'No blog campaigns',
                    'items_list_navigation' => 'Blog Campaigns list navigation',
                    'items_list' => 'Blog Campaigns list',
                    'back_to_items' => '← Go to blog campaigns',
                    'item_link' => 'Campaigns Link',
                    'item_link_description' => 'A link to a campaigns',
                ],
                'rewrite' => ['slug' => 'content-topic', 'with_front' => true],
                'public' => true,
                'show_in_menu' => true,
                'show_in_rest' => false,
                'show_tagcloud' => false,
                'show_in_quick_edit' => false,
            ],
        );
    }
}
