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
 * @package fabrikage/wp-lang-switcher
 */
class AdminLangSwitcher extends ThemeServices {
  private const MENU_ID = 'lang-switcher';

  private array $domains = [];
  private array $urls = [];

  private function __construct() {



    $post = get_post();

    if (!$post) {
      return;
    }

    $lang = getLanguage();
    $fields = get_fields();

    $translations = [];

    if (get_field('en_translation') || $lang === 'en') {
      $translations['en'] = [
        'label' => 'English',
        'url' =>
        get_permalink(get_field('en_translation') ?? $post->ID),
      ];
    }

    if (get_field('fr_translation') || $lang === 'fr') {
      $translations['fr'] = [
        'label' => 'French',
        'url' =>
        get_permalink(get_field('fr_translation') ?? $post->ID),
      ];
    }

    if (get_field('es_translation') || $lang === 'es') {
      $translations['es'] = [
        'label' => 'Spanish',
        'url' =>
        get_permalink(get_field('es_translation') ?? $post->ID),
      ];
    }


    $this->domains = $translations;


    if (!defined('WPINC')) {
      throw new \Exception('WordPress is not loaded.');
    }

    // Skip if user is not logged in
    if (!\is_user_logged_in()) {
      return;
    }


    $this->urls = $this->getUrls();

    add_action('admin_bar_menu', [$this, 'addToAdminBar'], 200);
    add_action('wp_head', [$this, 'adminBarCss']);
    add_action('admin_head', [$this, 'adminBarCss']);
  }


  public static function enable(): static {
    return new static();
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



    if (empty(($currentEnvironment = $this->getCurrentLanguage()))) {
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
    // $environments = array_diff($this->urls, $currentEnvironment);
    $environments = $this->urls;
    unset($environments[array_key_first($currentEnvironment)]);


    // die;
    // Add child menu items to admin bar
    foreach ($environments as $environment => $url) {

      // Skip empty URLs
      if (empty($url['url'])) {
        continue;
      }

      // Add child menu item to admin bar
      $this->addAdminBarLink($environment, $url['url']);
    }
  }

  /**
   * Get current environment
   *
   * @return array
   */
  private function getCurrentLanguage(): array {


    // NOSONAR
    return array_filter($this->urls, function ($url) {

      return strpos($url['lang'], $this->getCurrentUrl()) !== false;
    });
  }

  /**
   * Get current environment title
   *
   * @param bool $ucfirst Uppercase first character
   * @return string
   */
  private function getCurrentLanguageTitle($ucfirst = true): string {
    $currentEnvironment = $this->getCurrentLanguage();
    $lang = array_key_first($currentEnvironment);



    return $this->domains[$lang]['label'];
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

    $currentEnvironment = $this->getCurrentLanguage();
    $lang = array_key_first($currentEnvironment);

    $this->getAdminBar()->add_menu([
      'id' => static::MENU_ID,
      'title' =>
      '<span class="lang-code">' . $lang  . '</span>' .
        '<span class="lang-name">' . $this->getCurrentLanguageTitle() . '</span>',
      'meta' => [
        'class' =>
        'lang-switcher-' . strtolower(
          $this->getCurrentLanguageTitle(false)
        ),
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
      'id' => static::MENU_ID . '-' . strtolower($environment),
      'title' =>
      ' ' .
        ucfirst($this->domains[$environment]['label']),
      'href' => $url,
    ]);
  }

  /**
   * Get environment URLs
   *
   * @return array<string, string> Environment URLs
   */
  private function getUrls(): array {
    foreach ($this->domains as $environment => $domain) {
      $urls[$environment] = ['url' => $domain['url'], 'lang' => $environment];
    }
    return $urls;
  }

  /**
   * Get current URL
   *
   * @return string|null
   */
  private function getCurrentUrl(): ?string {
    return getLanguage();
  }
}
