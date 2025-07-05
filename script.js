document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    const startY = window.scrollY;
    const endY = target.getBoundingClientRect().top + startY;
    const distance = endY - startY;
    const duration = 1000; // Adjust this to control speed (ms)
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(percent));
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    }

    // Easing function: smooth acceleration and deceleration
    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    requestAnimationFrame(step);
  });
});


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 60;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});





function animateSkillsOnScroll() {
  const skillsSection = document.querySelector('#skills');
  const progressBars = document.querySelectorAll('#skills .progress');

  const sectionTop = skillsSection.getBoundingClientRect().top;
  const sectionBottom = skillsSection.getBoundingClientRect().bottom;
  const screenHeight = window.innerHeight;

  if (sectionTop < screenHeight && sectionBottom > 100) {
    // Nếu hiện trên màn hình thì animate
    progressBars.forEach(bar => {
      const percent = bar.getAttribute('data-progress');
      bar.style.width = percent;
      bar.classList.remove('reset'); // bỏ reset để chạy
    });
  } else {
    // Nếu ra khỏi màn hình thì reset lại
    progressBars.forEach(bar => {
      bar.classList.add('reset');
    });
  }
}

window.addEventListener('scroll', animateSkillsOnScroll);


