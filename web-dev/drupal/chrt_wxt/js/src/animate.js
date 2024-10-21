(function ($, Drupal) {
  Drupal.behaviors.animateContent = {
    attach: function (context, settings) {
      "use strict";

      if ($(".animate", context).length > 0) {
        $(".animate", context).each(function (index) {
          var box = this.getBoundingClientRect();

          if (box.top <= $(window).height()) {
            $(this).addClass("in-view");
          }
        });
      }
    },
  };

  // window load
  $(window).on("scroll", function () {
    if ($(".animate").length > 0) {
      $(".animate").each(function (index) {
        var box = this.getBoundingClientRect(),
            trigger = $(window).height() * 0.9;

        if (!$(this).hasClass("in-view") && box.top <= trigger) {
          $(this).addClass("in-view");
        }
      });
    }

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
          $(this).attr(
            "style", "background-position-y: calc(" + start_position + " - " + Math.round(percent) + "px + 1px)!important"
          );
        }
      });
    }

    // Count up
    function wrapNumbersInSpan(htmlText, lang) {
      const regex =
        lang === "fr"
          ? /(\d{1,3}(?:\.\d{3})*(?:,\d+)?)/g
          : /(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g;
      return htmlText.replace(regex, '<span class="count-num">$1</span>');
    }

    function extractNumbers(str, lang) {
      const regex =
        lang === "fr" ? /[+-]?(\d+(,\d+)?|,\d+)/g : /[+-]?(\d+(\.\d+)?|\.\d+)/g;
      return str.match(regex);
    }

    const $countUpElements = $(".in-view.count-up");
    const lang = $("html").attr("lang");

    if ($countUpElements.length > 0) {
      $countUpElements.each(function () {
        const $element = $(this);
        if ($element.hasClass("counted")) {
          return;
        }

        const val = $element.text();
        let htmlText = wrapNumbersInSpan(val, lang);
        $element.html(htmlText);

        var res = extractNumbers(val, lang);
        const number =
          res && res[0] ? parseFloat(res[0].replace(",", ".")) : NaN;

        if (!isNaN(number)) {
          const options = {
            decimalPlaces: number % 1 !== 0 ? "2" : "0",
            separator: lang == "fr" ? "." : ",",
            decimal: lang == "fr" ? "," : ".",
          };

          let stats = new countUp.CountUp(
            $element.find(".count-num")[0],
            number,
            options
          );
          if (!stats.error) {
            stats.start();
          } else {
            console.error(stats.error);
          }
          $element.addClass("counted");
        }
      });
    }
  });
})(jQuery, Drupal);
