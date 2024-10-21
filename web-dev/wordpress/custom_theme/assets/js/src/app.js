// import './theme/utils/utils';
// import './utils/blocks';
// import './utils/lazyload';
import { refreshScrollTrigger } from './theme/helpers/helper';
// import './utils/rating';

const APP = {
  init: () => {
    $('[data-scroll-to-section]').each((_, item) => {
      if (!$(item).hasClass('looking')) {
        $(item).on('click', () => {
          $(window).scrollTo($(item).data('scroll-to-section'), {
            offset: -$('#header').outerHeight(),
          });
        });
        $(item).addClass('looking');
      }
    });

    if ($('.header[data-header-toggled="1"]').length > 0) {
      $('html').addClass('header-toggled-state');

      $('.sk-lander #main-content.block-builded-page').addClass(
        'toggled-header',
      );
    }
  },
};
document.addEventListener('DOMContentLoaded', APP.init);

(function ($) {
  $(function () {
    $('.article-main-content a:not([href^="tel:"])').each((_, item) => {
      const text = $(item).text();
      $(item).attr('title', 'View more about: ' + text);
    });

    $('.article-main-content a[href^="tel:"]').each((_, item) => {
      const text = $(item).text();
      $(item).attr('title', 'Call to: ' + text);
    });

    $('img:not([alt])').each((_, img) => {
      $(img).attr('alt', 'Decorative Image');
    });

    $('image:not(alt)').each((_, img) => {
      $(img).attr('alt', 'Decorative Image');
    });
  });

  $(document).ready(function () {
    $.fn.matchHeight._update();

    setTimeout(() => {
      $.fn.matchHeight._update();
    }, 1000);

    $(window).on('resize', () => {
      refreshScrollTrigger();
      $.fn.matchHeight._update();
    });
  });

  if ($('#wp-admin-bar-edit').length > 0) {
    let currentLocation = window.location;

    if (currentLocation.host === 'customThememerchants.com') {
      const href = $('#wp-admin-bar-edit a').attr('href');
      $('#wp-admin-bar-edit a').attr(
        'href',
        href.replace(
          'customThememerchants.com',
          'wordpress-prod-appsvc.azurewebsites.net',
        ),
      );
    }
  }
})(jQuery);
