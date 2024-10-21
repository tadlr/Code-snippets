<?php //Load Organizers to map

 if ( is_user_logged_in() ) {
     
$args = array( 'role' => 'organizer', 'fields' => 'ID');  
$user_query = new  WP_User_Query( $args );
$member_ID = 1; 
$RequiredRole = "organizer";
$TypeIcon = "icon-user";           
$SiteURL = "http://synchronizehub.com/";
$BottleIcon =" icon-bottle";
$BagIcon = "icon-bag";
$StrawIcon = "icon-glass2";
$Foodware = "icon-dinner";
$ResultadosFinales = '';            
            
        if ( !empty ($user_query->get_results()) ){
            foreach ($user_query->get_results() as $user) { $member_ID = $user;
                //echo ($user.'<br/>');
                    
                    um_fetch_user($member_ID);
                    
                    if (um_profile('business-address') != '' && um_user('Seeking') == 'Volunteers') {
                        
                    $Field_ID = ('{ "id":'.$member_ID.',');
                    $Field_category = '"category": "'.um_user('role').'",';
                    $Field_title = '"title": "'.esc_attr(um_user('display_name')).'",';
                    $Field_university = '"university": "'.um_profile('business-name').'",';                                       
                    $Field_location = '"location": "'.um_profile('business-address').'",';
                    $Field_UsrSearchCategory = '"UsrSearchCategory": "'.um_user('role').'",';
                    $Field_MapIcon = '"MapIcon": "'.$TypeIcon.'",';                                       
                    $UserAddress = um_profile('business-address');                                  
                        $prepAddr = str_replace(' ','+',$UserAddress);                                     
                        $geocode=file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address='.$prepAddr.'&key=AIzaSyDhjbEGPnK5HcDRoKSU0gVzPK40rFlejlk');
                        $output= json_decode($geocode);
                        $Userlatitude = $output->results[0]->geometry->location->lat;
                        $UserLongitude = $output->results[0]->geometry->location->lng;
                         while(($Userlatitude == '') || ($UserLongitude == '')) {
                            $UserAddress = um_profile('business-address');                                  
                                $prepAddr = str_replace(' ','+',$UserAddress);                                     
                                $geocode=file_get_contents('https://maps.googleapis.com/maps/api/geocode/json?address='.$prepAddr.'&key=AIzaSyDhjbEGPnK5HcDRoKSU0gVzPK40rFlejlk');
                                $output= json_decode($geocode);
                                $Userlatitude = $output->results[0]->geometry->location->lat;
                                $UserLongitude = $output->results[0]->geometry->location->lng; 
                         }                                                   
                    $Field_latitude = '"latitude": '.$Userlatitude.',';
                    $Field_longitude = '"longitude": '.$UserLongitude.',';
                    $Field_url = '"url": "'.$SiteURL.'profile/'.$member_ID.'",';
                    $Field_type = '"type": "'.um_user('Seeking').'",';
                    
                    if (um_user('Focus') == "Bottle") {
                            $Field_type_icon = '"type_icon": "'.$BottleIcon.'",';
                        } else if (um_user('Focus') == "Bag") {
                            $Field_type_icon = '"type_icon": "'.$BagIcon.'",'; 
                        } else if (um_user('Focus') == "Straw") {
                            $Field_type_icon = '"type_icon": "'.$StrawIcon.'",';
                        } else if (um_user('Focus') == "Foodware") {
                            $Field_type_icon = '"type_icon": "'.$Foodware.'",';
                        } else { $Field_type_icon = '"type_icon": "",'; }
                    
                    $Field_gallery = '"gallery": [ ';
                   $Field_gallery1 = '"'.$SiteURL.'wp-content/uploads/ultimatemember/'.$member_ID.'/'.um_profile('ProfilePic').'",';
                    $Field_gallery2 = '"'.$SiteURL.'wp-content/uploads/ultimatemember/'.$member_ID.'/'.um_profile('ProfilePic').'",';
                    $Field_gallery3 = '"'.$SiteURL.'wp-content/uploads/ultimatemember/'.$member_ID.'/'.um_profile('ProfilePic').'"';
                    $Field_closing1 = ' ] ';
                    $Field_closing2 = ' }, ';
                    
                    
                                                           
                    $ResultadosFinales .=$Field_ID.$Field_category.$Field_title.$Field_university.$Field_location.$Field_UsrSearchCategory.$Field_MapIcon.$Field_latitude.$Field_longitude.$Field_url.$Field_type.$Field_type_icon.$Field_gallery.$Field_gallery1.$Field_gallery2.$Field_gallery3.$Field_closing1.$Field_closing2.$Field_closing_final;

                    }                              
            }
            //echo ('<strong>Developer Notes</strong><hr>');
            //echo ('{ "data": [ '.$ResultadosFinales.'{ "gallery": ["#"] } ] }');
            
            $fileLocation = getenv("DOCUMENT_ROOT") . "/wp-content/themes/genesis-sample/assets/json/organizers/organizer-volunteers.json";
            $file = fopen($fileLocation,"w");
            $content = ('{ "data": [ '.$ResultadosFinales.'{ "gallery": ["#"] } ] }');
            fwrite($file,$content);
            fclose($file);
            }
 } ?>