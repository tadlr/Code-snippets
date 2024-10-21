<?php

namespace ThemeServices\Theme;

use WP_Query;
use ThemeServices\Services\Search;

class Blog {
    private $isBlog;

    private $BlocksPostTypes = ['post', 'case-studies'];
    public function __construct() {
        if (is_admin()) {
            // add_action('admin_init', [$this, 'AdminInit']);
        } else {
            add_action('wp', [$this, 'Init'], -1, -1);
        }
    }

    public function Init() {
        if ($this->isBlog()) {
            add_filter('body_class', [$this, 'BodyClass'], 2, 1);
            add_filter('the_content', [$this, 'RelativeLinks'], 2, 1);
            add_filter('the_content', [$this, 'LazyLoadImages'], 2, 1);
            // remove_action('wp_head', 'wp_custom_css_cb', 101);
        }
    }

    public function isBlog() {
        $post = get_post();
        if (is_object($post)) {
            $this->isBlog = in_array($post->post_type, $this->BlocksPostTypes)
                ? true
                : false;
            return $this->isBlog;
        }
        return false;
    }
    public function BodyClass($classes) {
        $post = get_post();
        $classes[] = 'sk-blog';
        $classes[] = 'sk-blog' . '--' . $post->ID;

        return $classes;
    }
    public static function RelativeLinks($content) {
        $domainList = [
            'customThememerchants.com',
            'wordpress-prod-appsvc.azurewebsites.net',
            'wordpress-qa-appsvc.azurewebsites.net',
            'wordpress-dev-appsvc.azurewebsites.net',
        ];
        foreach ($domainList as $domain) {
            $pattern =
                '/<(a|A)\b[^>]*href=(["\'])(?:https?:\/\/)?' .
                preg_quote($domain, '/') .
                '\//i';
            $replacement = '<$1 href=$2/';
            $content = preg_replace($pattern, $replacement, $content);
        }

        return $content;
    }
    public static function LazyLoadImages($content) {
        $content = preg_replace(
            '/(<img.+)(src)/Ui',
            '$1class="b-lazy"data-$2',
            $content,
        );
        $content = preg_replace(
            '/(<img.+)(srcset)/Ui',
            '$1class="b-lazy"data-$2',
            $content,
        );

        return $content;
    }

    public static function GetRelatedPosts($postID) {
        $categories_id = [];
        $current_category = get_the_category();
        foreach ($current_category as $cc) {
            $categories_id[] = $cc->term_id;
        }

        $related_posts = new WP_Query([
            'cat' => $categories_id,
            'post__not_in' => [$postID],
            'orderby' => 'date',
            'order' => 'DESC',
            'posts_per_page' => 3,
        ]);

        $related = [];
        while ($related_posts->have_posts()) {
            $related_posts->the_post();
            $related[] = $related_posts->post;
        }
        wp_reset_postdata();

        return $related;
    }

    public static function GenerateTocList($tocList) {
        if (!(is_array($tocList) && !empty($tocList) && count($tocList) > 2)) {
            return false;
        }

        $tocContent = '<ol>';
        $currentLevel = 1;
        $first = true;

        foreach ($tocList as $key => $item) {
            $headingLevel = $item['heading'] - 1;

            if ($headingLevel > $currentLevel) {
                $tocContent .= '<ol><li>';
            } elseif ($headingLevel < $currentLevel) {
                $tocContent .=
                    str_repeat('</li></ol>', $currentLevel - $headingLevel) .
                    '</li><li>';
            } else {
                if ($first) {
                    $tocContent .= '<li>';
                    $first = false;
                } else {
                    $tocContent .= '</li><li>';
                }
            }

            $currentLevel = $headingLevel;

            $pattern = '/^[a-z]\) |:$/im';
            $title = preg_replace($pattern, '', $item['title']);
            $tocContent .=
                '<a class="c-blue-1 anchor-link" href="#' .
                $item['slug'] .
                '" data-scroll-section-target-id="' .
                $key .
                '">' .
                strip_tags($title) .
                '</a>';
        }

        $tocContent .= str_repeat('</li></ol>', $currentLevel) . '</li></ol>';

        return $tocContent;
    }

    // public static function Search() {
    //     $Search = new Search();

    //     if (!isset($data)) {
    //         $results = $Search->doSearch(false);
    //         $data = $results['data'];
    //         $searchQuery = $results['query'];
    //     }

    //     return [
    //         'data' => $data,
    //         'searchQuery' => $searchQuery
    //     ];
    // }

    public static function FeaturedPost() {
        $argsPost = [
            'numberposts' => 1,
            'posts_per_page' => 1,
            'post_type' => ['post', 'case-studies'],
            'offset' => 0,
            'orderby' => 'post_date',
            'order' => 'DESC',
            'post_status' => 'publish',
        ];

        $featuredArticle = new WP_Query($argsPost);

        return $featuredArticle;
    }

    public static function GenerateToc($content) {
        if (has_blocks($content)) {
            $content = do_blocks($content);
            $content = do_shortcode($content);
            $content = str_replace(']]>', ']]&gt;', $content);
        }
        $tocList = [];

        $heading_results = [];
        $regex = '~(<h([2-6]))(.*?>(.*)</h[2-6]>)~';
        /*$regex = '~(<h([2-6]))(.*?[>|\n\r\s?>](.*)[\n\r\s|<]+/h[2-6]>)~';*/
        preg_match_all($regex, $content, $heading_results);


        if ($heading_results[0]) {
            $num_match = count($heading_results[0]);
            for ($i = 0; $i < $num_match; ++$i) {

                //'/[0-9]+\./' //$regex=['/[^\s\p{L}]/u', '/[.:]/' ];
                $regex = ['/[0-9]+\./', '/[#0-9]+\:/'];


                if (preg_match('/no-toc/', $heading_results[3][$i])) {
                    continue;
                }

                $tocList[$i] = [
                    'slug' => sanitize_title($heading_results[4][$i]),
                    'heading' => preg_replace(
                        $regex,
                        '',
                        $heading_results[2][$i],
                    ),
                    'title' => preg_replace(
                        $regex,
                        '',
                        $heading_results[4][$i],
                    ),
                ];
            }
        }

        if (!(is_array($tocList) && !empty($tocList) && count($tocList) > 2)) {
            $tocList = [];
        }


        return [
            'toc' => $tocList,
            'toc_list' => self::GenerateTocList($tocList),
            'content' => self::InsertTocLinks($content, $heading_results),
        ];
    }

    private static function InsertTocLinks($content, $heading_results) {
        $num_match = count($heading_results[0]);
        if ($num_match < 1) {
            return $content;
        }


        for ($i = 0; $i < $num_match; ++$i) {
            if (preg_match('/no-toc/', $heading_results[3][$i])) {
                continue;
            }
            $customClass = '';
            if (preg_match('/sr-only/', $heading_results[3][$i])) {
                $customClass = 'sr-only';
            }

            $new_heading =
                $heading_results[1][$i] .
                " class='toc-heading $customClass'" .
                " data-link-scroll-target-section-id='" .
                $i .
                "' " .
                " id='" .
                sanitize_title($heading_results[4][$i]) .
                "' " .
                $heading_results[3][$i];
            $old_heading = $heading_results[0][$i];
            $content = str_replace($old_heading, $new_heading, $content);
        }
        return $content;
    }
}
