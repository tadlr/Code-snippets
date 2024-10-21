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

const articleInitSectionAnim = () => {
    if (!$('.single-article-section').length) return;
    const section = $('.single-article-section');
    const breadcrumbWrap = section.find('.single-article-breadcrumb');
    const articleBody = section.find('.article-body');
    const articleAuthor = section.find('.article-author');
    const relatedArticles = section.find('.related-articles');

    const breadcrumbTl = gsap.timeline({
        onStart: () => animationStarting(breadcrumbWrap),
    })

    breadcrumbTl.fromTo(breadcrumbWrap.find('.breadcrumb-list').children(), {
        opacity: 0
    }, {
        opacity: 1,
        stagger: .2,
    }, 0);

    breadcrumbTl.fromTo(breadcrumbWrap.find('.current-page-breadcrumb-title, .back-to-all'), {
        y: 15,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        stagger: .2
    }, 0);

    const articleBodyTl = gsap.timeline({
        onStart: () => animationStarting(articleBody),
        paused: true,
    })

    articleBodyTl.to(articleBody.find('.txt-size-60 .char'), {
        y: 0,
        stagger: .02,
        opacity: 1,
        duration: .4,
    }, 0);

    articleBodyTl.fromTo(articleBody.find('.article-meta').children(), {
        opacity: 0
    }, {
        opacity: 1,
        stagger: .1
    }, .2);

    if (articleBody.find('.article-featured-img').length) {
        articleBodyTl.fromTo(articleBody.find('.article-featured-img'), {
            opacity: 0
        }, {
            opacity: 1,
        }, .3);
    }

    if (articleBody.find('.photo-credit').length) {
        articleBodyTl.fromTo(articleBody.find('.photo-credit'), {
            y: 15,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
        }, .4);
    }

    articleBodyTl.fromTo(articleBody.find('.article-share .txt-size-18'), {
        opacity: 0
    }, {
        opacity: 1,
    }, .4);

    articleBodyTl.fromTo(articleBody.find('.article-share .social-item'), {
        opacity: 0
    }, {
        opacity: 1,
        stagger: .1
    }, .5);
    

    if (!isMobile()) {
        articleBodyTl.fromTo(articleBody.find('.article-aside .anim-translate-y'), {
            y: 15,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            stagger: .05,
        }, .6)
    } else {
        const articleAsideMobileTl = gsap.timeline({
            paused: true,
        });

        articleAsideMobileTl.fromTo(articleBody.find('.article-aside .anim-translate-y'), {
            y: 15,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            stagger: .05,
        }, 0)

        ScrollTrigger.create({
            trigger: articleBody.find('.article-aside'),
            start: '0% 75%',
            end: '+=1%',
            onEnter: () => articleAsideMobileTl.timeScale(1).play(),
            onLeaveBack: () => articleAsideMobileTl.timeScale(2).reverse()
        })
    }


    articleBodyTl.fromTo(articleBody.find('.table-of-contents, .article-text'), {
        opacity: 0
    }, {
        opacity: 1,
        stagger: .2
    }, .6);

    ScrollTrigger.create({
        trigger: articleBody,
        start: '0% 75%',
        end: '+=1%',
        onEnter: () => articleBodyTl.timeScale(1).play(),
        onLeaveBack: () => articleBodyTl.timeScale(2).reverse()
    })

    const articleAuthorTl = gsap.timeline({
        onStart: () => animationStarting(articleAuthor),
        paused: true,
    });

    articleAuthorTl.fromTo(articleAuthor, {
        opacity: 0,
    }, {
        opacity: 1,
    }, 0)

    articleAuthorTl.fromTo(articleAuthor.find('.author-image'), {
        scale: 0,
    }, {
        scale: 1,
        ease: "elastic.out(0.6, 0.4)",
        duration: 1,
    }, .1)
    
    articleAuthorTl.to(articleAuthor.find('.txt-size-24 .char'), {
        y: 0,
        stagger: .02,
        opacity: 1,
        duration: .4,
    }, .2);

    articleAuthorTl.fromTo(articleAuthor.find('.txt-size-18'), {
        x: -10,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
    }, .4);

    ScrollTrigger.create({
        trigger: articleAuthor,
        start: '0% 75%',
        end: '+=1%',
        onEnter: () => articleAuthorTl.timeScale(1).play(),
        onLeaveBack: () => articleAuthorTl.timeScale(2).reverse()
    })

    const relatedArticlesTl = gsap.timeline({
        onStart: () => animationStarting(relatedArticles),
        paused: true,
    });

    relatedArticlesTl.to(relatedArticles.find('.txt-size-60 .char'), {
        y: 0,
        stagger: .02,
        opacity: 1,
        duration: .4,
    }, 0);

    relatedArticles.find('.related-post-item').each((i,e) => {
        let item = $(e);

        relatedArticlesTl.fromTo(item.find('.related-post-item-img'), {
            opacity: 0
        }, {
            opacity: 1,
        }, .15);

        relatedArticlesTl.fromTo(item.find('.related-meta').children(), {
            opacity: 0
        }, {
            opacity: 1,
            stagger: .1
        }, .3);

        relatedArticlesTl.to(item.find('.anim-translate-y'), {
            yPercent: 0,
            stagger: .1,
            opacity: 1,
        }, .45);

        relatedArticlesTl.fromTo(item.find('.anim-translate-x'), {
            x: -10,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            stagger: .2,
        }, .6);
    })

    ScrollTrigger.create({
        trigger: relatedArticles,
        start: '0% 75%',
        end: '+=1%',
        onEnter: () => relatedArticlesTl.timeScale(1).play(),
        onLeaveBack: () => relatedArticlesTl.timeScale(2).reverse()
    })
}

export const init = () => {
    articleInitSectionAnim();
}