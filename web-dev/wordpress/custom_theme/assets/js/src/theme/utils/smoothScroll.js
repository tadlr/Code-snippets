import gsap from 'gsap';

import { debounce, isMobile } from './../helpers/helper';
import { ResizeObserver } from '@juggle/resize-observer';

import { ScrollTrigger } from 'gsap/all';

const $ = jQuery;

// gsap.defaults({
//   ease: 'none',
//   duration: 0.5,
// });

export let locoScroll;

const smoothScrollHandler = () => {
  locoScroll = false;

  // Assuming Locomotive Scroll provides a 'locoContextChanges' event (adjust if it's different)

  // const savedPosition = localStorage.getItem("scrollPosition");

  // scrollToHistory(savedPosition);

  // $('.scroll-to-next-btn')
  //   .off('click.gsapSmoothScroll')
  //   .on('click.gsapSmoothScroll', (e) => {
  //     gsap.to(window, {
  //       duration: 1,
  //       scrollTo: $(e.currentTarget).parents('section').next()[0],
  //     });
  //   });

  // const resizeObserver = new ResizeObserver(
  //   debounce(() => {
  //     if (isMobile()) {
  //       ScrollTrigger.refresh();
  //     }
  //     if (!isMobile() && !locoScroll) {
  //       window.location.reload(true);
  //       // $("html").addClass("browser-scroll");
  //       // setTimeout(() => {
  //       location.reload(true);
  //       // }, 500);
  //     }
  //     $(window).trigger('resizeObserverTrigger');
  //     // console.log('Size changed');
  //   }, 100),
  // );

  // resizeObserver.observe($('#main-content')[0]);
};

export default smoothScrollHandler;

function scrollTo(target) {
  if (isMobile()) {
    let adjustedTopPosition = $(target).offset().top - 100;
    if (window.innerWidth > 600 && window.innerWidth < 1024) {
      adjustedTopPosition = adjustedTopPosition - 50;
    }

    $('html, body').animate(
      {
        scrollTop: adjustedTopPosition,
      },
      100,
    );
  } else {
    ScrollTrigger.refresh();
    gsap.to(window, {
      duration: 1,
      scrollTo: $(target).offset().top - $('#header').outerHeight(),
    });
  }
}

function anchorScroll() {
  $('.anchor-link').each((index, element) => {
    console.log('anchor-link', index, element);
    if (!$(element).data('listening')) {
      $(element).on('click', (e) => {
        e.preventDefault();

        let linkDataValue = $(e.currentTarget).data('scroll-section-target-id');

        let targetElement = $(
          `[data-link-scroll-target-section-id="${linkDataValue}"]`,
        )[0];

        if (!targetElement) {
          targetElement = $(`[data-scroll-section-id="${linkDataValue}"]`)[0];
        }

        if (!targetElement) {
          targetElement = $(`#${linkDataValue}`)[0];
        }

        if (targetElement) {
          scrollTo(targetElement);
        } else {
          console.error('Element not found', targetElement, linkDataValue);
        }
      });

      $(element).attr('data-listening', true);
    }
  });
}

export { anchorScroll, scrollTo };
