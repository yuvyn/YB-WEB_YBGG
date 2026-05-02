/* =============================================
   YB.GG — Lost Ark Community Script
   ============================================= */

(function () {
  "use strict";

  /* ── 드롭다운 ── */
  const dropdowns = document.querySelectorAll(".hdr-dropdown");

  function closeAll(except) {
    dropdowns.forEach((d) => {
      if (d !== except) {
        d.classList.remove("open");
        const btn = d.querySelector(".hdr-btn");
        if (btn) btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  dropdowns.forEach((dd) => {
    const btn = dd.querySelector(".hdr-btn");
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = !dd.classList.contains("open");
      closeAll();
      if (willOpen) { dd.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
    });
  });

  document.addEventListener("click", () => closeAll());
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });

  /* ── 검색 ── */
  const searchInput = document.querySelector(".header-search input");
  const searchBtn   = document.querySelector(".search-btn");

  function doSearch() {
    const q = searchInput ? searchInput.value.trim() : "";
    if (!q) return;
    console.log("검색:", q);
  }

  if (searchBtn) searchBtn.addEventListener("click", doSearch);
  if (searchInput) searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });

  /* ── 커뮤니티 탭 ── */
  const ctabs = document.querySelectorAll(".ctab");
  ctabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      ctabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      // TODO: 탭별 콘텐츠 전환
    });
  });

  /* ── 포인트 퀘스트 탭 ── */
  const qtabs = document.querySelectorAll(".qtab");
  qtabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      qtabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  /* ── 라이브 카드 스크롤 ── */
  const liveScrollBtn = document.getElementById("liveScrollRight");
  const liveCards     = document.querySelector(".live-cards");

  if (liveScrollBtn && liveCards) {
    liveScrollBtn.addEventListener("click", () => {
      liveCards.scrollBy({ left: 400, behavior: "smooth" });
    });
    // 스크롤 끝에서 처음으로 리셋
    liveCards.addEventListener("scroll", () => {
      const atEnd = liveCards.scrollLeft + liveCards.clientWidth >= liveCards.scrollWidth - 10;
      if (atEnd) {
        setTimeout(() => liveCards.scrollTo({ left: 0, behavior: "smooth" }), 600);
      }
    });
  }

  /* ── 챔피언 스크롤 ── */
  const champScrollBtn = document.getElementById("champScrollRight");
  const champCards     = document.querySelector(".champ-cards");

  if (champScrollBtn && champCards) {
    champScrollBtn.addEventListener("click", () => {
      champCards.scrollBy({ left: 300, behavior: "smooth" });
    });
  }

  /* ── 공유 버튼 ── */
  const shareBtn = document.querySelector(".share-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      try {
        if (navigator.share) {
          await navigator.share({ title: "YB.GG 로스트아크 커뮤니티", url: window.location.href });
        } else {
          await navigator.clipboard.writeText(window.location.href);
          const orig = shareBtn.innerHTML;
          shareBtn.textContent = "링크 복사됨 ✓";
          setTimeout(() => { shareBtn.innerHTML = orig; }, 1500);
        }
      } catch (e) { /* 취소 */ }
    });
  }

  /* ── 상담 모달 ── */
  const chatBtn   = document.getElementById("chatBtn");
  const chatModal = document.getElementById("chatModal");
  const chatClose = document.getElementById("chatClose");

  function openModal() {
    chatModal.classList.add("show");
    chatModal.setAttribute("aria-hidden", "false");
    chatBtn.setAttribute("aria-expanded", "true");
    setTimeout(() => { const ta = chatModal.querySelector("textarea"); if (ta) ta.focus(); }, 240);
  }

  function closeModal() {
    chatModal.classList.remove("show");
    chatModal.setAttribute("aria-hidden", "true");
    chatBtn.setAttribute("aria-expanded", "false");
  }

  if (chatBtn) chatBtn.addEventListener("click", (e) => { e.stopPropagation(); chatModal.classList.contains("show") ? closeModal() : openModal(); });
  if (chatClose) chatClose.addEventListener("click", closeModal);
  document.addEventListener("click", (e) => {
    if (chatModal && chatModal.classList.contains("show") && !chatModal.contains(e.target) && chatBtn && !chatBtn.contains(e.target)) closeModal();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && chatModal && chatModal.classList.contains("show")) closeModal(); });

  const sendBtn = chatModal ? chatModal.querySelector(".btn-primary") : null;
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const ta = chatModal.querySelector("textarea");
      if (!ta || !ta.value.trim()) {
        ta.focus(); ta.style.borderColor = "#f87171"; ta.style.boxShadow = "0 0 0 3px rgba(239,68,68,0.1)";
        setTimeout(() => { ta.style.borderColor = ""; ta.style.boxShadow = ""; }, 1200);
        return;
      }
      const orig = sendBtn.textContent;
      sendBtn.textContent = "전송되었습니다 ✓"; sendBtn.style.background = "#22c55e";
      setTimeout(() => { ta.value = ""; sendBtn.textContent = orig; sendBtn.style.background = ""; closeModal(); }, 1800);
    });
  }

})();