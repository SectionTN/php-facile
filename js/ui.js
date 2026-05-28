/* ============================================================
   ui.js — Helpers : highlight PHP, $, toast, thème, focus, copie
   ============================================================ */
(function () {
  // --- sélecteurs courts ---
  window.$  = (sel, ctx = document) => ctx.querySelector(sel);
  window.$$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  window.escapeHtml = esc;

  // Rendu HTML centralisé. Tout le HTML injecté provient des fichiers /data
  // (contenu de confiance) ou de saisies passées par escapeHtml() au préalable.
  // Un seul point d'entrée pour faciliter un éventuel passage à un sanitizer.
  window.setHTML = function (el, markup) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const frag = range.createContextualFragment(markup);
    el.replaceChildren(frag);
  };

  // ---------- COLORATION SYNTAXIQUE PHP (scanner) ----------
  const KEYWORDS = new Set([
    "if","else","elseif","while","for","foreach","do","switch","case","break","continue",
    "default","function","return","static","global","echo","print","include","include_once",
    "require","require_once","as","and","or","not","true","false","null","new","class",
    "public","private","protected","exit","die","array","list","endwhile","endforeach","use"
  ]);

  function spanFor(type, text) {
    const cls = {
      php:"tok-php", kw:"tok-kw", fn:"tok-fn", var:"tok-var",
      str:"tok-str", num:"tok-num", com:"tok-com", op:"tok-op"
    }[type];
    return cls ? `<span class="${cls}">${esc(text)}</span>` : esc(text);
  }

  function highlightPHP(src) {
    let i = 0, out = "";
    const n = src.length;
    const isIdStart = (c) => /[A-Za-z_]/.test(c);
    const isId = (c) => /[A-Za-z0-9_]/.test(c);

    while (i < n) {
      const c = src[i];

      // balises PHP
      if (c === "<" && src[i+1] === "?") {
        let j = i + 2;
        while (j < n && /[a-z=]/.test(src[j])) j++;
        out += spanFor("php", src.slice(i, j)); i = j; continue;
      }
      if (c === "?" && src[i+1] === ">") { out += spanFor("php", "?>"); i += 2; continue; }

      // commentaires
      if (c === "/" && src[i+1] === "/") { let j=i; while(j<n && src[j]!=="\n") j++; out += spanFor("com", src.slice(i,j)); i=j; continue; }
      if (c === "#") { let j=i; while(j<n && src[j]!=="\n") j++; out += spanFor("com", src.slice(i,j)); i=j; continue; }
      if (c === "/" && src[i+1] === "*") { let j=i+2; while(j<n && !(src[j]==="*"&&src[j+1]==="/")) j++; j=Math.min(n,j+2); out += spanFor("com", src.slice(i,j)); i=j; continue; }

      // chaînes
      if (c === '"' || c === "'") {
        let j=i+1; while(j<n){ if(src[j]==="\\"){j+=2;continue;} if(src[j]===c){j++;break;} j++; }
        out += spanFor("str", src.slice(i,j)); i=j; continue;
      }

      // variables
      if (c === "$") { let j=i+1; while(j<n && isId(src[j])) j++; out += spanFor("var", src.slice(i,j)); i=j; continue; }

      // nombres
      if (/[0-9]/.test(c)) { let j=i; while(j<n && /[0-9.]/.test(src[j])) j++; out += spanFor("num", src.slice(i,j)); i=j; continue; }

      // identifiants → keyword / fonction / texte
      if (isIdStart(c)) {
        let j=i; while(j<n && isId(src[j])) j++;
        const word = src.slice(i,j);
        let k=j; while(k<n && src[k]===" ") k++;
        if (KEYWORDS.has(word.toLowerCase())) out += spanFor("kw", word);
        else if (src[k] === "(") out += spanFor("fn", word);
        else out += esc(word);
        i=j; continue;
      }

      // opérateurs
      if (/[=!<>+\-*/.%&|?:]/.test(c)) {
        let j=i; while(j<n && /[=!<>+\-*/.%&|?:]/.test(src[j])) j++;
        out += spanFor("op", src.slice(i,j)); i=j; continue;
      }

      out += esc(c); i++;
    }
    return out;
  }
  window.highlightPHP = highlightPHP;

  // bloc de code complet (avec entête + copie)
  window.codeBlock = function (src, cap) {
    const html = highlightPHP(src);
    const capHtml = cap ? `<div class="code-head"><span class="lang">php — ${esc(cap)}</span><button class="copy-btn" data-copy>copier</button></div>`
                        : `<div class="code-head"><span class="lang">php</span><button class="copy-btn" data-copy>copier</button></div>`;
    return `<div class="code">${capHtml}<pre><code>${html}</code></pre></div>`;
  };

  // ---------- TOAST ----------
  let toastTimer;
  window.toast = function (msg) {
    const t = $("#toast");
    t.textContent = msg; t.hidden = false;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.classList.remove("show"); setTimeout(()=>t.hidden=true, 250); }, 1900);
  };

  // ---------- THÈME ----------
  window.applyTheme = function (theme) {
    document.documentElement.setAttribute("data-theme", theme);
    Store.theme(theme);
    const btn = $("#themeToggle");
    if (btn) btn.textContent = theme === "dark" ? "☀" : "☾";
  };
  window.toggleTheme = () => applyTheme(Store.theme() === "dark" ? "light" : "dark");

  // ---------- FOCUS ----------
  window.applyFocus = function (on) {
    document.body.classList.toggle("focus-mode", on);
    Store.focus(on);
  };
  window.toggleFocus = () => applyFocus(!Store.focus());

  // ---------- COPIE (délégation globale) ----------
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const code = btn.closest(".code").querySelector("code");
    const text = code.innerText;
    navigator.clipboard?.writeText(text).then(
      () => { btn.textContent = "copié ✓"; toast("Code copié !"); setTimeout(()=>btn.textContent="copier", 1400); },
      () => toast("Copie impossible")
    );
  });

  // ---------- progression mini (sidebar) ----------
  window.updateProgressMini = function () {
    const p = Store.globalProgress();
    const bar = $("#progMiniBar"), txt = $("#progMiniText");
    if (bar) bar.style.width = p + "%";
    if (txt) txt.textContent = p + "% du cours";
  };
})();
