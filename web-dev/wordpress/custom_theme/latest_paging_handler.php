<?php

defined('ABSPATH') || die();

// Only post requests are allowed
if (strtoupper($_SERVER['REQUEST_METHOD']) !== 'POST') {
    die();
}

// Initialize the needed data
$data = filter_input_array(INPUT_POST);

if (isset($data['category']) && !empty($data['category'])) {
    $data['filter']['category'] = $data['category'];
}

if (isset($data['business-type']) && !empty($data['business-type'])) {
    $data['filter']['business-type'] = $data['business-type'];
}

if (isset($data['content-type']) && !empty($data['content-type'])) {
    $data['filter']['content-type'] = $data['content-type'];
}

$query = [
    'post_status' => 'publish',
    'post_type' => ['post', 'case-studies'],
    'posts_per_page' => 9,
];

// Search text
if (isset($data['search']) && !empty($data['search'])) {
    $query['s'] = sanitize_text_field($data['search']);
}

if (isset($data['filter']) && is_array($data['filter'])) {
    $filters = [];
    foreach ($data['filter'] as $filterSlug => $item) {
        if ($item) {
            $filters[] = [
                'taxonomy' => $filterSlug,
                'field' => 'term_id',
                'terms' => intval($item),
                'include_children' => false,
            ];
        }
    }

    if ($filters) {
        $filters['relation'] = 'AND';
        $query['tax_query'] = $filters;
    }
}

$CustomTheme = CustomTheme\CustomTheme::getInstance();
$gridArticles = $CustomTheme->paginate($query);
require_once $CustomTheme->getPartialsFilePath('latest_grid_articles');

exit();
