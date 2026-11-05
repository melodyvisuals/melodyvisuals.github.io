// ---- Portfolio photos: add new files to /img and list them here ----
const PHOTOS = [
  { src: "img/wedding-1.jpg", cat: "wedding", alt: "Bride lifted on a chair, laughing with guests" },
  { src: "img/portrait-2.jpg", cat: "portrait", alt: "Woman in a sparkling gown in golden light" },
  { src: "img/event-2.jpg", cat: "event", alt: "Young musicians playing begena harps" },
  { src: "img/wedding-3.jpg", cat: "wedding", alt: "Couple in traditional royal capes and crowns" },
  { src: "img/portrait-4.jpg", cat: "portrait", alt: "Portrait in white habesha kemis with blue tilet" },
  { src: "img/wedding-2.jpg", cat: "wedding", alt: "Bride and groom with wedding party" },
  { src: "img/event-1.jpg", cat: "event", alt: "Women singing during a worship celebration" },
  { src: "img/wedding-4.jpg", cat: "wedding", alt: "Bride and groom during an Orthodox ceremony" },
  { src: "img/portrait-5.jpg", cat: "portrait", alt: "Toddler in a white dress standing in a park" },
  { src: "img/wedding-5.jpg", cat: "wedding", alt: "Groom lifted by celebrating guests" },
  { src: "img/event-6.jpg", cat: "event", alt: "Two men holding books at a launch event" },
  { src: "img/portrait-1.jpg", cat: "portrait", alt: "Maternity portrait in a white gown" },
  { src: "img/wedding-6.jpg", cat: "wedding", alt: "Couple in traditional attire with singers" },
  { src: "img/event-3.jpg", cat: "event", alt: "Woman in white netela smiling during worship" },
  { src: "img/portrait-3.jpg", cat: "portrait", alt: "Graduate in white habesha dress" },
  { src: "img/wedding-8.jpg", cat: "wedding", alt: "Groom in white tuxedo among cheering guests" },
  { src: "img/event-4.jpg", cat: "event", alt: "Large worship concert with choir and audience" },
  { src: "img/wedding-7.jpg", cat: "wedding", alt: "Emotional embrace in black and white" },
  { src: "img/portrait-7.jpg", cat: "portrait", alt: "Young man in a suit at a celebration" },
  { src: "img/wedding-9.jpg", cat: "wedding", alt: "Bride clapping with groomsmen and drums" },
  { src: "img/event-5.jpg", cat: "event", alt: "Concert hall filled with worshippers in white" },
  { src: "img/portrait-6.jpg", cat: "portrait", alt: "Man singing in a black velvet cape" }
];
const LABEL = { wedding: "Wedding", event: "Event", portrait: "Portrait" };
const FEATURED = [0, 11]; // shown large in the "All" view

// ---- Client reviews: paste real quotes here; the reviews card shows when this list has entries ----
// Example: { text: "Quote from the client…", name: "Name & Name", meta: "Wedding · Dallas, TX" }
const REVIEWS = [];

// Gallery
const gallery = document.getElementById("gallery");
gallery.innerHTML = PHOTOS.map((p, i) =>
  `<figure class="g-item${FEATURED.includes(i) ? " big" : ""}" data-cat="${p.cat}" data-i="${i}"><img src="${p.src}" alt="${p.alt}" loading="lazy" width="980" height="1225"><figcaption>${LABEL[p.cat]}</figcaption></figure>`
).join("");

const filters = document.querySelectorAll(".filter");
function applyFilter(cat) {
  filters.forEach(b => { const on = b.dataset.filter === cat; b.classList.toggle("is-active", on); b.setAttribute("aria-selected", on); });
  gallery.querySelectorAll(".g-item").forEach(el => el.classList.toggle("hide", cat !== "all" && el.dataset.cat !== cat));
  gallery.querySelectorAll(".g-item").forEach(el => el.classList.toggle("big", cat === "all" && FEATURED.includes(+el.dataset.i)));
}
filters.forEach(b => b.addEventListener("click", () => applyFilter(b.dataset.filter)));

// Deep links: #weddings / #events / #portraits filter the gallery
const HASH = { "#weddings": "wedding", "#events": "event", "#portraits": "portrait", "#portfolio": "all" };
function fromHash() { if (HASH[location.hash]) applyFilter(HASH[location.hash]); }
window.addEventListener("hashchange", fromHash); fromHash();

// Lightbox
const lb = document.getElementById("lightbox"), lbImg = document.getElementById("lb-img");
let cur = 0;
const visible = () => [...gallery.querySelectorAll(".g-item:not(.hide)")].map(el => +el.dataset.i);
function show(i) { cur = i; lbImg.src = PHOTOS[i].src; lbImg.alt = PHOTOS[i].alt; }
function step(d) { const v = visible(); const k = v.indexOf(cur); show(v[(k + d + v.length) % v.length]); }
gallery.addEventListener("click", e => { const f = e.target.closest(".g-item"); if (!f) return; show(+f.dataset.i); lb.hidden = false; document.body.style.overflow = "hidden"; });
function close() { lb.hidden = true; document.body.style.overflow = ""; }
lb.querySelector(".lb-close").onclick = close;
lb.querySelector(".lb-prev").onclick = () => step(-1);
lb.querySelector(".lb-next").onclick = () => step(1);
lb.addEventListener("click", e => { if (e.target === lb) close(); });
document.addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") close(); if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); });

// Reviews
if (REVIEWS.length) {
  const box = document.getElementById("reviews"); box.hidden = false;
  let r = 0;
  const render = () => {
    const x = REVIEWS[r];
    document.getElementById("review-text").textContent = `"${x.text}"`;
    document.getElementById("review-name").textContent = x.name;
    document.getElementById("review-meta").textContent = x.meta || "";
    document.getElementById("rev-count").textContent = `${String(r + 1).padStart(2, "0")} — ${String(REVIEWS.length).padStart(2, "0")}`;
  };
  document.getElementById("rev-prev").onclick = () => { r = (r - 1 + REVIEWS.length) % REVIEWS.length; render(); };
  document.getElementById("rev-next").onclick = () => { r = (r + 1) % REVIEWS.length; render(); };
  render();
}

// Hero slideshow
const slides = document.querySelectorAll(".slide");
if (slides.length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let s = 0;
  setInterval(() => { if (innerWidth >= 900) return; slides[s].classList.remove("is-on"); s = (s + 1) % slides.length; slides[s].classList.add("is-on"); }, 6000);
}

// Header + mobile menu
const header = document.querySelector(".site-header");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 40), { passive: true });
const toggle = document.querySelector(".menu-toggle"), menu = document.querySelector(".mobile-menu");
toggle.addEventListener("click", () => { const open = menu.hidden; menu.hidden = !open; toggle.setAttribute("aria-expanded", open); });
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { menu.hidden = true; toggle.setAttribute("aria-expanded", false); }));

// Reveal on scroll
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 }) : null;
document.querySelectorAll(".statement, .svc-img, .svc-text, .sec-head, .couple-list li, .stories-intro, .about-media, .about-text, .contact-form, .contact-info").forEach(el => { if (io) { el.classList.add("reveal"); io.observe(el); } });

document.getElementById("year").textContent = new Date().getFullYear();
