(function ($, Drupal) {
  function build_toc_list($headings, $ul) {
    var prev_level;

    // Iterate over each heading.
    $headings.each(function (index, element) {
      // Get the level of the current heading.
      var id = element.id, // heading id
        element_html = document.createElement("div"), // heading html
        text,
        $li = $("<li>"),
        $a = $("<a>"),
        level = parseInt(this.tagName.slice(1));

      element_html.innerHTML = $(element).html();

      // remove superscript tags from element
      // This is so footnotes and it's hidden text don't get pulled into the TOC
      if ($(element_html).find("sup a").length) {
        $(element_html).find("sup").remove();
      }

      text = $(element_html).text();

      // check if there's an id, and create one if there isn't
      if (id === "") {
        id = "toc-id-" + index;
        element.id = id;
      }

      $a.attr("href", "#" + id)
        .text(text)
        .appendTo($li);

      // If the current heading is at a lower level (higher number is a lower level) than the previous one,
      // create a nested unordered list, and append to the previous list item.
      if (level > prev_level) {
        var $nestedUl = $("<ul>");
        $ul.children("li").last().append($nestedUl);
        $ul = $nestedUl;
        $ul.append($li);
      }
      // If the current heading is at the same level as the previous one,
      // append the list item to the current unordered list
      else if (level === prev_level) {
        $ul.append($li);
      }
      // If the current heading is at a lower level than the previous one,
      // go back to the parent unordered list and create a new nested unordered list
      // and append to that.
      else {
        for (var i = level; i < prev_level; i++) {
          $ul = $ul.parent().closest("ul");
        }

        $ul.append($li);
      }

      prev_level = level;
    });
  }

  Drupal.behaviors.tocBehaviors = {
    attach: function (context, settings) {
      "use strict";

      // Generate TOC list based on page headings
      if ($(".toc ul.toc-list", context).is(":empty")) {
        if ($("body", context).hasClass("node-1")) {
          $("#fn").addClass("no-toc");
        }

        var toc_selectors =
            $("details.toc[data-toc-tags]").length > 0
              ? $("details.toc").attr("data-toc-tags")
              : "h2,h3",
          exclusions =
            ".sr-only, .visually-hidden, .wb-inv, .toc-heading, .no-toc, .chart-toc, .wb-invisible, .panel-title",
          headings = $(".region-content").find(toc_selectors).not(exclusions);

        build_toc_list(headings, $(".toc ul.toc-list"));
      }
    },
  };
})(jQuery, Drupal);
