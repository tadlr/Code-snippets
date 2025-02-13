(function ($, Drupal) {
  $(window).on("load", () => {
    if ($(".webform-type-fieldset").length) {
      $(".webform-type-fieldset .fieldset-wrapper").each((index, fieldset) => {
        const $fieldGroup = $(fieldset).find(
          ".form-group:not(.webform--fieldset)"
        );
        const inputFields = [];
        let count = 0;

        $fieldGroup.each((_, field) => {
          if ($(field).hasClass("webform-flexbox")) {
            count++;
            return;
          }
          if (
            !$(field).parent().hasClass("webform-flex--container") &&
            ($(field).hasClass("form-type-textfield") ||
              $(field).hasClass("form-type-date") ||
              $(field).hasClass("form-type-number") ||
              $(field).hasClass("form-type-email"))
          ) {
            inputFields[count] = inputFields[count] || [];
            inputFields[count].push(field);
          }
        });
        // log(inputFields);
        if (inputFields.length) {
          $(inputFields).each((_, item) => {
            if ($(item).hasClass("form-item")) {
              const $textfield = $(item);
              const maxLabelSize = Math.max(
                ...$textfield
                  .map(
                    (_, element) =>
                      $(element).find(".control-label").text().length
                  )
                  .get()
              );
              // log(maxLabelSize);
              if (maxLabelSize > 5) {
                if ($textfield.length > 1) {
                  const maxWidth = Math.max(
                    ...$textfield
                      .find(".control-label")
                      .map((_, label) => $(label).width())
                      .get()
                  );
                  if (maxWidth > 0) {
                    $(inputFields).each((_, fieldItem) => {
                      if (
                        $(fieldItem).hasClass("form-item") &&
                        $(fieldItem).hasClass("form-type-textfield")
                      ) {
                        const $group = $(fieldItem).filter(
                          ".form-type-textfield, .form-type-date, .form-type-number, .form-type-email"
                        );

                        // log($group, fieldItem);

                        if ($group.length > 1) {
                          const labelWidth = Math.max(
                            ...$group
                              .map((_, element) =>
                                $(element).find(".control-label").width()
                              )
                              .get()
                          );

                          // log($group);

                          $group.find(".control-label").width(labelWidth + 10);
                        }
                      }
                    });
                  }
                }
              }
            }
          });
        }
      });
    }

    $(window).resize(function () {
      $.fn.matchHeight._update();

      if ($(window).width() < 1000) {
        $(".node-webform .webform-submission-form input[placeholder]").each(
          function (_, element) {
            let placeholder = $(element).attr("placeholder");
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
    });
  });
})(jQuery, Drupal);
