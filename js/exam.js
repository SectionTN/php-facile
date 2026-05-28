/* ============================================================
   exam.js — Mode examen : QCM mélangés de tous les chapitres,
   chronométré, score final enregistré.
   ExamMode.render(container)
   ============================================================ */
(function () {
  const set = window.setHTML;

  function render(container) {
    set(container, `
      <div class="lesson" style="max-width:680px;margin-inline:auto">
        <p class="eyebrow">Simulation</p>
        <h1>Mode examen ⏱</h1>
        <p>On reproduit les conditions du jour J&nbsp;: des questions mélangées de <strong>tous les chapitres</strong>, un chrono qui tourne, et une correction détaillée à la fin. Choisis ton format&nbsp;:</p>

        <div class="grid grid-3" style="margin-top:24px">
          ${cardFmt("flash", "Flash", "10 questions", "5 min", 10, 300)}
          ${cardFmt("std", "Standard", "20 questions", "12 min", 20, 720)}
          ${cardFmt("marathon", "Marathon", "30 questions", "20 min", 30, 1200)}
        </div>

        <div class="callout exam" style="margin-top:26px">
          <span class="c-ico">💡</span>
          <div><h4>Conseil</h4><p>Ne reste pas bloqué sur une question. Réponds vite, la correction t'expliquera tout à la fin. Meilleur score&nbsp;: <strong>${Store.get().examBest}%</strong>.</p></div>
        </div>
      </div>`);

    $$("[data-exam]", container).forEach(btn => {
      btn.onclick = () => {
        const count = Number(btn.dataset.count);
        const secs = Number(btn.dataset.secs);
        startExam(container, count, secs);
      };
    });
  }

  function cardFmt(id, name, q, time, count, secs) {
    return `<button class="card" data-exam="${id}" data-count="${count}" data-secs="${secs}" style="cursor:pointer;text-align:left">
      <h3 style="margin-bottom:6px">${name}</h3>
      <p class="muted" style="font-size:.88rem;margin:0">${q}<br>⏱ ${time}</p>
    </button>`;
  }

  function startExam(container, count, secs) {
    const pool = Quiz.shuffle(window.QUIZZES).slice(0, count);
    Quiz.run(container, {
      questions: pool,
      timedSec: secs,
      backHref: "#/examen",
      onFinish: (pct) => {
        Store.setExamBest(pct);
        updateProgressMini();
        if (pct >= 80) toast("🏆 Badge « Prêt pour l'examen » débloqué !");
      }
    });
  }

  window.ExamMode = { render };
})();
