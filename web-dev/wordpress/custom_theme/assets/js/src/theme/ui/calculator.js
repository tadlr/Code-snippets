import gsap from 'gsap';
import { isMobile } from '../helpers/helper';

import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin, MotionPathPlugin);

class CalculatorSection {
  constructor() {
    this.section = $('.calculator-section');
    this.target = document.querySelector('.control-element-other');
    this.target2 = document.querySelector('.control-element-customTheme');
    this.target3 = document.querySelector('.control-element-line');
    this.target4 = document.querySelector('.draggable-text');
    this.path = document.querySelector('.graphic-path-other');
    this.path2 = document.querySelector('.graphic-path-customTheme');
    this.infoTopWrapTitle = this.section.find('.info-top-wrap-title');
    this.items = this.section.find('.info-bot-wrap-step');
    this.customThemeInfoColTopValue = this.section.find(
      '.customTheme-info-col .info-top-wrap-col-value',
    );
    this.startPoint = this.path.getPointAtLength(0);
    this.start2Point = this.path2.getPointAtLength(0);

    this.steps1 = [
      {
        x: 12.1642,
        y: 126.5268,
      },
      {
        x: 48,
        y: 124.715,
      },
      {
        x: 83.1147,
        y: 118.9935,
      },
      {
        x: 120.324,
        y: 109.2261,
      },
      {
        x: 155.8888,
        y: 93.8923,
      },
      {
        x: 190.5509,
        y: 68.1497,
      },
    ];
    this.steps2 = [
      {
        x: 12.1642,
        y: 126.5268,
      },
      {
        x: 48,
        y: 123.7667,
      },
      {
        x: 83.1147,
        y: 115.9589,
      },
      {
        x: 120.324,
        y: 101.618,
      },
      {
        x: 155.8888,
        y: 79.3309,
      },
      {
        x: 190.5509,
        y: 40.9864,
      },
    ];

    this.format = '#,###.00'; // you can put any format that you want... only string

    this.bind();
    this.draggableElementsHandler();
  }

  convertNumber(number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    let n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
      dec = typeof dec_point === 'undefined' ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
        let k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
      };

    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }

  // truncateNumber(number, index = 2) {
  //     return +number.toString().slice(0, (number.toString().indexOf(".")) + (index + 1));
  // }

  bind() {
    this.section
      .find('.info-txt-custom-input-btn')
      .on('click', (e) => this.customInputBtnHandler($(e.currentTarget)));
    this.section
      .find('.info-txt-custom-input')
      .on('change', (e) => this.customInputChangeHandler($(e.currentTarget)));

    // console.log(this.section.find('.info-txt-custom-input'));

    // this.section.find('.info-txt-custom-input').on('keypress', e => {
    //     if (e.key === 'Enter') {
    //         //   e.preventDefault();
    //         console.log('enter press');
    //     }
    // });

    this.section
      .find('.calculate-values-btn')
      .on('click', () => this.onCalculateBtnClick());

    $(window).on('customSelectChange', (e, val) =>
      this.customSelectChangeHandler(val.target, val.chosenValEl),
    );
    this.section
      .find('.info-txt-custom-select')
      .on('click', '.info-txt-custom-select-item', (e) =>
        $(window).trigger('customSelectChange', {
          target: $(e.currentTarget),
          chosenValEl: $(e.currentTarget)
            .parents('.calc-value-dropdown-wrap')
            .find('[data-chosen-val]'),
        }),
      );
    this.section
      .find('.calculator-info-txt')
      .on('click', '.js-calc-selected-value-el, .dropdown-arrow-btn', (e) =>
        this.calcCustomDropdownHandler($(e.currentTarget)),
      );
  }

  customInputBtnHandler(btn) {
    this.customInputChangeHandler(btn.parent().find('input'));
  }

  customInputChangeHandler(input) {
    // console.log(input[0]);
    let amount = input[0].value;
    let type = input.attr('name');
    let chosenValEl = input
      .parents('.calc-value-dropdown-wrap')
      .find('[data-chosen-val]');
    // if (type !== 'monthly_processing_volume') {
    chosenValEl.attr('title', '$' + this.convertNumber(amount, 2, '.', ','));
    chosenValEl.html('$' + this.convertNumber(amount, 2, '.', ','));
    // } else {
    //     chosenValEl.attr('title', amount);
    //     chosenValEl.html(amount);
    // }
    chosenValEl.attr('data-chosen-val', amount);

    this.onClickOutsideClose();

    if (type === 'monthly_fees') {
      this.monthly_savings_amount = amount * 0.1;
      this.savingsCalculations = {
        monthly_savings: amount * 0.1,
        savings_years_1: amount * 0.1 * 12,
        savings_years_3: amount * 0.1 * 36,
        savings_years_5: amount * 0.1 * 60,
      };
    }

    if (type === 'monthly_processing_volume') {
      this.monthly_processing_volume = amount;
    }

    if (type === 'monthly_fees') {
      this.monthly_fees = amount;
    }

    if (
      typeof this.monthly_processing_volume !== 'undefined' &&
      typeof this.monthly_fees !== 'undefined' &&
      typeof this.savingsCalculations !== 'undefined'
    ) {
      this.section.find('.calculate-values-btn').removeAttr('disabled');
      // this.updateGraphValuesDragChange(this.section.find('.info-bot-wrap-step.active-step').attr('data-step'));
      // this.updateSavingsValuesInputChange(this.savingsCalculations);
      // this.calculateEffectiveRate();
      // this.scrollToResultsMobile();
    }
  }

  draggableTextVisibleHandler(mode) {
    if (mode === 'show') {
      gsap.to(this.target4, { opacity: 1 });
    } else {
      gsap.to(this.target4, { opacity: 0 });
    }
  }

  draggableAnimHandler() {
    let tl = gsap.timeline();
    this.steps1.forEach((pt, i) => {
      tl.call(
        () => {
          gsap.set(this.target, {
            transformOrigin: 'center',
            x: pt.x,
            y: pt.y,
          });
          this.updateGraphValuesDragChange(i);
          this.setActiveStepClass(i);
        },
        null,
        0.4 * i,
      );
    });

    this.steps2.forEach((pt, i) => {
      tl.call(
        () => {
          gsap.set(this.target4, {
            transformOrigin: 'center',
            x: pt.x,
            y: pt.y - 6,
          });

          gsap.set(this.target2, {
            transformOrigin: 'center',
            x: pt.x,
            y: pt.y,
          });

          gsap.set(this.target3, {
            transformOrigin: 'center',
            x: pt.x,
            y: pt.y,
          });

          if (this.steps2.length - 1 === i) {
            this.draggableTextVisibleHandler('show');
          }
        },
        null,
        0.4 * i,
      );
    });
  }

  handleImageChange() {
    let imageFull = this.section.find('.graphic-img');
    let svg = this.section.find('.background-graphic-paths-svg');
    if (!imageFull.parent().hasClass('img-swapped')) {
      imageFull.parent().addClass('img-swapped');
      svg.addClass('svg-show');
      this.draggableAnimHandler();
    }
  }

  onCalculateBtnClick() {
    if (
      typeof this.monthly_processing_volume !== 'undefined' &&
      typeof this.monthly_fees !== 'undefined' &&
      typeof this.savingsCalculations !== 'undefined'
    ) {
      this.updateGraphValuesDragChange(
        this.section.find('.info-bot-wrap-step.active-step').attr('data-step'),
      );
      this.updateSavingsValuesInputChange(this.savingsCalculations);
      this.calculateEffectiveRate();
      this.scrollToResultsMobile();
      this.handleImageChange();
    }
  }

  scrollToResultsMobile() {
    if (isMobile()) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: this.section.find('.calculator-results-wrap .customTheme-col'),
          offsetY: $('header').outerHeight() + 10,
        },
      });
    }
  }

  calculateEffectiveRate() {
    $('.js-calculate-effective-rate-row').each((i, e) => {
      let row = $(e);
      if (row.hasClass('old-effective-rate')) {
        let value = this.monthly_fees / this.monthly_processing_volume;
        row
          .find('.info-row-name-value')
          .attr('title', value + '%')
          .html(value + '%');
      } else {
        let value = (this.monthly_fees * 0.9) / this.monthly_processing_volume;
        row
          .find('.info-row-name-value')
          .attr('title', value + '%')
          .html(value + '%');
      }
    });
  }

  updateSavingsValuesInputChange(savingsObj) {
    this.section
      .find('.customTheme-col')
      .find('.info-row-name-value')
      .each((i, e) => {
        let item = $(e);
        for (let key in savingsObj) {
          if (key === item.attr('data-row-type')) {
            let amount = savingsObj[key];
            let value = this.convertNumber(amount, 2, '.', ',');
            item.attr('title', value).html('$' + value);
          }
        }
      });
  }

  updateGraphValuesDragChange(step) {
    if (this.savingsCalculations) {
      let amount =
        this.savingsCalculations.monthly_savings * 12 * parseInt(step);
      this.customThemeInfoColTopValue.html(
        '$' + this.convertNumber(amount, 2, '.', ','),
      );
    }
  }

  onClickOutsideClose() {
    this.section
      .find('.opened-calc-js-dropdown')
      .removeClass('opened-calc-js-dropdown');
    this.defocusInputs();
  }

  defocusInputs() {
    this.section.find('.calc-value-dropdown-wrap input').blur();
    if (this.inputTimeoutFocus) clearTimeout(this.inputTimeoutFocus);
  }

  customSelectChangeHandler(target, chosenValEl) {
    chosenValEl.attr('title', target.html());
    chosenValEl.html(target.html());
    chosenValEl.attr('data-chosen-val', target.data('val'));
    this.calcCustomDropdownHandler(chosenValEl);
  }

  calcCustomDropdownHandler(btn) {
    // console.log(btn);
    let thisWrap = btn.parents('.calc-value-dropdown-wrap');
    this.section
      .find('.opened-calc-js-dropdown')
      .not(thisWrap)
      .removeClass('opened-calc-js-dropdown');
    thisWrap.toggleClass('opened-calc-js-dropdown');
    if (
      thisWrap.find('input').length &&
      thisWrap.hasClass('opened-calc-js-dropdown')
    ) {
      this.inputTimeoutFocus = setTimeout(() => {
        thisWrap.find('input').focus();
      }, 50);
    } else {
      this.defocusInputs();
    }

    if (this.section.find('.opened-calc-js-dropdown').length) {
      $('body')
        .off('mousedown.clickOutsideDropdown')
        .on('mousedown.clickOutsideDropdown', (e) => {
          if (
            !$(e.target).hasClass('opened-calc-js-dropdown') &&
            !$(e.target).parents('.opened-calc-js-dropdown').length
          ) {
            // console.log('in');
            this.section
              .find('.opened-calc-js-dropdown')
              .removeClass('opened-calc-js-dropdown');
            $('body').off('mousedown.clickOutsideDropdown');
          }
        });
    } else {
      $('body').off('mousedown.clickOutsideDropdown');
    }
  }

  setActiveStepClass(step) {
    step === 0
      ? this.infoTopWrapTitle.html('Today')
      : this.infoTopWrapTitle.html(step + ' Years Saving');

    this.items.removeClass('active-step');

    this.items.each((i, e) => {
      if (parseInt($(e).attr('data-step')) === step) {
        $(e).addClass('active-step');
      }
    });
  }

  draggableElementsHandler() {
    gsap.set(this.target, {
      x: this.startPoint.x,
      y: this.startPoint.y,
    });

    gsap.set(this.target2, {
      x: this.start2Point.x,
      y: this.start2Point.y,
    });

    let draggable = Draggable.create(this.target, {
      liveSnap: true,
      snap: {
        points: this.steps1,
        radius: 9999,
      },
      onDrag: () => {
        let data = {
          x: draggable[0].endX,
          y: draggable[0].endY,
        };

        let indexOfItem = null;

        this.steps1.map((e, i) => {
          if (e.x === data.x && e.y === data.y) {
            indexOfItem = i;
          }
        });

        this.updateGraphValuesDragChange(indexOfItem);

        this.setActiveStepClass(indexOfItem);

        gsap.set(this.target2, {
          transformOrigin: 'center',
          x: this.steps2[indexOfItem].x,
          y: this.steps2[indexOfItem].y,
        });

        gsap.set(this.target3, {
          transformOrigin: 'center',
          x: this.steps2[indexOfItem].x,
          y: this.steps2[indexOfItem].y,
        });

        gsap.set(this.target4, {
          transformOrigin: 'center',
          x: this.steps2[indexOfItem].x,
          y: this.steps2[indexOfItem].y - 6,
        });
      },
      onDragStart: () => this.draggableTextVisibleHandler('hide'),
      onDragEnd: () => this.draggableTextVisibleHandler('show'),
    });

    let draggable2 = Draggable.create(this.target2, {
      liveSnap: true,
      snap: {
        points: this.steps2,
        radius: 9999,
      },
      onDrag: () => {
        let data = {
          x: draggable2[0].endX,
          y: draggable2[0].endY,
        };

        let indexOfItem = null;

        this.steps2.map((e, i) => {
          if (e.x === data.x && e.y === data.y) {
            indexOfItem = i;
          }
        });

        this.updateGraphValuesDragChange(indexOfItem);

        this.setActiveStepClass(indexOfItem);

        gsap.set(this.target, {
          transformOrigin: 'center',
          x: this.steps1[indexOfItem].x,
          y: this.steps1[indexOfItem].y,
        });

        gsap.set(this.target3, {
          transformOrigin: 'center',
          x: this.steps2[indexOfItem].x,
          y: this.steps2[indexOfItem].y,
        });

        gsap.set(this.target4, {
          transformOrigin: 'center',
          x: this.steps2[indexOfItem].x,
          y: this.steps2[indexOfItem].y - 6,
        });
      },
      onDragStart: () => this.draggableTextVisibleHandler('hide'),
      onDragEnd: () => this.draggableTextVisibleHandler('show'),
    });
  }
}

export const init = () => {
  new CalculatorSection();
};
