// import { TweenMax, ScrollToPlugin } from 'gsap';
//
import Blazy from 'blazy';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const $ = jQuery;

/**
 * function not be called again until a certain amount of time
     Used for : resize/scroll

    var func = debounce( function() {
        ....
    }, 250);

    window.addEventListener('resize', funx);
*/

const IsSafari = () => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  return isSafari;
};

$.fn.clickOutside = function (callback) {
  var $me = this;
  $(document).mouseup(function (e) {
    if (!$me.is(e.target) && $me.has(e.target).length === 0) {
      callback.apply($me);
    }
    // console.log(e);
  });
};

const getTotalHeight = (elements) => {
  let totalHeight = 0;
  // console.log(elements)
  elements.each((i, e) => (totalHeight += $(e).outerHeight()));
  // console.log(totalHeight);
  return totalHeight;
};

const startCircleRotation = (circle) => {
  gsap.to(circle, {
    duration: 120,
    repeat: -1,
    ease: 'none',
    rotation: `+=${360 * 5}`,
    scrollTrigger: {
      trigger: circle.parents('section'),
      start: '0% 100%',
      end: '100% 0%',
      invalidateOnRefresh: true,
      toggleActions: 'play pause resume pause',
    },
  });
};

const animationStarting = (section) => {
  // console.log(section);
  if (!isMobile()) {
    section.find('.op-0').removeClass('op-0');
  } else if (isMobile() && section.find('.op-0').length)
    section.find('.op-0').removeClass('op-0');
};
const refreshScrollTrigger = (timeout) =>
  setTimeout(() => ScrollTrigger.refresh(true), timeout);

function debounce(func, wait, immediate, param) {
  var timeout;
  // console.log("debounce")
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      // console.log(timeout, "calll")
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * function can we called once in specific amount of time
 * Used for mousemove/touchmove / click on btn
   window.addEventListener('resize', throttle(function(e){..}, 100));
*/

function throttle(callback, limit) {
  var wait = false;
  return function () {
    if (!wait) {
      callback.apply(null, arguments);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
}

const bLazy = [];

const dropdownsHandler = (target, mode) => {
  // console.log(target, target.find('.dropdown-content'))
  if (mode == 'open') {
    gsap.to(target, {
      height: target.find('.dropdown-content').outerHeight(true),
      // onComplete: () => $(window).trigger('pageHeightChangeEvent')
    });
  } else {
    gsap.to(target, {
      height: 0,
      // onComplete: () => $(window).trigger('pageHeightChangeEvent')
    });
  }
};

const lazyLoading = () => {
  bLazy[0] = new Blazy({
    breakpoints: [
      {
        width: 1024,
        src: 'data-src-mobile',
      },
    ],
    loadInvisible: true,
    offset: 300,
  });
  // force load image, overflow breaks bLazy
  if ($('.force-load-img').length) bLazy[0].load($('.force-load-img'), true);
  // if ($('.parallax-img').length) bLazy[0].load($('.parallax-img'), true);
  //

  let observer = new IntersectionObserver(
    (entries) => {
      // console.log(entry, 'in entry')
      entries.forEach((entry, i) => {
        if (entry.intersectionRatio > 0) {
          if (!$(entry.target).hasClass('blazy-triggered-load')) {
            $(entry.target)
              .find('.b-lazy')
              .each((i, e) => {
                bLazy[0].load($(e), true);
              });
            $(entry.target).addClass('blazy-triggered-load');
          }
        }
      });
    },
    {
      root: null,
      rootMargin: '25%',
      threshold: 0,
    },
  );

  $('#main-content')
    .children()
    .each((i, e) => {
      // console.log(e);
      observer.observe(e);
    });

  // $('.b-lazy:not(.force-load-img):not(.parallax-img)').each((i, e) => {
  //     observer.observe(e);
  // });
};

// let calculateNewSize = (originalWidth, originalHeight, newWidth) => {
//     return {
//         calculatedHeight: ((originalHeight / originalWidth) * newWidth).toFixed(2),
//     }
// }

const setItemWidths = (items) => {
  items.each((i, e) => {
    $(e).parent().css('width', $(e).attr('width'));
  });
};

function scrollToElem(el, sec, offset) {
  $('html, body').animate(
    {
      scrollTop: el.offset().top - offset,
    },
    sec,
  );
}

function isMobile() {
  return innerWidth < 1025 ? true : false;
}

function isDesktop() {
  return !isMobile();
}

const calculateTotalWidth = (container) => {
  let totalWidth = 0;

  container.children().each(function () {
    totalWidth += $(this).outerWidth(true);
  });
  return totalWidth;
};

const calculateTotalHeight = (container) => {
  let totalHeight = 0;

  container.children().each(function () {
    totalHeight += $(this).outerHeight(true);
  });
  return totalHeight;
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Gets the mouse position
const getMousePos = (e) => {
  let posx = 0;
  let posy = 0;
  if (!e) e = window.event;
  // console.log(e.pageY, 'e.pageY');
  // console.log(e.offsetY, 'e.offsetY');
  // console.log(e.clientY, 'e.clientY');
  // if (e.pageX || e.pageY) {
  posx = e.pageX;
  posy = e.pageY;
  // }
  // else if (e.clientX || e.clientY)    {
  //     posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
  //     posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
  // }
  mousepos.x = posx;
  mousepos.y = posy;
  return {
    x: posx,
    y: posy,
  };
};

const mousepos = {
  x: 0,
  y: 0,
};

const distance = (x1, y1, x2, y2) => {
  var a = x1 - x2;
  var b = y1 - y2;

  // return Math.hypot(a,b);
  return {
    x: a,
    y: b,
  };
};

// Generate a random float.
const getRandomFloat = (min, max) =>
  (Math.random() * (max - min) + min).toFixed(2);

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getMaxHeight = (el) => {
  let maxHeight = 0;

  $(el).each((i, e) => {
    var thisH = $(e).outerHeight();
    if (thisH > maxHeight) {
      maxHeight = thisH;
    }
  });
  return maxHeight;
};

const scrollToSectionFromAnotherPage = () => {
  if (typeof window.location.href.split('#')[1] === 'undefined') return;
  let urlTarget = window.location.href.split('#')[1];
  let target = $(`[data-page-scroll-id="${urlTarget}"]`)[0];

  if (!$(target).length) return;

  scrollTo(target);
};

export {
  scrollToSectionFromAnotherPage,
  startCircleRotation,
  animationStarting,
  refreshScrollTrigger,
  debounce,
  throttle,
  bLazy,
  lazyLoading,
  setItemWidths,
  scrollToElem,
  isMobile,
  isDesktop,
  calculateTotalWidth,
  calculateTotalHeight,
  map,
  getMousePos,
  distance,
  getRandomFloat,
  lerp,
  getRandomArbitrary,
  dropdownsHandler,
  getMaxHeight,
  numberWithCommas,
  IsSafari,
  getTotalHeight,
};
