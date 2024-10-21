import BlazeSlider from 'blaze-slider';

const MobileTable = (mobileTable) => {
  const tables = mobileTable;

  tables.forEach((table) => {
    const tableID = table.getAttribute('id');

    if (tableID === null) {
      return;
    }

    const el = document.querySelector(`#${tableID} .blaze-slider`);

    const options = {
      all: {
        loop: true,
        slideGap: '0px',
        enableAutoplay: false,
        autoplayInterval: 3000,
        draggable: false,
        stopAutoplayOnInteraction: true,
        slidesToShow: 1,
      },
      '(max-width: 1024px)': {
        slidesToShow: $(table).data('slides-1024') ?? 5,
      },
      '(max-width: 992px)': {
        slidesToShow: $(table).data('slides-992') ?? 4,
      },
      '(max-width: 940px)': {
        slidesToShow: $(table).data('slides-940') ?? 3,
      },
      '(max-width: 820px)': {
        slidesToShow: $(table).data('slides-820') ?? 2,
      },
      '(max-width: 767px)': {
        slidesToShow: $(table).data('slides-767') ?? 1,
      },
      '(max-width: 580px)': {
        draggable: true,
        slidesToShow: $(table).data('slides-580') ?? 1,
      },
    };

    // $(".mb-table").each(function () {
    (function ($) {
      $.fn.matchHeight._update();
    })(jQuery);
    updateHeaderPosition($(`#${tableID}`));
    // });

    $(window).on('scroll', function () {
      // $(".mb-table").each(function () {
      updateHeaderPosition($(`#${tableID}`));
      // });
    });

    // $(window).on("scroll", () => {
    //   moveScroll(table);
    // });
    // moveScroll(el);

    const slider = new BlazeSlider(el, options);

    if (slider.isStatic) {
      $(`.blaze-next[data-btn-for="${tableID}"]`).prop('disabled', true);
      $(`.blaze-prev[data-btn-for="${tableID}"]`).prop('disabled', true);
    }

    $(`.blaze-next[data-btn-for="${tableID}"]`).on('click', function (e) {
      e.preventDefault();
      slider.next();
    });

    $(`.blaze-prev[data-btn-for="${tableID}"]`).on('click', function (e) {
      e.preventDefault();
      slider.prev();
    });

    window.addEventListener('resize', () => {
      var header = $(table).find('.mt-header');
      $(header).removeClass('sticky');
      slider.refresh();

      if (slider.isStatic) {
        $(`.blaze-next[data-btn-for="${tableID}"]`).prop('disabled', true);
        $(`.blaze-prev[data-btn-for="${tableID}"]`).prop('disabled', true);
      } else {
        $(`.blaze-next[data-btn-for="${tableID}"]`).prop('disabled', false);
        $(`.blaze-prev[data-btn-for="${tableID}"]`).prop('disabled', false);
      }
    });

    window.addEventListener('keydown', function (event) {
      const key = event.key;
      if (key === 'ArrowRight') {
        slider.next();
      }
      if (key === 'ArrowLeft') {
        slider.prev();
      }
    });
  });
};

export default MobileTable;

function updateHeaderPosition(el) {
  var elID = $(el).attr('id');
  var scroll = $(window).scrollTop();
  var table = $(el);
  var headers = table.find('.mt-header');

  if (headers.length > 0) {
    var boxInner = $(table).find('.mt-box-inner').last().offset().top;

    $(headers).each((_, header) => {
      var mainHeader = $('#header'); // Replace with the selector for your main header
      var headerHeight = mainHeader.height(); // Get the height of the main header
      var addedStylesClass = `added-styles-${elID}`; // Create a unique class for added styles
      const mtHeaderParent = $(header).parent();

      const boxes = $(mtHeaderParent).find('.mt-box:not(.mt-header)');

      if (boxes.length < 3) {
        return;
      }

      var last_box = $(table)
        .find('.mt-box.mt-logo.mt-second')
        .last()
        .offset().top;

      var anchor_top =
        table.offset().top - $(header).height() - headerHeight / 3;
      var anchor_bottom = table.offset().top + table.height() - headerHeight;

      var $tableContainer = $(header).closest('.mb-table-container');

      if (scroll >= anchor_top && scroll <= anchor_bottom) {
        var remove = 0;
        if (!$(header).parent().hasClass('fixed-column-inner')) {
          remove = 0;
        }

        var lastTop = (scroll - last_box) * -1;

        if (!$(header).hasClass(addedStylesClass)) {
          $(header).addClass(addedStylesClass);
          $(header).addClass('sticky');
          $(header).css({ top: headerHeight });
          $($tableContainer).find('.blaze-prev').addClass('sticky');
          $($tableContainer).find('.blaze-next').addClass('sticky');
        } else {
          //   // Update the top position of the existing header
          var boxH = $(table).find('.mt-box.mt-logo.mt-second').last().height();
          var limit = boxInner - anchor_top + headerHeight;

          if (lastTop < limit) {
            // $(header).removeClass("sticky");
            $(header).css({ top: -boxH });
            $($tableContainer).find('.blaze-prev').removeClass('sticky');
            $($tableContainer).find('.blaze-next').removeClass('sticky');
          } else {
            $(header).addClass('sticky');
            $(header).css({ top: headerHeight });
            $($tableContainer).find('.blaze-prev').addClass('sticky');
            $($tableContainer).find('.blaze-next').addClass('sticky');
          }
        }
      } else {
        // Remove the added styles class and reset the header position
        $(header).removeClass(addedStylesClass);
        $(header).removeClass('sticky');
        $(header).css({ top: 0 });
        $($tableContainer).find('.blaze-prev').removeClass('sticky');
        $($tableContainer).find('.blaze-next').removeClass('sticky');
      }
    });
  }
}

export const init = () => {
  const mobileTable = document.querySelectorAll('.mb-table');

  if (mobileTable.length) {
    MobileTable(mobileTable);
  }
};
