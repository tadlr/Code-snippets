import 'lightslider/src/js/lightslider';

import { getUUID } from '../utils/utils';

const carouselController = () => {
  (function ($) {
    $('.quote-carousel').each((_, slider) => {
      if (!$(slider).hasClass('w-flxsd')) {
        const itemID = getUUID();

        $(slider).attr('id', itemID);

        const slideCount = $('#' + itemID + ' .slide').length;
        // console.log(slideCount);

        const TheSlider = $('#' + itemID + ' .slides').lightSlider({
          item: 1,
          autoWidth: false,
          slideMove: 1, // slidemove will be 1 if loop is true
          slideMargin: 10,

          addClass: '',
          mode: 'slide',
          useCSS: true,
          cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
          easing: 'linear', //'for jquery animation',////

          speed: 1200, //ms'
          auto: false,
          loop: slideCount > 1 ? true : false,
          slideEndAnimation: true,
          pause: 2000,

          keyPress: slideCount > 1 ? true : false,
          controls: false,
          prevHtml: '',
          nextHtml: '',

          rtl: false,
          adaptiveHeight: true,

          vertical: false,
          verticalHeight: 500,
          vThumbWidth: 100,

          thumbItem: 10,
          pager: slideCount > 1 ? true : false,
          gallery: false,
          galleryMargin: 5,
          thumbMargin: 5,
          currentPagerPosition: 'middle',

          enableTouch: slideCount > 1 ? true : false,
          enableDrag: slideCount > 1 ? true : false,
          freeMove: slideCount > 1 ? true : false,
          swipeThreshold: 40,

          responsive: [],

          onBeforeStart: function (el) {},
          onSliderLoad: function (el) {},
          onBeforeSlide: function (el) {},
          onAfterSlide: function (el) {},
          onBeforeNextSlide: function (el) {},
          onBeforePrevSlide: function (el) {},
        });

        if (slideCount > 1) {
          $(slider)
            .find('.flex-prev')
            .on('click', function (e) {
              e.preventDefault();
              TheSlider.goToPrevSlide();
            });

          $(slider)
            .find('.flex-next')
            .on('click', function (e) {
              e.preventDefault();
              TheSlider.goToNextSlide();
            });
        } else {
          $(slider).find('.slider-navigation').remove();
        }
        $(slider).addClass('w-flxsd');

        (function ($) {
          $.fn.matchHeight._update();
        })(jQuery);
      }
    });

    setTimeout(() => {
      $('.icon-carousel').each((_, slider) => {
        if (!$(slider).hasClass('w-flxsd')) {
          const itemID = getUUID();

          $(slider).attr('id', itemID);

          const TheSlider = $('#' + itemID + ' .slides').lightSlider({
            item: 3,
            autoWidth: false,
            slideMove: 1, // slidemove will be 1 if loop is true
            slideMargin: 10,

            addClass: '',
            mode: 'slide',
            useCSS: true,
            cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
            easing: 'linear', //'for jquery animation',////

            speed: 1200, //ms'
            auto: false,
            loop: true,
            slideEndAnimation: true,
            pause: 2000,

            keyPress: true,
            controls: false,
            prevHtml: '',
            nextHtml: '',

            rtl: false,
            adaptiveHeight: true,

            vertical: false,
            verticalHeight: 500,
            vThumbWidth: 100,

            thumbItem: 10,
            pager: true,
            gallery: false,
            galleryMargin: 5,
            thumbMargin: 5,
            currentPagerPosition: 'middle',

            enableTouch: true,
            enableDrag: true,
            freeMove: true,
            swipeThreshold: 40,

            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  item: 2,
                  slideMove: 1,
                  slideMargin: 6,
                },
              },
              {
                breakpoint: 1024,
                settings: {
                  item: 3,
                  slideMove: 1,
                  slideMargin: 6,
                },
              },

              {
                breakpoint: 800,
                settings: {
                  item: 2,
                  slideMove: 1,
                  slideMargin: 6,
                },
              },

              {
                breakpoint: 500,
                settings: {
                  item: 1,
                  slideMove: 1,
                  slideMargin: 6,
                },
              },
            ],

            onBeforeStart: function (el) {},
            onSliderLoad: function (el) {},
            onBeforeSlide: function (el) {},
            onAfterSlide: function (el) {},
            onBeforeNextSlide: function (el) {},
            onBeforePrevSlide: function (el) {},
          });

          $(slider)
            .find('.flex-prev')
            .on('click', function (e) {
              e.preventDefault();
              TheSlider.goToPrevSlide();
            });

          $(slider)
            .find('.flex-next')
            .on('click', function (e) {
              e.preventDefault();
              TheSlider.goToNextSlide();
            });

          $(slider).addClass('w-flxsd');
        }
        (function ($) {
          $.fn.matchHeight._update();
        })(jQuery);
      });
    }, 1500);

    $('.table-carousel').each((_, slider) => {
      // console.log(slider);
      if (!$(slider).hasClass('w-flxsd')) {
        const itemID = getUUID();

        $(slider).attr('id', itemID);

        const TheSlider = $('#' + itemID + ' .slides').lightSlider({
          item: 1,
          autoWidth: false,
          slideMove: 1, // slidemove will be 1 if loop is true
          slideMargin: 1,

          addClass: '',
          mode: 'slide',
          useCSS: true,
          cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
          easing: 'linear', //'for jquery animation',////

          speed: 1200, //ms'
          auto: false,
          loop: true,
          slideEndAnimation: true,
          pause: 2000,

          keyPress: true,
          controls: true,
          prevHtml: '',
          nextHtml: '',

          rtl: false,
          adaptiveHeight: true,

          vertical: false,
          verticalHeight: 500,
          vThumbWidth: 100,

          thumbItem: 10,
          pager: true,
          gallery: false,
          galleryMargin: 5,
          thumbMargin: 5,
          currentPagerPosition: 'top',

          enableTouch: true,
          enableDrag: true,
          freeMove: true,
          swipeThreshold: 40,

          responsive: [],

          onBeforeStart: function (el) {},
          onSliderLoad: function (el) {},
          onBeforeSlide: function (el) {},
          onAfterSlide: function (el) {},
          onBeforeNextSlide: function (el) {},
          onBeforePrevSlide: function (el) {},
        });

        $(slider)
          .find('.flex-prev')
          .on('click', function (e) {
            e.preventDefault();
            TheSlider.goToPrevSlide();
          });

        $(slider)
          .find('.flex-next')
          .on('click', function (e) {
            e.preventDefault();
            TheSlider.goToNextSlide();
          });

        $(slider).addClass('w-flxsd');
      }
    });
  })(jQuery);
};

export const init = () => {
  if (
    $('.quote-carousel').length > 0 ||
    $('.icon-carousel').length > 0 ||
    $('.table-carousel').length > 0
  ) {
    carouselController();
  }
};
