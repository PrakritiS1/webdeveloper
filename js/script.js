// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// Typing effect
const roles = ["Web Developer", "Full-Stack Developer", "Freelancer", "CS Student"];
const typed = document.getElementById("typed");
let roleIdx = 0, charIdx = 0, deleting = false;

function type() {
  const word = roles[roleIdx];
  typed.textContent = deleting ? word.slice(0, --charIdx) : word.slice(0, ++charIdx);
  let delay = deleting ? 50 : 110;
  if (!deleting && charIdx === word.length) { delay = 1500; deleting = true; }
  else if (deleting && charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; delay = 400; }
  setTimeout(type, delay);
}
type();

// Scroll reveal + counters
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = prefix + Math.floor(p * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      entry.target.querySelectorAll(".num").forEach(animateCount);
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll("main section, section[id]");
const links = document.querySelectorAll(".nav-links a");
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

// Project filters
const filterBtns = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll("#projectGrid .project");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    projectCards.forEach((card) => {
      card.classList.toggle("hide", f !== "all" && card.dataset.cat !== f);
    });
  });
});

// Contact form -> opens the user's email app (no backend needed on GitHub Pages)
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const subject = encodeURIComponent("Portfolio enquiry from " + name);
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = "mailto:prakritirajput003@gmail.com?subject=" + subject + "&body=" + body;
});