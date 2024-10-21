$ = jQuery;
const $doBrowserSync = false;
const copyContent = async (element) => {
  const obj = document.getElementById(element);
  const text = obj.value;

  try {
    await navigator.clipboard.writeText(text);
    obj.parentElement.appendChild(document.createElement("span")).innerText =
      " Copied! ";

    setTimeout(() => {
      obj.parentElement.removeChild(obj.parentElement.lastChild);
    }, 2500);
  } catch (err) {
    console.error("Failed to copy: ", err);
    obj.parentElement.appendChild(document.createElement("span")).innerText =
      " Error to copy ";

    setTimeout(() => {
      obj.parentElement.removeChild(obj.parentElement.lastChild);
    }, 2500);
  }
};

$(window).on('load', function () {
  const windLocation = window.location;

  if(windLocation.pathname === '/wp-admin/nav-menus.php') {

    $('.menu-item .menu-item-actions').each((index, element) => {


      const parent = $(element).closest('.menu-item-settings');
    const Btn = $('<span class="meta-sep hide-if-no-js"> | </span><button class="buttn link" href="#">Show advanced fields</button>');
      Btn.on('click', function (e) {
      e.preventDefault();
      MenuShowHiddenFields(parent)
    });

      $(element).append(Btn);

    });


  }
  // console.log(windLocation);
})

function MenuShowHiddenFields( parent ) {

  $(parent).find('input').each((index, element) => {

    if ($(element).attr('type') === 'hidden' && $(element).val() !== '' && !$(element).attr('name').includes('acf')) {
      const label = $(element).attr('name').replace(/-/g, ' ');

      $('<label for="' + $(element).attr('id') + '">' + label + '</label>').css({display: 'block', marginTop: '10px'}).insertBefore(element);
      $(element).attr('type', 'text');
    }
  });
}

$(function () {
  if ($doBrowserSync) {
    const BS_CONFIG = {
      url: 'https://localhost:3000/browser-sync/browser-sync-client.js?v=2.29.3',
    };
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
  }
});