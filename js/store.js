/* ============================================================
   store.js — Persistance locale (localStorage)
   Progression, scores QCM, favoris, notes, thème, badges.
   ============================================================ */
(function () {
  const KEY = "phpfacile.v1";

  const defaults = {
    theme: "dark",
    focus: false,
    chaptersDone: {},   // {id: true}
    quizBest: {},       // {chap: percent}
    examBest: 0,        // meilleur % examen
    quizDone: 0,        // nb de QCM terminés
    favorites: {},      // {key: true}
    notes: {},          // {chapId: texte}
    seenBadges: {}      // {badgeId: true}
  };

  let state;
  try {
    state = Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY)) || {});
  } catch (e) {
    state = Object.assign({}, defaults);
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  const Store = {
    get: () => state,

    // --- Thème / focus ---
    theme: (v) => { if (v !== undefined) { state.theme = v; save(); } return state.theme; },
    focus: (v) => { if (v !== undefined) { state.focus = v; save(); } return state.focus; },

    // --- Chapitres ---
    markChapter(id) { state.chaptersDone[id] = true; save(); },
    isChapterDone: (id) => !!state.chaptersDone[id],
    chaptersDoneCount: () => Object.keys(state.chaptersDone).length,

    // --- QCM ---
    setQuizBest(chap, percent) {
      if (!state.quizBest[chap] || percent > state.quizBest[chap]) state.quizBest[chap] = percent;
      state.quizDone++;
      save();
    },
    quizBest: (chap) => state.quizBest[chap] || 0,

    setExamBest(p) { if (p > state.examBest) { state.examBest = p; save(); } },

    // --- Favoris ---
    toggleFav(key) { state.favorites[key] ? delete state.favorites[key] : (state.favorites[key] = true); save(); return !!state.favorites[key]; },
    isFav: (key) => !!state.favorites[key],
    favList: () => Object.keys(state.favorites),

    // --- Notes ---
    setNote(chap, txt) { state.notes[chap] = txt; save(); },
    getNote: (chap) => state.notes[chap] || "",

    // --- Progression globale (chapitres + qcm) ---
    globalProgress() {
      const totalChap = (window.CHAPTERS || []).length;
      const chapPart = totalChap ? Store.chaptersDoneCount() / totalChap : 0;
      const quizPart = totalChap ? Object.keys(state.quizBest).length / totalChap : 0;
      return Math.round((chapPart * 0.6 + quizPart * 0.4) * 100);
    },

    // --- Badges ---
    badges() {
      const done = Store.chaptersDoneCount();
      const quizChaps = Object.keys(state.quizBest).length;
      const perfect = Object.values(state.quizBest).filter(p => p === 100).length;
      return [
        { id:"first",   ico:"🐣", title:"Premiers pas",        sub:"Lire 1 chapitre",          ok: done >= 1 },
        { id:"half",    ico:"⚡", title:"Sur la lancée",        sub:"4 chapitres lus",          ok: done >= 4 },
        { id:"scholar", ico:"🎓", title:"Érudit PHP",           sub:"Tous les chapitres lus",   ok: done >= (window.CHAPTERS||[]).length },
        { id:"quizzer", ico:"🎯", title:"Quiz master",          sub:"5 QCM tentés",             ok: state.quizDone >= 5 },
        { id:"perfect", ico:"💯", title:"Sans-faute",           sub:"Un 100% à un QCM",         ok: perfect >= 1 },
        { id:"exam",    ico:"🏆", title:"Prêt pour l'examen",   sub:"≥ 80% au mode examen",     ok: state.examBest >= 80 }
      ];
    },

    reset() { state = Object.assign({}, defaults); save(); }
  };

  window.Store = Store;
})();
