<!DOCTYPE html>

<html lang="en-US">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <title>Spotter - Universal Directory Listing HTML Template</title>

</head>

<body onunload="" class="page-subpage page-blog-listing navigation-off-canvas" id="page-top">

<!-- Outer Wrapper-->
<div id="outer-wrapper">
    <!-- Inner Wrapper -->
    <div id="inner-wrapper">
        <!-- Navigation-->
        <div class="header">
            <div class="wrapper">
                <div class="brand">
                    <a href="index-directory.html"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/logo.png" alt="logo"></a>
                </div>
                <nav class="navigation-items">
                    <div class="wrapper">
                        <ul class="main-navigation navigation-top-header"></ul>
                        <ul class="user-area">
                            <li><a href="sign-in.html">Sign In</a></li>
                            <li><a href="register.html"><strong>Register</strong></a></li>
                        </ul>
                        <a href="submit.html" class="submit-item">
                            <div class="content"><span>Submit Your Item</span></div>
                            <div class="icon">
                                <i class="fa fa-plus"></i>
                            </div>
                        </a>
                        <div class="toggle-navigation">
                            <div class="icon">
                                <div class="line"></div>
                                <div class="line"></div>
                                <div class="line"></div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <!-- end Navigation-->
        <!-- Page Canvas-->
        <div id="page-canvas">
            <!--Off Canvas Navigation-->
            <nav class="off-canvas-navigation">
                <header>Navigation</header>
                <div class="main-navigation navigation-off-canvas"></div>
            </nav>
            <!--end Off Canvas Navigation-->

            <!--Sub Header-->
            <section class="sub-header">
                <div class="search-bar horizontal collapse" id="redefine-search-form"></div>
                <!-- /.search-bar -->
                <div class="breadcrumb-wrapper">
                    <div class="container">
                        <div class="redefine-search">
                            <a href="#redefine-search-form" class="inner" data-toggle="collapse" aria-expanded="false" aria-controls="redefine-search-form">
                                <span class="icon"></span>
                                <span>Redefine Search</span>
                            </a>
                        </div>
                        <ol class="breadcrumb">
                            <li><a href="index-directory.html"><i class="fa fa-home"></i></a></li>
                            <li><a href="#">Page</a></li>
                            <li class="active">Detail</li>
                        </ol>
                        <!-- /.breadcrumb-->
                    </div>
                    <!-- /.container-->
                </div>
                <!-- /.breadcrumb-wrapper-->
            </section>
            <!--end Sub Header-->

            <!--Page Content-->
            <div id="page-content">
                <section class="container">
                    <div class="row">
                        <div class="col-md-9">
                            <header>
                                <h1 class="page-title">Blog</h1>
                            </header>

                            <article class="blog-post">
                                <header><a href="blog-detail.html"><h2>Vivamus porta orci eu turpis vulputate ornare fusce hendrerit arcu risu</h2></a></header>
                                <a href="blog-detail.html"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/blog-1.jpg" alt=""></a>
                                <figure class="meta">
                                    <a href="#" class="link-icon"><i class="icon-user"></i>Admin</a>
                                    <a href="#" class="link-icon"><i class="fa fa-calendar"></i>06/04/2014</a>
                                    <div class="tags">
                                        <a href="#" class="tag article">Architecture</a>
                                        <a href="#" class="tag article">Design</a>
                                        <a href="#" class="tag article">Trend</a>
                                    </div>
                                </figure>
                                <p>Fusce quis nulla volutpat, rhoncus ligula ut, pulvinar nisi. In dapibus urna sit amet accumsan
                                    tristique. Donec odio ligula, luctus venenatis varius id, tincidunt ac ipsum. Cras commodo,
                                    velit nec aliquam dictum, tortor velit dictum ipsum, sed ornare nunc leo nec ipsum. Vestibulum
                                    sagittis sapien vitae tristique mollis. Aliquam hendrerit nulla semper, viverra mi et,
                                    hendrerit mauris. Maecenas hendrerit congue ultrices. In laoreet erat blandit eros aliquet,
                                    in malesuada sem rutrum. In placerat porta egestas.
                                </p>
                                <a href="blog-detail.html" class="icon">Read More <i class="fa fa-angle-right"></i></a>
                            </article><!-- /.blog-post -->
                            <article class="blog-post">
                                <header><a href="blog-detail.html"><h2>Nulla sapien leo, placerat sed lacinia nec, rutrum quis</h2></a></header>
                                <a href="blog-detail.html"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/blog-2.jpg" alt=""></a>
                                <figure class="meta">
                                    <a href="#" class="link-icon"><i class="icon-user"></i>Admin</a>
                                    <a href="#" class="link-icon"><i class="fa fa-calendar"></i>06/04/2014</a>
                                    <div class="tags">
                                        <a href="#" class="tag article">Interior</a>
                                        <a href="#" class="tag article">New Living</a>
                                    </div>
                                </figure>
                                <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    Donec rutrum imperdiet ligula in bibendum. Aenean vulputate rutrum lobortis. Nullam non
                                    mi ac dui egestas venenatis. Etiam venenatis fermentum accumsan. Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit. Donec at lacus sapien.
                                </p>
                                <a href="blog-detail.html" class="link-arrow">Read More</a>
                            </article><!-- /.blog-post -->
                            <article class="blog-post">
                                <header><a href="blog-detail.html"><h2>SoundCloud Audio Post</h2></a></header>
                                <iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/71654970&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
                                <figure class="meta">
                                    <a href="#" class="link-icon"><i class="icon-user"></i>Admin</a>
                                    <a href="#" class="link-icon"><i class="fa fa-calendar"></i>06/04/2014</a>
                                    <div class="tags">
                                        <a href="#" class="tag article">Audio</a>
                                        <a href="#" class="tag article">SoundCloud</a>
                                    </div>
                                </figure>
                                <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    Donec rutrum imperdiet ligula in bibendum. Aenean vulputate rutrum lobortis. Nullam non
                                    mi ac dui egestas venenatis. Etiam venenatis fermentum accumsan. Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit. Donec at lacus sapien.
                                </p>
                                <a href="blog-detail.html" class="link-arrow">Read More</a>
                            </article><!-- /.blog-post -->
                            <article class="blog-post">
                                <header><a href="blog-detail.html"><h2>Cras commodo, velit nec aliquam dictum, tortor velit
                                    dictum ipsum, sed ornare nunc leo nec ipsum. Vestibulum sagittis sapien vitae tristique mollis.</h2></a></header>
                                <figure class="meta">
                                    <a href="#" class="link-icon"><i class="icon-user"></i>Admin</a>
                                    <a href="#" class="link-icon"><i class="fa fa-calendar"></i>06/04/2014</a>
                                    <div class="tags">
                                        <a href="#" class="tag article">Interior</a>
                                        <a href="#" class="tag article">New Living</a>
                                    </div>
                                </figure>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet commodo mauris,
                                    sit amet commodo turpis. Duis consequat placerat lacus, in sagittis metus pretium vel.
                                    In luctus justo venenatis, accumsan justo sit amet, volutpat dolor. Pellentesque quis nulla
                                    nec nisi tempor scelerisque. Nam nec scelerisque sapien. Donec eleifend purus id neque pretium,
                                    at sollicitudin erat vestibulum. Donec ac tempus tellus, ac dignissim sapien. Fusce et
                                    elementum arcu. Maecenas sit amet tincidunt lorem.
                                </p>
                                <p>Vivamus porta orci eu turpis vulputate ornare. Fusce hendrerit arcu risus, sed commodo
                                    lacus viverra in. Donec eget ligula in risus rutrum pretium id a elit. Nullam ut tristique
                                    arcu. Nam quis nunc ac eros accumsan tincidunt vel sit amet lorem. Sed euismod, turpis
                                    et facilisis vestibulum, leo lectus consectetur velit, sed lobortis ante dolor nec leo.
                                    Praesent congue tellus eu dui consectetur commodo. Sed quam ante, elementum sodales felis
                                    quis, rutrum tincidunt dolor. Etiam nec metus iaculis arcu cursus pulvinar. Nunc interdum
                                    eros a neque elementum lobortis. Nulla mattis quis risus vel molestie. Mauris id urna ac
                                    metus blandit lobortis in et odio.
                                </p>
                                <a href="blog-detail.html" class="link-arrow">Read More</a>
                            </article><!-- /.blog-post -->

                            <!--Pagination-->
                            <nav>
                                <ul class="pagination pull-right">
                                    <li class="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#" class="previous"><i class="fa fa-angle-left"></i></a></li>
                                    <li><a href="#" class="next"><i class="fa fa-angle-right"></i></a></li>
                                </ul>
                            </nav>
                            <!--end Pagination-->
                        </div>
                        <div class="col-md-3">
                            <aside id="sidebar">
                                <section>
                                    <header><h2>New Places</h2></header>
                                    <a href="item-detail.html" class="item-horizontal small">
                                        <h3>Cash Cow Restaurante</h3>
                                        <figure>63 Birch Street</figure>
                                        <div class="wrapper">
                                            <div class="image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/1.jpg" alt=""></div>
                                            <div class="info">
                                                <div class="type">
                                                    <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant.png" alt=""></i>
                                                    <span>Restaurant</span>
                                                </div>
                                                <div class="rating" data-rating="4"></div>
                                            </div>
                                        </div>
                                    </a>
                                    <!--/.item-horizontal small-->
                                    <a href="item-detail.html" class="item-horizontal small">
                                        <h3>Blue Chilli</h3>
                                        <figure>2476 Whispering Pines Circle</figure>
                                        <div class="wrapper">
                                            <div class="image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/2.jpg" alt=""></div>
                                            <div class="info">
                                                <div class="type">
                                                    <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant.png" alt=""></i>
                                                    <span>Restaurant</span>
                                                </div>
                                                <div class="rating" data-rating="3"></div>
                                            </div>
                                        </div>
                                    </a>
                                    <!--/.item-horizontal small-->
                                    <a href="item-detail.html" class="item-horizontal small">
                                        <h3>Eddie’s Fast Food</h3>
                                        <figure>4365 Bruce Street</figure>
                                        <div class="wrapper">
                                            <div class="image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/3.jpg" alt=""></div>
                                            <div class="info">
                                                <div class="type">
                                                    <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant.png" alt=""></i>
                                                    <span>Restaurant</span>
                                                </div>
                                                <div class="rating" data-rating="5"></div>
                                            </div>
                                        </div>
                                    </a>
                                    <!--/.item-horizontal small-->
                                </section>
                                <section>
                                    <a href="#"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/ad-banner-sidebar.png" alt=""></a>
                                </section>
                                <section>
                                    <header><h2>Categories</h2></header>
                                    <ul class="bullets">
                                        <li><a href="#" >Restaurant</a></li>
                                        <li><a href="#" >Steak House & Grill</a></li>
                                        <li><a href="#" >Fast Food</a></li>
                                        <li><a href="#" >Breakfast</a></li>
                                        <li><a href="#" >Winery</a></li>
                                        <li><a href="#" >Bar & Lounge</a></li>
                                        <li><a href="#" >Pub</a></li>
                                    </ul>
                                </section>
                                <section>
                                    <header><h2>Events</h2></header>
                                    <div class="form-group">
                                        <select class="framed" name="events">
                                            <option value="">Select Your City</option>
                                            <option value="1">London</option>
                                            <option value="2">New York</option>
                                            <option value="3">Barcelona</option>
                                            <option value="4">Moscow</option>
                                            <option value="5">Tokyo</option>
                                        </select>
                                    </div>
                                    <!-- /.form-group -->
                                </section>
                            </aside>
                            <!-- /#sidebar-->
                        </div>
                        <!-- /.col-md-3-->
                    </div>
                </section>
            </div>
            <!-- end Page Content-->
        </div>
        <!-- end Page Canvas-->
        <!--Page Footer-->
        <footer id="page-footer">
            <div class="inner">
                <div class="footer-top">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-4 col-sm-4">
                                <!--New Items-->
                                <section>
                                    <h2>New Items</h2>
                                    <a href="item-detail.html" class="item-horizontal small">
                                        <h3>Cash Cow Restaurante</h3>
                                        <figure>63 Birch Street</figure>
                                        <div class="wrapper">
                                            <div class="image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/1.jpg" alt=""></div>
                                            <div class="info">
                                                <div class="type">
                                                    <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant.png" alt=""></i>
                                                    <span>Restaurant</span>
                                                </div>
                                                <div class="rating" data-rating="4"></div>
                                            </div>
                                        </div>
                                    </a>
                                    <!--/.item-horizontal small-->
                                    <a href="item-detail.html" class="item-horizontal small">
                                        <h3>Blue Chilli</h3>
                                        <figure>2476 Whispering Pines Circle</figure>
                                        <div class="wrapper">
                                            <div class="image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/2.jpg" alt=""></div>
                                            <div class="info">
                                                <div class="type">
                                                    <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant.png" alt=""></i>
                                                    <span>Restaurant</span>
                                                </div>
                                                <div class="rating" data-rating="3"></div>
                                            </div>
                                        </div>
                                    </a>
                                    <!--/.item-horizontal small-->
                                </section>
                                <!--end New Items-->
                            </div>
                            <div class="col-md-4 col-sm-4">
                                <!--Recent Reviews-->
                                <section>
                                    <h2>Recent Reviews</h2>
                                    <a href="item-detail.html#reviews" class="review small">
                                        <h3>Max Five Lounge</h3>
                                        <figure>4365 Bruce Street</figure>
                                        <div class="info">
                                            <div class="rating" data-rating="4"></div>
                                            <div class="type">
                                                <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant.png" alt=""></i>
                                                <span>Restaurant</span>
                                            </div>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non suscipit felis, sed sagittis tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ac placerat mauris.
                                        </p>
                                    </a><!--/.review-->
                                    <a href="item-detail.html#reviews" class="review small">
                                        <h3>Saguaro Tavern</h3>
                                        <figure>2476 Whispering Pines Circle</figure>
                                        <div class="info">
                                            <div class="rating" data-rating="5"></div>
                                            <div class="type">
                                                <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant.png" alt=""></i>
                                                <span>Restaurant</span>
                                            </div>
                                        </div>
                                        <p>
                                            Pellentesque mauris. Proin sit amet scelerisque risus. Donec semper semper erat ut mollis curabitur
                                        </p>
                                    </a>
                                    <!--/.review-->
                                </section>
                                <!--end Recent Reviews-->
                            </div>
                            <div class="col-md-4 col-sm-4">
                                <section>
                                    <h2>About Us</h2>
                                    <address>
                                        <div>Max Five Lounge</div>
                                        <div>63 Birch Street</div>
                                        <div>Granada Hills, CA 91344</div>
                                        <figure>
                                            <div class="info">
                                                <i class="fa fa-mobile"></i>
                                                <span>818-832-5258</span>
                                            </div>
                                            <div class="info">
                                                <i class="fa fa-phone"></i>
                                                <span>+1 123 456 789</span>
                                            </div>
                                            <div class="info">
                                                <i class="fa fa-globe"></i>
                                                <a href="#">www.maxfivelounge.com</a>
                                            </div>
                                        </figure>
                                    </address>
                                    <div class="social">
                                        <a href="#" class="social-button"><i class="fa fa-twitter"></i></a>
                                        <a href="#" class="social-button"><i class="fa fa-facebook"></i></a>
                                        <a href="#" class="social-button"><i class="fa fa-pinterest"></i></a>
                                    </div>

                                    <a href="contact.html" class="btn framed icon">Contact Us<i class="fa fa-angle-right"></i></a>
                                </section>
                            </div>
                            <!--/.col-md-4-->
                        </div>
                        <!--/.row-->
                    </div>
                    <!--/.container-->
                </div>
                <!--/.footer-top-->
                <div class="footer-bottom">
                    <div class="container">
                        <span class="left">(C) ThemeStarz, All rights reserved</span>
                            <span class="right">
                                <a href="#page-top" class="to-top roll"><i class="fa fa-angle-up"></i></a>
                            </span>
                    </div>
                </div>
                <!--/.footer-bottom-->
            </div>
        </footer>
        <!--end Page Footer-->
    </div>
    <!-- end Inner Wrapper -->
</div>
<!-- end Outer Wrapper-->

</body>
</html>