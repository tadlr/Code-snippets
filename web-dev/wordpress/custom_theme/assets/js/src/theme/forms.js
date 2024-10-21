// import $ from "jquery";
import { ucfirst } from '../theme/utils/utils';
import { isDesktop } from './helpers/helper';

$(() => {
  function labelReplace(el) {
    setTimeout(() => {
      const label = $(el);
      const str = ucfirst(label.html(), true);
      const newStr = str.replace(/custom_theme/g, 'CustomTheme');
      label.html(newStr, true);
    }, 1000);
  }

  function optionReplace(el) {
    setTimeout(() => {
      const option = $(el);
      let str = ucfirst(option.text(), true);
      str = str
        .replace(/custom_theme/g, 'CustomTheme')
        .replace(/e-commerce/g, 'eCommerce')
        .replace(/ecommerce/g, 'eCommerce');
      option.text(str);
    }, 1000);
  }

  function processForm(selector) {
    $(selector).each((i, el) => {
      const target = $(el);
      target.find('label span').each((i, el) => labelReplace(el));
      target.find('select option').each((i, el) => optionReplace(el));
    });
  }

  processForm('.hbspt-form');
  processForm('.gform-body');

  const observeFormChanges = (
    selector,
    className,
    labelReplace,
    optionReplace,
  ) => {
    const targetNodes = document.querySelectorAll(selector);

    targetNodes.forEach((targetNode) => {
      if (!targetNode) {
        console.error('Target node not found');
        return;
      }

      const config = { childList: true, subtree: true };

      const callback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (!targetNode.classList.contains(className)) {
              targetNode
                .querySelectorAll('label span')
                .forEach((el) => labelReplace(el));
              targetNode
                .querySelectorAll('select option')
                .forEach((el) => optionReplace(el));
              targetNode.classList.add(className);
            }
          }
        }
      };

      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
    });
  };
  const listenInputChange = (el) => {
    if ($(el).is(':visible')) {
      const input = $(el).attr('for');
      // console.log($(`#${input}`));
      $(`#${input}`).on('keyup', (inpt) => {
        // console.log('change', inpt, $(`#${input}`).val());
        // console.log(inpt.target.value);
        if (inpt.target.value) {
          $(el).addClass('filled');
        } else {
          $(el).removeClass('filled');
        }
      });
    }
  };

  const observeFormInput = (selector, className, listenInputChange) => {
    const targetNodes = document.querySelectorAll(selector);

    targetNodes.forEach((targetNode) => {
      if (!targetNode) {
        console.error('Target node not found');
        return;
      }

      const config = { childList: true, subtree: true };

      const callback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (!targetNode.classList.contains(className)) {
              console.log(className);
              targetNode
                .querySelectorAll('label')
                .forEach((el) => listenInputChange(el));
              targetNode.classList.add(className);
            }
          }
        }
      };

      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
    });
  };

  observeFormChanges(
    '.hbspt-form:not(.sk-form-hbsp)',
    'sk-form-hbsp',
    labelReplace,
    optionReplace,
  );

  if ($('.home-page-form').length) {
    // if (isDesktop()) {
    observeFormInput(
      '.form-contact-section-home .home-page-form:not(.sk-form-hbsp-ltd)',
      'sk-form-hbsp-ltd',
      listenInputChange,
    );
    // }
  }
});
