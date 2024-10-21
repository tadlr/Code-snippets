import gsap from 'gsap';
import { dropdownsHandler, isMobile } from '../helpers/helper';

import HeaderFunctionalitiesHandler from './header';

const focusSearch = (e) => {
  let input = e.currentTarget;
  input.value.length > 0
    ? $(input).parent().addClass('user-typing')
    : $(input).parent().removeClass('user-typing');
};

const checkForOpenDropdownsHandler = (item) => {
  let openedItems = item.parents('.faq-block').find('.opened').not(item);
  let preopenedItems = item
    .parents('section')
    .find('.preopened-item')
    .not(item);

  if (openedItems.length) {
    openedItems.each((i, e) => {
      let item = $(e);
      let target = item.find('.dropdown-content-wrap');

      item.removeClass('opened');

      dropdownsHandler(target, 'close');
    });
  }

  if (preopenedItems.length) {
    preopenedItems.each((i, e) => {
      let item = $(e);
      let target = item.find('.dropdown-content-wrap');

      item.removeClass('opened');
      setTimeout(() => item.removeClass('preopened-item'), 500);

      dropdownsHandler(target, 'close');
    });
  }
};

const faqDropdownHandler = (e, btn) => {
  e.stopPropagation();
  e.preventDefault();

  let item = btn.parents('.faq-question');
  let target = item.find('.dropdown-content-wrap');
  let parent = item.parents('.faq-questions-wrap');

  if (gsap.isTweening(target)) return;

  if (item.hasClass('preopened-item')) {
    item.removeClass('opened');
    setTimeout(() => item.removeClass('preopened-item'), 500);
    dropdownsHandler(target, 'close');
  } else if (!item.hasClass('opened')) {
    $(parent).find('.faq-question.open').removeClass('opened');
    $(parent).find('.dropdown-content-wrap').css('height', '0');
    item.toggleClass('opened');
    item.hasClass('opened')
      ? dropdownsHandler(target, 'open')
      : dropdownsHandler(target, 'close');
    checkForOpenDropdownsHandler(item);
  } else {
    item.removeClass('opened');
    dropdownsHandler(target, 'close');
  }
};

const tableImagesAlignHandler = () => {
  if ($('.table-block table').length) {
    $('.table-block table img').parent().css('vertical-align', 'middle');
  }

  // ScrollTrigger.refresh();
};

const landingVideoBtnHoverAnim = (btn, eventType) => {
  if (eventType == 'mouseenter') {
    gsap.to(btn.children(), {
      scale: 1.05,
      ease: 'elastic.out(0.6, 0.4)',
      stagger: 0.05,
      duration: 0.5,
    });
  } else {
    gsap.to(btn.children(), {
      scale: 1,
      ease: 'elastic.out(0.6, 0.4)',
      stagger: 0.05,
      duration: 0.5,
    });
  }
};

const bind = () => {
  $('.form-input:not(select), .form-textarea').on(
    'change keydown paste input',
    focusSearch,
  );
  $('.faq-question').on(
    'click',
    '.faq-question-title, .js-faq-dropdown-btn',
    (e) => faqDropdownHandler(e, $(e.currentTarget)),
  );
  if (!isMobile()) {
    $('.landing-video-btn')
      .on('mouseenter', (e) =>
        landingVideoBtnHoverAnim($(e.currentTarget), 'mouseenter'),
      )
      .on('mouseleave', (e) =>
        landingVideoBtnHoverAnim($(e.currentTarget), 'mouseleave'),
      );
  }
};

export const init = () => {
  new HeaderFunctionalitiesHandler();
  tableImagesAlignHandler();
  bind();
};
