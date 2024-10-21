import { isMobile } from '../helpers/helper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper, {
  Navigation,
  EffectFade,
  Pagination,
  Lazy,
  Grid,
  Autoplay,
  FreeMode,
  Scrollbar,
  Thumbs,
} from 'swiper';

const swiperModules = [
  Navigation,
  EffectFade,
  Pagination,
  Lazy,
  Grid,
  Autoplay,
  FreeMode,
  Scrollbar,
  Thumbs,
];

const $ = jQuery;

class Sliders {
  constructor() {
    this.industrySlider('.inner-pages-slider-section .swiper-container');
    this.teamInfoSectionMembersSlider('.meet-team-info-section .members-hold');
    this.aboutPageCoreValuesSlider(
      '.about-page-core-values-section .content-blocks-wrap',
    );
    this.testimonialsSlider('.careers-testimonials .swiper-container');

    this.infoSliderSectionHome('.info-slider-section-home .swiper-container');
    this.awardsSlider('.awards-slider .swiper-container');
  }

  aboutPageCoreValuesSlider(el) {
    if (!$(el).length) return;
    const swiper = $(el);
    const allBtns = $('.about-page-core-values-section .step-button');
    // init swiper
    swiper.addClass('swiper-container');
    swiper.find('.animated-items-wrap').addClass('swiper-wrapper');
    swiper.find('.single-block').addClass('swiper-slide');
    swiper.find('.b-lazy').removeClass('b-lazy').addClass('swiper-lazy');

    const slides = swiper.find('.swiper-slide');

    const slider = new Swiper(el, {
      init: false,
      modules: swiperModules,
      slidesPerView: 1,
      spaceBetween: 50,
      speed: 800,
      autoplay: false,
      grabCursor: true,
      lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true,
        loadPrevNextAmount: 3,
      },
      on: {
        slideChange: (swiper) => {
          allBtns.removeClass('active');
          allBtns
            .filter(`[data-step="${swiper.activeIndex + 1}"]`)
            .addClass('active');
          $(window).trigger('mobileCoreValuesSlideChange', {
            step: swiper.activeIndex + 1,
          });
        },
      },
    });

    ScrollTrigger.create({
      trigger: el,
      start: '0% 150%',
      invalidateOnRefresh: true,
      once: true,
      onEnter: () => slider.init(),
    });

    allBtns.on('click', (e) => {
      let clickedBtn = $(e.currentTarget);
      let clickedIndex = parseInt(clickedBtn.data('step'));

      slider.slideTo(clickedIndex - 1, 800);
      allBtns.removeClass('active');
      clickedBtn.addClass('active');

      $(window).trigger('mobileCoreValuesSlideChange', { step: clickedIndex });
    });

    $(window).on('changeSectionActiveSlide', (e, val) => {
      slider.slideTo(val.slideTo, 0);
    });
  }

  disableSwiping(swiper) {
    $('.info-slider-section-home .swiper-nav-btn').addClass(
      'swiper-button-disabled',
    );
    swiper.allowSlideNext = false;
    swiper.allowSlidePrev = false;
    swiper.allowTouchMove = false;
  }

  enableSwiping(swiper) {
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.allowTouchMove = true;
    $('.info-slider-section-home .swiper-nav-btn').removeClass(
      'swiper-button-disabled',
    );
    this.swiperButtonDisabledHandler(swiper);
  }

  swiperButtonDisabledHandler(swiper) {
    switch (swiper.activeIndex) {
      case swiper.slides.length - 1:
        $('.info-slider-section-home .swiper-next').addClass(
          'swiper-button-disabled',
        );
        break;
      case 0:
        $('.info-slider-section-home .swiper-prev').addClass(
          'swiper-button-disabled',
        );
        break;
    }
  }

  infoSliderSectionHomeSliderOut(slide, slides) {
    gsap.to(slides.find('.quotes-img-wrap, .anim-translate-y, .txt-size-18'), {
      opacity: 0,
      duration: 0.3,
    });
  }

  infoSliderSectionHomeSliderIn(slide, swiperObj) {
    gsap.fromTo(
      slide.find('.quotes-img-wrap'),
      {
        y: 15,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
    );

    gsap.fromTo(
      slide.find('.anim-translate-y'),
      {
        yPercent: 100,
        opacity: 0,
      },
      {
        yPercent: 0,
        stagger: 0.1,
        opacity: 1,
        delay: 0.2,
        onComplete: () => this.enableSwiping(swiperObj),
      },
    );

    gsap.fromTo(
      slide.find('.txt-size-18'),
      {
        x: -10,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        delay: 0.4,
      },
    );
  }

  infoSliderSectionHome(el) {
    if (!$(el).length) return;
    const swiper = $(el);
    // init swiper
    const section = $('.info-slider-section-home');

    swiper.find('.b-lazy').removeClass('b-lazy').addClass('swiper-lazy');

    const slides = swiper.find('.swiper-slide');

    const slider = new Swiper(el, {
      init: false,
      modules: swiperModules,
      slidesPerView: 1,
      speed: 450,
      autoplay: false,
      effect: 'fade',
      simulateTouch: false,
      touchStartPreventDefault: false,
      fadeEffect: {
        crossFade: true,
      },
      lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true,
        loadPrevNextAmount: 10,
      },
      on: {
        init: () =>
          section.find('.swiper-prev').addClass('swiper-button-disabled'),
        beforeTransitionStart: (swiperObj) => {
          // console.log(swiperObj, 'beforeTransitionStart');
          this.disableSwiping(swiperObj);
          this.infoSliderSectionHomeSliderOut(
            swiper.find('.swiper-slide-active'),
            slides,
          );
        },
        transitionEnd: (swiperObj) => {
          // console.log(swiperObj, 'transitionEnd');
          if (this.animSetTimeout) clearTimeout(this.animSetTimeout);
          this.animSetTimeout = setTimeout(() => {
            this.infoSliderSectionHomeSliderIn(
              swiper.find('.swiper-slide-active'),
              swiperObj,
            );
          }, 550);
        },
      },
    });

    if (slides.length > 1) {
      let observer = new IntersectionObserver(
        (entry) => {
          if (entry[0].intersectionRatio > 0) {
            if (!section.hasClass('swiper-active')) {
              slider.init();
              gsap.set(
                slides
                  .not('.swiper-slide-active')
                  .find('.quotes-img-wrap, .anim-translate-y, .txt-size-18'),
                {
                  opacity: 0,
                },
              );

              section.find('.swiper-next').on('click', () => {
                if (slider.activeIndex !== slides.length - 1) {
                  slider.slideNext(slider.passedParams.speed, true);
                }
              });

              section.find('.swiper-prev').on('click', () => {
                if (slider.activeIndex !== 0) {
                  slider.slidePrev(slider.passedParams.speed, true);
                }
              });
              section.addClass('swiper-active');
            }
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0,
        },
      );

      observer.observe(section[0]);
    } else {
      section.find('.swiper-nav-btn-wrap').hide();
    }
  }

  teamInfoSectionMembersSlider(el) {
    if (!$(el).length) return;
    const swiper = $(el);
    // init swiper
    swiper.addClass('swiper-container');
    swiper
      .find('.member-block')
      .addClass('swiper-slide')
      .wrapAll('<div class="swiper-wrapper"></div>');
    swiper.find('.b-lazy').removeClass('b-lazy').addClass('swiper-lazy');

    const slides = swiper.find('.swiper-slide');

    const slider = new Swiper(el, {
      init: false,
      modules: swiperModules,
      slidesPerView: 'auto',
      speed: 400,
      autoplay: false,
      freeMode: {
        enabled: true,
        sticky: true,
        momentum: false,
      },
      grabCursor: true,
      touchRatio: 1.75,
      navigation: {
        nextEl: el + ' .swiper-next',
        prevEl: el + ' .swiper-prev',
      },
      lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true,
        loadPrevNextAmount: 3,
      },
    });

    // if (slides.length > 1) {
    ScrollTrigger.create({
      trigger: el,
      start: '0% 150%',
      invalidateOnRefresh: true,
      once: true,
      onEnter: () => slider.init(),
    });
    // }
    // else {
    //     $(el).find(".swiper-nav-wrap").hide();
    // }
  }

  industrySlider(el) {
    if (!$(el).length) return;
    const swiper = $(el);
    // init swiper
    // swiper.addClass('swiper-container');
    // swiper.children().addClass('swiper-slide').wrapAll('<div class="swiper-wrapper"></div>')
    swiper.find('.b-lazy').removeClass('b-lazy').addClass('swiper-lazy');
    const slides = swiper.find('.swiper-slide');

    const slider = new Swiper(el, {
      init: false,
      modules: swiperModules,
      slidesPerView: 'auto',
      speed: 800,
      autoplay: false,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: function (index, className) {
          return (
            '<a href="#" class="' + className + '">' + (index + 1) + '</a>'
          );
        },
      },
      freeMode: {
        enabled: true,
        sticky: true,
        momentum: false,
      },
      grabCursor: true,
      touchRatio: 1.25,
      lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true,
        loadPrevNextAmount: 10,
      },
    });

    const section = swiper.parents('section');
    if (slides.length > 1) {
      let observer = new IntersectionObserver(
        (entry) => {
          if (entry[0].intersectionRatio > 0) {
            if (!section.hasClass('swiper-active')) {
              slider.init();
              section.addClass('swiper-active');
            }
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0,
        },
      );

      observer.observe(section[0]);
    }
  }

  awardsSlider(el) {
    if (!$(el).length) return;
    const swiper = $(el);
    // init swiper
    // swiper.find('.b-lazy').removeClass('b-lazy').addClass('swiper-lazy');

    const slides = swiper.find('.swiper-slide');

    const slider = new Swiper(el, {
      init: false,
      modules: swiperModules,
      slidesPerView: 'auto',
      speed: 800,
      autoplay: false,
      freeMode: {
        enabled: true,
        sticky: true,
        momentum: false,
      },
      /*
      scrollbar: {
        el: swiper.parents("section").find(".swiper-scrollbar")[0],
        draggable: true,
      },
      */
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: function (index, className) {
          return (
            '<a href="#" class="' + className + '">' + (index + 1) + '</a>'
          );
        },
      },
      // pagination: {
      //     el: ".swiper-pagination",
      //     type: "progressbar",
      // },
      grabCursor: true,
      touchRatio: 1.25,
      lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true,
        loadPrevNextAmount: 10,
      },
    });

    const section = swiper.parents('section');
    if (slides.length > 1) {
      let observer = new IntersectionObserver(
        (entry) => {
          if (entry[0].intersectionRatio > 0) {
            if (!section.hasClass('swiper-active')) {
              slider.init();
              section.addClass('swiper-active');
            }
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0,
        },
      );

      observer.observe(section[0]);
    }
  }

  testimonialsSlider(el) {
    if (!$(el).length) return;
    const swiper = $(el);
    // init swiper
    // swiper.find('.b-lazy').removeClass('b-lazy').addClass('swiper-lazy');

    const slides = swiper.find('.swiper-slide');

    const slider = new Swiper(el, {
      init: false,
      modules: swiperModules,
      slidesPerView: 'auto',
      speed: 800,
      autoplay: false,
      freeMode: {
        enabled: true,
        sticky: true,
        momentum: false,
      },
      grabCursor: true,
      touchRatio: 1.25,
      lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true,
        loadPrevNextAmount: 10,
      },
      navigation: {
        nextEl: '.swiper-nav-next',
      },
    });

    if (slides.length > 1) {
      ScrollTrigger.create({
        trigger: el,
        start: '0% 150%',
        invalidateOnRefresh: true,
        once: true,
        onEnter: () => slider.init(),
      });
    } else {
      // $(el).find(".swiper-nav-wrap").hide();
    }
  }
}

export default Sliders;
