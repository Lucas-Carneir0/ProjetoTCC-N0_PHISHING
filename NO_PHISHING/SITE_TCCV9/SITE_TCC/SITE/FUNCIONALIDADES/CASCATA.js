import  {
  $$
}
from "./UTILIDADES.js";
export function cascadeLoad()  {
  const sections =
  $$(".cascade-section");
  const reduced =
  window.matchMedia(
  "(prefers-reduced-motion: reduce)"
  ).matches;
  if (reduced)  {
    sections.forEach(section =>  {
      section.classList.add("loaded");
    }
    );
    return;
  }
  const observer =
  new IntersectionObserver(
  entries =>  {
    entries.forEach(entry =>  {
      if (!entry.isIntersecting)  {
        return;
      }
      const section =
      entry.target;
      section.classList.add(
      "loaded"
      );
      observer.unobserve(
      section
      );
    }
    );
  }
  ,
  {
    threshold: 0.12,
    rootMargin:
    "0px 0px -50px 0px"
  }
  );
  sections.forEach(section =>  {
    observer.observe(section);
  }
  );
}