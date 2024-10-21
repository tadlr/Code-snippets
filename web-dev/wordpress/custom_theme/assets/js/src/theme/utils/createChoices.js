import Choices from 'choices.js';

export const choices = [];
export function createChoices(selectedVal = []) {
  let options = {
    silent: false,
    renderChoiceLimit: -1,
    maxItemCount: -1,
    addItems: true,
    addItemFilter: false,
    removeItems: true,
    removeItemButton: true,
    editItems: false,
    allowHTML: false,
    duplicateItemsAllowed: false,
    delimiter: ',',
    paste: false,
    searchEnabled: false,
    searchChoices: false,
    searchFields: ['value'],
    position: 'top',
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: true,
    placeholder: true,
    placeholderValue: null,
    searchPlaceholderValue: null,
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: 'auto',
    loadingText: 'Loading...',
    noResultsText: 'No results found',
    noChoicesText: 'No choices to choose from',
    itemSelectText: 'Press to select',
    uniqueItemText: 'Only unique values can be added',
    customAddItemText: 'Only values matching specific conditions can be added',
    // addItemText: (value) => {
    //   return `Press Enter to add <b>"${value}"</b>`;
    // },
    // maxItemText: (maxItemCount) => {
    //   return `Only ${maxItemCount} values can be added`;
    // },
    // valueComparer: (value1, value2) => {
    //   return value1 === value2;
    // },
    classNames: {
      containerOuter: 'choices',
      containerInner: 'choices__inner',
      input: 'choices__input',
      inputCloned: 'choices__input--cloned',
      list: 'choices__list',
      listItems: 'choices__list--multiple',
      listSingle: 'choices__list--single',
      listDropdown: 'choices__list--dropdown',
      item: 'choices__item',
      itemSelectable: 'choices__item--selectable',
      itemDisabled: 'choices__item--disabled',
      itemChoice: 'choices__item--choice',
      placeholder: 'choices__placeholder',
      group: 'choices__group',
      groupHeading: 'choices__heading',
      button: 'choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices',
    },
    fuseOptions: {
      includeScore: false,
    },
    labelId: '',
  };

  const jsChoices = $('.js-choice');

  jsChoices.each((index, item) => {
    options = {
      ...options,
      placeholderValue: $(item).attr('placeholder')
        ? $(item).attr('placeholder')
        : null,
      callbackOnInit: null,
      callbackOnCreateTemplates: null,
    };
    choices[index] = new Choices(item, options);

    choices[index].passedElement.element.addEventListener(
      'highlightItem',
      function (event) {
        $(choices[index].containerOuter.element)
          .find('.choices__list.choices__list--dropdown')
          .removeClass('show');
        choices[index].containerOuter.element.classList.remove(
          'element-triggered',
        );
      },
    );

    $('.choices__input[role=textbox]').each((_, item) => {
      $(item).removeAttr('role');
    });

    $(choices[index].containerOuter.element)
      .find('.choices__list.choices__list--dropdown')
      .addClass('hide');

    choices[index].containerOuter.element.addEventListener(
      'hideDropdown',
      (event) => {
        $(choices[index].containerOuter.element)
          .find('.choices__list.choices__list--dropdown')
          .removeClass('show');
        choices[index].containerOuter.element.classList.remove(
          'element-triggered',
        );
      },
    );
    choices[index].containerOuter.element.addEventListener('click', (event) => {
      event.preventDefault();

      if (event.target.tagName == 'input' || event.target.tagName == 'INPUT') {
        if (
          choices[index].containerOuter.element.classList.contains(
            'element-triggered',
          )
        ) {
          choices[index].containerOuter.element.classList.remove(
            'element-triggered',
          );
          choices[index].hideDropdown();
          $(choices[index].containerOuter.element)
            .find('.choices__list.choices__list--dropdown')
            .removeClass('show');
        } else {
          choices[index].containerOuter.element.classList.add(
            'element-triggered',
          );
          $(choices[index].containerOuter.element)
            .find('.choices__list.choices__list--dropdown')
            .addClass('show');
          choices[index].showDropdown(); // Show the dropdown if it's closed
        }
      } else {
        $(choices[index].containerOuter.element)
          .find('.choices__list.choices__list--dropdown')
          .removeClass('show');
        choices[index].hideDropdown();

        event.stopPropagation();
      }
    });

    if (selectedVal) {
      choices[index].setChoiceByValue(selectedVal[index]);
    }
  });
  // const choices = new Choices(".js-choice", options);

  var toolbox = $('.choices__list.choices__list--dropdown');
}
