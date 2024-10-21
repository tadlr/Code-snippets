jQuery(document).ready(function($) {

   // on contact pages load if the field is autofilled and hidden
   $('#tabs a').on('click', function(){
      if($('.hbspt-form.phone-validate input[name=phone]').val() != ''){
         $('.hbspt-form.phone-validate input[name=phone]').focus();
      }
   });

   const hubspotSubmitButtonClick = setInterval(function(){
      if($('button.hs-button[type=submit]').length && $('input[name=phone]').length){

         console.log('theres a hubspot form and there is a phone number input');

         $('input[name=phone]').parents('.hbspt-form').addClass('phone-validate');
         $('.hbspt-form.phone-validate button.hs-button[type=submit]').attr('disabled', 'disabled');

         var errorMessage = '';
         if($('html').attr('lang') == 'fr-CA'){
            errorMessage = 'Veuillez entrer un numéro de téléphone US/CA valide pour remplir le formulaire.';
         }else if($('html').attr('lang') == 'es-US') {
            errorMessage = 'Ingrese un número de teléfono válido de US/CA para completar el formulario.';
         } else {
            errorMessage = 'Please enter a valid US or CA phone number to complete the form.';
         }
         var error = '<div class="phone-number-error hs-form-field submit-error"><ul class="no-list hs-error-msgs inputs-list" role="list"><li role="listitem"><label class="hs-error-msg hs-main-font-element c-green-1">'+errorMessage+'</label></li></ul></div>';
         $('.phone-validate .hs_submit').append(error);

         // on page load if the field is autofilled
         if($('.hbspt-form.phone-validate input[name=phone]').val() != ''){
            $('.hbspt-form.phone-validate input[name=phone]').focus();
         }

         // check the input's value
         $('.hbspt-form.phone-validate input[name=phone]').on('change input blur', function(){
            var $this = $(this);
            $this.parent().append('<div class="loader white"></div>');

            // remove expected non numerical phone number characters
            var phone = $this.val().replace(/-/g, '').replace('(', '').replace(')', '');

            // check for test numbers
            if(phone != '5555555551' && phone != '5555555552' && phone != '5555555553' && phone != '5555555554') {
               // add country code if not entered
               if(phone.length == 10) {
                  phone = '1' + phone;
               }

               // lookup full 11 digit phone number
               if(phone.length == 11) {
                  $.ajax({
                     url : '/wp-content/themes/custom_theme/partials/phone-number-check.php',
                     type : 'post',
                     dataType : 'html',
                     data : {
                        phone: phone
                     },
                     success : function( response ) {
                        $('.loader').remove();

                        // if US or Canadian number allow submit
                        if(response == 'US' || response == 'CA'){
                           $('.hbspt-form.phone-validate button.hs-button[type=submit]').removeAttr('disabled');
                           $('.hs-form-field.submit-error').remove();
                        } else {
                           $('.hbspt-form.phone-validate button.hs-button[type=submit]').attr('disabled', 'disabled');
                           if(!$('.phone-number-error').length){
                              $('.phone-validate .hs_submit').append(error);
                           }
                        }
                     }
                  });
               } else {
                  $('.loader').remove();
                  $('.hbspt-form.phone-validate button.hs-button[type=submit]').attr('disabled', 'disabled');
                  if(!$('.phone-number-error').length){
                     $('.phone-validate .hs_submit').append(error);
                  }
               }
            } else {
               $('.loader').remove();
               $('.hbspt-form.phone-validate button.hs-button[type=submit]').removeAttr('disabled');
               $('.hs-form-field.submit-error').remove();
            }
         });
         clearInterval(hubspotSubmitButtonClick);
      }
   }, 500);

});