import { ucfirst } from '../theme/utils/utils';

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

  observeFormChanges(
    '.hbspt-form:not(.sk-form-hbsp)',
    'sk-form-hbsp',
    labelReplace,
    optionReplace,
  );
});
