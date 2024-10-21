import gsap from "gsap";

class HorizontalMovingText {
  constructor(
    $textField,
    $textContainer,
    textOuterContainer,
    triggerElem,
    speed,
    direction,
  ) {
    this.speedI = speed;
    this.tl = gsap.timeline({ paused: true });
    this.speed = 20;
    this.triggerElem = triggerElem;
    this.$textBox = $textContainer;
    this.textOuterBox = $textField;
    this.direction = direction;
    this.startRolling(textOuterContainer);
  }

  calcSpeed(_speedI) {
    const speedIndex = _speedI;
    this.speed = this.width * speedIndex;
  }

  setTextWidth() {
    this.$textBox.css({ width: "auto" });
    this.width = this.$textBox.width();
    this.$textBox.width(this.width);
  }

  cloneText() {
    this.$clonedText = this.$textBox.clone();
    this.$clonedText.addClass("cloned");
    this.$clonedText.appendTo(this.textOuterBox);
  }

  startRolling() {
    this.setTextWidth();
    this.cloneText();
    this.calcSpeed(this.speedI);

    if (this.direction == "to-right") {
      this.tl
        .fromTo(
          this.$textBox,
          this.speed,
          { x: 0 },
          { x: this.width, ease: "none" },
          0,
        )
        .fromTo(
          this.$clonedText,
          this.speed,
          { x: -this.width },
          { x: 0, ease: "none" },
          0,
        )
        .set(this.$textBox, { x: -this.width })
        .to(
          this.$clonedText,
          this.speed,
          { x: this.width, ease: "none" },
          this.speed,
        )
        .to(this.$textBox, this.speed, { x: 0, ease: "none" }, this.speed)
        .progress(1)
        .progress(0)
        .repeat(-1);
    } else {
      this.tl
        .fromTo(
          this.$textBox,
          this.speed,
          { x: 0 },
          { x: -this.width, ease: "none" },
          0,
        )
        .fromTo(
          this.$clonedText,
          this.speed,
          { x: this.width },
          { x: 0, ease: "none" },
          0,
        )
        .set(this.$textBox, { x: this.width })
        .to(
          this.$clonedText,
          this.speed,
          { x: -this.width, ease: "none" },
          this.speed,
        )
        .to(this.$textBox, this.speed, { x: 0, ease: "none" }, this.speed)
        .progress(1)
        .progress(0)
        .repeat(-1);
    }

    // setup for animation control when outside of screen
    // intersection observer used to stop anim outside of screen

    let options = {
      threshold: [0.001, 0.999],
    };

    let callback = (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !this.triggerElem.hasClass("animating-text")
        ) {
          this.triggerElem.addClass("animating-text");
          this.tl.play();
        } else if (
          !entry.isIntersecting &&
          this.triggerElem.hasClass("animating-text")
        ) {
          this.triggerElem.removeClass("animating-text");
          this.tl.pause();
        }
      });
    };

    let observer = new IntersectionObserver(callback, options);
    let target = this.triggerElem[0];
    observer.observe(target);
  }
}

export default HorizontalMovingText;
