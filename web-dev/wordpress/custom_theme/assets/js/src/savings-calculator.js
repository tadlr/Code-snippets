import { anchorScroll } from './theme/utils/smoothScroll';

$(function () {
  // Savings Calculator page
  if (
    $('body').hasClass('page-id-2667') ||
    $('body').hasClass('page-id-30218')
  ) {
    $('#header .savings-calc-btn')
      .addClass('anchor-link')
      .removeClass('callback-popup-btn')
      .attr('href', '#calculator')
      .attr('data-scroll-section-target-id', 'calculator');

    anchorScroll();

    $('#header .savings-calc-btn').on('click', function (e) {
      if ($('html').hasClass('mobile-menu-opened')) {
        $('.mobile-menu-btn').trigger('click');
      }
    });

    var analysisSection = setInterval(function () {
      $('#free-statement-analysis').attr(
        'data-link-scroll-target-section-id',
        'analysis',
      );
      clearInterval(analysisSection);
    }, 100);
  }

  $('.calculate-values-btn').on('click', function (event) {
    $('.btn-sc-next-step').addClass('show');
  });

  // calculator formula override (TEMP UNTIL HARRY UPDATES HIS WEBPACK)
  $('.calculate-values-btn').on('click', function () {
    var monthlyProcessing = $('[name=monthly_processing_volume]');
    var monthlyFees = $('[name=monthly_fees]');

    if (monthlyProcessing.val() != '' && monthlyFees.val() != '') {
      // current processing rate
      var rate = (monthlyFees.val() / monthlyProcessing.val()) * 100;

      // get monthly and yearly savings
      var monthlySavings = monthlyFees.val() * 0.1;

      var rateNew =
        ((monthlyFees.val() - monthlySavings) / monthlyProcessing.val()) * 100;

      var updateRate = setInterval(function () {
        if ($('.old-effective-rate .info-row-name-value').length) {
          //$('.old-effective-rate .info-row-name-value').attr('title', rate.toFixed(2));
          $('.old-effective-rate .info-row-name-value').html(
            rate.toFixed(2) + '%',
          );
        }
        setTimeout(clearInterval(updateRate), 5000);
      });

      var updateRateNew = setInterval(function () {
        if ($('.new-effective-rate .info-row-name-value').length) {
          //$('.new-effective-rate .info-row-name-value').attr('title', rateNew.toFixed(2));
          $('.new-effective-rate .info-row-name-value').html(
            rateNew.toFixed(2) + '%',
          );
        }
        setTimeout(clearInterval(updateRateNew), 5000);
      });
    }
  });

  // calculator inputs override (TEMP UNTIL HARRY UPDATES HIS WEBPACK)
  setInterval(function () {
    if ($('.calc-chosen-val-wrap .js-calc-selected-value-el').length) {
      $('.calc-chosen-val-wrap .js-calc-selected-value-el').each(
        function (index) {
          if ($(this).attr('title').indexOf('Select') < 0) {
            $(this).html($(this).attr('title'));
          }
        },
      );
    }
  }, 10);
});
