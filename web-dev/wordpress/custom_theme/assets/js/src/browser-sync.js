$(function () {
  console.info('Browsersync: injecting script tag');
  try {
    var script = document.createElement('script');
    if ('async') {
      script.async = true;
    }
    // script.src = BS_CONFIG.url.replace('HOST', location.hostname);
    script.src = BS_CONFIG.url.replace('HOST', 'localhost');

    if (document.body) {
      document.body.appendChild(script);
    } else if (document.head) {
      document.head.appendChild(script);
    }
  } catch (e) {
    console.error('Browsersync: could not append script tag', e);
  }
});
