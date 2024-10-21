<?php

namespace ThemeServices\Theme;

use ParagonIE\Sodium\Core\Curve25519\Ge\P2;
use ThemeServices\ThemeServices;
use ThemeServices\Theme\Render;
use WP_REST_Request;

class ContentBlocks extends ThemeServices {
    private $ContentBlocksPostTypes = [
        'landings',
        'rates',
        'equipment',
        'post',
        'case-studies',
        'industries',
        'page',
    ];

    private $Render;
    private $enableTwig = true;
    private $StylePath;

    private $StyleURI;

    private $ScriptPath;
    private $ScriptURI;
    public $Version;
    private $isContentBlock = false;

    public function __construct(Render $render, $RegisterBlock = true) {
        $this->StylePath =
            get_template_directory() . '/assets/css/styles/blocks/';
        $this->StyleURI =
            get_template_directory_uri() . '/assets/css/styles/blocks/';

        $this->ScriptPath =
            get_template_directory() . '/assets/js/dist/blocks/';
        $this->ScriptURI =
            get_template_directory_uri() . '/assets/js/dist/blocks/';
        $this->Render = $render;

        $this->Version = date('y') . date('m') . date('d');

        if (function_exists('acf_register_block_type')) {
            if ($RegisterBlock) {
                add_filter(
                    'block_categories_all',
                    function ($categories) {
                        $legacyCat = [
                            'slug' => 'legacy-blocks',
                            'title' => 'Legacy CustomTheme Blocks',
                        ];
                        array_unshift($categories, $legacyCat);
                        $newCat = [
                            'slug' => 'content-blocks',
                            'title' => 'CustomTheme Content Blocks',
                        ];
                        array_unshift($categories, $newCat);

                        $newBlockCat = [
                            'slug' => 'sk-blocks',
                            'title' => 'New CustomTheme Blocks',
                        ];
                        array_unshift($categories, $newBlockCat);

                        global $post;
                        if (
                            is_object($post) &&
                            $post->post_type == 'industries'
                        ) {
                            $blogCat = [
                                'slug' => 'sk-industry-blocks',
                                'title' => 'Industry Blocks',
                            ];
                            array_unshift($categories, $blogCat);
                        }
                        if (is_object($post)) {
                            $blogCat = [
                                'slug' => 'blog-blocks',
                                'title' => 'CustomTheme Blog Blocks',
                            ];
                            array_unshift($categories, $blogCat);
                        }

                        if (is_object($post)) {
                            $blogCat = [
                                'slug' => 'sk-page-blocks',
                                'title' => 'Page Blocks',
                            ];
                            array_unshift($categories, $blogCat);
                        }

                        return $categories;
                    },
                    -100,
                    -1,
                );
            }
        }

        if (is_admin()) {
            add_action('admin_init', [$this, 'AdminInit']);
        } else {
            add_action('wp', [$this, 'Init']);
        }



        add_action('wp_enqueue_scripts', [$this, 'stylesheet']);
    }

    public function isContentBlock() {
        $post = get_post();
        if (is_object($post)) {
            $this->isContentBlock = in_array(
                $post->post_type,
                $this->ContentBlocksPostTypes,
            )
                ? true
                : false;

            return $this->isContentBlock;
        }
        return false;
    }
    public function stylesheet() {
        global $post;
        if ($this->isContentBlock()) {
            if (
                $post->post_type != 'post'
                // && $post->post_type != 'case-studies'
            ) {
                if ($post->ID == 16415) {
                    wp_enqueue_style('sk-style-lander-new');
                    wp_enqueue_style('sk-style-lander');
                } else {
                    wp_enqueue_style('sk-style-lander');
                }
                wp_enqueue_script('sk-scripts');
                wp_enqueue_script('sk-lightslider');
                wp_enqueue_style('sk-lightslider');
                wp_enqueue_style('sk-blocks');
            }
        }
    }
    public function Init() {
        $post = get_post();
        if (is_object($post)) {
            if (in_array($post->post_type, $this->ContentBlocksPostTypes)) {
                $this->RegisterBlocks();
            }
        }

        if ($this->isContentBlock()) {
            add_filter('body_class', [$this, 'ContentBlockBodyClass'], 2, 1);
            // remove_action('wp_head', 'wp_custom_css_cb', 101);
        }
    }

    public function sort_by_modified($wp_query) {
        global $pagenow;
        if (isset($wp_query->query['post_type'])) {
            if (
                is_admin() &&
                'edit.php' == $pagenow &&
                $wp_query->query['post_type'] == 'landings' &&
                !isset($_GET['orderby']) &&
                !isset($_GET['order'])
            ) {
                $wp_query->set('orderby', 'date');
                $wp_query->set('order', 'DESC');
            }
        }
    }

    public function AdminInit() {
        $this->RegisterBlocks();
    }

    public function ContentBlockBodyClass($classes) {
        $post = get_post();

        if ($post->post_type == 'landings') {
            $classes[] = 'sk-lander';
            $classes[] = 'sk-lander' . '--' . $post->ID;
        }

        if ($post->ID < 12842) {
            $classes[] = 'sk-lander' . '-legacy';
        }

        return $classes;
    }

    private function RegisterBlocks() {
        require_once get_template_directory() . '/src/blocks/Blocks.php';

        $blocks = getCustomThemeBlocks();

        foreach ($blocks as $groups => $blockgroup) {
            foreach ($blockgroup as $name => $block) {
                $this->register($name, $block);
            }
        }
    }

    private function register($name, $block) {
        $post = get_post();

        $category = 'content-blocks';
        $template = $block['template'] ?? '';
        $type = 'lander';
        $args = [
            'name' => $name,
            'render_template' => $this->template($name),
            'category' => $category,
            // 'example' => [
            //     'attributes' => [
            //         'mode' => 'preview',
            //         'data' => [
            //             'preview_four_columns_table' => $this->preview($name),
            //         ],
            //     ],
            // ],
            'active' => true,
            'mode' => 'edit',
            'block_name' => $name,
            'supports' => [
                'anchor' => true,
                'align' => false,
                'align_text' => false,
                'align_content' => false,
                'full_height' => false,
                // "mode" => false,
                'multiple' => true,
                'jsx' => false,
            ],
        ];

        foreach ($block as $key => $value) {
            if (is_array($value)) {
                foreach ($value as $k => $v) {
                    $args[$key][$k] = $v;
                }
            } else {
                $args[$key] = $value;
            }
        }

        // if (is_object($post)) {
        if (
            str_contains($template, 'twig')
            // $this->enableTwig &&
            // ($this->isContentBlock() || $post->post_type == "post")
        ) {
            $args['render_template'] = $template;
            $args['render_callback'] = [$this->Render, 'ContentBlock'];
        }

        if (file_exists($this->StylePath . $name . '.css')) {
            $args['enqueue_style'] = $this->StyleURI . $name . '.css';

            // $args['enqueue_style'] = $this->StyleURI . $name . '.css';
        }
        // }

        if (file_exists($this->ScriptPath . $name . '.js')) {
            //     $this->attach_library($style_name, $this->StyleURI . $style_name . '.css');
            //     $args['style'] = [$this->StyleURI . $style_name . '.css'];
            $args['enqueue_script'] = $this->ScriptPath . $name . '.js';
        }

        // dump($args);

        if (function_exists('acf_register_block_type')) {
            acf_register_block_type($args);
        }
    }

    private function template($name) {
        $path = $this->PhPTemplate . $name . '.php';
        // dump($path);
        return $path;
    }

    private function preview($name) {
        $path =
            get_template_directory_uri() . $this->previewPath . $name . '.webp';
        return $path;
    }

    private function attach_library($name, $style = null, $script = null) {
        add_action('enqueue_block_assets', function () use ($name, $style) {
            if (!is_admin()) {
                wp_enqueue_style(
                    $name,
                    $style,
                    ['wp-editor'],
                    $this->Version,
                    false,
                );
            }
        });

        // add_action('enqueue_block_editor_assets', function () use ($name, $script) {
        //     wp_enqueue_script($name, $script, ['wp-blocks', 'wp-dom-ready', 'wp-edit-post'], true);
        // });
    }
}
