<?php

/**
 * Register ACF Fields
 *
 * @link       https://customThememerchants.com
 * @since      1.0.0
 *
 * @package    CustomTheme_Lang
 * @subpackage CustomTheme_Lang/includes
 */

/**
 * Register ACF Fields
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    CustomTheme_Lang
 * @subpackage CustomTheme_Lang/includes
 * @author     CustomTheme Payment Experts <marketing@customThememerchants.com>
 */

class CustomTheme_Lang_ACF_Fields {
    function __construct() {
        $this->SettingsPage();
        $this->SettingsFields();
    }

    public function register_acf_fields() {
        $this->PostFields();
    }

    public function PostFields() {
        add_action('acf/include_fields', function () {
            if (!function_exists('acf_add_local_field_group')) {
                return;
            }
        });

        acf_add_local_field_group([
            'key' => 'group_65148e0e675ea',
            'title' => 'Post Language',
            'fields' => [
                [
                    'key' => 'field_65148eb6b1501',
                    'label' => 'Content Language',
                    'name' => 'content_language',
                    'aria-label' => '',
                    'type' => 'select',
                    'instructions' => '',
                    'required' => 1,
                    'conditional_logic' => 0,
                    'wrapper' => [
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ],
                    'choices' => [
                        'en' => 'English',
                        'fr_CA' => 'Français (French)',
                        'es_US' => 'Español (Spanish)',
                    ],
                    'default_value' => 'en',
                    'return_format' => 'value',
                    'multiple' => 0,
                    'allow_custom' => 0,
                    'search_placeholder' => '',
                    'acfe_settings' => '',
                    'acfe_validate' => '',
                    'allow_null' => 0,
                    'acfe_permissions' => '',
                    'ui' => 0,
                    'ajax' => 0,
                    'placeholder' => '',
                ],
                [
                    'key' => 'field_651df7ce668d4',
                    'label' => 'English Translation',
                    'name' => 'en_translation',
                    'aria-label' => '',
                    'type' => 'post_object',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => [
                        [
                            [
                                'field' => 'field_65148eb6b1501',
                                'operator' => '!=',
                                'value' => 'en',
                            ],
                        ],
                    ],
                    'wrapper' => [
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ],
                    'post_type' => '',
                    'post_status' => '',
                    'taxonomy' => '',
                    'return_format' => 'id',
                    'multiple' => 0,
                    'save_custom' => 0,
                    'save_post_status' => 'publish',
                    'acfe_bidirectional' => [
                        'acfe_bidirectional_enabled' => '1',
                        'acfe_bidirectional_related' => [
                            0 => 'field_651df7ce668d4',
                        ],
                    ],
                    'acfe_settings' => '',
                    'acfe_validate' => '',
                    'allow_null' => 1,
                    'acfe_permissions' => '',

                    'ui' => 0,

                    'save_post_type' => '',
                ],
                [
                    'key' => 'field_661eb90be93ff',
                    'label' => 'Spanish Translation',
                    'name' => 'es_translation',
                    'aria-label' => '',
                    'type' => 'post_object',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => [
                        [
                            [
                                'field' => 'field_65148eb6b1501',
                                'operator' => '!=',
                                'value' => 'es_US',
                            ],
                        ],
                    ],
                    'wrapper' => [
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ],
                    'post_type' => '',
                    'post_status' => '',
                    'taxonomy' => '',
                    'return_format' => 'id',
                    'multiple' => 0,
                    'save_custom' => 0,
                    'save_post_status' => 'publish',
                    'acfe_bidirectional' => [
                        'acfe_bidirectional_enabled' => '1',
                        'acfe_bidirectional_related' => [
                            0 => 'field_661eb90be93ff',
                        ],
                    ],
                    'acfe_settings' => '',
                    'acfe_validate' => '',
                    'allow_null' => 1,
                    'acfe_permissions' => '',
                    'ui' => 0,
                    'save_post_type' => '',
                ],
                [
                    'key' => 'field_661eb938e9401',
                    'label' => 'French Translation',
                    'name' => 'fr_translation',
                    'aria-label' => '',
                    'type' => 'post_object',
                    'instructions' => '',
                    'required' => 0,
                    'conditional_logic' => [
                        [
                            [
                                'field' => 'field_65148eb6b1501',
                                'operator' => '!=',
                                'value' => 'fr_CA',
                            ],
                        ],
                    ],
                    'wrapper' => [
                        'width' => '',
                        'class' => '',
                        'id' => '',
                    ],
                    'post_type' => '',
                    'post_status' => '',
                    'taxonomy' => '',
                    'return_format' => 'id',
                    'multiple' => 0,
                    'save_custom' => 0,
                    'save_post_status' => 'publish',
                    'acfe_bidirectional' => [
                        'acfe_bidirectional_enabled' => '1',
                        'acfe_bidirectional_related' => [
                            0 => 'field_661eb938e9401',
                        ],
                    ],
                    'acfe_settings' => '',
                    'acfe_validate' => '',
                    'allow_null' => 1,
                    'acfe_permissions' => '',
                    'bidirectional' => 0,
                    'ui' => 0,
                    'save_post_type' => '',
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'all',
                    ],
                ],
            ],
            'menu_order' => 0,
            'position' => 'side',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'tooltip',
            'hide_on_screen' => false,
            'active' => true,
            'description' => '',
            'show_in_rest' => 1,
            'acfe_display_title' => 'Language',
            'acfe_permissions' => '',
            'acfe_form' => 1,
            'acfe_meta' => '',
            'acfe_note' => '',
        ]);
    }

    public function SettingsPage() {
        acf_add_options_page([
            'menu_slug' => 'language',
            'page_title' => 'Language',
            'active' => true,
            'menu_title' => 'Language & Translations',
            'capability' => 'edit_posts',
            'parent_slug' => '',
            'position' => '',
            'icon_url' => 'dashicons-translation',
            'redirect' => true,
            'post_id' => 'language_settings',
            'autoload' => true,
            'update_button' => 'Update',
            'updated_message' => 'Translation Updated',
        ]);

        acf_add_options_page([
            'menu_slug' => 'string-translation',
            'page_title' => 'String Translation',
            'active' => true,
            'menu_title' => 'String Translation',
            'capability' => 'edit_posts',
            'parent_slug' => 'language',
            'position' => '',
            'icon_url' => '',
            'redirect' => true,
            'post_id' => 'strings',
            'autoload' => true,
            'update_button' => 'Save',
            'updated_message' => 'Translations Saved',
        ]);
    }

    public function SettingsFields() {
        add_action('acf/include_fields', function () {
            if (!function_exists('acf_add_local_field_group')) {
                return;
            }
        });
    }
}
