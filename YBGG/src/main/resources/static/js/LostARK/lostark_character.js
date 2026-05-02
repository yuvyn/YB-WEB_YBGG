document.addEventListener("DOMContentLoaded", function () {
    const tabs   = document.querySelectorAll(".char-tab");
    const panels = document.querySelectorAll(".char-panel");

    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            tabs.forEach(t   => t.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));

            tab.classList.add("active");
            const target = document.getElementById("panel-" + tab.dataset.target);
            if (target) target.classList.add("active");
        });
    });
});