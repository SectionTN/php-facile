/* ============================================================
   simulators.js — Démonstrations interactives (simule PHP en JS)
   window.SIM.mount(id, element)
   Contenu : code de confiance + saisies passées par escapeHtml().
   ============================================================ */
(function () {
  const esc = window.escapeHtml;
  const hl  = window.highlightPHP;
  const set = window.setHTML;

  const builders = {

    /* ---------- CONDITIONS ---------- */
    condition(el) {
      set(el, `
        <div class="sim-row">
          <div class="sim-field"><label>$a</label><input class="sim-input" id="condA" type="number" value="10"></div>
          <div class="sim-field"><label>$b</label><input class="sim-input" id="condB" type="number" value="11"></div>
        </div>
        <div class="sim-code" id="condCode"></div>
        <div class="sim-out" id="condOut"></div>`);
      const a = $("#condA", el), b = $("#condB", el), code = $("#condCode", el), out = $("#condOut", el);
      function run() {
        const va = Number(a.value), vb = Number(b.value);
        let branch, res;
        if (va > vb)        { branch = 1; res = "a est plus grand que b"; }
        else if (va === vb) { branch = 2; res = "a est égal à b"; }
        else                { branch = 3; res = "a est inférieur à b"; }
        const mark = (i) => branch === i ? '  <span class="tok-num">// ✓ exécuté</span>' : '';
        set(code,
          hl(`if ($a > $b) {`) + mark(1) + hl(`\n  echo "a est plus grand que b";\n} elseif ($a == $b) {`) + mark(2) +
          hl(`\n  echo "a est égal à b";\n} else {`) + mark(3) + hl(`\n  echo "a est inférieur à b";\n}`));
        out.textContent = "➜ " + res;
      }
      a.oninput = b.oninput = run; run();
    },

    /* ---------- BOUCLES ---------- */
    loop(el) {
      set(el, `
        <div class="sim-row">
          <div class="sim-field"><label>Début</label><input class="sim-input" id="lpStart" type="number" value="1"></div>
          <div class="sim-field"><label>Fin (≤)</label><input class="sim-input" id="lpEnd" type="number" value="5"></div>
          <div class="sim-field"><label>Pas (+)</label><input class="sim-input" id="lpStep" type="number" value="1"></div>
        </div>
        <div class="sim-code" id="lpCode"></div>
        <button class="btn btn-primary btn-sm" id="lpRun">▶ Lancer la boucle</button>
        <div class="iter-log" id="lpLog" style="margin-top:14px"></div>`);
      const s = $("#lpStart", el), e = $("#lpEnd", el), st = $("#lpStep", el), code = $("#lpCode", el), log = $("#lpLog", el);
      function refresh() {
        set(code, hl(`for ($i = ${Number(s.value)||0}; $i <= ${Number(e.value)||0}; $i += ${Number(st.value)||1}) {\n  echo $i;\n}`));
      }
      function play() {
        refresh();
        const start = Number(s.value), end = Number(e.value), step = Number(st.value) || 1;
        set(log, ""); let count = 0;
        if (step <= 0) { set(log, '<div class="hl">⚠ Pas ≤ 0 : boucle infinie évitée !</div>'); return; }
        for (let i = start; i <= end && count < 200; i += step, count++) {
          const line = document.createElement("div");
          line.style.animationDelay = (count * 0.06) + "s";
          set(line, `Tour ${count + 1} → <span class="hl">$i = ${i}</span>`);
          log.appendChild(line);
        }
        const done = document.createElement("div");
        done.style.animationDelay = (count * 0.06) + "s";
        set(done, `<span class="tok-str">✓ ${count} tour(s), condition fausse → sortie</span>`);
        log.appendChild(done);
      }
      s.oninput = e.oninput = st.oninput = refresh;
      $("#lpRun", el).onclick = play; refresh();
    },

    /* ---------- IMPLODE / EXPLODE ---------- */
    implode(el) {
      set(el, `
        <div class="sim-row">
          <div class="sim-field"><label>Chaîne de départ</label><input class="sim-input" id="imTxt" value="a,b,c,d"></div>
          <div class="sim-field"><label>Séparateur (explode)</label><input class="sim-input" id="imSep" value=","></div>
        </div>
        <div class="sim-code" id="imExpCode"></div>
        <p class="muted" style="margin:4px 0 6px;font-size:.84rem">Tableau obtenu :</p>
        <div class="arr-viz" id="imViz"></div>
        <div class="sim-field"><label>Recoller (implode) avec</label><input class="sim-input" id="imJoin" value="-"></div>
        <div class="sim-code" id="imJoinCode"></div>
        <div class="sim-out" id="imOut"></div>`);
      const txt = $("#imTxt", el), sep = $("#imSep", el), join = $("#imJoin", el);
      function run() {
        const s = sep.value || ",";
        const parts = txt.value.split(s);
        set($("#imExpCode", el), hl(`$tab = explode("${s}", "${txt.value}");`));
        set($("#imViz", el), parts.map((p, i) =>
          `<div class="arr-cell" style="animation-delay:${i*0.05}s"><div class="idx">${i}</div><div class="val">${esc(p) || "∅"}</div></div>`).join(""));
        const j = join.value;
        set($("#imJoinCode", el), hl(`$resultat = implode("${j}", $tab);`));
        $("#imOut", el).textContent = "➜ " + parts.join(j);
      }
      txt.oninput = sep.oninput = join.oninput = run; run();
    },

    /* ---------- TABLEAUX + FOREACH ---------- */
    array(el) {
      set(el, `
        <div class="sim-field"><label>Valeurs (séparées par des virgules)</label>
          <input class="sim-input" id="arVals" value="pomme, kiwi, mangue, fraise"></div>
        <div class="arr-viz" id="arViz"></div>
        <div class="sim-code">${hl('foreach ($fruits as $i => $valeur) {\n  echo "$i : $valeur";\n}')}</div>
        <button class="btn btn-primary btn-sm" id="arRun">▶ Parcourir avec foreach</button>
        <div class="iter-log" id="arLog" style="margin-top:14px"></div>`);
      const vals = $("#arVals", el);
      function cells() {
        const arr = vals.value.split(",").map(s => s.trim()).filter(Boolean);
        set($("#arViz", el), arr.map((v, i) =>
          `<div class="arr-cell" data-i="${i}" style="animation-delay:${i*0.05}s"><div class="idx">${i}</div><div class="val">${esc(v)}</div></div>`).join(""));
        return arr;
      }
      function play() {
        const arr = cells(); const log = $("#arLog", el); set(log, "");
        const cellEls = $$(".arr-cell", el);
        arr.forEach((v, i) => {
          setTimeout(() => {
            cellEls.forEach(c => c.classList.remove("active"));
            if (cellEls[i]) cellEls[i].classList.add("active");
            const line = document.createElement("div");
            set(line, `<span class="hl">$i = ${i}</span> → $valeur = "${esc(v)}"`);
            log.appendChild(line);
            if (i === arr.length - 1) setTimeout(() => cellEls.forEach(c => c.classList.remove("active")), 500);
          }, i * 420);
        });
      }
      vals.oninput = cells;
      $("#arRun", el).onclick = play; cells();
    }
  };

  window.SIM = {
    mount(id, el) { builders[id] ? builders[id](el) : (el.textContent = "Simulateur indisponible."); },
    list: () => Object.keys(builders)
  };
})();
