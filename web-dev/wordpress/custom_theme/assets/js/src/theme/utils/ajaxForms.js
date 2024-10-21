window.recaptchaCallback = () => {
  $('.captcha-hold').removeClass('form-error');
};

export const onRecaptchaFormSubmit = (token, form, event) => {
  // console.log(token, 'token');
  // console.log(form, 'form');
  const data = JSON.stringify(token);
  $.ajax({
    method: 'POST',
    url: _root + 'js/theme/requests/g-recaptcha-verify.json',
    data: data,
    dataType: 'JSON',
  }).done((data) => {
    try {
      if (data.status) {
        new AjaxForm(form, event);
      } else {
        form.removeClass('form-loading');
      }
    } catch (e) {
      console.error(e);
    }
  });
};

export class AjaxForm {
  constructor(form, event) {
    this.form = form;
    this.event = event;
    this.submitForm();
  }

  submitForm() {
    const url = this.form.data('action');
    const method = this.form.data('method');
    const data = this.form.serialize();
    $.ajax({
      method: method,
      url: url,
      data: data,
      dataType: 'JSON',
    })
      .done((data) => {
        try {
          // console.log(data.status)
          if (data.status) {
            new AjaxFormActions(this.form, null, data.success).showSuccess();
            setTimeout(() => {
              this.form.removeClass('form-loading');
              new AjaxFormActions(this.form, null, null).clearFields();
              $('.user-typing').length
                ? $('.user-typing').removeClass('user-typing')
                : null;
              if (data.redirect && data.redirect.length) {
                window.location = data.redirect;
              }
            }, 1000);
          } else {
            new AjaxFormActions(this.form, data.errors, null).addErrors();
            this.form.removeClass('form-loading');
            // new AjaxFormActions(this.form, null, null).removeErrorsOnFocus()
          }
        } catch (e) {
          console.error(e);
        }
      })
      .always((data) => {
        setTimeout(() => {}, 500);

        // $('.g-recaptcha').length ? grecaptcha.reset() : null
      });
  }
}

export class AjaxFormActions {
  constructor(form, errors, success) {
    this.form = form;
    this.errors = errors;
    this.success = success;
  }
  clearFields() {
    try {
      $('.user-typing').removeClass('user-typing');
      this.form
        .find('input:not([type="hidden"]):not([type="checkbox"]), textarea')
        .val('')
        .blur();
      this.form.find('input[type="checkbox"]').prop('checked', false);
    } catch (e) {
      console.log(e);
    }
  }
  addErrors() {
    $.each(this.errors, (key, field) => {
      if (key == 'g-recaptcha') {
        this.form
          .find(`.${key}`)
          .parent()
          .addClass('form-error')
          .find('.captcha-error')
          .html(field);
      } else {
        this.form
          .find("[name='" + key + "']")
          .parent()
          .addClass('form-error');
        this.form
          .find("[name='" + key + "']")
          .val('')
          .parent()
          .attr('data-error-txt', this.errors[key])
          .removeClass('user-typing');
      }
    });
  }
  showSuccess() {
    this.form
      .find('.form-success-msg')
      .html(this.success)
      .addClass('show-success');
    setTimeout(() => {
      this.form.find('.form-success-msg').removeClass('show-success');
    }, 5000);
  }
  // removeErrorsOnFocus() {
  //     try {
  //         this.form.on('change focus keydown paste input', 'input, textarea', e =>
  //             $(e.currentTarget).parents('.form-error').removeClass('form-error')
  //         )
  //     }
  //     catch (e) {
  //         console.log(e)
  //     }
  // }
}

export const init = () => {
  $('.ajax-form:not(.g-recaptcha-form)').on('submit', (e) => {
    e.preventDefault();
    $(e.currentTarget).find('.form-error').removeClass('form-error');
    $(e.currentTarget).find('.show-file-error').removeClass('show-file-error');
    if ($(e.currentTarget).hasClass('form-loading')) return;
    $(e.currentTarget).addClass('form-loading');
    new AjaxForm($(e.currentTarget), e);
  });

  $('.g-recaptcha-form').on('submit', (e) => {
    e.preventDefault();
    $(e.currentTarget).find('.form-error').removeClass('form-error');
    $(e.currentTarget).find('.show-file-error').removeClass('show-file-error');
    if (
      typeof grecaptcha === 'undefined' ||
      $(e.currentTarget).hasClass('form-loading')
    )
      return;
    $(e.currentTarget).addClass('form-loading');
    grecaptcha.ready(function () {
      grecaptcha
        .execute(_googleAPIKey, {
          action: $(e.currentTarget).data('recaptcha-action'),
        })
        .then((token) => {
          onRecaptchaFormSubmit(token, $(e.currentTarget), e);
        });
    });
  });
};
