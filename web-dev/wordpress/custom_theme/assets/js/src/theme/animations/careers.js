import $ from "jquery";
import gsap from "gsap";
import { animationStarting, isMobile } from "../helpers/helper";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const careersSliderSectionAnim = () => {
  if (!$(".careers-slider-section").length) return;
  const section = $(".careers-slider-section");
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  tl.to(
    section.find(".txt-size-80 .char"),
    {
      y: 0,
      stagger: 0.02,
      opacity: 1,
      duration: 0.4,
    },
    0,
  );

  section.find(".swiper-slide").each((i, e) => {
    let item = $(e);

    tl.fromTo(
      item.find(".testimonial-img"),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.2,
      },
      0.3,
    );

    tl.to(
      item.find(".char"),
      {
        y: 0,
        stagger: 0.02,
        opacity: 1,
        duration: 0.4,
      },
      0.45,
    );

    tl.fromTo(
      [
        item.find(".quote-image-wrap"),
        item.find(".txt-post-rtf"),
        item.find(".quote-by-info"),
      ],
      {
        opacity: 0,
      },
      {
        opacity: 1,
        stagger: 0.2,
      },
      0.6,
    );
  });

  ScrollTrigger.create({
    trigger: section,
    start: "0% 75%",
    end: "+=1%",
    onEnter: () => tl.timeScale(1).play(),
    onLeaveBack: () => tl.timeScale(2).reverse(),
  });
};

const benefitsSectionCareersAnim = () => {
  if (!$(".benefits-section-careers-page").length) return;
  const section = $(".benefits-section-careers-page");
  let elements = !isMobile()
    ? section.find(".txt-post-rtf h5")
    : section.find(".txt-post-rtf").children();

  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  tl.fromTo(
    section.find(".bg-image"),
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    0,
  );

  tl.to(
    section.find(".txt-size-100 .char"),
    {
      y: 0,
      stagger: 0.02,
      opacity: 1,
      duration: 0.4,
    },
    0,
  );

  tl.fromTo(
    section.find(".img-wrap"),
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.05,
    },
    0.3,
  );

  tl.fromTo(
    elements,
    {
      y: 15,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.05,
    },
    0.45,
  );

  ScrollTrigger.create({
    trigger: section,
    start: "0% 75%",
    end: "+=1%",
    onEnter: () => tl.timeScale(1).play(),
    onLeaveBack: () => tl.timeScale(2).reverse(),
  });
};

const awardsSectionAnim = () => {
  if (!$(".awards-slider").length) return;
  const section = $(".awards-slider");
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  tl.to(
    section.find(".txt-size-80 .char"),
    {
      y: 0,
      stagger: 0.02,
      opacity: 1,
      duration: 0.4,
    },
    0,
  );

  tl.fromTo(
    section.find(".txt-post-rtf"),
    {
      x: -10,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
    },
    0.2,
  );

  tl.fromTo(
    section.find(".awards-right"),
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    0.4,
  );

  ScrollTrigger.create({
    trigger: section,
    start: "0% 75%",
    end: "+=1%",
    onEnter: () => tl.timeScale(1).play(),
    onLeaveBack: () => tl.timeScale(2).reverse(),
  });
};

const careersSearchJobsSectionAnim = () => {
  if (!$(".careers-page-search-jobs-section").length) return;
  const section = $(".careers-page-search-jobs-section");
  const tl = gsap.timeline({
    onStart: () => animationStarting(section),
    paused: true,
  });

  tl.fromTo(
    section.find(".bg-image"),
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    0,
  );

  tl.to(
    section.find(".txt-size-80 .char"),
    {
      y: 0,
      stagger: 0.02,
      opacity: 1,
      duration: 0.4,
    },
    0,
  );

  tl.fromTo(
    section.find(".txt-post-rtf"),
    {
      x: -10,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
    },
    0.3,
  );

  tl.fromTo(
    section.find(".btn-default"),
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    0.6,
  );

  ScrollTrigger.create({
    trigger: section,
    start: "0% 75%",
    end: "+=1%",
    onEnter: () => tl.timeScale(1).play(),
    onLeaveBack: () => tl.timeScale(2).reverse(),
  });
};

export const init = () => {
  careersSliderSectionAnim();
  benefitsSectionCareersAnim();
  awardsSectionAnim();
  careersSearchJobsSectionAnim();
};
