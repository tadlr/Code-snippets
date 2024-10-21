import $ from 'jquery';
import gsap from 'gsap';
import { animationStarting, isMobile } from '../helpers/helper';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const innerInfoImgVideoSectionAnim = () => {
    if (!$('.inner-info-img-video-section').length) return;
    const section = $('.inner-info-img-video-section');
    const tl = gsap.timeline({
        onStart: () => animationStarting(section),
        paused: true,
    });

    tl.fromTo(section.find('.main-img-wrapper'), {
        scale: 0
    }, {
        scale: 1,
        duration: 1
    }, 0);

    tl.to(section.find('.char'), {
        y: 0,
        stagger: .02,
        opacity: 1,
        duration: .4,
    }, .3);


    tl.fromTo(section.find('.txt-post-rtf'), {
        x: -10,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
    }, .6);

    tl.fromTo(section.find('.circles-img-wrap'), {
        scale: 0,
    }, {
        scale: 1,
        ease: "elastic.out(0.6, 0.4)",
        stagger: .2,
        duration: 1,
    }, .6)

    section.find('.background-target-circle-transparent').each((i,e) => {
        let circleOuter = $(e);
        let circleInner = circleOuter.children();

        tl.fromTo([
            circleOuter,
            circleInner
        ], {
            scale: 0,
        }, {
            scale: 1,
            ease: "elastic.out(0.6, 0.4)",
            stagger: .1,
            duration: 1,
        }, .8)
    })


    tl.fromTo(section.find('.btn-wrap'), {
        opacity: 0,
    }, {
        opacity: 1,
    }, 1)

    ScrollTrigger.create({
        trigger: section,
        start: '0% 75%',
        end: '+=1%',
        toggleActions: 'none none none none',
        animation: tl,
        onEnter: () => tl.timeScale(1).play(),
        onLeaveBack: () => tl.timeScale(2).reverse()
    })
}


const innerEquipmentListSectionAnim = () => {
    if (!$('.inner-equipment-list-section').length) return;
    const section = $('.inner-equipment-list-section');
    const tl = gsap.timeline({
        onStart: () => animationStarting(section),
        paused: true,
    });

    tl.to(section.find('.char'), {
        y: 0,
        stagger: .02,
        opacity: 1,
        duration: .4,
    }, 0);


    tl.fromTo(section.find('.txt-post-rtf'), {
        y: 10,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
    }, .3);


    tl.fromTo(section.find('.img-wrapper'), {
        scale: 0,
    }, {
        scale: 1,
        stagger: .1,
    }, .6);

    tl.fromTo(section.find('.equipment-block-btn'), {
        y: 10,
        opacity: 0,
    }, {
        y: 0,
        opacity: 1,
        stagger: .1,
    }, .9);

    ScrollTrigger.create({
        trigger: section,
        start: '0% 75%',
        end: '+=1%',
        toggleActions: 'none none none none',
        animation: tl,
        onEnter: () => tl.timeScale(1).play(),
        onLeaveBack: () => tl.timeScale(2).reverse()
    })
}

export const init = () => {
    innerInfoImgVideoSectionAnim();
    innerEquipmentListSectionAnim();
}
