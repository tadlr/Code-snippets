import gsap from 'gsap';
import { animationStarting, isMobile, getTotalHeight } from '../helpers/helper';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import lottie from 'lottie-web';

import { Rive, RuntimeLoader, riveWASMResource } from '@rive-app/canvas-single';
RuntimeLoader.setWasmUrl(riveWASMResource);

gsap.registerPlugin(DrawSVGPlugin);

const headerLottieAnim = () => {
  // if (!IsSafari()) {
  let containers = $('.lottie-anim-logo');
  if (!$('.header-logo-link').hasClass('lottie-anim-init')) {
    $('.header-logo-link').addClass('lottie-anim-init');
    containers.each((i, e) => {
      let anim = lottie.loadAnimation({
        container: e, // the dom element that will contain the animation
        renderer: 'canvas',
        autoplay: false,
        loop: false,
        name: $(e).attr('data-lottie-anim-name'),
        path: $(e).attr('data-url'), // the path to the animation json
      });
      anim.addEventListener('complete', () =>
        setTimeout(() => anim.goToAndPlay(0), 5000),
      );
      $(window).on('playLogoAnim', () => anim.play());
    });
  }

  // }
};

const headerAnim = () => {
  const header = $('#header');

  const tl = gsap.timeline({
    onStart: () => animationStarting(header),
    paused: true,
    onComplete: () => {
      setTimeout(() => $(window).trigger('playLogoAnim'), 1000);
    },
  });

  if (!isMobile()) {
    const headerLogoLink = header.find('.header-logo-link');
    const headerLinksContent = header
      .find('.header-links-content-wrap')
      .children()
      .not($('.statement-analysis-btn.mobile-btn'));
    const desktopBtn = header.find('.statement-analysis-btn.desktop-btn');

    if (
      headerLogoLink.length &&
      headerLinksContent.length &&
      desktopBtn.length
    ) {
      tl.fromTo(
        [headerLogoLink, headerLinksContent, desktopBtn],
        {
          opacity: 0,
        },
        {
          opacity: 1,
          stagger: 0.1,
        },
      );
    }
  } else {
    const mobileElements = header.find('.header-logo-link, .mobile-menu-btn');

    if (mobileElements.length) {
      tl.fromTo(
        mobileElements,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          stagger: 0.1,
        },
      );
    }
  }

  $(window).on('headerAnimPlay', () => tl.play(0));

  if ($('.hero-section').length) return;
  $(window).trigger('headerAnimPlay');
};

const footerDesktopAnim = () => {
  const footer = $('#footer');

  const tl = gsap.timeline({
    paused: true,
    onStart: () => animationStarting(footer),
  });

  const footerLogoLink = footer.find('.footer-logo-link');
  const footerInfoColChildren = footer.find('.footer-info-col').children();
  const footerLinksHoldChildren = footer.find('.footer-links-hold').children();
  const seperatedLinksWrap = footer.find('.seperated-links-wrap');
  const reviewsWrapTitle = footer.find('.reviews-wrap .reviews-wrap-title');
  const reviewItems = footer.find('.reviews-wrap .review-item');
  const associationsWrapTitle = footer.find(
    '.associations-wrap .associations-wrap-title',
  );
  const associationsItems = footer.find(
    '.associations-wrap .associations-item',
  );
  const copyrightTxt = footer.find('.copyright-txt');
  const txtPagesListChildren = footer.find('.txt-pages-list').children();
  const siteByLink = footer.find('.site-by-link');

  if (footerLogoLink.length && footerInfoColChildren.length) {
    tl.fromTo(
      [footerLogoLink, footerInfoColChildren],
      { opacity: 0 },
      { opacity: 1, stagger: 0.1 },
      0,
    );
  }

  if (footerLinksHoldChildren.length && seperatedLinksWrap.length) {
    tl.fromTo(
      [footerLinksHoldChildren, seperatedLinksWrap],
      { opacity: 0 },
      { opacity: 1, stagger: 0.1 },
      0.3,
    );
  }

  if (reviewsWrapTitle.length) {
    tl.fromTo(reviewsWrapTitle, { opacity: 0 }, { opacity: 1 }, 0.6);
  }

  if (reviewItems.length) {
    tl.fromTo(reviewItems, { opacity: 0 }, { opacity: 1, stagger: 0.1 }, 0.9);
  }

  if (associationsWrapTitle.length) {
    tl.fromTo(associationsWrapTitle, { opacity: 0 }, { opacity: 1 }, 0.6);
  }

  if (associationsItems.length) {
    tl.fromTo(
      associationsItems,
      { opacity: 0 },
      { opacity: 1, stagger: 0.1 },
      0.9,
    );
  }

  if (copyrightTxt.length && txtPagesListChildren.length && siteByLink.length) {
    tl.fromTo(
      [copyrightTxt, txtPagesListChildren, siteByLink],
      { opacity: 0 },
      { opacity: 1, stagger: 0.1 },
      1.2,
    );
  }

  const observerOptions = {
    root: null,
    threshold: 0,
    rootMargin: '0px 0px -25% 0px',
  };

  const Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!footer.hasClass('animated-in')) {
          tl.timeScale(1).play();
          footer.addClass('animated-in');
        }
      } else {
        if (entry.boundingClientRect.y > 0) {
          tl.timeScale(3).reverse();
          footer.removeClass('animated-in');
        }
      }
    });
  }, observerOptions);

  Observer.observe(footer[0]);
};

const footerMobileAnim = () => {
  const footer = $('#footer');

  const tl = gsap.timeline({
    paused: true,
    onStart: () => animationStarting(footer),
  });

  const footerLogoLink = footer.find('.footer-logo-link');
  const footerLinksColChildren = footer.find('.footer-links-col').children();
  const reviewsWrapTitle = footer.find('.reviews-wrap .reviews-wrap-title');
  const reviewItems = footer.find('.reviews-wrap .review-item');
  const associationsWrapTitle = footer.find(
    '.associations-wrap .associations-wrap-title',
  );
  const associationsItems = footer.find(
    '.associations-wrap .associations-item',
  );
  const footerMobileWrapChildren = footer
    .find('.footer-mobile-wrap')
    .children();
  const txtPagesListChildren = footer.find('.txt-pages-list').children();
  const copyrightTxt = footer.find('.copyright-txt');
  const siteByLink = footer.find('.site-by-link');

  if (footerLogoLink.length && footerLinksColChildren.length) {
    tl.fromTo(
      [footerLogoLink, footerLinksColChildren],
      { opacity: 0 },
      { opacity: 1, stagger: 0.1 },
      0,
    );
  }

  if (reviewsWrapTitle.length) {
    tl.fromTo(reviewsWrapTitle, { opacity: 0 }, { opacity: 1 }, 0.3);
  }

  if (reviewItems.length) {
    tl.fromTo(reviewItems, { opacity: 0 }, { opacity: 1, stagger: 0.1 }, 0.6);
  }

  if (associationsWrapTitle.length) {
    tl.fromTo(associationsWrapTitle, { opacity: 0 }, { opacity: 1 }, 0.3);
  }

  if (associationsItems.length) {
    tl.fromTo(
      associationsItems,
      { opacity: 0 },
      { opacity: 1, stagger: 0.1 },
      0.6,
    );
  }

  if (footerMobileWrapChildren.length) {
    tl.fromTo(footerMobileWrapChildren, { opacity: 0 }, { opacity: 1 }, 0.9);
  }

  if (txtPagesListChildren.length && copyrightTxt.length && siteByLink.length) {
    tl.fromTo(
      [txtPagesListChildren, copyrightTxt, siteByLink],
      { opacity: 0 },
      { opacity: 1, stagger: 0.1 },
      1.2,
    );
  }

  const observerOptions = {
    root: null,
    threshold: 0,
    rootMargin: '0px 0px -25% 0px',
  };

  const Observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!footer.hasClass('animated-in')) {
          tl.timeScale(1).play();
          footer.addClass('animated-in');
        }
      } else {
        if (entry.boundingClientRect.y > 0) {
          tl.timeScale(3).reverse();
          footer.removeClass('animated-in');
        }
      }
    });
  }, observerOptions);

  Observer.observe(footer[0]);
};

const formContactSectionAnim = () => {
  if (!$('.form-contact-section-home').length) return;
  const section = $('.form-contact-section-home');

  // console.log(section);
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  // tl.call(() => {
  //     section.find('.circle-full').children().attr('style', '');
  //     section.find('.background-el').attr('style', '');
  // }, 0)
  if ($(section.find('.txt-content .char').length) > 0) {
    tl.to(
      section.find('.txt-content .char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0,
    );
  }
  if ($(section.find('.txt-post-rtf').length) > 0) {
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
  }
  if ($(section.find('.circle-full').length) > 0) {
    tl.fromTo(
      section.find('.circle-full').children(),
      {
        scale: 0,
      },
      {
        scale: 1,
        ease: 'elastic.out(0.6, 0.4)',
        stagger: 0.1,
        duration: 1,
      },
      0.3,
    );
  }
  if ($(section.find('.form-row').length) > 0) {
    tl.fromTo(
      section.find('.form-row'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.1,
      },
      0.6,
    );
  }
  if ($(section.find('.background-el').length) > 0) {
    tl.fromTo(
      section.find('.background-el'),
      {
        scale: 0,
      },
      {
        scale: 1,
        duration: 1,
        ease: 'elastic.out(0.6, 0.4)',
      },
      0.9,
    );
  }
  if ($(section.find('.form-content.char').length) > 0) {
    tl.to(
      section.find('.form-content .char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      1,
    );
  }

  // if (!isMobile()) {
  //     gsap.fromTo(section.find('.inner-circles-wrap'), {
  //         y: -100
  //     }, {
  //         y: 0,
  //         ease: 'none',
  //         scrollTrigger: {
  //             trigger: section,
  //             start: '0% 100%',
  //             end: '100% 25%',
  //             scrub: true
  //         }
  //     })
  // }

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
  $(window).on('resizeObserverTrigger', () => {
    gsap.set(
      [
        section.find('.circle-full').children(),
        section.find('.background-el').length
          ? section.find('.background-el')
          : null,
      ],
      {
        scale: 0,
        clearProps: true,
      },
    );
  });

  // $(window).on('resize',
  //     debounce(() => {
  //     }, 150)
  // )

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

const innerPagesLandingSectionDesktopAnim = () => {
  if (!$('.inner-pages-landing-section:not(.no-landing-anims)').length) return;
  const section = $('.inner-pages-landing-section:not(.no-landing-anims)');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    // paused: true,
  });

  if (section.find('.bg-image').length) {
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
  }

  if (section.find('.background-video-wrap').length) {
    tl.fromTo(
      section.find('.background-video-wrap'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      0,
    );
  }

  if (section.find('.scroll-btn-border-circle').length) {
    tl.set(
      section.find('.scroll-btn-border-circle'),
      {
        rotation: -90,
        transformOrigin: '50% 50%',
      },
      0,
    );
  }

  if (section.find('.background-circles-wrap').length) {
    let circlesWrap = section.find('.background-circles-wrap');
    let circleTopLeft = circlesWrap.find('.top-left');
    let circleTopRight = circlesWrap.find('.top-right');
    let circleBottomLeft = circlesWrap.find('.bottom-left');
    let circleBottomRight = circlesWrap.find('.bottom-right');

    tl.set(
      circleTopRight,
      {
        xPercent: -68,
      },
      0,
    );

    tl.set(
      circleBottomLeft,
      {
        yPercent: -74,
      },
      0,
    );

    tl.set(
      circleBottomRight,
      {
        xPercent: -68,
        yPercent: -74,
      },
      0,
    );

    tl.fromTo(
      [circleTopLeft, circleTopRight, circleBottomLeft, circleBottomRight],
      {
        scale: 0,
      },
      {
        scale: 1,
      },
      0.3,
    );

    tl.to(
      circleTopRight,
      {
        xPercent: 0,
      },
      0.6,
    );

    tl.to(
      circleBottomLeft,
      {
        xPercent: 68,
      },
      0.6,
    );

    tl.to(
      circleBottomRight,
      {
        xPercent: 0,
      },
      0.6,
    );

    tl.to(
      circleBottomLeft,
      {
        yPercent: 0,
      },
      0.9,
    );

    tl.to(
      circleBottomRight,
      {
        yPercent: 0,
      },
      0.9,
    );

    tl.to(
      circleBottomLeft,
      {
        xPercent: 0,
      },
      1.2,
    );
  }

  if (section.find('.background-target-circle-transparent').length) {
    let circleElements = section.find(
      '.background-target-circle-inner, .background-target-circle-transparent',
    );

    tl.fromTo(
      circleElements,
      {
        scale: 0,
      },
      {
        scale: 1,
        ease: 'elastic.out(0.6, 0.4)',
        stagger: 0.2,
        duration: 1,
      },
      0,
    );
  }

  tl.fromTo(
    section.find('.breadcrumb-list').children(),
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.2,
    },
    0,
  );

  tl.fromTo(
    section.find('.current-page-breadcrumb-title'),
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

  if (section.find('.pre-heading').length) {
    tl.fromTo(
      section.find('.pre-heading'),
      {
        y: 15,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      0.15,
    );
  }

  if (section.find('.txt-size-100 .char').length) {
    tl.to(
      section.find('.txt-size-100 .char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0.3,
    );
  }

  if (section.find('.landing-video-btn').length) {
    tl.fromTo(
      section.find('.landing-video-btn').children(),
      {
        scale: 0,
      },
      {
        scale: 1,
        ease: 'elastic.out(0.6, 0.4)',
        stagger: 0.2,
        duration: 1,
      },
      0.3,
    );
  }

  if (section.find('.industry-template-img').length) {
    tl.fromTo(
      section.find('.industry-template-img'),
      {
        opacity: 0,
        yPercent: 50,
        scale: 0.7,
      },
      {
        opacity: 1,
        yPercent: 0,
        scale: 1,
        stagger: 0.2,
        duration: 1,
      },
      0.3,
    );
  }

  if (section.find('.txt-block').length) {
    section.find('.txt-block').each((i, e) => {
      let item = $(e);
      if (item.find('.char').length) {
        tl.to(
          item.find('.char'),
          {
            y: 0,
            stagger: 0.02,
            opacity: 1,
            duration: 0.4,
          },
          0.6,
        );
      }

      tl.fromTo(
        item.find('.txt-post-rtf'),
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
    });
  }

  if (section.find('.single-txt-block').length) {
    section.find('.single-txt-block').each((i, e) => {
      let item = $(e);

      tl.to(
        item.find('.char'),
        {
          y: 0,
          stagger: 0.02,
          opacity: 1,
          duration: 0.4,
        },
        0.6,
      );

      tl.fromTo(
        item.find('.txt-post-rtf'),
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
    });
  }

  if (section.find('.single-txt-block-no-title').length) {
    tl.fromTo(
      section.find('.single-txt-block-no-title'),
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

  if (section.find('.btn-default').length) {
    tl.fromTo(
      section.find('.btn-default'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      0.8,
    );
  }

  if (section.find('.scroll-btn-border-circle').length) {
    tl.fromTo(
      section.find('.scroll-btn-border-circle'),
      {
        drawSVG: '0%',
      },
      {
        drawSVG: `100%`,
      },
      1,
    );

    tl.fromTo(
      section.find('.scroll-btn-img'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      1.2,
    );
  }
};

const translateYSectionDefault = () => {
  if (!$('.translate-y-section-default').length) return;
  const sections = $('.translate-y-section-default');

  sections.each((i, e) => {
    let section = $(e);
    let tl = gsap.timeline({
      onStart: () => animationStarting(section),
      paused: true,
    });

    if (section.find('.fade-in-first').length) {
      tl.fromTo(
        section.find('.fade-in-first'),
        {
          opacity: 0,
        },
        {
          opacity: 1,
          stagger: 0.1,
        },
        0,
      );
    }

    tl.to(
      section.find('.char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0,
    );

    tl.fromTo(
      section.find('.anim-translate-y'),
      {
        y: 15,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
      },
      0.2,
    );

    if (section.find('.fade-in-last').length) {
      tl.fromTo(
        section.find('.fade-in-last'),
        {
          opacity: 0,
        },
        {
          opacity: 1,
          stagger: 0.1,
        },
        0.4,
      );
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
    //     toggleActions: 'none none none none',
    //     animation: tl,
    //     onEnter: () => tl.timeScale(1).play(),
    //     onLeaveBack: () => tl.timeScale(2).reverse()
    // })
  });
};

const blocksGridSectionAnim = () => {
  if (!$('.blocks-grid-section').length) return;
  const section = $('.blocks-grid-section');
  if (!isMobile()) {
    let tl = gsap.timeline({
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
        stagger: 0.2,
      },
      0,
    );

    section.find('.single-block').each((i, e) => {
      let block = $(e);
      tl.to(
        block.find('.char'),
        {
          y: 0,
          stagger: 0.02,
          opacity: 1,
          duration: 0.4,
        },
        0,
      );

      tl.fromTo(
        block.find('.txt-post-rtf'),
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
    });

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
  } else {
    section.find('.single-block').each((i, e) => {
      let block = $(e);
      let tl = gsap.timeline({
        onStart: () => animationStarting(section),
        paused: true,
      });

      tl.fromTo(
        block.find('.bg-image'),
        {
          opacity: 0,
        },
        {
          opacity: 1,
          stagger: 0.1,
        },
        0,
      );

      tl.to(
        block.find('.char'),
        {
          y: 0,
          stagger: 0.02,
          opacity: 1,
          duration: 0.4,
        },
        0,
      );

      tl.fromTo(
        block.find('.txt-post-rtf'),
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

      ScrollTrigger.create({
        trigger: block,
        start: '0% 75%',
        end: '+=1%',
        toggleActions: 'none none none none',
        animation: tl,
        onEnter: () => tl.timeScale(1).play(),
        onLeaveBack: () => tl.timeScale(2).reverse(),
      });
    });
  }
};

const circleInfoSection = () => {
  if (!$('.circle-info-white-section').length) return;
  const section = $('.circle-info-white-section');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  tl.to(
    section.find('.char'),
    {
      y: 0,
      stagger: 0.02,
      opacity: 1,
      duration: 0.4,
    },
    0,
  );

  tl.fromTo(
    section.find('.anim-translate-y'),
    {
      y: 15,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
    },
    0.2,
  );

  tl.fromTo(
    section.find('.img-wrap'),
    {
      scale: 0,
    },
    {
      scale: 1,
      duration: 1,
      ease: 'elastic.out(0.6, 0.4)',
    },
    0.4,
  );

  tl.fromTo(
    section.find('.img-txt-content'),
    {
      xPercent: -68,
      opacity: 0,
    },
    {
      xPercent: 0,
      opacity: 1,
    },
    '-=.6',
  );

  tl.fromTo(
    section.find('.img-txt-content').children(),
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.2,
    },
    '-=.2',
  );

  tl.fromTo(
    section.find('.arc-border-pink, .arc-light-pink'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.2,
    },
    '-=.6',
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
  //     onEnter: () => tl.timeScale(1).play(),
  //     onLeaveBack: () => tl.timeScale(2).reverse()
  // })
};

const txtBlocksLayoutSection = () => {
  if (!$('.txt-blocks-layout-section:not(.no-txt-blocks-section-anim)').length)
    return;
  const section = $(
    '.txt-blocks-layout-section:not(.no-txt-blocks-section-anim)',
  );
  const blocks = section
    .find('.max-w-container')
    .first()
    .find('.content-block, .table-block:not(.content-block)');

  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  tl.fromTo(
    section.find('.background-svg-wrap'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.2,
    },
  );

  const observerOptions = {
    root: null,
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
  //     onEnter: () => tl.timeScale(1).play(),
  //     onLeaveBack: () => tl.timeScale(2).reverse()
  // })

  blocks.each((i, e) => {
    let block = $(e);
    let blockTl = gsap.timeline({
      paused: true,
    });

    switch (true) {
      case block.hasClass('plain-txt-block') || block.hasClass('table-block'):
        blockTl.fromTo(
          block.children(),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.05,
          },
          0,
        );
        break;
      case block.hasClass('media-block'):
        blockTl.fromTo(
          block.find('.txt-content').children(),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.05,
          },
          0,
        );
        blockTl.fromTo(
          block.find('.img-content'),
          {
            scale: 0,
          },
          {
            scale: 1,
            ease: 'elastic.out(0.6, 0.4)',
            stagger: 0.2,
            duration: 1,
          },
          0.2,
        );
        break;
      case block.hasClass('contact-form-block'):
        blockTl.fromTo(
          [
            block.find('.plain-txt-block').first().children(),
            block.find('.person-quote-block').children(),
            block.find('.plain-txt-block').last().children(),
          ],
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.05,
          },
          0,
        );

        blockTl.fromTo(
          block.find('.right-content-form'),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.05,
          },
          0.3,
        );
        break;
      case block.hasClass('faq-block'):
        blockTl.to(
          block.find('.char'),
          {
            y: 0,
            stagger: 0.02,
            opacity: 1,
            duration: 0.4,
          },
          0,
        );

        blockTl.fromTo(
          block.find('.faq-questions-wrap').children(),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.1,
          },
          0.2,
        );
        break;
      case block.hasClass('txt-block full-width-block'):
        blockTl.fromTo(
          block.find('.txt-content:not(.table-block)').children(),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.05,
          },
          0,
        );

        blockTl.fromTo(
          block.find('.table-block').children(),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.05,
          },
          0.2,
        );
        break;
      case block.hasClass('images-block'):
        blockTl.fromTo(
          block.find('.section-title'),
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

        blockTl.fromTo(
          block.find('.images-wrap').children(),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.1,
          },
          0.2,
        );
        break;
      case block.hasClass('circle-info-white-block'):
        blockTl.to(
          block.find('.char'),
          {
            y: 0,
            stagger: 0.02,
            opacity: 1,
            duration: 0.4,
          },
          0,
        );

        blockTl.fromTo(
          block.find('.anim-translate-y'),
          {
            y: 15,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
          },
          0.2,
        );

        blockTl.fromTo(
          block.find('.img-wrap'),
          {
            scale: 0,
          },
          {
            scale: 1,
            duration: 1,
            ease: 'elastic.out(0.6, 0.4)',
          },
          0.4,
        );

        blockTl.fromTo(
          block.find('.img-txt-content'),
          {
            xPercent: -68,
            opacity: 0,
          },
          {
            xPercent: 0,
            opacity: 1,
          },
          '-=.6',
        );

        blockTl.fromTo(
          block.find('.img-txt-content').children(),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.2,
          },
          '-=.2',
        );

        blockTl.fromTo(
          block.find('.arc-border-pink, .arc-light-pink'),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.2,
          },
          '-=.6',
        );
        break;

      case block.hasClass('icons-content-block-vertical') ||
        block.hasClass('icons-content-block-horizontal'):
        block.find('.icons-block-item').each((i, e) => {
          let item = $(e);
          blockTl.fromTo(
            item.find('.img-wrap'),
            {
              y: 15,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
            },
            0,
          );

          blockTl.fromTo(
            item.find('.txt-post-rtf').children(),
            {
              opacity: 0,
            },
            {
              opacity: 1,
              stagger: 0.1,
            },
            0.2,
          );
        });
        break;

      case block.hasClass('txt-cols-4') ||
        block.hasClass('txt-cols-3') ||
        block.hasClass('txt-cols-2'):
        blockTl.fromTo(
          block.find('.txt-size-60'),
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

        blockTl.fromTo(
          block.find('.txt-blocks').children(),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.1,
          },
          0.2,
        );
        break;

      case block.hasClass('media-list-items-block'):
        blockTl.fromTo(
          block.find('.list-items-content').children(),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.1,
          },
          0,
        );
        blockTl.fromTo(
          block.find('.img-content'),
          {
            scale: 0,
          },
          {
            scale: 1,
            ease: 'elastic.out(0.6, 0.4)',
            duration: 1,
          },
          0.2,
        );
        break;

      case block.hasClass('person-quote-block'):
        blockTl.fromTo(
          block.find('.person-img-wrap'),
          {
            scale: 0,
          },
          {
            scale: 1,
            ease: 'elastic.out(0.6, 0.4)',
            duration: 1,
          },
          0,
        );

        blockTl.fromTo(
          block.find('.quote-img-wrap'),
          {
            opacity: 0,
          },
          {
            opacity: 1,
          },
          0.15,
        );

        blockTl.fromTo(
          block.find('.txt-content-inner'),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            stagger: 0.1,
          },
          0.3,
        );
        break;
    }

    const observerOptions = {
      root: null,
      rootMargin: `0px 0px -25% 0px`,
      threshold: 0,
    };

    const Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          if (!block.hasClass('animated-in')) {
            blockTl.timeScale(1).play();
            block.addClass('animated-in');
          }
        } else {
          if (entry.boundingClientRect.y > 0) {
            blockTl.timeScale(2).reverse();
            block.removeClass('animated-in');
          }
        }
      });
    }, observerOptions);

    Observer.observe(block[0]);

    // ScrollTrigger.create({
    //     trigger: block,
    //     start: '0% 75%',
    //     end: '+=1%',
    //     onEnter: () => blockTl.timeScale(1).play(),
    //     onLeaveBack: () => blockTl.timeScale(2).reverse()
    // })
  });
};

const infoCircleTxtSectionAnim = () => {
  if (!$('.circle-info-section-anim').length) return;
  const sections = $('.circle-info-section-anim');

  sections.each((i, e) => {
    let section = $(e);
    const tl = gsap.timeline({
      onStart: () => animationStarting(section),
      paused: true,
    });

    tl.to(
      section.find('.char'),
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

    if (section.find('.btn-default').length) {
      tl.fromTo(
        section.find('.btn-default'),
        {
          opacity: 0,
        },
        {
          opacity: 1,
          stagger: 0.1,
        },
        0.45,
      );
    }

    let startAt = !isMobile() ? 0.45 : 0;

    tl.fromTo(
      section.find('.scale-in-circle'),
      {
        scale: 0,
      },
      {
        scale: 1,
        duration: 1,
        ease: 'elastic.out(0.6, 0.4)',
      },
      startAt,
    );

    section.find('.fade-in-circle').each((i, e) => {
      let circle = $(e);
      let opacityVal = circle.attr('data-opacity')
        ? circle.attr('data-opacity') * 1
        : 1;
      tl.fromTo(
        circle,
        {
          opacity: 0,
        },
        {
          opacity: opacityVal,
        },
        (startAt += 0.15 + 0.2 * i),
      );
    });

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
  });
};

const fadeInSectionDefaultAnim = () => {
  if (!$('.fade-in-section-default').length) return;
  const sections = $('.fade-in-section-default');

  sections.each((i, e) => {
    let section = $(e);
    let tl = gsap.timeline({
      onStart: () => animationStarting(section),
      paused: true,
    });
    let elements = section.find('.max-w-container').children();

    tl.fromTo(
      elements,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.2,
      },
      0,
    );

    if (section.find('.fade-in-last').length) {
      tl.fromTo(
        section.find('.fade-in-last'),
        {
          opacity: 0,
        },
        {
          opacity: 1,
          stagger: 0.1,
        },
        0.2,
      );
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
    //     toggleActions: 'none none none none',
    //     animation: tl,
    //     onEnter: () => tl.timeScale(1).play(),
    //     onLeaveBack: () => tl.timeScale(2).reverse()
    // })
  });
};

const txtSectionDefaultAnim = () => {
  if (!$('.txt-section-anim').length) return;
  const sections = $('.txt-section-anim');

  sections.each((i, e) => {
    let section = $(e);
    let tl = gsap.timeline({
      onStart: () => animationStarting(section),
      paused: true,
    });

    tl.to(
      section.find('.char'),
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
        stagger: 0.2,
      },
      0.2,
    );

    if (section.find('.btn-default').length) {
      tl.fromTo(
        section.find('.btn-default'),
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
        0.4,
      );
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
    //     toggleActions: 'none none none none',
    //     animation: tl,
    //     onEnter: () => tl.timeScale(1).play(),
    //     onLeaveBack: () => tl.timeScale(2).reverse()
    // })
  });
};

const innerPagesContactSection = () => {
  if (!$('.inner-pages-contact-section').length) return;
  const section = $('.inner-pages-contact-section');

  let bgImageFadeInTween = gsap.fromTo(
    section.find('.bg-image'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
      ease: 'none',
      paused: true,
      onStart: () => animationStarting(section),
    },
  );

  section.find('.single-block').each((i, e) => {
    let item = $(e);

    if (item.hasClass('txt-content-block')) {
      let tl = gsap.timeline({
        paused: true,
      });

      tl.fromTo(
        item.find('.txt-size-12'),
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

      tl.to(
        item.find('.char'),
        {
          y: 0,
          stagger: 0.02,
          opacity: 1,
          duration: 0.4,
        },
        0.3,
      );

      tl.fromTo(
        item.find('.buttons-wrap').children(),
        {
          opacity: 0,
        },
        {
          opacity: 1,
          stagger: 0.1,
        },
        0.6,
      );

      if (item.find('.txt-post-rtf').length) {
        tl.fromTo(
          item.find('.txt-post-rtf'),
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
      }

      const observerOptions = {
        root: null,
        rootMargin: `0px 0px -25% 0px`,
        threshold: 0,
      };

      const Observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            if (!item.hasClass('animated-in')) {
              bgImageFadeInTween.timeScale(1).play();
              tl.timeScale(1).play();
              item.addClass('animated-in');
            }
          } else {
            if (entry.boundingClientRect.y > 0) {
              tl.timeScale(2).reverse();
              bgImageFadeInTween.timeScale(2).reverse();
              item.removeClass('animated-in');
            }
          }
        });
      }, observerOptions);

      Observer.observe(item[0]);

      // ScrollTrigger.create({
      //     trigger: item,
      //     start: '0% 75%',
      //     end: '+=1%',
      //     toggleActions: 'none none none none',
      //     animation: tl,
      //     onEnter: () => tl.timeScale(1).play(),
      //     onLeaveBack: () => tl.timeScale(2).reverse()
      // })
    } else {
      let tl = gsap.timeline({
        onStart: () => animationStarting(section),
        paused: true,
      });
      let elementsToFadeIn = item.find('.guide-form, .newsletter-form').length
        ? [
            item.find('.txt-post-rtf').children(),
            item.find('.guide-form, .newsletter-form'),
          ]
        : [item.find('.txt-post-rtf').children()];

      tl.fromTo(
        item.find('.txt-size-12'),
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

      tl.to(
        item.find('.char'),
        {
          y: 0,
          stagger: 0.02,
          opacity: 1,
          duration: 0.4,
        },
        0.3,
      );

      tl.fromTo(
        elementsToFadeIn,
        {
          opacity: 0,
        },
        {
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
            if (!item.hasClass('animated-in')) {
              bgImageFadeInTween.timeScale(1).play();
              tl.timeScale(1).play();
              item.addClass('animated-in');
            }
          } else {
            if (entry.boundingClientRect.y > 0) {
              bgImageFadeInTween.timeScale(2).reverse();
              tl.timeScale(2).reverse();
              item.removeClass('animated-in');
            }
          }
        });
      }, observerOptions);

      Observer.observe(item[0]);

      // ScrollTrigger.create({
      //     trigger: item,
      //     start: '0% 75%',
      //     end: '+=1%',
      //     toggleActions: 'none none none none',
      //     animation: tl,
      //     onEnter: () => tl.timeScale(1).play(),
      //     onLeaveBack: () => tl.timeScale(2).reverse()
      // })
    }
  });
};

const bind = () => {
  if (!isMobile()) {
    $('.round-btn-submit .background-el')
      .off('mouseenter')
      .on('mouseenter', (e) => {
        gsap.to(e.currentTarget, {
          scale: 3,
          ease: 'elastic.out(0.6, 0.4)',
        });
      });

    $('.round-btn-submit .background-el')
      .off('mouseleave')
      .on('mouseleave', (e) => {
        gsap.to(e.currentTarget, {
          scale: 1,
        });
      });
  }
};

const parallaxImages = () => {
  if (!$('.parallax-img').length) return;
  const images = $('.parallax-img');

  images.each((i, e) => {
    if ($(e).hasClass('no-mobile-parallax') && isMobile()) return;

    let img = $(e);
    let section = img.parents('section');

    let translateVal = img.hasClass('translate-100') ? 100 : 200;
    let parallaxTween;
    let parallaxTweenMobile;

    if (isMobile()) {
      parallaxTweenMobile = gsap.fromTo(
        img,
        {
          y: 0,
        },
        {
          y: -100,
          paused: true,
          ease: 'none',
        },
      );

      ScrollTrigger.create({
        trigger: section,
        start: '0% 100%',
        end: '100% 0%',
        animation: parallaxTweenMobile,
        scrub: true,
      });
    }

    if (!img.hasClass('no-negative-translate')) {
      parallaxTween = gsap.fromTo(
        img,
        {
          y: -translateVal,
        },
        {
          y: 0,
          paused: true,
          ease: 'none',
        },
      );
    }

    let parallaxTween2 = gsap.to(img, {
      y: '+=' + translateVal,
      paused: true,
      ease: 'none',
    });

    let sectionOffsetTop;
    let sectionHeight;
    let contentOffset;
    let progressTween;
    let progressTween2;

    if (!isMobile()) {
      sectionOffsetTop = getTotalHeight(section.prevAll('section'));
      sectionHeight = section.outerHeight();
      contentOffset =
        $('#main-content').outerHeight() - $('#main-content').height();

      progressTween = () => {
        if (typeof parallaxTween == 'undefined') return;

        let elPosition =
          window.scrollY - sectionOffsetTop + innerHeight - contentOffset;
        let currentProgress = elPosition / sectionHeight;

        parallaxTween.progress(currentProgress);
      };

      progressTween2 = () => {
        if (typeof parallaxTween2 == 'undefined') return;

        let elPosition = window.scrollY - sectionOffsetTop - contentOffset;

        let currentProgress = elPosition / sectionHeight;

        parallaxTween2.progress(currentProgress);
      };

      const observerOptions = {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0,
      };

      let observer2 = new IntersectionObserver((entry) => {
        if (entry[0].intersectionRatio > 0) {
          if (!section.hasClass('animating-parallax-img')) {
            sectionOffsetTop = getTotalHeight(section.prevAll('section'));
            sectionHeight = section.outerHeight();
            contentOffset =
              $('#main-content').outerHeight() - $('#main-content').height();

            gsap.ticker.add(progressTween2);
            gsap.ticker.add(progressTween);
            section.addClass('animating-parallax-img');
            // console.log(entry[0], 'parallaxTween in')
          }
        } else {
          gsap.ticker.remove(progressTween2);
          gsap.ticker.remove(progressTween);
          section.removeClass('animating-parallax-img');
          // console.log(entry[0], 'parallaxTween else')
        }
      }, observerOptions);

      observer2.observe(section[0]);
    }

    if (!isMobile()) {
      $(window).on('resizeObserverTrigger', () => {
        sectionOffsetTop = getTotalHeight(section.prevAll('section'));
        sectionHeight = section.outerHeight();
        contentOffset =
          $('#main-content').outerHeight() - $('#main-content').height();

        progressTween();
        progressTween2();
      });
    } else {
      $(window).on('resizeObserverTrigger', () => {
        gsap.killTweensOf(img);
        gsap.set(img, {
          clearProps: true,
        });

        if (isMobile()) {
          parallaxTweenMobile = gsap.fromTo(
            img,
            {
              y: 0,
            },
            {
              y: -100,
              paused: true,
              ease: 'none',
            },
          );

          ScrollTrigger.create({
            trigger: section,
            start: '0% 100%',
            end: '100% 0%',
            animation: parallaxTweenMobile,
            scrub: true,
          });
        }
      });
    }
  });
};

const aboutPageSymbolSectionAnim = () => {
  if (!$('.symbol-section').length) return;
  const section = $('.symbol-section');
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

  tl.fromTo(
    section.find('.symbol-section-svg'),
    {
      opacity: 0,
      scale: 0.5,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
    },
    0.3,
  );

  tl.to(
    section.find('.txt-size-80 .char'),
    {
      y: 0,
      stagger: 0.02,
      opacity: 1,
      duration: 0.4,
    },
    0.3,
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
      stagger: 0.1,
    },
    0.6,
  );

  tl.fromTo(
    section.find('.btn-default'),
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

const infoSliderSectionHomeDesktop = () => {
  if (!$('.info-slider-section-home').length) return;
  const section = $('.info-slider-section-home');
  const slides = section.find('.swiper-slide');

  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  gsap.set(section.find('.section-heart-red-svg'), {
    transformOrigin: '50% 50%',
  });

  tl.fromTo(
    section.find('.bg-image'),
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

  slides.each((i, e) => {
    let slide = $(e);
    tl.fromTo(
      slide.find('.quotes-img-wrap'),
      {
        y: 15,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      0.15,
    );

    tl.to(
      slide.find('.anim-translate-y'),
      {
        yPercent: 0,
        stagger: 0.1,
        opacity: 1,
      },
      0.3,
    );

    tl.fromTo(
      slide.find('.txt-size-18'),
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
  });

  tl.fromTo(
    section.find('.swiper-nav-btn-wrap'),
    {
      y: 10,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
    },
    0.9,
  );

  tl.fromTo(
    section.find('.section-heart-red-svg:not(.smaller-heart-top)'),
    {
      scale: 0.8,
      opacity: 0,
      xPercent: -15,
      yPercent: 15,
    },
    {
      scale: 1,
      opacity: 1,
      xPercent: 0,
      yPercent: 0,
      duration: 1.5,
    },
    0.9,
  );

  tl.fromTo(
    section.find('.smaller-heart-top'),
    {
      scale: 0.8,
      opacity: 0,
      xPercent: -50,
      yPercent: 50,
    },
    {
      scale: 1,
      opacity: 1,
      xPercent: 0,
      yPercent: 0,
      duration: 1,
    },
    1.2,
  );

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
  //     start: '0% 75%',
  //     end: '+=1%',
  //     toggleActions: 'none none none none',
  //     animation: tl,
  //     onEnter: () => tl.timeScale(1).play(),
  //     onLeaveBack: () => tl.timeScale(2).reverse()
  // })

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
};

const infoSliderSectionHomeMobile = () => {
  if (!$('.info-slider-section-home').length) return;
  const section = $('.info-slider-section-home');
  const firstSlide = section.find('.swiper-slide').first();
  const slides = section.find('.swiper-slide');

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
      duration: 1,
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

  slides.each((i, e) => {
    let slide = $(e);
    tl.fromTo(
      slide.find('.quotes-img-wrap'),
      {
        y: 15,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
      },
      0.15,
    );

    tl.to(
      slide.find('.anim-translate-y'),
      {
        yPercent: 0,
        stagger: 0.1,
        opacity: 1,
      },
      0.3,
    );

    tl.fromTo(
      slide.find('.txt-size-18'),
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
  });

  tl.fromTo(
    section.find('.swiper-nav-btn-wrap'),
    {
      y: 10,
      opacity: 0,
    },
    {
      y: 0,
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

const savingsCalculatorAnimDesktop = () => {
  if (!$('.circle-info-blue-section').length) return;
  const section = $('.circle-info-blue-section');
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

const savingsCalculatorAnimMobile = () => {
  if (!$('.circle-info-blue-section').length) return;
  const section = $('.circle-info-blue-section');
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

  tl.to(
    section.find('.char'),
    {
      y: 0,
      stagger: 0.02,
      opacity: 1,
      duration: 0.4,
    },
    0.15,
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
    0.45,
  );

  tl.fromTo(
    section.find('.btn-wrap'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
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
    onLeaveBack: () => tl.timeScale(2).reverse(),
  });
};

const landingPopupButton = () => {
  const $blocks = $('.sk-block');
  var $trigger;
  if ($('.contact-form-block').length) {
    $trigger = '.contact-form-block';
  } else if ($blocks[0]) {
    $trigger = $blocks[0];
  } else {
    return false;
  }

  if (
    $('.sk-lander').length > 0 &&
    $('.sk-block .form--container').length == 0 &&
    $('.sk-block').length <= 3
  ) {
    $('.header-open-form-btn').addClass('revealed');
    $('.header-cta-btn').addClass('revealed');
  } else {
    ScrollTrigger.create({
      trigger: $trigger,
      start: 'top 10%',
      end: 'bottom 0px',
      onLeave: () => {
        $('.header-open-form-btn').addClass('revealed');
        $('.header-cta-btn').addClass('revealed');
      },
      onEnterBack: () => {
        $('.header-open-form-btn').removeClass('revealed');
        $('.header-cta-btn').removeClass('revealed');
      },
    });
  }
};

const removeLandingPopupButton = () => {
  $('.landing-template-btn').removeClass('header-open-form-btn');
  $('.landing-template-btn').removeClass('header-cta-btn');
};

export const init = () => {
  headerLottieAnim();
  headerAnim();
  formContactSectionAnim();
  txtSectionDefaultAnim();
  innerPagesLandingSectionDesktopAnim();
  if (!isMobile()) {
    footerDesktopAnim();
    infoSliderSectionHomeDesktop();
    savingsCalculatorAnimDesktop();
    landingPopupButton();
  } else {
    footerMobileAnim();
    infoSliderSectionHomeMobile();
    savingsCalculatorAnimMobile();
    removeLandingPopupButton();
  }
  translateYSectionDefault();
  fadeInSectionDefaultAnim();
  circleInfoSection();
  txtBlocksLayoutSection();
  blocksGridSectionAnim();
  infoCircleTxtSectionAnim();
  innerPagesContactSection();
  bind();
  parallaxImages();
  aboutPageSymbolSectionAnim();
};
