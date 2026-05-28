/* ============================================================
   quiz.js — Moteur de QCM (réutilisé par la page QCM et l'examen)
   Quiz.run(container, {questions, title, timedSec, onFinish})
   ============================================================ */
(function () {
  const set = window.setHTML;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Mélange les options en conservant l'index correct
  function prepare(q) {
    const opts = q.opts.map((text, i) => ({ text, correct: i === q.correct }));
    const mixed = shuffle(opts);
    return { q: q.q, explain: q.explain, opts: mixed, correctIdx: mixed.findIndex(o => o.correct) };
  }

  function run(container, cfg) {
    const questions = cfg.questions.map(prepare);
    let idx = 0, score = 0;
    const wrongs = [];
    let timer = null, remaining = cfg.timedSec || 0;

    function frame(inner) {
      const pct = Math.round((idx / questions.length) * 100);
      set(container, `
        <div class="quiz">
          <div class="quiz-top">
            <div class="quiz-prog">
              <div class="bar"><span style="width:${pct}%"></span></div>
              <small class="muted">Question ${Math.min(idx + 1, questions.length)} / ${questions.length}</small>
            </div>
            ${cfg.timedSec ? `<div class="quiz-timer" id="qTimer">--:--</div>` : ``}
          </div>
          <div id="qBody">${inner}</div>
        </div>`);
      if (cfg.timedSec) paintTimer();
    }

    function paintTimer() {
      const t = $("#qTimer", container); if (!t) return;
      const m = String(Math.floor(remaining / 60)).padStart(2, "0");
      const s = String(remaining % 60).padStart(2, "0");
      t.textContent = `${m}:${s}`;
      t.classList.toggle("low", remaining <= 15);
    }

    function startTimer() {
      if (!cfg.timedSec) return;
      timer = setInterval(() => {
        remaining--; paintTimer();
        if (remaining <= 0) { clearInterval(timer); finish(); }
      }, 1000);
    }

    function question() {
      const item = questions[idx];
      const opts = item.opts.map((o, i) =>
        `<div class="opt" data-i="${i}"><span class="mark">${String.fromCharCode(65 + i)}</span><span>${o.text}</span></div>`).join("");
      frame(`
        <div class="q-card">
          <div class="q-num">QUESTION ${idx + 1}</div>
          <div class="q-text">${item.q}</div>
          <div id="opts">${opts}</div>
          <div class="q-explain" id="explain" hidden></div>
          <div style="margin-top:18px;text-align:right">
            <button class="btn btn-primary" id="nextBtn" hidden>${idx + 1 < questions.length ? "Suivant →" : "Voir mon score"}</button>
          </div>
        </div>`);
      $$(".opt", container).forEach(opt => {
        opt.onclick = () => choose(Number(opt.dataset.i), item);
      });
    }

    function choose(i, item) {
      $$(".opt", container).forEach(o => o.classList.add("disabled"));
      const chosen = $$(".opt", container)[i];
      const correctEl = $$(".opt", container)[item.correctIdx];
      correctEl.classList.add("correct");
      if (i === item.correctIdx) { score++; }
      else { chosen.classList.add("wrong"); wrongs.push(item); }
      const ex = $("#explain", container);
      set(ex, `<b>${i === item.correctIdx ? "✓ Bonne réponse !" : "✗ Pas tout à fait."}</b> ${item.explain}`);
      ex.hidden = false; ex.classList.add("show");
      const nb = $("#nextBtn", container);
      nb.hidden = false;
      nb.onclick = () => { idx++; idx < questions.length ? question() : finish(); };
    }

    function finish() {
      if (timer) clearInterval(timer);
      const pct = Math.round((score / questions.length) * 100);
      const msg = pct === 100 ? "Parfait ! 🐘" : pct >= 80 ? "Excellent !" : pct >= 50 ? "Pas mal, continue !" : "Il faut réviser un peu 💪";
      const review = wrongs.length ? `
        <h3 style="margin:30px 0 10px">À revoir (${wrongs.length})</h3>
        ${wrongs.map(w => `<div class="q-explain show" style="margin:10px 0">
            <div style="margin-bottom:6px">${w.q}</div>
            <b>Bonne réponse :</b> ${w.opts[w.correctIdx].text}<br>
            <span class="muted">${w.explain}</span>
          </div>`).join("")}` : `<p class="muted" style="text-align:center">Aucune erreur, chapeau ! 🎉</p>`;
      set(container, `
        <div class="quiz">
          <div class="score-hero">
            <div class="big">${pct}%</div>
            <div class="msg serif">${msg}</div>
            <p class="muted">${score} bonne(s) réponse(s) sur ${questions.length}</p>
          </div>
          ${review}
          <div class="btn-row" style="justify-content:center;margin-top:24px">
            <button class="btn btn-primary" id="retry">↻ Recommencer</button>
            ${cfg.backHref ? `<a class="btn" href="${cfg.backHref}" data-link>← Retour</a>` : ``}
          </div>
        </div>`);
      $("#retry", container).onclick = () => run(container, cfg);
      if (cfg.onFinish) cfg.onFinish(pct, score, questions.length);
    }

    question();
    startTimer();
  }

  window.Quiz = { run, shuffle };
})();
