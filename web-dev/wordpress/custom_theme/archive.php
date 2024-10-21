<?php get_header();

$paged = get_query_var('paged') ? get_query_var('paged') : 1;

$archive_type = '';

foreach (['post', 'term', 'user'] as $object_type) {
    if (get_queried_object()->data->ID == null) {
        if (
            !empty(get_object_subtype($object_type, get_queried_object()->term_id))
        ) {
            $archive_type = $object_type;
        }
    } else {
        if (
            !empty(get_object_subtype($object_type, get_queried_object()->data->ID))
        ) {
            $archive_type = $object_type;
        }
    }
}

switch ($archive_type) {
    case 'user':
        $archive_query = new WP_Query([
            'post_status' => 'publish',
            'author' => get_queried_object()->data->ID,
            'order' => 'DESC',
            'orderby' => 'date',
            'posts_per_page' => 9,
            'paged' => $paged,
        ]);
        $archive_title = get_queried_object()->data->user_login;
        break;
    case 'post':
        if (is_date()) {
            $archive_date = get_the_date();
            $archive_date = explode(' ', $archive_date);
            $archive_month = date_parse($archive_date[0]);

            $archive_query = new WP_Query([
                'post_status' => 'publish',
                'order' => 'DESC',
                'orderby' => 'date',
                'posts_per_page' => 9,
                'paged' => $paged,
                'year' => $archive_date[2],
                'monthnum' => $archive_month['month'],
            ]);
            $archive_title = $archive_date[0] . ' ' . $archive_date[2];
        } else {
            $archive_query = new WP_Query([
                'post_status' => 'publish',
                'category_name' => get_queried_object()->slug,
                'order' => 'DESC',
                'orderby' => 'date',
                'posts_per_page' => 9,
                'paged' => $paged,
            ]);
            $archive_title = get_queried_object()->label . ' Category';
        }
        break;
    case 'term':
        $archive_query = new WP_Query([
            'post_status' => 'publish',
            //'category_name' =>  get_queried_object()->slug,
            'order' => 'DESC',
            'orderby' => 'date',
            'posts_per_page' => 9,
            'paged' => $paged,
            'tax_query' => [
                [
                    'taxonomy' => get_queried_object()->taxonomy,
                    'field' => 'term_id',
                    'terms' => get_queried_object()->term_id,
                ],
            ],
        ]);
        $archive_title = get_queried_object()->name . ' Category';
        break;
}

//single_cat_title(), get_the_archive_title()
?>

<style>
    @media screen and (max-width:480px) {
        .related-articles .related-articles-wrap {
            display: block;
        }
    }
</style>

<section data-scroll-section class="prel offset-x-mobile-38 offset-x-desktop-215 single-article-section related-articles">
    <h1 class="txt-size-60 c-blue-1">All posts from: <?php echo $archive_title; ?></h1>
    <div class="related-articles-wrap">
        <?php while ($archive_query->have_posts()):
            $archive_query->the_post(); ?>
            <!-- Posts -->
            <div class="related-post-item">
                <?php
                $img_id = get_post_thumbnail_id($post->ID);
                $img_url = wp_get_attachment_url($img_id);
                $img_alt = get_post_meta(
                    $img_id,
                    '_wp_attachment_image_alt',
                    true,
                );
                $img_title = get_the_title($img_id);
                ?>
                <a class="col-sm-12" href="<?= get_the_permalink() ?>">
                    <img width="170" height="170" class="related-post-item-img blog-post-thumbnail w-100" src="<?= $img_url ?>" alt="">
                </a>
                <!-- meta -->
                <div class="related-meta">
                    <?php if (get_field('new_tag') == 'yes') { ?>
                        <p class="txt-size-16 c-blue-1 upper fw-700 new-article"> New </p>
                        <!-- <p class="txt-size-16 c-blue-1 meta-separator"> | </p> -->
                    <?php } ?>
                    <p class="txt-size-16 c-blue-1 reading-time">
                        <?php foreach (get_the_category() as $category) {
                            $catname = $category->cat_name;
                            echo '<a href="' .
                                get_category_link($category->term_id) .
                                '" class="post-single-category">' .
                                $catname .
                                '</a>';
                        } ?>
                    </p>
                    <!-- <p class="txt-size-16 c-blue-1 meta-separator"> | </p> -->
                    <p class="txt-size-16 c-blue-1 post-date"><?= get_the_date(
                                                                    'F d, Y',
                                                                    $post->ID,
                                                                ) ?></p>
                </div>

                <!-- heading -->
                <h3 class="txt-size-30 fw-700 c-blue-1"><a href="<?= get_the_permalink() ?>" class="c-blue-1"><?= the_title() ?></a></h3>


                <!-- excerpt -->
                <p class="anim-translate-x txt-size-18 c-blue-1"><?= get_the_excerpt() ?></p>

                <!-- reading time -->
                <?php
                $mycontent = $post->post_content;
                $word = str_word_count(strip_tags($mycontent));
                $m = floor($word / 200);
                $est = $m . ' min';
                ?>
                <p class="anim-translate-x txt-size-16 related-reading-time"><?= $est ?> read</p>

                <!-- read more -->
                <a href="<?= get_the_permalink() ?>" class="anim-translate-x btn-default size-18-txt c-blue-1 btn-green-1 section-color-white btn-offset-9 read-more-button">
                    <span class="btn-bg-el"></span>
                    <span class="btn-txt">Read more</span>
                </a>
            </div>

        <?php
        endwhile; ?>

    </div>

    <div class="archive-pagination">
        <?php echo paginate_links([
            'base' => str_replace(
                999999999,
                '%#%',
                esc_url(get_pagenum_link(999999999)),
            ),
            'total' => $archive_query->max_num_pages - 1,
            'current' => max(1, get_query_var('paged')),
            'format' => '?paged=%#%',
            'show_all' => false,
            'type' => 'plain',
            'end_size' => 2,
            'mid_size' => 1,
            'add_args' => false,
            'add_fragment' => '',
        ]); ?>
    </div>

    <?php wp_reset_postdata(); ?>

</section>




<?php get_footer(); ?>