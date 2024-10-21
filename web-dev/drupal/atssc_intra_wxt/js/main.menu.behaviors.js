(function ($, Drupal) {
  Drupal.behaviors.mainMenuBehaviors = {
    attach: function (context, settings) {
      "use strict";

      // Dropdown Functionality for Desktop
      // if (media_md_min) {
      //   // Hover state for normal users
      //   $(".navbar .dropdown", context).hover(function (event) {
      //     if ($(this).closest("ul").hasClass("nav")) {
      //       $(this).children(".dropdown-toggle").attr("aria-expanded", true);
      //     } else {
      //       $(this).children(".dropdown-toggle").attr("aria-expanded", false);
      //     }
      //   });

      //   // nested dropdown click functionality (taken from Mobile script)
      //   $(".navbar .dropdown-menu .dropdown-toggle", context).click(function (
      //     event
      //   ) {
      //     event.stopPropagation();

      //     var expanded = $(this).attr("aria-expanded");

      //     if (expanded == "false") {
      //       $(this)
      //         .attr("aria-expanded", true)
      //         .parent(".dropdown")
      //         .addClass("open");
      //     } else {
      //       $(this)
      //         .attr("aria-expanded", false)
      //         .parent(".dropdown")
      //         .removeClass("open");
      //     }
      //   });

      //   // adjustments to open dropdowns
      //   $(".navbar .dropdown", context).on("shown.bs.dropdown", function () {
      //     var dropdown_menu = $(this),
      //       window_width = $(window).width(),
      //       menu_offset = dropdown_menu
      //         .children(".dropdown-menu")[0]
      //         .getBoundingClientRect().right;

      //     // Add escape key toggle for keybopard user
      //     $(document).keyup(function (event) {
      //       if (event.key === "Escape") {
      //         dropdown_menu.dropdown("toggle");
      //       }
      //     });

      //     // Kept commented but moved lower to remove dependency on shown to add dropdown-menu-right.
      //     // right align submenu when it overflows the window
      //     // if(menu_offset > window_width && !dropdown_menu.children('.dropdown-menu').hasClass('.dropdown-menu-right')){
      //     //   dropdown_menu.children('.dropdown-menu').addClass('dropdown-menu-right');
      //     // }
      //   });

      //   // Handle overflow for CSS based hover.
      //   // Since dropdown menu is hidden before hover calculate offset using parent
      //   // Add buffer based on min-width of 160px
      //   $(".navbar .dropdown").each(function () {
      //     var dropdown_menu = $(this),
      //       window_width = $(window).width(),
      //       menu_offset = this.getBoundingClientRect().right + 160;
      //     if (
      //       menu_offset > window_width &&
      //       !dropdown_menu
      //         .children(".dropdown-menu")
      //         .hasClass(".dropdown-menu-right")
      //     ) {
      //       dropdown_menu
      //         .children(".dropdown-menu")
      //         .addClass("dropdown-menu-right");
      //     }
      //   });
      // }

      // // Mobile Nested Dropdown Functionality
      // if (media_sm_max) {
      //   $(".navbar .dropdown-menu .dropdown-toggle", context).click(function (
      //     event
      //   ) {
      //     event.stopPropagation();

      //     var expanded = $(this).attr("aria-expanded");
      //     var dropdown_menu = $(this).siblings(".dropdown-menu");

      //     if (expanded == "false") {
      //       dropdown_menu.slideDown();
      //       $(this)
      //         .attr("aria-expanded", true)
      //         .closest(".dropdown")
      //         .addClass("open");
      //     } else {
      //       $(this)
      //         .attr("aria-expanded", false)
      //         .closest(".dropdown")
      //         .removeClass("open");
      //       dropdown_menu.removeAttr("style");
      //     }
      //   });

      //   // Animate dropdown
      //   $(".navbar .dropdown")
      //     .on("show.bs.dropdown", function () {
      //       $(this).children(".dropdown-menu").slideDown("fast");
      //     })
      //     .on("hide.bs.dropdown", function () {
      //       $(this).children(".dropdown-menu").removeAttr("style");
      //     });
      // }
    },
  };
})(jQuery, Drupal);
