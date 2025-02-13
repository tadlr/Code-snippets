<!DOCTYPE html>

<html lang="en-US">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Spotter - Universal Directory Listing HTML Template</title>

</head>

<body onunload="" class="page-subpage page-blog-detail navigation-off-canvas" id="page-top">

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
                                <h1 class="page-title">Article Title</h1>
                            </header>

                            <article class="blog-post">
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
                                <h3>Parahraph Headline</h3>
                                <p>
                                    Phasellus metus ipsum, sollicitudin lacinia turpis in, pellentesque pulvinar diam.
                                    Cras ultricies augue sapien, aliquam hendrerit mi suscipit at. Suspendisse vulputate felis eget
                                    felis convallis fermentum et eu nulla. Donec sagittis sit amet erat non eleifend. Mauris at convallis
                                    magna. Quisque pellentesque id mauris vitae placerat. Mauris facilisis odio nec metus cursus commodo.
                                    Integer vel libero nunc. Donec ac lorem commodo, laoreet elit eget, tempus ante. Quisque eu nunc blandit
                                    erat rutrum feugiat ac sed arcu. In nisi risus, molestie a sem adipiscing, porta volutpat velit.
                                    Pellentesque nec felis sit amet nunc porta tincidunt sit amet et justo.
                                </p>
                                <h3>Audio Object</h3>
                                <iframe width="100%" height="166" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/71654970&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
                                <h3>Parahraph Headline</h3>
                                <p>
                                    Phasellus metus ipsum, sollicitudin lacinia turpis in, pellentesque pulvinar diam.
                                    Cras ultricies augue sapien, aliquam hendrerit mi suscipit at. Suspendisse vulputate felis eget
                                    felis convallis fermentum et eu nulla. Donec sagittis sit amet erat non eleifend. Mauris at convallis
                                    magna. Quisque pellentesque id mauris vitae placerat.
                                </p>
                                <h4>List Headline</h4>
                                <ul>
                                    <li>Phasellus metus ipsum, sollicitudin</li>
                                    <li>Quisque pellentesque id mauris</li>
                                    <li>Donec ac lorem commodo</li>
                                    <li>In nisi risus, molestie a sem adipiscing</li>
                                    <li>Pellentesque nec felis sit amet nunc</li>
                                </ul>
                            </article><!-- /.blog-post-listing -->
                            <section id="about-author">
                                <header class="no-border"><h3>About the Author</h3></header>
                                <div class="post-author">
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/client.jpg" alt="">
                                    <div class="wrapper">
                                        <header>Maria Scott</header>
                                        <p>Phasellus metus ipsum, sollicitudin lacinia turpis in, pellentesque pulvinar diam.
                                            Cras ultricies augue sapien, aliquam hendrerit mi suscipit at. Suspendisse vulputate felis eget
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section id="comments">
                                <header><h2 class="no-border">Comments</h2></header>
                                <ul class="comments">
                                    <li class="comment">
                                        <figure>
                                            <div class="image">
                                                <img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/default-avatar.png">
                                            </div>
                                        </figure>
                                        <div class="comment-wrapper">
                                            <div class="name pull-left">Catherine Brown</div>
                                            <span class="date pull-right"><span class="fa fa-calendar"></span>12.05.2014</span>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum, sem ut sollicitudin consectetur,
                                                augue diam ornare massa, ac vehicula leo turpis eget purus. Nunc pellentesque vestibulum mauris, eget suscipit
                                                mauris imperdiet vel. Nulla et massa metus. Nam porttitor quam eget ante elementum consectetur. Aenean ac nisl
                                                et nulla placerat suscipit eu a mauris. Curabitur quis augue condimentum, varius mi in, ultricies velit.
                                                Suspendisse potenti.
                                            </p>
                                            <a href="#" class="reply"><span class="fa fa-reply"></span>Reply</a>
                                            <hr>
                                        </div>
                                    </li>
                                    <li>
                                        <ul class="comments-child">
                                            <li class="comment">
                                                <figure>
                                                    <div class="image">
                                                        <img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/default-avatar.png">
                                                    </div>
                                                </figure>
                                                <div class="comment-wrapper">
                                                    <div class="name">John Doe</div>
                                                    <span class="date"><span class="fa fa-calendar"></span>24.06.2014</span>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum, sem ut sollicitudin consectetur,
                                                        augue diam ornare massa, ac vehicula leo turpis eget purus. Nunc pellentesque vestibulum mauris, eget suscipit
                                                        mauris.
                                                    </p>
                                                    <a href="#" class="reply"><span class="fa fa-reply"></span>Reply</a>
                                                    <hr>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="comment">
                                        <figure>
                                            <div class="image">
                                                <img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/default-avatar.png">
                                            </div>
                                        </figure>
                                        <div class="comment-wrapper">
                                            <div class="name">John Doe</div>
                                            <span class="date"><span class="fa fa-calendar"></span>08.05.2014</span>
                                            <p>Quisque iaculis neque at dui cursus posuere. Sed tristique pharetra orci, eu malesuada ante tempus nec.
                                                Phasellus enim odio, facilisis et ante vel, tempor congue sapien. Praesent eget ligula
                                                eu libero cursus facilisis vel non arcu. Sed vitae quam enim.
                                            </p>
                                            <a href="#" class="reply"><span class="fa fa-reply"></span>Reply</a>
                                            <hr>
                                        </div>
                                    </li>
                                </ul>
                            </section><!-- /#comments -->
                            <section id="leave-reply">
                                <header><h2 class="no-border">Leave a Reply</h2></header>
                                <form role="form" id="form-blog-reply" method="post" action="?" class="clearfix">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="form-blog-reply-name">Your Name<em>*</em></label>
                                                <input type="text" class="form-control" id="form-blog-reply-name" name="form-blog-reply-name" required>
                                            </div><!-- /.form-group -->
                                        </div><!-- /.col-md-6 -->
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="form-blog-reply-email">Your Email<em>*</em></label>
                                                <input type="email" class="form-control" id="form-blog-reply-email" name="form-blog-reply-email" required>
                                            </div><!-- /.form-group -->
                                        </div><!-- /.col-md-6 -->
                                    </div><!-- /.row -->
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label for="form-blog-reply-message">Your Message<em>*</em></label>
                                                <textarea class="form-control" id="form-blog-reply-message" rows="5" name="form-blog-reply-message" required></textarea>
                                            </div><!-- /.form-group -->
                                        </div><!-- /.col-md-12 -->
                                    </div><!-- /.row -->
                                    <div class="form-group clearfix">
                                        <button type="submit" class="btn pull-right btn-default" id="form-blog-reply-submit">Leave a Reply</button>
                                    </div><!-- /.form-group -->
                                    <div id="form-rating-status"></div>
                                </form><!-- /#form-contact -->
                            </section>

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