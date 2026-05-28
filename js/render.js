/* ============================================================
   render.js — Rendu de toutes les pages (SPA)
   window.RENDER.<route>(param) -> injecte dans #app
   ============================================================ */
(function () {
  const set = window.setHTML;
  const app = () => $("#app");

  const CALL_ICON = { tip:"💡", warn:"⚠️", danger:"🚫", exam:"🎓" };

  /* ---------- BLOCS DE COURS ---------- */
  function blockHTML(b) {
    switch (b.t) {
      case "h2": return `<h2>${b.x}</h2>`;
      case "h3": return `<h3>${b.x}</h3>`;
      case "p":  return `<p>${b.x}</p>`;
      case "analogy": return `<p class="analogy">🐘 ${b.x}</p>`;
      case "code": return window.codeBlock(b.x, b.cap);
      case "callout":
        return `<div class="callout ${b.kind}"><span class="c-ico">${CALL_ICON[b.kind]||"💡"}</span>
                <div><h4>${b.title||""}</h4><p>${b.x}</p></div></div>`;
      case "list": {
        const tag = b.ordered ? "ol" : "ul";
        return `<${tag}>${b.items.map(i=>`<li>${i}</li>`).join("")}</${tag}>`;
      }
      case "recap":
        return `<div class="recap"><h4>📌 À retenir</h4><ul>${b.items.map(i=>`<li>${i}</li>`).join("")}</ul></div>`;
      case "sim":
        return `<div class="sim"><p class="eyebrow">🧪 Teste toi-même</p><div data-sim="${b.id}"></div></div>`;
      default: return "";
    }
  }

  function chapterIndex(id){ return window.CHAPTERS.findIndex(c=>c.id===id); }

  /* ---------- ACCUEIL ---------- */
  function home() {
    const chaps = window.CHAPTERS;
    const prog = Store.globalProgress();
    const badges = Store.badges();
    const fnCount = (window.FUNCTIONS||[]).length;
    const qCount = (window.QUIZZES||[]).length;
    const exCount = (window.EXERCISES||[]).length;

    set(app(), `
      <section class="hero">
        <div class="hero-grid">
          <div>
            <p class="eyebrow">Développement côté serveur · ISET</p>
            <h1>Apprends <em>PHP</em> pour de vrai, sans prise de tête.</h1>
            <p class="hero-lead">Des explications humaines, des simulateurs qui montrent le code en action, des QCM et des fiches pour réviser vite et réussir tes examens.</p>
            <div class="btn-row">
              <a class="btn btn-primary" href="#/chapitre/bases" data-link>Commencer →</a>
              <a class="btn" href="#/derniere-heure" data-link>🔥 Réviser en urgence</a>
            </div>
            <div class="hero-stats">
              <div class="hero-stat"><b>${chaps.length}</b><span>chapitres</span></div>
              <div class="hero-stat"><b>${fnCount}</b><span>fonctions</span></div>
              <div class="hero-stat"><b>${qCount}+</b><span>QCM</span></div>
              <div class="hero-stat"><b>${exCount}</b><span>exercices</span></div>
            </div>
          </div>
          <div class="terminal">
            <div class="term-bar"><i></i><i></i><i></i><span>bienvenue.php</span></div>
            <div class="term-body"><span class="typed" id="termTyped"></span><span class="term-cursor"></span></div>
          </div>
        </div>
      </section>

      <div class="section-head"><h2>Ta progression</h2></div>
      <div class="ring-wrap" style="margin-bottom:22px">
        <div class="ring" style="--p:${prog}"><b>${prog}%</b></div>
        <div>
          <p style="margin:0"><strong>${Store.chaptersDoneCount()}</strong> chapitre(s) lus sur ${chaps.length}.</p>
          <p class="muted" style="margin:4px 0 0">Continue, chaque étape te rapproche de l'examen 💪</p>
        </div>
      </div>
      <div class="badges" style="margin-bottom:10px">
        ${badges.map(bd=>`<div class="badge ${bd.ok?"unlocked":""}"><span class="b-ico">${bd.ico}</span><div>${bd.title}<small>${bd.sub}</small></div></div>`).join("")}
      </div>

      <div class="section-head"><h2>Les chapitres</h2><p>Clique sur une carte pour plonger dedans. Tout est expliqué étape par étape.</p></div>
      <div class="grid grid-3">
        ${chaps.map(c=>{
          const done = Store.isChapterDone(c.id);
          const best = Store.quizBest(c.id);
          return `<a class="card chap-card" href="#/chapitre/${c.id}" data-link>
            <div class="num">${c.icon}</div>
            <h3>${c.title}</h3>
            <p class="desc">${c.subtitle}</p>
            <div class="card-bar"><span style="width:${done?100:(best||0)}%"></span></div>
            <div class="meta"><span>Chapitre ${c.num}</span>${done?'<span class="done">✓ Lu</span>':(best?`<span>QCM ${best}%</span>`:'<span>À découvrir</span>')}</div>
          </a>`;
        }).join("")}
      </div>

      <div class="section-head"><h2>Aller plus loin</h2></div>
      <div class="grid grid-3">
        ${quickCard("ƒ","Fonctions PHP","implode, explode, isset… toutes décortiquées.","#/fonctions")}
        ${quickCard("▶","Simulateurs","Vois le code s'exécuter en direct.","#/simulateurs")}
        ${quickCard("✎","Exercices","Du facile au type-examen, corrigés.","#/exercices")}
        ${quickCard("?","QCM","Teste tes connaissances chapitre par chapitre.","#/qcm")}
        ${quickCard("⚙","Mini-projets","Login, calculatrice, CRUD… commentés.","#/projets")}
        ${quickCard("⏱","Mode examen","Simulation chronométrée.","#/examen")}
      </div>`);

    typeTerminal();
  }

  function quickCard(ico, title, desc, href) {
    return `<a class="card chap-card" href="${href}" data-link>
      <div class="num" style="font-size:1.8rem">${ico}</div>
      <h3>${title}</h3><p class="desc">${desc}</p>
      <div class="meta"><span>Ouvrir</span><span>→</span></div></a>`;
  }

  function typeTerminal() {
    const target = $("#termTyped"); if (!target) return;
    const lines = [
      {t:`<?php\n`, c:"tok-php"},
      {t:`  $cours = "PHP";\n`},
      {t:`  $etudiant = "toi";\n\n`},
      {t:`  echo "Salut $etudiant,\n`},
      {t:`       prêt à dompter le $cours ?";\n`},
      {t:`?>`, c:"tok-php"}
    ];
    const full = lines.map(l=>l.t).join("");
    let i = 0;
    target.textContent = "";
    function step() {
      if (i > full.length) { reveal(); return; }
      target.textContent = full.slice(0, i);
      i += 2;
      setTimeout(step, 28);
    }
    function reveal() {
      set(target, window.highlightPHP(full) + `\n<span class="term-out">➜ Salut toi, prêt à dompter le PHP ?</span>`);
    }
    step();
  }

  /* ---------- CHAPITRE ---------- */
  function chapter(id) {
    const c = window.CHAPTERS.find(x=>x.id===id);
    if (!c) { notFound(); return; }
    const idx = chapterIndex(id);
    const prev = window.CHAPTERS[idx-1], next = window.CHAPTERS[idx+1];
    const fav = Store.isFav("chap:"+id);
    const note = Store.getNote(id);

    set(app(), `
      <article class="lesson">
        <div class="breadcrumb">Chapitre ${c.num} · Développement côté serveur</div>
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px">
          <h1>${c.icon} ${c.title}</h1>
          <button class="fav-btn ${fav?"on":""}" id="favBtn" title="Mettre en favori">${fav?"★":"☆"}</button>
        </div>
        <p class="hero-lead" style="font-size:1.1rem">${c.subtitle}</p>
        ${c.blocks.map(blockHTML).join("")}

        <div class="recap" style="border-style:solid;background:var(--surface)">
          <h4>📝 Tes notes perso</h4>
          <textarea class="notes-area" id="notes" placeholder="Écris ici tes astuces, ce que tu veux retenir…">${escapeHtml(note)}</textarea>
        </div>

        <div style="text-align:center;margin-top:26px">
          <button class="btn ${Store.isChapterDone(id)?"":"btn-primary"}" id="doneBtn">
            ${Store.isChapterDone(id)?"✓ Chapitre terminé":"Marquer comme terminé"}
          </button>
        </div>

        <div class="lesson-nav">
          ${prev?`<a class="btn btn-ghost" href="#/chapitre/${prev.id}" data-link>← ${prev.title}</a>`:`<span></span>`}
          ${next?`<a class="btn btn-ghost nx" href="#/chapitre/${next.id}" data-link>${next.title} →</a>`:`<a class="btn btn-ghost nx" href="#/qcm" data-link>Tester mes connaissances →</a>`}
        </div>
      </article>`);

    // monter les simulateurs
    $$("[data-sim]", app()).forEach(d => window.SIM.mount(d.dataset.sim, d));

    // favori
    $("#favBtn").onclick = (e) => {
      const on = Store.toggleFav("chap:"+id);
      e.target.textContent = on ? "★" : "☆";
      e.target.classList.toggle("on", on);
      toast(on ? "Ajouté aux favoris ★" : "Retiré des favoris");
    };
    // notes (sauvegarde auto)
    let nt; $("#notes").oninput = (e) => { clearTimeout(nt); nt = setTimeout(()=>Store.setNote(id, e.target.value), 400); };
    // terminé
    $("#doneBtn").onclick = (e) => {
      Store.markChapter(id); updateProgressMini();
      e.target.textContent = "✓ Chapitre terminé"; e.target.classList.remove("btn-primary");
      toast("Bravo ! Chapitre validé 🎉");
    };
    window.scrollTo(0,0);
  }

  /* ---------- FONCTIONS ---------- */
  function functions() {
    const fns = window.FUNCTIONS;
    const cats = ["Toutes", ...Array.from(new Set(fns.map(f=>f.cat)))];
    set(app(), `
      <p class="eyebrow">Référence</p>
      <h1>Les fonctions PHP essentielles</h1>
      <p class="hero-lead" style="font-size:1.1rem">Chaque fonction&nbsp;: à quoi elle sert, sa syntaxe, des exemples, les erreurs fréquentes et un mini-défi.</p>
      <div class="filters" id="fnFilters">${cats.map((c,i)=>`<button class="chip ${i===0?"on":""}" data-cat="${c}">${c}</button>`).join("")}</div>
      <div id="fnList">${fns.map(fnCard).join("")}</div>`);

    $$("#fnFilters .chip").forEach(chip => chip.onclick = () => {
      $$("#fnFilters .chip").forEach(c=>c.classList.remove("on")); chip.classList.add("on");
      const cat = chip.dataset.cat;
      $$("#fnList > details").forEach(d => { d.style.display = (cat==="Toutes"||d.dataset.cat===cat)?"":"none"; });
    });
    $$("#fnList .code").forEach(()=>{}); // code déjà coloré
  }

  function fnCard(f) {
    const ex = (f.ex||[]).map(e=>window.codeBlock(e.code) + (e.out?`<div class="sim-out">➜ ${escapeHtml(e.out)}</div>`:"")).join("");
    const errs = (f.errors||[]).map(x=>`<li>${x}</li>`).join("");
    const mini = (f.mini||[]).map(m=>`<div class="ex-solution"><div class="ex-statement"><b>Mini-défi :</b> ${m.q}</div>${window.codeBlock(m.a)}</div>`).join("");
    return `<details class="fn-card" data-cat="${f.cat}">
      <summary style="cursor:pointer;list-style:none;display:flex;align-items:center;gap:12px">
        <code class="inline-code" style="font-size:1rem">${f.name}()</code>
        <span class="muted" style="flex:1">${f.short}</span>
        <span class="tag">${f.cat}</span>
      </summary>
      <div class="fn-sig">${escapeHtml(f.sig)}</div>
      <p>${f.desc}</p>
      ${ex}
      ${errs?`<div class="callout danger"><span class="c-ico">🚫</span><div><h4>Erreurs fréquentes</h4><ul style="margin:6px 0 0">${errs}</ul></div></div>`:""}
      ${f.compare?`<div class="callout tip"><span class="c-ico">🔁</span><div><h4>À comparer</h4><p>${f.compare}</p></div></div>`:""}
      ${mini}
    </details>`;
  }

  /* ---------- SIMULATEURS ---------- */
  function simulators() {
    const sims = [
      {id:"condition", t:"Conditions (if / elseif / else)", d:"Change $a et $b, vois quelle branche s'exécute."},
      {id:"loop",      t:"Boucles (for)", d:"Règle début, fin et pas, lance et observe chaque itération."},
      {id:"implode",   t:"explode ↔ implode", d:"Casse une chaîne en tableau, puis recolle-la."},
      {id:"array",     t:"Tableaux & foreach", d:"Visualise les indices et le parcours élément par élément."}
    ];
    set(app(), `
      <p class="eyebrow">Interactif</p>
      <h1>Simulateurs PHP</h1>
      <p class="hero-lead" style="font-size:1.1rem">Le meilleur moyen de comprendre, c'est de jouer avec. Modifie les valeurs et regarde le code «&nbsp;s'exécuter&nbsp;» en direct.</p>
      ${sims.map(s=>`<div class="sim"><h3>${s.t}</h3><p class="sim-desc">${s.d}</p><div data-sim="${s.id}"></div></div>`).join("")}`);
    $$("[data-sim]", app()).forEach(d => window.SIM.mount(d.dataset.sim, d));
  }

  /* ---------- EXERCICES ---------- */
  function exercises() {
    const ex = window.EXERCISES;
    const levels = ["tous","facile","moyen","difficile","examen"];
    set(app(), `
      <p class="eyebrow">Pratique</p>
      <h1>Exercices corrigés</h1>
      <p class="hero-lead" style="font-size:1.1rem">Essaie d'abord seul, puis déplie la correction&nbsp;: tu y trouveras le code <em>et</em> la méthode de réflexion.</p>
      <div class="filters" id="exFilters">${levels.map((l,i)=>`<button class="chip ${i===0?"on":""}" data-lvl="${l}">${l[0].toUpperCase()+l.slice(1)}</button>`).join("")}</div>
      <div id="exList">${ex.map(exCard).join("")}</div>`);
    $$("#exFilters .chip").forEach(chip => chip.onclick = () => {
      $$("#exFilters .chip").forEach(c=>c.classList.remove("on")); chip.classList.add("on");
      const lvl = chip.dataset.lvl;
      $$("#exList > .ex-card").forEach(d => d.style.display = (lvl==="tous"||d.dataset.lvl===lvl)?"":"none");
    });
  }

  function exCard(e) {
    const chap = window.CHAPTERS.find(c=>c.id===e.chap);
    return `<div class="ex-card" data-lvl="${e.level}">
      <div class="ex-head">
        <span class="tag ${e.level}">${e.level}</span>
        <span class="muted">${chap?chap.icon+" "+chap.title:""}</span>
        <h3 style="margin:0;flex-basis:100%">${e.title}</h3>
      </div>
      <p class="ex-statement">${e.statement}</p>
      <details>
        <summary class="btn btn-sm reveal-btn" style="display:inline-flex">Voir la correction</summary>
        <div class="ex-solution">
          <h4>✓ Solution</h4>
          ${window.codeBlock(e.solution)}
          <p class="ex-method"><b>Méthode :</b> ${e.method}</p>
        </div>
      </details>
    </div>`;
  }

  /* ---------- QCM ---------- */
  function qcm() {
    const chaps = window.CHAPTERS;
    set(app(), `
      <p class="eyebrow">Évaluation</p>
      <h1>QCM par chapitre</h1>
      <p class="hero-lead" style="font-size:1.1rem">Questions mélangées, corrections expliquées, score à la fin. Idéal pour repérer ce qu'il faut réviser.</p>
      <div class="grid grid-3" id="qcmGrid">
        <a class="card chap-card" href="#/qcm/all" data-link style="border-color:var(--primary)">
          <div class="num">🎲</div><h3>Tout mélangé</h3>
          <p class="desc">Un mix de tous les chapitres pour t'auto-évaluer globalement.</p>
          <div class="meta"><span>Lancer</span><span>→</span></div>
        </a>
        ${chaps.map(c=>{
          const n = window.QUIZZES.filter(q=>q.chap===c.id).length;
          const best = Store.quizBest(c.id);
          return `<a class="card chap-card" href="#/qcm/${c.id}" data-link>
            <div class="num">${c.icon}</div><h3>${c.title}</h3>
            <p class="desc">${n} question(s)</p>
            <div class="meta"><span>Lancer le QCM</span>${best?`<span class="done">★ ${best}%</span>`:"<span>→</span>"}</div>
          </a>`;
        }).join("")}
      </div>`);
  }

  function qcmRun(chap) {
    let questions, title, chapId = chap;
    if (chap === "all") { questions = Quiz.shuffle(window.QUIZZES).slice(0, 15); title = "Tout mélangé"; }
    else {
      const c = window.CHAPTERS.find(x=>x.id===chap);
      if (!c) { notFound(); return; }
      questions = window.QUIZZES.filter(q=>q.chap===chap);
      title = c.title;
    }
    if (!questions.length) { set(app(), "<p>Aucune question pour ce chapitre.</p>"); return; }
    set(app(), `<p class="eyebrow"><a href="#/qcm" data-link>← Tous les QCM</a></p><h1 style="margin-bottom:20px">QCM · ${title}</h1><div id="quizHost"></div>`);
    Quiz.run($("#quizHost"), {
      questions, backHref:"#/qcm",
      onFinish:(pct)=>{ if (chapId!=="all") { Store.setQuizBest(chapId, pct); updateProgressMini(); } if (pct===100) toast("💯 Sans-faute !"); }
    });
  }

  /* ---------- PROJETS ---------- */
  function projects() {
    set(app(), `
      <p class="eyebrow">Mise en pratique</p>
      <h1>Mini-projets PHP</h1>
      <p class="hero-lead" style="font-size:1.1rem">Des projets complets et commentés qui combinent tout ce que tu as appris. Lis l'architecture, comprends le code, refais-le.</p>
      ${window.PROJECTS.map(projCard).join("")}`);
  }

  function projCard(p) {
    return `<div class="ex-card">
      <div class="ex-head">
        <span style="font-size:1.6rem">${p.icon}</span>
        <h3 style="margin:0">${p.title}</h3>
        <span class="tag ${p.level}">${p.level}</span>
      </div>
      <p>${p.desc}</p>
      <p class="muted" style="font-size:.86rem"><b>Notions :</b> ${p.concepts.join(" · ")}</p>
      <details>
        <summary class="btn btn-sm reveal-btn" style="display:inline-flex">Voir le projet complet</summary>
        <div class="ex-solution">
          <h4 style="color:var(--accent)">Architecture</h4>
          <ul>${p.archi.map(a=>`<li>${a}</li>`).join("")}</ul>
          <h4 style="color:var(--mint)">Code commenté</h4>
          ${window.codeBlock(p.code)}
          <p class="ex-method">${p.notes}</p>
        </div>
      </details>
    </div>`;
  }

  /* ---------- FICHES ---------- */
  function fiches() {
    set(app(), `
      <p class="eyebrow">Révision express</p>
      <h1>Fiches de révision</h1>
      <p class="hero-lead" style="font-size:1.1rem">L'essentiel condensé, chapitre par chapitre. Parfait pour un dernier coup d'œil.</p>
      ${window.FICHES.map(f=>`<div class="fiche">
        <h3>${f.title}</h3>
        <table><tbody>${f.rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</tbody></table>
      </div>`).join("")}`);
  }

  /* ---------- DERNIÈRE HEURE ---------- */
  function flash() {
    set(app(), `
      <p class="eyebrow">Dernière heure avant l'examen</p>
      <h1>🔥 Le condensé d'urgence</h1>
      <p class="hero-lead" style="font-size:1.1rem">Plus le temps de tout relire&nbsp;? Voici uniquement ce qui rapporte des points et ce qui fait perdre des points.</p>
      ${window.FLASH.map(sec=>`<div class="fiche flash">
        <h3>${sec.t}</h3>
        <ul style="margin:0">${sec.items.map(i=>`<li style="margin:8px 0">${i}</li>`).join("")}</ul>
      </div>`).join("")}
      <div class="btn-row" style="justify-content:center;margin-top:24px">
        <a class="btn btn-accent" href="#/examen" data-link>Je me teste maintenant ⏱</a>
      </div>`);
  }

  /* ---------- EXAMEN ---------- */
  function examen() { window.ExamMode.render(app()); }

  /* ---------- 404 ---------- */
  function notFound() {
    set(app(), `<div style="text-align:center;padding:60px 0">
      <h1>🐘 Oups…</h1><p>Cette page n'existe pas (encore).</p>
      <a class="btn btn-primary" href="#/accueil" data-link>Retour à l'accueil</a></div>`);
  }

  window.RENDER = { home, chapter, functions, simulators, exercises, qcm, qcmRun, projects, fiches, flash, examen, notFound };
})();
