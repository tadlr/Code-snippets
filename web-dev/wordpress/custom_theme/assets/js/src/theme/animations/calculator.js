import $ from 'jquery';
import gsap from 'gsap';
import {
    animationStarting,
    isMobile,
    debounce
} from '../helpers/helper';
import {
    ScrollTrigger
} from 'gsap/ScrollTrigger';

const calculatorInitSectionAnim = () => {
    if (!$('.calculator-page-circle-info-section').length) return;
    const section = $('.calculator-page-circle-info-section');
    const tl = gsap.timeline({
        onStart: () => animationStarting(section),
        paused: true,
    })

    if (!isMobile()) {
        tl.to(section.find('.txt-size-72 .char'), {
            y: 0,
            stagger: .02,
            opacity: 1,
            duration: .4,
        }, 0);
    
        tl.fromTo(section.find('.txt-post-rtf'), {
            x: -10,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
        }, .3);
    
        tl.fromTo(section.find('.img-width-wrap'), {
            scale: 0,
        }, {
            scale: 1,
            ease: "elastic.out(0.6, 0.4)",
            stagger: .2,
            duration: 1,
        }, .3)
    
        tl.fromTo(section.find('.calculator-circle-blue, .calculator-circle-gray, .calculator-circle-gray-border'), {
            opacity: 0
        }, {
            opacity: 1,
            stagger: .1
        }, .6);

        tl.fromTo(section.find('.background-pattern-svg'), {
            opacity: 0
        }, {
            opacity: .15,
        }, .8);

    } else {
        tl.fromTo(section.find('.img-width-wrap'), {
            scale: 0,
        }, {
            scale: 1,
            ease: "elastic.out(0.6, 0.4)",
            stagger: .2,
            duration: 1,
        }, 0)

        tl.to(section.find('.txt-size-72 .char'), {
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
    }



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

const calculatorSectionAnim = () => {
    if (!$('.calculator-section').length) return;
    const section = $('.calculator-section');
    const tl = gsap.timeline({
        onStart: () => animationStarting(section),
        paused: true,
    })

    // if (!isMobile()) {
        tl.to(section.find('.txt-size-48 .char'), {
            y: 0,
            stagger: .02,
            opacity: 1,
            duration: .4,
        }, 0);
    
        tl.fromTo(section.find('.calculator-info-txt'), {
            x: -10,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
        }, .3);

        tl.fromTo(section.find('.calculate-values-btn-wrap'), {
            x: -10,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
        }, .45);
    
        tl.fromTo(section.find('.calculator-graphic-wrap, .calculator-results-wrap, .btn-wrap'), {
            opacity: 0
        }, {
            opacity: 1,
            stagger: .2
        }, .6);

    // } else {
    //     tl.fromTo(section.find('.img-width-wrap'), {
    //         scale: 0,
    //     }, {
    //         scale: 1,
    //         ease: "elastic.out(0.6, 0.4)",
    //         stagger: .2,
    //         duration: 1,
    //     }, 0)

    //     tl.to(section.find('.txt-size-72 .char'), {
    //         y: 0,
    //         stagger: .02,
    //         opacity: 1,
    //         duration: .4,
    //     }, .3);
    
    //     tl.fromTo(section.find('.txt-post-rtf'), {
    //         x: -10,
    //         opacity: 0
    //     }, {
    //         x: 0,
    //         opacity: 1,
    //     }, .6);
    // }



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

const calculatorCircleInfoSection = () => {
    if (!$('.bgr-circle-info-section').length) return;
    const section = $('.bgr-circle-info-section');
    const tl = gsap.timeline({
        onStart: () => animationStarting(section),
        paused: true,
    })

    tl.to(section.find('.txt-size-60 .char'), {
        y: 0,
        stagger: .02,
        opacity: 1,
        duration: .4,
    }, 0);

    if (!isMobile()) {
        tl.fromTo(section.find('.bgr-circle-svg'), {
            scale: 0,
        }, {
            scale: 1,
            ease: "elastic.out(0.6, 0.4)",
            stagger: .2,
            duration: 1,
        }, .15)
    }

    tl.fromTo(section.find('.txt-post-rtf'), {
        x: -10,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
    }, .3);

    tl.fromTo(section.find('.btn-default'), {
        opacity: 0
    }, {
        opacity: 1,
        stagger: .1
    }, .6);

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
    calculatorInitSectionAnim();
    calculatorSectionAnim();
    calculatorCircleInfoSection();
}