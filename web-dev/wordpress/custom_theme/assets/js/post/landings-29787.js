$ = jQuery;
$(function () {
  if ($('.sk-lander--29787').length > 0) {
    const $imagePopCB = $(
      '.talk-to-us-block-popup-form .mobile-contact-form.landing-page-form .img-srtcode',
    ).detach();
    const $image = $('.form-cta .img-srtcode').detach();

    const $imagePop = $(
      '.mobile-contact-form.landing-page-form .form--area .img-srtcode',
    ).detach();

    $(document).ready(function () {
      checkAndAppend('.form-cta .hs_submit.hs-submit .actions', $image);

      checkAndAppend('.form-cta .hs_submit.hs-submit .actions', $image);

      checkAndAppend(
        '.mobile-contact-form.landing-page-form .form--area .hs_submit.hs-submit .actions',
        $imagePop,
      );
      checkAndAppend(
        '.talk-to-us-block-popup-form .mobile-contact-form.landing-page-form .hs_submit.hs-submit .actions',
        $imagePopCB,
      );
    });
  }
});

function checkAndAppend(selector, $image, elapsedTime = 0, maxTime = 5000) {
  if ($image.length > 0 && $(selector).length > 0) {
    if ($($image).data('src')) {
      $image.attr('src', $image.data('src'));
      $($image).removeAttr('data-src');
      $($image).removeClass('b-lazy');
    }
    $(selector).append($image);
  } else if (elapsedTime < maxTime) {
    setTimeout(function () {
      checkAndAppend(selector, $image, elapsedTime + 700, maxTime);
    }, 700);
  } else {
    if ($image.length === 0) {
      console.log('Image not found.');
    } else {
      console.log('Element not found within the maximum allowed time.');
    }
  }
}
