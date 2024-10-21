(function ($, Drupal) {
  Drupal.behaviors.customFootnotesBehaviors = {
    attach: function (context, settings) {
      "use strict";

      if ($("fn:visible", context).length > 0) {
        var language = $("html").attr("lang"),
            content_region = $('.region-content', context),
            footnotes = [];
        // loop through footnote references
        $("fn:visible", context).each(function (index) {
          var footnote_symbol = $(this).attr('value'),
              filter_note = footnotes.filter(function(note) {
                              return note.id == footnote_symbol;
                            });
      
          if (!filter_note || filter_note.length == 0) {
            // allow html in footnote. Decode < and >
            
            let $desc = ($(this).attr('text')) ? $(this).attr('text').replaceAll('&lt;', '<').replaceAll('&gt;', '>') : this.innerHTML.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
            
            // create footnote object
            var note = {
              id: footnote_symbol,
              description: $desc,
              count: 1,
            };
            
            // if (this.dataset["source"]) {
            //   note.source = {
            //   link: this.dataset["source"],
            //   };
            //   if (this.dataset["sourceTitle"]) {
            //   note.source.title = this.dataset["sourceTitle"];
            //   }
            // }

            footnotes.push(note);
            var current_note_index = footnotes.length - 1;
          }else {
            var current_note_index = footnotes.indexOf(filter_note[0]);

            // add footnote reference count if the symbol appears more than once
            footnotes[current_note_index]["count"] = parseInt(footnotes[current_note_index]["count"] + 1);
          }
      
          var footnote_id = "fn" + footnote_symbol;
          var footnote_reference_count = parseInt(footnotes[current_note_index]["count"]); 
          var footnote_tag_id = (footnote_reference_count > 1) ? footnote_id + "-" + footnote_reference_count + "-rf" : footnote_id + "-rf";
      
          // create link to footnote description
          if (language == "en") {
            $(this).before(
              '<sup id="' + footnote_tag_id + '"><a class="fn-lnk" href="#' + footnote_id + '"><span class="wb-inv">Footnote </span>' + footnote_symbol + "</a></sup>"
            );
          } else if (language == "fr") {
            $(this).before(
              '<sup id="' + footnote_tag_id + '"><a class="fn-lnk" href="#' + footnote_id + '"><span class="wb-inv">Note de bas de page </span>' + footnote_symbol + "</a></sup>"
            );
          }
        });
      
        // create footnotes wrapper
        if (language == "en") {
          content_region.append(
          '<div class="container footnotes-wrapper"><div class="row"><aside class="col-xs-12 wb-fnote" role="note"><h2 class="no-toc" id="fn">Footnotes</h2><dl class="dl-footnote"></dl></aside></div></div>'
          );
        } else if (language == "fr") {
          content_region.append(
          '<div class="container footnotes-wrapper"><div class="row"><aside class="col-xs-12 wb-fnote" role="note"><h2 class="no-toc" id="fn">Notes de bas de page</h2><dl class="dl-footnote"></dl></aside></div></div>'
          );
        }
        // add/generate footnote dl list
        // Target :last in case there are inline footnotes (ex: Tables.)
        var footnote_list = $(".wb-fnote:last dl");
        footnotes.forEach(function (obj) {
          var dt = document.createElement("dt");
          var dd = document.createElement("dd");
          var ID = obj.id;
          // var source = obj.source
          // ? ' <a href="' +
          //   obj.source.link +
          //   '" target="_blank"><cite>' +
          //   obj.source.title +
          //   "</cite></a>"
          // : "";
          // add dt target
          dt.innerText =
          language == "fr" ? "Note de bas de page " + ID : "Footnote " + ID;
          // add dd id
          dd.setAttribute("id", "fn" + ID);
          dd.innerHTML = "<p>" + obj.description + "</p>";
      
          // Create reference back links
          if (language == "en") {
          dd.innerHTML +=
            '<p class="fn-rtn"><a href="#fn' +
            ID +
            '-rf"><span class="wb-inv">Return to footnote </span>' +
            ID +
            '<span class="wb-inv"> referrer</span></a></p>';
          } else if (language == "fr") {
          dd.innerHTML +=
            '<p class="fn-rtn"><a href="#fn' +
            ID +
            '-rf"><span class="wb-inv">Retour à la référence de la note de bas de page </span>' +
            ID;
          }

          footnote_list.append(dt);
          footnote_list.append(dd);
        });

        $('fn', context).remove();
      }
    },
  };
})(jQuery, Drupal);