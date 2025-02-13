<?php

namespace ThemeServices\Services;

use ThemeServices\ThemeServices;

use CustomTheme\CustomTheme;

use WP_Query;

class Search extends ThemeServices {
    function doSearch($render = true) {
        if (
            !$this->isValidRequestMethod('POST') &&
            !$this->isValidRequestMethod('GET')
        ) {
            exit();
        }

        $CustomTheme = CustomTheme::getInstance();
        $data = filter_input_array(INPUT_POST);
        $data = empty($data) ? filter_input_array(INPUT_GET) : $data;

        $data['filter'] = [
            'category' => [],
            'business-type' => [],
            'content-type' => [],
        ];

        if (isset($data['category']) && !empty($data['category'])) {
            $data['filter']['category'] = $data['category'];
        }

        if (isset($data['business-type']) && !empty($data['business-type'])) {
            $data['filter']['business-type'] = $data['business-type'];
        }

        if (isset($data['content-type']) && !empty($data['content-type'])) {
            $data['filter']['content-type'] = $data['content-type'];
        }

        $query = $this->buildQuery($data);
        $gridArticles = $CustomTheme->paginate($query);

        if ($render) {
            $Search = $this;
            require_once $CustomTheme->getPartialsFilePath(
                'latest_grid_articles',
            );
            exit();
        }

        return [
            'data' => $data,
            'query' => $query,
        ];
    }

    function getFilters($type, $data, $query, $paged = 1, $debug = false) {
        $CustomTheme = CustomTheme::getInstance();
        $query['posts_per_page'] = -1;

        $all_posts = new WP_Query(
            array_merge(
                [
                    'post_type' => ['post', 'case-studies'],
                    'post_status' => 'publish',
                    'posts_per_page' => -1,
                    'paged' => $paged,
                    'order' => 'DESC',
                ],
                ['fields' => 'ids'],
            ),
        );

        $query_posts = new WP_Query(array_merge($query, ['fields' => 'ids']));
        $filter = $data['filter'];

        $dataCount = 0;
        $chosenType = [];

        foreach (['category', 'business-type', 'content-type'] as $key) {
            if (!empty($data[$key])) {
                $dataCount++;
                $chosenType[] = $key;
            }
        }

        if ($dataCount == 1 && in_array($type, $chosenType)) {
            $ids = $all_posts->posts;
            // $aaa = 500;
        } else {
            $ids = $query_posts->posts;
            // $aaa = 100;
        }

        $available_categories = get_terms([
            'taxonomy' => $type,
            'hide_empty' => true,
            'object_ids' => $ids,
        ]);

        if (!empty($available_categories)) {
            foreach ($available_categories as $item) {
                $selected = $this->checkQueryFilter($type, $item->term_id)
                    ? 'selected'
                    : '';
                if ($debug) {
                } else {
                    echo "<option data-id='filter-$item->term_id' id='filter-$item->term_id' value='$item->term_id' class='checkbox blog-filter-check js-field' $selected>$item->name</option>";
                }
            }
            // return $options;
        }
        // return false;
    }

    /**
     * Check if the current request method matches the expected one.
     *
     * @param string $expectedMethod Expected HTTP method.
     * @return bool True if it matches, false otherwise.
     */
    function isValidRequestMethod($expectedMethod) {
        return strtoupper($_SERVER['REQUEST_METHOD']) === $expectedMethod;
    }

    /**
     * Build the query parameters.
     *
     * @param array $data The filter data from POST request.
     * @return array The WP query parameters.
     */
    function buildQuery($data) {
        $query = [
            'post_status' => 'publish',
            'post_type' => ['post', 'case-studies'],
            'posts_per_page' => 9,
        ];

        // Search text
        if (isset($data['search']) && !empty($data['search'])) {
            $query['s'] = sanitize_text_field($data['search']);
        }

        if ($template = get_page_template_slug()) {
            if ($template === 'page-case-studies.php') {
                $data['filter']['content-type'] = [139];
            }
        }

        // Taxonomy Filters
        if (isset($data['filter']) && is_array($data['filter'])) {
            $query['tax_query'] = $this->buildTaxQuery($data['filter']);
            $query['tax_query']['relation'] =
                count(array_filter($data['filter'])) == 1 ? 'OR' : 'AND';
        }

        return $query;
    }

    /**
     * Build the taxonomy query from filters.
     *
     * @param array $filterData The filter data for taxonomies.
     * @return array The tax query.
     */
    function buildTaxQuery($filterData) {
        $filters = [];

        foreach ($filterData as $filterSlug => $item) {
            if (is_array($item) && !empty($item)) {
                $filters[] = [
                    'taxonomy' => $filterSlug,
                    'field' => 'term_id',
                    'terms' => $item,
                    'include_children' => false,
                ];
            } elseif ($item) {
                $filters[] = [
                    'taxonomy' => $filterSlug,
                    'field' => 'term_id',
                    'terms' => intval($item),
                    'include_children' => false,
                ];
            }
        }

        // if (!empty($filters)) {
        //   $filters['relation'] = AND;
        // } else {
        //   $filters['relation'] = 'AND';
        // }

        return $filters;
    }

    public function checkQueryFilter($filter, $value) {
        $get = filter_input_array(INPUT_GET);

        if (isset($get[$filter])) {
            if (is_array($get[$filter])) {
                return in_array(sanitize_text_field($value), $get[$filter]);
            } else {
                return $get[$filter] == sanitize_text_field($value);
            }
        } else {
            return false;
        }
    }
}
