<!DOCTYPE html>

<html lang="en-US">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Spotter - Universal Directory Listing HTML Template</title>

</head>

<body onunload="" class="page-subpage navigation-off-canvas" id="page-top">

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
                        <!--Content-->
                        <div class="col-md-9 col-sm-8">
                            <header>
                                <h1 class="page-title">Results</h1>
                            </header>
                            <figure class="filter clearfix">
                                <div class="buttons pull-left">
                                    <a href="listing-grid.html" class="btn icon active"><i class="fa fa-th"></i>Grid</a>
                                    <a href="listing-list.html" class="btn icon"><i class="fa fa-th-list"></i>List</a>
                                </div>
                                <div class="pull-right">
                                    <aside class="sorting">
                                        <span>Sorting</span>
                                        <div class="form-group">
                                            <select class="framed" name="sort">
                                                <option value="">Date - Newest First</option>
                                                <option value="1">Date - Oldest First</option>
                                                <option value="2">Price - Highest First</option>
                                                <option value="3">Price - Lowest First</option>
                                            </select>
                                        </div>
                                        <!-- /.form-group -->
                                    </aside>
                                </div>
                            </figure>

                            <!--Listing Grid-->
                            <section class="block equal-height">
                                <div class="row">
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item-specific">
                                                        <span title="Bedrooms"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/bedrooms.png" alt="">2</span>
                                                        <span title="Bathrooms"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/bathrooms.png" alt="">2</span>
                                                        <span title="Area"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/area.png" alt="">240m<sup>2</sup></span>
                                                        <span title="Garages"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/garages.png" alt="">1</span>
                                                    </div>
                                                    <div class="icon">
                                                        <i class="fa fa-thumbs-up"></i>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/1.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Steak House Restaurant</h3></a>
                                                <figure>63 Birch Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant.png" alt=""></i>
                                                        <span>Restaurant</span>
                                                    </div>
                                                    <div class="rating" data-rating="4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/2.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Benny’s Cafeteria</h3></a>
                                                <figure>63 Birch Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/cafetaria.png" alt=""></i>
                                                        <span>Cafeteria</span>
                                                    </div>
                                                    <div class="rating" data-rating="4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item-specific">
                                                        <span>Daily menu from: $6</span>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/restaurant/9.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Big Bamboo</h3></a>
                                                <figure>4662 Bruce Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/japanese-food.png" alt=""></i>
                                                        <span>Sushi</span>
                                                    </div>
                                                    <div class="rating" data-rating="3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item-specific">
                                                        <span>Daily menu from: $6</span>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/restaurant/10.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Sushi Wooshi Bar</h3></a>
                                                <figure>357 Trainer Avenue</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/fishchips.png" alt=""></i>
                                                        <span>Sushi Bar</span>
                                                    </div>
                                                    <div class="rating" data-rating="3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->

                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/restaurant/11.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Max Five Lounge</h3></a>
                                                <figure>63 Birch Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant.png" alt=""></i>
                                                        <span>Restaurant</span>
                                                    </div>
                                                    <div class="rating" data-rating="4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/restaurant/4.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Magma Bar & Grill</h3></a>
                                                <figure>63 Birch Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant_steakhouse.png" alt=""></i>
                                                        <span>Steak House</span>
                                                    </div>
                                                    <div class="rating" data-rating="4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item-specific">
                                                        <span>Menu from: $9.00</span>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/restaurant/8.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Guild Trattoria</h3></a>
                                                <figure>4662 Bruce Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/barbecue.png" alt=""></i>
                                                        <span>BBQ Restaurant</span>
                                                    </div>
                                                    <div class="rating" data-rating="3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/restaurant/12.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Sushi Wooshi Bar</h3></a>
                                                <figure>357 Trainer Avenue</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/fishchips.png" alt=""></i>
                                                        <span>Sushi Bar</span>
                                                    </div>
                                                    <div class="rating" data-rating="3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->

                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/4.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Max Five Lounge</h3></a>
                                                <figure>63 Birch Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant.png" alt=""></i>
                                                        <span>Restaurant</span>
                                                    </div>
                                                    <div class="rating" data-rating="4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/6.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Magma Bar & Grill</h3></a>
                                                <figure>63 Birch Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant_steakhouse.png" alt=""></i>
                                                        <span>Steak House</span>
                                                    </div>
                                                    <div class="rating" data-rating="4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item-specific">
                                                        <span>Menu from: $9.00</span>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/7.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Guild Trattoria</h3></a>
                                                <figure>4662 Bruce Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/barbecue.png" alt=""></i>
                                                        <span>BBQ Restaurant</span>
                                                    </div>
                                                    <div class="rating" data-rating="3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/5.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Sushi Wooshi Bar</h3></a>
                                                <figure>357 Trainer Avenue</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/fishchips.png" alt=""></i>
                                                        <span>Sushi Bar</span>
                                                    </div>
                                                    <div class="rating" data-rating="3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->

                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item-specific">
                                                        <span title="Bedrooms"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/bedrooms.png" alt="">2</span>
                                                        <span title="Bathrooms"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/bathrooms.png" alt="">2</span>
                                                        <span title="Area"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/area.png" alt="">240m<sup>2</sup></span>
                                                        <span title="Garages"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/garages.png" alt="">1</span>
                                                    </div>
                                                    <div class="icon">
                                                        <i class="fa fa-thumbs-up"></i>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/1.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Steak House Restaurant</h3></a>
                                                <figure>63 Birch Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant.png" alt=""></i>
                                                        <span>Restaurant</span>
                                                    </div>
                                                    <div class="rating" data-rating="4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/2.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Benny’s Cafeteria</h3></a>
                                                <figure>63 Birch Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/cafetaria.png" alt=""></i>
                                                        <span>Cafeteria</span>
                                                    </div>
                                                    <div class="rating" data-rating="4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item-specific">
                                                        <span>Daily menu from: $6</span>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/restaurant/9.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Big Bamboo</h3></a>
                                                <figure>4662 Bruce Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/japanese-food.png" alt=""></i>
                                                        <span>Sushi</span>
                                                    </div>
                                                    <div class="rating" data-rating="3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item-specific">
                                                        <span>Daily menu from: $6</span>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/restaurant/10.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Sushi Wooshi Bar</h3></a>
                                                <figure>357 Trainer Avenue</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/fishchips.png" alt=""></i>
                                                        <span>Sushi Bar</span>
                                                    </div>
                                                    <div class="rating" data-rating="3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->

                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/restaurant/11.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Max Five Lounge</h3></a>
                                                <figure>63 Birch Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant.png" alt=""></i>
                                                        <span>Restaurant</span>
                                                    </div>
                                                    <div class="rating" data-rating="4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/restaurant/4.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Magma Bar & Grill</h3></a>
                                                <figure>63 Birch Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant_steakhouse.png" alt=""></i>
                                                        <span>Steak House</span>
                                                    </div>
                                                    <div class="rating" data-rating="4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item-specific">
                                                        <span>Menu from: $9.00</span>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/restaurant/8.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Guild Trattoria</h3></a>
                                                <figure>4662 Bruce Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/barbecue.png" alt=""></i>
                                                        <span>BBQ Restaurant</span>
                                                    </div>
                                                    <div class="rating" data-rating="3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/restaurant/12.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Sushi Wooshi Bar</h3></a>
                                                <figure>357 Trainer Avenue</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/fishchips.png" alt=""></i>
                                                        <span>Sushi Bar</span>
                                                    </div>
                                                    <div class="rating" data-rating="3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->

                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/4.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Max Five Lounge</h3></a>
                                                <figure>63 Birch Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant.png" alt=""></i>
                                                        <span>Restaurant</span>
                                                    </div>
                                                    <div class="rating" data-rating="4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/6.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Magma Bar & Grill</h3></a>
                                                <figure>63 Birch Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/restaurant_steakhouse.png" alt=""></i>
                                                        <span>Steak House</span>
                                                    </div>
                                                    <div class="rating" data-rating="4"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="item-specific">
                                                        <span>Menu from: $9.00</span>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/7.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Guild Trattoria</h3></a>
                                                <figure>4662 Bruce Street</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/barbecue.png" alt=""></i>
                                                        <span>BBQ Restaurant</span>
                                                    </div>
                                                    <div class="rating" data-rating="3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                    <div class="col-md-4 col-sm-6">
                                        <div class="item ">
                                            <div class="image">
                                                <div class="quick-view" data-toggle="modal" data-target="#modal-bar"><i class="fa fa-eye"></i><span>Quick View</span></div>
                                                <a href="item-detail.html">
                                                    <div class="overlay">
                                                        <div class="inner">
                                                            <div class="content">
                                                                <h4>Description</h4>
                                                                <p>Curabitur odio nibh, luctus non pulvinar a, ultricies ac diam. Donec neque massa</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/items/5.jpg" alt="">
                                                </a>
                                            </div>
                                            <div class="wrapper">
                                                <a href="item-detail.html"><h3>Sushi Wooshi Bar</h3></a>
                                                <figure>357 Trainer Avenue</figure>
                                                <div class="info">
                                                    <div class="type">
                                                        <i><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/icons/restaurants-bars/restaurants/fishchips.png" alt=""></i>
                                                        <span>Sushi Bar</span>
                                                    </div>
                                                    <div class="rating" data-rating="3"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /.item-->
                                    </div>
                                    <!--/.col-sm-4-->
                                </div>
                                <!--/.row-->
                            </section>
                            <!--end Listing Grid-->
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
                        <!--Sidebar-->
                        <div class="col-md-3 col-sm-4">
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
                        <!--end Sidebar-->
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
                            <div class="col-md-4 col-sm-6">
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
                            <div class="col-md-4 col-sm-6">
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
                            <div class="col-md-4 col-sm-6">
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