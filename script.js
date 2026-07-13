/* =========================================================
   WEDDING INVITATION — Quang Bình & Thu Huyền
   script.js — toàn bộ logic + dữ liệu website
   Thuần JavaScript (không dùng framework/thư viện ngoài)
   ========================================================= */

'use strict';

/* =========================================================
   1. DỮ LIỆU TRUNG TÂM (chỉnh sửa mọi thứ ở đây)
   ========================================================= */
const weddingData = {

  // ---- Thông tin chung ----
  groom: {
    name: 'Quang Bình',
    fullName: 'Lê Quang Bình',
    role: 'Chú rể',
    photo: 'chure.jpg',
    description: 'Hiện là kỹ sư lập trình tại VNPT Thanh Hóa, là người luôn nghiêm túc và trách nhiệm trong công việc, nhưng cũng rất tình cảm và tinh tế trong cuộc sống. Anh tin rằng một mái ấm hạnh phúc cũng cần được xây dựng cẩn thận như một dòng code tốt - từng chút một, bằng sự thấu hiểu, kiên nhẫn và yêu thương chân thành dành cho người mình chọn để đi cùng suốt quãng đường phía trước',
    social: [
      // { icon: '📘', url: 'https://facebook.com/...' }
    ]
  },

  bride: {
    name: 'Thu Huyền',
    fullName: 'Nguyễn Thị Thu Huyền',
    role: 'Cô dâu',
    photo: 'codau.jpg',
    description: 'Hiện đang công tác trong ngành giáo dục mầm non, là người phụ nữ dịu dàng, tận tâm và giàu lòng yêu trẻ. Công việc hằng ngày với những nụ cười hồn nhiên của các em nhỏ đã hun đúc trong cô sự kiên nhẫn, bao dung và một trái tim luôn tràn đầy yêu thương. Cô tin rằng, cũng như việc chăm sóc từng mầm non nhỏ, một tình yêu đẹp cần được vun trồng bằng sự chân thành, thấu hiểu và kiên trì mỗi ngày.',
    social: [
      // { icon: '📘', url: 'https://facebook.com/...' }
    ]
  },

  // ---- Ngày giờ & địa điểm từng lễ (2 nhà khác nhau) ----
  // Định dạng ISO để JS Date hiểu đúng: 'YYYY-MM-DDTHH:mm:ss'
  dates: {
    napTai: {
      label: 'Lễ Nạp Tài',
      icon: '🎁',
      dateShort: '14/11/2026',
      time: '09:00 AM',
      venueName: 'Tư gia Cô Dâu',
      address: 'Thôn Kim Thành, xã Hồ Vương, tỉnh Thanh Hóa', // địa chỉ nhà gái — sửa nếu khác
      mapLinkUrl: 'https://maps.app.goo.gl/gzSH3G2czYDDHQ2q9', // link chỉ đường nhà gái
      iso: '2026-11-14T09:00:00'
    },
    weddingDay: {
      label: 'Lễ Thành Hôn',
      icon: '💍',
      dateShort: '16/11/2026',
      time: '11:00 AM',
      venueName: 'Tư gia Chú Rể',
      address: 'Thôn Yên Ngọc, xã Hoằng Thanh, tỉnh Thanh Hóa', // địa chỉ nhà trai — sửa nếu khác
      mapLinkUrl: 'https://maps.app.goo.gl/DM3cyQWVC2sX5kzs6', // link chỉ đường nhà trai
      iso: '2026-11-16T11:00:00' // dùng làm mốc đếm ngược
    }
  },

  // ---- Câu chuyện tình yêu (timeline) ----
  // Ghi chú: `image` có thể để trống ('') nếu mốc đó chưa có ảnh — khi đó
  // thẻ sẽ tự động hiển thị dạng không ảnh, không bị lỗi bố cục.
  loveStory: [
    {
      year: '25.10.2023',
      title: 'Lần đầu gặp gỡ',
      text: 'Chúng tôi tình cờ quen nhau qua một người bạn chung, và ngay từ ánh nhìn đầu tiên đã cảm thấy có điều gì đó rất đặc biệt.',
      image: 'codau.jpg'
    },
    {
      year: '16.02.2024',
      title: 'Bắt đầu hẹn hò',
      text: 'Sau nhiều lần trò chuyện, chúng tôi quyết định cùng nhau đi trên một hành trình - hành trình của những yêu thương giản dị.',
      image: 'codau.jpg'
    },
    {
      year: '25.06.2026',
      title: 'Lễ Dạm Ngõ',
      text: 'Hai gia đình chính thức gặp gỡ, trò chuyện thân mật để bàn chuyện trăm năm cho đôi trẻ - một cột mốc quan trọng mở đường cho ngày trọng đại sắp tới.',
      image: 'codau.jpg'
    },
    {
      year: '12.07.2026',
      title: 'Lời cầu hôn',
      text: 'Trong một buổi tối dịu dàng, một lời cầu hôn chân thành đã mở ra một chương mới cho câu chuyện của chúng tôi.',
      image: 'codau.jpg'
    }
  ],

  // ---- Album ảnh cưới ----
  // Ghi chú: `featured: true` để ảnh đó xuất hiện ở khối "Nổi bật" (bento) phía trên.
  // Album cuộn ngang bên dưới vẫn hiển thị TẤT CẢ ảnh trong mảng này, không phụ thuộc featured.
  gallery: [
    { url: 'IMG_7874.JPG', caption: 'Lễ dạm ngõ', featured: true },
    { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop', caption: 'Bên nhau', featured: true },
    { url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=800&auto=format&fit=crop', caption: 'Nắm tay nhau' },
    { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop', caption: 'Chân thành', featured: true },
    { url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop', caption: 'Nụ cười hạnh phúc', featured: true },
    { url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800&auto=format&fit=crop', caption: 'Yêu thương' },
    { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop', caption: 'Ngày đặc biệt', featured: true },
    { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop', caption: 'Trọn đời bên nhau', featured: true }
  ],


  // ---- Thông tin mừng cưới / QR chuyển khoản ----
  gift: [
    {
      owner: 'Lê Quang Bình',
      bank: 'Vietcombank',
      accountNumber: '1018632996',
      qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=Groom-Account-1018632996'
    },
    {
      owner: 'Nguyễn Thị Thu Huyền',
      bank: 'BIDV',
      accountNumber: '5011081063',
      qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=Bride-Account-5011081063'
    }
  ],

  // ---- Nhạc nền ----
  music: {
    // Thay bằng đường dẫn file nhạc thực tế của bạn (mp3)
    url: 'ta_la_cua_nhau.mp3',
    autoPlayLabel: 'Nhạc nền sẽ phát sau khi bạn tương tác với trang'
  },

  // ---- Cấu hình RSVP API (để trống nếu chỉ dùng LocalStorage) ----
  api: {
    rsvpEndpoint: '', // ví dụ: 'https://your-api.com/rsvp'
    guestbookEndpoint: '' // ví dụ: 'https://your-api.com/guestbook'
  }
};

/* =========================================================
   2. STORAGE KEYS
   ========================================================= */
const STORAGE_KEYS = {
  guestbook: 'wedding_guestbook_entries',
  rsvp: 'wedding_rsvp_entries'
};

/* =========================================================
   3. KHỞI TẠO KHI DOM SẴN SÀNG
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initFallingLeaves();
  initScrollProgress();
  initDotNav();
  initBackToTop();
  initMusicToggle();
  renderHeroDate();
  initCountdown();
  renderCoupleInfo();
  renderTimeline();
  renderGalleryFeatured();
  renderGalleryReel();
  initLightbox();
  renderEventInfo();
  renderGiftSection();
  initGuestbook();
  initRsvpForm();
  initRevealOnScroll();
  initSmoothAnchorScroll();
  initGuestName();
});

/* =========================================================
   3.5. TÊN KHÁCH MỜI — đọc từ URL (?ten=...) để cá nhân hoá thiệp
   Ví dụ link gửi cho từng khách:
   https://tenmien-cua-ban.com/?ten=Nguyễn%20Văn%20A
   ========================================================= */
function initGuestName() {
  const params = new URLSearchParams(window.location.search);
    // Ưu tiên tham số đã mã hóa Base64 (?g=...)
  const encoded = params.get('g');
  let rawName = '';
  if (encoded) {
    rawName = decodeGuestName(encoded);
  }

  // Nếu không có/không giải mã được, dùng các tham số dạng chữ thường như cũ
  if (!rawName) {
    rawName = params.get('ten') || params.get('name') || params.get('to') || params.get('guest') || '';
  }
  if (!rawName) return;

  const guestName = rawName.trim();
  if (!guestName) return;

  const heroInvitee = document.getElementById('heroInvitee');
  if (heroInvitee) {
    heroInvitee.innerHTML = `Trân trọng kính mời: <span>${escapeHtml(guestName)}</span>`;
    heroInvitee.classList.add('is-visible');
  }

  const eventEyebrow = document.getElementById('eventEyebrow');
  if (eventEyebrow) {
    eventEyebrow.textContent = `Trân trọng kính mời: ${guestName}`;
  }

  // Gợi ý sẵn tên khách khi họ điền form Xác nhận tham dự / Lưu bút
  const rsvpNameInput = document.getElementById('rsvpName');
  if (rsvpNameInput && !rsvpNameInput.value) rsvpNameInput.value = guestName;

  const gbNameInput = document.getElementById('gbName');
  if (gbNameInput && !gbNameInput.value) gbNameInput.value = guestName;

  document.title = `Thiệp mời ${guestName} | Quang Bình & Thu Huyền`;
}

/* =========================================================
   4. LOADER — màn hình chờ khi tải trang
   ========================================================= */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('is-hidden');
    }, 900); // giữ loader hiển thị tối thiểu để animation mượt
  });

  // Fallback: nếu sự kiện load không kích hoạt (một số môi trường preview),
  // vẫn ẩn loader sau thời gian tối đa.
  setTimeout(() => loader.classList.add('is-hidden'), 3500);
}

/* =========================================================
   5. SCROLL PROGRESS BAR
   ========================================================= */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/* =========================================================
   6. DOT NAVIGATION — highlight mục đang xem + cuộn tới section
   ========================================================= */
function initDotNav() {
  const dots = document.querySelectorAll('.dot-nav__item');
  if (!dots.length) return;

  const sections = Array.from(dots).map(dot => document.querySelector(dot.getAttribute('href')));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        dots.forEach(dot => {
          dot.classList.toggle('active', dot.getAttribute('href') === id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => { if (section) observer.observe(section); });
}

/* =========================================================
   7. BACK TO TOP BUTTON
   ========================================================= */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =========================================================
   8. NHẠC NỀN — chỉ phát sau khi người dùng tương tác
   ========================================================= */
// function initMusicToggle() {
//   const toggle = document.getElementById('musicToggle');
//   const audio = document.getElementById('bgMusic');
//   if (!toggle || !audio) return;

//   audio.src = weddingData.music.url;
//   audio.volume = 0.5;
//   let isPlaying = false;

//   toggle.addEventListener('click', () => {
//     if (isPlaying) {
//       audio.pause();
//       toggle.classList.remove('is-playing');
//       toggle.setAttribute('aria-pressed', 'false');
//     } else {
//       audio.play().catch(() => {
//         // Trình duyệt có thể chặn autoplay; bỏ qua lỗi một cách yên lặng
//       });
//       toggle.classList.add('is-playing');
//       toggle.setAttribute('aria-pressed', 'true');
//     }
//     isPlaying = !isPlaying;
//   });
// }
function initMusicToggle() {
  const toggle = document.getElementById('musicToggle');
  const audio = document.getElementById('bgMusic');
  if (!toggle || !audio) return;

  audio.src = weddingData.music.url;
  audio.volume = 0.5;
  let isPlaying = false;

  function setPlayingUI(playing) {
    isPlaying = playing;
    toggle.classList.toggle('is-playing', playing);
    toggle.setAttribute('aria-pressed', String(playing));
  }

  function tryPlay() {
    audio.play()
      .then(() => setPlayingUI(true))
      .catch(() => setPlayingUI(false)); // bị trình duyệt chặn, sẽ thử lại khi có tương tác
  }

  // 1) Thử tự động phát ngay khi trang vừa tải xong
  window.addEventListener('load', () => {
    tryPlay();
  });

  // 2) Nếu bị chặn, tự phát ngay lần chạm/click/cuộn đầu tiên của khách
  const resumeOnFirstInteraction = () => {
    if (!isPlaying) tryPlay();
    document.removeEventListener('click', resumeOnFirstInteraction);
    document.removeEventListener('touchstart', resumeOnFirstInteraction);
    document.removeEventListener('scroll', resumeOnFirstInteraction);
    document.removeEventListener('keydown', resumeOnFirstInteraction);
  };
  document.addEventListener('click', resumeOnFirstInteraction, { once: true });
  document.addEventListener('touchstart', resumeOnFirstInteraction, { once: true });
  document.addEventListener('scroll', resumeOnFirstInteraction, { once: true, passive: true });
  document.addEventListener('keydown', resumeOnFirstInteraction, { once: true });

  // 3) Nút bấm vẫn cho phép bật/tắt thủ công như cũ
  toggle.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      setPlayingUI(false);
    } else {
      tryPlay();
    }
  });
}

/* =========================================================
   8.5. FALLING LEAVES — lớp lá rơi nhẹ trên toàn trang
   ========================================================= */
function initFallingLeaves() {
  const container = document.getElementById('fallingLeaves');
  if (!container) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    container.innerHTML = '';
    return;
  }

  // const leafIcons = ['🍃', '🌿'];
  const leafIcons = ['💗'];
  const leafCount = 15;
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < leafCount; index += 1) {
    const leaf = document.createElement('span');
    const size = 16 + Math.random() * 22;
    const opacity = 0.18 + Math.random() * 0.24;
    const duration = 9 + Math.random() * 8;
    const delay = -(Math.random() * duration);
    const drift = `${Math.round((Math.random() * 2 - 1) * 140)}px`;
    const spin = `${Math.round((Math.random() * 2 - 1) * 220)}deg`;
    const left = `${Math.random() * 100}%`;
    const rotate = `${Math.round((Math.random() * 2 - 1) * 40)}deg`;

    leaf.className = 'falling-leaf';
    leaf.textContent = leafIcons[index % leafIcons.length];
    leaf.setAttribute('aria-hidden', 'true');
    leaf.style.setProperty('--leaf-left', left);
    leaf.style.setProperty('--leaf-size', `${size}px`);
    leaf.style.setProperty('--leaf-opacity', opacity.toFixed(2));
    leaf.style.setProperty('--leaf-duration', `${duration.toFixed(2)}s`);
    leaf.style.setProperty('--leaf-delay', `${delay.toFixed(2)}s`);
    leaf.style.setProperty('--leaf-drift', drift);
    leaf.style.setProperty('--leaf-spin', spin);
    leaf.style.setProperty('--leaf-rotate', rotate);

    fragment.appendChild(leaf);
  }

  container.replaceChildren(fragment);
}

/* =========================================================
   9. HERO — hiển thị ngày cưới
   ========================================================= */
function renderHeroDate() {
  const el = document.getElementById('heroDate');
  if (!el) return;
  el.textContent = formatDateShort(weddingData.dates.weddingDay.iso);
}

function formatDateShort(isoString) {
  const d = new Date(isoString);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const weekday = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][d.getDay()];
  return `${weekday} - ${day} . ${month} . ${year}`;
}

/* =========================================================
   10. COUNTDOWN — đếm ngược đến ngày cưới
   ========================================================= */
function initCountdown() {
  const targetDate = new Date(weddingData.dates.weddingDay.iso).getTime();
  const els = {
    days: document.getElementById('cdDays'),
    hours: document.getElementById('cdHours'),
    minutes: document.getElementById('cdMinutes'),
    seconds: document.getElementById('cdSeconds')
  };
  if (!els.days) return;

  function update() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      els.days.textContent = '00';
      els.hours.textContent = '00';
      els.minutes.textContent = '00';
      els.seconds.textContent = '00';
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    els.days.textContent = String(days).padStart(2, '0');
    els.hours.textContent = String(hours).padStart(2, '0');
    els.minutes.textContent = String(minutes).padStart(2, '0');
    els.seconds.textContent = String(seconds).padStart(2, '0');
  }

  update();
  const timer = setInterval(update, 1000);
}

/* =========================================================
   11. COUPLE INTRO — render thông tin cô dâu / chú rể
   ========================================================= */
function renderCoupleInfo() {
  const g = weddingData.groom;
  const b = weddingData.bride;

  setLazyImage('groomPhoto', g.photo);
  setLazyImage('bridePhoto', b.photo);

  setText('groomName', g.name);
  setText('brideName', b.name);
  setText('groomDesc', g.description);
  setText('brideDesc', b.description);

  renderSocialLinks('groomSocial', g.social);
  renderSocialLinks('brideSocial', b.social);
}

function renderSocialLinks(containerId, socialList) {
  const container = document.getElementById(containerId);
  if (!container || !socialList || !socialList.length) return;
  container.innerHTML = socialList.map(s =>
    `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener" aria-label="Mạng xã hội">${s.icon}</a>`
  ).join('');
}

/* =========================================================
   12. LOVE STORY TIMELINE
   ========================================================= */
function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;

  container.innerHTML = weddingData.loveStory.map(item => `
    <div class="timeline__item">
      <span class="timeline__dot"></span>
      <div class="timeline__card ${item.image ? 'timeline__card--has-image' : ''}">
        ${item.image ? `
        <div class="timeline__image-wrap">
          <img class="timeline__image" data-src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy">
        </div>` : ''}
        <p class="timeline__year">${escapeHtml(item.year)}</p>
        <h3 class="timeline__title">${escapeHtml(item.title)}</h3>
        ${item.text ? `<p class="timeline__text">${escapeHtml(item.text)}</p>` : ''}
      </div>
    </div>
  `).join('');

  // Lazy-load ảnh trong timeline giống cách gallery đang dùng
  lazyLoadImages(container);
}

/* =========================================================
   13. GALLERY — render ảnh + lazy loading
   ========================================================= */
function renderGalleryFeatured() {
  const container = document.getElementById('galleryFeatured');
  if (!container) return;

  const featuredPhotos = weddingData.gallery
    .map((photo, index) => ({ ...photo, index }))
    .filter(photo => photo.featured)
    .slice(0, 8);

  if (!featuredPhotos.length) return;

  // Độ nghiêng & lệch dọc được định sẵn (không random mỗi lần tải lại) để
  // bố cục luôn trông "tự nhiên, chồng nhẹ lên nhau" nhưng vẫn nhất quán.
  const rotations = [-6, 5, -12, 10, -5, 8, -4, 6];
  const offsetsY = [0, 26, -6, 8, -22, 6, -10, 20];

  container.innerHTML = featuredPhotos.map((photo, i) => `
    <div class="gallery__item gallery__item--polaroid" data-index="${photo.index}"
      style="--i:${i}; --rot:${rotations[i % rotations.length]}deg; --ty:${offsetsY[i % offsetsY.length]}px; z-index:${i + 1}">
      <div class="gallery__photo-frame">
        <img data-src="${escapeHtml(photo.url)}" alt="${escapeHtml(photo.caption || 'Ảnh cưới')}" loading="lazy">
      </div>
      ${photo.caption ? `<p class="gallery__caption">${escapeHtml(photo.caption)}</p>` : ''}
    </div>
  `).join('');

  observeGalleryReveal(container);
}

/* Album cuộn ngang — hiển thị TOÀN BỘ ảnh, hoạt động trên cả mobile lẫn desktop */
function renderGalleryReel() {
  const container = document.getElementById('galleryGrid');
  if (!container) return;

  container.classList.add('gallery__grid--reel');

  container.innerHTML = weddingData.gallery.map((photo, index) => `
    <div class="gallery__item gallery__item--reel" data-index="${index}" style="--i:${index}">
      ${buildGalleryItemInnerHTML(photo)}
    </div>
  `).join('');

  observeGalleryReveal(container);
  initGalleryScrollHint(container);
}

/* HTML dùng chung cho một ô ảnh (ảnh + overlay + caption + icon phóng to) */
function buildGalleryItemInnerHTML(photo) {
  return `
    <img data-src="${escapeHtml(photo.url)}" alt="${escapeHtml(photo.caption || 'Ảnh cưới')}" loading="lazy">
    <div class="gallery__overlay" aria-hidden="true"></div>
    ${photo.caption ? `<p class="gallery__caption">${escapeHtml(photo.caption)}</p>` : ''}
    <span class="gallery__zoom" aria-hidden="true">🔍</span>
  `;
}

/* Lazy-load ảnh trong container vừa render + hiệu ứng reveal so le khi cuộn tới */
function observeGalleryReveal(container) {
  lazyLoadImages(container);

  const items = container.querySelectorAll('.gallery__item');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  items.forEach(item => revealObserver.observe(item));
}

/* Gợi ý vuốt ngang: ẩn dần chỉ báo sau khi người dùng đã cuộn */
function initGalleryScrollHint(container) {
  const wrapper = container.closest('.gallery__scroller') || container;
  let hasScrolled = false;
  wrapper.addEventListener('scroll', () => {
    if (hasScrolled) return;
    hasScrolled = true;
    wrapper.classList.add('has-scrolled');
  }, { passive: true, once: true });
}

/* Lazy loading dùng chung cho mọi ảnh có thuộc tính data-src.
   Truyền `root` để chỉ quét trong 1 khối cụ thể — tránh trường hợp 2 khối
   (Nổi bật + Reel) cùng tạo observer theo dõi trùng một ảnh, gây lỗi src="null"
   khi observer thứ 2 đọc data-src đã bị observer thứ 1 xoá mất. */
function lazyLoadImages(root) {
  const scope = root || document;
  const images = scope.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        if (src) img.src = src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px 0px' });

  images.forEach(img => imgObserver.observe(img));
}

function setLazyImage(elementId, url) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.setAttribute('src', url);
}

/* =========================================================
   14. LIGHTBOX — xem ảnh phóng to
   ========================================================= */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  // Ảnh có thể được bấm từ khối "Nổi bật" (bento) hoặc khối cuộn ngang (reel)
  const galleryContainers = [
    document.getElementById('galleryFeatured'),
    document.getElementById('galleryGrid')
  ].filter(Boolean);
  if (!lightbox || !galleryContainers.length) return;

  let currentIndex = 0;
  const photos = weddingData.gallery;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = photos[currentIndex].url;
    lightboxImg.alt = photos[currentIndex].caption || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext(step) {
    currentIndex = (currentIndex + step + photos.length) % photos.length;
    lightboxImg.src = photos[currentIndex].url;
    lightboxImg.alt = photos[currentIndex].caption || '';
  }

  galleryContainers.forEach(container => {
    container.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery__item');
      if (!item) return;
      openLightbox(Number(item.dataset.index));
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => showNext(-1));
  nextBtn.addEventListener('click', () => showNext(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showNext(-1);
    if (e.key === 'ArrowRight') showNext(1);
  });
}

/* =========================================================
   15. EVENT INFO — render 2 thẻ Lễ Nạp Tài / Lễ Thành Hôn
   ========================================================= */
function renderEventInfo() {
  const container = document.getElementById('eventCards');
  if (!container) return;

  const events = [
    { ...weddingData.dates.napTai, variantClass: '' },
    { ...weddingData.dates.weddingDay, variantClass: 'event__card--gold' }
  ];

  container.innerHTML = events.map(ev => `
    <article class="event__card ${ev.variantClass}">
      <div class="event__icon-circle" aria-hidden="true">${ev.icon}</div>
      <h3 class="event__title">${escapeHtml(ev.label)}</h3>
      <p class="event__date">${escapeHtml(ev.dateShort)}</p>
      <div class="event__divider"></div>
      <p class="event__time"><span class="event__time-icon">🕐</span> ${escapeHtml(ev.time)}</p>
      <p class="event__venue">${escapeHtml(ev.venueName)}</p>
      <p class="event__address">${escapeHtml(ev.address)}</p>
      <a href="${escapeHtml(ev.mapLinkUrl)}" target="_blank" rel="noopener" class="btn btn--outline event__map-btn">Chỉ đường trên Google Maps</a>
    </article>
  `).join('');

  // Hiệu ứng reveal khi cuộn tới từng thẻ
  const cards = container.querySelectorAll('.event__card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  cards.forEach(card => observer.observe(card));
}

/* =========================================================
   16. GIFT / QR SECTION — icon hộp quà mở popup QR + tài khoản
   ========================================================= */
function renderGiftSection() {
  const container = document.getElementById('giftGrid');
  if (!container) return;

  container.innerHTML = weddingData.gift.map((item, idx) => `
    <div class="gift__card is-visible" data-gift-index="${idx}">
      <img class="gift__qr" data-src="${escapeHtml(item.qrUrl)}" alt="Mã QR chuyển khoản mừng cưới ${escapeHtml(item.owner)}" loading="lazy">
      <p class="gift__owner">${escapeHtml(item.owner)}</p>
      <p class="gift__bank">${escapeHtml(item.bank)}</p>
      <div class="gift__account">
        <span>${escapeHtml(item.accountNumber)}</span>
        <button type="button" class="gift__copy" data-account="${escapeHtml(item.accountNumber)}">Sao chép</button>
      </div>
    </div>
  `).join('');

  // Copy số tài khoản vào clipboard
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.gift__copy');
    if (!btn) return;
    copyToClipboard(btn.dataset.account, btn);
  });

  initGiftModal();
}

/* Popup mở/đóng khi bấm vào icon hộp quà */
function initGiftModal() {
  const trigger = document.getElementById('giftTrigger');
  const modal = document.getElementById('giftModal');
  const overlay = document.getElementById('giftModalOverlay');
  const closeBtn = document.getElementById('giftModalClose');
  if (!trigger || !modal) return;

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lazyLoadImages(); // tải ảnh QR ngay khi popup mở lần đầu
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}

function copyToClipboard(text, btnEl) {
  const fallbackCopy = () => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand('copy'); } catch (err) { /* im lặng bỏ qua */ }
    document.body.removeChild(textarea);
  };

  const showCopied = () => {
    if (!btnEl) return;
    const original = btnEl.textContent;
    btnEl.textContent = 'Đã sao chép!';
    btnEl.classList.add('is-copied');
    setTimeout(() => {
      btnEl.textContent = original;
      btnEl.classList.remove('is-copied');
    }, 1500);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(showCopied).catch(fallbackCopy);
  } else {
    fallbackCopy();
    showCopied();
  }
}

/* =========================================================
   17. GUESTBOOK — sổ lưu bút dùng LocalStorage
   ========================================================= */
function initGuestbook() {
  const form = document.getElementById('guestbookForm');
  const list = document.getElementById('guestbookList');
  if (!form || !list) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('gbName');
    const msgInput = document.getElementById('gbMessage');

    const name = nameInput.value.trim();
    const message = msgInput.value.trim();
    if (!name || !message) return;

    const entry = {
      id: Date.now(),
      name,
      message,
      date: new Date().toISOString()
    };

    saveGuestbookEntry(entry);
    form.reset();
  });
}

function getGuestbookEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.guestbook);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveGuestbookEntry(entry) {
  const entries = getGuestbookEntries();
  entries.unshift(entry); // lời chúc mới nhất hiển thị trước
  localStorage.setItem(STORAGE_KEYS.guestbook, JSON.stringify(entries));

  // Chỗ để gọi API backend thực tế trong tương lai, ví dụ:
  // if (weddingData.api.guestbookEndpoint) sendGuestbookToApi(entry);
}

/* Hàm dự phòng để gửi lời chúc lên server thật (chưa kích hoạt) */
async function sendGuestbookToApi(entry) {
  if (!weddingData.api.guestbookEndpoint) return;
  try {
    await fetch(weddingData.api.guestbookEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
  } catch (err) {
    console.warn('Không thể gửi lời chúc lên server:', err);
  }
}

/* =========================================================
   18. RSVP FORM — xác nhận tham dự, lưu LocalStorage
   ========================================================= */
function initRsvpForm() {
  const form = document.getElementById('rsvpForm');
  const status = document.getElementById('rsvpStatus');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rsvpName').value.trim();
    const phone = document.getElementById('rsvpPhone').value.trim();
    const attend = form.querySelector('input[name="rsvpAttend"]:checked').value;
    const guests = document.getElementById('rsvpGuests').value;

    if (!name) return;

    const rsvpEntry = {
      id: Date.now(),
      name,
      phone,
      attend,
      guests: Number(guests) || 1,
      date: new Date().toISOString()
    };

    saveRsvpEntry(rsvpEntry);

    status.textContent = attend === 'yes'
      ? `Cảm ơn ${name}! Rất mong được đón tiếp bạn trong ngày vui của chúng tôi 🎉`
      : `Cảm ơn ${name} đã phản hồi. Chúng tôi rất tiếc vì không thể đón tiếp bạn lần này 💌`;

    form.reset();
  });
}

function saveRsvpEntry(entry) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.rsvp);
    const entries = raw ? JSON.parse(raw) : [];
    entries.push(entry);
    localStorage.setItem(STORAGE_KEYS.rsvp, JSON.stringify(entries));
  } catch (err) {
    console.warn('Không thể lưu RSVP vào LocalStorage:', err);
  }

  // Chỗ để gọi API backend thực tế trong tương lai, ví dụ:
  // if (weddingData.api.rsvpEndpoint) sendRsvpToApi(entry);
}

/* Hàm dự phòng để gửi RSVP lên server thật (chưa kích hoạt) */
async function sendRsvpToApi(entry) {
  if (!weddingData.api.rsvpEndpoint) return;
  try {
    await fetch(weddingData.api.rsvpEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    });
  } catch (err) {
    console.warn('Không thể gửi RSVP lên server:', err);
  }
}

/* =========================================================
   19. REVEAL ON SCROLL — hiệu ứng fade-in khi cuộn tới
   ========================================================= */
function initRevealOnScroll() {
  const revealEls = document.querySelectorAll('.reveal, .timeline__item');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  revealEls.forEach(el => observer.observe(el));
}

/* =========================================================
   20. SMOOTH ANCHOR SCROLL — cuộn mượt tới section khi click nav
   ========================================================= */
function initSmoothAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* =========================================================
   21. HÀM TIỆN ÍCH (UTILITIES)
   ========================================================= */

function encodeGuestName(name) {
  try {
    const utf8Bytes = new TextEncoder().encode(name);
    let binary = '';
    utf8Bytes.forEach(byte => { binary += String.fromCharCode(byte); });
    const base64 = btoa(binary);
    // Chuyển sang dạng URL-safe: + -> -, / -> _, bỏ dấu = ở cuối
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (err) {
    console.warn('Không thể mã hóa tên khách:', err);
    return '';
  }
}

/* Giải mã ngược lại chuỗi Base64 URL-safe về tên gốc */
function decodeGuestName(encoded) {
  try {
    // Khôi phục lại dạng Base64 chuẩn + thêm padding nếu thiếu
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) base64 += '=';
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch (err) {
    console.warn('Không thể giải mã tên khách:', err);
    return '';
  }
}
function setText(elementId, value) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = value;
}

/* Escape HTML để chống XSS khi render dữ liệu người dùng nhập (guestbook/RSVP) */
function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

/* Định dạng thời gian tương đối kiểu "5 phút trước", "2 ngày trước" */
function formatRelativeDate(isoString) {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffSeconds = Math.floor((now - then) / 1000);

  if (diffSeconds < 60) return 'Vừa xong';
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} phút trước`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} giờ trước`;
  if (diffSeconds < 2592000) return `${Math.floor(diffSeconds / 86400)} ngày trước`;

  const d = new Date(isoString);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}
