(function ($, Drupal) {
  function initMenu() {
    if (media_lg_min) {
      // Desktop
      var menubar = new Menubar(document.getElementById("default-menu"));
      menubar.init();
      // Make Hover Menu dismissable using Escape Key - WCAG Requirement.
      $(document).keyup(function (event) {
        if (event.key == "Escape") {
          // escape key maps to keycode `27`
          menubar.menubarItems.forEach(function (item) {
            if (item.popupMenu) {
              item.popupMenu.close(true);
            }
          });
        }
      });

      // Re-align the sub menu if it stretches beyond the viewport.
      if ($(".nav.sub-nav").length > 0) {
        $(".nav.sub-nav").each(function () {
          var nav = $(this),
            position = nav.offset();

          if (parseInt(position.left + nav.width()) > $(window).width()) {
            nav.addClass("align-right");
          }
        });
      }
    }
    // else {
    //   $('.navbar a[href="#"]').on('click', function(){
    //       if (this.getAttribute('aria-expanded') == 'false'){
    //           this.setAttribute("aria-expanded", 'true');
    //       } else {
    //           this.setAttribute("aria-expanded", 'false');
    //       }
    //   });
    //   $('.navbar button.more').on('click', function(){
    //       var anchorLink = $(this).siblings('a')[0];
    //       if (anchorLink.getAttribute('aria-expanded') == 'false'){
    //           anchorLink.setAttribute("aria-expanded", 'true');
    //           let degrees = 90;
    //           $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
    //       } else {
    //           anchorLink.setAttribute("aria-expanded", 'false');
    //           let degrees = 0;
    //           $(this).css({'transform' : 'rotate('+ degrees +'deg)'});
    //       }
    //   });
    // }
  }

  Drupal.behaviors.mainMenuBehaviors = {
    attach: function (context, settings) {
      "use strict";

      initMenu();
    },
  };

  $(window).on("resize", function () {
    setTimeout(initMenu(), 200);
  });
})(jQuery, Drupal);
