<?php

namespace ThemeServices\Helper;

use ThemeServices\ThemeServices;

/**
 * Adds environment switcher to WordPress admin bar.
 *
 * This class will use the following environment variables:
 * - URL_DEVELOPMENT
 * - URL_TESTING
 * - URL_ACCEPTANCE
 * - URL_PRODUCTION
 *
 * If you set the environment variables in your .env file, a menu item will be added to the admin bar
 * in which you can switch between the different environments.
 *
 * @package fabrikage/wp-env-switcher
 */
class EnvSwitcher extends ThemeServices {
    private const MENU_ID = 'env-switcher';
    private const INDICATOR_HTML = '<span class="env-switcher-indicator"></span>';
    private array $domains = [];
    private array $urls = [];

    private function __construct(array $domains, array $usernames) {
        $this->domains = $domains;
        if (!defined('WPINC')) {
            throw new \Exception('WordPress is not loaded.');
        }

        // Skip if user is not logged in
        if (!\is_user_logged_in()) {
            return;
        }

        // Skip if $usernames array is not empty and user is not in the list of usernames
        $user = \wp_get_current_user();
        if (!empty($usernames) && !in_array($user->user_login, $usernames)) {
            return;
        }

        $this->urls = $this->getUrls();

        add_action('admin_bar_menu', [$this, 'addToAdminBar'], 200);
        add_action('wp_head', [$this, 'adminBarCss']);
        add_action('admin_head', [$this, 'adminBarCss']);
    }

    /**
     * Initialize class, call this somewhere in your theme
     *
     * @param array $usernames Array of usernames to enable the menu for
     *
     * @return static
     */
    public static function enable(
        array $domains = [],
        array $usernames = [],
    ): static {
        return new static($domains, $usernames);
    }

    public function adminBarCss() {
        wp_enqueue_style(
            'sk-admin-topbar',
            get_template_directory_uri() .
                '/assets/css/styles/admin-topbar.css',
            ['admin-bar'],
        );
    }

    /**
     * Add environment switcher to admin bar
     */
    public function addToAdminBar(): void {
        // Skip if no current environment is found

        if (empty(($currentEnvironment = $this->getCurrentEnvironment()))) {
            return;
        }

        // Add parent menu item to admin bar
        $this->initAdminBarMenuItem();

        // Skip if admin bar is not showing
        if (!\is_admin_bar_showing()) {
            return;
        }

        // Skip if no environment URLs are set
        if (empty($this->urls)) {
            return;
        }

        // Remove current environment from array
        $environments = array_diff($this->urls, $currentEnvironment);

        // die;
        // Add child menu items to admin bar
        foreach ($environments as $environment => $url) {
            // Skip empty URLs
            if (empty($url)) {
                continue;
            }

            // Add child menu item to admin bar
            $this->addAdminBarLink($environment, $url);
        }
    }

    /**
     * Get current environment
     *
     * @return array
     */
    private function getCurrentEnvironment(): array {
        // NOSONAR
        return array_filter($this->urls, function ($url) {
            return strpos($url, $this->getCurrentUrl()) !== false;
        });
    }

    /**
     * Get current environment title
     *
     * @param bool $ucfirst Uppercase first character
     * @return string
     */
    private function getCurrentEnvironmentTitle($ucfirst = true): string {
        $currentEnvironment = $this->getCurrentEnvironment();
        return ($ucfirst
            ? ucfirst(array_key_first($currentEnvironment))
            : array_key_first($currentEnvironment)) ?? '';
    }

    /**
     * Get WP_Admin_Bar object, should be called after WordPress has been loaded
     *
     * @return WP_Admin_Bar
     */
    private function getAdminBar(): \WP_Admin_Bar {
        /**
         * @var \WP_Admin_Bar $wp_admin_bar
         */
        global $wp_admin_bar;
        return $wp_admin_bar;
    }

    /**
     * Add parent menu item to admin bar
     */
    private function initAdminBarMenuItem(): void {
        // Skip if no environment URLs are set
        if (empty(array_filter($this->urls))) {
            return;
        }

        $this->getAdminBar()->add_menu([
            'id' => static::MENU_ID,
            'title' =>
            static::INDICATOR_HTML .
                ' ' .
                $this->getCurrentEnvironmentTitle(),
            'meta' => [
                'class' =>
                'env-switcher-' . $this->getCurrentEnvironmentTitle(false),
            ],
        ]);
    }

    /**
     * Add child menu item to admin bar
     *
     * @param string $environment Environment name
     * @param string $url Environment URL
     */
    private function addAdminBarLink(string $environment, string $url): void {
        $this->getAdminBar()->add_menu([
            'parent' => static::MENU_ID,
            'id' => static::MENU_ID . '-' . $environment,
            'title' =>
            static::INDICATOR_HTML .
                ' ' .
                ucfirst($this->domains[$environment]['label']),
            'href' => $url . $this->getSlug(),
        ]);
    }

    /**
     * Get environment URLs
     *
     * @return array<string, string> Environment URLs
     */
    private function getUrls(): array {
        foreach ($this->domains as $environment => $domain) {
            $urls[$environment] = $domain['url'];
        }
        return $urls;
    }

    /**
     * Get current URL
     *
     * @return string|null
     */
    private function getCurrentUrl(): ?string {
        return $_SERVER['HTTP_HOST'] ?? null;
    }

    /**
     * Get current slug
     *
     * @return string|null
     */
    private function getSlug(): ?string {
        return $_SERVER['REQUEST_URI'] ?? null;
    }
}
