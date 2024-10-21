import { isDesktop } from '../helpers/helper';
function tocScroll() {
  const $headings = $('.blog-content').find('h2, h3, h4, h5, h6'); // Adjust if necessary

  if ($('.article-content').length > 0) {
    doTocScroll($headings);

    $(window).on('scroll', function () {
      doTocScroll($headings);
    });
  }
}

function doTocScroll($headings) {
  let activeHeading = null;
  const firstHeading = $($headings).first().offset().top;
  const headerHeight = $('#header').height();
  const scrollTop = $(window).scrollTop();
  const windowHeight = $(window).height();

  $headings.each(function (index) {
    const rect = this.getBoundingClientRect();
    const offsetTop = $(this).offset().top;

    if (rect.top >= headerHeight && rect.top <= windowHeight * 0.2 + 250) {
      activeHeading = this;
      return false;
    }

    // Handle scrolling upwards
    if (scrollTop < offsetTop - headerHeight && index === 0) {
      activeHeading = this;
      return false;
    }
  });

  if (activeHeading) {
    const target = $(activeHeading).data('link-scroll-target-section-id');

    $('.table-of-contents .anchor-link').removeClass('active');
    const $activeLink = $(
      `.table-of-contents .anchor-link[data-scroll-section-target-id="${target}"]`,
    );
    $activeLink.addClass('active');

    // if (isDesktop()) {
    //   // Ensure the active link in the TOC is visible
    //   if ($activeLink.length && !$activeLink.isInViewport()) {
    //     $activeLink.get(0).scrollIntoView({
    //       behavior: 'smooth',
    //       block: 'center',
    //     });
    //   }
    // }
  }

  if (scrollTop < firstHeading - headerHeight - 100) {
    $('.table-of-contents .anchor-link').removeClass('active');
  }
}

// Custom jQuery function to check if an element is in the viewport
$.fn.isInViewport = function () {
  const elementTop = $(this).offset().top;
  const elementBottom = elementTop + $(this).outerHeight();

  const viewportTop = $(window).scrollTop() + $('#header').outerHeight(true);
  const viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

export const init = () => {
  tocScroll();
};
