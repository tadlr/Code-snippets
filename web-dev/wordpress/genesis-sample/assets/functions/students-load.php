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

                        
                        

                    //Get USER LAT, LOG and Place ID
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

                        $UserAddress = um_user('Current-Address');                                  
                        $prepAddr = str_replace(' ','+',$UserAddress); 
                        $map_api_url = "https://maps.googleapis.com/maps/api/geocode/json?address=".$prepAddr."&key=AIzaSyDhjbEGPnK5HcDRoKSU0gVzPK40rFlejlk";
                        $resp_json = file_get_contents($map_api_url);
                        $resp = json_decode($resp_json, true);
                        
                        foreach($resp['results'][0]['address_components'] as $address_componenets) {
                                if($address_componenets["types"][0]=="country") {
                                    $country = $address_componenets["long_name"];
                                }
                                if($address_componenets["types"][0]=="administrative_area_level_1") {
                                    $state = $address_componenets["short_name"];
                                }   
                                if($address_componenets["types"][0]=="locality") {
                                    $city = $address_componenets["long_name"];
                                }   
                            }
                        
                    //Generate USER Json
                        $Field_ID = ('{ "id":'.$member_ID.',');
                        $Field_category = '"category": "'.um_user('role').'",';
                        $Field_title = '"title": "'.esc_attr(um_user('display_name')).'",';
                        $Field_university = '"university": "'.um_user('University-Name').'",';                                       
                        $Field_location = '"location": "'./*um_user('location')*/$city.', '.$state.', '.$country.'",';
                        $Field_city = '"address": "'.um_user('Current-Address').'",';
                        $Field_UsrSearchCategory = '"UsrSearchCategory": "'.um_user('role').'",';
                        $Field_MapIcon = '"MapIcon": "'.$TypeIcon.'",';                                                      
                        $Field_latitude = '"latitude": '.$Userlatitude.',';
                        $Field_longitude = '"longitude": '.$UserLongitude.',';
                        $Field_url = '"url": "'.$SiteURL.'profile/'.$member_ID.'",';
                        $Field_type = '"type": "'.um_user('Commitment-Type').'",';
                        $Focus = '"focus": "'.um_user('Focus').'",';

                        if (um_user('Focus') == "Bottle") {
                                $Field_type_icon = '"type_icon": "'.$BottleIcon.'",';
                            } else if (um_user('Focus') == "Bag") {
                                $Field_type_icon = '"type_icon": "'.$BagIcon.'",'; 
                            } else if (um_user('Focus') == "Straw") {
                                $Field_type_icon = '"type_icon": "'.$StrawIcon.'",';
                            } else if (um_user('Focus') == "Foodware") {
                                $Field_type_icon = '"type_icon": "'.$Foodware.'",';
                            } else { $Field_type_icon = '"type_icon": "",'; }

                        if (um_profile('ProfilePic') != ''){
                            $Field_gallery = '"gallery": [ ';
                            //$Field_gallery1 = '"'.$SiteURL.'wp-content/uploads/ultimatemember/'.$member_ID.'/'.um_profile('ProfilePic').'",';
                            //$Field_gallery2 = '"'.$SiteURL.'wp-content/uploads/ultimatemember/'.$member_ID.'/'.um_profile('ProfilePic').'",';
                            $Field_gallery3 = '"'.$SiteURL.'wp-content/uploads/ultimatemember/'.$member_ID.'/'.um_profile('ProfilePic').'"';
                            } else {

                            $Field_gallery = '"gallery": [ ';
                            //$Field_gallery1 = '"'.$SiteURL.'wp-content/uploads/ultimatemember/'.$member_ID.'/'.um_profile('ProfilePic').'",';
                            //$Field_gallery2 = '"'.$SiteURL.'wp-content/uploads/ultimatemember/'.$member_ID.'/'.um_profile('ProfilePic').'",';
                            $Field_gallery3 = '"'.$SiteURL.'wp-content/themes/genesis-sample/assets/img/member-1.jpg"';
                        }
                        $Field_closing1 = ' ] ';
                        $Field_closing2 = ' }, ';

                                
                        $ResultadosFinales .=$Field_ID.$Field_category.$Field_title.$Field_university.$Field_location.$Field_city.$Field_UsrSearchCategory.$Field_MapIcon.$Field_latitude.$Field_longitude.$Field_url.$Field_type.$Focus.$Field_type_icon.$Field_gallery./*$Field_gallery1.$Field_gallery2.*/$Field_gallery3.$Field_closing1.$Field_closing2.$Field_closing_final;

                    //Generate USER Location Json
                        $Location_ID = ('{');
                        $Location_address = '"location": "'.um_user('Current-Address').'",';                                                 
                        $Location_latitude = '"latitude": '.$Userlatitude.',';
                        $Location_longitude = '"longitude": '.$UserLongitude.','; 
                        $Location_placeID = '"placeid": '.$UserPlaceID.',';
                        $Location_closing1 = ' ] ';
                        $Location_closing2 = ' }, '; 

                        $UsersLocations .=$Location_ID.$Location_address.$Location_latitude.$Location_longitude.$Location_placeID.$Location_closing1.$Location_closing2;
                        
                        $UserUserUSer .= $Field_location;
                     }
            }
            
            //echo ('{ "data": [ '.$ResultadosFinales.'{ "gallery": ["#"] } ] }<br/><hr><br/>');
            //echo ('{ "data": [ '.$UsersLocations.'{ } ] }');
            //echo $UserUserUSer;
            
            if ($ResultadosFinales != '') {
                $fileLocation = getenv("DOCUMENT_ROOT") . "/wp-content/themes/genesis-sample/assets/json/student.json";
                $file = fopen($fileLocation,"w");
                $content = ('{ "data": [ '.$ResultadosFinales.'{ "gallery": ["#"] } ] }');
                fwrite($file,$content);
                fclose($file); 
                }

            
            if ($UsersLocations != '') {
                $fileLocation = getenv("DOCUMENT_ROOT") . "/wp-content/themes/genesis-sample/assets/json/student-location.json";
                $file = fopen($fileLocation,"w");
                $content = ('{ "data": [ '.$UsersLocations.'{ } ] }');
                fwrite($file,$content);
                fclose($file); 
                }




            }
            

 } ?>