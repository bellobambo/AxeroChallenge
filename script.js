// DOM Elements
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  enableDarkMode();
}

// Theme toggle event
themeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

// Enable dark mode
function enableDarkMode() {
  body.classList.add("dark-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
  localStorage.setItem("theme", "dark");
}

// Disable dark mode
function disableDarkMode() {
  body.classList.remove("dark-mode");
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
  localStorage.setItem("theme", "light");
}

// Widget animations
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effect to widgets
  const widgets = document.querySelectorAll(".widget");
  widgets.forEach((widget) => {
    widget.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 8px 20px rgba(114, 94, 84, 0.25)";
    });

    widget.addEventListener("mouseleave", function () {
      this.style.boxShadow = body.classList.contains("dark-mode")
        ? "0 4px 10px rgba(0, 0, 0, 0.3)"
        : "0 4px 10px rgba(0, 0, 0, 0.1)";
    });
  });

  // Employee spotlight animation
  const spotlight = document.querySelector(".employee");
  spotlight.style.opacity = "0";
  spotlight.style.transform = "translateY(20px)";
  spotlight.style.transition = "all 0.5s ease";

  setTimeout(() => {
    spotlight.style.opacity = "1";
    spotlight.style.transform = "translateY(0)";
  }, 500);

  // Simulate dynamic stats
  const statValues = document.querySelectorAll(".stat-value");
  statValues.forEach((value, index) => {
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
});

// Add this to your existing script.js

// Navigation functionality
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    // Remove active class from all nav items
    document.querySelectorAll(".nav-item").forEach((navItem) => {
      navItem.classList.remove("active");
    });

    // Add active class to clicked nav item
    this.classList.add("active");

    // Hide all pages
    document.querySelectorAll(".page").forEach((page) => {
      page.style.display = "none";
    });

    // Show the corresponding page
    const pageId =
      this.querySelector("i").className.replace("fas fa-", "") + "-page";
    document.getElementById(pageId).style.display = "block";

    // Special case for dashboard
    if (this.querySelector("i").classList.contains("fa-home")) {
      document.querySelector(".main-content").style.display = "block";
      document.getElementById("pages").style.display = "none";
    } else {
      document.querySelector(".main-content").style.display = "none";
      document.getElementById("pages").style.display = "block";
    }
  });
});

// Caledender

const calendarDays = document.getElementById("calendar-days");
const currentMonth = document.getElementById("current-month");

let today = new Date();
let displayedMonth = today.getMonth();
let displayedYear = today.getFullYear();

function renderCalendar(month, year) {
  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });
  currentMonth.textContent = `${monthName} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonthDays = new Date(year, month, 0).getDate();
  const totalCells = 42; // 7 days x 6 weeks

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

document.getElementById("prev-month").addEventListener("click", () => {
  displayedMonth--;
  if (displayedMonth < 0) {
    displayedMonth = 11;
    displayedYear--;
  }
  renderCalendar(displayedMonth, displayedYear);
});

document.getElementById("next-month").addEventListener("click", () => {
  displayedMonth++;
  if (displayedMonth > 11) {
    displayedMonth = 0;
    displayedYear++;
  }
  renderCalendar(displayedMonth, displayedYear);
});

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

renderCalendar(displayedMonth, displayedYear);

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((tab) => tab.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(`${btn.dataset.tab}-tab`).classList.add("active");
  });
});
