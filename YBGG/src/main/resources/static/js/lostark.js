/* =============================================
   YB.GG — Lost Ark Page Script
   ============================================= */

(function () {
  "use strict";

  /* ─────────────────────────────────────────
     헤더 드롭다운
  ───────────────────────────────────────── */

  const dropdowns = document.querySelectorAll(".hdr-dropdown");

  function closeAllDropdowns(except) {
    dropdowns.forEach((d) => {
      if (d !== except) {
        d.classList.remove("open");
        const btn = d.querySelector(".hdr-btn");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".hdr-btn");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = !dropdown.classList.contains("open");
      closeAllDropdowns();
      if (willOpen) {
        dropdown.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", () => closeAllDropdowns());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });

  /* ─────────────────────────────────────────
     언어 선택
  ───────────────────────────────────────── */

  const langItems = document.querySelectorAll("#langMenu .hdr-menu li");
  const gameMenuBtn = document.querySelector("#langMenu .hdr-btn");

  langItems.forEach((item) => {
    item.addEventListener("click", () => {
      const lang = item.getAttribute("data-lang");
      const rawText = item.textContent.trim();
      // 이모지 뒤 텍스트만 추출
      const cleanText = rawText.replace(/^[\p{Emoji}\s]+/u, "").trim();
      if (gameMenuBtn) {
        gameMenuBtn.childNodes[0].textContent = "🌐 " + cleanText + " ";
      }
      console.log("선택 언어:", lang);
      // TODO: 실제 다국어 로직
    });
  });

  /* ─────────────────────────────────────────
     게임 탭 네비 — 요일 탭
  ───────────────────────────────────────── */

  const dayTabs = document.querySelectorAll(".day-tab");

  dayTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      dayTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  /* ─────────────────────────────────────────
     지난 일정 숨김 토글
  ───────────────────────────────────────── */

  const toggleBtn = document.querySelector(".toggle-btn");
  let scheduleHidden = false;

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      scheduleHidden = !scheduleHidden;
      toggleBtn.textContent = scheduleHidden ? "지난 일정 보기" : "지난 일정 숨김";
      // TODO: 실제 일정 데이터 필터링 로직 연결
    });
  }

  /* ─────────────────────────────────────────
     검색 입력
  ───────────────────────────────────────── */

  const searchInput = document.querySelector(".header-search input");
  const searchBtn = document.querySelector(".search-btn");

  function doSearch() {
    const query = searchInput ? searchInput.value.trim() : "";
    if (!query) return;
    console.log("검색:", query);
    // TODO: 실제 검색 API 연결
  }

  if (searchBtn) searchBtn.addEventListener("click", doSearch);

  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") doSearch();
    });
  }

  /* ─────────────────────────────────────────
     상담 모달
  ───────────────────────────────────────── */

  const chatBtn   = document.getElementById("chatBtn");
  const chatModal = document.getElementById("chatModal");
  const chatClose = document.getElementById("chatClose");

  function openModal() {
    chatModal.classList.add("show");
    chatModal.setAttribute("aria-hidden", "false");
    chatBtn.setAttribute("aria-expanded", "true");
    setTimeout(() => {
      const ta = chatModal.querySelector("textarea");
      if (ta) ta.focus();
    }, 240);
  }

  function closeModal() {
    chatModal.classList.remove("show");
    chatModal.setAttribute("aria-hidden", "true");
    chatBtn.setAttribute("aria-expanded", "false");
  }

  if (chatBtn) {
    chatBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      chatModal.classList.contains("show") ? closeModal() : openModal();
    });
  }

  if (chatClose) chatClose.addEventListener("click", closeModal);

  document.addEventListener("click", (e) => {
    if (
      chatModal &&
      chatModal.classList.contains("show") &&
      !chatModal.contains(e.target) &&
      !chatBtn.contains(e.target)
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatModal && chatModal.classList.contains("show")) {
      closeModal();
    }
  });

  // 문의 보내기
  const sendBtn = chatModal ? chatModal.querySelector(".btn-primary") : null;
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const ta = chatModal.querySelector("textarea");
      if (!ta || !ta.value.trim()) {
        ta.focus();
        ta.style.borderColor = "#f87171";
        ta.style.boxShadow = "0 0 0 3px rgba(239,68,68,0.1)";
        setTimeout(() => {
          ta.style.borderColor = "";
          ta.style.boxShadow = "";
        }, 1200);
        return;
      }
      const orig = sendBtn.textContent;
      sendBtn.textContent = "전송되었습니다 ✓";
      sendBtn.style.background = "#22c55e";
      setTimeout(() => {
        ta.value = "";
        sendBtn.textContent = orig;
        sendBtn.style.background = "";
        closeModal();
      }, 1800);
    });
  }

})();