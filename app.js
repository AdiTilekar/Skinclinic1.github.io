(() => {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-animate", {
      y: 24,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out"
    });

    gsap.utils.toArray("[data-animate='fade-up']").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        scrollTrigger: {
          trigger: el,
          start: "top 80%"
        }
      });
    });

    gsap.utils.toArray("[data-animate='fade-in']").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: el,
          start: "top 85%"
        }
      });
    });
  }

  const path = document.querySelector("#roadmap-path");
  if (gsap && path) {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    gsap.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: "#roadmap-svg",
        start: "top 80%",
        end: "bottom 40%",
        scrub: true
      }
    });
  }

  const floaties = document.querySelectorAll("[data-depth]");
  document.querySelectorAll(".parallax-zone").forEach((zone) => {
    zone.addEventListener("mousemove", (event) => {
      const rect = zone.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      floaties.forEach((item) => {
        const depth = Number(item.dataset.depth || 8);
        item.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    });

    zone.addEventListener("mouseleave", () => {
      floaties.forEach((item) => {
        item.style.transform = "translate(0px, 0px)";
      });
    });
  });

  document.querySelectorAll(".accordion-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".accordion-item");
      const isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".accordion-item").forEach((row) => {
        row.classList.remove("is-open");
        row.querySelector("button").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
})();
