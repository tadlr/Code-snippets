// import $ from 'jquery'

function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return 'ie10';
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return 'ie11';
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return 'edge';
  }
  // other browser
  return false;
}

export function checkIE() {
  if (detectIE() == 'edge' || detectIE() == 'ie10' || detectIE() == 'ie11') {
    $('body').addClass('ie');
  } else {
    $('body').addClass('not-ie');
  }
}

export function checkFirefox() {
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    $('body').addClass('firefox');
  }
}

export function isMac() {
  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    $('body').addClass('mac');
    return true;
  } else {
    $('body').addClass('notMac');
    return false;
  }
}
