/**
 * GRADUATION INVITATION APPLICATION LOGIC
 * Tạ Thị Nga • 2026
 * 100% Static Client-Side JavaScript
 */

(function () {
  'use strict';

  // --- 1. THEME CONTROLLER (DARK / LIGHT) ---
  const THEME_STORAGE_KEY = 'nga_invitation_theme';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Fallback: system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark'; // Dark luxury default
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
    }
  }

  function initTheme() {
    const initialTheme = getPreferredTheme();
    applyTheme(initialTheme);

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      });
    }

    // Listen to OS theme changes if user has not manually overridden
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          applyTheme(e.matches ? 'light' : 'dark');
        }
      });
    }
  }

  // --- 2. CONFIGURATION LOADER ---
  function populateConfigData() {
    if (typeof window.GRADUATION_CONFIG === 'undefined') {
      console.warn('GRADUATION_CONFIG not found in js/config.js');
      return;
    }
    const cfg = window.GRADUATION_CONFIG;

    // Graduate Info
    setText('cfg-name', cfg.graduate.name);
    setText('cfg-title', cfg.graduate.title);
    setText('cfg-quote', cfg.graduate.quote);
    setText('cfg-tag', cfg.graduate.ceremonyTag);
    setText('cfg-year', cfg.graduate.academicYear);
    setText('cfg-signature', cfg.graduate.signatureText);

    // Event Info
    setText('cfg-date', cfg.eventTime.displayDate);
    setText('cfg-time', cfg.eventTime.displayTime);
    setText('cfg-institution', cfg.venue.institution);
    setText('cfg-hall', cfg.venue.hall);
    setText('cfg-address', cfg.venue.address);

    // RSVP & Map Links
    const rsvpBtn = document.getElementById('btn-rsvp');
    if (rsvpBtn && cfg.rsvp.formUrl) {
      rsvpBtn.href = cfg.rsvp.formUrl;
      rsvpBtn.target = '_blank';
      rsvpBtn.rel = 'noopener noreferrer';
    }

    const mapBtn = document.getElementById('btn-map');
    if (mapBtn && cfg.venue.mapUrl) {
      mapBtn.href = cfg.venue.mapUrl;
      mapBtn.target = '_blank';
      mapBtn.rel = 'noopener noreferrer';
    }

    // Polaroid Captions
    setText('cfg-polaroid-caption', cfg.memoryCard.photoCaption);
    setText('cfg-polaroid-sub', cfg.memoryCard.subtext);

    // Contact
    setText('cfg-contact-phone', cfg.contact.phone);
    setText('cfg-contact-note', cfg.contact.note);
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && text) {
      el.textContent = text;
    }
  }

  // --- 3. PERSONALIZED GUEST LOADER ---
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  async function loadPersonalizedGuest() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestId = urlParams.get('guest');

    const greetingContainer = document.getElementById('guest-greeting-text');
    const messageContainer = document.getElementById('guest-message-text');
    const guestBadge = document.getElementById('guest-badge-text');

    const cfg = window.GRADUATION_CONFIG || {};
    const fallback = cfg.fallbackGuest || {
      greeting: "Bạn thân mến",
      message: "Hôm nay có thể chỉ là một ngày tốt nghiệp, nhưng sẽ ý nghĩa hơn rất nhiều nếu có bạn cùng Nga lưu lại khoảnh khắc đáng nhớ này."
    };

    if (!guestId) {
      // No guest parameter: display fallback
      renderGuest(fallback.greeting, fallback.message, false);
      return;
    }

    try {
      // Relative fetch compatible with GitHub Pages and local server
      const response = await fetch('./guests.json');
      if (!response.ok) {
        throw new Error('Could not fetch guests.json: ' + response.status);
      }
      const guests = await response.json();
      
      const foundGuest = guests.find(g => g.id && g.id.toLowerCase() === guestId.toLowerCase().trim());

      if (foundGuest) {
        renderGuest(foundGuest.name, foundGuest.message, true);
        document.title = `Thiệp Mời Tốt Nghiệp • ${cfg.graduate?.name || 'Tạ Thị Nga'} | Gửi ${foundGuest.name}`;
      } else {
        // ID not in list: fallback gracefully
        renderGuest(fallback.greeting, fallback.message, false);
      }
    } catch (err) {
      console.warn('Lỗi khi nạp guests.json, sử dụng nội dung mặc định:', err);
      renderGuest(fallback.greeting, fallback.message, false);
    }

    function renderGuest(name, message, isPersonalized) {
      if (greetingContainer) {
        greetingContainer.innerHTML = `Hẹn gặp bạn nhé, <span class="guest-name-highlight">${escapeHTML(name)}</span>`;
      }
      if (messageContainer) {
        messageContainer.innerHTML = `"${escapeHTML(message)}"`;
      }
      if (guestBadge) {
        guestBadge.textContent = isPersonalized ? "THIỆP MỜI DÀNH RIÊNG CHO BẠN" : "LỜI NHẮN GỬI YÊU THƯƠNG";
      }
    }
  }

  // --- 4. REALTIME COUNTDOWN TIMER ---
  function initCountdown() {
    const cfg = window.GRADUATION_CONFIG;
    if (!cfg || !cfg.eventTime || !cfg.eventTime.targetDate) return;

    const targetTime = new Date(cfg.eventTime.targetDate).getTime();
    if (isNaN(targetTime)) return;

    const daysEl = document.getElementById('timer-days');
    const hoursEl = document.getElementById('timer-hours');
    const minsEl = document.getElementById('timer-mins');
    const secsEl = document.getElementById('timer-secs');
    const timerContainer = document.getElementById('countdown-timer');
    const completedContainer = document.getElementById('countdown-completed');

    function updateTimer() {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        if (timerContainer) timerContainer.style.display = 'none';
        if (completedContainer) {
          completedContainer.style.display = 'block';
          completedContainer.textContent = 'Khoảnh khắc lễ tốt nghiệp đang diễn ra. Cảm ơn bạn đã đồng hành cùng Nga!';
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // --- 5. ADD TO CALENDAR (GOOGLE CALENDAR & .ICS) ---
  function initCalendarActions() {
    const calendarBtn = document.getElementById('btn-calendar');
    if (!calendarBtn) return;

    calendarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const cfg = window.GRADUATION_CONFIG;
      if (!cfg) return;

      const startDate = new Date(cfg.eventTime.targetDate);
      const endDate = new Date(startDate.getTime() + (cfg.eventTime.durationHours || 3) * 3600 * 1000);

      // Format ISO string to YYYYMMDDTHHmmssZ
      function toICSFormat(d) {
        return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      }

      const startICS = toICSFormat(startDate);
      const endICS = toICSFormat(endDate);
      const title = `Lễ Tốt Nghiệp • ${cfg.graduate.name}`;
      const location = `${cfg.venue.hall}, ${cfg.venue.institution}, ${cfg.venue.address}`;
      const details = `${cfg.graduate.quote}\n\nLiên hệ: ${cfg.contact.phone}`;

      // Open Google Calendar event creation URL
      const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startICS}/${endICS}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;

      // Direct download .ics for iOS Apple Calendar & Outlook
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Graduation Invitation//Ta Thi Nga//VI',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `DTSTART:${startICS}`,
        `DTEND:${endICS}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${details.replace(/\n/g, '\\n')}`,
        `LOCATION:${location}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      // Create downloadable blob
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const icsUrl = URL.createObjectURL(blob);

      // Offer choice or trigger Google Calendar + trigger ICS
      const isAppleOrMobile = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
      if (isAppleOrMobile) {
        const tempLink = document.createElement('a');
        tempLink.href = icsUrl;
        tempLink.setAttribute('download', `Le-Tot-Nghiep-${cfg.graduate.name.replace(/\s+/g, '-')}.ics`);
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        showToast('Đã tải lịch .ics về thiết bị của bạn!');
      } else {
        window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
      }
    });
  }

  // --- 6. COPY LINK & TOAST NOTIFICATION ---
  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${escapeHTML(message)}</span>
    `;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function initCopyLink() {
    const copyBtns = document.querySelectorAll('.js-copy-link');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const currentUrl = window.location.href;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(currentUrl);
          } else {
            // Fallback for non-https local dev
            const textArea = document.createElement('textarea');
            textArea.value = currentUrl;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
          }
          showToast('Đã sao chép liên kết thiệp mời!');
        } catch (err) {
          console.error('Không thể sao chép liên kết:', err);
          showToast('Vui lòng copy thủ công trên thanh địa chỉ');
        }
      });
    });
  }

  // --- INITIALIZE ALL MODULES ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    populateConfigData();
    loadPersonalizedGuest();
    initCountdown();
    initCalendarActions();
    initCopyLink();
  });

})();
