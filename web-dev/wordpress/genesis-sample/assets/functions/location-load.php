<?php //Load Students to map

 if ( is_user_logged_in() ) {

$args = array( 'role' => 'student-user', 'fields' => 'ID');  
$user_query = new  WP_User_Query( $args );
$member_ID = 1; 
$RequiredRole = "student-user";
$TypeIcon = "icon-graduation-hat";           
$SiteURL = "/";
$BottleIcon =" icon-bottle";
$BagIcon = "icon-bag";
$StrawIcon = "icon-glass2";
$Foodware = "icon-dinner";
$ResultadosFinales = '';            
            
        if ( !empty ($user_query->get_results()) ){
            foreach ($user_query->get_results() as $user) { $member_ID = $user;
                //echo ($user.'<br/>');
                    
                    if (um_profile('Current-Address') != '') {

                        um_fetch_user($member_ID);

                        $UserAddress = um_user('Current-Address');                                  
                        $prepAddr = str_replace(' ','+',$UserAddress);                                     
                        $geocode=file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address='.$prepAddr.'&key=AIzaSyDhjbEGPnK5HcDRoKSU0gVzPK40rFlejlk');
                        $output= json_decode($geocode);
                        $Userlatitude = $output->results[0]->geometry->location->lat; 
                        $UserLongitude = $output->results[0]->geometry->location->lng;
                        $UserPlaceID = $output->results[0]->place_id;
                         while(($Userlatitude == '') || ($UserLongitude == '')) {
                            $UserAddress = um_user('Current-Address');                                  
                                $prepAddr = str_replace(' ','+',$UserAddress);                                     
                                $geocode=file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address='.$prepAddr.'&key=AIzaSyDhjbEGPnK5HcDRoKSU0gVzPK40rFlejlk');
                                $output= json_decode($geocode);
                                $Userlatitude = $output->results[0]->geometry->location->lat;
                                $UserLongitude = $output->results[0]->geometry->location->lng;
                                $UserPlaceID = $output->results[0]->place_id;
                         }    
                    
                    
                    
                    $Location_ID = ('{');
                    $Location_address = '"location": "'.um_user('Current-Address').'",';                                                 
                    $Location_latitude = '"latitude": '.$Userlatitude.',';
                    $Location_longitude = '"longitude": '.$UserLongitude.','; 
                    $Location_placeID = '"placeid": '.$UserPlaceID.',';
                    $Location_closing1 = ' ] ';
                    $Location_closing2 = ' }, '; 
                                                           
                    $UsersLocations .=$Location_ID.$Location_address.$Location_latitude.$Location_longitude.$Location_placeID.$Location_closing1.$Location_closing2;

            
                     }
            }
            
            

 } ?>