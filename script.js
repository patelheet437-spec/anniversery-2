/* ==========================================================================
   ULTRA-LUXURIOUS ROMANTIC ANNIVERSARY JAVASCRIPT
   ========================================================================== */

const DEFAULT_PHOTOS = {
  1: 'images/photo1.jpg',
  2: 'images/photo2.jpg',
  3: 'images/photo3.jpg',
  4: 'images/photo4.jpg',
  5: 'images/photo5.jpg',
  6: 'images/photo6.jpg',
  7: 'images/photo7.jpg'
};
const DEFAULT_CONFIG = {
  brideName: 'My Queen 👸',
  groomName: 'Your Fiancé 💍',
  engagementDate: '2026-05-02'
};

let activeUploadSlot = 1;
let loveTimerInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  initCursorTrailCanvas();
  initStarsCanvas();
  initPetalsCanvas();
  initFloatingHearts();
  loadSavedCustomDetails();
  loadSavedPhotos();
  initAudioPlayer();
  initLoveClock();
  initScrollReveal();
});

/* ==========================================================================
   1. CURSOR HEART TRAIL (Sparkle hearts follow mouse)
   ========================================================================== */
function initCursorTrailCanvas() {
  const canvas = document.getElementById('cursorTrailCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -100, y: -100 };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // Spawn 1-2 particles per move
    for (let i = 0; i < 2; i++) {
      particles.push({
        x: mouse.x + (Math.random() - 0.5) * 10,
        y: mouse.y + (Math.random() - 0.5) * 10,
        size: Math.random() * 10 + 6,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.015,
        vx: (Math.random() - 0.5) * 1.5,
        vy: Math.random() * -1.5 - 0.5,
        type: Math.random() > 0.5 ? 'heart' : 'sparkle',
        color: Math.random() > 0.5 ? '#ff2a6d' : '#f0c040',
        rotation: Math.random() * 360
      });
    }
  });

  // Touch support
  document.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    mouse.x = t.clientX;
    mouse.y = t.clientY;
    particles.push({
      x: mouse.x, y: mouse.y,
      size: Math.random() * 12 + 8,
      alpha: 1, decay: 0.02,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * -2 - 0.5,
      type: 'heart', color: '#ff2a6d',
      rotation: Math.random() * 360
    });
  }, { passive: true });

  function drawHeart(x, y, size, color, alpha, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    const s = size / 2;
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.6, s * 0.4, 0, s * 1.4);
    ctx.bezierCurveTo(s * 1.6, s * 0.4, s, -s * 0.5, 0, s * 0.3);
    ctx.fill();
    ctx.restore();
  }

  function drawSparkle(x, y, size, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(x, y, size / 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      p.rotation += 1;
      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }
      if (p.type === 'heart') {
        drawHeart(p.x, p.y, p.size, p.color, p.alpha, p.rotation);
      } else {
        drawSparkle(p.x, p.y, p.size, p.color, p.alpha);
      }
    }
    // Keep particle count in check
    if (particles.length > 120) particles.splice(0, particles.length - 120);
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   2. FLOATING HEARTS (Ambient layer that continuously spawns hearts)
   ========================================================================== */
function initFloatingHearts() {
  const layer = document.getElementById('floatingHeartsLayer');
  const hearts = ['❤️', '💖', '💕', '💗', '🩷', '💍', '✨', '🌹'];

  function spawnHeart() {
    const el = document.createElement('div');
    el.className = 'fh';
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (Math.random() * 14 + 12) + 'px';
    const duration = Math.random() * 8 + 10;
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = '0s';
    layer.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
  }

  // Spawn a heart every 1.5s
  setInterval(spawnHeart, 1500);
  // Initial burst
  for (let i = 0; i < 8; i++) {
    setTimeout(spawnHeart, i * 300);
  }
}

/* ==========================================================================
   3. SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-section').forEach(el => sectionObs.observe(el));

  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-card').forEach(el => cardObs.observe(el));
}

/* ==========================================================================
   4. ENTRANCE GATE / WAX SEAL UNLOCK
   ========================================================================== */
const introOverlay = document.getElementById('introOverlay');
const mainContent = document.getElementById('mainContent');
const openSurpriseBtn = document.getElementById('openSurpriseBtn');
const romanticAudio = document.getElementById('romanticAudio');
const musicDisc = document.getElementById('musicDisc');
const playIcon = document.getElementById('playIcon');

openSurpriseBtn.addEventListener('click', () => {
  startRomanticMusic();
  triggerCelebrationFireworks();
  // Extra confetti burst after 500ms
  setTimeout(() => triggerCelebrationFireworks(), 500);

  introOverlay.classList.add('fade-out');
  setTimeout(() => {
    introOverlay.style.display = 'none';
    mainContent.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('💖 Happy 5th Month Engagement Anniversary!');
    // Trigger initial scroll reveals
    setTimeout(() => {
      document.querySelectorAll('.reveal-section, .reveal-card').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add('revealed');
      });
    }, 200);
  }, 900);
});

function startRomanticMusic() {
  romanticAudio.volume = parseFloat(document.getElementById('volumeSlider').value) || 0.75;
  romanticAudio.play().then(() => {
    musicDisc.querySelector('.vinyl-disc').classList.remove('paused');
    playIcon.className = 'fa-solid fa-pause';
  }).catch((err) => console.log('Audio:', err));
}

/* ==========================================================================
   5. MUSIC PLAYER CONTROLS
   ========================================================================== */
function initAudioPlayer() {
  const btnTogglePlay = document.getElementById('btnTogglePlay');
  const volumeSlider = document.getElementById('volumeSlider');
  const btnUploadSong = document.getElementById('btnUploadSong');
  const songFileInput = document.getElementById('songFileInput');
  const currentSongName = document.getElementById('currentSongName');
  const vinylDisc = musicDisc.querySelector('.vinyl-disc');

  btnTogglePlay.addEventListener('click', () => {
    if (romanticAudio.paused) {
      romanticAudio.play();
      vinylDisc.classList.remove('paused');
      playIcon.className = 'fa-solid fa-pause';
    } else {
      romanticAudio.pause();
      vinylDisc.classList.add('paused');
      playIcon.className = 'fa-solid fa-play';
    }
  });
  volumeSlider.addEventListener('input', (e) => { romanticAudio.volume = e.target.value; });
  btnUploadSong.addEventListener('click', () => songFileInput.click());
  songFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      romanticAudio.src = URL.createObjectURL(file);
      currentSongName.textContent = file.name.replace(/\.[^/.]+$/, "");
      romanticAudio.play();
      vinylDisc.classList.remove('paused');
      playIcon.className = 'fa-solid fa-pause';
      showToast(`🎵 Now playing: ${file.name}`);
    }
  });
}

/* ==========================================================================
   6. PHOTO MANAGEMENT & PERSISTENCE
   ========================================================================== */
function loadSavedPhotos() {
  for (let slot = 1; slot <= 7; slot++) {
    const saved = localStorage.getItem(`anniversary_photo_${slot}`);
    const imgEl = document.getElementById(`imgSlot${slot}`);
    const modalThumb = document.getElementById(`modalThumb${slot}`);
    if (saved) {
      if (imgEl) imgEl.src = saved;
      if (modalThumb) modalThumb.src = saved;
    } else {
      if (imgEl) imgEl.src = DEFAULT_PHOTOS[slot];
      if (modalThumb) modalThumb.src = DEFAULT_PHOTOS[slot];
    }
  }
}

function triggerSlotUpload(slotNumber) {
  activeUploadSlot = slotNumber;
  document.getElementById('slotFileInput').click();
}

document.getElementById('slotFileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) savePhotoFile(file, activeUploadSlot);
});

function handleModalPhotoUpload(event, slotNumber) {
  const file = event.target.files[0];
  if (file) savePhotoFile(file, slotNumber);
}

function savePhotoFile(file, slotNumber) {
  if (!file.type.startsWith('image/')) { alert('Please select an image file'); return; }
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    try { localStorage.setItem(`anniversary_photo_${slotNumber}`, dataUrl); } catch (err) { console.warn('Storage full'); }
    const imgEl = document.getElementById(`imgSlot${slotNumber}`);
    const modalThumb = document.getElementById(`modalThumb${slotNumber}`);
    if (imgEl) imgEl.src = dataUrl;
    if (modalThumb) modalThumb.src = dataUrl;
    showToast(`📸 Photo ${slotNumber} updated!`);
  };
  reader.readAsDataURL(file);
}

function resetPhotosToDefaults() {
  if (confirm("Reset all photos to defaults?")) {
    for (let slot = 1; slot <= 7; slot++) {
      localStorage.removeItem(`anniversary_photo_${slot}`);
      const imgEl = document.getElementById(`imgSlot${slot}`);
      const modalThumb = document.getElementById(`modalThumb${slot}`);
      if (imgEl) imgEl.src = DEFAULT_PHOTOS[slot];
      if (modalThumb) modalThumb.src = DEFAULT_PHOTOS[slot];
    }
    showToast('🔄 Photos reset');
  }
}

const photoManagerModal = document.getElementById('photoManagerModal');
document.getElementById('btnOpenPhotoManager').addEventListener('click', openPhotoManagerModal);
function openPhotoManagerModal() { photoManagerModal.classList.remove('hidden'); }
function closePhotoManagerModal() { photoManagerModal.classList.add('hidden'); }

/* ==========================================================================
   7. CUSTOMIZE NAMES & DATE
   ========================================================================== */
const customizeModal = document.getElementById('customizeModal');
document.getElementById('btnOpenCustomizeModal').addEventListener('click', () => customizeModal.classList.remove('hidden'));
function closeCustomizeModal() { customizeModal.classList.add('hidden'); }

function loadSavedCustomDetails() {
  const bride = localStorage.getItem('anniversary_bride_name') || DEFAULT_CONFIG.brideName;
  const groom = localStorage.getItem('anniversary_groom_name') || DEFAULT_CONFIG.groomName;
  const engageDate = localStorage.getItem('anniversary_engagement_date') || DEFAULT_CONFIG.engagementDate;
  document.getElementById('inputBrideName').value = bride;
  document.getElementById('inputGroomName').value = groom;
  document.getElementById('inputEngagementDate').value = engageDate;
  applyCustomDetails(bride, groom, engageDate);
}

function saveCustomDetails() {
  const bride = document.getElementById('inputBrideName').value.trim() || DEFAULT_CONFIG.brideName;
  const groom = document.getElementById('inputGroomName').value.trim() || DEFAULT_CONFIG.groomName;
  const engageDate = document.getElementById('inputEngagementDate').value || DEFAULT_CONFIG.engagementDate;
  localStorage.setItem('anniversary_bride_name', bride);
  localStorage.setItem('anniversary_groom_name', groom);
  localStorage.setItem('anniversary_engagement_date', engageDate);
  applyCustomDetails(bride, groom, engageDate);
  closeCustomizeModal();
  showToast('✨ Details updated!');
}

function applyCustomDetails(bride, groom, engageDate) {
  document.getElementById('displayBrideName').textContent = bride;
  document.getElementById('displayGroomName').textContent = groom;
  document.getElementById('navCoupleTitle').textContent = `${groom} & ${bride} • 5 Months 💍`;
  document.getElementById('displayCoupleNames').textContent = `${groom} & ${bride} ❤️`;
  document.getElementById('footerCoupleText').textContent = `${groom} & ${bride}`;
  const formattedDate = new Date(engageDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  document.getElementById('displayEngageDate').textContent = `Engaged on ${formattedDate}`;
  initLoveClock(engageDate);
}

/* ==========================================================================
   8. LIVE LOVE COUNTER CLOCK
   ========================================================================== */
function initLoveClock(customDateStr) {
  if (loveTimerInterval) clearInterval(loveTimerInterval);
  const engageDateStr = customDateStr || localStorage.getItem('anniversary_engagement_date') || DEFAULT_CONFIG.engagementDate;
  const startDate = new Date(engageDateStr + 'T00:00:00');

  function updateClock() {
    const now = new Date();
    const diffMs = now - startDate;
    if (diffMs < 0) return;
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
    if (now.getDate() < startDate.getDate()) months--;
    if (months < 0) months = 0;

    animateValue('cntMonths', months);
    animateValue('cntDays', totalDays);
    document.getElementById('cntHours').textContent = String(totalHours % 24).padStart(2, '0');
    document.getElementById('cntMinutes').textContent = String(totalMinutes % 60).padStart(2, '0');
    document.getElementById('cntSeconds').textContent = String(totalSeconds % 60).padStart(2, '0');
  }

  // Subtle pop animation when value changes
  function animateValue(id, newVal) {
    const el = document.getElementById(id);
    const oldVal = el.textContent;
    el.textContent = newVal;
    if (oldVal !== String(newVal)) {
      el.style.transform = 'scale(1.15)';
      setTimeout(() => el.style.transform = 'scale(1)', 200);
    }
  }

  updateClock();
  loveTimerInterval = setInterval(updateClock, 1000);
}

/* ==========================================================================
   9. GUJARATI SHAYARI COPY
   ========================================================================== */
const SHAYARI_LIST = {
  1: `તારા વગરનું જીવન હવે અધૂરું લાગે છે,\nતું સાથે હોય ત્યારે દરેક ક્ષણ સોનેરી લાગે છે.\nસગાઈના આ ૫ મહિના તો બસ એક સુંદર શરૂઆત છે,\nહજુ તો આખી જિંદગી તારી સાથે પ્રેમથી જીવવી છે!\n\nHappy 5 Months Engagement Anniversary My Love! ❤️💍`,
  2: `જેમ કાગળ વગર કલમ અધૂરી છે,\nતેમ તારા વગર મારી જિંદગી અધૂરી છે.\nસગાઈના આ પાંચ મહિનામાં તેં એટલો પ્રેમ આપ્યો છે,\nકે હવે દરેક શ્વાસમાં બસ તારું જ નામ છે!\n\nHappy 5th Month Anniversary To My Fiancée! 💖`,
  3: `હાથમાં તારો હાથ હોય,\nઅને દિલમાં તારો સાથ હોય,\nઆનાથી વધારે સુંદર બીજું શું હોઈ શકે?\n૫ મહિના પૂરા થયા, હવે બસ તને મારી દુલ્હન બનાવવાની રાહ છે!\n\nCounting days to our wedding! 👰💍❤️`,
  4: `તારી એક સ્માઈલ જોઈને મારો આખો દિવસ બની જાય છે,\nસગાઈ થઈ ત્યારથી તું જ મારી દુનિયા બની ગઈ છે.\nભગવાન કરે આપણો આ પ્રેમ કાયમ આમ જ મહેકતો રહે,\nહેપ્પી ૫ મંથ્સ એનિવર્સરી મારી વાહલી! 🌸❤️`
};

function copyShayari(btn, index) {
  navigator.clipboard.writeText(SHAYARI_LIST[index]).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
    showToast('📋 Shayari copied! Send on WhatsApp ❤️');
    setTimeout(() => btn.innerHTML = orig, 2000);
  });
}

/* ==========================================================================
   10. SECRET CARDS FLIP
   ========================================================================== */
function flipSecretCard(card) {
  card.classList.toggle('flipped');
}

/* ==========================================================================
   11. LIGHTBOX
   ========================================================================== */
function zoomImage(imgId) {
  const img = document.getElementById(imgId);
  if (img) {
    document.getElementById('lightboxImg').src = img.src;
    document.getElementById('lightboxCaption').textContent = img.alt || "Our Beautiful Memory";
    document.getElementById('lightboxModal').classList.remove('hidden');
  }
}
function closeLightbox() { document.getElementById('lightboxModal').classList.add('hidden'); }

/* ==========================================================================
   12. PLAYFUL YES/NO
   ========================================================================== */
function dodgeNoButton() {
  const btn = document.getElementById('btnNoAnswer');
  btn.style.transform = `translate(${Math.random()*250-125}px, ${Math.random()*120-60}px)`;
}

function celebrateYesAnswer() {
  document.getElementById('questionBtnWrap').style.display = 'none';
  document.getElementById('yesSuccessMessage').classList.remove('hidden');
  triggerCelebrationFireworks();
  setTimeout(() => triggerCelebrationFireworks(), 400);
  setTimeout(() => triggerCelebrationFireworks(), 800);
}

/* ==========================================================================
   13. FIREWORKS (Canvas Confetti — Multi-burst)
   ========================================================================== */
document.getElementById('btnHeartBurst').addEventListener('click', () => {
  triggerCelebrationFireworks();
  setTimeout(() => triggerCelebrationFireworks(), 300);
  setTimeout(() => triggerCelebrationFireworks(), 600);
});

function triggerCelebrationFireworks() {
  if (typeof confetti !== 'function') return;
  // Left
  confetti({ particleCount: 70, angle: 60, spread: 80, origin: { x: 0, y: 0.7 },
    colors: ['#ff2a6d', '#f0c040', '#ff6b8a', '#fff', '#ffd700'], gravity: 0.8 });
  // Right
  confetti({ particleCount: 70, angle: 120, spread: 80, origin: { x: 1, y: 0.7 },
    colors: ['#ff2a6d', '#f0c040', '#ff6b8a', '#fff', '#ffd700'], gravity: 0.8 });
  // Center sparkle
  setTimeout(() => {
    confetti({ particleCount: 50, spread: 120, origin: { x: 0.5, y: 0.35 },
      shapes: ['circle'], colors: ['#ffd700', '#ff2a6d', '#a855f7', '#ff99b3'], scalar: 0.8 });
  }, 200);
}

/* ==========================================================================
   14. TOAST
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  toast.innerHTML = message;
  toast.classList.remove('hidden');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.add('hidden'), 3500);
}

/* ==========================================================================
   15. BACKGROUND CANVASES
   ========================================================================== */

// ─── STARS & SHOOTING STARS ───
function initStarsCanvas() {
  const canvas = document.getElementById('starsCanvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let shootingStars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 7000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random(),
        speed: Math.random() * 0.018 + 0.004,
        increasing: Math.random() > 0.5,
        hue: Math.random() > 0.8 ? 40 : (Math.random() > 0.5 ? 0 : 50) // Some gold, some white
      });
    }
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      if (s.increasing) { s.alpha += s.speed; if (s.alpha >= 1) s.increasing = false; }
      else { s.alpha -= s.speed; if (s.alpha <= 0.1) s.increasing = true; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      if (s.hue === 0) {
        ctx.fillStyle = `rgba(255, 235, 180, ${s.alpha})`;
      } else if (s.hue === 40) {
        ctx.fillStyle = `rgba(240, 192, 64, ${s.alpha * 0.8})`;
      } else {
        ctx.fillStyle = `rgba(255, 200, 200, ${s.alpha * 0.7})`;
      }
      ctx.fill();
    });

    // Shooting stars
    if (Math.random() < 0.012 && shootingStars.length < 2) {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.25,
        len: Math.random() * 100 + 60,
        speed: Math.random() * 12 + 14,
        angle: Math.PI / 4,
        alpha: 1
      });
    }
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      const endX = ss.x + Math.cos(ss.angle) * ss.len;
      const endY = ss.y + Math.sin(ss.angle) * ss.len;
      const gradient = ctx.createLinearGradient(ss.x, ss.y, endX, endY);
      gradient.addColorStop(0, `rgba(255,255,255,0)`);
      gradient.addColorStop(1, `rgba(255,215,0,${ss.alpha})`);
      ctx.beginPath();
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Glow
      ctx.beginPath();
      ctx.arc(endX, endY, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${ss.alpha})`;
      ctx.fill();

      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.alpha -= 0.018;
      if (ss.alpha <= 0) shootingStars.splice(i, 1);
    }

    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  resize();
  render();
}

// ─── 3D ROSE PETALS ───
function initPetalsCanvas() {
  const canvas = document.getElementById('petalsCanvas');
  const ctx = canvas.getContext('2d');
  let petals = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Petal {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : -25;
      this.size = Math.random() * 13 + 10;
      this.speedY = Math.random() * 1.2 + 0.6;
      this.speedX = Math.sin(Math.random() * Math.PI) * 1;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 2.5;
      this.flip = Math.random() * Math.PI;
      this.flipSpeed = Math.random() * 0.035 + 0.01;
      this.alpha = Math.random() * 0.35 + 0.5;
      // Varied rose colors
      const colorSet = [
        ['#ff2a6d', '#ba0c35'],
        ['#ff6b8a', '#c9184a'],
        ['#ff99b3', '#e91e63'],
        ['#f0c040', '#b8860b']  // Rare gold petal
      ];
      const picked = colorSet[Math.floor(Math.random() * colorSet.length)];
      this.color1 = picked[0];
      this.color2 = picked[1];
    }
    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.flip) * 1.2;
      this.rotation += this.rotationSpeed;
      this.flip += this.flipSpeed;
      if (this.y > canvas.height + 25) this.reset();
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.scale(1, Math.cos(this.flip));
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
      ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
      const grad = ctx.createLinearGradient(0, -this.size / 2, 0, this.size);
      grad.addColorStop(0, this.color1);
      grad.addColorStop(1, this.color2);
      ctx.fillStyle = grad;
      ctx.globalAlpha = this.alpha;
      ctx.shadowColor = 'rgba(255,42,109,0.25)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  function initPetalsList() {
    petals = [];
    const count = Math.min(30, Math.floor(canvas.width / 45));
    for (let i = 0; i < count; i++) petals.push(new Petal());
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(render);
  }

  window.addEventListener('resize', () => { resize(); initPetalsList(); });
  resize();
  initPetalsList();
  render();
}
