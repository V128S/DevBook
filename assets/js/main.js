$(document).ready(function () {
  /* ===== Smooth scrolling ====== */
  $("a.scrollto").on("click", function (e) {
    //store hash
    var target = this.hash;
    e.preventDefault();
    $("body").scrollTo(target, 800, { offset: 0, axis: "y" });
  });
});

const tl = gsap.timeline();

tl.fromTo(
  ".headline",
  {
    x: -100,
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    duration: 3,
  }
).fromTo(
  ".subheadline",
  {
    x: -150,
    y: 0,
    opacity: 0,
  },
  {
    x: 0,
    y: 0,
    opacity: 1,
    duration: 2,
  }
);

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".benefits-section",
    pin: false,
    start: "-3% top", // when the top of the trigger hits the top of the viewport
    end: "+=500", // end after scrolling 500px beyond the start
    scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
  },
});
tl2
  .addLabel("start")
  .from(".item-desc, .item-heading, .item-icon", {
    scale: 0.3,
    rotation: 45,
    autoAlpha: 0,
    stagger: 1,
    duration: 1.2,
  })
  .addLabel("color")
  .from(".item-heading", { color: "black" })
  .addLabel("spin")
  .to(".item-icon", { opacity: 0.8 })
  .addLabel("end");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Check if the .key-points-list element is in view
    if (entry.intersectionRatio > 0) {
      const listItems = gsap.utils.toArray(".key-points-list li");
      listItems.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          x: 100,
          duration: 1.5,
          delay: index * 1.8,
        });
      });
      observer.unobserve(entry.target);
    }
  });
});

const list = document.querySelector(".key-points-list");
observer.observe(list);

const section = document.querySelector(".audience");

const observer2 = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      const mediaBodies = document.querySelectorAll(".media-body");

      gsap.set(mediaBodies, { x: "100%" });

      // Create a Gsap timeline animation for the media-body elements
      const timeline = gsap.timeline({
        defaults: { duration: 2.6, delay: 2, stagger: 1, ease: "power2.out" },
      });

      timeline.fromTo(mediaBodies, { x: "-100" }, { x: "0", stagger: 0.4 });

      // Trigger the timeline animation
      timeline.play();

      // Disconnect the observer after the animation is triggered
      observer2.disconnect();
    }
  },
  { threshold: 0 }
);

// Observe the section
observer2.observe(section);

gsap.fromTo(
  ".tablet-ui",
  { opacity: 0, x: -100 },
  { opacity: 1, x: 0, delay: 5, duration: 3, ease: "elastic" }
);

const observer3 = new IntersectionObserver(callback, options);
const target = document.querySelector(".tablet-ui");
observer3.observe(target);
function callback(entries, observer3) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // start the animation
      gsap.to(".tablet-ui", { opacity: 1, y: 0, duration: 1 });
      // stop observing the target element
      observer3.unobserve(entry.target);
    }
  });
}
