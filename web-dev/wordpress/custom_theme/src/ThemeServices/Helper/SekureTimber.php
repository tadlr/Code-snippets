<?php

namespace ThemeServices\Helper;

use Timber\Timber;

class CustomThemeTimber {
    protected $templatePath;

    public function __construct() {
        $this->templatePath = get_template_directory() . '/templates';
        $this->filters();
        Timber::init();
    }

    public static function init() {
        $instance = new self();
    }

    private function filters() {
        add_filter('timber/twig', [$this, 'twig_extend'], 100);
        add_filter('timber/twig/functions', [$this, 'twig_functions']);
        // add_filter('timber/twig/environment/options', [
        //     $this,
        //     'update_twig_environment_options',
        // ]);
        add_filter('timber/context', [$this, 'twig_context']);
        add_filter('timber/locations', [$this, 'twig_locations']);
    }

    public function twig_locations($paths) {
        $template = $this->templatePath;

        $directories = glob("$template/*", GLOB_ONLYDIR);
        $directories[] = $template;

        $paths[] = $directories;
        return $paths;
    }
    /**
     * This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}.
     */
    public function twig_context($context) {
        // $post = Timber::get_post();
        $language = getLanguage();

        // $ThemeServices = SkThemeServices()

        $context['environment'] = ENVIRONMENT;
        $context['field'] = get_fields();
        $context['lang'] = $language;
        $context['home_url'] = get_home_url();
        $context['home_url_blog'] = get_home_url() . '/blog';

        $context['field'] = get_fields();

        return $context;
    }

    public function twig_functions($functions) {
        $functions['field'] = [
            'callable' => 'get_field',
        ];

        $functions['stars'] = [
            'callable' => [$this, 'stars'],
        ];

        $functions['get_field'] = $functions['field'];

        $functions['savings_calculator'] = [
            'callable' => [$this, 'savings_calculator'],
        ];

        return $functions;
    }

    public function savings_calculator() {
        wp_enqueue_script(
            'sc_jquery',
            get_template_directory_uri() .
                '/assets/js/dist/savings-calculator.js',
            [],
            '',
            true,
        );
        include_once get_template_directory() . '/savings-calculator.php';
        return savings_calculator();
    }

    public function stars($stars, $label = 'stars') {
        $return =
            '<div class="sk-star-rating" data-rating="' .
            $stars .
            '" aria-label="' .
            $stars .
            ' ' .
            $label .
            '" alt="' .
            $stars .
            ' ' .
            $label .
            '" role="img"><div class="sk-star"></div><div class="sk-star"></div><div class="sk-star"></div><div class="sk-star"></div><div class="sk-star"></div></div>';

        return $return;
    }

    /**
     * Updates Twig environment options.
     *
     * @link https://twig.symfony.com/doc/2.x/api.html#environment-options
     *
     * \@param array $options An array of environment options.
     *
     * @return array
     */
    function update_twig_environment_options($options) {
        // $options['cache'] = false;
        // $options['autoescape'] = false;

        $options['cache'] = ABSPATH . '/wp-content/cache/timber/' . $_SERVER['HTTP_HOST'];



        if (is_dev_env()) {
            $options['debug'] = true;
            $options['auto_reload'] = true;
            // $options['cache'] = false;
        }
        // $options['cache'] = false;
        // $options['auto_reload'] = true;

        return $options;
    }

    public function twig_extend($twig) {
        /**
         * Required when you want to use Twigs template_from_string.
         * @link https://twig.symfony.com/doc/3.x/functions/template_from_string.html
         */

        // $include = new \Djboris88\Twig\Extension\CommentedIncludeExtension();
        // $twig->addExtension($include);

        $TwigExtensions = new \macwinnie\TwigExtensions\All();
        $twig->addExtension($TwigExtensions);

        $extension = new \Umpirsky\Twig\Extension\PhpFunctionExtension();
        $defined_funtions = get_defined_functions(true);
        foreach ($defined_funtions['user'] as $function) {
            $extension->allowFunction($function);
        }
        $twig->addExtension($extension);

        $twig->addExtension(new \Parisek\Twig\AttributeExtension());

        return $twig;
    }
}
