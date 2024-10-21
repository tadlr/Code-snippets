jQuery(document).ready(function ($) {

  /*
  Table of Contents:
   - GLOBAL INTERVAL
   - ACCESSIBILITY
   - TRACKING
   - NAV
   - HUBSPOT FORMS
   - PRIVACY POLICY POPUP
   - OTHER
  */

  /* GLOBAL INTERVAL */
  setInterval(function () {
    // accessibility updates
    // aria-hidden attributes
    // swiper
    if($('.inner-pages-slider-section .swiper-slide.swiper-slide-active').length && $('.inner-pages-slider-section .swiper-slide.swiper-slide-next').length && window.innerWidth > 1024) {
      $('.inner-pages-slider-section .swiper-slide').attr('aria-hidden', 'true');
      $('.inner-pages-slider-section .swiper-slide.swiper-slide-active, .inner-pages-slider-section .swiper-slide.swiper-slide-next, .inner-pages-slider-section .swiper-slide.swiper-slide-active .btn-default, .inner-pages-slider-section .swiper-slide.swiper-slide-next .btn-default').removeAttr('aria-hidden').css('display','inline-block');
      $('.inner-pages-slider-section .swiper-slide.swiper-slide-next').next().removeAttr('aria-hidden');
      $('.inner-pages-slider-section .swiper-slide[aria-hidden=true] .btn-default').attr('aria-hidden', 'true').css('display','none');
      $('.inner-pages-slider-section .swiper-slide.swiper-slide-next').next().find('.btn-default').removeAttr('aria-hidden');
    }

    // home swiper
    if($('.info-slider-section-home .swiper-slide.swiper-slide-active').length) {
      $('.info-slider-section-home .swiper-slide').attr('aria-hidden', 'true');
      $('.info-slider-section-home .swiper-slide.swiper-slide-active').removeAttr('aria-hidden');
    }

    // faq
    if($('.faq-question').hasClass('opened') || $('.faq-question').hasClass('preopened-item')) {
      $('.faq-question.opened').find('.dropdown-content').removeAttr('aria-hidden');
      $('.faq-question.preopened-item').find('.dropdown-content').removeAttr('aria-hidden');
    } else {
      $(this).find('.dropdown-content').attr('aria-hidden','true');
    }

    // about values slider
    if($('.swiper-slide').length && $('body').hasClass('page-id-3090')){
      $('.swiper-slide').attr('aria-hidden','true');
      if($('.swiper-slide.swiper-slide-active').length) {
        $('.swiper-slide.swiper-slide-active').removeAttr('aria-hidden');
      }
    }

    // payment experts member wheel
    if($('.swiper-slide').length && $('body').hasClass('page-id-2897')){
      $('.swiper-slide .member-txt-wrap, .swiper-slide .member-name-title-wrap').attr('aria-hidden','true');
      if($('.swiper-slide[data-position=4]').length) {
        $('.swiper-slide[data-position=4] .member-txt-wrap, .swiper-slide[data-position=4] .member-name-title-wrap').removeAttr('aria-hidden');
      }
    }

    // Hubspot forms
    // Hubspot errors listener, updates ul role attribute to list
    if($(".hbspt-form ul").length > 0) {
      $(".hbspt-form ul").attr("role", "list");
      $(".hbspt-form ul[role=list] li").attr("role", "listitem");
    }
    // hubspot submit button hover

    if($('div.hs_submit').length > 0) {
      $('div.hs_submit input[type=submit]').on( "mouseenter", function(){
        $(this).parents('.hs_submit').addClass('hovered');
      }).on( "mouseleave", function(){
        $(this).parents('.hs_submit').removeClass('hovered');
      });
    }
    // end hubspot forms

    // new nav bar form update
    if ($("button[value='Get a free demo']").length) {
      $("button[value='Get a free demo']").on('click', function () {
        if (
          $('select[name=industry]').val() != '' &&
          $('input[name=email]').val() != ''
        ) {
          //$('html').addClass('open-callback-popup-form').addClass('open-popup-form');
          if ($('select[name=industry]').val() == 'Restaurant') {
            $(this).parents('.hbspt-form').addClass('restaurant');
            //$('.form-wrap.meeting').removeClass('d-none');
          } else {
            //var industry = $('select[name=industry]').val();
            //var email = $('input[name=email]').val();
            //$('.form-wrap.callback .hbspt-form input[name=email]').val(email);
            //$('.form-wrap.callback .hbspt-form select[name=industry]').val(industry).change();

            $(this).parents('.hbspt-form').addClass('other');
            //$('.form-wrap.callback').removeClass('d-none');
          }
        }
      });
    }
  }, 500);

  /* ACCESSIBILITY */
  // anchor links
  $('.content-bullets a.anchor-link').on('click', function () {
    var targetID = parseInt($(this).data('scroll-section-target-id'));
    $([document.documentElement, document.body]).animate(
      {
        scrollTop:
          $("[data-link-scroll-target-section-id|='" + targetID + "']").offset()
            .top - 100,
      },
      250,
      'linear',
    );
    //data-link-scroll-target-section-id
  });

  // scroll down button
  $('.scroll-to-next-btn').on('click', function (e) {
    e.preventDefault();
    var target = $(this).parents('[data-scroll-section]').next();
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: target.offset().top - $("#header").outerHeight(),
      },
      350,
      'linear',
    );
  });

  function isElementInViewport(el) {
    // Special bonus for those using jQuery
    if (typeof jQuery === 'function' && el instanceof jQuery) {
      el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight ||
          document.documentElement.clientHeight) /* or $(window).height() */ &&
      rect.right <=
        (window.innerWidth ||
          document.documentElement.clientWidth) /* or $(window).width() */
    );
  }

  function onVisibilityChange(el, callback) {
    var old_visible;
    return function () {
      var visible = isElementInViewport(el);
      if (visible != old_visible) {
        old_visible = visible;
        if (typeof callback == 'function') {
          callback();
        }
      }
    };
  }

  var handler = onVisibilityChange(
    $('[data-scroll-section], .sk-block'),
    function () {
      $('[data-scroll-section], .sk-block')
        .find('div')
        .each(function (index) {
          if ($(this).hasClass('op-0')) {
            $(this).removeClass('op-0');
          }
        });
      $('[data-scroll-section]')
        .find('.bg-image.b-lazy')
        .css('opacity', 'inherit');
      $('[data-scroll-section]')
        .find('.txt-post-rtf')
        .css('opacity', 'inherit');
      $('[data-scroll-section]').find('.btn-default').css('opacity', 'inherit');
      $('[data-scroll-section]')
        .find('.txt-content')
        .children()
        .each(function () {
          $(this).css('opacity', 'inherit');
        });
    },
  );

  $(window).on('DOMContentLoaded load resize scroll', handler);

  /* TRACKING */
  // helper function for GET parameters
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return false;
  }

  if (getUrlParameter('ranSiteID')) {
    const siteID = getUrlParameter('ranSiteID');
    const utcStr = new Date().toUTCString();
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var c = new Date(year + 2, month, day);
    var timestamp = Date.now();

    document.cookie =
      'siteID=' + siteID + '; expires=' + c.toUTCString() + '; path=/';
    document.cookie =
      'ranSiteID=' + siteID + '; expires=' + c.toUTCString() + '; path=/';
    document.cookie =
      'date-time=' + utcStr + '; expires=' + c.toUTCString() + '; path=/';
    document.cookie =
      'date-time entered=' +
      utcStr +
      '; expires=' +
      c.toUTCString() +
      '; path=/';
    document.cookie =
      'date-timestamp=' +
      timestamp +
      '; expires=' +
      c.toUTCString() +
      '; path=/';
  }

  // autoplay videos if hash in url
  if (window.location.hash && window.location.hash.includes('video')) {
    let iframe = $('.article-text iframe');
    let iframeSrcNew = iframe.attr('src') + '?&autoplay=1';
    iframe.attr('src', iframeSrcNew);

    if ($('.landing-video-btn').length) {
      $('.landing-video-btn').click();
    }
  }

  /* NAV */
  /*
  if($('.header.header-fr .max-w-container').hasClass('op-0')) {
    $('.header.header-fr .max-w-container').removeClass('op-0');
  }
  */

  $('.header-link-item.no-dropdown').on( "mouseenter", function(){
    console.log('header link with no dropdown has been hovered');
    $('html').removeClass('header-opened-dropdown');
    $('.header-link-item.has-dropdown, .dropdown-item-links').removeClass('opened-dropdown');
  }).on( "mouseleave", function(){

  });

  // new nav bar update
  var popupRemoveRestaurantIndustry = setInterval(function () {
    if ($('.form-wrap.callback .hbspt-form select[name=industry]').length) {
      $(
        '.form-wrap.callback .hbspt-form select[name=industry] option[value=Restaurant]',
      ).remove();
      clearInterval(popupRemoveRestaurantIndustry);
    }
  }, 100);

  // Header Get a free demo CTA Hubspot form submission submit message CTA
  var headerHubspotCTASub = setInterval(function () {
    // check for submission message
    if ($('#header .hbspt-form .submitted-message').length) {
      // open popup and show corresponding form based on industry
      $('html')
        .addClass('open-callback-popup-form')
        .addClass('open-popup-form');
      $('.callback-popup-form.nav-default-popup').css('z-index', '99999');
      /*
      if($('select[name=industry]').val() == 'Restaurant') {
        $(this).parents('.hbspt-form').addClass('restaurant');
        $('.form-wrap.meeting').removeClass('d-none');
      } else {
        $(this).parents('.hbspt-form').addClass('other');
        $('.form-wrap.callback').removeClass('d-none');
      }
      */
      // add open popup buttons to submission message
      if ($('#header .hbspt-form').hasClass('restaurant')) {
        $('.form-wrap.meeting').removeClass('d-none');
        $('#header .hbspt-form .submitted-message').append(
          "<br><a href='#' class='callback-popup-btn schedule-meeting-btn btn-default c-blue-1 btn-green-1 section-color-white btn-offset-8 fw-700 mt-2'><span class='btn-bg-el'></span><span class='btn-txt'>Schedule your free demo</span></a><script>jQuery(document).ready(function ($) {$('.callback-popup-btn.schedule-meeting-btn').on('click',function(){$('html').addClass('open-callback-popup-form').addClass('open-popup-form');$('.form-wrap.meeting').removeClass('d-none');});});</script>",
        );
        clearInterval(headerHubspotCTASub);
      } else if ($('#header .hbspt-form').hasClass('other')) {
        $('.form-wrap.callback').removeClass('d-none');
        $('#header .hbspt-form .submitted-message').append(
          "<br><a href='#' class='callback-popup-btn schedule-callback-btn btn-default c-blue-1 btn-green-1 section-color-white btn-offset-8 fw-700 mt-2'><span class='btn-bg-el'></span><span class='btn-txt'>Schedule your free demo</span></a><script>jQuery(document).ready(function ($) {$('.callback-popup-btn.schedule-callback-btn').on('click',function(){$('html').addClass('open-callback-popup-form').addClass('open-popup-form');$('.form-wrap.callback').removeClass('d-none');});});</script>",
        );
        clearInterval(headerHubspotCTASub);
      }
    }
  }, 100);

  // language toggle
  // lang current click functionality
  $('.lang-current').on('click', function (e) {
    e.preventDefault();
    var langCurrent = $(this);
    var toggle = $('#lang_toggle');

    if (langCurrent.hasClass('open')) {
      langCurrent.removeClass('open');
      toggle.css({
        visibility: 'hidden',
        height: '0px',
      });
      toggle.attr('aria-hidden', 'true');
    } else {
      toggle.removeAttr('aria-hidden');
      langCurrent.addClass('open');
      var totalHeight = 0;
      toggle.children().each(function () {
        totalHeight += parseInt(langCurrent.outerHeight(true));
      });
      console.log(totalHeight);
      toggle.css('height', totalHeight + 'px');
      toggle.css({
        visibility: 'visible',
        height: totalHeight + 'px',
      });
    }
  });

  $('body').on('click', function (e) {
    if (!$(e.target).hasClass('lang-current')) {
      $('.lang-current').removeClass('open');
      $('#lang_toggle')
        .css({
          visibility: 'hidden',
          height: '0px',
        })
        .attr('aria-hidden', 'true');
    }
  });

  // select language
  $('#lang_toggle a').on('click', function (e) {
    e.preventDefault();
    $('.lang-current').removeClass('open');
    $('#lang_toggle').attr('aria-hidden', 'true');
    $('#lang_toggle').css({
      visibility: 'hidden',
      height: '0px',
    });
    $('.lang-current').text($(this).text());
    $('#lang_toggle a').removeClass('current');
    $(this).addClass('current');
    $('.lang-current').focus();
  });

  // mobile menu functionality
  if (window.innerWidth < 1025) {
    var offset = 140;

    if (window.innerWidth < 501) {
      var offset = 500;
    }

    $('.mobile-menu-btn').on('click', function () {
      if (
        $('#header .content-wrap .btn-default.clone').length &&
        $('.cta-parent').length
      ) {
        $('#header .content-wrap .btn-default.clone')
          .appendTo('.cta-parent')
          .removeClass('clone');
        $('#header .content-wrap .dropdown-link-cta.cta-parent').removeClass(
          'cta-parent',
        );
      }

      $(
        '.header-links-wrap, .dropdown-item-wrap, .dropdown-link-wrap',
      ).removeAttr('style');
      $('.dropdown-item-wrap').removeClass('opened');
      $('.links-column').removeClass('open-submenu');
      $('.dropdown-item-links').css({
        opacity: '0',
        visibility: 'hidden',
        height: '0px',
      });
      $('.lang-current').removeClass('open');
      $('#lang_toggle')
        .css({
          visibility: 'hidden',
          height: '0px',
        })
        .attr('aria-hidden', 'true');

      $('.main-header .nav-wrap, .main-header .header-links-wrap').animate(
        {
          scrollTop: $(this).offset().top - 120,
        },
        300,
        'linear',
      );
    });

    $('.header-link-item.has-dropdown').on('click', function () {
      $('.links-column.open-submenu .column-heading').siblings().fadeOut();
      $('.links-column').removeClass('open-submenu');
    });

    $('.column-heading').on('click', function () {
      if ($(this).parent().hasClass('open-submenu')) {
        $(this).parent().removeClass('open-submenu');
        $(this).siblings().fadeOut();
      } else {
        if ($('.links-column.open-submenu').length) {
          $('.links-column.open-submenu .column-heading').siblings().fadeOut();
          $('.links-column.open-submenu').removeClass('open-submenu');
        }
        $(this).parents('.dropdown-item-links').css('height', 'auto');
        $(this).parent().addClass('open-submenu');
        $(this).siblings().fadeIn();
      }
    });

    $('.header-link-item.has-dropdown').on('click', function () {
      if ($(this).parent().hasClass('opened')) {
        // put cta back where it belongs
        if (
          $('#header .content-wrap .btn-default.clone').length &&
          $('.cta-parent').length
        ) {
          $('#header .content-wrap .btn-default.clone')
            .appendTo('.cta-parent')
            .removeClass('clone');
          $('#header .content-wrap .dropdown-link-cta.cta-parent').removeClass(
            'cta-parent',
          );
        }

        // fade in top level links
        $(this).parents().siblings('.dropdown-item-wrap').fadeIn();

        // scroll nav to link
        $('.nav-wrap').animate(
          {
            scrollTop: $(this).offset().top - offset,
          },
          350,
          'linear',
        );
      } else {
        // cta check and move
        if ($(this).parent().find('.dropdown-link-cta').length) {
          var cta = $(this)
            .parent()
            .find('.dropdown-link-cta')
            .find('.btn-default:not(.hs-button)');
          cta.parent().addClass('cta-parent');
          cta.addClass('clone').appendTo('#header .content-wrap');
          //cta.remove();
          //$('.header-links-wrap').css('padding-bottom', cta.outerHeight() + 'px');
        }

        // fade out top level links
        $(this).parents().siblings('.dropdown-item-wrap').fadeOut();

        // scroll nav to link
        $('.nav-wrap').animate(
          {
            scrollTop: $(this).offset().top - offset,
          },
          350,
          'linear',
        );
      }
    });
  }

  $('header .callback-popup-btn').on('click', function (e) {
    e.preventDefault();
    $('.header-callback.callback-popup-form').css('z-index', '999999');
  });
  $('.statement-analysis-btn').on('click', function () {
    $('.form-wrap.statement').removeClass('d-none');
  });
  $('.schedule-callback-btn, .callback-popup-btn:not(.statement-analysis-btn)').on('click', function () {
    $('.form-wrap.callback').removeClass('d-none');
  });
  $('.schedule-meeting-btn').on('click', function () {
    $('.form-wrap.meeting').removeClass('d-none');
  });
  $('.form-popup-close-btn').on('click', function () {
    $('.header-callback .form-wrap').addClass('d-none');
    $('.callback-popup-form.nav-default-popup').css('z-index', '9999');
    $('.header-callback.callback-popup-form').css('z-index', '5');
  });

  // mobile menu fix
  $('.header-link-item.has-dropdown').on('click', function () {
    var sibling = $(this).parent().siblings('.dropdown-item-wrap');
    if (sibling.hasClass('opened')) {
      sibling.removeClass('opened');
      sibling.find('.dropdown-item-links').css({
        opacity: '0',
        visibility: 'hidden',
        height: '0px',
      });
    }
  });

  /* HUBSPOT FORMS */
  // hubspot submit button hover
  var hubspotSubmitButtonStyles = setInterval(function () {
    if ($('div.hs_submit').length > 0) {
      $('div.hs_submit').addClass('hover-styles');
      $('div.hs_submit').each(function () {
        if ($(this).parents('#footer').length == 0) {
          var submitWrap = $(this).find('.actions');
          var submit = $(this).find('input[type=submit]');
          var label = submit.val();
          submit.remove();

          var bgColour = 'section-color-white';

          if (
            $(this).parents('.callback-popup-form').length ||
            $(this).parents('.talk-to-us-block-popup-form').length ||
            $(this).parents('.form--container').length ||
            $(this).parents('.popup-form').length
          ) {
            var bgColour = 'section-color-blue';
          }

          submitWrap.append(
            '<button type="submit" class="hs-button primary large btn-default size-18-txt ltr-spc-pos-0_25 c-blue-1 btn-green-1 btn-offset-10 fw-700 ' +
              bgColour +
              '" value="' +
              label +
              '"><span class="btn-bg-el"></span><span class="btn-txt">' +
              label +
              '</span></button>',
          );
        }
      });
      clearInterval(hubspotSubmitButtonStyles);
    }
  }, 500);

  // Add Aria Labels to Hubspot forms
  const hubspotFormsAriaLabels = setInterval(function () {
    if ($('.hbspt-form form').length) {
      let form = $('.hbspt-form form');
      form.removeAttr('id');
      let inputs = form.find('input');
      let selects = form.find('select');

      inputs.each(function (index) {
        if (
          $(this).attr('type') != 'hidden' ||
          $(this).attr('name') == 'page_url' ||
          $(this).attr('name') == 'g-recaptcha-response'
        ) {
          let inputID = $(this).attr('id') + '-' + index;
          let inputName = $(this).attr('name') + '-' + index;
          $(this)
            .parents('.input')
            .siblings('label')
            .attr('aria-label', inputName);
          $(this).parents('.input').siblings('label').removeAttr('id');
          $(this).parents('.input').siblings('label').attr('for', inputID);
          $(this).attr('id', inputID);
        }
      });

      selects.each(function (index) {
        let inputID = $(this).attr('id') + '-' + index;
        let inputName = $(this).attr('name') + '-' + index;
        $(this)
          .parents('.input')
          .siblings('label')
          .attr('aria-label', inputName);
        $(this).parents('.input').siblings('label').removeAttr('id');
        $(this).parents('.input').siblings('label').attr('for', inputID);
        $(this).attr('id', inputID);
      });

      clearInterval(hubspotFormsAriaLabels);
      console.log('aria labels added to hubspot forms');
    }
  }, 100);

  // Hubspot errors listener, updates ul role attribute to list
  setInterval(function () {
    if ($('.hbspt-form ul').length > 0) {
      $('.hbspt-form ul').attr('role', 'list');
      $('.hbspt-form ul[role=list] li').attr('role', 'listitem');
    }
  }, 100);

  const hubspotAnalyticsScript = setInterval(function () {
    if ($('script#hs-analytics').length > 0) {
      $('script#hs-analytics').removeAttr('id');
    } else {
      clearInterval(hubspotAnalyticsScript);
    }
  }, 100);

  const hubspotRecaptchaScript = setInterval(function () {
    if ($('script#recaptcha').length > 0) {
      $('script#recaptcha').removeAttr('id');
    } else {
      clearInterval(hubspotRecaptchaScript);
    }
  }, 100);

  // edit placeholder text for subscribe form in footer
  const hubspotFormSubscribeEmailField = setInterval(function () {
    if ($('footer .hbspt-form input[name=email]').length) {
      // console.log('testing for email field on mobile');
      clearInterval(hubspotFormSubscribeEmailField);
      if ($('html').attr('lang') == 'es-US') {
        $('footer .hbspt-form input[name=email]').attr(
          'placeholder',
          'Suscríbete a nuestro boletín',
        );
      } else if ($('html').attr('lang') == 'fr-CA') {
        $('footer .hbspt-form input[name=email]').attr(
          'placeholder',
          'Inscrivez-vous à notre newsletter',
        );
      } else {
        $('footer .hbspt-form input[name=email]').attr(
          'placeholder',
          'Sign up for our newsletter',
        );
      }
    }
  }, 100);

  // Hubspot Hidden Inputs
  var hubspotHiddenInputs = setInterval(function () {
    if ($('input[name=page_url]').length) {
      $('input[name=page_url]').val(window.location.href);
    }
    if ($('input[name=siteid]').length) {
      if (getUrlParameter('siteID')) {
        $('input[name=siteid]').val(getUrlParameter('siteID'));
      }
    }
    if ($('input[name=raneaid]').length) {
      if (getUrlParameter('ranEAID')) {
        $('input[name=raneaid]').val(getUrlParameter('ranEAID'));
      }
    }
    if ($('input[name=ranmid]').length) {
      if (getUrlParameter('ranMID')) {
        $('input[name=ranmid]').val(getUrlParameter('ranMID'));
      }
    }
    if ($('input[name=ransiteid]').length) {
      //console.log(getUrlParameter('ranSiteID'));
      if (getUrlParameter('ranSiteID')) {
        $('input[name=ransiteid]').val(getUrlParameter('ranSiteID'));
      }
    }
    if ($('input[name=order_id]').length) {
      if (!getCookie('date-time')) {
        const utcStr = new Date().toUTCString();
        $('input[name=order_id]').val(utcStr);
      } else {
        $('input[name=order_id]').val(getCookie('date-timestamp'));
      }
    }
    if ($('input[name=order_id_rakuten]').length) {
      if (!getCookie('date-time')) {
        const utcStr = new Date().toUTCString();
        $('input[name=order_id_rakuten]').val(utcStr);
      } else {
        $('input[name=order_id_rakuten]').val(getCookie('date-timestamp'));
      }
    }
    //clearInterval(hubspotHiddenInputs);
  }, 100);

  // survey section download guide popup button
  $('.download-open-form-btn').on('click', function (event) {
    if ($('.newsletter-form .hbspt-form').length) {
      $('.newsletter-form .hbspt-form')
        .detach()
        .appendTo('.download-popup-form .form-wrap');
    }
  });
  $('.form-popup-close-btn').on('click', function (event) {
    if ($('.download-popup-form .hbspt-form').length) {
      $('.download-popup-form .form-wrap .hbspt-form')
        .detach()
        .appendTo('.contact-block .newsletter-form');
    }
  });

  // RSG page form label hide
  if ($('body.postid-29530').length) {
    var homeFormInputs = setInterval(function () {
      if ($('.home-page-form .hbspt-form .hs-input').length) {
        //clearInterval(homeFormInputs);
        $('.home-page-form .hbspt-form .hs-input').each(function (index) {
          if ($(this).val() != '' && $(this).prop('type') == 'text') {
            $(this).parent().siblings('label').addClass('hide');
          }
          $(this).on('change keydown paste input', function () {
            if ($(this).val() != '') {
              $(this).parent().siblings('label').addClass('hide');
            } else {
              $(this).parent().siblings('label').removeClass('hide');
            }
          });
        });
      }
    }, 100);
  }

  /* PRIVACY POLICY POPUP */
  /* Privacy policy/cookies popup */
  // privacy policy scroll lock
  if ($('#cookie-law-info-bar').length) {
    $('.cli_settings_button').on('click', function () {
      $('html, body').css('overflow-y', 'hidden').css('height', '100%');
    });
    $('#cliModalClose, #wt-cli-privacy-save-btn').on('click', function () {
      $('html, body').css('overflow-y', 'auto').css('height', 'auto');
    });
  }

  var cookiePopupEnglishContent = setInterval(function () {
    if ($('.cli-bar-message').length && $('html').prop('lang') == 'en') {
      $('#wt-cli-privacy-save-btn').html('Save and accept');
      clearInterval(cookiePopupEnglishContent);
    }
  }, 500);
  /*
  Spanish cookie consent
  Utilizamos cookies en nuestro sitio web para brindarle la experiencia más relevante al recordar sus preferencias y visitas repetidas. Al hacer clic en "Aceptar todo", usted acepta el uso de TODAS las cookies.
  */
  var cookiePopupSpanishContent = setInterval(function () {
    if ($('.cli-bar-message').length && $('html').prop('lang') == 'es-US') {
      // Buttons
      $('.cli_settings_button').text('Configuración de cookies');
      $('#wt-cli-accept-all-btn').text('Aceptar todo');
      $('#wt-cli-privacy-save-btn').text('Guardar y aceptar');
      //$('.cli-privacy-readmore').text('Mostrar más');
      $('.cli-slider').prop('data-cli-enable', 'Habilitado');
      $('.cli-slider').prop('data-cli-disable', 'Desactivado');
      //$('.cli-switch .cli-slider').append('<span class="input-label">Desactivado</span>');

      // General text
      $('.cli-bar-message').html(
        'Utilizamos cookies en nuestro sitio web para brindarle la experiencia más relevante al recordar sus preferencias y visitas repetidas. Al hacer clic en "Aceptar todo", usted acepta el uso de TODAS las cookies.',
      );

      $('.cli-privacy-overview > h4').html('Privacidad general');

      $('.cli-privacy-content-text').html(
        'Este sitio web utiliza cookies para mejorar tu experiencia mientras navegas por el sitio. De estas cookies, las que están categorizadas como necesarias se almacenan en tu navegador ya que son esenciales para el funcionamiento de las funcionalidades básicas del sitio. También utilizamos cookies de terceros que nos ayudan a analizar y entender cómo utilizas este sitio web. Estas cookies se almacenarán en tu navegador solo con tu consentimiento. También tienes la opción de optar por no permitir estas cookies. Sin embargo, optar por no permitir algunas de estas cookies puede afectar tu experiencia de navegación.',
      );
      $('.cli-privacy-readmore').on('click', function(){
        $('.cli-privacy-content-text').html(
          'Este sitio web utiliza cookies para mejorar tu experiencia mientras navegas por el sitio. De estas cookies, las que están categorizadas como necesarias se almacenan en tu navegador ya que son esenciales para el funcionamiento de las funcionalidades básicas del sitio. También utilizamos cookies de terceros que nos ayudan a analizar y entender cómo utilizas este sitio web. Estas cookies se almacenarán en tu navegador solo con tu consentimiento. También tienes la opción de optar por no permitir estas cookies. Sin embargo, optar por no permitir algunas de estas cookies puede afectar tu experiencia de navegación.',
        );
      });

      // Necessary cookies
      $('[data-target="necessary"]').html('Necesarias');
      $('.cli-necessary-caption').html('Siempre habilitado');
      // Necessary table
      $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table tbody .cookielawinfo-row:first-of-type .cookielawinfo-column-4',
      ).text(
        'Esta cookie es establecida por el plugin de Consentimiento de Cookies GDPR. La cookie se utiliza para almacenar el consentimiento del usuario para las cookies en la categoría "Analítica".',
      );
      $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table tbody .cookielawinfo-row:nth-of-type(2) .cookielawinfo-column-4',
      ).text(
        'La cookie es establecida por el consentimiento de cookies GDPR para registrar el consentimiento del usuario para las cookies en la categoría "Funcional".',
      );
      $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table tbody .cookielawinfo-row:nth-of-type(3) .cookielawinfo-column-4',
      ).text(
        'Esta cookie es establecida por el plugin de Consentimiento de Cookies GDPR. La cookie se utiliza para almacenar el consentimiento del usuario para las cookies en la categoría "Necesarias".',
      );
      $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table tbody .cookielawinfo-row:nth-of-type(4) .cookielawinfo-column-4',
      ).text(
        'Esta cookie es establecida por el plugin de Consentimiento de Cookies GDPR. La cookie se utiliza para almacenar el consentimiento del usuario para las cookies en la categoría "Otro".',
      );
      $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table tbody .cookielawinfo-row:nth-of-type(5) .cookielawinfo-column-4',
      ).text(
        'Esta cookie es establecida por el plugin de Consentimiento de Cookies GDPR. La cookie se utiliza para almacenar el consentimiento del usuario para las cookies en la categoría "Actuación".',
      );
      $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table tbody .cookielawinfo-row:nth-of-type(6) .cookielawinfo-column-4',
      ).text(
        'La cookie es establecida por el plugin de Consentimiento de Cookies GDPR y se utiliza para almacenar si el usuario ha consentido o no el uso de cookies. No almacena ningún dato personal.',
      );

      var necessaryTable = $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table',
      );
      $('[data-id="necessary"] .wt-cli-cookie-description')
        .text(
          'Las cookies necesarias son absolutamente esenciales para que el sitio web funcione correctamente. Estas cookies garantizan funcionalidades básicas y características de seguridad del sitio web, de forma anónima.',
        )
        .append(necessaryTable);

      // Functional cookies
      $('[data-target="functional"]').html('Funcionales');
      $('[data-id="functional"] .wt-cli-cookie-description').html(
        'Las cookies funcionales ayudan a realizar ciertas funcionalidades como compartir el contenido del sitio web en plataformas de redes sociales, recoger comentarios y otras características de terceros.',
      );

      // Performance cookies
      $('[data-target="performance"]').html('Rendimiento');
      $('[data-id="performance"] .wt-cli-cookie-description').html(
        'Las cookies de rendimiento se utilizan para entender y analizar los índices clave de rendimiento del sitio web, lo que ayuda a ofrecer una mejor experiencia al usuario para los visitantes.',
      );

      // Analytics cookies
      $('[data-target="analytics"]').html('Analíticas');
      $('[data-id="analytics"] .wt-cli-cookie-description').html(
        'Las cookies analíticas se utilizan para entender cómo interactúan los visitantes con el sitio web. Estas cookies ayudan a proporcionar información sobre métricas como el número de visitantes, la tasa de rebote, la fuente de tráfico, etc.',
      );

      // Advertisement cookies
      $('[data-target="advertisement"]').html('Publicidad');
      $('[data-id="advertisement"] .wt-cli-cookie-description').html(
        'Las cookies de publicidad se utilizan para proporcionar a los visitantes anuncios relevantes y campañas de marketing. Estas cookies rastrean a los visitantes a través de sitios web y recogen información para ofrecer anuncios personalizados.',
      );

      // Others cookies
      $('[data-target="others"]').html('Otros');
      $('[data-id="others"] .wt-cli-cookie-description').html(
        'Otras cookies no categorizadas son aquellas que están siendo analizadas y aún no se han clasificado en una categoría.',
      );

      clearInterval(cookiePopupSpanishContent);
    }
  }, 100);

  var cookiePopupFrenchContent = setInterval(function () {
    if ($('.cli-bar-message').length && $('html').prop('lang') == 'fr-CA') {
      // Buttons
      $('.cli_settings_button').text('Paramètres des cookies');
      $('#wt-cli-accept-all-btn').text('Acceptez tout');
      $('#wt-cli-privacy-save-btn').text('Enregistrer et accepter');
      //$('.cli-privacy-readmore').text('Mostrar más');
      $('.cli-slider').prop('data-cli-enable', 'Activés');
      $('.cli-slider').prop('data-cli-disable', 'Désactivés');
      $('.cookielawinfo-row-cat-table thead tr .cookielawinfo-column-3').html('Durée');
      //$('.cli-switch .cli-slider').append('<span class="input-label">Desactivado</span>');

      // General text
      $('.cli-bar-message').html(
        "Nous utilisons des cookies sur notre site Web pour vous offrir l'expérience la plus pertinente en mémorisant vos préférences et vos visites répétées. En cliquant sur « Tout accepter », vous consentez à l'utilisation de TOUS les cookies. Cependant, vous pouvez visiter « Paramètres des cookies » pour fournir un consentement contrôlé.",
      );

      $('.cli-privacy-overview > h4').html('Aperçu de confidentialité');

      $('.cli-privacy-content-text').html(
        "Ce site Web utilise des cookies pour améliorer votre expérience. Parmi ceux-ci, les cookies classés comme « nécessaires » sont stockés sur votre navigateur car ils sont essentiels aux fonctionnalités de base du site Web. Nous utilisons également des cookies tiers qui nous aident à analyser et à comprendre comment vous utilisez ce site Web. Ces cookies ne seront stockés dans votre navigateur qu'avec votre consentement. Vous avez également la possibilité de désactiver ces cookies, mais cela peut affecter votre expérience de navigation."
      );
      $('.cli-privacy-readmore').on('click', function(){
        $('.cli-privacy-content-text').html(
          "Ce site Web utilise des cookies pour améliorer votre expérience. Parmi ceux-ci, les cookies classés comme « nécessaires » sont stockés sur votre navigateur car ils sont essentiels aux fonctionnalités de base du site Web. Nous utilisons également des cookies tiers qui nous aident à analyser et à comprendre comment vous utilisez ce site Web. Ces cookies ne seront stockés dans votre navigateur qu'avec votre consentement. Vous avez également la possibilité de désactiver ces cookies, mais cela peut affecter votre expérience de navigation."
        );
      });

      // Necessary cookies
      $('[data-target="necessary"]').html('Nécessaire');
      $('.cli-necessary-caption').html('Toujours activés');
      // Necessary table
      $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table tbody .cookielawinfo-row:first-of-type .cookielawinfo-column-4',
      ).text(
        "Ce cookie est défini par le plugin GDPR Cookie Consent, et est utilisé pour stocker le consentement de l'utilisateur pour les cookies dans la catégorie « Analyse »."
      );
      $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table tbody .cookielawinfo-row:nth-of-type(2) .cookielawinfo-column-4',
      ).text(
        "Le cookie est défini par le consentement des cookies GDPR pour enregistrer le consentement de l'utilisateur pour les cookies dans la catégorie « Fonctionnel ».",
      );
      $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table tbody .cookielawinfo-row:nth-of-type(3) .cookielawinfo-column-4',
      ).text(
        "Ce cookie est défini par le plugin GDPR Cookie Consent, et est utilisé pour stocker le consentement de l'utilisateur pour les cookies dans la catégorie « Nécessaire ».",
      );
      $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table tbody .cookielawinfo-row:nth-of-type(4) .cookielawinfo-column-4',
      ).text(
        "Ce cookie est défini par le plugin GDPR Cookie Consent, et est utilisé pour stocker le consentement de l'utilisateur pour les cookies dans la catégorie « Autres ».",
      );
      $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table tbody .cookielawinfo-row:nth-of-type(5) .cookielawinfo-column-4',
      ).text(
        "Ce cookie est défini par le plugin GDPR Cookie Consent, et est utilisé pour stocker le consentement de l'utilisateur pour les cookies dans la catégorie « Performance » .",
      );
      $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table tbody .cookielawinfo-row:nth-of-type(6) .cookielawinfo-column-4',
      ).text(
        "Le cookie est défini par le plugin GDPR Cookie Consent et est utilisé pour enregistrer le consentement de l'utilisateur à l'utilisation de cookies. Il ne stocke aucune donnée personnelle.",
      );

      var necessaryTable = $(
        '[data-id="necessary"] .cookielawinfo-row-cat-table',
      );
      $('[data-id="necessary"] .wt-cli-cookie-description')
        .text(
          'Les cookies nécessaires sont absolument essentiels au bon fonctionnement du site Web. Ces cookies assurent les fonctionnalités de base et de sécurité du site Web, de manière anonyme.',
        )
        .append(necessaryTable);

      // Functional cookies
      $('[data-target="functional"]').html('Fonctionnel');
      $('[data-id="functional"] .wt-cli-cookie-description').html(
        "Les cookies fonctionnels aident à exécuter certaines fonctionnalités telles que le partage du contenu du site Web sur les plateformes de médias sociaux, la collecte de commentaires et d'autres fonctionnalités tierces.",
      );

      // Performance cookies
      $('[data-target="performance"]').html('Performance');
      $('[data-id="performance"] .wt-cli-cookie-description').html(
        "Les cookies de performance sont utilisés pour comprendre et analyser les indices de performance clés du site Web, ce qui contribue à améliorer l'expérience utilisateur.",
      );

      // Analytics cookies
      $('[data-target="analytics"]').html('Analyse');
      $('[data-id="analytics"] .wt-cli-cookie-description').html(
        'Les cookies analytiques sont utilisés pour comprendre comment les visiteurs interagissent avec le site Web. Ces cookies aident à fournir des informations sur le nombre de visiteurs, le taux de rebond, la source du trafic, etc.',
      );

      // Advertisement cookies
      $('[data-target="advertisement"]').html('Publicité');
      $('[data-id="advertisement"] .wt-cli-cookie-description').html(
        'Les cookies publicitaires sont utilisés pour fournir des publicités et des campagnes marketing pertinente aux visiteurs. Ces cookies suivent les visiteurs sur les sites Web et collectent des informations pour fournir des publicités personnalisées.',
      );

      // Others cookies
      $('[data-target="others"]').html('Autres');
      $('[data-id="others"] .wt-cli-cookie-description').html(
        "Les autres cookies non catégorisés sont ceux qui sont en cours d'analyse et n'ont pas encore été classés dans une catégorie.",
      );

      clearInterval(cookiePopupFrenchContent);
    }
  }, 100);

  /* OTHER */
  // prevent default class
  $('.prev-default').on('click',function(e){e.preventDefault()});

  // scrollable links
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('.lang-current')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length
        ? target
        : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length && !$(this).hasClass('scroll-to-section-btn')) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();

        //console.log($('#header').outerHeight(true));

        $('html, body').animate(
          {
            scrollTop: target.offset().top - $('#header').outerHeight(true),
          },
          350,
          'linear',
          function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(':focus')) {
              // Checking if the target was focused
              return false;
            } else {
              //$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          },
        );
      }
    }
    $('html').trigger('headerChanged');
  });

  // scroll to ID from other page
  if (window.location.hash) {
    if (!window.innerWidth > 1024 && !$('html').hasClass('skp-sc')) {
      console.log(window.location.hash);
      $('html, body').css({
        overflow: 'clip',
        height: '100%',
      });
    }

    $(window).load(function () {
      let hash = window.location.hash;

      if (hash == '' || hash == '#' || hash == undefined) return false;

      let target = $(hash);

      var displace = $('header').height() + 35;

      if ($(target).length < 1) {
        const tocHash = hash.replace('#', '#');
        target = $(tocHash);
        console.log($(tocHash).length);
      }

      if ($(target).length) {
        $('html').css({
          overflow: 'auto',
          height: 'auto',
        });
        $('body').css({
          overflow: 'clip',
          height: 'auto',
        });
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop: target.offset().top - displace,
            },
            350,
          );
        return false;
      }
    });
  }

  // Slick arrows
  $('.slick-arrow, .slick-dots button').on('click', function () {
    $('.iframe-screen').removeClass('hidden');
    $('iframe').each(function () {
      this.contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        '*',
      );
    });
  });

  // Show chatbot on mobile if no sticky contact
  const mobileChat = setInterval(function () {
    if ($(window).width() < 501) {
      if (!$('.sticky-contact').length) {
        $('.Twilio-EntryPoint').attr('style', 'display: inherit !important');
      }
    }
  }, 100);

  // chat toggle
  const chatExists = setInterval(function () {
    if ($('.chat-info-welcome').length) {
      clearInterval(chatExists);
      $('.btn-chat-close').addClass('show');
      if (window.location.href.indexOf('/es/') > -1) {
        $('.btn-chat-close').addClass('spanish');
        $('#customTheme-connect-chat').addClass('spanish');
      }
    }
  }, 100);

  $('.btn-chat-close').on('click', function (event) {
    event.preventDefault();
    $('#customTheme-connect-chat').addClass('hide-chat');
    $(this).removeClass('show');
  });

  const intervalRelatedPostItem = setInterval(function () {
    if ($('.related-post-item').length) {
      let relatedPost = $('.related-post-item');
      let relatedPostLink = relatedPost.find('a');
      relatedPostLink.on('click', function (event) {
        $('.category-filter').prop('selectedIndex', 0);
      });
    }
  }, 100);

  // add class to popups with calendly forms in them for wider wrap on mobile
  if (
    $('body').hasClass('single-landings') &&
    $('.calendly-inline-widget, .meetings-iframe-container').length
  ) {
    $('.popup-form').addClass('calendly-wrap');
  }

  // video carousel on Client love page
  if($('body').hasClass('page-id-22814')) {
    $('.vc-wrap').slick({
      centerMode: true,
      centerPadding: '17.084vw',
      slidesToShow: 1,
      prevArrow: '<button type="button" aria-label="previous" class="slick-prev">Previous</button>',
      nextArrow: '<button type="button" aria-label="next" class="slick-next">Next</button>',
      dots: true,
      responsive: [{
        breakpoint: 1024,
        settings: {
          dots: true,
          centerMode: true,
          centerPadding: '17.084vw',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          centerMode: true,
          centerPadding: '17.084vw',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          centerMode: true,
          centerPadding: '17.084vw',
          slidesToShow: 1
        }
      }]
    });
  }

  if($('body').hasClass('page-id-32709')){
    $('.tabs-nav .testimonial-content-tab').hide();
    $('.tabs-nav .testimonial-content-tab:first').show();
    $('#tabs li a').click(function () {
      $('.tabs-nav .testimonial-content-tab').hide();
      $('.tabs-nav .testimonial-content-tab.'+$(this).attr('id')).show();
    });
  }

  $(window).bind('pageshow', function (event) {
    if (event.originalEvent.persisted) {
      window.location.reload();
    }
  });


});

if (performance.navigation.type == 2) {
  location.reload(true);
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
  let name = cname + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}