
/* ========================================
   NORTH GROUP — SCRIPT PRINCIPAL
======================================== */

/* MENU MOBILE */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu"
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menu");
    });
  });
}

/* ANIMAÇÕES DE ENTRADA AO ROLAR */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

/* ANO AUTOMÁTICO NO RODAPÉ */

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* VERIFICAÇÃO DAS IMAGENS */

document
  .querySelectorAll(".project-visual img, .traffic-gallery img")
  .forEach((image) => {
    image.addEventListener("error", () => {
      console.warn(
        "Não foi possível carregar a imagem:",
        image.getAttribute("src")
      );
    });
  });

/* MOVIMENTO SUAVE DO SÍMBOLO NG */

const hero = document.querySelector(".hero");
const orbCore = document.querySelector(".orb-core");
const letterN = document.querySelector(".letter-n");
const letterG = document.querySelector(".letter-g");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (hero && orbCore && letterN && letterG && !reduceMotion) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let animationFrame = null;

  const updatePosition = () => {
    currentX += (targetX - currentX) * 0.07;
    currentY += (targetY - currentY) * 0.07;

    orbCore.style.transform =
      `translate3d(${currentX}px, ${currentY}px, 0)`;

    letterN.style.transform =
      `translate3d(${-currentX * 0.12}px, ${-currentY * 0.12}px, 0)`;

    letterG.style.transform =
      `translate3d(${currentX * 0.12}px, ${currentY * 0.12}px, 0)`;

    const stillMoving =
      Math.abs(targetX - currentX) > 0.05 ||
      Math.abs(targetY - currentY) > 0.05;

    if (stillMoving) {
      animationFrame = requestAnimationFrame(updatePosition);
    } else {
      animationFrame = null;
    }
  };

  const moveSymbol = (event) => {
    const bounds = hero.getBoundingClientRect();

    const mouseX = (event.clientX - bounds.left) / bounds.width;
    const mouseY = (event.clientY - bounds.top) / bounds.height;

    targetX = (mouseX - 0.5) * 22;
    targetY = (mouseY - 0.5) * 22;

    if (animationFrame === null) {
      animationFrame = requestAnimationFrame(updatePosition);
    }
  };

  const resetSymbol = () => {
    targetX = 0;
    targetY = 0;

    if (animationFrame === null) {
      animationFrame = requestAnimationFrame(updatePosition);
    }
  };

  hero.addEventListener("pointermove", moveSymbol);
  hero.addEventListener("pointerleave", resetSymbol);
}
