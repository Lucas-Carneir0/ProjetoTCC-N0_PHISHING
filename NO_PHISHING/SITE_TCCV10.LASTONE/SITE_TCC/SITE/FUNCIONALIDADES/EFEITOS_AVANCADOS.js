import { $, $$ } from "./UTILIDADES.js";

export function initAdvancedEffects() {
  initCyberNetworkCanvas();
  initCursorSpotlight();
  initScrambleTitles();
  initExampleLightbox();
}

function initCyberNetworkCanvas() {
  const canvas = $("#cyberBgCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  const nodeCount = Math.min(48, Math.max(18, Math.floor((width * height) / 36000)));
  const nodes = Array.from({ length: nodeCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r: Math.random() * 1.6 + 1
  }));

  function frame() {
    if (!document.body.classList.contains("reduced-effects")) {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > width) a.vx *= -1;
        if (a.y < 0 || a.y > height) a.vy *= -1;

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 65, 0.55)";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 145) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            const alpha = (1 - dist / 145) * 0.22;
            ctx.strokeStyle = `rgba(0, 255, 65, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function initCursorSpotlight() {
  const glow = $("#cursorGlow");
  if (!glow) return;
  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

function initScrambleTitles() {
  const chars = "01#$%&*@/\<>[]{}";
  const titles = $$(".section-title");
  if (!titles.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.scrambled) return;
      el.dataset.scrambled = "true";

      if (document.body.classList.contains("reduced-effects")) return;

      const span = el.querySelector("span");
      const prefixHTML = span ? span.outerHTML + " " : "";
      const rawText = el.textContent.replace(span ? span.textContent : "", "").trim();
      let iteration = 0;

      const timer = setInterval(() => {
        const scrambled = rawText
          .split("")
          .map((ch, idx) => {
            if (ch === " ") return " ";
            if (idx < iteration) return rawText[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        el.innerHTML = prefixHTML + scrambled;
        iteration += Math.max(1, rawText.length / 18);
        if (iteration >= rawText.length) {
          el.innerHTML = prefixHTML + rawText;
          clearInterval(timer);
        }
      }, 28);

      observer.unobserve(el);
    });
  }, { threshold: 0.25 });

  titles.forEach((t) => observer.observe(t));
}

function initExampleLightbox() {
  const modal = $("#imageLightbox");
  const modalImg = $("#lightboxImg");
  const modalCaption = $("#lightboxCaption");
  const closeBtn = $("#closeLightbox");
  if (!modal || !modalImg) return;

  $$(".zoomable-example").forEach((img) => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      if (modalCaption) modalCaption.textContent = img.dataset.caption || img.alt;
      modal.hidden = false;
    });
  });

  const close = () => {
    modal.hidden = true;
    modalImg.src = "";
  };

  closeBtn?.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) close();
  });
}
