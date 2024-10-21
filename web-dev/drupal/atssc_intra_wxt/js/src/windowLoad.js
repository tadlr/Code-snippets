(function ($, Drupal) {
  $(window).on("load", function () {
    $(".block")
      .not(".in-view")
      .each(function (index, element) {
        if ($(element).offset().top <= $(window).height()) {
          setTimeout(function () {
            $(element).addClass("in-view");
          }, 300);
        }
      });

    // Animate to anchor
    var hash = window.wb.pageUrlParts.hash;
    if ($(hash).length > 0) {
      // if target is a modal open it.
      if ($(hash).hasClass("wb-overlay")) {
        $(hash).trigger("open.wb-overlay");
      }

      var admin_adjustment = $(".toolbar-tray-open").length ? 50 : 0;
      $("html,body").animate(
        {
          scrollTop: $(hash).offset().top - 200 - admin_adjustment,
        },
        400,
        "swing",
        function () {
          $(hash).focus();
        }
      );
    }

    // if (Inputmask !== undefined) {
    //   // if ($("html").attr("lang") == "fr") {
    //   // }
    // }

    //set figcaption with to be image with if aligned center
    if ($("figure").length > 0 && $("figure").hasClass("align-center")) {
      $("figure.align-center").each(function (index, element) {
        $(element)
          .children("figcaption")
          .css("width", $(element).find("img").width() + "px");
      });
    }
  });
})(jQuery, Drupal);
