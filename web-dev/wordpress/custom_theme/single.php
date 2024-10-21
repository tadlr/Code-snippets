<?php

if (has_term('Case studies', 'content-type', $post)) {
    wp_enqueue_style(
        'sk-case-studies',
        get_template_directory_uri() . '/assets/css/styles/case-studies.css',
        [],
        '1.0',
        'all',
    );
    render_single($post, 'case-study/single.twig');
} else {
    render_single($post);
}

