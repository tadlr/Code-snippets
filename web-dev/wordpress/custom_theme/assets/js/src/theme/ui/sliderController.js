import BlazeSlider from 'blaze-slider';
import { getUUID } from '../utils/utils';

const SliderController = (sliderContent) => {
  const sliderElements = sliderContent;

  sliderElements.forEach((sliderElement) => {
    const itemID = getUUID();
    const sliderID = sliderElement.setAttribute('id', itemID);

    console.log(sliderElement, sliderID);
    if (sliderID === null) {
      return;
    }

    sliderElement.querySelectorAll('.slider-control').forEach((element) => {
      element.setAttribute('data-btn-for', itemID);
    });

    sliderElement.querySelectorAll('li.slide').forEach((element) => {
      element.setAttribute('data-mh', 'slider-content-' + itemID);
    });

    const el = document.getElementById(`${itemID}`);

    const options = {
      all: {
        loop: true,
        slideGap: '0px',
        enableAutoplay: false,
        autoplayInterval: 3000,
        draggable: true,
        stopAutoplayOnInteraction: true,
        slidesToShow: 1,
      },
    };

    if (!$(sliderElement).data('single-slide')) {
      // console.log(options);

      $.extend(options, {
        '(max-width: 1024px)': {
          draggable: false,
          slidesToShow: $(sliderElement).data('slides-1024') ?? 5,
        },
        '(max-width: 992px)': {
          draggable: false,
          slidesToShow: $(sliderElement).data('slides-992') ?? 4,
        },
        '(max-width: 940px)': {
          draggable: false,
          slidesToShow: $(sliderElement).data('slides-940') ?? 3,
        },
        '(max-width: 820px)': {
          draggable: false,
          slidesToShow: $(sliderElement).data('slides-820') ?? 2,
        },
        '(max-width: 767px)': {
          draggable: false,
          slidesToShow: $(sliderElement).data('slides-767') ?? 1,
        },
        '(max-width: 580px)': {
          draggable: true,
          slidesToShow: $(sliderElement).data('slides-580') ?? 1,
        },
      });
      // console.log(options);
    }

    // $(".mb-sliderElement").each(function () {
    (function ($) {
      $.fn.matchHeight._update();
    })(jQuery);

    const slider = new BlazeSlider(el, options);

    if (slider.isStatic) {
      $(`.blaze-next[data-btn-for="${sliderID}"]`).prop('disabled', true);
      $(`.blaze-prev[data-btn-for="${sliderID}"]`).prop('disabled', true);
    }

    $(`.blaze-next[data-btn-for="${sliderID}"]`).on('click', function (e) {
      e.preventDefault();
      slider.next();
    });

    $(`.blaze-prev[data-btn-for="${sliderID}"]`).on('click', function (e) {
      e.preventDefault();
      slider.prev();
    });

    window.addEventListener('resize', () => {
      slider.refresh();

      if (slider.isStatic) {
        $(`.blaze-next[data-btn-for="${sliderID}"]`).prop('disabled', true);
        $(`.blaze-prev[data-btn-for="${sliderID}"]`).prop('disabled', true);
      } else {
        $(`.blaze-next[data-btn-for="${sliderID}"]`).prop('disabled', false);
        $(`.blaze-prev[data-btn-for="${sliderID}"]`).prop('disabled', false);
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

export const init = () => {
  const sliders = document.querySelectorAll('.sk-slider');

  SliderController(sliders);
};
