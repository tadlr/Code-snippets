import $ from 'jquery';
import gsap from 'gsap';
import {
  animationStarting,
  isMobile,
  debounce,
  getTotalHeight,
} from '../helpers/helper';

const contactsPageHeroAnim = () => {
  if (!$('.contact-page').length) return;
  const section = $('.contact-page');
  let elements = !isMobile()
    ? section.find('.team-images img')
    : section.find('.mobile-team-images img');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
  });

  tl.fromTo(
    section.find('.background-svg-wrap'),
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
    0.2,
  );

  tl.fromTo(
    elements,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.05,
    },
    0.4,
  );
};

const contactsPageTabSection = () => {
  if (!$('.contacts-page-tabs-section').length) return;
  const section = $('.contacts-page-tabs-section');

  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  section.find('.container').each((i, e) => {
    let el = $(e);
    tl.fromTo(
      el.find('.background-svg-wrap'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      0,
    );

    tl.to(
      el.find('.tab-content-heading .char'),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0,
    );
  });

  tl.fromTo(
    section.find('#tabs li, .user-testimonial'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.1,
    },
    0,
  );

  tl.fromTo(
    section.find('.container:first-of-type .tab-subheading'),
    {
      x: -10,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
    },
    0.2,
  );

  tl.fromTo(
    [
      section.find('.container:first-of-type .tab-contacts').children(),
      section.find(
        '.container:first-of-type .tab-contacts-post-txt, .container:first-of-type .contacts-tab-form',
      ),
    ],
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.1,
    },
    0.4,
  );

  const observerOptions = {
    root: null,
    threshold: 0,
    rootMargin: `0px 0px -25% 0px`,
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

const stickySidebarAnim = () => {
  if (!$('.contacts-page-tabs-section').length) return;
  const section = $('.contacts-page-tabs-section');
  let parallaxTween;

  let contentHeight =
    section.find('#tabs').outerHeight(true) +
    section.find('.user-testimonial').outerHeight(true);
  let totalHeight = section.find('.tabs-nav').outerHeight();

  if (totalHeight < innerHeight) return;

  parallaxTween = gsap.fromTo(
    section.find('.tabs-nav'),
    {
      y: 0,
    },
    {
      y: totalHeight - contentHeight,
      ease: 'none',
      paused: true,
    },
  );

  let sectionOffsetTop = getTotalHeight(section.prevAll('section'));
  let contentOffset =
    $('#main-content').outerHeight() - $('#main-content').height();

  let progressTween = () => {
    if (typeof parallaxTween == 'undefined') return;

    const elPosition =
      window.scrollY -
      sectionOffsetTop -
      (section.outerHeight() - section.height() + contentOffset) +
      $('#header').outerHeight();

    let currentProgress = elPosition / (totalHeight - contentHeight);

    // console.log(currentProgress)

    parallaxTween.progress(currentProgress);
  };

  $(window).on('contactPageChangeContainer', (e, val) => {
    contentHeight =
      section.find('#tabs').outerHeight(true) +
      section.find('.user-testimonial').outerHeight(true);
    totalHeight = section.find('.tabs-nav').outerHeight();

    parallaxTween = gsap.fromTo(
      section.find('.tabs-nav'),
      {
        y: 0,
      },
      {
        y: totalHeight - contentHeight,
        ease: 'none',
        paused: true,
      },
    );
  });

  $(window).on('resizeObserverTrigger', () => {
    contentHeight =
      section.find('#tabs').outerHeight(true) +
      section.find('.user-testimonial').outerHeight(true);
    totalHeight = section.find('.tabs-nav').outerHeight();

    parallaxTween = gsap.fromTo(
      section.find('.tabs-nav'),
      {
        y: 0,
      },
      {
        y: totalHeight - contentHeight,
        ease: 'none',
        paused: true,
        duration: 10,
      },
    );

    sectionOffsetTop = getTotalHeight(section.prevAll('section'));
    contentOffset =
      $('#main-content').outerHeight() - $('#main-content').height();

    progressTween = () => {
      if (typeof parallaxTween == 'undefined') return;

      const elPosition =
        window.scrollY -
        sectionOffsetTop -
        (section.outerHeight() - section.height() + contentOffset) +
        $('#header').outerHeight();

      let currentProgress = elPosition / (totalHeight - contentHeight);

      // console.log(currentProgress)

      parallaxTween.progress(currentProgress);
    };
  });

  // $(window).on('resize',
  //     debounce(() => {

  //     }, 150)
  // )
};

export const init = () => {
  contactsPageHeroAnim();
  contactsPageTabSection();
  if (!isMobile()) {
    stickySidebarAnim();
  }
};
