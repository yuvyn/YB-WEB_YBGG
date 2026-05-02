/* =============================================
   YB.GG — Lost Ark Mobile Page Script
   ============================================= */

(function () {
  "use strict";

  /* 드롭다운 */
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

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".hdr-btn");
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = !dropdown.classList.contains("open");
      closeAll();
      if (willOpen) { dropdown.classList.add("open"); btn.setAttribute("aria-expanded","true"); }
    });
  });

  document.addEventListener("click", () => closeAll());
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });

  /* 검색 */
  const searchInput = document.querySelector(".header-search input");
  const searchBtn   = document.querySelector(".search-btn");

  function doSearch() {
    const q = searchInput ? searchInput.value.trim() : "";
    if (!q) return;
    console.log("검색:", q);
    // TODO: API 연결
  }

  if (searchBtn) searchBtn.addEventListener("click", doSearch);
  if (searchInput) searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });

  /* 정렬 토글 */
  const toggleBtn = document.querySelector(".toggle-btn");
  const orders = ["최신순", "인기순", "조회순"];
  let orderIdx = 0;

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      orderIdx = (orderIdx + 1) % orders.length;
      toggleBtn.textContent = orders[orderIdx];
      // TODO: 실제 정렬 로직
    });
  }

  /* 상담 모달 */
  const chatBtn   = document.getElementById("chatBtn");
  const chatModal = document.getElementById("chatModal");
  const chatClose = document.getElementById("chatClose");

  function openModal() {
    chatModal.classList.add("show");
    chatModal.setAttribute("aria-hidden","false");
    chatBtn.setAttribute("aria-expanded","true");
    setTimeout(() => { const ta = chatModal.querySelector("textarea"); if (ta) ta.focus(); }, 240);
  }

  function closeModal() {
    chatModal.classList.remove("show");
    chatModal.setAttribute("aria-hidden","true");
    chatBtn.setAttribute("aria-expanded","false");
  }

  if (chatBtn) chatBtn.addEventListener("click", (e) => { e.stopPropagation(); chatModal.classList.contains("show") ? closeModal() : openModal(); });
  if (chatClose) chatClose.addEventListener("click", closeModal);

  document.addEventListener("click", (e) => {
    if (chatModal && chatModal.classList.contains("show") && !chatModal.contains(e.target) && !chatBtn.contains(e.target)) closeModal();
  });

  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && chatModal && chatModal.classList.contains("show")) closeModal(); });

  const sendBtn = chatModal ? chatModal.querySelector(".btn-primary") : null;
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const ta = chatModal.querySelector("textarea");
      if (!ta || !ta.value.trim()) {
        ta.focus(); ta.style.borderColor="#f87171"; ta.style.boxShadow="0 0 0 3px rgba(239,68,68,0.1)";
        setTimeout(() => { ta.style.borderColor=""; ta.style.boxShadow=""; }, 1200);
        return;
      }
      const orig = sendBtn.textContent;
      sendBtn.textContent = "전송되었습니다 ✓"; sendBtn.style.background = "#22c55e";
      setTimeout(() => { ta.value=""; sendBtn.textContent=orig; sendBtn.style.background=""; closeModal(); }, 1800);
    });
  }

})();