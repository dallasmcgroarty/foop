// Diet Arena picker — pure navigation to the pre-generated static comparison
// page at /diets/arena/<slugA>-vs-<slugB>/. This never renders comparison
// content itself, so the static template stays the single source of truth.

let diets = [];
let selected1 = "";
let selected2 = "";

function renderSelect(which) {
  const el = document.getElementById(`arena-diet-${which}`);
  const otherSlug = which === 1 ? selected2 : selected1;
  const current = which === 1 ? selected1 : selected2;
  const options = diets.filter((d) => d.slug !== otherSlug);
  el.innerHTML =
    `<option value="">Select a diet…</option>` +
    options.map((d) => `<option value="${d.slug}">${d.name}</option>`).join("");
  el.value = current;
}

function updateVsLine() {
  const line = document.getElementById("arena-vs-line");
  const btn = document.getElementById("arena-compare-btn");
  const d1 = diets.find((d) => d.slug === selected1);
  const d2 = diets.find((d) => d.slug === selected2);

  if (d1 && d2) {
    line.textContent = `${d1.name} vs ${d2.name}`;
    btn.style.display = "";
  } else if (d1 || d2) {
    line.textContent = `${(d1 || d2).name} vs — pick a second diet`;
    btn.style.display = "none";
  } else {
    line.textContent = "Select two diets above to compare them.";
    btn.style.display = "none";
  }
}

window.arenaSetDiet = function (which, slug) {
  if (which === 1) selected1 = slug;
  else selected2 = slug;
  renderSelect(1);
  renderSelect(2);
  updateVsLine();
};

window.arenaGoCompare = function () {
  if (!selected1 || !selected2) return;
  const [a, b] = [selected1, selected2].sort();
  window.location.href = `/diets/arena/${a}-vs-${b}/`;
};

function init() {
  const dataEl = document.getElementById("arena-diets-data");
  diets = JSON.parse(dataEl.textContent);
  renderSelect(1);
  renderSelect(2);
  updateVsLine();
}

init();
