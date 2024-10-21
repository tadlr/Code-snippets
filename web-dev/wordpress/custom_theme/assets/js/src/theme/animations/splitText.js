import $ from 'jquery';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

class SplitTextGSAP {
  constructor() {
    if ($('.splitByChars').length) {
      this.splitText($('.splitByChars'), 'chars');
    }
    if ($('.splitByWords').length) {
      this.splitText($('.splitByWords'), 'words');
    }
    if ($('.splitByLines').length) {
      this.splitText($('.splitByLines'), 'lines');
    }

    if ($('.splitByLinesChars').length) {
      this.splitText($('.splitByLinesChars'), 'linesChars');
    }

    if ($('.splitByAll').length) {
      this.splitText($('.splitByAll'), 'all');
    }
    if ($('.linesWordsLines').length) {
      this.splitText($('.linesWordsLines'), 'linesWordsLines');
    }
    if ($('.linesWordsLinesHover').length) {
      this.splitText($('.linesWordsLinesHover'), 'linesWordsLinesHover');
    }

    if ($('.splitByWordsChars').length) {
      this.splitText($('.splitByWordsChars'), 'wordsChars');
    }
  }
  /*    SPLIT TEXT BY CHARDS/WORDS
   *
   *  this.splitText( $(text), 'chars' )
   *  this.splitText( $(text), 'words' )
   *
   */
  splitText(title, splitBy) {
    if (splitBy == 'lines') {
      title.each((i, e) => {
        let mySplitTextInner = new SplitText(title[i], {
          type: 'lines',
          linesClass: 'line-inner line++',
        });
        let mySplitTextOuter = new SplitText(title[i], {
          type: 'lines, words',
          linesClass: 'line-outer line++',
        });
        // if (!$(e).hasClass('non-translate')) {
        //     gsap.set($(e).find('.line-inner'), {yPercent: 100});
        // } else {
        //     gsap.set($(e).find('.line-inner'), {display: 'inline-block'});
        // }
      });
      // let mySplitTextInnerLines = new SplitText(title[0], { type: "lines", linesClass: "line-inner line-inner++" });
      // let mySplitTextOuterLines = new SplitText(title[0], { type: "lines", linesClass: "line line++" });
    } else if (splitBy == 'words') {
      let mySplitText = new SplitText(title[0], {
        type: 'words',
        wordsClass: 'word word++',
      });
      // chars = mySplitText.chars; //an array of all the divs that wrap each character
    } else if (splitBy == 'chars') {
      title.each((i, e) => {
        // let mySplitText = new SplitText(title[i], {
        //     type: 'chars',
        //     charsClass: 'char char++'
        // })
        let mySplitText = new SplitText(title[i], {
          type: 'words,chars',
          wordsClass: 'word word++',
          charsClass: 'char char++',
        });
        // type: 'words,chars',
        //     wordsClass: 'word word++',
        //     charsClass: 'char char++'
        // gsap.set('.char', { opacity: 0 });
        gsap.set('.char', { opacity: 0, y: 15 });

        //Listen for the event
        // window.addEventListener("MyEventType", evt => {
        //     console.log(evt.detail);
        // }, false);
      });

      // chars = mySplitText.chars; //an array of all the divs that wrap each character
    } else if (splitBy == 'linesChars') {
      let mySplitText = new SplitText(title[0], {
        type: 'chars,words',
        charsClass: 'char char++',
        wordsClass: 'word word++',
      });
      // chars = mySplitText.chars; //an array of all the divs that wrap each character
    } else if (splitBy == 'linesWordsLines') {
      title.each((i, e) => {
        let mySplitTextInner = new SplitText(title[i], {
          type: 'lines',
          linesClass: 'line-inner anim-translate-y line++',
        });
        let mySplitTextOuter = new SplitText(title[i], {
          type: 'lines, words',
          linesClass: 'line-outer line++',
          wordsClass: 'word word++',
        });
        gsap.set('.line-inner.anim-translate-y', { opacity: 0, yPercent: 100 });
      });
    } else if (splitBy == 'linesWordsLinesHover') {
      title.each((i, e) => {
        let mySplitTextInner = new SplitText(title[i], {
          type: 'lines',
          linesClass: 'line-inner-hover line++',
        });
        let mySplitTextOuter = new SplitText(title[i], {
          type: 'lines, words',
          linesClass: 'line-outer-hover line++',
          wordsClass: 'word word++',
        });
      });
    } else if (splitBy == 'wordsChars') {
      var mySplitText = new SplitText(title, {
        type: 'words,chars',
        wordsClass: 'word word++',
        charsClass: 'char char++',
      });
      // chars = mySplitText.chars; //an array of all the divs that wrap each character
    }

    // if (splitBy == "words") {
    //     return mySplitText.words;
    // } else if (splitBy == "lines") {
    //     return mySplitText.lines;
    // } else {
    //     return mySplitText.chars;
    // }
  }
}

export default SplitTextGSAP;
