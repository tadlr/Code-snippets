(function ($) {

  $.ajax = function (options) {
    const defaults = {
      method: 'GET',
      url: '',
      async: true,
      data: null,
      headers: {},
      success: function () {},
      error: function () {},
    };

    const settings = $.extend({}, defaults, options);

    const fetchOptions = {
      method: settings.method,
      headers: settings.headers,
    };

    if (settings.data) {
      if (settings.method.toUpperCase() === 'GET') {
        settings.url += '?' + new URLSearchParams(settings.data).toString();
      } else {
        fetchOptions.body = JSON.stringify(settings.data);
        fetchOptions.headers['Content-Type'] = 'application/json';
      }
    }

    fetch(settings.url, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => settings.success(data))
      .catch((error) => settings.error(error));
  };
  $.fn.scrollTo = function (options) {
    var settings = $.extend(
      {
        top: 0,
        left: 0,
        behavior: 'smooth',
      },
      options,
    );

    return this.each(function () {
      if (this.scrollTo) {
        this.scrollTo({
          top: settings.top,
          left: settings.left,
          behavior: settings.behavior,
        });
      } else {
        this.scrollTop = settings.top;
        this.scrollLeft = settings.left;
      }
    });
  };
  const originalFilter = $.fn.filter;

  $.fn.filter = function (selector) {
    // if (selector === ':first') {
    //   return this.eq(0);
    // }
    if (selector === ':hidden') {
      return this.filter(function () {
        const el = $(this);
        return (
          el.css('display') === 'none' ||
          el.css('visibility') === 'hidden' ||
          el.css('opacity') === '0' ||
          el.height() === 0 ||
          el.width() === 0
        );
      });
    }
    return originalFilter.call(this, selector);
  };
  $.fn.isHidden = function () {
    return (
      this.css('display') === 'none' ||
      this.css('visibility') === 'hidden' ||
      this.css('opacity') === '0' ||
      this.height() === 0 ||
      this.width() === 0
    );
  };

  $.fn.hidden = function () {
    return this.filter(function () {
      return $(this).isHidden();
    });
  };

  $.fn.scrollTop = function (value) {
    if (value === undefined) {
      return this[0].scrollTop;
    } else {
      return this.each(function () {
        this.scrollTop = value;
      });
    }
  };

  $.fn.scrollBottom = function (value) {
    if (value === undefined) {
      return this[0].scrollHeight - this[0].clientHeight - this[0].scrollTop;
    } else {
      return this.each(function () {
        this.scrollTop = this.scrollHeight - this.clientHeight - value;
      });
    }
  };

  $.fn.scrollLeft = function (value) {
    if (value === undefined) {
      return this[0].scrollLeft;
    } else {
      return this.each(function () {
        this.scrollLeft = value;
      });
    }
  };

  $.fn.scrollRight = function (value) {
    if (value === undefined) {
      return this[0].scrollWidth - this[0].clientWidth - this[0].scrollLeft;
    } else {
      return this.each(function () {
        this.scrollLeft = this.scrollWidth - this.clientWidth - value;
      });
    }
  };
})(cash);
