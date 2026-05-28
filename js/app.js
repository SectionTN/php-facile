/* ============================================================
   app.js — Routeur SPA, recherche globale, raccourcis, démarrage
   ============================================================ */
(function () {
  const set = window.setHTML;

  /* ---------------- ROUTEUR ---------------- */
  function route() {
    const hash = location.hash.replace(/^#\/?/, "");
    const [page, param] = hash.split("/");
    const R = window.RENDER;
    switch (page) {
      case "": case "accueil":   R.home(); break;
      case "chapitre":           R.chapter(param); break;
      case "fonctions":          R.functions(); break;
      case "simulateurs":        R.simulators(); break;
      case "exercices":          R.exercises(); break;
      case "qcm":                param ? R.qcmRun(param) : R.qcm(); break;
      case "projets":            R.projects(); break;
      case "fiches":             R.fiches(); break;
      case "derniere-heure":     R.flash(); break;
      case "examen":             R.examen(); break;
      default:                   R.notFound();
    }
    setActiveNav(page, param);
    document.body.classList.remove("nav-open");
  }

  function setActiveNav(page, param) {
    const current = "#/" + (page || "accueil") + (param ? "/" + param : "");
    $$(".nav-item").forEach(a => {
      const href = a.getAttribute("href");
      a.classList.toggle("active", href === current || (page === "chapitre" && href === "#/chapitre/" + param));
    });
    // surligne aussi la racine d'une section
    if (page) $$(".nav-item").forEach(a => {
      if (a.getAttribute("href") === "#/" + page) a.classList.add("active");
    });
  }

  /* ---------------- RECHERCHE ---------------- */
  let searchIndex = [];
  function buildIndex() {
    const idx = [];
    (window.CHAPTERS||[]).forEach(c => idx.push({ kind:"Chapitre", label:c.title, sub:c.subtitle, href:"#/chapitre/"+c.id, key:c.title+" "+c.subtitle }));
    (window.FUNCTIONS||[]).forEach(f => idx.push({ kind:"Fonction", label:f.name+"()", sub:f.short, href:"#/fonctions", key:f.name+" "+f.short+" "+f.cat }));
    (window.EXERCISES||[]).forEach(e => idx.push({ kind:"Exercice", label:e.title, sub:e.statement, href:"#/exercices", key:e.title+" "+e.statement }));
    (window.PROJECTS||[]).forEach(p => idx.push({ kind:"Projet", label:p.title, sub:p.desc, href:"#/projets", key:p.title+" "+p.desc+" "+p.concepts.join(" ") }));
    [["Fiches de révision","#/fiches","réviser résumé"],["Dernière heure","#/derniere-heure","examen urgence flash"],
     ["Mode examen","#/examen","chrono simulation"],["Simulateurs","#/simulateurs","interactif"],["QCM","#/qcm","quiz test"]]
      .forEach(p => idx.push({ kind:"Page", label:p[0], sub:p[2], href:p[1], key:p[0]+" "+p[2] }));
    searchIndex = idx;
  }

  let selIdx = 0, results = [];
  function openSearch() {
    const m = $("#searchModal"); m.hidden = false;
    const inp = $("#searchInput"); inp.value = ""; inp.focus();
    renderResults("");
  }
  function closeSearch() { $("#searchModal").hidden = true; }

  function renderResults(q) {
    q = q.trim().toLowerCase();
    results = q ? searchIndex.filter(i => i.key.toLowerCase().includes(q)).slice(0, 8)
                : searchIndex.filter(i => i.kind === "Chapitre").slice(0, 6);
    selIdx = 0;
    const host = $("#searchResults");
    if (!results.length) { set(host, `<div class="sr-item"><span class="muted">Aucun résultat pour «&nbsp;${escapeHtml(q)}&nbsp;»</span></div>`); return; }
    set(host, results.map((r, i) =>
      `<div class="sr-item ${i===0?"sel":""}" data-href="${r.href}" data-i="${i}">
        <div><b>${escapeHtml(r.label)}</b><br><span class="muted" style="font-size:.82rem">${escapeHtml((r.sub||"").slice(0,70))}</span></div>
        <span class="sr-kind">${r.kind}</span></div>`).join(""));
    $$(".sr-item", host).forEach(it => {
      if (!it.dataset.href) return;
      it.onclick = () => go(it.dataset.href);
      it.onmouseenter = () => { selIdx = Number(it.dataset.i); highlightSel(); };
    });
  }
  function highlightSel() { $$(".sr-item").forEach((it,i)=>it.classList.toggle("sel", i===selIdx)); }
  function go(href) { closeSearch(); location.hash = href.replace(/^#/, ""); }

  /* ---------------- RACCOURCIS CLAVIER ---------------- */
  function keys(e) {
    const inField = /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName);
    if (!$("#searchModal").hidden) {
      if (e.key === "Escape") closeSearch();
      else if (e.key === "ArrowDown") { e.preventDefault(); selIdx = Math.min(selIdx+1, results.length-1); highlightSel(); }
      else if (e.key === "ArrowUp")   { e.preventDefault(); selIdx = Math.max(selIdx-1, 0); highlightSel(); }
      else if (e.key === "Enter" && results[selIdx]) go(results[selIdx].href);
      return;
    }
    if (inField) return;
    if (e.key === "/") { e.preventDefault(); openSearch(); }
    else if (e.key.toLowerCase() === "t") toggleTheme();
    else if (e.key.toLowerCase() === "f") toggleFocus();
  }

  /* ---------------- DÉMARRAGE ---------------- */
  function boot() {
    applyTheme(Store.theme());
    applyFocus(Store.focus());
    buildIndex();
    updateProgressMini();

    // topbar
    $("#themeToggle").onclick = toggleTheme;
    $("#focusToggle").onclick = toggleFocus;
    $("#searchTrigger").onclick = openSearch;
    $("#navToggle").onclick = () => document.body.classList.toggle("nav-open");
    $("#navClose").onclick = () => document.body.classList.remove("nav-open");
    $("#searchInput").oninput = (e) => renderResults(e.target.value);
    $$("[data-close-search]").forEach(el => el.onclick = closeSearch);
    document.addEventListener("keydown", keys);

    // overlay nav mobile
    const ov = document.createElement("div");
    ov.className = "nav-overlay";
    ov.onclick = () => document.body.classList.remove("nav-open");
    document.body.appendChild(ov);

    window.addEventListener("hashchange", route);
    if (!location.hash) location.hash = "#/accueil";
    route();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
