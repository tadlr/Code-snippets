<!DOCTYPE html>

<html lang="en-US">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Spotter - Universal Directory Listing HTML Template</title>

</head>

<body onunload="" class="page-subpage page-item-detail navigation-off-canvas" id="page-top">

<!-- Outer Wrapper-->
<div id="outer-wrapper">
    <!-- Inner Wrapper -->
    <div id="inner-wrapper">
        <!-- Navigation-->
        <div class="header">
            <div class="wrapper">
                <div class="brand">
                    <a href="index-real-estate.html"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/logo-real-estate.png" alt="logo"></a>
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

                <div id="map-detail"></div>
                <section class="container">
                    <div class="row">
                        <!--Item Detail Content-->
                        <div class="col-md-9">
                            <section class="block" id="main-content">
                                <header class="page-title">
                                    <div class="title">
                                        <h1>Max Five Lounge</h1>
                                        <figure>63 Birch Street</figure>
                                    </div>
                                    <div class="info">
                                        <div class="type">
                                            <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/real-estate/apartment-3.png" alt=""></i>
                                            <span>Apartment</span>
                                        </div>
                                    </div>
                                </header>
                                <div class="row">
                                    <!--Detail Sidebar-->
                                    <aside class="col-md-4 col-sm-4" id="detail-sidebar">
                                        <!--Overview-->
                                        <section>
                                            <header><h3>Overview</h3></header>
                                            <figure>
                                                <dl>
                                                    <dt>Bedrooms</dt>
                                                    <dd>1</dd>
                                                    <dt>Bedrooms</dt>
                                                    <dd>1</dd>
                                                    <dt>Area</dt>
                                                    <dd>140</dd>
                                                    <dt>Garages</dt>
                                                    <dd>1</dd>
                                                    <dt>Rooms</dt>
                                                    <dd>5</dd>
                                                    <dt>Build Year</dt>
                                                    <dd>1982</dd>
                                                </dl>
                                            </figure>
                                        </section>
                                        <!--end Overview-->
                                        <!--Contact-->
                                        <section>
                                            <header><h3>Contact Agent</h3></header>
                                            <figure>
                                                <a href="#" class="person">
                                                    <div class="image">
                                                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/member-2.jpg" alt="">
                                                    </div>
                                                    <div class="wrapper">
                                                        <h5>Catherine Brown</h5>
                                                    </div>
                                                </a>
                                            </figure>
                                            <address>
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
                                        </section>
                                        <!--end Contact-->
                                        <!--Contact Form-->
                                        <section>
                                            <header><h3>Contact Form</h3></header>
                                            <figure>
                                                <form class="framed-inputs" id="item-detail-form" role="form" method="post" action="?">
                                                    <div class="form-group">
                                                        <label for="item-detail-name">Name</label>
                                                        <input type="text" class="form-control framed" id="item-detail-name" name="item-detail-name" required="">
                                                    </div>
                                                    <!-- /.form-group -->
                                                    <div class="form-group">
                                                        <label for="item-detail-email">Email</label>
                                                        <input type="email" class="form-control framed" id="item-detail-email" name="item-detail-email" required="">
                                                    </div>
                                                    <!-- /.form-group -->
                                                    <div class="form-group">
                                                        <label for="item-detail-message">Message</label>
                                                        <textarea class="form-control framed" id="item-detail-message" name="item-detail-message"  rows="3" required=""></textarea>
                                                    </div>
                                                    <!-- /.form-group -->
                                                    <div class="form-group">
                                                        <button type="submit" class="btn framed icon">Send<i class="fa fa-angle-right"></i></button>
                                                    </div>
                                                    <!-- /.form-group -->
                                                </form>
                                            </figure>
                                        </section>
                                        <!--end Contact Form-->
                                        <!--Rating-->
                                        <section class="clearfix">
                                            <header class="pull-left"><a href="#reviews" class="roll"><h3>Rating</h3></a></header>
                                            <figure class="rating big pull-right" data-rating="4"></figure>
                                        </section>
                                        <!--end Rating-->
                                    </aside>
                                    <!--end Detail Sidebar-->
                                    <!--Content-->
                                    <div class="col-md-8 col-sm-8">
                                        <section>
                                            <article class="item-gallery">
                                                <div class="owl-carousel item-slider">
                                                    <div class="slide"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/12.jpg" data-hash="1"></div>
                                                    <div class="slide"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/6.jpg" data-hash="2"></div>
                                                    <div class="slide"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/1.jpg" data-hash="3"></div>
                                                    <div class="slide"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/8.jpg" data-hash="4"></div>
                                                    <div class="slide"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/9.jpg" data-hash="5"></div>
                                                    <div class="slide"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/10.jpg" data-hash="6"></div>
                                                    <div class="slide"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/7.jpg" data-hash="7"></div>
                                                </div>
                                                <!-- /.item-slider -->
                                                <div class="thumbnails">
                                                    <span class="expand-content btn framed icon" data-expand="#gallery-thumbnails" >More<i class="fa fa-plus"></i></span>
                                                    <div class="expandable-content height collapsed show-70" id="gallery-thumbnails">
                                                        <div class="content">
                                                            <a href="#1" id="thumbnail-1" class="active"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/12.jpg"></a>
                                                            <a href="#2" id="thumbnail-2"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/6.jpg"></a>
                                                            <a href="#3" id="thumbnail-3"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/1.jpg"></a>
                                                            <a href="#4" id="thumbnail-4"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/8.jpg"></a>
                                                            <a href="#5" id="thumbnail-5"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/9.jpg"></a>
                                                            <a href="#6" id="thumbnail-6"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/10.jpg"></a>
                                                            <a href="#7" id="thumbnail-7"><img alt="" src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/7.jpg"></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </article>
                                            <!-- /.item-gallery -->
                                            <article class="block">
                                                <header><h2>Description</h2></header>
                                                <p>
                                                    Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam.
                                                    Donec neque massa, viverra interdum eros ut, imperdiet pellentesque mauris.
                                                    Proin sit amet scelerisque risus. Donec semper semper erat ut mollis.
                                                    Curabitur suscipit, justo eu dignissim lacinia, ante sapien pharetra duin
                                                    consectetur eros augue sed ex. Donec a odio rutrum, hendrerit sapien vitae,
                                                    euismod arcu. Suspendisse potenti. Integer ut diam venenatis, pellentesque
                                                    felis eget, elementum enim. Suspendisse sit amet massa commodo nulla iaculis
                                                    fermentum. Integer eget tincidunt est, in imperdiet risus.
                                                    Morbi sit amet urna purus.
                                                </p>
                                            </article>
                                            <!-- /.block -->
                                            <article class="block">
                                                <header><h2>Features</h2></header>
                                                <ul class="bullets">
                                                    <li>Free Parking</li>
                                                    <li>Cards Accepted</li>
                                                    <li>Wi-Fi</li>
                                                    <li>Air Condition</li>
                                                    <li>Reservations</li>
                                                    <li>Teambuildings</li>
                                                    <li>Places to seat</li>
                                                    <li>Winery</li>
                                                    <li>Draft Beer</li>
                                                    <li>LCD</li>
                                                    <li>Saloon</li>
                                                    <li>Free Access</li>
                                                    <li>Terrace</li>
                                                    <li>Minigolf</li>
                                                </ul>
                                            </article>
                                            <!-- /.block -->
                                        </section>
                                        <!--Reviews-->
                                        <section class="block" id="reviews">
                                            <header class="clearfix">
                                                <h2 class="pull-left">Reviews</h2>
                                                <a href="#write-review" class="btn framed icon pull-right roll">Write a review <i class="fa fa-pencil"></i></a>
                                            </header>
                                            <article class="clearfix overall-rating">
                                                <strong class="pull-left">Over Rating</strong>
                                                <figure class="rating big color pull-right" data-rating="4"></figure>
                                                <!-- /.rating -->
                                            </article><!-- /.overall-rating-->
                                            <section class="reviews">
                                                <article class="review">
                                                    <figure class="author">
                                                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/default-avatar.png" alt="">
                                                        <div class="date">12.05.2014</div>
                                                    </figure>
                                                    <!-- /.author-->
                                                    <div class="wrapper">
                                                        <h5>Catherine Brown</h5>
                                                        <figure class="rating big color" data-rating="4"></figure>
                                                        <p>
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                            Nulla vestibulum, sem ut sollicitudin consectetur, augue diam ornare massa,
                                                            ac vehicula leo turpis eget purus. Nunc pellentesque vestibulum mauris,
                                                            eget suscipit mauris imperdiet vel. Nulla et massa metus.
                                                        </p>
                                                        <div class="individual-rating">
                                                            <span>Value</span>
                                                            <figure class="rating" data-rating="4"></figure>
                                                        </div>
                                                        <!-- /.user-rating -->
                                                        <div class="individual-rating">
                                                            <span>Service</span>
                                                            <figure class="rating" data-rating="4"></figure>
                                                        </div>
                                                        <!-- /.user-rating -->
                                                    </div>
                                                    <!-- /.wrapper-->
                                                </article>
                                                <!-- /.review -->
                                                <article class="review">
                                                    <figure class="author">
                                                        <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/default-avatar.png" alt="">
                                                        <div class="date">10.05.2014</div>
                                                    </figure>
                                                    <!-- /.author-->
                                                    <div class="wrapper">
                                                        <h5>John Doe</h5>
                                                        <figure class="rating big color" data-rating="5"></figure>
                                                        <p>
                                                            Nunc pellentesque vestibulum mauris, eget suscipit mauris
                                                            imperdiet vel. Nulla et massa metus. Nam porttitor quam eget ante
                                                        </p>
                                                        <div class="individual-rating">
                                                            <span>Value</span>
                                                            <figure class="rating" data-rating="5"></figure>
                                                        </div>
                                                        <!-- /.user-rating -->
                                                        <div class="individual-rating">
                                                            <span>Service</span>
                                                            <figure class="rating" data-rating="5"></figure>
                                                        </div>
                                                        <!-- /.user-rating -->
                                                    </div>
                                                    <!-- /.wrapper-->
                                                </article>
                                                <!-- /.review -->
                                            </section>
                                            <!-- /.reviews-->
                                        </section>
                                        <!-- /#reviews -->
                                        <!--end Reviews-->
                                        <!--Review Form-->
                                        <section id="write-review">
                                            <header>
                                                <h2>Write a Review</h2>
                                            </header>
                                            <form id="form-review" role="form" method="post" action="?" class="background-color-white">
                                                <div class="row">
                                                    <div class="col-md-8">
                                                        <div class="form-group">
                                                            <label for="form-review-name">Name</label>
                                                            <input type="text" class="form-control" id="form-review-name" name="form-review-name" required="">
                                                        </div>
                                                        <!-- /.form-group -->
                                                        <div class="form-group">
                                                            <label for="form-review-email">Email</label>
                                                            <input type="email" class="form-control" id="form-review-email" name="form-review-email" required="">
                                                        </div>
                                                        <!-- /.form-group -->
                                                        <div class="form-group">
                                                            <label for="form-review-message">Message</label>
                                                            <textarea class="form-control" id="form-review-message" name="form-review-message"  rows="3" required=""></textarea>
                                                        </div>
                                                        <!-- /.form-group -->
                                                        <div class="form-group">
                                                            <button type="submit" class="btn btn-default">Submit Review</button>
                                                        </div>
                                                        <!-- /.form-group -->
                                                    </div>
                                                    <div class="col-md-4">
                                                        <aside class="user-rating">
                                                            <label>Value</label>
                                                            <figure class="rating active" data-name="value"></figure>
                                                        </aside>
                                                        <aside class="user-rating">
                                                            <label>Service</label>
                                                            <figure class="rating active" data-name="score"></figure>
                                                        </aside>
                                                    </div>
                                                </div>
                                            </form>
                                            <!-- /.main-search -->
                                        </section>
                                        <!--end Review Form-->
                                    </div>
                                    <!-- /.col-md-8-->
                                </div>
                                <!-- /.row -->
                            </section>
                            <!-- /#main-content-->
                        </div>
                        <!-- /.col-md-8-->
                        <!--Sidebar-->
                        <div class="col-md-3">
                            <aside id="sidebar">
                                <section>
                                    <header><h2>New Places</h2></header>
                                    <a href="item-detail.html" class="item-horizontal small">
                                        <h3>3295 Valley Street</h3>
                                        <figure>Collingswood</figure>
                                        <div class="wrapper">
                                            <div class="image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/6.jpg" alt=""></div>
                                            <div class="info">
                                                <div class="type">
                                                    <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/real-estate/apartment-3.png" alt=""></i>
                                                    <span>Apartment</span>
                                                </div>
                                                <div class="rating" data-rating="4"></div>
                                            </div>
                                        </div>
                                    </a>
                                    <!--/.item-horizontal small-->
                                    <a href="item-detail.html" class="item-horizontal small">
                                        <h3>534 Roosevelt Street</h3>
                                        <figure>San Francisco</figure>
                                        <div class="wrapper">
                                            <div class="image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/11.jpg" alt=""></div>
                                            <div class="info">
                                                <div class="type">
                                                    <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/real-estate/apartment-3.png" alt=""></i>
                                                    <span>Apartment</span>
                                                </div>
                                                <div class="rating" data-rating="3"></div>
                                            </div>
                                        </div>
                                    </a>
                                    <!--/.item-horizontal small-->
                                    <a href="item-detail.html" class="item-horizontal small">
                                        <h3>3019 White Avenue</h3>
                                        <figure>Corpus Christi</figure>
                                        <div class="wrapper">
                                            <div class="image"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/real-estate/1.jpg" alt=""></div>
                                            <div class="info">
                                                <div class="type">
                                                    <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/real-estate/apartment-3.png" alt=""></i>
                                                    <span>Apartment</span>
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
                        <!--end Sidebar-->
                    </div><!-- /.row-->
                </section>
                <!-- /.container-->
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

<script>
    var itemID = 1;
    $.getJSON(urlCompleta+'assets/json/real-estate.json.txt')
        .done(function(json) {
                $.each(json.data, function(a) {
                    if( json.data[a].id == itemID ) {
                        itemDetailMap(json.data[a]);
                    }
                });
        })
        .fail(function( jqxhr, textStatus, error ) {
            console.log(error);
        })
    ;
    $(window).load(function(){
        var rtl = false; // Use RTL
        initializeOwl(rtl);
    });
</script>

</body>
</html>