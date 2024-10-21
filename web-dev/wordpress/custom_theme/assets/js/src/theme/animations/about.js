import gsap from 'gsap';
import { animationStarting, isMobile, debounce } from '../helpers/helper';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rive, RuntimeLoader, riveWASMResource } from '@rive-app/canvas-single';

RuntimeLoader.setWasmUrl(riveWASMResource);

const coreValuesSectionInitAnim = () => {
  console.log('coreValuesSectionInitAnim');
  if (!$('.about-page-core-values-section').length) return;
  console.log('coreValuesSectionInitAnim 1');
  const section = $('.about-page-core-values-section');
  const firstBlock = isMobile()
    ? section.find('.single-block')
    : section.find('.single-block:first-of-type');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  if (section.find('.section-title .char').length) {
    tl.to(
      section.find('.section-title .char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
        onStart: () => {
          $(window).trigger('iconsAnimsAnimateIn', { state: 'start' });
        },
        onReverseComplete: () => {
          $(window).trigger('iconsAnimsAnimateIn', { state: 'reverse' });
        },
      },
      0,
    );
  }
  if (section.find('.char').length) {
    tl.to(
      firstBlock.find('.char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0.3,
    );
  }

  if (firstBlock.find('.anim-translate-y').length) {
    tl.to(
      firstBlock.find('.anim-translate-y'),
      {
        yPercent: 0,
        stagger: 0.1,
        opacity: 1,
      },
      0.6,
    );
  }

  if (firstBlock.find('.single-block-txt-content, .quote-by-txt').length) {
    tl.fromTo(
      firstBlock.find('.single-block-txt-content, .quote-by-txt'),
      {
        x: -10,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
      },
      0.9,
    );
  }

  if (section.find('.step-button.active').length) {
    tl.fromTo(
      section.find('.step-button.active'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      1.2,
    );
  }

  if (section.find('.step-button:not(.active)').length) {
    tl.fromTo(
      section.find('.step-button:not(.active)'),
      {
        opacity: 0,
      },
      {
        opacity: 0.3,
        stagger: 0.1,
        onComplete: () =>
          gsap.set(section.find('.step-button'), { clearProps: true }),
      },
      1.3,
    );
  }

  ScrollTrigger.create({
    trigger: section,
    start: '0% 75%',
    end: '+=1%',
    toggleActions: 'none none none none',
    animation: tl,
    onEnter: () => {
      tl.timeScale(1).play();
      $(window).trigger('changeSectionActiveSlide', { slideTo: 0 });
    },
    onLeaveBack: () => {
      tl.timeScale(2).reverse();
      $(window).trigger('changeSectionActiveSlide', { slideTo: 0 });
    },
  });
};

class CoreValuesScrollAnim {
  constructor() {
    this.section = $('.about-page-core-values-section');
    this.blocks = this.section.find('.single-block');
    this.buttons = this.section.find('.step-button');
    this.animatedItemsWrap = this.section.find('.animated-items-wrap');
    this.pinWrap = this.section.find('.pin-wrap');
    this.scrollToSection = false;
    this.riveInit();
  }

  mobileIconAnimHandler(step) {
    this.mobileTl.tweenTo(`afterStepLabel-${step}`, {
      duration: 2,
      ease: 'none',
    });
  }

  scrollTo(step) {
    let scrollToVal =
      this.iconsTimelineDesktopTlObj.scrollTrigger.labelToScroll(
        `iconsTimelineDesktopTlLabel-${step}`,
      );
    let currentStep = parseInt(
      this.section.find(`[data-step].active`).attr('data-step'),
    );
    // console.log(currentStep, 'currentStep');
    // console.log(step, 'step');

    // /* in ms */
    let scrollDuration = Math.abs((currentStep - step) * 1000);

    $(window).scrollTo(scrollToVal, {
      duration: scrollDuration,
    });
  }

  coordinateRepeaterCheck(nextCoord, direction) {
    let changedCoord;

    if (direction === 1) {
      switch (true) {
        case nextCoord == this.p1:
          changedCoord = this.p2;
          break;
        case nextCoord == this.p2:
          changedCoord = this.p3;
          break;
        case nextCoord == this.p3:
          changedCoord = this.p4;
          break;
        case nextCoord == this.p4:
          changedCoord = this.p5;
          break;
      }
    } else {
      switch (true) {
        // case (nextCoord == this.p1):
        //     changedCoord = this.p1;
        // break;
        case nextCoord == this.p2:
          changedCoord = this.p1;
          break;
        case nextCoord == this.p3:
          changedCoord = this.p2;
          break;
        case nextCoord == this.p4:
          changedCoord = this.p3;
          break;
        case nextCoord == this.p5:
          changedCoord = this.p4;
          break;
      }
    }

    return changedCoord;
  }

  desktopScrollBackHandler() {
    ScrollTrigger.create({
      trigger: this.section,
      start: '100% 0%',
      end: '+=1%',
      onEnter: () => {
        // console.log('onEnter');

        this.desktopAnimsReset();
      } /* ,
            onEnterBack: () => console.log('onEnterBack'),
            onLeave: () => console.log('onLeave'),
            onLeaveBack: () => console.log('onLeaveBack'), */,
    });

    ScrollTrigger.create({
      trigger: this.section,
      start: '100% 100%',
      end: '+=1%',
      /* onEnter: () => {
                console.log('onEnter');
            }, */
      onEnterBack: () => {
        // console.log('onEnterBack');
        if (this.section.hasClass('scroll-anim-reset')) {
          $(window).scrollTo(this.section[0], { duration: 50 });
        }
      } /* ,
            onLeave: () => console.log('onLeave'),
            onLeaveBack: () => console.log('onLeaveBack'), */,
    });

    ScrollTrigger.create({
      trigger: this.section.find('.max-w-container'),
      endTrigger: this.section,
      start: '100% 100%',
      end: '100% 100%',
      onEnter: () => {
        if (this.section.hasClass('scroll-anim-reset')) {
          this.desktopAnimsEnable();
        }
      },
    });
  }

  desktopAnimsReset() {
    this.iconsTimelineDesktopTlObj.scrollTrigger.disable();
    this.iconsTimelineDesktopTlObj.progress(0);

    this.desktopScrollProgressTrigger.scrollTrigger.disable();
    this.desktopScrollProgressTrigger.progress(0);

    for (let i = 1; i <= this.blocks.length - 1; i++) {
      ScrollTrigger.getById('blockTlTrigger-' + i).disable();
    }

    this.blocksDesktopTlList.forEach((e, i) => {
      e.pause();
      // console.log(e, i);
      // console.log(e.progress());
      e.progress(0);
    });

    this.buttons.removeClass('active');
    this.section.find(`[data-step="1"]`).addClass('active');

    this.section.addClass('scroll-anim-reset');
  }

  desktopAnimsEnable() {
    this.iconsTimelineDesktopTlObj.scrollTrigger.enable();
    for (let i = 1; i <= this.blocks.length - 1; i++) {
      ScrollTrigger.getById('blockTlTrigger-' + i).enable();
    }

    this.desktopScrollProgressTrigger.scrollTrigger.enable();

    this.section.removeClass('scroll-anim-reset');
    this.p1 = this.iconsTimelineDesktopTlObj.scrollTrigger.labelToScroll(
      'iconsTimelineDesktopTlLabel-1',
    );
    this.p2 = this.iconsTimelineDesktopTlObj.scrollTrigger.labelToScroll(
      'iconsTimelineDesktopTlLabel-2',
    );
    this.p3 = this.iconsTimelineDesktopTlObj.scrollTrigger.labelToScroll(
      'iconsTimelineDesktopTlLabel-3',
    );
    this.p4 = this.iconsTimelineDesktopTlObj.scrollTrigger.labelToScroll(
      'iconsTimelineDesktopTlLabel-4',
    );
    this.p5 = this.iconsTimelineDesktopTlObj.scrollTrigger.labelToScroll(
      'iconsTimelineDesktopTlLabel-5',
    );
  }

  desktopTimeline() {
    gsap.to(this.pinWrap, {
      y: () => this.section.outerHeight(true) - this.pinWrap.outerHeight(true),
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: this.section.find('.max-w-container'),
        start: '100% 100%',
        end: '100% 100%',
        endTrigger: this.section,
        scrub: true,
        id: 'pinWrapTrigger',
        onEnter: () => (this.scrollToSection = true),
        onLeave: () => (this.scrollToSection = false),
        onEnterBack: () => (this.scrollToSection = true),
        onLeaveBack: () => (this.scrollToSection = false),
      },
    });

    this.desktopScrollProgressTrigger = gsap.fromTo(
      this.section.find('.section-progress-bar'),
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: this.section.find('.max-w-container'),
          start: '100% 100%',
          end: '100% 100%',
          endTrigger: this.section,
          scrub: true,
          id: 'progressTrigger',
          onLeave: () => {
            gsap.to(this.section.find('.section-progress-bar'), { opacity: 0 });
          },
          onEnterBack: () => {
            gsap.to(this.section.find('.section-progress-bar'), { opacity: 1 });
          },
          onEnter: () => {
            gsap.to(this.section.find('.section-progress-bar'), { opacity: 1 });
          },
        },
      },
    );

    let st = ScrollTrigger.getById('iconsTimelineDesktopTriggerID');
    this.lastP = this.p1;

    ScrollTrigger.addEventListener('scrollStart', () => {
      if (this.scrollToSection) {
        // console.log('scrollStart');
        this.scrollTimeOut ? clearTimeout(this.scrollTimeOut) : null;
      }
    });

    ScrollTrigger.addEventListener('scrollEnd', () => {
      if (this.scrollToSection) {
        // console.log('scrollEnd');
        this.scrollTimeOut = setTimeout(() => {
          if (this.scrollToSection) {
            let p =
              st.start +
              gsap.utils.snap(1 / (this.blocks.length - 1), st.progress) *
                (st.end - st.start);

            if (this.lastP === p) {
              p = this.coordinateRepeaterCheck(p, st.direction);
            }

            this.lastP = p;

            $(window).scrollTo(p);
            // console.log(p);
          }
        }, 750);
      }
    });

    this.blocksDesktopTlList = [];

    this.blocks.each((i, e) => {
      if (i == 0) return;
      let block = $(e);

      gsap.set(block, {
        xPercent: -100 * i,
      });

      const blockTl = gsap.timeline({
        paused: true,
        onStart: () => {
          this.buttons.removeClass('active');
          this.section
            .find(`[data-step="${block.data('step-block')}"]`)
            .addClass('active');
        },
        onReverseComplete: () => {
          this.buttons.removeClass('active');
          this.section
            .find(`[data-step="${parseInt(block.data('step-block')) - 1}"]`)
            .addClass('active');
        },
      });

      blockTl.fromTo(
        this.blocks[i - 1],
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
        0,
      );

      blockTl.to(
        block.find('.char'),
        {
          y: 0,
          stagger: 0.02,
          opacity: 1,
          duration: 0.4,
        },
        0.3,
      );

      blockTl.to(
        block.find('.anim-translate-y'),
        {
          yPercent: 0,
          stagger: 0.1,
          opacity: 1,
        },
        0.6,
      );

      blockTl.fromTo(
        block.find('.single-block-txt-content, .quote-by-txt'),
        {
          x: -10,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
        },
        0.9,
      );

      this.blocksDesktopTlList.push(blockTl);

      switch (i) {
        case 1:
          ScrollTrigger.create({
            trigger: this.section.find('.max-w-container'),
            start: `100%+=${innerHeight} 100%`,
            end: '+=1%',
            endTrigger: this.section,
            id: `blockTlTrigger-${i}`,
            onEnter: () => blockTl.timeScale(1).play(),
            onLeaveBack: () => blockTl.timeScale(2).reverse(),
          });
          break;
        case 2:
          ScrollTrigger.create({
            trigger: this.section.find('.max-w-container'),
            start: `100%+=${innerHeight * 2} 100%`,
            end: '+=1%',
            endTrigger: this.section,
            id: `blockTlTrigger-${i}`,
            onEnter: () => blockTl.timeScale(1).play(),
            onLeaveBack: () => blockTl.timeScale(2).reverse(),
          });
          break;
        case 3:
          ScrollTrigger.create({
            trigger: this.section.find('.max-w-container'),
            start: `100%+=${innerHeight * 3} 100%`,
            end: '+=1%',
            endTrigger: this.section,
            id: `blockTlTrigger-${i}`,
            onEnter: () => blockTl.timeScale(1).play(),
            onLeaveBack: () => blockTl.timeScale(2).reverse(),
          });
          break;
        case 4:
          ScrollTrigger.create({
            trigger: this.section.find('.max-w-container'),
            start: `100%+=${innerHeight * 4} 100%`,
            end: '+=1%',
            endTrigger: this.section,
            id: `blockTlTrigger-${i}`,
            onEnter: () => blockTl.timeScale(1).play(),
            onLeaveBack: () => blockTl.timeScale(2).reverse(),
          });
          break;
      }
    });
  }

  iconsTimelineMobile() {
    this.myReq;
    this.timeline = {
      currentTime: 0,
    };

    this.mobileTl = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      paused: true,
    });

    this.scrubTimeline = () => {
      this.animation.scrub(['animation-timeline'], this.timeline.currentTime);
      this.myReq = requestAnimationFrame(this.scrubTimeline);
    };

    this.myReq = requestAnimationFrame(this.scrubTimeline);

    this.mobileTl.to(this.timeline, {
      currentTime: 3.3,
    });
    this.mobileTl.addLabel('afterStepLabel-1', '<');

    this.mobileTl.addLabel('afterStepLabel-2', '>');

    this.mobileTl.to(this.timeline, {
      currentTime: 5.165,
    });
    this.mobileTl.addLabel('afterStepLabel-3', '>');

    this.mobileTl.to(this.timeline, {
      currentTime: 7.5,
    });
    this.mobileTl.addLabel('afterStepLabel-4', '>');

    this.mobileTl.to(this.timeline, {
      currentTime: 10,
    });
    this.mobileTl.addLabel('afterStepLabel-5', '>');

    gsap.set(this.timeline, { currentTime: 0 });
  }

  iconsTimelineDesktop() {
    this.myReq;
    this.timeline = {
      currentTime: 0,
    };

    this.scrubTimeline = () => {
      // console.log(this.timeline.currentTime);
      this.animation.scrub(['animation-timeline'], this.timeline.currentTime);
      this.myReq = requestAnimationFrame(this.scrubTimeline);
    };

    this.myReq = requestAnimationFrame(this.scrubTimeline);

    this.iconsTimelineDesktopTlObj = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'none',
      },
    });

    this.iconsTimelineDesktopTlObj.fromTo(
      this.timeline,
      {
        currentTime: 0,
      },
      {
        currentTime: 3.3,
      },
    );

    this.iconsTimelineDesktopTlObj.addLabel(
      'iconsTimelineDesktopTlLabel-1',
      '<',
    );
    this.iconsTimelineDesktopTlObj.addLabel(
      'iconsTimelineDesktopTlLabel-2',
      '>',
    );

    this.iconsTimelineDesktopTlObj.fromTo(
      this.timeline,
      {
        currentTime: 3.3,
      },
      {
        currentTime: 5.165,
      },
    );

    this.iconsTimelineDesktopTlObj.addLabel(
      'iconsTimelineDesktopTlLabel-3',
      '>',
    );

    this.iconsTimelineDesktopTlObj.fromTo(
      this.timeline,
      {
        currentTime: 5.165,
      },
      {
        currentTime: 7.5,
      },
    );

    this.iconsTimelineDesktopTlObj.addLabel(
      'iconsTimelineDesktopTlLabel-4',
      '>',
    );

    this.iconsTimelineDesktopTlObj.fromTo(
      this.timeline,
      {
        currentTime: 7.5,
      },
      {
        currentTime: 10,
      },
    );

    this.iconsTimelineDesktopTlObj.addLabel(
      'iconsTimelineDesktopTlLabel-5',
      '>',
    );

    ScrollTrigger.create({
      trigger: this.section.find('.max-w-container'),
      endTrigger: this.section,
      start: '100% 100%',
      end: '100% 100%',
      animation: this.iconsTimelineDesktopTlObj,
      scrub: 0.2,
      id: 'iconsTimelineDesktopTriggerID',
      onEnter: () => {
        this.lastP = this.p1;
      },
      onLeave: () => (this.lastP = this.p5),
    });

    this.p1 = this.iconsTimelineDesktopTlObj.scrollTrigger.labelToScroll(
      'iconsTimelineDesktopTlLabel-1',
    );
    this.p2 = this.iconsTimelineDesktopTlObj.scrollTrigger.labelToScroll(
      'iconsTimelineDesktopTlLabel-2',
    );
    this.p3 = this.iconsTimelineDesktopTlObj.scrollTrigger.labelToScroll(
      'iconsTimelineDesktopTlLabel-3',
    );
    this.p4 = this.iconsTimelineDesktopTlObj.scrollTrigger.labelToScroll(
      'iconsTimelineDesktopTlLabel-4',
    );
    this.p5 = this.iconsTimelineDesktopTlObj.scrollTrigger.labelToScroll(
      'iconsTimelineDesktopTlLabel-5',
    );

    gsap.set(this.timeline, { currentTime: 0 });
  }

  animateInAnimationHandler() {
    $(window).on('iconsAnimsAnimateIn', (e, val) => {
      if (val.state === 'start') {
        this.animation.play(['animation-in']);
      } else {
        this.animation.scrub(['animation-in'], 0);
      }
    });
  }

  callAnimations() {
    this.animation.pause(['animation-in']);
    this.animation.pause(['animation-timeline']);
    this.animation.scrub(['animation-in'], 0);
    this.animation.scrub(['animation-timeline'], 0);
  }

  riveInit() {
    const animWrap = this.section.find('.icon-wrap');
    this.animation = new Rive({
      src: animWrap.data('url') + animWrap.data('filename'),
      canvas: animWrap.find('canvas')[0],
    });

    this.animation.on('load', () => {
      this.callAnimations();
      this.animateInAnimationHandler();

      this.iconsTimelineMobile();
      $(window).on('mobileCoreValuesSlideChange', (e, val) =>
        this.mobileIconAnimHandler(val.step),
      );
      $(window).on('changeSectionActiveSlide', (e) =>
        this.mobileTl.progress(0),
      );

      /*
      if (!isMobile()) {
        this.iconsTimelineDesktop();
        this.desktopTimeline();
        this.buttons.on("click", (e) => {
          this.scrollTo(parseInt($(e.currentTarget).data("step")));
        });
        this.desktopScrollBackHandler();
      } else {
        this.iconsTimelineMobile();
        $(window).on("mobileCoreValuesSlideChange", (e, val) =>
          this.mobileIconAnimHandler(val.step),
        );
        $(window).on("changeSectionActiveSlide", (e) =>
          this.mobileTl.progress(0),
        );
      }
      */
    });
  }
}

const aboutPageJoinTeamAnim = () => {
  if (!$('.about-page-join-team-section').length) return;
  const section = $('.about-page-join-team-section');
  const canvasWrap = section.find('.background-circles-wrap');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  tl.fromTo(
    section.find('.bg-image'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    0,
  );

  tl.to(
    section.find('.txt-size-80 .char'),
    {
      y: 0,
      stagger: 0.02,
      opacity: 1,
      duration: 0.4,
    },
    0,
  );

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
    0.3,
  );

  tl.fromTo(
    section.find('.btn-default'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
      onStart: () => {
        $(window).trigger('triggerCirclesAnimateIn', { state: 'start' });
      },
      onReverseComplete: () => {
        $(window).trigger('triggerCirclesAnimateIn', { state: 'reverse' });
      },
    },
    0.6,
  );

  ScrollTrigger.create({
    trigger: section,
    start: '0% 75%',
    end: '+=1%',
    toggleActions: 'none none none none',
    animation: tl,
    onEnter: () => tl.timeScale(1).play(),
    onLeaveBack: () => {
      tl.timeScale(2).reverse();
    },
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

  let animation = new Rive({
    src: canvasWrap.data('url') + canvasWrap.data('filename'),
    canvas: canvasWrap.find('canvas')[0],
  });

  animation.on('load', () => {
    onVisibilityChange($(section), function () {
      animation.play(['animation-in']);
    });
  });
};

export const init = () => {
  coreValuesSectionInitAnim();
  new CoreValuesScrollAnim();
  aboutPageJoinTeamAnim();
};
