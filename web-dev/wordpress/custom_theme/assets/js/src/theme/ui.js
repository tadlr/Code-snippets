// UI elements functionality

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lazyLoading, isMobile } from './helpers/helper';
import SplitTextGSAP from './animations/splitText';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import 'intersection-observer';
import { scrollTo } from './utils/smoothScroll.js';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
// register gsap plugins

const skipSmoothScroll = $('html').hasClass('skp-sc');

// ScrollTrigger.matchMedia({
//   '(min-width: 1025px)': function () {
//     ScrollTrigger.defaults({
//       scroller: window,
//       invalidateOnRefresh: true,
//       autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
//     });
//   },
//   '(max-width: 1024px)': function () {
//     ScrollTrigger.defaults({
//       scroller: window,
//       invalidateOnRefresh: true,
//       // a comma-delimited list of events that trigger a refresh.
//       default: 'visibilitychange,DOMContentLoaded,load,resize',
//       // so you could remove the "resize" one:
//       autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
//     });
//   },
// });

const smoothScrollHandler = () => {
  $('.scroll-to-section-btn').on('click', (e) =>
    scrollToSection($($(e.currentTarget).attr('data-target'))[0]),
  );

  const scrollToSection = (target) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: target,
        offsetY: $('header').outerHeight(),
      },
    });
  };

  if (skipSmoothScroll) return;

  import(
    /* webpackChunkName: 'chunks/smooth_scroll' */ './utils/smoothScroll.js'
  ).then((module) => {
    module.default();
  });
};

const scrollToSectionFromAnotherPage = () => {
  if (typeof window.location.href.split('#')[1] === 'undefined') return;
  let urlTarget = window.location.href.split('#')[1];
  let target = $(`[data-page-scroll-id="${urlTarget}"]`)[0];

  if (!$(target).length) return;

  scrollTo(target);
};

const recaptchaTextareaAccessibilityFix = () => {
  if (!$('#g-recaptcha-response-100000').length) return;
  let textarea = $('#g-recaptcha-response-100000');
  textarea[0].setAttribute('aria-hidden', 'true');
  textarea[0].setAttribute('aria-label', 'do not use');
  textarea[0].setAttribute('aria-readonly', 'true');
};

const checkForTables = () => {
  if (!$('.txt-post-rtf table').length) return;
  $('.txt-post-rtf table').each((i, e) =>
    $(e).wrap('<div data-scroll-container-inner class="table-wrapper"></div>'),
  );
};

const loadRecaptchaScript = () => {
  if ($('.recaptcha-form-submit-btn').length) {
    $('#recaptchaScript').attr('src', $('#recaptchaScript').attr('data-src'));
  }
};

const slidersInit = () => {
  if (!$('.swiper-trigger').length) return;

  ScrollTrigger.create({
    trigger: '.swiper-trigger',
    once: true,
    start: '0% 150%',
    onEnter: () => {
      import(
        /* webpackChunkName: 'chunks/sliders_init' */ './utils/sliders.js'
      ).then((module) => {
        new module.default();
      });
    },
  });
};

const skSliders = () => {
  if (
    $('.quote-carousel').length > 0 ||
    $('.icon-carousel').length > 0 ||
    $('.table-carousel').length > 0
  ) {
    import(
      /* webpackChunkName: 'chunks/carousel_controller' */ './ui/carouselController.js'
    ).then((module) => {
      new module.init();
    });
  }

  if ($('.sk-slider').length) {
    import(
      /* webpackChunkName: 'chunks/slider_controller' */ './ui/sliderController.js'
    ).then((module) => {
      new module.init();
    });
  }

  console.log($('.mb-table'));

  if ($('.mb-table').length) {
    import(
      /* webpackChunkName: 'chunks/table_controller' */ './ui/responsiveTables.js'
    ).then((module) => {
      new module.init();
    });
  }
};

const skTOC = () => {
  if (!$('.table-of-contents').length) return;

  ScrollTrigger.create({
    trigger: '.table-of-contents',
    once: true,
    start: '0% 150%',
    onEnter: () => {
      import(/* webpackChunkName: 'chunks/toc' */ './ui/toc.js').then(
        (module) => {
          new module.init();
        },
      );
    },
  });
};

const skStars = () => {
  if (!$('.sk-star-rating').length) return;
  console.log('stars');
  ScrollTrigger.create({
    trigger: '.sk-star-rating',
    once: true,
    start: '0% 150%',
    onEnter: () => {
      import(
        /* webpackChunkName: 'chunks/star-rating' */ './ui/star-rating.js'
      ).then((module) => {
        new module.init();
      });
    },
  });
};

const customSelectInit = () => {
  if (!$('.select-input').length) return;

  ScrollTrigger.create({
    trigger: '.select-input',
    once: true,
    start: '0% 150%',
    onEnter: () => {
      import(
        /* webpackChunkName: 'chunks/select2' */ './plugins/select2.js'
      ).then(() => {
        /* let select2 =  */
        $('.select-input').select2();

        if ($('.no-search-dropdown-form').length) {
          $('.no-search-dropdown-form').each((i, e) => {
            let thisSelect = $(e);
            thisSelect.data('select2').$dropdown.addClass('no-search-select');
          });
        }
      });
    },
  });
};

const pagesAnimationsInit = () => {
  const modulesArray = [];
  let modulesCount = 0;

  if ($('.hero-section').length) {
    modulesCount += 1;
    import(
      /* webpackChunkName: 'chunks/homepage_animations' */ './animations/home.js'
    ).then((module) => {
      modulesArray.push({
        loaded: true,
        moduleObj: module.init,
      });
      $(window).trigger('moduleLoadedAnim');
    });
  }

  if ($('.social-item').length) {
    modulesCount += 1;
    import(
      /* webpackChunkName: 'chunks/social_share' */ './utils/socialShare.js'
    ).then((module) => {
      modulesArray.push({
        loaded: true,
        moduleObj: module.init,
      });
      $(window).trigger('moduleLoadedAnim');
    });
  }
  if ($('.ajax-form').length) {
    modulesCount += 1;
    import(
      /* webpackChunkName: 'chunks/ajax_forms' */ './utils/ajaxForms.js'
    ).then((module) => {
      modulesArray.push({
        loaded: true,
        moduleObj: module.init,
      });
      $(window).trigger('moduleLoadedAnim');
    });
  }

  if ($('.case-studies').length || $('.blog').length) {
    modulesCount += 1;
    import(
      /* webpackChunkName: 'chunks/blog_filters' */ './utils/blogFilter.js'
    ).then((module) => {
      modulesArray.push({
        loaded: true,
        moduleObj: module.init,
      });
      $(window).trigger('moduleLoadedAnim');
    });
  }

  if ($('.about-page-core-values-section').length) {
    modulesCount += 1;
    import(
      /* webpackChunkName: 'chunks/about_animations' */ './animations/about.js'
    ).then((module) => {
      modulesArray.push({
        loaded: true,
        moduleObj: module.init,
      });
      $(window).trigger('moduleLoadedAnim');
    });
  }

  if ($('.equipment-landing-section').length) {
    modulesCount += 1;
    import(
      /* webpackChunkName: 'chunks/equipment_animations' */ './animations/equipment.js'
    ).then((module) => {
      modulesArray.push({
        loaded: true,
        moduleObj: module.init,
      });
      $(window).trigger('moduleLoadedAnim');
    });
  }

  if ($('.meet-payment-expert-section').length) {
    modulesCount += 1;
    import(
      /* webpackChunkName: 'chunks/equipment_animations' */ './animations/payment_expert.js'
    ).then((module) => {
      modulesArray.push({
        loaded: true,
        moduleObj: module.init,
      });
      $(window).trigger('moduleLoadedAnim');
    });
  }

  if ($('.savings-calculator-page-section').length) {
    modulesCount += 1;
    import(
      /* webpackChunkName: 'chunks/calculator_animations' */ './animations/calculator.js'
    ).then((module) => {
      modulesArray.push({
        loaded: true,
        moduleObj: module.init,
      });
      $(window).trigger('moduleLoadedAnim');
    });
  }

  if ($('.single-article-section').length) {
    modulesCount += 1;
    import(
      /* webpackChunkName: 'chunks/article_animations' */ './animations/article.js'
    ).then((module) => {
      modulesArray.push({
        loaded: true,
        moduleObj: module.init,
      });
      $(window).trigger('moduleLoadedAnim');
    });
  }

  if ($('.careers-page-section').length) {
    modulesCount += 1;
    import(
      /* webpackChunkName: 'chunks/careers_animations' */ './animations/careers.js'
    ).then((module) => {
      modulesArray.push({
        loaded: true,
        moduleObj: module.init,
      });
      $(window).trigger('moduleLoadedAnim');
    });
  }

  if ($('.contact-page').length) {
    modulesCount += 1;
    import(
      /* webpackChunkName: 'chunks/contacts_animations' */ './animations/contacts.js'
    ).then((module) => {
      modulesArray.push({
        loaded: true,
        moduleObj: module.init,
      });
      $(window).trigger('moduleLoadedAnim');
    });
  }

  // global anims init
  modulesCount += 1;
  import(
    /* webpackChunkName: 'chunks/global_animations' */ './animations/global.js'
  ).then((module) => {
    modulesArray.push({
      loaded: true,
      moduleObj: module.init,
    });
    $(window).trigger('moduleLoadedAnim');
  });

  $(window).on('moduleLoadedAnim', () => {
    let loadedModulesArray = [];

    modulesArray.forEach((e) => loadedModulesArray.push(e));
    if (
      loadedModulesArray.length == modulesCount &&
      loadedModulesArray.length !== 0
    ) {
      // setTimeout(() => {
      loadedModulesArray.map((e) => e.moduleObj());
      scrollToSectionFromAnotherPage();
      // }, 250);
    }
  });
};

const pagesUserInterfaceInit = () => {
  const modulesArray = [];
  let modulesCount = 0;
  // if ($('.landing-section-home').length) {
  //     modulesCount += 1;
  //     import( /* webpackChunkName: 'chunks/homepage_ui' */ './ui/home.js').then(module => {
  //         modulesArray.push({
  //             loaded: true,
  //             moduleObj: module.init
  //         });
  //         $(window).trigger('moduleLoadedUI');
  //     })
  // }

  if ($('.calculator-section').length) {
    modulesCount += 1;
    import(
      /* webpackChunkName: 'chunks/calculator_page_ui' */ './ui/calculator.js'
    ).then((module) => {
      modulesArray.push({
        loaded: true,
        moduleObj: module.init,
      });
      $(window).trigger('moduleLoadedUI');
    });
  }

  // if ($('[data-scroll-container-inner]').length) {
  //   modulesCount += 1;
  //   import(
  //     /* webpackChunkName: 'chunks/smooth-scrollbar' */ './plugins/smooth-scrollbar-init.js'
  //   ).then((module) => {
  //     modulesArray.push({
  //       loaded: true,
  //       moduleObj: module.init,
  //     });
  //     $(window).trigger('moduleLoadedUI');
  //   });
  // }

  // data-scroll-container

  // pages global ui init
  modulesCount += 1;
  import(/* webpackChunkName: 'chunks/global_ui' */ './ui/global.js').then(
    (module) => {
      modulesArray.push({
        loaded: true,
        moduleObj: module.init,
      });
      $(window).trigger('moduleLoadedUI');
    },
  );

  $(window).on('moduleLoadedUI', () => {
    let loadedModulesArray = [];
    modulesArray.forEach((e) => loadedModulesArray.push(e));
    if (
      loadedModulesArray.length == modulesCount &&
      loadedModulesArray.length !== 0
    ) {
      setTimeout(() => {
        loadedModulesArray.map((e) => e.moduleObj());
      }, 250);
    }
  });
};

const checkPageLocation = () => {
  if ($('.hero-section').length && !isMobile()) {
    $('html').addClass('header-offset-homepage');
  } else {
    $('html').removeClass('header-offset-homepage');
  }

  if ($('.hero-section').length) {
    $('html').addClass('header-background-color');
  } else {
    $('html').removeClass('header-background-color');
  }
};

const youtubeEmbedPopupHandler = (target) => {
  if (!target.attr('data-video-embed-id').length) return;
  $('html').addClass('show-embed-popup-wrap');
  let container = $('.embed-popup-wrap');
  let iframeContainer = container.find('.iframe-container');

  // console.log(target.attr('data-video-embed-id').length);

  let iframe = `
      <iframe src="https://www.youtube.com/embed/${target.attr(
        'data-video-embed-id',
      )}?rel=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;

  iframeContainer.html(iframe);

  container.off('click.embedPopupClick').on('click.embedPopupClick', (e) => {
    if (
      !$(e.target).parents('.embed-content-wrap').length ||
      $(e.target).parents('.popup-close-btn').length ||
      $(e.target).hasClass('popup-close-btn')
    ) {
      $('html').removeClass('show-embed-popup-wrap');
      iframeContainer.empty();
    }
  });
};

const vimeoEmbedPopupHandler = (target) => {
  if (typeof target === 'undefined') return;
  if (!target.attr('data-vimeo-embed-id').length) return;
  $('html').addClass('show-embed-popup-wrap');
  let container = $('.embed-popup-wrap');
  let iframeContainer = container.find('.iframe-container');

  // console.log(target.attr('data-video-embed-id').length);

  let iframe = `
      <iframe src="https://player.vimeo.com/video/${target.attr(
        'data-vimeo-embed-id',
      )}?rel=0&autoplay=1" title="Vimeo video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;

  iframeContainer.html(iframe);

  container.off('click.embedPopupClick').on('click.embedPopupClick', (e) => {
    if (
      !$(e.target).parents('.embed-content-wrap').length ||
      $(e.target).parents('.popup-close-btn').length ||
      $(e.target).hasClass('popup-close-btn')
    ) {
      $('html').removeClass('show-embed-popup-wrap');
      iframeContainer.empty();
    }
  });
};

// binds
const funcInBind = () => {
  // YouTube
  $('[data-video-embed-id]').on('click', (e) => {
    e.preventDefault();
    youtubeEmbedPopupHandler($(e.currentTarget));
  });

  // Vimeo
  $('[data-vimeo-embed-id]').on('click', (e) => {
    e.preventDefault();
    vimeoEmbedPopupHandler($(e.currentTarget));
  });

  $(window).on('load', () => {
    recaptchaTextareaAccessibilityFix();
  });

  // show-file-error
  $('form').on(
    'change focus keydown paste input select2:open click',
    'input, textarea, select',
    (e) => {
      $(e.currentTarget).parents('.form-error').removeClass('form-error');
      $(e.currentTarget)
        .parents('.form-row')
        .find('.show-file-error')
        .removeClass('show-file-error');
    },
  );

  checkPageLocation();
  $(window).on('resizeObserverTrigger', () => {
    checkPageLocation();
  });
  // $(window).on('resize', () => {
  // });
};

// Popup form
const popupForm = () => {
  if ($('.contact-form-block').length > 0) {
    $('.sticky-contact').addClass('fixed-sticky');
  }

  const focusForm = (formWrapper) => {
    if (formWrapper.length) {
      if (formWrapper.find('form').length)
        setTimeout(() => formWrapper.find('form input').first().focus(), 100);
    }
  };

  const checkPopupFormClass = () => {
    if ($('.form--container').length > 0) {
      const form = $('.form--container').detach();
      if (
        $('html').hasClass('open-popup-form') ||
        $('html').hasClass('open-header-popup-form')
      ) {
        $('.form--area').html(form);
      } else {
        $('.form-block-area').html(form);
      }
    }
  };

  $('.open-form-modal').each((_, item) => {
    if (!$(item).hasClass('looking')) {
      $(item).on('click', () => {
        $('html').toggleClass('open-popup-form');
        focusForm($('.popup-form'));
        checkPopupFormClass();
      });
      $(item).addClass('looking');
    }
  });

  $('#form-popup').on('click', function () {
    $('html').toggleClass('open-header-popup-form');

    checkPopupFormClass();
  });

  if ($('.form--container').length > 0) {
    $('.form--area').html('');
  }

  $('.blog-search-form').on('click', function () {
    $('html').addClass('open-popup-form');
    focusForm($('.popup-blog-form'));
    checkPopupFormClass();
  });

  $('.header-open-form-btn').on('click', function () {
    $('html').toggleClass('open-popup-form');
    focusForm($('.popup-form'));
    checkPopupFormClass();
  });

  $('.download-open-form-btn').on('click', function () {
    $('html').toggleClass('open-download-popup-form open-popup-form');
    focusForm($('.download-popup-form'));
    checkPopupFormClass();
  });

  $('.callback-popup-btn').on('click', function () {
    if (!$(this).hasClass('anchor-link')) {
      $('html').toggleClass('open-callback-popup-form open-popup-form');
      focusForm($('.callback-popup-form'));
      checkPopupFormClass();
    }
  });

  $('.block-callback-popup-btn').on('click', function () {
    $('html').toggleClass('open-talk-to-us-block-popup-form');
    checkPopupFormClass();
  });

  $('html').on('click', '.form-popup-close-btn', () => {
    $('html').removeClass('open-popup-form');
    $('html').removeClass('open-header-popup-form');
    $('html').removeClass('open-download-popup-form');
    $('html').removeClass('open-callback-popup-form');
    $('html').removeClass('open-talk-to-us-block-popup-form');

    checkPopupFormClass();
  });
};

// Contacts
const contactsTabs = () => {
  $('#tabs li a:not(:first)').addClass('inactive');
  $('.tab-content .container').hide();
  $('.tab-content .container:first').show();

  $('#tabs li a').click(function () {
    const t = $(this).attr('id');
    if ($(this).hasClass('inactive')) {
      $('#tabs li a').addClass('inactive');
      $(this).removeClass('inactive');

      $('.tab-content .container').hide();
      $('#' + t + 'C').fadeIn('slow');

      $(window).trigger('contactPageChangeContainer', {
        activeEl: $('#' + t + 'C'),
      });
    }
  });
};

// Comparison table
const comparisonTable = () => {
  $('.accent-column:first').addClass('first-accent-column');
  $('.accent-column:last').addClass('last-accent-column');
};

// Blog filter
const blogFilter = () => {
  $('#filter').submit(function () {
    var filter = $('#filter');
    $.ajax({
      url: filter.attr('action'),
      data: filter.serialize(), // form data
      type: filter.attr('method'), // POST
      beforeSend: function (xhr) {
        filter.find('button').text('Processing...'); // changing the button label
      },
      success: function (data) {
        filter.find('button').text('Apply filter'); // changing the button label back
        $('#response').html(data); // insert data
      },
    });
    return false;
  });
};

$(function () {
  $('.bg-image[data-bg-image]').each((_, item) => {
    const src = $(item).data('bg-image');
    $(item).css('background-image', `url(${src})`);
  });
  $('.bg-image[data-bg-imageset]').each((_, item) => {
    // console.log(item, 'item');
    const src = $(item).data('bg-imageset');
    // console.log(src, 'src');
    $(item).attr('style', `background-image: image-set("${src}")`);
  });
});

const filterTrigger = () => {
  $('#filter select').on('change', () => {
    blogFilter();
  });
};

// const surveyBackBtn = () => {
//     $('body').on('click', function () {
//         $('.inner-pages-quiz-section .cta-back').on('click', function () {
//             window.location.reload();
//         });
//     });
// }

// const surveyBackBtn = () => {
//   $('.inner-pages-quiz-section').on('DOMSubtreeModified', function () {
//     if ($('.inner-pages-quiz-section .confirmation-body').length) {
//       // console.log("im here");
//       $('.survey-heading-holder').hide();
//     }
//     $('.inner-pages-quiz-section .cta-back').on('click', function () {
//       window.location.reload();
//     });
//   });
// };

// const equipmentSurveyBackBtn = () => {
//   $('.inner-pages-quiz-section-type-2').on('DOMSubtreeModified', function () {
//     if ($('.inner-pages-quiz-section-type-2 .confirmation-body').length) {
//       // console.log("im here");
//       $('.survey-heading-holder').hide();
//     }
//     $('.inner-pages-quiz-section-type-2 .cta-back').on('click', function () {
//       window.location.reload();
//     });
//   });
// };

const surveyBackBtn = () => {
  const targetNode = document.querySelector('.inner-pages-quiz-section');

  if (!targetNode) {
    // console.error('Target node not found');
    return;
  }

  const config = { childList: true, subtree: true };

  const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        if (
          document.querySelector('.inner-pages-quiz-section .confirmation-body')
        ) {
          document.querySelector('.survey-heading-holder').style.display =
            'none';
        }

        document
          .querySelectorAll('.inner-pages-quiz-section .cta-back')
          .forEach((btn) => {
            btn.addEventListener('click', () => {
              window.location.reload();
            });
          });
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
};

const equipmentSurveyBackBtn = () => {
  const targetNode = document.querySelector('.inner-pages-quiz-section-type-2');

  if (!targetNode) {
    // console.error('Target node not found');
    return;
  }

  const config = { childList: true, subtree: true };

  const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        if (
          document.querySelector(
            '.inner-pages-quiz-section-type-2 .confirmation-body',
          )
        ) {
          document.querySelector('.survey-heading-holder').style.display =
            'none';
        }

        document
          .querySelectorAll('.inner-pages-quiz-section-type-2 .cta-back')
          .forEach((btn) => {
            btn.addEventListener('click', () => {
              window.location.reload();
            });
          });
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
};

const backgroundVideoHandler = () => {
  if ($('.background-video').length) {
    const videos = $('.background-video');

    videos.each((i, e) => {
      $(e).on('loadeddata', () => $(e).addClass('display-video'));
      $(e).attr('src', $(e).attr('data-src'));
    });

    const checkSizeHandler = (container) => {
      let valueHeight = Math.round((container.outerWidth() / 1920) * 1080);
      let valueWidth = Math.round((container.outerHeight() / 1080) * 1920);

      // console.log(valueHeight, 'valueHeight');
      // console.log(valueWidth, 'valueWidth');

      if (container.outerHeight() > valueHeight) {
        gsap.set(container.find('.background-video'), {
          height: container.outerHeight(),
          width: valueWidth,
        });
      } else {
        gsap.set(container.find('.background-video'), {
          width: container.outerWidth(),
          height: valueHeight,
        });
      }
    };
    videos.each((i, e) => checkSizeHandler($(e).parent()));
    $(window).on('resizeObserverTrigger', () => {
      videos.each((i, e) => checkSizeHandler($(e).parent()));
    });
  }
};

const twilioChatHandler = () => {
  $('html').on('click', '.twilio-chat-btn', (e) => {
    e.preventDefault();
    $('.Twilio-EntryPoint').click();
  });

  if ($('.sticky-contact').length && isMobile() && $(document).width() <= 500) {
    $('html').addClass('hide-twilio-chat-btn');
    $('html').removeClass('.mobile-menu-opened');
  }
};

const hubspotFormSubmissionScroll = () => {
  var interval = setInterval(function () {
    if ($('.hbspt-form .submitted-message').length) {
      clearInterval(interval);

      var scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
      });
      var target = document.querySelector('.submitted-message');
      scroll.scrollTo(target, {
        offset: -150,
        duration: 600,
        default: 'resize',
        disableLerp: true,
      });
    }
  }, 100);
};

// ui init
export const UI = () => {
  checkForTables();
  smoothScrollHandler();
  new SplitTextGSAP();
  loadRecaptchaScript();
  funcInBind();
  lazyLoading();
  slidersInit();
  skSliders();
  skTOC();
  skStars();
  backgroundVideoHandler();
  pagesUserInterfaceInit();
  pagesAnimationsInit();
  customSelectInit();
  popupForm();
  contactsTabs();
  comparisonTable();
  filterTrigger();
  surveyBackBtn();
  equipmentSurveyBackBtn();
  twilioChatHandler();
  hubspotFormSubmissionScroll();
  vimeoEmbedPopupHandler();
};
