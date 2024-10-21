<?php

class CustomTheme_Lang_Twig_Extentions {
    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $plugin_name    The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     **/

    public function __construct() {
        $this->filters();
    }

    public static function init() {
        $instance = new self();
    }

    private function filters() {
        add_filter('timber/twig/filters', [$this, 'twig_filters']);
    }

    public function twig_filters($functions) {
        $functions['t'] = [
            'callable' => 't',
        ];

        return $functions;
    }
}
