import $ from 'jquery';

class SocialShare {
  constructor() {
    this.fbShare();
    this.twitterShare();
    this.linkedShare();
  }

  fbShare() {
    $('.fb-share').on('click', () => {
      let url = window.location.href;
      window.open(
        'https://www.facebook.com/sharer/sharer.php?u=' + url,
        'facebook-share-dialog',
        'width=800,height=600',
      );
      return false;
    });
  }

  twitterShare() {
    $('.twitter-share').on('click', () => {
      let loc = window.location.href;
      window.open(
        'http://twitter.com/share?url=' + loc + '&text=' + '&',
        'twitterwindow',
        'height=450, width=550, top=' +
          ($(window).height() / 2 - 225) +
          ', left=' +
          $(window).width() / 2 +
          ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0',
      );
      return false;
    });
  }

  linkedShare() {
    $('.ln-share').on('click', () => {
      let loc = window.location.href;
      window.open(
        'http://www.linkedin.com/shareArticle?mini=true&amp;url=' + loc,
        '_blank',
        'width=800,height=600,  top=' +
          ($(window).height() / 2 - 225) +
          ', left=' +
          $(window).width() / 2 +
          '',
      );
      return false;
    });
  }
}

export default SocialShare;
