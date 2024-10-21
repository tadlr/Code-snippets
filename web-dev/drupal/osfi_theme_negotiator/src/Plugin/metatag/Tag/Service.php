<?php

namespace Drupal\osfi_theme_negotiator\Plugin\metatag\Tag;

use Drupal\metatag\Plugin\metatag\Tag\MetaNameBase;

/**
 * The Dublin Core "service" meta tag.
 *
 * @MetatagTag(
 *   id = "dcterms_service",
 *   label = @Translation("Service"),
 *   description = @Translation("Service that provides the page."),
 *   name = "dcterms.service",
 *   group = "dublin_core_advanced",
 *   weight = 6,
 *   type = "label",
 *   secure = FALSE,
 *   multiple = FALSE
 * )
 */
class Service extends MetaNameBase {
  // Nothing here yet. Just a placeholder class for a plugin.
}
