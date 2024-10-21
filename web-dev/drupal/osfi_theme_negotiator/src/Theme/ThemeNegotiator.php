<?php

namespace Drupal\osfi_theme_negotiator\Theme;

use Drupal\Core\Routing\AdminContext;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\node\NodeInterface;
use Drupal\Core\Theme\ThemeNegotiatorInterface;

/**
 * Provides a ThemeNegotiator for content type gist.
 */
class ThemeNegotiator implements ThemeNegotiatorInterface
{

  /**
   * AdminContext service.
   *
   * @var \Drupal\Core\Routing\AdminContext
   */
  protected $adminContext;

  /**
   * Creates a new ThemeNegotiator instance.
   *
   * @param \Drupal\Core\Routing\AdminContext $admin_context
   *   AdminContext service.
   */
  public function __construct(AdminContext $admin_context)
  {
    $this->adminContext = $admin_context;
  }

  /**
   * {@inheritdoc}
   */
  public function applies(RouteMatchInterface $route_match)
  {
    $node = $route_match->getParameter('node');
    // check if not admin page, if route is a node, if node has field site section, and if site section has a value
    if (
      !$this->adminContext->isAdminRoute() &&
      $node instanceof NodeInterface &&
      $node->hasField('field_site_section') &&
      !$node->get('field_site_section')->isEmpty()
    ) {
      return TRUE;
    }
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function determineActiveTheme(RouteMatchInterface $route_match)
  {
    $node = $route_match->getParameter('node');
    $term_obj = $node->get('field_site_section')->referencedEntities();
    $term = reset($term_obj);
    $parent_obj = $term->parent->referencedEntities();
    $parent = reset($parent_obj);

    if ($term && $term->id() === '39' || $parent && $parent->id() === '39') {
      return 'oca_osfi';
    }
  }
}
