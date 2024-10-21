import gsap from 'gsap';
import { animationStarting, isMobile } from '../helpers/helper';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

import PIXI from '../plugins/pixi.js';

gsap.registerPlugin(MotionPathPlugin);

const meetTeamInfoSectionMobile = () => {
  if (!$('.meet-team-info-section').length) return;
  const section = $('.meet-team-info-section');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  let membersArray = section.find('.members-hold .member-block');
  // console.log(membersArray)

  tl.to(
    section.find('.char'),
    {
      y: 0,
      stagger: 0.02,
      opacity: 1,
      duration: 0.4,
    },
    0,
  );

  tl.fromTo(
    section.find('.anim-translate-y'),
    {
      y: 15,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
    },
    0.3,
  );

  tl.fromTo(
    section.find('.member-block.centered-main').children(),
    {
      scale: 0,
    },
    {
      scale: 1,
      ease: 'elastic.out(0.6, 0.4)',
      stagger: 0.1,
      duration: 1,
    },
    0.6,
  );

  tl.fromTo(
    section.find('.swiper-nav'),
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    0.8,
  );

  tl.fromTo(
    membersArray,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.25,
    },
    1,
  );

  ScrollTrigger.create({
    trigger: section,
    start: '0% 75%',
    end: '+=1%',
    onEnter: () => tl.timeScale(1).play(),
    onLeaveBack: () => tl.timeScale(3).reverse(),
  });
};

const meetTeamInfoSection = () => {
  if (!$('.meet-team-info-section').length) return;
  const section = $('.meet-team-info-section');
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  // let membersArray = section.find('.members-hold').children().get().reverse();

  tl.to(
    section.find('.char'),
    {
      y: 0,
      stagger: 0.02,
      opacity: 1,
      duration: 0.4,
    },
    0,
  );

  tl.fromTo(
    section.find('.anim-translate-y'),
    {
      y: 15,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
    },
    0.3,
  );

  section.find('.section-flower-svg').each((i, e) => {
    let svg = $(e);

    tl.fromTo(
      svg.children(),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.5,
        duration: 1,
      },
      0.3,
    );
  });

  tl.fromTo(
    section.find('.member-block.centered-main').children(),
    {
      scale: 0,
    },
    {
      scale: 1,
      ease: 'elastic.out(0.6, 0.4)',
      stagger: 0.1,
      duration: 1,
    },
    0.6,
  );

  ScrollTrigger.create({
    trigger: section,
    start: '0% 75%',
    end: '+=1%',
    onEnter: () => tl.timeScale(1).play(),
    onLeaveBack: () => tl.timeScale(3).reverse(),
  });
};

const centeredBlockMouseMoveAnim = () => {
  let section = $('.meet-team-info-section');
  let centeredBlock = $('.centered-main');
  let app = new PIXI.Application({
    width: centeredBlock.outerWidth(),
    height: centeredBlock.outerHeight(),
    transparent: true,
  });

  centeredBlock.find('.img-wrap').html(app.view);

  // let canvas = centeredBlock.children();

  let img = new PIXI.Sprite.from(
    _root + 'media/images/payment-expert/member-5.webp',
  );
  img.width = centeredBlock.outerWidth();
  img.height = centeredBlock.outerHeight();

  app.stage.addChild(img);

  let depthMap = new PIXI.Sprite.from(
    _root + 'media/images/payment-expert/member-5-depth-map-3.webp',
  );
  depthMap.width = centeredBlock.outerWidth();
  depthMap.height = centeredBlock.outerHeight();

  app.stage.addChild(depthMap);

  let displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);

  app.stage.filters = [displacementFilter];

  document.querySelector('.meet-team-info-section').onmousemove = function (e) {
    if (ScrollTrigger.isScrolling()) return;
    displacementFilter.scale.x = (window.innerWidth / 2 - e.clientX) / 100;
    displacementFilter.scale.y = (window.innerHeight / 2 - e.clientY) / 100;
  };

  // app.render();

  ScrollTrigger.create({
    trigger: section,
    start: '0% 100%',
    end: '100% 0%',
    onEnter: () => app.start(),
    onLeave: () => app.stop(),
    onEnterBack: () => app.start(),
    onLeaveBack: () => app.stop(),
  });
};

class MeetInfoSectionRotationAnim {
  constructor() {
    this.section = $('.meet-team-info-section');
    this.circlePath = this.section.find('.member-circle-position-svg-path');
    this.convertedPath = MotionPathPlugin.convertToPath(this.circlePath[0]);
    this.blocks = this.section.find('.member-block[data-position]');
    this.currentActiveBlock = null;
    this.blocksAnimating = false;
    this.initAnimIsReversing = false;
    this.intervals = [];
    this.timeouts = [];
    this.setBlocksTransformOrigin();
    this.createInitAnim();
    this.setPositions();

    ScrollTrigger.create({
      trigger: this.section,
      start: '0% 65%',
      end: '100% 0%',
      onEnter: () => {
        this.clearIntervals();
        this.clearBlockStyles();

        this.setTimeoutInit = setTimeout(() => {
          this.loopAnimInterval = setInterval(() => {
            this.changeStepsAnim();
          }, 7000);
          this.intervals.push(this.loopAnimInterval);
        }, 2500);

        this.timeouts.push(this.setTimeoutInit);

        this.initTl.timeScale(1).play(0);
      },
      onLeaveBack: () => {
        this.clearIntervals();
        this.initAnimIsReversing = true;
        this.initTl.timeScale(3).reverse();
      },
      onLeave: () => {
        this.clearIntervals();
      },
      onEnterBack: () => {
        this.clearIntervals();
        if (!this.blocksAnimating) {
          this.changeStepsAnim();
        }
        this.loopAnimInterval = setInterval(() => {
          this.changeStepsAnim();
        }, 7000);
        this.intervals.push(this.loopAnimInterval);
      },
    });

    this.section
      .on('mouseenter', '[data-position]:not(.current-active-block)', (e) =>
        this.memberBlockHover($(e.currentTarget), 'mouseenter'),
      )
      .on('mouseleave', '[data-position]:not(.current-active-block)', (e) =>
        this.memberBlockHover($(e.currentTarget), 'mouseleave'),
      );
    this.blocks.on('click', (e) =>
      this.tweenToBlockHandler($(e.currentTarget)),
    );
    this.setBlocksTransformOrigin();
  }

  clearIntervals() {
    this.timeouts.map((e) => clearTimeout(e));
    this.intervals.map((e) => clearInterval(e));
    // console.log(this.timeouts);
    // console.log(this.intervals);
    // clearTimeout(this.setTimeoutInit);
    // clearInterval(this.loopAnimInterval);
  }

  setBlocksTransformOrigin() {
    this.blocks.each((i, e) => {
      let block = $(e);

      let center = $('.centered-main');

      let posX =
        center.offset().left + center.outerWidth() / 2 - block.offset().left;
      let posY =
        center.position().top + center.outerHeight() / 2 - block.position().top;
      // console.log(block, i);

      // switch (i) {
      //     case 0:
      //         posX *= 0.95;
      //         posY *= 0.95;
      //         break;
      //     case 1:
      //         posX *= 0.9;
      //         posY *= 1.1;
      //         break;
      //     case 2:
      //         posX *= 1.1;
      //         posY *= 1.2;
      //         break;
      //     case 3:
      //         posX *= 1.1;
      //         posY *= 0.9;
      //         break;
      // }

      gsap.set(block, {
        transformOrigin: `${posX}px ${posY}px`,
      });
    });
  }

  tweenToBlockHandler(block) {
    if (this.blocksAnimating || block.hasClass('current-active-block')) return;
    this.blocksAnimating = true;

    this.clearIntervals();

    /*
        4 to 3 +=88deg
        3 to 2 +=94deg
        2 to 1 +=62deg
        1 to 4 +=119deg
        */
    let thisItem4 = this.section.find(`[data-position="4"]`);
    let thisItem3 = this.section.find(`[data-position="3"]`);
    let thisItem2 = this.section.find(`[data-position="2"]`);
    let thisItem1 = this.section.find(`[data-position="1"]`);

    this.blocks.each((i, e) => {
      let item = $(e);
      this.tweenActiveBlock(item, 'animate-out');
    });

    switch (parseInt(block.attr('data-position'))) {
      case 1:
        gsap.to(thisItem1, {
          rotation: '+=119',
          duration: 2,
          delay: 0.5,
          onStart: () => thisItem1.attr('data-position', 4),
          onComplete: () => this.tweenActiveBlock(thisItem1, 'animate-in'),
        });

        gsap.to(thisItem1.find(`.rotation-wrap`), {
          rotation: '-=119',
          duration: 2,
          delay: 0.5,
          onComplete: () => {
            this.clearIntervals();
            this.loopAnimInterval = setInterval(() => {
              this.changeStepsAnim();
            }, 7000);
            this.intervals.push(this.loopAnimInterval);
          },
        });

        gsap.to(thisItem2, {
          rotation: '+=62',
          duration: 2,
          delay: 0.5,
          onStart: () => thisItem2.attr('data-position', 1),
        });
        gsap.to(thisItem2.find(`.rotation-wrap`), {
          rotation: '-=62',
          duration: 2,
          delay: 0.5,
        });

        gsap.to(thisItem3, {
          rotation: '+=94',
          duration: 2,
          delay: 0.5,
          onStart: () => thisItem3.attr('data-position', 2),
        });
        gsap.to(thisItem3.find(`.rotation-wrap`), {
          rotation: '-=94',
          duration: 2,
          delay: 0.5,
        });

        gsap.to(thisItem4, {
          rotation: '+=88',
          duration: 2,
          delay: 0.5,
          onStart: () => thisItem4.attr('data-position', 3),
        });
        gsap.to(thisItem4.find(`.rotation-wrap`), {
          rotation: '-=88',
          duration: 2,
          delay: 0.5,
        });
        break;
      case 2:
        gsap.to(thisItem1, {
          rotation: '+=207',
          duration: 3,
          delay: 0.5,
          onStart: () => thisItem1.attr('data-position', 3),
        });
        gsap.to(thisItem1.find(`.rotation-wrap`), {
          rotation: '-=207',
          duration: 3,
          delay: 0.5,
        });

        gsap.to(thisItem2, {
          rotation: '+=181',
          duration: 3,
          delay: 0.5,
          onStart: () => thisItem2.attr('data-position', 4),
          onComplete: () => this.tweenActiveBlock(thisItem2, 'animate-in'),
        });
        gsap.to(thisItem2.find(`.rotation-wrap`), {
          rotation: '-=181',
          duration: 3,
          delay: 0.5,
          onComplete: () => {
            this.clearIntervals();
            this.loopAnimInterval = setInterval(() => {
              this.changeStepsAnim();
            }, 7000);
            this.intervals.push(this.loopAnimInterval);
          },
        });

        gsap.to(thisItem3, {
          rotation: '+=156',
          duration: 3,
          delay: 0.5,
          onStart: () => thisItem3.attr('data-position', 1),
        });
        gsap.to(thisItem3.find(`.rotation-wrap`), {
          rotation: '-=156',
          duration: 3,
          delay: 0.5,
        });

        gsap.to(thisItem4, {
          rotation: '+=182',
          duration: 3,
          delay: 0.5,
          onStart: () => thisItem4.attr('data-position', 2),
        });
        gsap.to(thisItem4.find(`.rotation-wrap`), {
          rotation: '-=182',
          duration: 3,
          delay: 0.5,
        });
        break;
      case 3:
        gsap.to(thisItem1, {
          rotation: '+=301',
          duration: 4,
          delay: 0.5,
          onStart: () => thisItem1.attr('data-position', 2),
        });
        gsap.to(thisItem1.find(`.rotation-wrap`), {
          rotation: '-=301',
          duration: 4,
          delay: 0.5,
        });

        gsap.to(thisItem2, {
          rotation: '+=269',
          duration: 4,
          delay: 0.5,
          onStart: () => thisItem2.attr('data-position', 3),
        });
        gsap.to(thisItem2.find(`.rotation-wrap`), {
          rotation: '-=269',
          duration: 4,
          delay: 0.5,
        });

        gsap.to(thisItem3, {
          rotation: '+=275',
          duration: 4,
          delay: 0.5,
          onStart: () => thisItem3.attr('data-position', 4),
          onComplete: () => {
            this.clearIntervals();
            this.loopAnimInterval = setInterval(() => {
              this.changeStepsAnim();
            }, 7000);
            this.intervals.push(this.loopAnimInterval);
          },
        });
        gsap.to(thisItem3.find(`.rotation-wrap`), {
          rotation: '-=275',
          duration: 4,
          delay: 0.5,
          onComplete: () => this.tweenActiveBlock(thisItem3, 'animate-in'),
        });

        gsap.to(thisItem4, {
          rotation: '+=244',
          duration: 4,
          delay: 0.5,
          onStart: () => thisItem4.attr('data-position', 1),
        });
        gsap.to(thisItem4.find(`.rotation-wrap`), {
          rotation: '-=244',
          duration: 4,
          delay: 0.5,
        });
        break;
    }
  }

  clearBlockStyles() {
    this.blocks.each((i, e) => {
      let block = $(e);

      gsap.set(block, { rotation: 0 });

      gsap.set(block.find('.member-txt-wrap'), {
        opacity: 0,
      });

      gsap.set(block.find('.border-element'), {
        scale: 1,
      });

      gsap.set(block.find('.img-wrap'), {
        scale: 1,
      });

      gsap.set(block.find('.member-name-title-wrap'), {
        xPercent: 0,
        yPercent: 0,
      });

      block.removeClass('current-active-block');
    });
  }

  memberBlockHover(block, eventType) {
    if (block.hasClass('current-active-block')) return;
    if (eventType == 'mouseenter') {
      gsap.fromTo(
        block.find('.border-element'),
        {
          scale: 1,
        },
        {
          scale: 1.2,
          ease: 'elastic.out(0.6, 0.4)',
        },
      );
    } else {
      gsap.to(block.find('.border-element'), {
        scale: 1,
        ease: 'none',
      });
    }
  }

  tweenActiveBlock(block, state) {
    // console.log(parseInt(block.attr('data-position')));
    if (state === 'animate-in') {
      if (parseInt(block.attr('data-position')) !== 4) return;

      // animate content in active position
      block.addClass('current-active-block');
      gsap.fromTo(
        block.find('.member-txt-wrap'),
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      );

      gsap.fromTo(
        block.find('.border-element'),
        {
          scale: 1,
        },
        {
          scale: 1.2,
          ease: 'elastic.out(0.6, 0.4)',
        },
      );

      gsap.fromTo(
        block.find('.img-wrap'),
        {
          scale: 1,
        },
        {
          scale: 1.3,
          ease: 'elastic.out(0.6, 0.4)',
        },
      );

      gsap.fromTo(
        block.find('.member-name-title-wrap'),
        {
          xPercent: 0,
          yPercent: 0,
          scale: 1,
        },
        {
          xPercent: 58,
          yPercent: 37,
          scale: 1.15,
          onComplete: () => (this.blocksAnimating = false),
        },
      );
      // animate content in active position
    } else {
      // animate content out active position
      gsap.to(block.find('.member-txt-wrap'), {
        opacity: 0,
      });

      gsap.to(block.find('.border-element'), {
        scale: 1,
        ease: 'none',
      });

      gsap.to(block.find('.img-wrap'), {
        scale: 1,
        ease: 'elastic.out(0.6, 0.4)',
      });

      gsap.to(block.find('.member-name-title-wrap'), {
        xPercent: 0,
        yPercent: 0,
        scale: 1,
        onComplete: () => block.removeClass('current-active-block'),
      });
      // animate content out active position
    }
  }

  createInitAnim() {
    this.initTl = gsap.timeline({
      paused: true,
      onStart: () => {
        gsap.getTweensOf(this.blocks).map((e) => {
          if (typeof e.vars.id == 'undefined') e.kill();
        });
        gsap.getTweensOf(this.blocks.find('.rotation-wrap')).map((e) => {
          if (typeof e.vars.id == 'undefined') e.kill();
        });
        this.initAnimIsReversing = false;
      },
      onReverseComplete: () => {
        this.blocksAnimating = false;
        this.initAnimIsReversing = false;
        this.clearBlockStyles();
      },
    });

    let initCoordsArray = [-289, -229, -135, -48];

    this.blocks.each((i, e) => {
      let item = $(e);
      let startAt = 0.2;

      if (i === this.blocks.length - 1) {
        this.currentActiveBlock = item;

        this.initTl.call(
          () => {
            if (this.initAnimIsReversing) return;
            this.tweenActiveBlock(item, 'animate-in');
          },
          null,
          1.5,
        );
      } else {
        this.initTl.call(
          () => {
            this.tweenActiveBlock(item, 'animate-out');
          },
          null,
          0,
        );
      }

      this.initTl.set(
        item,
        {
          opacity: 0,
          rotation: initCoordsArray[i],
          id: 'myTweenSet-' + i,
        },
        0,
      );

      this.initTl.set(
        item.find('.rotation-wrap'),
        {
          rotation: initCoordsArray[i] * -1,
          id: 'myTweenSet2-' + i,
        },
        0,
      );

      this.initTl.to(
        item,
        {
          opacity: 1,
          rotation: 0,
          duration: 2,
          onStart: () => item.attr('data-position', i + 1),
          id: 'myTweenRotate-' + i,
        },
        startAt * i,
      );

      this.initTl.to(
        item.find('.rotation-wrap'),
        {
          rotation: 0,
          duration: 2,
          id: 'myTweenRotate2-' + i,
        },
        startAt * i,
      );
    });

    // this.initTl.add(this.loopTl, 2);
  }

  changeStepsAnim(steps) {
    /*
        4 to 3 +=88deg
        3 to 2 +=94deg
        2 to 1 +=62deg
        1 to 4 +=119deg
        */

    if (this.blocksAnimating) return;
    this.blocksAnimating = true;

    let thisItem4 = this.section.find(`[data-position="4"]`);
    let thisItem3 = this.section.find(`[data-position="3"]`);
    let thisItem2 = this.section.find(`[data-position="2"]`);
    let thisItem1 = this.section.find(`[data-position="1"]`);

    this.blocks.each((i, e) => {
      let item = $(e);
      this.tweenActiveBlock(item, 'animate-out');
    });

    gsap.to(thisItem4, {
      rotation: '+=88',
      duration: 2,
      delay: 0.5,
      onStart: () => thisItem4.attr('data-position', 3),
    });

    gsap.to(thisItem3, {
      rotation: '+=94',
      duration: 2,
      delay: 0.5,
      onStart: () => thisItem3.attr('data-position', 2),
    });

    gsap.to(thisItem2, {
      rotation: '+=62',
      duration: 2,
      delay: 0.5,
      onStart: () => thisItem2.attr('data-position', 1),
    });

    gsap.to(thisItem1, {
      rotation: '+=119',
      duration: 2,
      delay: 0.5,
      onStart: () => thisItem1.attr('data-position', 4),
      onComplete: () => this.tweenActiveBlock(thisItem1, 'animate-in'),
    });

    gsap.to(thisItem4.find(`.rotation-wrap`), {
      rotation: '-=88',
      duration: 2,
      delay: 0.5,
    });

    gsap.to(thisItem3.find(`.rotation-wrap`), {
      rotation: '-=94',
      duration: 2,
      delay: 0.5,
    });

    gsap.to(thisItem2.find(`.rotation-wrap`), {
      rotation: '-=62',
      duration: 2,
      delay: 0.5,
    });

    gsap.to(thisItem1.find(`.rotation-wrap`), {
      rotation: '-=119',
      duration: 2,
      delay: 0.5,
    });
  }

  // createLoopAnim() {
  //     this.loopTl = gsap.timeline({
  //         repeat: -1,
  //         defaults: {
  //             duration: 2,
  //         }
  //     });
  //     // let centeredImg = $('.centered-main')
  //     // let firstBlock = $('.first-block');
  //     // let current = document.querySelector(".first-block");
  //     // let next = document.querySelector(".last-block");
  //     // let center = document.querySelector(".centered-main");
  //     // let delta = MotionPathPlugin.getRelativePosition(next, current, [0.5, 0.5], [0.5, 0.5]);

  //     // let transformOriginVal = MotionPathPlugin.getRelativePosition(next, center, [0.5, 0.5], [0.5, 0.5]);

  //     // console.log(transformOriginVal)

  //     // this.blocks.each((i,e) => {
  //     //     let item = $(e);
  //     //     let next = e;
  //     //     let center = document.querySelector(".centered-main");
  //     //     let transformOriginVal = MotionPathPlugin.getRelativePosition(next, center, [0, 0], [0, 0]);
  //     //     // let centerX = ($(center).offset().left + $(center).outerWidth() / 2) - ($(e).offset().left);
  //     //     // let centerY = ($(center).offset().top + $(center).outerHeight() / 2) - ($(e).offset().top);
  //     //     // console.log(centerX);
  //     //     // console.log(transformOriginVal)
  //     //     // switch (true) {
  //     //     //     case (i == 0):
  //     //             this.loopTl.to(item, {
  //     //                 rotation: '+=360',
  //     //                 transformOrigin: `${transformOriginVal.x}px ${transformOriginVal.y}px`,
  //     //                 // transformOrigin: `${transformOriginVal.x}px ${transformOriginVal.y}px`
  //     //             }, 0)
  //     //             this.loopTl.to(item.find('.rotation-wrap'), {
  //     //                 rotation: '-=360',
  //     //             }, 0)
  //     //     //     break;
  //     //     // }
  //     // })

  //     this.blocks.each((i, e) => {
  //         let item = $(e);

  //         switch (true) {
  //             case (i == 0):
  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: () => this.pickPosition(1),
  //                         end: 1,
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false
  //                     },
  //                     onStart: () => item.attr('data-position', 4)
  //                 }, 5);

  //                 this.loopTl.call(
  //                     () => {
  //                         this.tweenActiveBlock(item, 'animate-in');
  //                     },
  //                     null,
  //                     7
  //                 );

  //                 this.loopTl.call(
  //                     () => {
  //                         this.tweenActiveBlock(item, 'animate-out');
  //                     },
  //                     null,
  //                     11
  //                 );

  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: 0,
  //                         end: () => this.pickPosition(3),
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     },
  //                     onStart: () => item.attr('data-position', 3)
  //                 }, 12);

  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: () => this.pickPosition(3),
  //                         end: () => this.pickPosition(2),
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     },
  //                     onStart: () => item.attr('data-position', 2)
  //                 }, 19);

  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: () => this.pickPosition(2),
  //                         end: () => this.pickPosition(1),
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     },
  //                     onStart: () => item.attr('data-position', 1)
  //                 }, 26);

  //                 break;
  //             case (i == 1):
  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: () => this.pickPosition(2),
  //                         end: () => this.pickPosition(1),
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     }
  //                 }, 5.05);

  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: () => this.pickPosition(1),
  //                         end: 1,
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     }
  //                 }, 12.05);

  //                 this.loopTl.call(
  //                     () => {
  //                         this.tweenActiveBlock(item, 'animate-in');
  //                     },
  //                     null,
  //                     14.05
  //                 );

  //                 this.loopTl.call(
  //                     () => {
  //                         this.tweenActiveBlock(item, 'animate-out');
  //                     },
  //                     null,
  //                     18.05
  //                 );

  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: 0,
  //                         end: () => this.pickPosition(3),
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     }
  //                 }, 19.05);

  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: () => this.pickPosition(3),
  //                         end: () => this.pickPosition(2),
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     }
  //                 }, 26.05);
  //                 break;
  //             case (i == 2):
  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: () => this.pickPosition(3),
  //                         end: () => this.pickPosition(2),
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     }
  //                 }, 5.1);

  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: () => this.pickPosition(2),
  //                         end: () => this.pickPosition(1),
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     }
  //                 }, 12.1);

  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: () => this.pickPosition(1),
  //                         end: 1,
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     }
  //                 }, 19.1);

  //                 this.loopTl.call(
  //                     () => {
  //                         this.tweenActiveBlock(item, 'animate-in');
  //                     },
  //                     null,
  //                     21.1
  //                 );

  //                 this.loopTl.call(
  //                     () => {
  //                         this.tweenActiveBlock(item, 'animate-out');
  //                     },
  //                     null,
  //                     25.1
  //                 );

  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: 0,
  //                         end: () => this.pickPosition(3),
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     }
  //                 }, 26.1);
  //                 break;
  //             case (i === this.blocks.length - 1):
  //                 this.loopTl.call(
  //                     () => {
  //                         this.tweenActiveBlock(item, 'animate-out');
  //                     },
  //                     null,
  //                     4.65
  //                 );

  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: 0,
  //                         end: () => this.pickPosition(3),
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     }
  //                 }, 5.15);
  //                 this.loopTl.addLabel('scrollToLabel-2', '>');

  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: () => this.pickPosition(3),
  //                         end: () => this.pickPosition(2),
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     }
  //                 }, 12.15);
  //                 this.loopTl.addLabel('scrollToLabel-3', '>');

  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: () => this.pickPosition(2),
  //                         end: () => this.pickPosition(1),
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     }
  //                 }, 19.15);

  //                 this.loopTl.addLabel('scrollToLabel-4', '>');

  //                 this.loopTl.to(item, {
  //                     motionPath: {
  //                         path: this.convertedPath[0],
  //                         align: this.convertedPath[0],
  //                         start: () => this.pickPosition(1),
  //                         end: 1,
  //                         alignOrigin: [0.5, 0.5],
  //                         autoRotate: false,
  //                     }
  //                 }, 26.15);

  //                 this.loopTl.call(
  //                     () => {
  //                         this.tweenActiveBlock(item, 'animate-in');
  //                     },
  //                     null,
  //                     28.15
  //                 );

  //                 this.loopTl.addLabel('scrollToLabel-5', '>');

  //                 break;
  //         }

  //     })

  // }

  setPositions() {
    this.blocks.each((i, e) => {
      let item = $(e);
      let nextPosition = this.pickPosition(
        parseInt(item.attr('data-position')),
      );

      gsap.set(item, {
        motionPath: {
          path: this.convertedPath[0],
          align: this.convertedPath[0],
          end: nextPosition,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
      });
    });
  }

  pickPosition(position) {
    let nextPosition;

    switch (position) {
      case 1:
        nextPosition = 0.663;
        break;
      case 2:
        nextPosition = 0.493;
        break;
      case 3:
        nextPosition = 0.233;
        break;
      case 4:
        nextPosition = 0;
        break;
    }

    return nextPosition;
  }
}

export const init = () => {
  if (!isMobile()) {
    meetTeamInfoSection();
    new MeetInfoSectionRotationAnim();
    centeredBlockMouseMoveAnim();
  } else {
    meetTeamInfoSectionMobile();
  }
};
