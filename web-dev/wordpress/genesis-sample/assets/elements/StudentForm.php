<?php 
//function FindUniversity() {
    //echo ('<option  value="Bag" data-content="Bag"></option>');
    
$args = array( 'role' => 'student-user', 'fields' => 'ID');  
$user_query = new  WP_User_Query( $args );        
$Universities = '';            
            
        if ( !empty ($user_query->get_results()) ){
            foreach ($user_query->get_results() as $user) { $member_ID = $user;
                    
                    um_fetch_user($member_ID);
                    $UniversityName = ('<option value="'.um_user('University-Name').'">'.um_user('University-Name').'</option>');
                    $Universities .= $UniversityName;
            }

            
            } 
//}
?>

<div class="StudentFormFields">
    <div class="StudentLocationSearch">
        <div class="SearchTitles">
            <p class="WhereLooking">Where are you looking?</p>
            
             <div class="input-group location LocationSearch">
                <span class="FindIcon"> <!-- input-group-addon --> 
                    <i class="icon-magnifier"><!--geolocation--></i>
                </span>
                
                    <input type="text" class="FindLocation" id="location" name="location" placeholder="City, State, or Country">                 
            </div>
            <form id="user-search-form" class="main-search" role="form">

            <p class="TheUniversity">What University?</p>
                <span class="UserIcon"> <!-- input-group-addon --> 
                    <i class="icon-user"><!--geolocation--></i>
                </span>
            <div class="SelectUniversity StudentSelectBox">
                <select class="SelectUniversityBox form-control" name="university" data-live-search="true" id="SelectUniversityB">
                    <option value="">Select University</option>
                    <?php echo $Universities; ?>                    
       
                </select>
                
                
            </div>
            <div class="FormColum2">
                <p class="TheFocus">What’s your focus?</p>
                    <span class="KeyIcon"> <!-- input-group-addon --> 
                        <i class="icon-key"><!--geolocation--></i>
                    </span>
                <div class="SelectFocus">
                    <select class="SelectFocusBox form-control" name="focus" id="type">
                        <option value="">Select Focus</option> Commitment
                        <option  value="Bottle" data-content="<i class='icon-bottle dopbownicons' aria-hidden='true'></i> Bottle"></option>
                        <option  value="Bag" data-content="<i class='icon-bag dopbownicons' aria-hidden='true'></i> Bag"></option>
                        <option  value="Straw" data-content="<i class='icon-glass2 dopbownicons' aria-hidden='true'></i> Straw"></option>
                        <option  value="Foodware" data-content="<i class='icon-dinner dopbownicons' aria-hidden='true'></i> Foodware"></option>
                        <option  value="" title="I don't have one" data-content="<i class='icon-prohibited dopbownicons' aria-hidden='true'></i> I don't have one"></option>
                    </select>
                </div>
            </div>

            <div class="FormLastOption">
                <p class="TheCommitment">Commitment Type</p>
                        <span class="ClockIcon"> <!-- input-group-addon --> 
                            <i class="icon-clock3"><!--geolocation--></i>
                        </span>
                    <div class="SelectCommitment">
                        <select class="SelectCommitmentBox form-control" name="type" id="type">
                            <option value="">Choose Commitment Type</option>
                            <option value="Short-term project">Short-term project</option>
                            <option value="Long-term project">Long-term project</option>
                            <option value="Internship-seeking">Internship-seeking</option>
                            <option value="Volunteer-seeking">Volunteer-seeking</option>
                        </select>
                    </div>         
            </div>
            
                <div class="StudentSearchButton">
                    <button class="FormSearchButton" type="submit"><p>Search</p></button>
                </div>   </form>
    </div>  
</div> 
</div>