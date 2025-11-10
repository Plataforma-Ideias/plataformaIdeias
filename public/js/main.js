document.addEventListener("DOMContentLoaded", function () {
  const flashes = document.querySelectorAll(".flash");
  if (flashes.length) {
    setTimeout(() => {
      flashes.forEach((f) => {
        f.style.transition = "opacity 400ms, max-height 400ms, margin 400ms";
        f.style.opacity = 0;
        f.style.maxHeight = "0";
        f.style.margin = 0;
      });
    }, 5000);
  }

  document.querySelectorAll("form[data-confirm]").forEach((form) => {
    form.addEventListener("submit", function (e) {
      const message = form.getAttribute("data-confirm") || "Tem certeza?";
      if (!confirm(message)) {
        e.preventDefault();
      }
    });
  });

  const autofocusContainer = document.querySelector(".autofocus");
  if (autofocusContainer) {
    const firstInput = autofocusContainer.querySelector(
      "input, textarea, select"
    );
    if (firstInput) firstInput.focus();
  }

  const desc = document.querySelector("#description");
  const counter = document.querySelector("#description-count");
  if (desc && counter) {
    const update = () =>
      (counter.textContent = `${desc.value.length} caracteres`);
    desc.addEventListener("input", update);
    update();
  }
});