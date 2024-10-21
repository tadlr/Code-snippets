<?php

namespace ThemeServices\Helper;

use ThemeServices\ThemeServices;

class Modules extends ThemeServices {
    function __construct() {
        $this->loadModules();
    }

    public static function enable(): static {
        return new static();
    }

    public function loadModules() {
        // $modules = ['customTheme-lang', 'permalink-manager'];
        $modules = ['customTheme-lang'];

        // $fileVariable =  plugin_dir_path(__FILE__);

        // dump($fileVariable);
        // CustomThemeLang;

        foreach ($modules as $module) {
            $module = str_replace('-', ' ', $module);
            $module = ucwords($module);
            $module = str_replace(' ', '', $module);

            require_once ModulePath($module) . $module . '.php';
            // $module::init();
        }
    }
}
