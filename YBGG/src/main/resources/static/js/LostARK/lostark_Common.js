/* =============================================
   YB.GG — common.js  (Thymeleaf 환경용)
   fetch 없음 — 헤더/푸터는 Thymeleaf fragment가 처리
   이 파일은 헤더 인터랙션만 담당합니다.

   각 페이지 </body> 직전에:
     <script th:src="@{/js/common.js}"></script>
   ============================================= */

(function () {
  "use strict";

  const ACCENT = {
    "lostark": {
      accent:     "#5b5cf6",
      accentDark: "#4a4bcf",
      accentBg:   "#ededff",
      accentText: "#3730b3",
    },
    "lostark-mobile": {
      accent:     "#0ea5e9",
      accentDark: "#0284c7",
      accentBg:   "#e0f2fe",
      accentText: "#075985",
    },
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyAccent();
    bindDropdowns();
    bindLang();
    bindSearch();
  });

  function applyAccent() {
    const header  = document.querySelector(".header");
    const gameKey = header ? header.dataset.game : null;
    if (!gameKey || !ACCENT[gameKey]) return;
    const cfg  = ACCENT[gameKey];
    const root = document.documentElement;
    root.style.setProperty("--accent",      cfg.accent);
    root.style.setProperty("--accent-dark", cfg.accentDark);
    root.style.setProperty("--accent-bg",   cfg.accentBg);
    root.style.setProperty("--accent-text", cfg.accentText);
    const dot = document.querySelector(".chip-dot");
    if (dot) dot.style.background = cfg.accent;
  }

  function bindDropdowns() {
    const dropdowns = document.querySelectorAll(".hdr-dropdown");
    function closeAll(except) {
      dropdowns.forEach(function (d) {
        if (d !== except) {
          d.classList.remove("open");
          const btn = d.querySelector(".hdr-btn");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });
    }
    dropdowns.forEach(function (dd) {
      const btn = dd.querySelector(".hdr-btn");
      if (!btn) return;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const willOpen = !dd.classList.contains("open");
        closeAll();
        if (willOpen) {
          dd.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
    document.addEventListener("click", function () { closeAll(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll();
    });
  }

  function bindLang() {
    const items   = document.querySelectorAll("#hdrLangMenu .hdr-menu li");
    const langBtn = document.querySelector("#hdrLangMenu .hdr-btn");
    items.forEach(function (item) {
      item.addEventListener("click", function () {
        const raw   = item.textContent.trim();
        const clean = raw.replace(/^[\p{Emoji}\s]+/u, "").trim();
        const span  = langBtn ? langBtn.querySelector(".lang-text") : null;
        if (span) span.textContent = clean;
        document.documentElement.lang = item.dataset.lang || "ko";
      });
    });
  }

  function bindSearch() {
    const input = document.getElementById("headerSearchInput");
    const btn = document.getElementById("headerSearchBtn");
    const header = document.querySelector(".header");

    function doSearch() {
      const q = input ? input.value.trim() : "";
      if (!q) {
        alert("캐릭터명을 입력해주세요.");
        if (input) input.focus();
        return;
      }

      const gameKey = header ? (header.dataset.game || "") : "";

      if (gameKey === "lostark" || gameKey === "lostark-mobile") {
        window.location.href = "/lostark/character/" + encodeURIComponent(q);
      } else {
        window.location.href = "/search?q=" + encodeURIComponent(q);
      }
    }

    if (btn) {
      btn.addEventListener("click", doSearch);
    }

    if (input) {
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          doSearch();
        }
      });
    }
  }

})();