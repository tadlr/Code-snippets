<?php

class Autoloader {
    private static $rootPath;

    public static function register() {
        self::$rootPath = realpath(get_template_directory()) . '/src';
        spl_autoload_register([static::class, 'autoload']);
    }

    private static function autoload($class) {
        $classPath = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
        $file = self::$rootPath . DIRECTORY_SEPARATOR . $classPath;
        if (is_readable($file)) {
            require_once $file;
        }
    }
}

Autoloader::register();
