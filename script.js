const greetings = [
  { text: "Hello,", scale: 1, lang: "en" },
  { text: "Ciao,", scale: 1, lang: "it" },
  { text: "สวัสดีครับ,", scale: 0.58, lang: "th", usesIbm: true },
  { text: "Hola,", scale: 1, lang: "es" },
  { text: "你好,", scale: 1, lang: "zh-Hans", usesIbm: true },
  { text: "こんにちは,", scale: 0.72, lang: "ja", usesIbm: true },
];

const greeting = document.querySelector("[data-greeting]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let greetingIndex = 0;
let greetingTimer;

function showNextGreeting() {
  if (!greeting || reduceMotion.matches) return;

  greeting.classList.remove("is-entering");
  greeting.classList.add("is-leaving");

  window.setTimeout(() => {
    greetingIndex = (greetingIndex + 1) % greetings.length;
    const nextGreeting = greetings[greetingIndex];
    greeting.textContent = nextGreeting.text;
    greeting.style.fontSize = `${nextGreeting.scale}em`;
    greeting.lang = nextGreeting.lang;
    greeting.classList.toggle("greeting__word--ibm", Boolean(nextGreeting.usesIbm));
    greeting.classList.remove("is-leaving");
    greeting.classList.add("is-entering");
  }, 360);
}

function startGreetingLoop() {
  window.clearInterval(greetingTimer);
  if (!reduceMotion.matches) {
    greetingTimer = window.setInterval(showNextGreeting, 2200);
  }
}

startGreetingLoop();
reduceMotion.addEventListener("change", startGreetingLoop);
