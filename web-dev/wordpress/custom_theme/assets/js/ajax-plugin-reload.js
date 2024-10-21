jQuery(document).ready(function ($) {
  function loadScripts() {
    console.log('loadScripts function called');
    // Hubspot loading forms script and load forms scripts
    if ($('#hubspot_load_forms').length == 0) {
      var scriptFormsLoad = document.createElement('script');
      scriptFormsLoad.id = 'hubspot_load_forms';
      scriptFormsLoad.src = 'https://js.hsforms.net/forms/embed/v2.js';
      document.head.append(scriptFormsLoad);
      console.log('hubspot load forms script added');
    }

    // Hotjar script
    if ($('#hotjar_reloaded').length == 0) {
      var hotjarScript = document.createElement('script');
      hotjarScript.id = 'hotjar_reloaded';
      hotjarScript.async = true;
      hotjarScript.innerHTML =
        "(function(h, o, t, j, a, r) {h.hj = h.hj || function() {(h.hj.q = h.hj.q || []).push(arguments)};h._hjSettings = {hjid: 3863711,hjsv: 6};a = o.getElementsByTagName('head')[0];r = o.createElement('script');r.async = 1;r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;a.appendChild(r);})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');";
      document.head.append(hotjarScript);
      console.log('hotjar script added');
    }

    // Google Tag Manager script
    if ($('#gtm_reloaded').length == 0) {
      var gtmScript = document.createElement('script');
      gtmScript.id = 'gtm_reloaded';
      gtmScript.async = true;
      gtmScript.innerHTML =
        "(function(w, d, s, l, i) {w[l] = w[l] || [];w[l].push({'gtm.start': new Date().getTime(),event: 'gtm.js'});var f = d.getElementsByTagName(s)[0],j = d.createElement(s),dl = l != 'dataLayer' ? '&l=' + l : '';j.async = true;j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j, f);})(window, document, 'script', 'dataLayer', 'G-TQK8B653YC');";
      document.head.append(gtmScript);
      console.log('GTM script added - G-TQK8B653YC');
    }

    if ($('#gtm2_reloaded').length == 0) {
      var gtmScript = document.createElement('script');
      gtmScript.id = 'gtm2_reloaded';
      gtmScript.async = true;
      gtmScript.innerHTML =
        "(function(w, d, s, l, i) {w[l] = w[l] || [];w[l].push({'gtm.start': new Date().getTime(),event: 'gtm.js'});var f = d.getElementsByTagName(s)[0],j = d.createElement(s),dl = l != 'dataLayer' ? '&l=' + l : '';j.async = true;j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j, f);})(window, document, 'script', 'dataLayer', 'GTM-WVQLG62');";
      document.head.append(gtmScript);
      console.log('GTM script added - GTM-WVQLG62');
    }

    // Google Tag script
    if ($('#gtag_reloaded').length == 0) {
      var gtagScript = document.createElement('script');
      gtagScript.id = 'gtag_reloaded';
      gtagScript.async = true;
      gtagScript.src =
        'https://www.googletagmanager.com/gtag/js?id=G-TQK8B653YC"';
      document.body.prepend(gtagScript);
      console.log('Google Tag script added - G-TQK8B653YC"');
    }
  }

  var ensSaveCheck = setInterval(function () {
    if ($('#ensSave').length) {
      console.log('ensSave exists!');
      clearInterval(ensSaveCheck);

      $('#ensSave').on('click', function () {
        console.log('custom settings saved');

        loadScripts();

        var checkScriptFormsLoad = setInterval(function () {
          if ($('script#hubspot_load_forms').length) {
            console.log('hubspot script loaded');
            clearInterval(checkScriptFormsLoad);

            $('script').each(function (index) {
              if ($(this).html().indexOf('hbspt.forms.create') != -1) {
                var scriptForm = document.createElement('script');
                scriptForm.innerHTML = $(this).html();
                scriptForm.id = 'reloaded_script_' + index;
                $(this).parent().append(scriptForm);
                if ($('head').find('.hbspt-form').length) {
                  $('head').find('.hbspt-form').appendTo($(this).parent());
                  console.log('form inserted');
                }
              }
            });
          }
        }, 100);

        // Trigger plugin reload
        $.ajax({
          url: 'https://wordpress-dev-appsvc.azurewebsites.net/wp-content/themes/custom_theme/classes/sm-plugin-reload.php',
          type: 'post',
          success: function (response) {
            console.log(response);
          },
          error: function (response) {
            console.log(response);
          },
        });
      });
    }
  }, 100);

  var checkAcceptAll = setInterval(function () {
    if ($('#ensModalAcceptAll').length) {
      console.log('ensModalAcceptAll exists!');
      clearInterval(checkAcceptAll);

      $('#ensModalAcceptAll').on('click', function () {
        console.log('all settings saved');

        loadScripts();

        var checkScriptFormsLoad = setInterval(function () {
          if ($('script#hubspot_load_forms').length) {
            console.log('hubspot script loaded');
            clearInterval(checkScriptFormsLoad);

            $('script').each(function (index) {
              if ($(this).html().indexOf('hbspt.forms.create') != -1) {
                var scriptForm = document.createElement('script');
                scriptForm.innerHTML = $(this).html();
                scriptForm.id = 'reloaded_script_' + index;
                $(this).parent().append(scriptForm);
                if ($('head').find('.hbspt-form').length) {
                  $('head').find('.hbspt-form').appendTo($(this).parent());
                  console.log('form inserted');
                }
              }
            });
          }
        }, 100);

        // Trigger plugin reload
        $.ajax({
          url: 'https://wordpress-dev-appsvc.azurewebsites.net/wp-content/themes/custom_theme/classes/sm-plugin-reload.php',
          type: 'post',
          success: function (response) {
            console.log(response);
          },
          error: function (response) {
            console.log(response);
          },
        });
      });
    }
  }, 100);
});
