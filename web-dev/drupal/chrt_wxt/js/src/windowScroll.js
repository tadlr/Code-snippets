(function ($, Drupal) {
  $(window).on("scroll", function () {
    var scroll_position = $(window).scrollTop();

    // Add in-view class to all blocks. This is so we can animate blocks when they are in view
    $(".block").each(function () {
      if (scroll_position >= $(this).offset().top - $(window).height() * 0.85) {
        $(this).addClass("in-view");
      }
    });

    // console.log("scroll_position", scroll_position);

    if ($(".bg-img.parallax").length > 0) {
      $(".bg-img.parallax").each(function (index) {
        var box = this.getBoundingClientRect();
        var start_position = $(this).hasClass("bottom") ? "0%" : "100%";

        if ($(this).hasClass("banner") || $(this).hasClass("homepage")) {
          var percent = ((box.top - (parseInt($(".navbar").height()) + parseInt($("body").css("padding-top")))) * 0.65) / 3.33;
        } else {
          var percent = (box.top * 0.65) / 3.33;
        }

        if (box.top <= $(window).height() && box.bottom >= 0) {
          $(this).attr( "style", "background-position-y: calc(" + start_position + " - " + Math.round(percent) + "px)!important" );
        }
      });
    }
  });
})(jQuery, Drupal);
