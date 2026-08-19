(function () {
  "use strict";

  /* Header scroll state */
  var header = document.getElementById("site-header");
  var toTop = document.querySelector(".totop");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (toTop) toTop.classList.toggle("show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Mobile nav toggle */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { navLinks.classList.remove("open"); });
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* Work filter */
  var filterBtns = document.querySelectorAll(".filters button");
  var cards = document.querySelectorAll(".work-card");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-filter");
      cards.forEach(function (card) {
        var match = f === "*" || card.getAttribute("data-cat") === f;
        card.classList.toggle("show", match);
      });
    });
  });

  /* Image fallback: if an asset image is missing, show tracking-frame placeholder */
  document.querySelectorAll("img[data-fallback-label]").forEach(function (img) {
    img.addEventListener("error", function () {
      var shot = img.closest(".shot");
      if (!shot || shot.querySelector(".fallback")) return;
      img.style.display = "none";
      var label = img.getAttribute("data-fallback-label") || "ASSET";
      var fb = document.createElement("div");
      fb.className = "fallback";
      fb.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5-9 9"/></svg>' +
        '<span>' + label + '</span>';
      shot.appendChild(fb);
    });
  });

  /* Logo fallback: if a tool-logo image is missing, swap in its plain-text name */
  document.querySelectorAll("img[data-logo-name]").forEach(function (img) {
    img.addEventListener("error", function () {
      var tile = img.closest(".logo-tile");
      if (!tile || tile.querySelector(".logo-fallback")) return;
      img.style.display = "none";
      var span = document.createElement("span");
      span.className = "logo-fallback";
      span.textContent = img.getAttribute("data-logo-name") || "TOOL";
      tile.appendChild(span);
    });
  });
})();
