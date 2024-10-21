jQuery(document).ready(function($) {

   if($('body').hasClass('single-landings')) {
      var classList = $('body').attr('class').split(/\s+/);
      var pageIdClass = '';
      var post_id;

      $.each(classList, function(index, item) {
         if(item.includes('postid-')) {
            pageIdClass = item;
         }
      });

      if(pageIdClass != '') {
         var classArry = pageIdClass.split('-');
         post_id = classArry[1];
      }

      console.log(post_id);

      $.ajax({
         url : 'https://wordpress-dev-appsvc.azurewebsites.net/wp-content/themes/custom_theme/partials/load-blocks-ajax.php',
         type : 'post',
         dataType : 'html',
         data : {
            post_id : post_id
         },
         beforeSend : function() {
            $('.landing-page-wrap').append('<div class="loader-wrap"><div class="sk-loader"></div></div>');
         },
         success : function( response ) {
            $('.loader-wrap').remove();
            console.log(response);
            $('.landing-page-wrap').append(response);

            // Reveal content
            setInterval(function () {
               if($('img').hasClass('b-lazy')) {
                  $('img').removeClass('b-lazy');
               }

               if($('.content-block, .media-, .txt-content, .container').hasClass('op-0')) {
                  $('.content-block, .media-, .txt-content, .container').removeClass('op-0');
               }
            }, 500);

            // Load images
            $('div.bg-image').each(function(){
               $(this).css({
                  'background-image': 'url(' + $(this).data('src') + ')',
                  'opacity': '1'
               });
            });
            $('img').each(function(){
               if($(this).attr('data-src') !== undefined && ($(this).attr('data-src').includes('svg') || $(this).attr('data-src').includes('webp'))) {
                 $(this).prop('src', $(this).attr('data-src'));
               }
            });

            // Load forms
            $('script').each(function(index){
               if($(this).html().indexOf('hbspt.forms.create') != -1) {
                  if($(this).parents('.right-content-form').length == 0 && $(this).parents('.popup-form').length == 0 && $(this).parents('.talk-to-us-block-popup-form').length == 0 ) {
                     if($('head').find('.hbspt-form').length) {
                        $('head').find('.hbspt-form').appendTo($(this).parent());
                        $(this).remove();
                     }
                     /*
                        var scriptForm = document.createElement("script");
                        scriptForm.innerHTML = $(this).html();
                        scriptForm.id = 'reloaded_script_' + index;
                        $(this).parent().append(scriptForm);
                     */
                  }
               }
            });

            $('body:not(.sk-lander--16415) .inner-pages-contact-section').css('padding-top', '0');
            $('body:not(.sk-lander--16415) .inner-pages-contact-section .bg-image').css('z-index', '3');
         },
         error: function(xhr, ajaxOptions, thrownError)
         {
            console.log(xhr);
            console.log(ajaxOptions);

            var httpCode = xhr.status;
            alert(httpCode + ': ' + thrownError);
         }
      });
   }
});