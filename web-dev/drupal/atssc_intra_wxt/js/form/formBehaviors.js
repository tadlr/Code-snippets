(function ($, Drupal) {
  log = console.log;
  Drupal.behaviors.formBehaviors = {
    attach: function (context, settings) {
      "use strict";
      const uniqueId = () => {
        const dateString = Date.now().toString(36);
        const randomness = Math.random().toString(36).substr(2);
        return "i" + dateString + randomness;
      };

      if ($(".webform-flexbox", context).length > 0) {
        $(".webform-flexbox").each((_, flexContainer) => {
          let groupID = uniqueId();

          $(flexContainer)
            .find(".control-label")
            .each((_, label) => {
              $(label).attr("data-mh", groupID);
            });
          // .webform-flex--container
        });
      }

      if ($(window).width() < 1000) {
        $(".node-webform .webform-submission-form input[placeholder]").each(
          function (_, element) {
            var placeholder = $(element).attr("placeholder");
            $(element).parent(".form-item").addClass("input-placeholder");
            $(element)
              .parent()
              .find(".control-label.sr-only")
              .text(placeholder)
              .addClass("mobile-label")
              .removeClass("sr-only");
          }
        );
      } else {
        $(".mobile-label").removeClass("mobile-label").addClass("sr-only");
      }

      if ($(".webform-flex.webform-flex--1 p", context).length > 0) {
        $(".webform-flex.webform-flex--1", context).each((_, paragraph) => {
          if (
            $(paragraph).find("p").text().length > 0 &&
            $(paragraph).find("p").text().length <= 15
          ) {
            // log($(paragraph).find("p").text());
            $(paragraph).addClass("flex-0");
          }
        });
      }
    },
  };
})(jQuery, Drupal);
