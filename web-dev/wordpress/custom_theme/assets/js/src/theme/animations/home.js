//import $ from "jquery";
import gsap from 'gsap';
import { animationStarting, isMobile, getTotalHeight } from '../helpers/helper';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { isDesktop } from '../helpers/helper';
import { Rive, RuntimeLoader, riveWASMResource } from '@rive-app/canvas-single';
import LocomotiveScroll from 'locomotive-scroll';

RuntimeLoader.setWasmUrl(riveWASMResource);

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

function onScroll({ scroll, limit, velocity, direction, progress }) {
  $('body').trigger('smoothScroll');
}
if (isDesktop()) {
  const locomotiveScroll = new LocomotiveScroll({
    lenisOptions: {
      wrapper: window,
      content: document.documentElement,
      lerp: 1,
      duration: 0.15,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      normalizeWheel: false,
    },
    scrollCallback: onScroll,
  });
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
}

// const desktopAnim = () => {
//     if (!$('').length) return;
//     const section = $('');
//     const tl = gsap.timeline({
//        onStart: () => animationStarting(section),

//         paused: true,
//     })

//     ScrollTrigger.create({
//         trigger: section,
//         start: '0% 75%',
//         end: '+=1%',
//         onEnter: () => tl.timeScale(1).play(),
//         onLeaveBack: () => tl.timeScale(2).reverse()
//     })
// }

const drawImageProp = (ctx, img, x, y, w, h, offsetX, offsetY) => {
  if (arguments.length === 2) {
    x = y = 0;
    w = ctx.canvas.width;
    h = ctx.canvas.height;
  }

  // default offset is center
  offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
  offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

  // keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0;
  if (offsetY < 0) offsetY = 0;
  if (offsetX > 1) offsetX = 1;
  if (offsetY > 1) offsetY = 1;

  var iw = $(img).is('img') ? img.width : img.videoWidth,
    ih = $(img).is('img') ? img.height : img.videoHeight,
    r = Math.min(w / iw, h / ih),
    nw = iw * r, // new prop. width
    nh = ih * r, // new prop. height
    cx,
    cy,
    cw,
    ch,
    ar = 1;

  // decide which gap to fill
  if (nw < w) ar = w / nw;
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated
  nw *= ar;
  nh *= ar;

  // calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  // make sure source rectangle is valid
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  // console.log(cx, cy);

  // fill image in dest. rectangle
  // console.log(img, 'img');
  // console.log(cx, 'cx');
  // console.log(cy, 'cy');
  // console.log(cw, 'cw');
  // console.log(ch, 'ch');
  // console.log(x, 'x');
  // console.log(y, 'y');
  // console.log(w, 'w');
  // console.log(h, 'h');
  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
};

class HeroSectionIconAnimations {
  constructor() {
    this.section = $('.hero-section');
    this.iconsWrap = this.section.find('.hero-icons-wrap');
    this.iconsIntroTl = gsap.timeline({
      paused: true,
    });

    this.animationsArray = [];
    this.timers = [];
    this.createAnims();
  }

  playAnim() {
    this.iconsIntroTl.progress(0).play(0);
  }

  createAnims() {
    this.iconsWrap.each((i, e) => {
      let animWrap = $(e);
      let startAt = animWrap.attr('data-startAt') * 1;

      let thisRive = new Rive({
        src: animWrap.data('url') + animWrap.data('filename'),
        canvas: $(e).find('canvas')[0],
      });

      this.animationsArray.push(thisRive);

      thisRive.on('stop', (event) => {
        if (animWrap.hasClass('hero-icons-1')) {
          if (event.data[0] === 'animation-in') {
            setTimeout(() => {
              thisRive.play(['animation-out']);
            }, 8000);
          }

          if (event.data[0] === 'animation-out') {
            setTimeout(() => {
              thisRive.play(['animation-in']);
            }, 1000);
          }
        }

        if (animWrap.hasClass('hero-icons-2')) {
          if (event.data[0] === 'animation-in') {
            setTimeout(() => {
              thisRive.play(['animation-out']);
            }, 7000);
          }

          if (event.data[0] === 'animation-out') {
            setTimeout(() => {
              thisRive.play(['animation-in']);
            }, 1000);
          }
        }

        if (animWrap.hasClass('hero-icons-3')) {
          if (event.data[0] === 'animation-in') {
            setTimeout(() => {
              thisRive.play(['animation-out']);
            }, 7500);
          }

          if (event.data[0] === 'animation-out') {
            setTimeout(() => {
              thisRive.play(['animation-in']);
            }, 1000);
          }
        }

        if (animWrap.hasClass('hero-icons-4')) {
          if (event.data[0] === 'animation-in') {
            setTimeout(() => {
              thisRive.play(['animation-out']);
            }, 12500);
          }

          if (event.data[0] === 'animation-out') {
            setTimeout(() => {
              thisRive.play(['animation-in']);
            }, 1000);
          }
        }

        if (animWrap.hasClass('hero-icons-5')) {
          if (event.data[0] === 'animation-in') {
            setTimeout(() => {
              thisRive.play(['animation-out']);
            }, 14000);
          }

          if (event.data[0] === 'animation-out') {
            setTimeout(() => {
              thisRive.play(['animation-in']);
            }, 1000);
          }
        }

        if (animWrap.hasClass('hero-icons-6')) {
          if (event.data[0] === 'animation-in') {
            setTimeout(() => {
              thisRive.play(['animation-out']);
            }, 11500);
          }

          if (event.data[0] === 'animation-out') {
            setTimeout(() => {
              thisRive.play(['animation-in']);
            }, 1000);
          }
        }

        if (animWrap.hasClass('hero-icons-7')) {
          if (event.data[0] === 'animation-in') {
            setTimeout(() => {
              thisRive.play(['animation-in']);
            }, 15000);
          }
        }

        if (animWrap.hasClass('hero-icons-8')) {
          if (event.data[0] === 'animation-in') {
            setTimeout(() => {
              thisRive.play(['animation-in']);
            }, 7500);
          }
        }

        if (animWrap.hasClass('hero-icons-9')) {
          setTimeout(() => {
            thisRive.play(['animation-periodic']);
          }, 5000);
        }

        if (animWrap.hasClass('hero-icons-10')) {
          setTimeout(() => {
            thisRive.play(['animation-periodic']);
          }, 10000);
        }
      });

      thisRive.on('load', () => {
        this.iconsIntroTl.call(
          () => {
            thisRive.play(['animation-in']);
          },
          null,
          startAt,
        );

        if (i == this.iconsWrap.length - 1) {
          $(window).on('startIconAnimations', () => {
            this.playAnim();
          });
          $(window).trigger('landingSectionSourceLoaded', {
            state: 'hero-icons',
          });
        }
      });
    });
  }
}

const heroSectionAnimMobile = () => {
  if (!$('.hero-section').length) return;

  const heroSection = $('.hero-section');
  const heroSectionMainImg = $('.hero-section .main-img-wrap');
  const tl = gsap.timeline({
    onStart: () => animationStarting(heroSection),
    defaults: {
      duration: 1,
    },
  });

  tl.call(() => $(window).trigger('headerAnimPlay'), null, 0);

  tl.set(
    heroSection.find('.scroll-btn-border-circle'),
    {
      rotation: -90,
      transformOrigin: '50% 50%',
    },
    0,
  );
  if (heroSection.find('.char').length > 0) {
    tl.to(
      heroSection.find('.char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0,
    );
  }

  tl.fromTo(
    heroSection.find('.txt-post-rtf'),
    {
      x: -10,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
    },
    0.3,
  );

  tl.fromTo(
    heroSectionMainImg,
    {
      scale: 0.5,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
    },
    0.3,
  );

  tl.fromTo(
    heroSection.find('.btn-wrap'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    0.6,
  );

  tl.fromTo(
    heroSection.find('.scroll-btn-border-circle'),
    {
      drawSVG: '0%',
    },
    {
      drawSVG: `100%`,
    },
    0.9,
  );

  tl.fromTo(
    heroSection.find('.scroll-btn-img'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    1.2,
  );
};

const heroSectionMaskAnim = () => {
  if (!$('.hero-section').length) return;

  const section = $('.hero-section');
  const positionEl = section.find('.main-img-wrap');
  const canvas = document.querySelector('.hero-section-canvas');
  const ctx = canvas.getContext('2d');
  const bgElWrap = section.find('.bg-el-wrap');

  if (!positionEl.length) return;

  let canvasWidth = $(canvas).parent().outerWidth() * devicePixelRatio;
  let canvasHeight = $(canvas).parent().outerHeight(true) * devicePixelRatio;
  canvas.width = Math.floor(canvasWidth);
  canvas.height = Math.floor(canvasHeight);
  canvas.style.width = `${Math.floor(canvasWidth)}px`;
  canvas.style.height = `${Math.floor(canvasHeight)}px`;

  let loadedImages = 0;
  let totalImages = 1;
  let img = new Image();

  let arcValues = {
    radiusValue: positionEl.outerHeight(true) / 2,
    xValue: positionEl.offset().left + positionEl.outerHeight(true) / 2,
    yValue:
      Math.abs(section.offset().top - positionEl.offset().top) +
      positionEl.outerHeight(true) / 2,
  };

  img.onload = function () {
    loadedImages += 1;
    $(window).trigger('canvasImgLoaded');
  };
  // console.log(
  //   window.innerWidth,
  //   window.innerWidth > 1025 && window.innerWidth < 1200,
  // );
  // if (window.innerWidth > 1025 && window.innerWidth < 1250) {
  //   console.log('hero mask anim');
  //   img.src = _root + 'media/images/home/hero.png';
  // } else if (window.innerWidth > 1250 && window.innerWidth < 1400) {
  //   console.log('hero mask anim');
  //   // img.src = _root + 'media/images/home/hero-tablet.png';
  //   img.src = _root + 'media/images/home/main-img-desktop_new.webp';
  // } else {
  img.src = _root + 'media/images/home/main-img-desktop_new.webp';
  // }

  $(window).on('canvasImgLoaded', () => {
    if (loadedImages == totalImages) {
      requestAnimationFrame(animate);

      gsap.fromTo(
        bgElWrap,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      );

      gsap.fromTo(
        arcValues,
        {
          radiusValue: section.outerWidth(),
        },
        {
          radiusValue: positionEl.outerHeight(true) / 2,
          duration: 1,
          delay: 0.5,
          onUpdate: () => requestAnimationFrame(animate),
        },
      );
    }
  });

  function animate() {
    // console.log('in animate')
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'source-over';

    ctx.beginPath();
    ctx.arc(
      arcValues.xValue,
      arcValues.yValue,
      arcValues.radiusValue,
      0,
      2 * Math.PI,
      false,
    );
    ctx.fillStyle = '#002ea6';
    ctx.fill();

    ctx.globalCompositeOperation = 'source-atop';

    let x = 0,
      y = 0,
      offsetX = 0.5,
      offsetY = 0;

    switch (true) {
      case window.innerWidth > 1900:
        console.info('Size is over 1900');
        x = 0;
        y = 50;
        offsetX = 0.751;
        offsetY = 0.15;
        break;
      case window.innerWidth > 1700 && window.innerWidth <= 1900:
        console.info('Size is between 1700 and 1900');
        x = 0;
        12;
        y = 125;
        offsetX = 0.5;
        offsetY = 0.5;
        break;
      case window.innerWidth > 1250 && window.innerWidth <= 1700:
        console.info('Size is between 1250 and 1700');
        x = 0;
        y = 120;
        offsetX = 0.721;
        offsetY = 0;
        break;
      case window.innerWidth > 1024 && window.innerWidth <= 1250:
        console.info('Size is between 1025 and 1250');
        x = 0;
        y = 100;
        offsetX = 0.5;
        offsetY = 1;
        break;
      default:
        console.info('Size is under 1025');
    }
    // console.log(x, y, offsetX, offsetY);
    drawImageProp(ctx, img, x, y, innerWidth, innerHeight, offsetX, offsetY);

    // drawImageProp(ctx, img, 0, 120, innerWidth, innerHeight, 1, 1);
  }

  $(window).on('resizeObserverTrigger', () => {
    canvasWidth = $(canvas).parent().outerWidth() * devicePixelRatio;
    canvasHeight = $(canvas).parent().outerHeight(true) * devicePixelRatio;
    canvas.width = Math.floor(canvasWidth);
    canvas.height = Math.floor(canvasHeight);
    canvas.style.width = `${Math.floor(canvasWidth)}px`;
    canvas.style.height = `${Math.floor(canvasHeight)}px`;

    arcValues = {
      radiusValue: positionEl.outerHeight(true) / 2,
      xValue: positionEl.position().left + positionEl.outerHeight(true) / 2,
      yValue:
        Math.abs(section.offset().top - positionEl.offset().top) +
        positionEl.outerHeight(true) / 2,
    };

    gsap.set(bgElWrap, {
      opacity: 1,
    });

    gsap.set(arcValues, {
      radiusValue: positionEl.outerHeight(true) / 2,
    });

    requestAnimationFrame(animate);
  });

  // $(window).on('resize',
  //     debounce(() => {
  //     }, 10)
  // )
};

const heroSectionAnimDesktop = () => {
  if (!$('.hero-section').length) return;
  let iconAnimationsLoaded = false;
  const heroSection = $('.hero-section');
  const tl = gsap.timeline({
    paused: true,
    onStart: () => animationStarting(heroSection),
    defaults: {
      duration: 1,
    },
  });

  tl.set(
    heroSection.find('.scroll-btn-border-circle'),
    {
      rotation: -90,
      transformOrigin: '50% 50%',
    },
    0,
  );

  tl.call(
    () => {
      $(window).trigger('headerAnimPlay');
      $(window).trigger('startIconAnimations');
    },
    null,
    0.75,
  );

  if (heroSection.find('.char').length > 0) {
    tl.to(
      heroSection.find('.char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0.5,
    );
  }
  if (heroSection.find('.txt-post-rtf').length > 0) {
    tl.fromTo(
      heroSection.find('.txt-post-rtf'),
      {
        x: -10,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
      },
      0.8,
    );
  }
  if (heroSection.find('.scroll-btn-border-circle').length > 0) {
    tl.fromTo(
      heroSection.find('.scroll-btn-border-circle'),
      {
        drawSVG: '0%',
      },
      {
        drawSVG: `100%`,
      },
      0.8,
    );
  }
  if (heroSection.find('.payments-section-img').length > 0) {
    tl.fromTo(
      heroSection.find('.payments-section-img'),
      {
        yPercent: 50,
        scale: 0.75,
        opacity: 0,
      },
      {
        yPercent: 0,
        scale: 1,
        opacity: 1,
      },
      0.5,
    );
  }
  if (heroSection.find('.btn-wrap').length > 0) {
    tl.fromTo(
      heroSection.find('.btn-wrap'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      1.1,
    );
  }

  tl.fromTo(
    heroSection.find('.scroll-btn-img'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    1.4,
  );

  $(window).on('landingSectionSourceLoaded', (e, val) => {
    switch (val.state) {
      case 'hero-icons':
        iconAnimationsLoaded = true;
        break;
      case 'hero-image':
        heroImageLoaded = true;
        break;
    }

    if (iconAnimationsLoaded) {
      tl.play();
    }
  });
};

const paymentsSectionMaskAnim = () => {
  if (!$('.payments-section-home').length) return;
  const heroSection = $('.hero-section');
  const section = $('.payments-section-home');
  const bgElWrap = section.find('.bg-el-wrap');
  const paymentsSectionImg = heroSection.find('.payments-section-position-el');
  const canvas = document.querySelector('.payments-section-canvas');
  const ctx = canvas.getContext('2d');

  let canvasWidth = $(canvas).parent().outerWidth() * devicePixelRatio;
  let canvasHeight = $(canvas).parent().outerHeight(true) * devicePixelRatio;
  canvas.width = Math.floor(canvasWidth);
  canvas.height = Math.floor(canvasHeight);
  canvas.style.width = `${Math.floor(canvasWidth)}px`;
  canvas.style.height = `${Math.floor(canvasHeight)}px`;

  let startingImageSize = paymentsSectionImg.outerWidth();
  let startingImageOffsetTop = Math.abs(
    heroSection.offset().top - paymentsSectionImg.offset().top,
  );
  let startingImageOffsetLeft = paymentsSectionImg.offset().left;

  let animatedImageSize = {
    widthValue: paymentsSectionImg.outerWidth(),
    heightValue: paymentsSectionImg.outerHeight(true),
  };

  let animatedCircleSize = {
    radius: paymentsSectionImg.outerHeight(true),
  };

  let animatedCirclePosition = {
    xValue: startingImageOffsetLeft + startingImageSize / 2,
    yValue: startingImageOffsetTop + startingImageSize / 2,
  };

  let animatedImagePosition = {
    xValue: startingImageOffsetLeft,
    yValue: startingImageOffsetTop,
  };

  let loadedImages = 0;
  let totalImages = 1;
  let img = new Image();

  $(window).on('canvasImgLoaded', () => {
    if (loadedImages == totalImages) {
      requestAnimationFrame(animate);
      createTl();
    }
  });

  img.onload = function () {
    loadedImages += 1;
    $(window).trigger('canvasImgLoaded');
  };
  img.src = _root + 'media/images/home/accept-payments-section-bgr.webp';

  let tl;
  let parallaxTween;
  let pinTween;

  // anims

  const createTl = () => {
    tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'none',
      },
    });

    tl.call(() => {
      if (!bgElWrap.hasClass('initial-scroll')) {
        bgElWrap.addClass('initial-scroll');
        gsap.set(bgElWrap, {
          opacity: 1,
        });

        gsap.killTweensOf(heroSection.find('.payments-section-img'));
        gsap.set(heroSection.find('.payments-section-img'), { opacity: 0 });
      }
    }, 0);

    tl.fromTo(
      animatedImageSize,
      {
        widthValue: paymentsSectionImg.outerWidth(),
        heightValue: paymentsSectionImg.outerHeight(true),
      },
      {
        widthValue: () => Math.ceil(section.outerWidth()),
        heightValue: () => Math.ceil(section.outerHeight(true)),
      },
      0,
    );

    tl.fromTo(
      animatedImagePosition,
      {
        xValue: startingImageOffsetLeft,
        yValue: startingImageOffsetTop,
      },
      {
        xValue: 0,
        yValue: 0,
      },
      0,
    );

    tl.fromTo(
      animatedCirclePosition,
      {
        xValue: startingImageOffsetLeft + startingImageSize / 2,
        yValue: startingImageOffsetTop + startingImageSize / 2,
      },
      {
        xValue: () => innerWidth / 2,
        yValue: () => innerHeight / 2,
      },
      0,
    );

    tl.fromTo(
      animatedCircleSize,
      {
        radius: paymentsSectionImg.outerHeight(true),
      },
      {
        radius: () => Math.ceil(section.outerHeight(true)) * 0.9,
      },
      0,
    );

    tl.fromTo(
      animatedCircleSize,
      {
        radius: () => Math.ceil(section.outerHeight(true)) * 0.9,
      },
      {
        radius: () =>
          Math.ceil(section.outerWidth()) *
          (window.innerWidth <= 1250 ? 2.5 : 1.7),
      },
      0.5,
    );

    // ScrollTrigger.create({
    //     trigger: heroSection,
    //     start: '0% 0%',
    //     end: '0% 25%',
    //     endTrigger: section,
    //     scrub: true,
    //     animation: tl,
    // })

    pinTween = gsap.fromTo(
      section.find('.section-transform-container'),
      {
        y: () => -heroSection.outerHeight(true),
      },
      {
        y: 0,
        ease: 'none',
        paused: true,
      },
    );

    parallaxTween = gsap.fromTo(
      animatedImagePosition,
      {
        yValue: 0,
      },
      {
        yValue: 200,
        ease: 'none',
        paused: true,
      },
    );
  };

  // anim controls
  let heroSectionOffsetTop = getTotalHeight(heroSection.prevAll('section'));
  let sectionOffsetTop = getTotalHeight(section.prevAll('section'));
  let heroSectionHeight = heroSection.outerHeight(true);
  let sectionHeight = section.outerHeight(true);
  let pinTweenDistance = sectionOffsetTop;
  let animationIsPlaying = true;
  let contentOffset =
    $('#main-content').outerHeight(true) - $('#main-content').height();

  let progressTween = () => {
    if (typeof tl == 'undefined') return;

    let elPosition = window.scrollY - heroSectionOffsetTop - contentOffset;

    let durationDistance = heroSectionHeight;

    let currentProgress = elPosition / durationDistance;

    tl.progress(currentProgress);
  };

  let progressTween2 = () => {
    if (typeof parallaxTween == 'undefined') return;

    let elPosition = window.scrollY - sectionOffsetTop - contentOffset;

    let currentProgress = elPosition / sectionHeight;

    parallaxTween.progress(currentProgress);
  };

  let progressTween3 = () => {
    if (typeof pinTween == 'undefined') return;

    let elPosition = window.scrollY - heroSectionOffsetTop - contentOffset;

    let currentProgress = elPosition / pinTweenDistance;

    pinTween.progress(currentProgress);
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0,
  };

  let observer = new IntersectionObserver((entry) => {
    // console.log(window.scrollY < getTotalHeight(section.prevAll('section')), "window.scrollY < getTotalHeight(section.prevAll('section'))");
    // console.log(getTotalHeight(section.prevAll('section')), "getTotalHeight(section.prevAll('section'))");
    // console.log(window.scrollY, "window.scrollY");
    if (
      entry[0].intersectionRatio > 0 &&
      window.scrollY < getTotalHeight(section.prevAll('section'))
    ) {
      if (!section.hasClass('aimating-mask-anim')) {
        gsap.ticker.add(progressTween);
        section.addClass('aimating-mask-anim');
        // console.log(entry[0], 'maskanim in')
      }
    } else {
      gsap.ticker.remove(progressTween);
      section.removeClass('aimating-mask-anim');
      // console.log(entry[0], 'maskanim else')
    }
  }, observerOptions);

  observer.observe(heroSection[0]);

  //
  const observerOptions2 = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.01,
  };

  let observer2 = new IntersectionObserver((entry) => {
    if (entry[0].intersectionRatio > 0.01) {
      if (!section.hasClass('animating-parallax-img')) {
        gsap.ticker.add(progressTween2);
        section.addClass('animating-parallax-img');
        animationIsPlaying = true;
        // console.log(entry[0], 'parallaxTween in')
      }
    } else {
      gsap.ticker.remove(progressTween2);
      section.removeClass('animating-parallax-img');
      if (entry[0].boundingClientRect.y < 0) animationIsPlaying = false;
      // console.log(entry[0], 'parallaxTween else')
    }
  }, observerOptions2);

  observer2.observe(section[0]);

  // animate

  function animate() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(
      animatedCirclePosition.xValue,
      animatedCirclePosition.yValue,
      animatedCircleSize.radius / 2,
      0,
      2 * Math.PI,
      false,
    );
    ctx.fillStyle = '#002ea6';
    ctx.fill();
    ctx.globalCompositeOperation = 'source-atop';

    drawImageProp(
      ctx,
      img,
      animatedImagePosition.xValue,
      animatedImagePosition.yValue,
      animatedImageSize.widthValue,
      animatedImageSize.heightValue,
      0.5,
      0.5,
    );
  }
  // $(window).on('scroll', () => {
  $('body').on('smoothScroll', () => {
    if (!animationIsPlaying) return;

    requestAnimationFrame(animate);
    progressTween3();
  });
  // events
  // $(window).on('scroll', () => {
  //   // console.log(animationIsPlaying)
  //   if (!animationIsPlaying) return;
  //   requestAnimationFrame(animate);
  //   progressTween3();
  // });

  $(window).on('resizeObserverTrigger', () => {
    tl.kill();
    parallaxTween.kill();
    tl = null;
    parallaxTween = null;

    canvasWidth = $(canvas).parent().outerWidth() * devicePixelRatio;
    canvasHeight = $(canvas).parent().outerHeight(true) * devicePixelRatio;
    canvas.width = Math.floor(canvasWidth);
    canvas.height = Math.floor(canvasHeight);
    canvas.style.width = `${Math.floor(canvasWidth)}px`;
    canvas.style.height = `${Math.floor(canvasHeight)}px`;

    startingImageSize = paymentsSectionImg.outerWidth();
    startingImageOffsetTop = Math.abs(
      heroSection.offset().top - paymentsSectionImg.offset().top,
    );

    startingImageOffsetLeft = paymentsSectionImg.offset().left;

    animatedImageSize = {
      widthValue: paymentsSectionImg.outerWidth(),
      heightValue: paymentsSectionImg.outerHeight(true),
    };

    animatedCircleSize = {
      radius: paymentsSectionImg.outerHeight(true),
    };

    animatedCirclePosition = {
      xValue: startingImageOffsetLeft + startingImageSize / 2,
      yValue: startingImageOffsetTop + startingImageSize / 2,
    };

    animatedImagePosition = {
      xValue: startingImageOffsetLeft,
      yValue: startingImageOffsetTop,
    };

    // const eleRect = $('[data-scroll-container]')[0].getBoundingClientRect();
    // const targetRect = heroSection[0].getBoundingClientRect();

    // // Calculate the top and left positions
    // const top = eleRect.top - targetRect.top;
    // console.log(top);

    heroSectionOffsetTop = getTotalHeight(heroSection.prevAll('section'));
    heroSectionHeight = heroSection.outerHeight(true);
    sectionHeight = section.outerHeight(true);
    sectionOffsetTop = getTotalHeight(section.prevAll('section'));
    pinTweenDistance = sectionOffsetTop;
    contentOffset =
      $('#main-content').outerHeight(true) - $('#main-content').height();

    createTl();
    progressTween();
    progressTween2();
    progressTween3();
    requestAnimationFrame(animate);
  });

  // $(window).on('resize',
  //     debounce(() => {

  //     }, 150)
  // )
};

const paymentsSectionHomeDesktop = () => {
  if (!$('.payments-section-home').length) return;
  const section = $('.payments-section-home');
  const heroSection = $('.hero-section');
  let heroSectionOffsetTop = getTotalHeight(heroSection.prevAll('section'));
  let heroSectionHeight = heroSection.outerHeight(true);

  const tl = gsap.timeline({
    onStart: () => {
      animationStarting(section);
      gsap.set(section.find('.section-transform-container'), {
        pointerEvents: 'all',
      });
      gsap.set(section.find('.section-content-wrapper'), {
        opacity: 1,
        pointerEvents: 'all',
      });
    },
    onReverseComplete: () => {
      gsap.set(section.find('.section-transform-container'), {
        pointerEvents: 'none',
      });
      gsap.set(section.find('.section-content-wrapper'), {
        opacity: 0,
        pointerEvents: 'none',
      });
    },
    paused: true,
  });
  if (heroSection.find('.txt-content').length > 0) {
    tl.fromTo(
      heroSection.find('.txt-content'),
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
      0,
    );
  }
  if (heroSection.find('.txt-size-12').length > 0) {
    tl.fromTo(
      section.find('.txt-size-12'),
      {
        y: 15,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      0,
    );
  }
  if (section.find('.char').length > 0) {
    tl.to(
      section.find('.char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0.3,
    );
  }
  if (heroSection.find('.txt-post-rtf').length > 0) {
    tl.fromTo(
      section.find('.txt-post-rtf'),
      {
        x: -10,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
      },
      0.6,
    );
  }
  if (heroSection.find('.top-left-petal').length > 0) {
    tl.fromTo(
      section.find('.top-left-petal'),
      {
        opacity: 0,
      },
      {
        opacity: 0.2,
      },
      0.9,
    );
  }
  if (heroSection.find('.top-right-petal').length > 0) {
    tl.fromTo(
      section.find('.top-right-petal'),
      {
        rotation: -90,
        transformOrigin: '0% 100%',
        opacity: 0,
      },
      {
        opacity: 1,
        rotation: 0,
        duration: 0.75,
        transformOrigin: '0% 100%',
      },
      1,
    );
  }
  if (heroSection.find('.bottom-right-petal').length > 0) {
    tl.fromTo(
      section.find('.bottom-right-petal'),
      {
        rotation: -180,
        transformOrigin: '0% 0%',
        opacity: 0,
      },
      {
        opacity: 1,
        rotation: 0,
        duration: 0.75,
        transformOrigin: '0% 0%',
      },
      1.1,
    );
  }
  if (heroSection.find('.bottom-left-petal').length > 0) {
    tl.fromTo(
      section.find('.bottom-left-petal'),
      {
        rotation: -270,
        transformOrigin: '100% 0%',
        opacity: 0,
      },
      {
        opacity: 0.2,
        rotation: 0,
        duration: 0.75,
        transformOrigin: '100% 0%',
      },
      1.2,
    );
  }
  if (heroSection.find('.background-petal-svg').length > 0) {
    tl.fromTo(
      section.find('.background-petal-svg'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.2,
      },
      0.9,
    );
  }
  if (heroSection.find('.single-block').length > 0) {
    tl.fromTo(
      section.find('.single-block'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.2,
      },
      0.9,
    );
  }

  let animationsArray = [];

  section.find('.background-draw-svg').each((i, e) => {
    let canvas = $(e);

    let thisRive = new Rive({
      src: canvas.data('url'),
      canvas: e,
      autoplay: false,
    });

    animationsArray.push(thisRive);
  });

  const playAnimFunc = (index) => {
    // console.log(index, 'in')
    animationsArray[index].play();
  };

  // ScrollTrigger.create({
  //     trigger: section,
  //     start: '0% 40%',
  //     end: '100% 0%',
  //     onEnter: () => {
  //         gsap.killTweensOf(playAnimFunc);
  //         section.find('.background-draw-svg').each((i,e) => {
  //             gsap.delayedCall(parseInt($(e).data('delay')), playAnimFunc, [i]);
  //         });
  //     },
  //     onEnterBack: () => {
  //         gsap.killTweensOf(playAnimFunc);
  //         section.find('.background-draw-svg').each((i,e) => {
  //             gsap.delayedCall(parseInt($(e).data('delay')), playAnimFunc, [i]);
  //         });
  //     },
  //     onLeave: () => {
  //         gsap.killTweensOf(playAnimFunc);
  //         animationsArray.map(e => {
  //             e.pause();
  //             e.scrub('animation-draw', 0);
  //         });
  //     },
  //     onLeaveBack: () => {
  //         gsap.killTweensOf(playAnimFunc);
  //         animationsArray.map(e => {
  //             e.pause();
  //             e.scrub('animation-draw', 0);
  //         });
  //     },
  // })

  const observerOptions3 = {
    root: null,
    threshold: [0, 0.6],
  };

  const Observer3 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (
        (entry.intersectionRatio == 0 && !entry.isIntersecting) ||
        (entry.intersectionRatio < 0.6 &&
          entry.isIntersecting &&
          entry.boundingClientRect.y > 0)
      ) {
        gsap.killTweensOf(playAnimFunc);
        animationsArray.map((e) => {
          e.pause();
          e.scrub('animation-draw', 0);
        });
        section.removeClass('animated-in-icons');
      }
      if (entry.intersectionRatio >= 0.6 && entry.isIntersecting) {
        if (!section.hasClass('animated-in-icons')) {
          gsap.killTweensOf(playAnimFunc);
          section.find('.background-draw-svg').each((i, e) => {
            gsap.delayedCall(parseInt($(e).data('delay')), playAnimFunc, [i]);
          });
          section.addClass('animated-in-icons');
        }
      }

      if (
        entry.intersectionRatio < 0.1 &&
        entry.isIntersecting &&
        entry.boundingClientRect.y < 0
      ) {
        if (!section.hasClass('animated-in-icons')) {
          gsap.killTweensOf(playAnimFunc);
          section.find('.background-draw-svg').each((i, e) => {
            gsap.delayedCall(parseInt($(e).data('delay')), playAnimFunc, [i]);
          });
          section.addClass('animated-in-icons');
        }
      }
    });
  }, observerOptions3);

  Observer3.observe(section[0]);

  // ScrollTrigger.create({
  //     trigger: section,
  //     start: '0% 40%',
  //     end: '+=1%',
  //     toggleActions: 'none none none none',
  //     animation: tl,
  //     onEnter: () => tl.timeScale(1).play(),
  //     onLeaveBack: () => tl.timeScale(3).reverse(),
  // })

  const observerOptions2 = {
    root: null,
    threshold: 0.6,
  };

  const Observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.6) {
        if (!section.hasClass('animated-in')) {
          tl.timeScale(1).play();
          section.addClass('animated-in');
        }
      } else {
        if (entry.boundingClientRect.y > 0) {
          tl.timeScale(3).reverse();
          section.removeClass('animated-in');
        }
      }
    });
  }, observerOptions2);

  Observer2.observe(section[0]);

  let parallaxTween = gsap.fromTo(
    heroSection.find('.txt-content'),
    {
      yPercent: 0,
    },
    {
      yPercent: -50,
      paused: true,
    },
  );

  let parallaxTweenDistance = heroSectionHeight * 0.75;
  let contentOffset =
    $('#main-content').outerHeight(true) - $('#main-content').height();

  let progressTween = () => {
    if (typeof tl == 'undefined') return;

    const elPosition = window.scrollY - heroSectionOffsetTop - contentOffset;

    let currentProgress = elPosition / parallaxTweenDistance;

    // if (currentProgress > 1 || currentProgress < 0) return;
    if (currentProgress > 1) currentProgress = 1;
    if (currentProgress < 0) currentProgress = 0;

    parallaxTween.progress(currentProgress);
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0,
  };

  let observer = new IntersectionObserver((entry) => {
    if (
      entry[0].intersectionRatio > 0 &&
      window.scrollY < getTotalHeight(section.prevAll('section'))
    ) {
      gsap.ticker.add(progressTween);
      // console.log(entry[0], 'parallaxTween in')
    } else {
      gsap.ticker.remove(progressTween);
      // console.log(entry[0], 'parallaxTween else')
    }
  }, observerOptions);

  observer.observe(heroSection[0]);
  $(window).on('resizeObserverTrigger', () => {
    heroSectionOffsetTop = getTotalHeight(heroSection.prevAll('section'));
    heroSectionHeight = heroSection.outerHeight(true);
    parallaxTweenDistance = heroSectionHeight * 0.75;
    contentOffset =
      $('#main-content').outerHeight(true) - $('#main-content').height();

    progressTween();
  });

  // $(window).on('resize',
  //     debounce(() => {
  //     }, 150)
  // )
};

const paymentsSectionHomeMobile = () => {
  if (!$('.payments-section-home').length) return;
  const section = $('.payments-section-home');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  tl.fromTo(
    section.find('.bg-el-wrap'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    0,
  );

  tl.fromTo(
    section.find('.txt-size-12'),
    {
      y: 15,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    0,
  );
  if (section.find('.char').length > 0) {
    tl.to(
      section.find('.char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0.3,
    );
  }

  tl.fromTo(
    section.find('.txt-post-rtf'),
    {
      x: -10,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
    },
    0.6,
  );

  tl.fromTo(
    section.find('.single-block'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.2,
    },
    0.9,
  );

  ScrollTrigger.create({
    trigger: section,
    start: '0% 75%',
    end: '+=1%',
    toggleActions: 'none none none none',
    animation: tl,
    onEnter: () => tl.timeScale(1).play(),
    onLeaveBack: () => tl.timeScale(2).reverse(),
  });

  // const observerOptions = {
  //     root: null,
  // rootMargin: `0px 0px -25% 0px`,
  // threshold: 0,
  // };

  // const Observer = new IntersectionObserver(
  //     entries => {
  //         entries.forEach(entry => {
  //             if (entry.intersectionRatio > 0) {
  //                 if (!section.hasClass('animated-in')) {
  //                     tl.timeScale(1).play()
  //                     section.addClass('animated-in');
  //                 }
  //             } else {
  //                 if (entry.boundingClientRect.y > 0) {
  //                     tl.timeScale(2).reverse()
  //                     section.removeClass('animated-in');
  //                 }
  //             }
  //         });
  //     },
  //     observerOptions
  // );

  // Observer.observe(section[0]);
};

class SolutionsSectionHome {
  constructor() {
    this.section = $('.solutions-section-home');
    this.blocksList = this.section.find('.single-block');
    this.animationsList = [];
    this.hoverAnimationsList = [];

    this.createHovertl();
    this.createTl();
    this.sectionAnim();

    $(window).on('resizeObserverTrigger', () => {
      let progress = 0;
      this.animationsList.forEach((e) => {
        if (e.animation.progress() > 0) {
          progress = 1;
        }
      });

      this.killTl();
      this.createHovertl();
      this.createTl();

      if (progress > 0) {
        this.animationsList.forEach((e) => {
          e.animation.progress(1);
        });
      }
    });

    // $(window).on('resize',
    //     debounce(() => {

    //     }, 10)
    // )

    // if (!isMobile()) {
    this.section.on('mouseenter focusin touchstart', '.single-block', (e) => {
      let item = $(e.currentTarget);
      if (!item.hasClass('animated-in')) return;

      gsap.to(item.find('.txt-size-22'), {
        y: -10,
      });

      this.section.find('.single-block').each((i, e) => {
        if ($(e).is(item)) {
          this.mouseEventAnim(i, item, 'mouseenter');
        }
      });
    });

    this.section.on('mouseleave focusout touchend', '.single-block', (e) => {
      let item = $(e.currentTarget);
      gsap.to(item.find('.txt-size-22'), {
        y: 0,
      });

      this.section.find('.single-block').each((i, e) => {
        if ($(e).is(item)) {
          this.mouseEventAnim(i, item, 'mouseleave');
        }
      });
    });
    // } else {

    // }
  }

  mouseEventAnim(index, item, eventType) {
    let anim;

    this.hoverAnimationsList.forEach((e, i) => {
      // console.log(e, i, index)
      if (e.elIndex === index) {
        anim = e.animation;
      }
    });

    if (eventType === 'mouseenter') {
      anim.play();
    } else {
      anim.reverse();
    }
  }

  playTl(index) {
    let anim;

    this.animationsList.forEach((e, i) => {
      // console.log(e, i, index)
      if (e.elIndex === index) {
        anim = e.animation;
      }
    });

    anim.timeScale(1).play(0);
  }

  killTl() {
    this.animationsList.forEach((e) => {
      e.animation.kill();
    });
    this.animationsList = [];

    this.hoverAnimationsList.forEach((e) => {
      e.animation.kill();
    });
    this.hoverAnimationsList = [];

    gsap.set([this.section.find('svg'), this.section.find('svg').children()], {
      clearProps: true,
    });
  }

  createHovertl() {
    this.blocksList.each((i, e) => {
      let block = $(e);
      let svg = block.find('svg');
      let tl;
      switch (true) {
        case svg.hasClass('retail-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          tl.fromTo(
            svg.find('.upper-path'),
            {
              yPercent: 0,
              opacity: 1,
            },
            {
              yPercent: 100,
              opacity: 0,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            0,
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });

          break;
        case svg.hasClass('professional-services-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          tl.fromTo(
            svg.find('.svg-circle'),
            {
              yPercent: 0,
            },
            {
              yPercent: 100,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            0,
          );

          tl.fromTo(
            svg.find('.svg-bottom'),
            {
              yPercent: 0,
            },
            {
              yPercent: -90,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            0,
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });

          break;

        case svg.hasClass('grocery-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          tl.fromTo(
            svg.find('.svg-top'),
            {
              yPercent: 0,
            },
            {
              yPercent: 100,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            0,
          );

          tl.fromTo(
            svg.find('.svg-bottom'),
            {
              yPercent: 0,
            },
            {
              yPercent: -100,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            0,
          );
          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;

        case svg.hasClass('health-wellness-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          tl.to(
            svg,
            {
              rotation: '+=45',
              duration: 0.75,
              ease: 'power2.inOut',
            },
            0,
          );

          tl.to(
            svg.find('.st0'),
            {
              x: -5,
              y: 5,
              ease: 'power2.inOut',
            },
            0.5,
          );

          tl.to(
            svg.find('.st1'),
            {
              x: 5,
              y: -5,
              ease: 'power2.inOut',
            },
            0.5,
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('ecommerce-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          const positionCircle2 = MotionPathPlugin.getRelativePosition(
            svg.find('.circle-2')[0],
            svg.find('.path-outer')[0],
            [0.5, 0.5],
            [0.5, 0.5],
          );

          const positionCircle3 = MotionPathPlugin.getRelativePosition(
            svg.find('.circle-3')[0],
            svg.find('.path-outer')[0],
            [0.5, 0.5],
            [0.5, 0.5],
          );

          gsap.set(svg.find('.circle-1'), {
            transformOrigin: '50% 50%',
          });

          tl.to(
            svg.find('.circle-3'),
            {
              x: '+=' + positionCircle3.x,
              y: '+=' + positionCircle3.y,
            },
            0,
          );

          tl.to(
            svg.find('.circle-2'),
            {
              x: '+=' + positionCircle2.x,
              y: '+=' + positionCircle2.y,
            },
            0.1,
          );

          tl.fromTo(
            svg.find('.circle-1'),
            {
              scale: 1,
            },
            {
              scale: 1.75,
            },
            0.3,
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('restaurant-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          gsap.set(svg.find('.st1'), {
            transformOrigin: '50% 0%',
          });

          tl.fromTo(
            svg.find('.st1'),
            {
              rotation: 0,
            },
            {
              rotation: 180,
              ease: 'power2.inOut',
            },
            0,
          );

          tl.fromTo(
            svg.find('.circle-el'),
            {
              scale: 1,
            },
            {
              scale: 1.75,
              ease: 'power2.inOut',
            },
            0.25,
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('hospitality-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          const svgEl6CirclePosition = MotionPathPlugin.getRelativePosition(
            svg.find('.circle-el')[0],
            svg.find('.path-outer')[0],
            [0.5, 0.5],
            [0.5, 0.6],
          );

          gsap.set(svg.find('.circle-el'), {
            transformOrigin: '50% 50%',
          });

          tl.fromTo(
            svg.find('.circle-el'),
            {
              scale: 1,
            },
            {
              scale: 0.75,
            },
            0,
          );

          tl.to(
            svg.find('.circle-el'),
            {
              x: '+=' + svgEl6CirclePosition.x,
              y: '+=' + svgEl6CirclePosition.y,
            },
            '-=.25',
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('fashion-boutiques-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          tl.to(
            svg,
            {
              rotation: '-=45',
              duration: 0.75,
              ease: 'power2.inOut',
            },
            0,
          );

          tl.to(
            svg.find('.path-bottom'),
            {
              x: -5,
              y: -5,
              ease: 'power2.inOut',
            },
            0.5,
          );

          tl.to(
            svg.find('.path-top'),
            {
              x: 5,
              y: 5,
              ease: 'power2.inOut',
            },
            0.5,
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('homeware-store-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          tl.fromTo(
            svg.find('.upper-path'),
            {
              yPercent: 0,
              opacity: 1,
            },
            {
              yPercent: 100,
              opacity: 0,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            0,
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('professional-services-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          tl.fromTo(
            block.find('.professional-services-svg.svg-bottom'),
            {
              rotationX: 0,
            },
            {
              rotationX: 180,
              duration: 0.75,
            },
            0,
          );

          tl.to(
            block.find('.professional-services-svg.svg-circle'),
            {
              yPercent: 15,
            },
            0.3,
          );

          tl.to(
            block.find('.professional-services-svg.svg-circle'),
            {
              scale: 1.25,
              ease: 'power2.inOut',
            },
            0.5,
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('wholesale-icon-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          tl.to(
            svg,
            {
              rotation: '+=180',
              duration: 0.75,
              ease: 'power2.inOut',
            },
            0,
          );

          tl.fromTo(
            svg.find('.circle-el'),
            {
              scale: 1,
            },
            {
              scale: 0.75,
              duration: 0.75,
              ease: 'power2.inOut',
            },
            0.5,
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('beauty-salons-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          const positionPath = MotionPathPlugin.getRelativePosition(
            svg.find('circle')[0],
            svg.find('path')[0],
            [0.5, 0],
            [0.5, 1],
          );

          tl.fromTo(
            svg.find('circle'),
            {
              scale: 1,
            },
            {
              scale: 0.85,
            },
            0,
          );

          tl.fromTo(
            svg.find('path'),
            {
              y: 0,
            },
            {
              y: -positionPath.y,
            },
            0.2,
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('non-profit-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          const positionWave1 = MotionPathPlugin.getRelativePosition(
            svg.find('.cls-1')[0],
            svg[0],
            [1, 0.5],
            [1, 0.5],
          );

          const positionWave2 = MotionPathPlugin.getRelativePosition(
            svg.find('.cls-2')[0],
            svg[0],
            [0, 0.5],
            [0, 0.5],
          );

          tl.fromTo(
            svg.find('.cls-1'),
            {
              x: 0,
            },
            {
              x: positionWave1.x,
            },
            0,
          );

          tl.fromTo(
            svg.find('.cls-2'),
            {
              x: 0,
            },
            {
              x: positionWave2.x,
            },
            0,
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('hardware-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          tl.to(
            svg,
            {
              rotation: '+=90',
              duration: 0.75,
              ease: 'power2.inOut',
            },
            0,
          );

          tl.to(
            svg.find('.cls-2'),
            {
              y: 5,
              ease: 'power2.inOut',
            },
            0.5,
          );

          tl.to(
            svg.find('.cls-1'),
            {
              y: -5,
              ease: 'power2.inOut',
            },
            0.5,
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('wellness-icon-svg'):
          tl = gsap.timeline({
            paused: true,
          });

          tl.to(
            svg,
            {
              rotation: '+=90',
              duration: 0.75,
              ease: 'power2.inOut',
            },
            0,
          );

          tl.to(
            svg.find('.cls-2'),
            {
              y: 5,
              ease: 'power2.inOut',
            },
            0.5,
          );

          tl.to(
            svg.find('.cls-1'),
            {
              y: -5,
              ease: 'power2.inOut',
            },
            0.5,
          );

          this.hoverAnimationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
      }
    });
  }

  createTl() {
    this.blocksList.each((i, e) => {
      let block = $(e);
      let svg = block.find('svg');
      let tl;
      switch (true) {
        case svg.hasClass('retail-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          tl.fromTo(
            svg.find('.lower-path'),
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
            },
          );

          tl.fromTo(
            svg.find('.upper-path'),
            {
              yPercent: 100,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1,
            },
            0.5,
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });

          break;

        case svg.hasClass('health-wellness-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          tl.fromTo(
            svg,
            {
              rotation: 0,
              scale: 0,
              opacity: 0,
            },
            {
              rotation: 720,
              scale: 1,
              opacity: 1,
              duration: 1.2,
            },
            0,
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('grocery-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          gsap.set(block.find('.img-overlay-anim'), {
            transformOrigin: '50% 0%',
          });

          tl.fromTo(
            block.find('.img-overlay-anim'),
            {
              scaleY: 1,
            },
            {
              scaleY: 0,
            },
            0,
          );

          gsap.set(svg.find('.path-top'), {
            transformOrigin: '50% 100%',
          });

          tl.fromTo(
            svg.find('.path-top'),
            {
              opacity: 0,
              scale: 0.75,
              yPercent: 50,
              transformOrigin: '50% 100%',
            },
            {
              opacity: 1,
              scale: 1,
              yPercent: 0,
              transformOrigin: '50% 100%',
            },
            0.5,
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('ecommerce-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          const svgEl4Circle2Position = MotionPathPlugin.getRelativePosition(
            svg.find('.circle-2')[0],
            svg.find('.path-outer')[0],
            [0.5, 0.5],
            [0.5, 0.5],
          );

          const svgEl4Circle3Position = MotionPathPlugin.getRelativePosition(
            svg.find('.circle-3')[0],
            svg.find('.path-outer')[0],
            [0.5, 0.5],
            [0.5, 0.5],
          );

          gsap.set(svg.find('.path-outer'), {
            transformOrigin: '50% 50%',
          });

          gsap.set(block.find('.img-overlay-anim'), {
            transformOrigin: '0% 50%',
          });

          tl.fromTo(
            block.find('.img-overlay-anim'),
            {
              scaleX: 1,
            },
            {
              scaleX: 0,
            },
            0,
          );

          tl.fromTo(
            svg.find('.circle-el'),
            {
              opacity: 0,
            },
            {
              opacity: 1,
            },
            0.3,
          );

          tl.from(
            svg.find('.circle-3'),
            {
              x: svgEl4Circle3Position.x,
            },
            0.5,
          );

          tl.from(
            svg.find('.circle-2'),
            {
              x: svgEl4Circle2Position.x,
            },
            0.6,
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('restaurant-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          gsap.set(svg.find('.circle-el'), {
            transformOrigin: '50% 50%',
          });

          tl.fromTo(
            block.find('.img-overlay-anim'),
            {
              scaleX: 1,
            },
            {
              scaleX: 0,
            },
            0,
          );

          tl.fromTo(
            svg.find('.circle-el'),
            {
              opacity: 0,
              scale: 0.75,
              yPercent: 50,
            },
            {
              opacity: 1,
              scale: 1,
              yPercent: 0,
            },
            0.5,
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('hospitality-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          gsap.set(svg.find('.path-outer'), {
            transformOrigin: '50% 50%',
          });

          tl.fromTo(
            svg.find('.path-outer'),
            {
              rotation: 0,
              opacity: 0,
            },
            {
              rotation: 360,
              opacity: 1,
              duration: 1,
            },
            0,
          );

          tl.fromTo(
            svg.find('.circle-el'),
            {
              xPercent: -50,
              yPercent: 50,
              scale: 0.5,
              opacity: 0,
            },
            {
              xPercent: 0,
              yPercent: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
            },
            0.5,
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('fashion-boutiques-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          gsap.set(svg.find('.path-inner'), {
            transformOrigin: '50% 50%',
          });

          tl.fromTo(
            svg.find('.path-inner'),
            {
              rotation: 0,
              opacity: 0,
            },
            {
              rotation: 360,
              opacity: 1,
              duration: 1.5,
            },
            0,
          );

          tl.fromTo(
            svg.find('.path-outer'),
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
              stagger: 0.1,
            },
            0.75,
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('homeware-store-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          tl.fromTo(
            svg.find('.lower-path'),
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
            },
            0,
          );

          tl.fromTo(
            svg.find('.upper-path'),
            {
              yPercent: 100,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1,
            },
            0.5,
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('professional-services-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          gsap.set(svg.find('.circle-el'), {
            transformOrigin: '50% 50%',
          });

          tl.fromTo(
            block.find('.img-overlay-anim'),
            {
              scaleX: 1,
            },
            {
              scaleX: 0,
            },
            0,
          );

          tl.fromTo(
            svg.find('.circle-el'),
            {
              opacity: 0,
              scale: 0.75,
              yPercent: 50,
            },
            {
              opacity: 1,
              scale: 1,
              yPercent: 0,
            },
            0.5,
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('wholesale-icon-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          gsap.set(svg.find('.circle-el'), {
            transformOrigin: '50% 50%',
          });

          tl.fromTo(
            block.find('.img-overlay-anim'),
            {
              scaleY: 1,
            },
            {
              scaleY: 0,
            },
            0,
          );

          tl.fromTo(
            svg.find('.circle-el'),
            {
              opacity: 0,
              scale: 0,
            },
            {
              opacity: 1,
              scale: 1,
            },
            0.5,
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('beauty-salons-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          gsap.set(svg.find('circle'), { transformOrigin: '50% 50%' });
          gsap.set(svg.find('path'), { transformOrigin: '50% 100%' });
          gsap.set(block.find('.img-overlay-anim'), {
            transformOrigin: '50% 100%',
          });

          tl.fromTo(
            block.find('.img-overlay-anim'),
            {
              scaleY: 1,
            },
            {
              scaleY: 0,
            },
            0,
          );

          tl.fromTo(
            svg.find('path'),
            {
              rotation: 180,
            },
            {
              rotation: 0,
            },
            '-=.2',
          );

          tl.fromTo(
            svg.find('circle'),
            {
              opacity: 0,
              scale: 0,
            },
            {
              opacity: 1,
              scale: 1,
            },
            '-=.25',
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('non-profit-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          gsap.set(svg.children(), { scale: 0.85 });
          gsap.set(block.find('.img-overlay-anim'), {
            transformOrigin: '50% 100%',
          });

          const positionWave1 = MotionPathPlugin.getRelativePosition(
            svg.find('.cls-1')[0],
            svg[0],
            [0.5, 1],
            [0.5, 1],
          );

          const positionWave2 = MotionPathPlugin.getRelativePosition(
            svg.find('.cls-2')[0],
            svg[0],
            [0.5, 0],
            [0.5, 0],
          );

          tl.fromTo(
            block.find('.img-overlay-anim'),
            {
              scaleY: 1,
            },
            {
              scaleY: 0,
            },
            0,
          );

          tl.fromTo(
            svg.find('.cls-1'),
            {
              x: positionWave1.x,
              scale: 0.85,
            },
            {
              x: 0,
              scale: 1,
            },
            0.4,
          );

          tl.fromTo(
            svg.find('.cls-2'),
            {
              x: positionWave2.x,
              scale: 0.85,
            },
            {
              x: 0,
              scale: 1,
            },
            0.4,
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('hardware-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          tl.fromTo(
            svg,
            {
              rotation: 0,
              scale: 0,
              opacity: 0,
            },
            {
              rotation: 720,
              scale: 1,
              opacity: 1,
              duration: 1.2,
            },
            0,
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
        case svg.hasClass('wellness-icon-svg'):
          tl = gsap.timeline({
            paused: true,
            onComplete: () => block.addClass('animated-in'),
            onReverseComplete: () => block.removeClass('animated-in'),
          });

          tl.fromTo(
            svg,
            {
              rotation: 0,
              scale: 0,
              opacity: 0,
            },
            {
              rotation: 720,
              scale: 1,
              opacity: 1,
              duration: 1.2,
            },
            0,
          );

          this.animationsList.push({
            animation: tl,
            elIndex: i,
          });
          break;
      }
    });
  }

  sectionAnim() {
    if (!$('.solutions-section-home').length) return;
    const tl = gsap.timeline({
      onStart: () => animationStarting(this.section),
      paused: true,
    });

    tl.fromTo(
      this.section.find('.txt-size-12'),
      {
        y: 15,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      0,
    );

    if (this.section.find('.char').length > 0) {
      tl.to(
        this.section.find('.char'),
        {
          y: 0,
          stagger: 0.02,
          opacity: 1,
          duration: 0.4,
        },
        0.3,
      );
    }
    tl.fromTo(
      this.section.find('.txt-post-rtf'),
      {
        y: 15,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      0.6,
    );

    this.section.find('.single-block').each((i, e) => {
      let item = $(e);
      let startAt = 0.9;
      startAt += 0.1 * i;

      tl.fromTo(
        item.find('.txt-size-22'),
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          onStart: () => this.playTl(i),
        },
        startAt,
      );
    });

    // ScrollTrigger.create({
    //     trigger: this.section,
    //     start: '0% 75%',
    //     end: '+=1%',
    //     toggleActions: 'none none none none',
    //     animation: tl,
    //     onEnter: () => tl.timeScale(1).play(0),
    //     onLeaveBack: () => {
    //         tl.timeScale(2).reverse();
    //         this.svgTl1.timeScale(2).reverse();
    //         this.svgTl2.timeScale(2).reverse();
    //         this.svgTl3.timeScale(2).reverse();
    //         this.svgTl4.timeScale(2).reverse();
    //         this.svgTl5.timeScale(2).reverse();
    //         this.svgTl6.timeScale(2).reverse();
    //         this.svgTl7.timeScale(2).reverse();
    //         this.svgTl8.timeScale(2).reverse();
    //         this.svgTl9.timeScale(2).reverse();
    //         this.svgTl10.timeScale(2).reverse();
    //     },
    // })

    const observerOptions = {
      root: null,
      rootMargin: `0px 0px -25% 0px`,
      threshold: 0,
    };

    const Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          if (!this.section.hasClass('animated-in')) {
            tl.timeScale(1).play(0);
            this.section.addClass('animated-in');
          }
        } else {
          if (entry.boundingClientRect.y > 0) {
            tl.timeScale(2).reverse();

            this.animationsList.forEach((e) => {
              e.animation.timeScale(2).reverse();
            });

            this.section.removeClass('animated-in');
          }
        }
      });
    }, observerOptions);

    Observer.observe(this.section[0]);
  }
}

class ContactSectionHomeHoverAnim {
  constructor() {
    this.section = $('.contact-section-home');
    this.svgEl1 = this.section.find('.msg-icon');
    this.svgEl2 = this.section.find('.email-icon.top-part-svg');
    this.svgEl3 = this.section.find('.phone-icon');
    this.createTl();
    this.bind();
  }
  bind() {
    // if (!isMobile()) {
    this.section.on('mouseenter focusin touchstart', '.single-block', (e) => {
      let svgIcon = $(e.currentTarget).find('svg');
      this.playAnim(svgIcon, 'mouseenter');
    });

    this.section.on('mouseleave focusout touchend', '.single-block', (e) => {
      let svgIcon = $(e.currentTarget).find('svg');
      this.playAnim(svgIcon, 'mouseleave');
    });
    // }

    $(window).on('resizeObserverTrigger', () => {
      this.killTl();
      this.createTl();
    });

    // $(window).on('resize',
    //     debounce(() => {
    //     }, 10)
    // )
  }

  killTl() {
    this.svgTl1.kill();
    this.svgTl1 = null;
    this.svgTl2.kill();
    this.svgTl2 = null;
    this.svgTl3.kill();
    this.svgTl3 = null;

    gsap.set(
      [
        this.svgEl1,
        this.svgEl2,
        this.svgEl3,
        this.svgEl1.children(),
        this.svgEl2.children(),
        this.svgEl3.children(),
      ],
      {
        clearProps: true,
      },
    );
  }

  createTl() {
    this.svgTl1 = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.4,
        ease: 'none',
      },
    });
    this.svgTl2 = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power2.inOut',
      },
    });
    this.svgTl3 = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.4,
        ease: 'none',
      },
    });

    // svg tl1
    this.svgTl1.to(
      this.svgEl1.find('.st0'),
      {
        opacity: 0,
        stagger: 0.2,
      },
      0,
    );

    this.svgTl1.to(
      this.svgEl1.find('.st0'),
      {
        opacity: 1,
        stagger: 0.2,
      },
      0.5,
    );

    // svg tl2
    this.svgTl2.fromTo(
      this.svgEl2,
      {
        rotationX: 0,
      },
      {
        rotationX: 130,
      },
      0,
    );

    this.svgTl2.progress(0);

    // svg tl3
    this.svgTl3.to(
      this.svgEl3.find('.signal-path'),
      {
        opacity: 1,
        stagger: 0.2,
      },
      0,
    );

    this.svgTl3.to(
      this.svgEl3.find('.signal-path'),
      {
        opacity: 0,
        stagger: 0.2,
      },
      '-=.2',
    );
  }

  playAnim(icon, eventType) {
    switch (eventType) {
      case 'mouseenter':
        gsap.to(icon.parents('.single-block').find('.txt-size-24'), {
          y: -10,
        });
        break;
      case 'mouseleave':
        gsap.to(icon.parents('.single-block').find('.txt-size-24'), {
          y: 0,
        });
        break;
    }

    switch (true) {
      case icon.hasClass('msg-icon') && eventType === 'mouseenter':
        this.svgTl1.repeat(-1).play(0);
        break;
      case icon.hasClass('msg-icon') && eventType === 'mouseleave':
        this.svgTl1.repeat(0);
        break;
      case icon.hasClass('email-icon') && eventType === 'mouseenter':
        this.svgTl2.play(0);
        break;
      case icon.hasClass('email-icon') && eventType === 'mouseleave':
        this.svgTl2.reverse();
        break;
      case icon.hasClass('phone-icon') && eventType === 'mouseenter':
        this.svgTl3.repeat(-1).play(0);
        break;
      case icon.hasClass('phone-icon') && eventType === 'mouseleave':
        this.svgTl3.repeat(0);
        break;
    }
  }
}

const contactSectionHomeDesktopAnim = () => {
  if (!$('.contact-section-home').length) return;
  const section = $('.contact-section-home');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });
  if (section.find('.txt-size-12').length > 0) {
    tl.fromTo(
      section.find('.txt-size-12'),
      {
        y: 15,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      0,
    );
  }
  if (section.find('.char').length > 0) {
    tl.to(
      section.find('.char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0.3,
    );
  }
  if (section.find('.img-hold').length > 0) {
    tl.fromTo(
      section.find('.img-hold'),
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
      },
      0.3,
    );
  }
  if (section.find('.txt-post-rtf, .quote-by-txt').length > 0) {
    tl.fromTo(
      section.find('.txt-post-rtf, .quote-by-txt'),
      {
        x: -10,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.15,
      },
      0.6,
    );
  }
  if (section.find('.svg-icon-wrap').length > 0) {
    tl.fromTo(
      section.find('.svg-icon-wrap'),
      {
        scale: 0,
      },
      {
        scale: 1,
        stagger: 0.15,
      },
      0.9,
    );
  }
  if (section.find('.single-block .txt-size-24').length > 0) {
    tl.fromTo(
      section.find('.single-block .txt-size-24'),
      {
        y: 15,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
      },
      0.9,
    );
  }
  if (section.find('.btn-wrap').length > 0) {
    tl.fromTo(
      section.find('.btn-wrap'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      1.2,
    );
  }

  const observerOptions = {
    root: null,
    rootMargin: `0px 0px -25% 0px`,
    threshold: 0,
  };

  const Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // console.log(entry);
      if (entry.intersectionRatio > 0) {
        if (!section.hasClass('animated-in')) {
          tl.timeScale(1).play();
          section.addClass('animated-in');
        }
      } else {
        if (entry.boundingClientRect.y > 0) {
          tl.timeScale(2).reverse();
          section.removeClass('animated-in');
        }
      }
    });
  }, observerOptions);

  Observer.observe(section[0]);

  let animationsArray = [];

  section.find('.background-draw-svg').each((i, e) => {
    let canvas = $(e);

    let thisRive = new Rive({
      src: canvas.data('url'),
      canvas: e,
      autoplay: false,
    });

    animationsArray.push(thisRive);
  });

  const playAnimFunc = (index) => {
    // console.log(index, 'in')
    animationsArray[index].play();
  };

  // ScrollTrigger.create({
  //     trigger: section,
  //     start: '0% 40%',
  //     end: '100% 0%',
  //     onEnter: () => {
  //         gsap.killTweensOf(playAnimFunc);
  //         section.find('.background-draw-svg').each((i,e) => {
  //             gsap.delayedCall(parseInt($(e).data('delay')), playAnimFunc, [i]);
  //         });
  //     },
  //     onEnterBack: () => {
  //         gsap.killTweensOf(playAnimFunc);
  //         section.find('.background-draw-svg').each((i,e) => {
  //             gsap.delayedCall(parseInt($(e).data('delay')), playAnimFunc, [i]);
  //         });
  //     },
  //     onLeave: () => {
  //         gsap.killTweensOf(playAnimFunc);
  //         animationsArray.map(e => {
  //             e.pause();
  //             e.scrub('animation-draw', 0);
  //         });
  //     },
  //     onLeaveBack: () => {
  //         gsap.killTweensOf(playAnimFunc);
  //         animationsArray.map(e => {
  //             e.pause();
  //             e.scrub('animation-draw', 0);
  //         });
  //     },
  // })

  const observerOptions2 = {
    root: null,
    threshold: [0, 0.4],
  };

  const Observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (
        (entry.intersectionRatio == 0 && !entry.isIntersecting) ||
        (entry.intersectionRatio < 0.4 &&
          entry.isIntersecting &&
          entry.boundingClientRect.y > 0)
      ) {
        gsap.killTweensOf(playAnimFunc);
        animationsArray.map((e) => {
          e.pause();
          e.scrub('animation-draw', 0);
        });
        section.removeClass('animated-in-circles');
      }
      if (entry.intersectionRatio >= 0.4 && entry.isIntersecting) {
        if (!section.hasClass('animated-in-circles')) {
          gsap.killTweensOf(playAnimFunc);
          section.find('.background-draw-svg').each((i, e) => {
            gsap.delayedCall(parseInt($(e).data('delay')), playAnimFunc, [i]);
          });
          section.addClass('animated-in-circles');
        }
      }

      if (
        entry.intersectionRatio < 0.1 &&
        entry.isIntersecting &&
        entry.boundingClientRect.y < 0
      ) {
        if (!section.hasClass('animated-in-circles')) {
          gsap.killTweensOf(playAnimFunc);
          section.find('.background-draw-svg').each((i, e) => {
            gsap.delayedCall(parseInt($(e).data('delay')), playAnimFunc, [i]);
          });
          section.addClass('animated-in-circles');
        }
      }
    });
  }, observerOptions2);

  Observer2.observe(section[0]);

  tl.progress(1);
  tl.progress(0);
};

const contactSectionHomeMobileAnim = () => {
  if (!$('.contact-section-home').length) return;
  const section = $('.contact-section-home');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  tl.fromTo(
    section.find('.txt-size-12'),
    {
      y: 15,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    0,
  );
  if (section.find('.char').length > 0) {
    tl.to(
      section.find('.char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0.3,
    );
  }

  tl.fromTo(
    section.find('.img-hold'),
    {
      scale: 0,
    },
    {
      scale: 1,
      duration: 0.6,
    },
    0.3,
  );

  tl.fromTo(
    section.find('.txt-post-rtf, .quote-by-txt'),
    {
      x: -10,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      stagger: 0.15,
    },
    0.6,
  );

  tl.fromTo(
    section.find('.svg-icon-wrap'),
    {
      scale: 0,
    },
    {
      scale: 1,
      stagger: 0.15,
    },
    0.9,
  );

  tl.fromTo(
    section.find('.single-block .txt-size-24'),
    {
      y: 15,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
    },
    0.9,
  );

  tl.fromTo(
    section.find('.btn-wrap'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    1.2,
  );

  ScrollTrigger.create({
    trigger: section,
    start: '0% 75%',
    end: '+=1%',
    toggleActions: 'none none none none',
    animation: tl,
    onEnter: () => tl.timeScale(1).play(),
    onLeaveBack: () => tl.timeScale(2).reverse(),
  });

  tl.progress(1);
  tl.progress(0);
};

const statementAnalysisSectionDesktopAnim = () => {
  if (!$('.statement-analysis-section-home').length) return;
  const section = $('.statement-analysis-section-home');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  tl.fromTo(
    section.find('.section-img-wrap'),
    {
      scale: 0,
    },
    {
      scale: 1,
      duration: 1,
      clearProps: true,
    },
    0,
  );

  tl.fromTo(
    section.find('.txt-size-12'),
    {
      y: 15,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    0,
  );

  if (section.find('.char').length > 0) {
    tl.to(
      section.find('.char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0.3,
    );
  }

  tl.fromTo(
    section.find('.txt-post-rtf'),
    {
      x: -10,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
    },
    0.6,
  );

  tl.fromTo(
    section.find('.inner-img-wrap'),
    {
      scale: 0,
    },
    {
      scale: 1,
      ease: 'elastic.out(0.6, 0.4)',
      stagger: 0.2,
      duration: 1,
      clearProps: true,
    },
    0.6,
  );

  tl.fromTo(
    section.find('.border-circle'),
    {
      drawSVG: '0%',
    },
    {
      drawSVG: `100%`,
      stagger: 0.2,
      duration: 1,
    },
    0.8,
  );

  tl.fromTo(
    [
      section.find('.circle-opacity').children(),
      section.find('.circle-full').children(),
    ],
    {
      scale: 0,
    },
    {
      scale: 1,
      ease: 'elastic.out(0.6, 0.4)',
      stagger: 0.1,
      duration: 1,
      clearProps: true,
    },
    1,
  );

  tl.fromTo(
    section.find('.btn-wrap'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    0.9,
  );

  const observerOptions = {
    root: null,
    rootMargin: `0px 0px -25% 0px`,
    threshold: 0,
  };

  const Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        if (!section.hasClass('animated-in')) {
          tl.timeScale(1).play();
          section.addClass('animated-in');
        }
      } else {
        if (entry.boundingClientRect.y > 0) {
          tl.timeScale(2).reverse();
          section.removeClass('animated-in');
        }
      }
    });
  }, observerOptions);

  Observer.observe(section[0]);

  // ScrollTrigger.create({
  //     trigger: section,
  //     start: '0% 75%',
  //     end: '+=1%',
  //     toggleActions: 'none none none none',
  //     animation: tl,
  //     onEnter: () => tl.timeScale(1).play(),
  //     onLeaveBack: () => tl.timeScale(2).reverse()
  // })
};

const statementAnalysisSectionMobileAnim = () => {
  if (!$('.statement-analysis-section-home').length) return;
  const section = $('.statement-analysis-section-home');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  tl.fromTo(
    section.find('.txt-size-12'),
    {
      y: 15,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    0,
  );
  if (section.find('.char').length > 0) {
    tl.to(
      section.find('.char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0.3,
    );
  }

  tl.fromTo(
    section.find('.txt-post-rtf'),
    {
      x: -10,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
    },
    0.6,
  );

  tl.fromTo(
    section.find('.inner-img-wrap'),
    {
      scale: 0,
    },
    {
      scale: 1,
      ease: 'elastic.out(0.6, 0.4)',
      stagger: 0.2,
      duration: 1,
    },
    0.6,
  );

  tl.fromTo(
    section.find('.btn-wrap'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    0.9,
  );

  ScrollTrigger.create({
    trigger: section,
    start: '0% 75%',
    end: '+=1%',
    toggleActions: 'none none none none',
    animation: tl,
    onEnter: () => tl.timeScale(1).play(),
    onLeaveBack: () => tl.timeScale(2).reverse(),
  });
};

const partnersSectionAnim = () => {
  if (!$('.partners-section-home').length) return;
  const section = $('.partners-section-home');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  tl.fromTo(
    section.find('.txt-size-12'),
    {
      y: 15,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    0,
  );
  if (section.find('.char').length > 0) {
    tl.to(
      section.find('.char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0.3,
    );
  }

  tl.fromTo(
    section.find('.partner-item'),
    {
      y: 15,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
    },
    0.6,
  );

  const observerOptions = {
    root: null,
    rootMargin: `0px 0px -25% 0px`,
    threshold: 0,
  };

  const Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        if (!section.hasClass('animated-in')) {
          tl.timeScale(1).play();
          section.addClass('animated-in');
        }
      } else {
        if (entry.boundingClientRect.y > 0) {
          tl.timeScale(2).reverse();
          section.removeClass('animated-in');
        }
      }
    });
  }, observerOptions);

  Observer.observe(section[0]);

  // ScrollTrigger.create({
  //     trigger: section,
  //     start: '0% 75%',
  //     end: '+=1%',
  //     toggleActions: 'none none none none',
  //     animation: tl,
  //     onEnter: () => tl.timeScale(1).play(),
  //     onLeaveBack: () => tl.timeScale(2).reverse()
  // })
};

const resourcesSectionHomeAnim = () => {
  if (!$('.resources-section-home').length) return;
  const section = $('.resources-section-home');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  tl.fromTo(
    section.find('.section-title'),
    {
      y: 15,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    0,
  );

  section.find('.single-block').each((i, e) => {
    const item = $(e);

    tl.to(
      item.find('.anim-translate-y'),
      {
        yPercent: 0,
        stagger: 0.1,
        opacity: 1,
      },
      0.3,
    );

    tl.fromTo(
      item.find('.person-wrap-img .img-wrapper'),
      {
        scale: 0,
      },
      {
        scale: 1,
      },
      0.6,
    );

    tl.fromTo(
      item.find('.quote-person-txt'),
      {
        x: -10,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
      },
      0.75,
    );

    tl.fromTo(
      item.find('.block-txt'),
      {
        x: -10,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
      },
      0.9,
    );

    tl.fromTo(
      item.find('.plain-link-btn'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      1.2,
    );
  });

  let parallaxTween;
  let parallaxTweenDistance = section.outerHeight(true) + innerHeight;
  let sectionOffsetTop = getTotalHeight(section.prevAll('section'));
  let contentOffset =
    $('#main-content').outerHeight(true) - $('#main-content').height();
  if (!isMobile()) {
    parallaxTween = gsap.fromTo(
      section.find('.background-circles-wrap'),
      {
        x: -section.find('.background-circles-wrap').outerWidth() * 0.05,
      },
      {
        x: section.find('.background-circles-wrap').outerWidth() * 0.05,
        ease: 'none',
        paused: true,
        // scrollTrigger: {
        //     trigger: section.find('.background-circles-wrap'),
        //     start: '0% 100%',
        //     end: '100% 0%',
        //     scrub: true
        // }
      },
    );

    let progressTween = () => {
      if (typeof tl == 'undefined') return;

      const elPosition =
        window.scrollY - sectionOffsetTop + innerHeight - contentOffset;

      let currentProgress = elPosition / parallaxTweenDistance;

      parallaxTween.progress(currentProgress);
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0,
    };

    let observer = new IntersectionObserver((entry) => {
      if (
        entry[0].intersectionRatio > 0 &&
        window.scrollY < getTotalHeight(section.next().prevAll('section'))
      ) {
        gsap.ticker.add(progressTween);
        // console.log(entry[0], 'parallaxTween in')
      } else {
        gsap.ticker.remove(progressTween);
        // console.log(entry[0], 'parallaxTween else')
      }
    }, observerOptions);

    observer.observe(section[0]);

    $(window).on('resizeObserverTrigger', () => {
      parallaxTween.kill();
      parallaxTween = gsap.fromTo(
        section.find('.background-circles-wrap'),
        {
          x: -section.find('.background-circles-wrap').outerWidth() * 0.05,
        },
        {
          x: section.find('.background-circles-wrap').outerWidth() * 0.05,
          ease: 'none',
          paused: true,
        },
      );

      parallaxTweenDistance = section.outerHeight(true) + innerHeight;
      sectionOffsetTop = getTotalHeight(section.prevAll('section'));
      contentOffset =
        $('#main-content').outerHeight(true) - $('#main-content').height();

      progressTween();
    });

    // $(window).on('resize',
    //     debounce(() => {
    //     }, 150)
    // )
  }

  const observerOptions = {
    root: null,
    rootMargin: `0px 0px -25% 0px`,
    threshold: 0,
  };

  const Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        if (!section.hasClass('animated-in')) {
          tl.timeScale(1).play();
          section.addClass('animated-in');
        }
      } else {
        if (entry.boundingClientRect.y > 0) {
          tl.timeScale(2).reverse();
          section.removeClass('animated-in');
        }
      }
    });
  }, observerOptions);

  Observer.observe(section[0]);

  // ScrollTrigger.create({
  //     trigger: section,
  //     start: '0% 75%',
  //     end: '+=1%',
  //     toggleActions: 'play none none none',
  //     animation: tl,
  //     onEnter: () => tl.timeScale(1).play(),
  //     onLeaveBack: () => tl.timeScale(2).reverse()
  // })
};

const acceptsPaymentsFocusHandler = (scrollPos) => {
  const heroSection = $('.hero-section');
  const paymentsSection = $('.payments-section-home');
};

// const bind = () => {
//   if (!isMobile()) {
//     // $('.payments-section-home').on('focusin', function(e){
//     //     e.preventDefault();
//     //     e.stopPropagation();
//     //   });
//     //$(".payments-section-home").on(
//     //"focusin",
//     //  ".single-block:first-of-type",
//     //  () => acceptsPaymentsFocusHandler(window.scrollY),
//     //);
//   } else {
//   }
// };

export const init = () => {
  // bind();
  if (isDesktop()) {
    new HeroSectionIconAnimations();
    heroSectionMaskAnim();
    heroSectionAnimDesktop();
    paymentsSectionMaskAnim();
    paymentsSectionHomeDesktop();
    contactSectionHomeDesktopAnim();
    statementAnalysisSectionDesktopAnim();
  } else {
    heroSectionAnimMobile();
    paymentsSectionHomeMobile();
    contactSectionHomeMobileAnim();
    statementAnalysisSectionMobileAnim();
  }
  partnersSectionAnim();
  resourcesSectionHomeAnim();
  new SolutionsSectionHome();
  new ContactSectionHomeHoverAnim();
};
