const greetings = [
  { text: "Hello,", scale: 1 },
  { text: "Ciao,", scale: 1 },
  { text: "สวัสดีครับ,", scale: 0.58 },
  { text: "Hola,", scale: 1 },
  { text: "你好,", scale: 1 },
  { text: "こんにちは,", scale: 0.72 },
  { text: "Hello,", scale: 1 },
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
