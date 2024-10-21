<?php

namespace ThemeServices\Helper;

class TinyMCE {
    function __construct() {
        add_editor_style(
            get_template_directory_uri() .
                '/assets/css/styles/editor-style.css',
        );
        add_filter('tiny_mce_before_init', [$this, 'theme_styles'], 1);
    }

    function theme_styles($init_array) {
        $style_formats = [
            [
                'title' => 'Highlight Text',
                'block' => 'span',
                'classes' => 'title-highlight',
                'wrapper' => true,
            ],
            [
                'title' => 'Disclaimer Text',
                'block' => 'span',
                'classes' => 'disclaimer',
                'wrapper' => true,
            ],
            [
                'title' => 'Phone Icon',
                'block' => 'i',
                'classes' => 'phone-icon',
                'wrapper' => true,
            ],
            [
                'title' => 'Checklist',
                'block' => 'ul',
                'selector' => 'ul',
                'classes' => 'checklist',
                'wrapper' => true,
            ],
            [
                'title' => 'Headline',
                'block' => 'span',
                'classes' => 'text-headline',
                'wrapper' => true,
            ],
        ];

        $init_array['style_formats'] = wp_json_encode($style_formats);

        return $init_array;
    }
}
