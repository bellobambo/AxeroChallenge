// ==================== MAIN APPLICATION ====================
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname === "/") {
    window.location.replace("/dashboard");
  }
  // ==================== THEME SYSTEM ====================
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector("i");
  const body = document.body;

  // Theme Functions
  function enableDarkMode() {
    body.classList.add("dark-mode");
    if (themeIcon) {
      themeIcon.classList.replace("fa-moon", "fa-sun");
    }
    localStorage.setItem("theme", "dark");
    updateWidgetShadows();
  }

  function disableDarkMode() {
    body.classList.remove("dark-mode");
    if (themeIcon) {
      themeIcon.classList.replace("fa-sun", "fa-moon");
    }
    localStorage.setItem("theme", "light");
    updateWidgetShadows();
  }

  function updateWidgetShadows() {
    const widgets = document.querySelectorAll(".widget");
    widgets.forEach((widget) => {
      widget.style.boxShadow = body.classList.contains("dark-mode")
        ? "0 4px 10px rgba(0, 0, 0, 0.3)"
        : "0 4px 10px rgba(0, 0, 0, 0.1)";
    });
  }

  function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  }

  // ==================== CALENDAR SYSTEM ====================
  const calendarDays = document.getElementById("calender-days");
  const currentMonthElement = document.getElementById("current-month");
  let today = new Date();
  let displayedMonth = today.getMonth();
  let displayedYear = today.getFullYear();

  function renderCalendar(month, year) {
    if (!calendarDays || !currentMonthElement) return;

    const monthName = new Date(year, month).toLocaleString("default", {
      month: "long",
    });
    currentMonthElement.textContent = `${monthName} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    let day = 1;
    let html = `<table>
      <thead>
        <tr>
          <th>Sun</th><th>Mon</th><th>Tue</th>
          <th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
        </tr>
      </thead>
      <tbody>`;

    for (let row = 0; row < 6; row++) {
      html += "<tr>";
      for (let col = 0; col < 7; col++) {
        const cellIndex = row * 7 + col;
        if (cellIndex < firstDay) {
          html += `<td class="empty">${
            prevMonthDays - firstDay + cellIndex + 1
          }</td>`;
        } else if (day > daysInMonth) {
          html += `<td class="empty">${day - daysInMonth}</td>`;
          day++;
        } else {
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
          html += `<td class="${isToday ? "today" : ""}">${day}</td>`;
          day++;
        }
      }
      html += "</tr>";
    }

    html += "</tbody></table>";
    calendarDays.innerHTML = html;
  }

  // ==================== EVENT LISTENERS ====================
  function setupEventListeners() {
    // Theme Toggle
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        body.classList.contains("dark-mode")
          ? disableDarkMode()
          : enableDarkMode();
      });
    }

    // Calendar Navigation
    document.getElementById("prev-month")?.addEventListener("click", () => {
      displayedMonth--;
      if (displayedMonth < 0) {
        displayedMonth = 11;
        displayedYear--;
      }
      renderCalendar(displayedMonth, displayedYear);
    });

    document.getElementById("next-month")?.addEventListener("click", () => {
      displayedMonth++;
      if (displayedMonth > 11) {
        displayedMonth = 0;
        displayedYear++;
      }
      renderCalendar(displayedMonth, displayedYear);
    });

    // Navigation Items
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", function (e) {
        if (!this.href.startsWith("http") && !this.href.startsWith("mailto")) {
          e.preventDefault();
          document
            .querySelectorAll(".nav-item")
            .forEach((navItem) => navItem.classList.remove("active"));
          this.classList.add("active");
          window.location.href = this.getAttribute("href");
        }
      });
    });

    // Tabs
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".tab-btn")
          .forEach((b) => b.classList.remove("active"));
        document
          .querySelectorAll(".tab-content")
          .forEach((tab) => tab.classList.remove("active"));
        btn.classList.add("active");
        document
          .getElementById(`${btn.dataset.tab}-tab`)
          ?.classList.add("active");
      });
    });

    // Widget Hover Effects
    document.querySelectorAll(".widget").forEach((widget) => {
      widget.addEventListener("mouseenter", function () {
        this.style.boxShadow = "0 8px 20px rgba(114, 94, 84, 0.25)";
      });
      widget.addEventListener("mouseleave", function () {
        updateWidgetShadows();
      });
    });

    // Send Wish Alert
    document.querySelectorAll(".wish-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const employeeName = this.closest("tr").querySelector(
          ".employee-badge span"
        )?.textContent;
        alert(`🎉 Wish sent to ${employeeName || "employee"}!`);
      });
    });
  }

  // ==================== ANIMATIONS ====================
  function initializeAnimations() {
    // Employee Spotlight
    const spotlight = document.querySelector(".employee");
    if (spotlight) {
      spotlight.style.opacity = "0";
      spotlight.style.transform = "translateY(20px)";
      spotlight.style.transition = "all 0.5s ease";
      setTimeout(() => {
        spotlight.style.opacity = "1";
        spotlight.style.transform = "translateY(0)";
      }, 500);
    }

    // Animated Stats
    document.querySelectorAll(".stat-value").forEach((value, index) => {
      const originalValue = value.textContent;
      value.textContent = "0";
      setTimeout(() => {
        let counter = 0;
        const target = parseInt(originalValue);
        const interval = setInterval(() => {
          counter += Math.ceil(target / 25);
          if (counter >= target) {
            counter = target;
            clearInterval(interval);
          }
          value.textContent = counter;
        }, 50);
      }, 300 + index * 200);
    });
  }

  // ==================== INITIALIZATION ====================
  function initializeApp() {
    // Set active nav item based on current page
    const currentPath = window.location.pathname.toLowerCase();
    document.querySelectorAll(".nav-item").forEach((item) => {
      const href = item.getAttribute("href").toLowerCase();
      item.classList.toggle("active", currentPath.endsWith(href));
    });

    // Initialize systems
    initializeTheme();
    setupEventListeners();
    renderCalendar(displayedMonth, displayedYear);
    initializeAnimations();
  }

  // Start the application
  initializeApp();
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const closeBtn = document.getElementById("closeSidebar");
  const sidebar = document.querySelector(".sidebar");

  hamburgerBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open");
  });

  closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("open");
  });
});
