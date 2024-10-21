jQuery(document).ready(function($) {
   $('.survey-action.submit').on('click', function(){
      var survey_id = $(this).data('survey-id');
      var full_submission = [];
      var user_selections = [];

      if($('.question.current').find('input:checked').length) {
         $('.error-msg').removeClass('show');

         $('.survey-questions').find('.question').each(function(){
            var selection = {
               question : $(this).find('.question-title').text(),
               choices : [],
            };

            var selectedChoices = $(this).find('input:checked');
            selectedChoices.each(function(){
               //console.log($(this).val());
               selection.choices.push($(this).val());
            });

            full_submission.push(selection);

            if($(this).hasClass('question-confirmation')) {
               if($(this).hasClass('multiple')) {
                  var multipleChoices = [];
                  $(this).find('input:checked').each(function(){
                     multipleChoices.push($(this).val());
                  });
                  user_selections.push(multipleChoices);
               } else {
                  $(this).find('input:checked').each(function(){
                     user_selections.push($(this).val());
                  });
               }
            }
         });

         /*
         $('.question.question-confirmation').find('.choice').each(function(){
            var input = $(this).find('input');
            if(input.is(':checked')){
               if($(this).hasClass('multiple')) {

               } else {
                  user_selections.push(input.val());
               }
            }
         });
         */

         //console.log(full_submission);
         //console.log(user_selections);

         if(user_selections.length > 0) {
            $.ajax({
               url : '/wp-content/themes/custom_theme/partials/survey-submit.php', // surveySubmitAjax.ajaxurl
               type : 'post',
               dataType : 'html',
               data : {
                  survey_id : survey_id,
                  user_selections : user_selections,
                  full_submission : full_submission
               },
               success : function( response ) {
                  console.log(response);
                  $('.survey-questions, .survey-footer').addClass('d-none');
                  $('.survey-reset').removeClass('d-none');
                  $('.survey-result').append(response);
                  $([document.documentElement, document.body]).animate({
                     scrollTop: $('.survey-wrap').offset().top - 250
                   }, 300, 'linear');
               }
            });
         }
         return false;
      } else {
         $('.error-msg').addClass('show');
      }
   });
});