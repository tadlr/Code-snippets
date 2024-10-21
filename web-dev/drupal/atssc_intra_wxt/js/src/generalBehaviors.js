(function ($, Drupal) {
  Drupal.behaviors.generalBehaviors = {
    attach: function (context, settings) {
      "use strict";
      // $.fn.matchHeight._update();
      // Tables
      if ($("table", context).length > 0) {
        if ($(".table[border]", context).length > 0) {
          $(".table", context).removeAttr("border");
        }

        // Trim spaces for table charts & reinitialize
        if ($("table", context).hasClass("wb-charts")) {
          $("td", context).each(function () {
            $(this).text($.trim($(this).text()));
          });
          $(".wb-charts", context).trigger("wb-update.wb-charts");
        }
      }

      // Add class to images within figure tag
      if ($("figure", context).length > 0) {
        $("figure", context).each(function () {
          $(this).children(".embedded-entity").addClass("in-figure");
        });
      }

      // Blockquotes
      if ($("blockquote", context).length > 0) {
        $("blockquote", context).each(function (index) {
          var citation = $(this).find("cite");
          var footer = $(this).find("footer");

          if (citation.length > 0 && footer.length == 0) {
            $(this).append('<footer id="blockquote-' + index + '"></footer>');
            citation.appendTo("#blockquote-" + index);

            $(this)
              .find("p")
              .each(function (index, element) {
                if ($(element).is(":empty")) {
                  $(element).remove();
                }
              });
          }
        });
      }

      // Mark Label as checked if checkbox/radio is checked
      if (
        $(".radio,.checkbox,.radio-inline,.checkbox-inline", context).length > 0
      ) {
        $(".radio,.checkbox,.radio-inline,.checkbox-inline", context).each(
          function (index, element) {
            var element = $(element),
              input = element.find("input");

            input.on("change", function () {
              if (input.is(":checked")) {
                element.addClass("selected");

                if (input.is('[type="radio"]')) {
                  element
                    .siblings(".radio,.radio-inline")
                    .removeClass("selected");
                }
              } else {
                element.removeClass("selected");
              }
            });

            if ($(".bef-exposed-form", context).length > 0) {
              if (input.is(":checked")) {
                element.addClass("selected");
              } else {
                element.removeClass("selected");
              }
            }
          }
        );
      }

      // add wrapper to text in details tag if not present.
      if ($("details", context).not("[role=tabpanel]").length > 0) {
        $("details", context)
          .not("[role=tabpanel]")
          .each(function (index, element) {
            if ($(element).children(".details-wrapper").length == 0) {
              $(element)
                .children()
                .not("summary")
                .wrapAll('<div class="details-wrapper"></div>');
            }
          });
      }

      // Alter i18n dictonary for WET-BOEW Share plugin.
      $("body").on("timerpoke.wb", function (event) {
        if (
          document.getElementsByTagName("html")[0].getAttribute("lang") == "fr"
        ) {
          wb.i18nDict["shr-txt"] = "Partager";
        }
      });

      // Print form
      $(once("printBtn", "button,input[type=submit]", context)).each(
        function () {
          if (this.hasAttribute("name") && $(this).attr("name") === "print") {
            $(this).click(function (e) {
              e.preventDefault();
              window.print();
            });
          }
        }
      );
    },
  };
})(jQuery, Drupal);
