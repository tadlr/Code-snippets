import gsap from 'gsap';
import { createChoices, choices } from './createChoices.js';
import { ScrollTrigger } from 'gsap/all';
import { isMobile } from '../helpers/helper.js';

function showError() {
  $('.blog-loading').addClass('d-none');
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('col-sm-12', 'py-5', 'my-5');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div class="fs-6">${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>',
    ].join('');

    $('#articles-wrapper').html(wrapper);
  };

  appendAlert(
    'Something went wrong. Please reload the page and try again.',
    'danger',
  );
}
class BlogFilter {
  constructor() {
    this.bind();
    this.showHideFilter();
    this.singleArticle();

    const buttonReset = $(
      '<a class=btn-filter-rst href=#>Clear all filters</a>',
    ).addClass('trigger-reset');

    const listChoices = $('.blog-filter .filter-checkboxes');
    var btnExists = $(listChoices).find('.btn-filter-rst');

    if (btnExists) {
      btnExists.remove();
    }
    var $category = $('[name=category\\[\\]]');
    var $businessType = $('[name=business-type\\[\\]]');
    var $contentType = $('[name=content-type\\[\\]]');

    if (
      $category.length > 0 &&
      $businessType.length > 0 &&
      $contentType.length > 0
    ) {
      if (
        $($category).val().length > 0 ||
        $($businessType).val().length > 0 ||
        $($contentType).val().length > 0
      ) {
        $(listChoices).append(buttonReset);
        var rstBtn = $(listChoices).find('.btn-filter-rst');

        $(rstBtn).on('click', (e) => {
          e.preventDefault();
          $(rstBtn).remove();
          choices.forEach((choice) => {
            choice.clearStore();
          });
          // $("#search-input").val("");

          $('#blog-filter').trigger('submit');
        });
      }
    }
  }

  bind() {
    // $(".trigger-reset").on("click", () => {
    //   choices.forEach((choice) => {
    //     choice.clearStore();
    //   });
    //   // $("#search-input").val("");

    //   $("#blog-filter").trigger("submit");
    // });

    $('.category-filter').on('change', (e) => {
      this.blogFilter(e);
    });

    $('#blog-filter').on('submit', (e) => {
      this.blogFilter(e);
    });

    $('.filter-clear-all').on('click', (e) => {
      $(e.currentTarget)
        .parent()
        .find('.blog-filter-check')
        .prop('checked', false);
      this.blogFilter();
    });

    $('body').on('click', '.blog-pagination a', (e) => {
      let clicked = $(e.currentTarget);
      e.preventDefault();
      this.blogPaginationFilter(clicked);
    });
  }

  scrollTo(target) {
    ScrollTrigger.refresh();
    gsap.to(window, {
      duration: 1,
      scrollTo: $(target).offset().top - $('#header').outerHeight(),
    });
  }

  // blogFilter(e) {
  //   this.resetPagination();
  //   let formAction = $("#blog-filter").attr("action"),
  //     form = $("#blog-filter"),
  //     data = form.serialize();

  //   $.ajax({
  //     url: formAction,
  //     type: "POST",
  //     data: data,
  //     async: false,
  //     cache: false,
  //   })
  //     .done((response) => {
  //       $("#articles-wrapper").html(response);
  //       this.scrollTo(".blog-filter");
  //       localStorage.clear();
  //     })
  //     .fail(() =>  {});
  // }

  // blogSearch(e) {
  //   console.log("test");

  //   this.resetPagination();
  //   let formAction = $("#searchform").attr("action"),
  //     form = $("#searchform"),
  //     data = form.serialize();
  // }

  //

  async ajaxContent(formAction, data, isValid, form) {
    // console.log();

    $('.btn-filter-rst').remove();
    $(form)
      .find(':input')
      .each((_, input) => {
        // console.log(input);
      });

    $.ajax({
      url: formAction,
      type: 'POST',
      data: data,
    })
      .done((response) => {
        $('#articles-wrapper').html(response);
        $('.blog-loading').addClass('d-none');
        this.updateFilters();
        if (!isValid && !data) {
          history.pushState(null, null, `/blog`);
        } else if (data) {
          history.pushState(null, null, `/blog`);
          history.pushState(null, null, `/blog?${data}`);
        }

        // console.log(data);
        // this.scrollTo(".blog-filter");
      })
      .fail(function (e) {
        console.log(e);
        showError();
      });
  }

  async blogFilter(e) {
    $('.blog-loading.d-none').removeClass('d-none');
    $('#articles-wrapper .blog-grid').remove();
    $('#articles-wrapper .blog-pagination').remove();

    e.preventDefault();
    this.resetPagination();
    let formAction = $('#blog-filter').attr('action'),
      form = $('#blog-filter'),
      formz = form.find(':not([name=search_terms])'),
      data = formz.serialize(),
      pageNum = $('.blog-pagination a.active').data('page');

    if (!pageNum) {
      pageNum = 1;
    }

    var isValid = !$('#blog-filter :input').filter(() => {
      return this.value;
    }).length;

    if (!isValid) {
      data = 'filter%5Bbusiness-type%5D=&s=';
    }

    data = data + '&page=' + pageNum;

    this.ajaxContent(formAction, data, isValid, form);
  }

  async blogPaginationFilter(clicked) {
    this.scrollTo('.blog-filter');

    setTimeout(() => {
      $('.blog-loading.d-none').removeClass('d-none');
      $('#articles-wrapper .blog-grid').remove();
      $('#articles-wrapper .blog-pagination').remove();
      let formAction = $('#blog-filter').attr('action'),
        form = $('#blog-filter'),
        dataVal = clicked.data('page'),
        data = form.serialize();
      data = data + '&page=' + dataVal;

      var isValid = !!$('#blog-filter :input').filter(() => {
        return this.value;
      }).length;

      this.ajaxContent(formAction, data, isValid, form);
    }, 800);
  }

  showError() {
    $('.blog-loading').addClass('d-none');
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('col-sm-12', 'py-5', 'my-5');
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div class="fs-6">${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>',
      ].join('');

      $('#articles-wrapper').html(wrapper);
    };

    appendAlert(
      'Something went wrong. Please reload the page and try again.',
      'danger',
    );
  }

  resetFilters() {
    $('.read-more-button').on('click', () => {
      $('#blog-filter option').prop('selected', () => {
        return this.defaultSelected;
      });
    });
  }

  async updateFilters() {
    // let cat = $("#filters-category-options").detach(),
    //   bType = $("#filters-business-type-options").detach(),
    //   cType = $("#filters-content-type-options").detach();
    let cat = $('#filters-category-options').clone(),
      bType = $('#filters-business-type-options').clone(),
      cType = $('#filters-content-type-options').clone();

    var $category = $('[name=category\\[\\]]');
    var $businessType = $('[name=business-type\\[\\]]');
    var $contentType = $('[name=content-type\\[\\]]');

    var $catVal = $($category).val();
    var $bTypeVal = $($businessType).val();
    var $cTypeVal = $($contentType).val();

    const selectedVal = [];
    choices.forEach((choice, _) => {
      selectedVal[_] = choice.getValue(true);
      choice.destroy();
    });

    $('#filters-category-options').remove(),
      $('#filters-business-type-options').remove(),
      $('#filters-content-type-options').remove();

    if ($($catVal).length == 0) {
      $($category).html($(cat).html());
    }

    // $($businessType).val().length;
    if ($($bTypeVal).length == 0) {
      $($businessType).html($(bType).html());
    }

    // $($contentType).val().length;
    if ($($cTypeVal).length == 0) {
      $($contentType).html($(cType).html());
    }

    var $search = $('[name=search]');

    // console.log($contentType);
    createChoices(selectedVal);

    // this.filterRemover($category, 0);
    const buttonReset = $(
      '<a class=btn-filter-rst href=#>Clear all filters</a>',
    ).addClass('trigger-reset');

    const listChoices = $('.blog-filter .filter-checkboxes');
    var btnExists = $(listChoices).find('.btn-filter-rst');

    if (btnExists) {
      btnExists.remove();
    }

    if (
      $($category).val().length > 0 ||
      $($businessType).val().length > 0 ||
      $($contentType).val().length > 0 ||
      $($search).val().length > 0
    ) {
      $(listChoices).append(buttonReset);
      var rstBtn = $(listChoices).find('.btn-filter-rst');
      if (
        $($category).val().length == 0 &&
        $($businessType).val().length == 0 &&
        $($contentType).val().length == 0 &&
        $($search).val().length > 0
      ) {
        $('.filter-checkboxes.row').addClass('w-rst-btn');
      }

      $(rstBtn).on('click', (e) => {
        e.preventDefault();
        $(rstBtn).remove();
        $('.filter-checkboxes.row').removeClass('w-rst-btn');
        choices.forEach((choice) => {
          choice.clearStore();
        });
        $('#search-input').val('');

        $('#blog-filter').trigger('submit');
      });
    }
  }

  filterRemover($field, $index) {
    const buttonReset = $(
      '<a class=btn-filter-rst href=#>Remove filter</a>',
    ).addClass('trigger-reset');

    const listChoices = $field.closest('.select-wrap');
    var btnExists = $(listChoices).find('.btn-filter-rst');

    if (btnExists) {
      btnExists.remove();
    }

    var $search = $('[name=search]');

    var $category = $('[name=category\\[\\]]');
    var $businessType = $('[name=business-type\\[\\]]');
    var $contentType = $('[name=content-type\\[\\]]');

    if ($($field).val().length > 0) {
      $(listChoices).append(buttonReset);

      if (
        $($category).val().length == 0 &&
        $($businessType).val().length == 0 &&
        $($contentType).val().length == 0 &&
        $($search).val().length > 0
      ) {
        $('.filter-checkboxes.row').addClass('w-rst-btn');
      }

      var rstBtn = $(listChoices).find('.btn-filter-rst');

      $(rstBtn).on('click', (e) => {
        e.preventDefault();

        $(rstBtn).remove();
        $('.filter-checkboxes.row').removeClass('w-rst-btn');
        choices[$index].removeActiveItems();
        $('#search-input').val('');
        $('#blog-filter').trigger('submit');
      });
    }
  }

  resetPagination() {
    let paginationLinks = $($('body').find('.blog-pagination')).find('a');
    $(paginationLinks)
      .eq(0)
      .addClass('active')
      .siblings()
      .removeClass('active');
  }

  showHideFilter() {
    $('#show-filters').on('click', (e) => {
      if ($('.filter-checkboxes').hasClass('opened')) {
        $('.filter-checkboxes').slideUp();
        $('.filter-checkboxes').removeClass('opened');
        $(e.currentTarget).removeClass('active');
      } else {
        $('.filter-checkboxes').slideDown();
        $('.filter-checkboxes').addClass('opened');
        $(e.currentTarget).addClass('active');
      }
    });
  }

  singleArticle() {
    $('.anchor-link').on('click', (e) => {
      if (isMobile()) {
        let linkDataValue = $(e.currentTarget).data('scroll-section-target-id');
        let targetElement = $(
          `[data-link-scroll-target-section-id="${linkDataValue}"]`,
        )[0];

        // Adjust the scroll position to be 50 pixels before the target element
        let adjustedTopPosition = $(targetElement).offset().top - 100;
        if (window.innerWidth > 600 && window.innerWidth < 1024) {
          adjustedTopPosition = adjustedTopPosition - 50;
        }

        $('html, body').animate(
          {
            scrollTop: adjustedTopPosition,
          },
          100,
        ); // 500ms animation duration
      } else {
        let linkDataValue = $(e.currentTarget).data('scroll-section-target-id');
        // let headingDataAttr = `data-link-scroll-target-section-id="${linkDataValue}"`;
        // console.log(headingDataAttr);
        this.scrollTo(
          $(`[data-link-scroll-target-section-id="${linkDataValue}"]`)[0],
        );
      }
    });
  }
}

export const init = () => {
  new BlogFilter();
  createChoices();
};
