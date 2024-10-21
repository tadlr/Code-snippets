jQuery(document).ready(function($) {

   // phone number formatter
   let formatPhoneNumber = (str) => {
      //Filter only numbers from the input
      let cleaned = ('' + str).replace(/\D/g, '');

      //Check if the input is of correct length
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

      if (match) {
         return '(' + match[1] + ') ' + match[2] + '-' + match[3]
      };

      return null
   };

   // dynamic TF numbers swap based on utm_campaign/hubspot campaign
   if($('body').hasClass('single-landings')) {

      let pageLang = $('html').prop('lang');
      let urlParams = new URLSearchParams(window.location.search); //get all parameters
      var utm_campaign = '';
      var hsa_cam = '';
      var utm_medium = decodeURIComponent(urlParams.get('utm_medium'));

      // get utm_campaign parameter value
      if(urlParams.get('utm_campaign') && urlParams.get('utm_campaign') != '') {
         var utm_campaign = decodeURIComponent(urlParams.get('utm_campaign'));
      }
      // get hubspot campaign parameter value
      if(urlParams.get('hsa_cam') && urlParams.get('hsa_cam') != '') {
         var hsa_cam = decodeURIComponent(urlParams.get('hsa_cam'));
      }

      //console.log(utm_campaign);
      //console.log(hsa_cam);

      if(utm_campaign != '' || hsa_cam != '') {
         $.ajax({
            url : '/wp-content/themes/custom_theme/partials/tf-numbers.php',
            type : 'post',
            dataType : 'html',
            data : {
               language : pageLang,
               utm_campaign : utm_campaign,
               hsa_cam : hsa_cam,
               utm_medium : utm_medium,
            },
            success : function( response ) {
               console.log(response);

               $('a').each(function(index){
                  if($(this).attr('href').includes('tel:')) {
                     var newTel = response;
                     $(this).attr('href', 'tel:' + newTel);

                     // don't update text of Talk to us now button or mobile sticky call button
                     //contact-section-btn $(this).text().includes('Talk')
                     if(!$(this).hasClass('contact-section-btn') && !$(this).parent('.landing-sticky-block').length) {
                        $(this).text(formatPhoneNumber(newTel));
                     }
                  }
               });
            }
         });
      }
   }
});