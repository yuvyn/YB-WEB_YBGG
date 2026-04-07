/* =============================================
   YB.GG — Main Script
   ============================================= */

(function () {
  "use strict";

  /* ─────────────────────────────────────────
     드롭다운
  ───────────────────────────────────────── */

  const dropdowns = document.querySelectorAll(".dropdown");

  function closeAll(except) {
    dropdowns.forEach((d) => {
      if (d !== except) d.classList.remove("open");
    });
  }

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".nav-btn, .lang-btn");
    if (!trigger) return;

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = !dropdown.classList.contains("open");
      closeAll();
      if (willOpen) dropdown.classList.add("open");

      // aria-expanded 업데이트
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });

  document.addEventListener("click", () => {
    closeAll();
    dropdowns.forEach((d) => {
      const trigger = d.querySelector(".nav-btn, .lang-btn");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  });

  // 키보드 접근성: Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });

  /* ─────────────────────────────────────────
     게임 드롭다운 → 섹션 스크롤
  ───────────────────────────────────────── */

  const gameItems = document.querySelectorAll("#gameDropdown .dropdown-menu li");

  gameItems.forEach((item) => {
    item.addEventListener("click", () => {
      const target = item.getAttribute("data-link");
      if (!target) return;

      const section = document.querySelector(target);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      // 드롭다운 닫기
      const dropdown = item.closest(".dropdown");
      if (dropdown) dropdown.classList.remove("open");
    });
  });

  /* ─────────────────────────────────────────
     언어 선택
  ───────────────────────────────────────── */

  const langItems = document.querySelectorAll("#langDropdown .dropdown-menu li");
  const langText = document.querySelector("#langDropdown .lang-text");

  langItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (langText) {
        // 이모지 제거하고 텍스트만 추출
        const rawText = item.textContent.trim();
        const cleanText = rawText.replace(/^[\p{Emoji}\s]+/u, "").trim();
        langText.textContent = cleanText;
      }

      const selectedLang = item.getAttribute("data-lang");
      console.log("선택 언어:", selectedLang);
      // TODO: 실제 다국어 처리 로직 연결
    });
  });

  /* ─────────────────────────────────────────
     서브네비 활성화 (스크롤 기반)
  ───────────────────────────────────────── */

  const snavLinks = document.querySelectorAll(".snav-link");
  const sections = [];

  snavLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#") && href !== "#") {
      const section = document.querySelector(href);
      if (section) sections.push({ el: section, link });
    }
  });

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;

    let current = null;
    sections.forEach(({ el, link }) => {
      if (el.offsetTop <= scrollY) current = link;
    });

    snavLinks.forEach((l) => l.classList.remove("active"));
    if (current) {
      current.classList.add("active");
    } else {
      // 최상단이면 "메인" 활성화
      const mainLink = document.querySelector(".snav-link[href='#']");
      if (mainLink) mainLink.classList.add("active");
    }
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });

  /* ─────────────────────────────────────────
     상담 모달 (FAB)
  ───────────────────────────────────────── */

  const chatBtn   = document.getElementById("chatBtn");
  const chatModal = document.getElementById("chatModal");
  const chatClose = document.getElementById("chatClose");

  function openModal() {
    chatModal.classList.add("show");
    chatModal.setAttribute("aria-hidden", "false");
    chatBtn.setAttribute("aria-expanded", "true");

    // 약간 지연 후 textarea 포커스
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

  chatBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    chatModal.classList.contains("show") ? closeModal() : openModal();
  });

  chatClose.addEventListener("click", closeModal);

  document.addEventListener("click", (e) => {
    if (
      chatModal.classList.contains("show") &&
      !chatModal.contains(e.target) &&
      !chatBtn.contains(e.target)
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatModal.classList.contains("show")) {
      closeModal();
    }
  });

  // 문의 보내기 버튼
  const sendBtn = chatModal.querySelector(".btn-primary");
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
      // TODO: 실제 API 연동
      sendBtn.textContent = "전송되었습니다 ✓";
      sendBtn.style.background = "#22c55e";
      setTimeout(() => {
        ta.value = "";
        sendBtn.textContent = "문의 보내기";
        sendBtn.style.background = "";
        closeModal();
      }, 1800);
    });
  }

  /* ─────────────────────────────────────────
     게임 카드 hover 효과 (터치 지원)
  ───────────────────────────────────────── */

  const gameCards = document.querySelectorAll(".game-card");

  gameCards.forEach((card) => {
    card.addEventListener("touchstart", () => {
      card.style.transform = "translateY(-3px)";
    }, { passive: true });

    card.addEventListener("touchend", () => {
      card.style.transform = "";
    }, { passive: true });
  });

})();