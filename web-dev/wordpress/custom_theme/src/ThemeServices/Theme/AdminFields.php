<?php

namespace ThemeServices\Theme;


class AdminFields {

  function __construct() {
    $this->Actions();
    $this->Filters();
  }

  public static function enable(): static {
    return new static();
  }

  private function Actions() {
    add_action('restrict_manage_posts', [$this, 'taxonomyFilter']);
    add_action('restrict_manage_posts', [$this, 'acfFieldFilter']);
    add_action('pre_get_posts', [$this, 'content__filter'], 1);
    add_action('pre_get_posts', [$this, 'content__orderby'], 2);
  }

  private function Filters() {

    add_filter('pre_get_posts', [$this, 'sort_by_modified'], 1);
    add_filter('term_link', [$this, 'blog_campaigns_permalink']);
    add_filter('manage_edit-campaigns_columns', [$this, 'blog_campaigns_column']);
    add_filter('manage_campaigns_custom_column', [$this, 'blog_campaigns_custom_fields'], 10, 3);


    add_filter('manage_edit-page_sortable_columns', [$this, 'sortable_content_columns']);
    add_filter('manage_edit-post_sortable_columns', [$this, 'sortable_content_columns']);
    add_filter('manage_edit-rates_sortable_columns', [$this, 'sortable_content_columns']);
    add_filter('manage_edit-landings_sortable_columns', [$this, 'sortable_content_columns']);



    $this->language_filters();
  }

  public function language_filters() {

    add_filter('manage_pages_columns', [$this, 'post_custom_column']);
    add_filter('manage_pages_custom_column', [
      $this,
      'post_custom_column_fields',
    ]);

    add_filter('manage_posts_columns', [$this, 'post_custom_column']);
    add_filter('manage_posts_custom_column', [
      $this,
      'post_custom_column_fields',
    ]);
  }

  function sortable_content_columns($columns) {
    $columns['content_language'] = 'page_lang';
    $columns['content_update'] = 'last_update';

    return $columns;
  }


  function content__orderby($query) {
    if (!is_admin())
      return;

    $orderby = $query->get('orderby');


    if ('page_lang' == $orderby) {
      $query->set('meta_key', 'content_language');
      $query->set('orderby', 'meta_value');
    }

    if ('last_update' == $orderby) {

      $query->set('orderby', 'modified');
      // $query->set('orderby', 'meta_value');
    }
  }

  public function sort_by_modified($wp_query) {
    global $pagenow;
    if (isset($wp_query->query['post_type'])) {
      if (
        is_admin() &&
        'edit.php' == $pagenow &&

        !isset($_GET['orderby']) &&
        !isset($_GET['order'])
      ) {
        $wp_query->set('orderby', 'date');
        $wp_query->set('order', 'DESC');
      }
    }
  }




  public function taxonomyFilter($post_type) {
    // let's decide about post type first
    if ('landings' !== $post_type) {
      return;
    }
    // pass multiple taxonomies as an array of their slugs
    $taxonomies = ['lander-campaign'];

    // for every taxonomy we are going to do the same
    foreach ($taxonomies as $taxonomy) {
      $taxonomy_object = get_taxonomy($taxonomy);
      $selected = isset($_GET[$taxonomy]) ? $_GET[$taxonomy] : '';

      wp_dropdown_categories([
        'show_option_all' => $taxonomy_object->labels->all_items,
        'taxonomy' => $taxonomy,
        'name' => $taxonomy,
        'orderby' => 'name',
        // slug / count / term_order etc
        'value_field' => 'slug',
        'selected' => $selected,
        'hierarchical' => true,
      ]);
    }
  }

  public function acfFieldFilter($post_type) {

    // Define the ACF field name
    $field_name = 'content_language';

    // Define the available options for the ACF field
    $options = [
      'en' => 'English',
      'es_US' => 'Spanish',
      'fr_CA' => 'French',
    ];

    // Get the selected value from the URL query string
    $selected_value = isset($_GET[$field_name]) ? $_GET[$field_name] : '';
    echo "<select name='$field_name'>
      <option value=''>All Languages</option>";
    foreach ($options as $option => $label) {
      echo "<option value='$option'" . selected($selected_value, $option) . ">$label</option>";
    }
    echo "</select>";

    // echo '<input type="checkbox"' . checked(
    //   isset($_GET['public_preview']),
    //   true,
    //   false
    // ) . ' name="public_preview" value="true"> Show only Public Preview';
  }

  function content__filter($query) {
    // if ($query->get('post_type') !== 'page') {
    //   return;
    // }

    $selected_value = isset($_GET['content_language'])
      ? $_GET['content_language']
      : '';

    if (!empty($selected_value)) {
      $meta_query = [
        [
          'key' => 'content_language',
          'value' => $selected_value,
          'compare' => '=',
        ],
      ];

      $query->set('meta_query', $meta_query);
    }


    if (isset($_GET['public_preview'])) {
      $meta_query = [
        [
          'key' => 'public_preview',
          'value' => '1',
          'compare' => '=',
        ],
      ];

      $query->set('meta_query', $meta_query);
    }
  }

  function blog_campaigns_permalink($url) {
    global $taxonomy;
    if (is_admin() && get_current_screen()->taxonomy === 'campaigns') {
      $domain = get_option('upload_url_path');
      $urlParse = parse_url($url);
      if ($domain && $urlParse['path']) {
        $domain = str_replace('/wp-content/uploads', '', $domain);
        $url = $domain . $urlParse['path'];
      }
    }
    return $url;
  }

  public function blog_campaigns_column($columns) {
    $columns['redirect_slug'] = 'Slug';

    unset($columns['posts']);
    unset($columns['slug']);
    unset($columns['description']);

    return $columns;
  }

  public function blog_campaigns_custom_fields(
    $deprecated,
    $column_name,
    $term_id,
  ) {
    if ($column_name == 'redirect_slug') {
      $url = get_term_link($term_id);
      echo "<div class='row-link'>
            <label for='redirect_slug_$term_id'>Redirect Slug</label>
            <input id='redirect_slug_$term_id' name='redirect_slug' type='text' disabled value='$url' style='width:50%'>
            <input type='button' id='copy-button_$term_id' class='button' value='Copy' onClick='copyContent(`redirect_slug_$term_id`)'>
        </div>";
    }
  }


  public function post_custom_column($columns) {
    $columns = array_merge(
      array_slice($columns, 0, 2),
      ['content_language' => 'Language'],
      array_slice($columns, 2),
      ['content_update' => 'Last Updated'],
    );
    return $columns;
  }

  public function post_custom_column_fields($column_name) {
    if ($column_name == 'content_language') {
      $Language = get_field('content_language');
      switch ($Language) {
        case 'es_US':
          $langName = 'Spanish';
          break;
        case 'fr_CA':
          $langName = 'French';
          break;
        default:
          $langName = 'English';
      }
      if ($Language) {
        echo $langName;
      }
    }
    if ($column_name == 'content_update') {

      $modified_date = get_the_modified_date('F j, Y');

      if ($modified_date) {

        $content = '<p class="modified-date">Last updated <br>' . $modified_date . '</p>';
        echo $content;
      }
    }
  }
}
