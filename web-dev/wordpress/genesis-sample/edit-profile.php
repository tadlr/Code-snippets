<?php /* Template Name: UM Edit Profile */ ?>

<?php  get_header(); ?>


<script type="text/javascript">
    // Javascript URL redirection
    //window.location.replace("/profile");
</script>


<!-- Outer Wrapper-->
<div id="outer-wrapper">
    <!-- Inner Wrapper -->
    <div id="inner-wrapper">
        <!-- Navigation-->
        <div class="FixedHeader">
            <?php include ('./wp-content/themes/genesis-sample/assets/elements/TopMenu.php'); ?>
        </div>

        <div class="HeaderSpace"></div>
        <!-- end Navigation-->
        <!-- Page Canvas-->
        <div id="page-canvas">
            <?php include ('./wp-content/themes/genesis-sample/assets/elements/Responsive-Menu.php'); ?>

            <!--Page Content-->
            <div id="page-content">
                <section class="container">
                    <div class="SignUpForm">
                        <div class="ProfileEditTitle">
                            <h2 class="EditProfileTitle">Edit your profile</h2>   
                        </div>
                        <?php dynamic_sidebar( 'student-profile' ); ?>
                        <div class="BackProfile">
                            <a href="/profile">
                                <button class="BackProfileButton">
                                    Back to Profile
                                </button>
                            </a>
                        </div>
                    </div>
                </section>
                <!-- /.block-->
            </div>

            
            
            <!-- end Page Content-->
            <!--Page Footer-->
        <footer id="PageFooter">      
            <?php include ('./wp-content/themes/genesis-sample/assets/elements/footer.php'); ?>
        </footer>
        <!--end Page Footer-->   
        </div>
        <!-- end Page Canvas--> 
    </div>
    <!-- end Inner Wrapper -->
</div>

  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBT-ZVg1zPwKkYHO_6ptis2NAqDvONO-PQ&libraries=places"></script> 
  <script src="/wp-content/themes/genesis-sample/js/auto-complete.js"></script> 

<script>
    
    // Now you can use the library as you normally would
    new AddressAutocomplete('#address1', function (result) {
      console.log(result);
    });
 
    new AddressAutocomplete('#address2', function (result) {
      console.log(result);
    });
  </script> 

<?php  get_footer(); ?>