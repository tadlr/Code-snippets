<?php  get_header(); ?>

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
         <div style="height: 20px;"> </div>
        <!-- Page Canvas-->
        <div id="page-canvas">
            <?php include ('./wp-content/themes/genesis-sample/assets/elements/Responsive-Menu.php'); ?>

            <!--Page Content-->
            <div id="page-content">
                <section class="container">
                    <div class="row">
                        <div class="FAQContainer">
                            <div>
                                <header class="FAQTittle">FAQ</header>
                            </div>
                            <div class="FAQSection">
                                <div class="FaqElement">
                                    <h3 class="QuestionTille">What can I do on Synchronize Hub?</h3>
                                    <p class="QuestionText">Whether you are a student or a professional in a non-profit organization you can search the interactive map to find like-minded environmentalists in your community with whom you can collaborate, request advice, share resources, coordinate a campaign with, or simply support. There are two versions of the map: <a href="/student">Browse Students</a> and <a href="/organizer">Browse Organizers</a>.</p>

                                    <p class="QuestionText">By becoming a Synchronizer you are join  the citizen-led movement that focus on 4 main plastic group focuses: bags, bottles, straws, and disposable foodware (utensils, containers, etc.)</p>
                                </div>
                                <hr>
                                <div class="FaqElement">
                                    <h3 class="QuestionTille">Do I have to have a particular “focus” plastic in mind?</h3>
                                    <p class="QuestionText">Yes, selecting a focus plastic of either bottle, straw, bag, or foodware can help you connect with other members more easily. It provides the foundation for you and your potential partners to know where to start collaborating. You can always change your focus plastic at anytime through your profile settings <a href="/profile/?profiletab=main&um_action=edit">(Edit Profile)</a>. Most organizations have a mission towards reducing all types of plastic waste anyways, so selecting one focus will not restrict your efforts.</p>
                                </div>
                                <hr>
                                <div class="FaqElement">
                                    <h3 class="QuestionTille">How come when I search for some regions they don’t show up on the map?</h3>
                                    <p class="QuestionText">Currently, our site can only show the regions where there is existing user activity. Unfortunately, if no activity shows up in a region you’re looking for, that means there is no student or NGO Synchronizer within an area that you’ve searched for. Don’t worry, this is a great opportunity for you to take initiative and be the first in your area! </p>
                                </div>
                                <hr>
                                <div class="FaqElement">
                                    <h3 class="QuestionTille">Why are there only four types of plastics in the “focus”? </h3>
                                    <p class="QuestionText">Bottles, bags, straws, and foodware make up the most prevalent single-use plastic products that contribute to the <u>8 million tons of plastic dumped into the ocean every year.  Every minute, a million plastic bottles are bought. Every day, in the US alone, 500 million straws are used. Every year, more than 500 billion plastic bags are produced.</u> Foodware (packaging, cutlery, cups, and containers) pollution has yet to be calculated but we know that they also have a <u>working life of only 15 minutes</u>.</p>
                                </div>
                                <hr>
                                <div class="FaqElement">
                                    <h3 class="QuestionTille">What happens after I connect with someone with a mutual interest?</h3>
                                    <p class="QuestionText">Each profile provides the best way to reach out to another Synchronizer. Identify yourself as a fellow Synchronizer whether in the subject line of an email, text message, or other forms of communication. We verify each user so they will be open and willing to connect with you!</p>
                                </div>  
                            </div>
                            <div class="FAQEnd">
                                <div class="FaqBoxLeft">
                                    <div class="FindAnswerContainer">
                                        <p><i class="FindAnswerIcon icon-question-circle"></i> <span class="FindAnswer">Didn’t find your answer?</span></p>
                                    </div>
                                </div>
                                <div class="FaqBoxRight">
                                    <div class="FAQButtonContainer">
                                        <a href="/contact">
                                            <button class="FAQButton">
                                                Contact Us
                                            </button>
                                        </a>
                                    </div>    
                                </div>
                            </div>
                        </div>
                        <div style="height:40px"> </div>
                    </div>
                </section> 
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
<!-- end Outer Wrapper-->

<?php
    get_footer();
?>