<?php

namespace ThemeServices\Theme;

use ThemeServices\ThemeServices;
use ThemeServices\Theme\Blog;
use ThemeServices\Services\Search;
use ThemeServices\Helper\CustomThemeTimber;
use Timber\Timber;
use Timber\Loader;
use WP_Query;

class Render extends ThemeServices {
    private static $instance = null;
    private $StylePath;
    private $StyleURI;
    private $ScriptPath;
    private $ScriptURI;
    public $DefaultContext;
    private $CacheTime = 0;
    private $Context;
    private $TemplatePath;
    private $ModulePath;
    public $Language = 'en';
    public $Version = '1.0.0';

    function __construct() {
        $this->TemplatePath = get_template_directory() . '/templates/';
        $this->ModulePath = get_template_directory() . '/blocks/';
        $this->StylePath =
            get_template_directory() . '/assets/css/styles/blocks/';
        $this->ScriptPath = get_template_directory();
        $this->ScriptURI = get_template_directory_uri();

        add_filter('timber/locations', function ($paths) {
            $paths[] = [
                $this->TemplatePath,
                get_template_directory() . '/templates',
            ];

            return $paths;
        });

        apply_filters('timber/cache/mode', function () {
            return Timber\Loader::CACHE_TRANSIENT;
        });

        add_filter('timber/twig/functions', [$this, 'twig_functions']);

        $this->CacheTime = 1000;
        if (is_dev_env()) {
            $this->CacheTime = 0;
        }

        CustomThemeTimber::init();
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Render();
        }
        return self::$instance;
    }

    public function Lander($post) {
        $context = Timber::context();
        $this->Language = $this->getLanguage();

        $context['lander'] = $post;
        $context['field'] = get_fields();
        $context['lang'] = $this->Language;
        $context['current_domain'] =
            'https://' . $_SERVER['HTTP_HOST'] . '/wp-content/themes/customTheme';
        $content = $post->post_content;
        if (has_blocks($content)) {
            $content = do_blocks($content);
            $content = do_shortcode($content);
            $content = str_replace(']]>', ']]&gt;', $content);
        }
        $context['content'] = $content;

        echo '<!-- Start Lander Template: lander/single.twig -->';
        Timber::render('lander/single.twig', $context, $this->CacheTime);
        echo '<!-- End Lander -->';
    }

    public function TwigRender(
        string $template,
        array|string $additionalContext = [],
        string|array $library = null,
        WP_Post $post = null,
    ) {
        $this->Language = $this->getLanguage();
        $defaultContext = Timber::context();
        $additionalContext = is_array($additionalContext)
            ? $additionalContext
            : [$additionalContext];

        $context = array_merge($defaultContext, $additionalContext);
        $post = $post ? $post : get_post();

        $filepath = $this->StylePath . $library . '.css';

        if (file_exists($filepath)) {
            $style = $this->StyleURI . $library . '.css';

            add_action('wp_footer', function () use ($library, $style) {
                if (!is_admin()) {
                    wp_enqueue_style(
                        $library,
                        $style,
                        [],
                        $this->Version,
                        false,
                    );
                }
            });
        }

        $context['field'] = $context['field'] ?? get_fields();
        $context['lang'] = $this->Language;

        $context['current_domain'] =
            'https://' . $_SERVER['HTTP_HOST'] . '/wp-content/themes/customTheme';
        $context['context'] = $context;

        echo '<!-- Start Render Twig Template: ' . $template . ' -->';
        Timber::render(
            $this->templatePath . $template,
            $context,
            $this->CacheTime,
        );
        echo '<!-- End Render Twig Template: ' . $template . ' -->';
    }

    public function ContentBlock(
        $block,
        $content = '',
        $is_preview = false,
        $post_id = 0,
        $wp_block = null,
    ) {
        // dump($block, $content, $is_preview, $post_id, $wp_block);
        // Timber::$dirname = 'twigs';
        //do_action('qm/start', 'Preblock_' . $block['name']);
        $context = Timber::context();
        $this->Language = $this->getLanguage();
        $post = get_post();

        $context['lander'] = $post;
        $context['block'] = $block;
        $context['field'] = get_fields();
        $context['lang'] = $this->Language;
        $context['is_preview'] = $is_preview;
        $context['Template'] = $this->TemplatePath;
        $context['sectionID'] = get_field('section_id')
            ? get_field('section_id')
            : $context['block']['id'];
        $templateName = strtok(get_page_template_slug(), '.');

        $templateName = ($templateName) ? $templateName : strtok(basename(get_page_template()), '.');

        $context['single_template'] = $templateName;



        if (is_array($context['field'])) {
            foreach ($context['field'] as $key => $value) {
                if (!isset($context[$key])) {
                    $context[$key] = $value;
                }
            }
        }

        if (is_array($context['field'])) {
            foreach ($context['field'] as $key => $value) {
                if (!isset($context[$key])) {
                    $context[$key] = $value;
                }
            }
        }

        //do_action('qm/stop', 'Preblock_' . $block['name']);
        $acf_blocks = parse_blocks($post->post_content);
        $firstAcfBlock = reset($acf_blocks);
        $lastAcfBlock = end($acf_blocks);

        //do_action('qm/start', 'first_block_' . $block['name']);
        $context['first_block'] = $context['last_block'] = false;

        if (isset($block['data'])) {
            if (isset($firstAcfBlock['attrs']['data'])) {
                $context['first_block'] =
                    $firstAcfBlock['attrs']['data'] == $block['data'];
            }

            if (isset($lastAcfBlock['attrs']['data'])) {
                $context['last_block'] =
                    $lastAcfBlock['attrs']['data'] == $block['data'];
            }
        }

        //do_action('qm/stop', 'first_block_' . $block['name']);

        //do_action('qm/start', 'acf_columns_' . $block['name']);

        if (
            $block['name'] == 'acf/four-columns-table' &&
            isset($context['field']['rows'])
        ) {
            $table = [
                'one' => [],
                'two' => [],
                'three' => [],
                'four' => [],
                'five' => [],
            ];
            foreach ($context['field']['rows'] as $row) {
                if (isset($row['heading_one']) || isset($row['image_one'])) {
                    $table['one']['heading'] = $row['heading_one'];
                    $table['one']['image'] = $row['image_one'];
                }

                if (isset($row['heading_two']) || isset($row['image_two'])) {
                    $table['two']['heading'] = $row['heading_two'];
                    $table['two']['image'] = $row['image_two'];
                }
                if (
                    isset($row['heading_three']) ||
                    isset($row['image_three'])
                ) {
                    $table['three']['heading'] = $row['heading_three'];
                    $table['three']['image'] = $row['image_three'];
                }
                if (isset($row['heading_four']) || isset($row['image_four'])) {
                    $table['four']['heading'] = $row['heading_four'];
                    $table['four']['image'] = $row['image_four'];
                }
                if (isset($row['heading_five']) || isset($row['image_five'])) {
                    $table['five']['heading'] = $row['heading_five'];
                    $table['five']['image'] = $row['image_five'];
                }

                if (isset($row['table_row'])) {
                    foreach ($row['table_row'] as $key => $value) {
                        $table['one']['table_row'][$key] = [
                            'heading' => $value['column_one'],
                        ];
                        $table['two']['table_row'][$key] = [
                            'heading' => $value['column_one'],
                            'radio' => $value['column_two_radio'],
                            'text' => $value['column_two_text'],
                        ];
                        $table['three']['table_row'][$key] = [
                            'heading' => $value['column_one'],
                            'radio' => $value['column_three_radio'],
                            'text' => $value['column_three_text'],
                        ];
                        $table['four']['table_row'][$key] = [
                            'heading' => $value['column_one'],
                            'radio' => $value['column_four_radio'],
                            'text' => $value['column_four_text'],
                            'bold' => $value['bold'],
                        ];
                        $table['five']['table_row'][$key] = [
                            'heading' => $value['column_one'],
                            'radio' => $value['column_five_choice'],
                            'text' => $value['column_five_text'],
                        ];
                    }
                }
            }
            $context['table'] = $table;
        }
        //do_action('qm/stop', 'acf_columns_' . $block['name']);
        //do_action('qm/start', 'acf_columns_table_' . $block['name']);
        if (
            $block['name'] == 'acf/multi-columns-table' &&
            isset($context['field']['rows'])
        ) {
            $rows = $context['field']['rows'];
            $tableRows = $rows[1]['table_row'];

            $table = [];
            foreach ($rows[0]['cell'] as $index => $tableRow) {
                if ($index != 0) {
                    $newRow = [
                        'heading' => $rows[0]['cell'][$index]['heading'],
                        'image' => $rows[0]['cell'][$index]['image'],
                        'table_row' => [],
                    ];

                    foreach ($tableRows as $indx => $subTableRow) {
                        $newRow['table_row'][] = [
                            'heading' => $subTableRow['column'][0]['content'],
                            'radio' => isset($subTableRow['column'][$index])
                                ? $subTableRow['column'][$index]['checkmark']
                                : '',
                            'content' => isset($subTableRow['column'][$index])
                                ? $subTableRow['column'][$index]['content']
                                : '',
                            'image' => isset($subTableRow['column'][$index])
                                ? $subTableRow['column'][$index]['image']
                                : '',
                        ];
                    }

                    $table[] = $newRow;
                }
            }

            $context['table'] = $table;
        }

        if (
            $block['name'] == 'acf/right-video' ||
            $block['name'] == 'acf/sk-panel-video' ||
            $block['name'] == 'acf/sk-page-multicircles'
        ) {
            $url = get_field('video_embed_link');
            if (empty($url)) {
                $url = get_field('video_area');
                $url = $url ? $url['video_link'] : null;
            }

            if ($url) {
                $parseURL = parse_url($url, PHP_URL_QUERY);

                if ($parseURL) {
                    parse_str(
                        parse_url($url, PHP_URL_QUERY),
                        $my_array_of_vars,
                    );
                    $context['video_id'] = $my_array_of_vars['v'];
                }
            }
        }

        //do_action('qm/stop', 'acf_columns_video_' . $block['name']);

        //do_action('qm/start', 'acf_columns_merchant_' . $block['name']);
        $context['uid'] = 'skbk-' . substr($context['block']['id'], -6);

        if ($block['name'] == 'acf/sk-merchant-spotlight') {
            // Declaring all variables
            // $cat_id = get_field('industries_blog_category'); create such a field in industries field group with type of number
            $taxonomy_id = get_field('select_blog_posts_categories');
            $newsSectionHeading = get_field('industry_related_posts_heading');
            $blogLinkText = get_field('blog_link_text');
            $id = get_field('section_id');

            $context['spotlight'] = [];

            $wpQuery = new WP_Query([
                'post_type' => 'post',
                'post_status' => 'publish',
                'tax_query' => [
                    [
                        'taxonomy' => 'content-type',
                        'field' => 'term_id',
                        'terms' => $taxonomy_id,
                    ],
                ],
            ]);

            while ($wpQuery->have_posts()) {
                $wpQuery->the_post();
                $context['spotlight'][] = [
                    'ID' => get_the_ID(),
                    'title' => get_the_title(),
                    'link' => get_the_permalink(),
                    'image' => get_the_post_thumbnail_url(),
                    'excerpt' => get_the_excerpt(),
                    // 'date' => get_the_date(),
                    // 'author' => get_the_author(),
                    // 'category' => get_the_category(),
                ];
            }
            wp_reset_postdata();
        }

        //do_action('qm/stop', 'acf_columns_merchant_' . $block['name']);
        //do_action('qm/start', 'acf_columns_showcase_' . $block['name']);

        if ($block['name'] == 'acf/sk-industries-showcase') {
            $query = [
                'post_type' => get_field('post_showcase') ?? 'industries',
                'post_status' => $this->Language == 'fr' ||  $this->Language == 'es' ? ['draft', 'publish'] : 'publish',
                'posts_per_page' => -1,
                'orderby' => get_field('post_showcase')
                    ? 'menu_order'
                    : 'title',
                'order' => 'ASC',
                'post__not_in' => [32229, 32226],
                'meta_key' => 'content_language',
                'meta_value' => get_field('content_language', get_the_ID()),

            ];



            // WP Query for all Rates posts
            $wpQuery = new WP_Query($query);


            while ($wpQuery->have_posts()) {
                $wpQuery->the_post();

                $title = null;
                if ($this->Language == 'es') {
                    $title = get_field('spanish', get_the_ID());
                } elseif ($this->Language == 'fr') {
                    $title = get_field('french', get_the_ID());
                }

                if (!$title) {
                    $title = get_the_title();
                }

                $postStatus = get_post()->post_status;

                if (get_post_type(get_the_ID()) == 'equipment') {
                    $context['equipment'][] = [
                        'ID' => get_the_ID(),
                        'title' => $title,
                        'link' => get_the_permalink(),
                        'icon' => get_post_thumbnail_id(get_the_ID()),
                        'status' => $postStatus,
                    ];
                } else {
                    $context['spotlight'][] = [
                        'ID' => get_the_ID(),
                        'title' => $title,
                        'link' => get_the_permalink(),
                        'icon' => get_field('icon_industry', get_the_ID()),
                        'status' => $postStatus,
                    ];
                }
            }
            wp_reset_postdata();
        }

        if ($block['name'] == 'acf/sk-page-rates') {
            $postLanguage = get_field('content_language', get_the_ID());

            // WP Query for all Rates posts
            $mainRates = new WP_Query([
                'post_type' => 'rates',
                'orderby' => 'menu_order',
                'order' => 'ASC',
                'post_status' => $this->Language == 'fr' || $this->Language == 'es'  ? ['draft', 'publish'] : 'publish',
                'meta_key' => 'content_language',
                'post__not_in' => [29530, 30678],
                'meta_value' => $postLanguage,
            ]);

            while ($mainRates->have_posts()) {
                $mainRates->the_post();
                $postStatus = get_post()->post_status;
                $context['rates'][] = [
                    'ID' => get_the_ID(),
                    'title' => get_the_title(),
                    'link' => get_the_permalink(),
                    'status' => $postStatus,
                    'image' => get_the_post_thumbnail_url(),
                    'excerpt' => get_the_excerpt(),
                ];
            }
            wp_reset_postdata();
        }

        $context['block_id'] = $block['block_id'];
        $template = $block['render_template'];

        $blockNameParts = explode('/', $block['name']);
        $moduleDirectory = $this->ModulePath . end($blockNameParts);
        $moduleTemplate =
            $this->ModulePath . end($blockNameParts) . '/' . $template;
        //do_action('qm/stop', 'post_after_' . $block['name']);

        //do_action('qm/start', 'context_' . $block['name']);
        if (file_exists($moduleTemplate)) {
            $template = $moduleTemplate;
        }

        if (file_exists("$moduleDirectory/functions.php")) {
            include_once "$moduleDirectory/functions.php";
        }

        $this->Context = $context;
        //do_action('qm/stop', 'context_' . $block['name']);

        // echo '<div class="' . $context['block']['id'] . ' timber-block">';
        $context['context'] = $context;

        $overwriteTemplate = $post->post_type . '/' . $template;

        if (file_exists($this->TemplatePath . $overwriteTemplate)) {
            $template = $overwriteTemplate;
        }

        echo '<!-- Start ' . $block['name'] . ' Template: ' . $template . ' -->';
        Timber::render($template, $context, $this->CacheTime);
        echo '<!-- End_' . $block['name'] . ' -->';
    }

    public function Image(
        $image,
        $size = 'full',
        $args = [],
        $lazyload = true
    ) {
        $first_block = isset($this->Context['first_block'])
            ? $this->Context['first_block']
            : false;

        if (is_string($image)) {
            $image = attachment_url_to_postid($image);
        }

        // dump($image, get_field('mobile_img', $image));

        $imageSrc = wp_get_attachment_image_url($image, $size);
        $mobile_image = get_field('mobile_img', $image);
        $tablet_image = get_field('tablet_img', $image);

        if ($imageSrc) {
            global $post;

            $alt = get_post_meta($image, '_wp_attachment_image_alt', true);
            if (is_object($post) && isset($post->ID)) {
                $lang = get_field('content_language', $post->ID);

                switch ($lang) {
                    case 'es_US':
                        $alt = get_field('spanish_alt_text', $image) ?? $alt;
                        break;
                    case 'fr_CA':
                        $alt = get_field('french_alt_text', $image) ?? $alt;
                        break;
                }
            }

            $imgsrcset = wp_get_attachment_image_srcset($image, $size);
            $imgsizes = wp_get_attachment_image_sizes($image, $size);



            $mobileImageSrc = ($mobile_image) ? wp_get_attachment_image_url($mobile_image['ID'], $size) : false;
            $tabletImageSrc = ($tablet_image) ? wp_get_attachment_image_url($tablet_image['ID'], $size) : false;

            if ($mobileImageSrc || $tabletImageSrc) {







                if ($mobileImageSrc) {
                    $m_imgsrcset = wp_get_attachment_image_srcset($mobile_image['ID'], $size);
                    $m_imgsizes = wp_get_attachment_image_sizes($mobile_image['ID'], $size);
                    $element = '<span class="d-tablet-none d-desktop-none">';
                    $element .= $this->GenerateImage(
                        $m_imgsrcset,
                        $m_imgsizes,
                        $mobileImageSrc,
                        $alt,
                        $args,
                        $lazyload,
                        $first_block,
                    );
                    $element .= '</span>';
                }
                if ($tabletImageSrc) {
                    $t_imgsrcset = wp_get_attachment_image_srcset($tablet_image['ID'], $size);
                    $t_imgsizes = wp_get_attachment_image_sizes($tablet_image['ID'], $size);
                    $element .= '<span class="d-mobile-none d-desktop-none">';
                    $element .= $this->GenerateImage(
                        $t_imgsrcset,
                        $t_imgsizes,
                        $tabletImageSrc,
                        $alt,
                        $args,
                        $lazyload,
                        $first_block,
                    );
                    $element .= '</span>';
                }

                $element .= ($tabletImageSrc) ? '<span class="d-mobile-none d-tablet-none">' : '<span class="d-mobile-none">';
                $element .= $this->GenerateImage(
                    $imgsrcset,
                    $imgsizes,
                    $imageSrc,
                    $alt,
                    $args,
                    $lazyload,
                    $first_block,
                );
                $element .= '</span>';
            } else {
                $element = $this->GenerateImage(
                    $imgsrcset,
                    $imgsizes,
                    $imageSrc,
                    $alt,
                    $args,
                    $lazyload,
                    $first_block,
                );
            }

            return $element;
        } else {
            return '<!-- No image found -->';
        }
    }


    private function GenerateImage($imgsrcset, $imgsizes, $imageSrc, $alt, $args, $lazyload, $first_block) {
        $element = '';
        if ($imgsrcset) {
            $element = '<picture aria-label="' . esc_attr($alt) . '">';
            $element .= '<source srcset="' . esc_attr($imgsrcset) . '" sizes="' . esc_attr($imgsizes) . '">';
        }

        $element .= '<img ';
        if ($first_block || !$lazyload) {
            $class = isset($args['class']) ? $args['class'] : 'first-block-image';
            $element .= 'src="' . esc_attr($imageSrc) . '" ';
        } else {
            $class = isset($args['class']) ? 'b-lazy ' . $args['class'] : 'b-lazy';
            $element .= 'data-src="' . esc_attr($imageSrc) . '" ';
        }

        $height = isset($args['height']) ? $args['height'] : '';
        $width = isset($args['width']) ? $args['width'] : '';
        $element .= 'class="' . esc_attr($class) . '" ';
        $element .= 'alt="' . esc_attr($alt) . '" ';
        $element .= 'height="' . esc_attr($height) . '" ';
        $element .= 'width="' . esc_attr($width) . '" ';
        $element .= '/>';

        if ($imgsrcset) {
            $element .= '</picture>';
        }

        return $element;
    }


    public function twig_functions($functions) {
        $functions['Img'] = $functions['img'] = $functions['image'] = $functions['Image'] = [
            'callable' => [$this, 'Image'],
        ];

        $functions['checkmark'] = [
            'callable' => [$this, 'checkmark'],
        ];

        return $functions;
    }

    public function checkmark($type = 'yes') {
        $check = get_template_directory_uri() . '/assets/media/icons/check.svg';
        $check = get_template_directory_uri() . '/assets/media/icons/cross.svg';

        $check = 21656;
        $cross = 22144;

        $indicator = $type == 'Yes' ? $check : $cross;

        return $this->Image($indicator, 'full', [
            'width' => 21,
            'height' => 15,
        ]);
    }

    public function BlogHome() {
        $context = Timber::context();

        $context['paged'] = get_query_var('paged') ? get_query_var('paged') : 1;
        /*** Get Latests ***/

        // $gridArticles = $CustomTheme->paginate($searchQuery);
        $argsPost = [
            'numberposts' => 1,
            'posts_per_page' => 1,
            'post_type' => ['post', 'case-studies'],
            'offset' => 0,
            'orderby' => 'post_date',
            'order' => 'DESC',
            'post_status' => 'publish',
        ];

        $query = [
            'post_type' => ['post', 'case-studies'],
            'post_status' => 'publish',
            'posts_per_page' => 9,
            'paged' => $context['paged'],
            'order' => 'DESC',
        ];
        // query
        $featuredArticle = new WP_Query($argsPost);

        $Search = new \ThemeServices\Services\Search();

        if (!isset($data)) {
            $results = $Search->doSearch(false);
            $data = $results['data'];
            $searchQuery = $results['query'];
        }

        if (!empty($data)) {
            if (!isset($data['filter'])) {
                $data['filter'] = [];
            }
        }

        $context['filters']['category'] = $Search->getFilters(
            'category',
            $data,
            $searchQuery,
            $context['paged'],
        );
        $context['filters']['business_type'] = $Search->getFilters(
            'business-type',
            $data,
            $searchQuery,
            $context['paged'],
        );
        $context['filters']['content_type'] = $Search->getFilters(
            'content-type',
            $data,
            $searchQuery,
            $context['paged'],
        );
        $context['search_value'] = isset($_GET['search'])
            ? esc_attr($_GET['search'])
            : '';

        while ($featuredArticle->have_posts()) {
            $featuredArticle->the_post();

            $postId = get_the_ID();

            $size = 'full';
            $featuredBgImg = get_field('featured_background_image');
            if ($featuredBgImg) {
                $featuredBgImg_url = wp_get_attachment_image_url(
                    $featuredBgImg,
                    $size,
                );
            } else {
                $featuredBgImg_url = wp_get_attachment_url(
                    get_post_thumbnail_id($postId),
                );
            }

            foreach (get_the_category() as $category) {
                $catname[] = [
                    'id' => $category->term_id,
                    'link' => get_category_link($category->term_id),
                    'name' => $category->cat_name,
                ];
            }

            $mycontent = get_the_content();
            $word = str_word_count(strip_tags($mycontent));
            $m = floor($word / 200);
            $est = $m . ' min read';

            $context['featured'] = [
                'featured_bg' => $featuredBgImg,
                'featured_bg_url' => $featuredBgImg_url,
                'category' => $catname,
                'date' => get_the_date('F d, Y'),
                'title' => get_the_title(),
                'excerpt' => get_the_excerpt(),
                'readtime' => $est,
                'link' => get_the_permalink(),
            ];
        }

        wp_reset_postdata();

        $context['context'] = $context;
        echo '<!-- Start page blog Template: page-blog.twig -->';
        Timber::render('page-blog.twig', $context, $this->CacheTime);
        echo '<!-- End page blog -->';
    }

    public function Single($post, $template = '') {
        $context = Timber::context();
        $timber_post = Timber::get_post();

        $this->CacheTime = 0;
        if (is_dev_env()) {
            $this->CacheTime = 0;
        }

        while (have_posts()) :
            the_post();

            $context['related_posts'] = Blog::GetRelatedPosts($post->ID);
            $context['blog_post'] = $post;

            $context['theme_url'] = get_template_directory_uri();
            $context['permalink'] = get_permalink();
            $context['categories'] = get_categories();

            $toc = Blog::GenerateToc($post->post_content);
            $context['toc_list'] = $toc['toc_list'];
            $context['toc'] = $toc['toc'];

            $content = $toc['content'];

            if (has_blocks($content)) {
                $content = do_blocks($content);
                $content = apply_filters('the_content', $content);
                $content = str_replace(']]>', ']]&gt;', $content);
            }
            $context['content'] = Blog::LazyLoadImages($content);

            if ($template) {
                echo '<!-- Start Template: ' . $template . ' -->';
                Timber::render($template, $context, $this->CacheTime);
            } elseif (post_password_required($timber_post->ID)) {
                echo '<!-- Start single password Template: ' . $template . ' -->';
                Timber::render(
                    'single-password.twig',
                    $context,
                    $this->CacheTime,
                );
            } else {
                echo '<!-- Start single Template: ' . $template . ' -->';
                Timber::render(
                    [
                        'single-' . $timber_post->ID . '.twig',
                        'single-' . $timber_post->post_type . '.twig',
                        'single-' . $timber_post->slug . '.twig',
                        'single.twig',
                    ],
                    $context,
                    $this->CacheTime,
                );
            }
            echo '<!-- End single -->';

            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
        endwhile; // End of the loop.
    }
}
