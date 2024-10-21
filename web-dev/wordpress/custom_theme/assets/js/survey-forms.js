jQuery(document).ready(function ($) {
  // Choice selection
  $('.choice label').on('click', function () {
    $this = $(this);
    console.log($this.siblings('input').prop('checked'));
    console.log($this.siblings('input').data());

    if ($this.siblings('input').prop('checked') == true) {
      console.log('the input is checked');
      $this
        .siblings('input[type=radio], input[type=checkbox]')
        .prop('checked', false);
      $this.siblings('input').data('radio_checked', 'false');
    } else {
      $this
        .siblings('input[type=radio], input[type=checkbox]')
        .prop('checked', true);
      $this.siblings('input').data('radio_checked', 'true');
    }

    //$('input[type=checkbox], input[type=radio]').prop('checked', false);
    //if($(this).siblings('input').is(':checked') == true)
  });

  /*
    setInterval(function(){
        if($('input').data('radio_checked') == 'false') {
            $('input[data-radio_checked=false]').prop('checked', false);
        }
        if($('input').prop('data-radio_checked') == 'false') {
            $('input[data-radio_checked=false]').prop('checked', false);
        }
    }, 500);
    */

  // Buttons
  $('.survey-action').on('click', function () {
    // Next Button
    if ($(this).hasClass('next')) {
      $('.survey-questions')
        .find('.question')
        .each(function (index) {
          if ($(this).hasClass('current')) {
            if ($(this).find('input:checked').length) {
              // scroll to top of survey
              $('html, body').animate(
                {
                  scrollTop: $('.survey-wrap').offset().top - 200,
                },
                500,
              );

              // hide error messages
              $('.survey-footer .error-msg').removeClass('show');

              // update steps
              var stepCurrent = parseInt($('.step-current').text()) + 1;
              var stepFinal = parseInt($('.step-final').text());
              $('.step-current').html(stepCurrent);

              if (stepCurrent == stepFinal) {
                $('.survey-action.next').addClass('d-none');
                $('.survey-action.submit').removeClass('d-none');
              }

              // equipment page survey
              if (
                $('body').hasClass('page-id-582') ||
                $('body').hasClass('page-id-30214')
              ) {
                // if user selects e-commerce or other
                if (
                  ($(this).find('input:checked').length == 1 &&
                    $(this).find('input:checked').val() ==
                      'Online / eCommerce') ||
                  $(this).find('input:checked').val() == 'Other'
                ) {
                  $('.survey-action.next').addClass('d-none');
                  $('.survey-action.submit').removeClass('d-none');
                  $('.step-final').html('2');
                }

                // if user selects retail
                if (
                  $(this).find('input:checked').length == 1 &&
                  $(this).find('input:checked').val() == 'Retail'
                ) {
                  $('.survey-questions .question:nth-of-type(2)').addClass(
                    'question-confirmation',
                  );
                  $('.survey-questions .question:nth-of-type(3)').removeClass(
                    'question-confirmation',
                  );
                }

                // if user selects anything but restaurant, e-commerce, other
                if (
                  $('.survey-questions').find('input:checked').length > 1 &&
                  $('.survey-questions .question:first-of-type')
                    .find('input:checked')
                    .val() != 'Online / eCommerce' &&
                  $('.survey-questions .question:first-of-type')
                    .find('input:checked')
                    .val() != 'Other' &&
                  $('.survey-questions .question:first-of-type')
                    .find('input:checked')
                    .val() != 'Restaurant'
                ) {
                  $('.survey-action.next').addClass('d-none');
                  $('.survey-action.submit').removeClass('d-none');
                  $('.step-final').html('3');
                }
              }

              if ($(this).next().hasClass('question-dynamic')) {
                if (
                  $(this).find('input[data-dynamic-choice=true]').is(':checked')
                ) {
                  $('.step-final').html(parseInt($('.step-final').text()) + 1);
                  $(this).next().addClass('current');
                  $(this).removeClass('current');

                  if ($(this).next().hasClass('question-vary')) {
                    $('.vary-question').removeClass('current');
                    $(this)
                      .next()
                      .find(
                        "[data-prev-choice='" +
                          $(this).find('input:checked').val() +
                          "']",
                      )
                      .addClass('current');
                  }
                } else {
                  $('.question.question-dynamic')
                    .find('input')
                    .each(function () {
                      $(this).prop('checked', false);
                    });

                  $(this).next().next().addClass('current');
                  $(this).removeClass('current');
                  $('.step-final').html($('.step-final').data('count-initial'));

                  if ($(this).next().next().hasClass('question-vary')) {
                    $('.vary-question').removeClass('current');
                    $(this)
                      .next()
                      .next()
                      .find(
                        "[data-prev-choice='" +
                          $(this).find('input:checked').val() +
                          "']",
                      )
                      .addClass('current');
                  }
                }
              } else {
                $(this).next().addClass('current');
                $(this).removeClass('current');

                // variable question multiple selections
                if ($(this).next().hasClass('question-vary')) {
                  if (
                    $(this).next().find('[data-mulitple-prev-choices=yes]')
                      .length
                  ) {
                    //console.log('next options that allow multiple previous choices= ' + $(this).next().find('[data-mulitple-prev-choices=yes]').length);
                    //console.log('inputs checked= ' + $(this).find('input:checked').length);

                    var numberOfMultipleChoices = $(this)
                      .next()
                      .find('[data-mulitple-prev-choices=yes]').length;
                    var multipleQuestionChoices = $(this)
                      .next()
                      .find('[data-mulitple-prev-choices=yes]');

                    // if more than one option is selected
                    if ($(this).find('input:checked').length > 1) {
                      //console.log('more than one input checked');

                      $(this)
                        .find('input:checked')
                        .each(function (index) {
                          var checkedValue = $(this).val();

                          // if there are more than one option that can be triggered by multiple previous choices
                          if (numberOfMultipleChoices > 1) {
                            //console.log('multiple previous choices are allowed');

                            multipleQuestionChoices.each(function (index) {
                              var multipleChoices = $(this).data('prev-choice');

                              //console.log(multipleChoices);
                              //console.log($.inArray(checkedValue, multipleChoices));

                              // check if input value is in array
                              if (
                                $.inArray(checkedValue, multipleChoices) != -1
                              ) {
                                $(this).addClass('current');
                                return;
                              }
                            });
                          } else if (numberOfMultipleChoices == 1) {
                            var multipleChoices =
                              multipleQuestionChoices.data('prev-choice');

                            //console.log(multipleChoices);
                            //console.log($.inArray(checkedValue, multipleChoices));

                            // check if input value is in array
                            if (
                              $.inArray(checkedValue, multipleChoices) != -1
                            ) {
                              multipleQuestionChoices.addClass('current');
                              return;
                            }
                          }
                        });

                      // only one option is selected
                    } else {
                      //console.log('ONLY one input checked');

                      var checkedValue = $(this).find('input:checked').val();

                      // if there are more than one option that can be triggered by multiple previous choices
                      if (numberOfMultipleChoices > 1) {
                        multipleQuestionChoices.each(function (index) {
                          var multipleChoices = $(this).data('prev-choice');

                          //console.log(multipleChoices);
                          //console.log($.inArray(checkedValue, multipleChoices));

                          // check if input value is in array
                          if ($.inArray(checkedValue, multipleChoices) != -1) {
                            $(this).addClass('current');
                          }
                        });
                      } else {
                        var multipleChoices =
                          multipleQuestionChoices.data('prev-choice');

                        //console.log(multipleChoices);
                        //console.log($.inArray(checkedValue, multipleChoices));

                        // check if input value is in array
                        if ($.inArray(checkedValue, multipleChoices) != -1) {
                          $(this).addClass('current');
                        }
                      }
                    }
                  } else {
                    $('.vary-question').removeClass('current');
                    $(this)
                      .next()
                      .find(
                        "[data-prev-choice='" +
                          $(this).find('input:checked').val() +
                          "']",
                      )
                      .addClass('current');
                  }
                }
              }

              if ($('.survey-action.prev').hasClass('d-none')) {
                $('.survey-action.prev').removeClass('d-none');
              }

              return false;
            } else {
              $('.survey-footer .error-msg').addClass('show');
              return false;
            }
          }
        });
    }

    // Previous Button
    if ($(this).hasClass('prev')) {
      var stepCurrent = parseInt($('.step-current').text()) - 1;
      var stepFinal = parseInt($('.step-final').text());
      $('.step-current').html(stepCurrent);

      $('.survey-questions')
        .find('.question')
        .each(function (index) {
          if ($(this).hasClass('current')) {
            // check for dynamic questions
            if ($(this).prev().hasClass('question-dynamic')) {
              if (
                $(this)
                  .prev()
                  .prev()
                  .find('input[data-dynamic-choice=true]')
                  .is(':checked')
              ) {
                $(this).prev().addClass('current');
                $(this).removeClass('current');
              } else {
                $(this).prev().prev().addClass('current');
                $(this).removeClass('current');
              }
            } else {
              $(this).prev().addClass('current');
              $(this).removeClass('current');
            }

            if ($(this).find('.vary-question').length) {
              $(this).find('.vary-question').removeClass('current');
            }

            $(this).find('input[type=checkbox]').prop('checked', false);
            $(this).find('input[type=radio]').prop('checked', false);

            return false;
          }
        });

      if (stepCurrent == 1) {
        $('.survey-action.prev').addClass('d-none');
      }

      if (stepCurrent < stepFinal) {
        $('.survey-action.next').removeClass('d-none');
        $('.survey-action.submit').addClass('d-none');
      }

      if (!$('.survey-action.submit').hasClass('d-none')) {
        $('.survey-action.submit').addClass('d-none');
      }

      if (
        $('body').hasClass('page-id-582') &&
        $('.survey-questions').find('input:checked').length == 1
      ) {
        $('.step-final').html('5');
        $('.survey-questions .question:nth-of-type(2)').removeClass(
          'question-confirmation',
        );
        $('.survey-questions .question:nth-of-type(3)').addClass(
          'question-confirmation',
        );
      }

      if (
        $('body').hasClass('page-id-30214') &&
        $('.survey-questions').find('input:checked').length == 1
      ) {
        $('.step-final').html('5');
        $('.survey-questions .question:nth-of-type(2)').removeClass(
          'question-confirmation',
        );
        $('.survey-questions .question:nth-of-type(3)').addClass(
          'question-confirmation',
        );
      }
    }
  });

  // Reset button
  $('.survey-reset .query-button-next').on('click', function () {
    $('html, body').animate(
      {
        scrollTop: $('.survey-wrap').offset().top - 200,
      },
      250,
      'linear',
    );

    $('.survey-result').empty();
    $('.survey-reset, .survey-action').addClass('d-none');
    $('.step-current').html(1);
    $('.step-final').html($('.step-final').data('count-initial'));
    $('.survey-questions, .survey-footer, .survey-action.next').removeClass(
      'd-none',
    );
    $('.survey-questions .question').removeClass('current');
    $('.survey-questions .question:first-of-type').addClass('current');
    $('input[type=checkbox], input[type=radio]').prop('checked', false);
    $('.inner-pages-quiz-section .title-wrap').css('display', 'block');
  });
});
