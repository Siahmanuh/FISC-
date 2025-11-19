// --- SLIDER SCRIPT ---
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
let currentIndex = 0;
let slideInterval;

// Fungsi tampilkan slide sesuai index
function showSlide(index) {
  if (slides.length === 0) return; // pastikan elemen ada

  if (index >= slides.length) currentIndex = 0;
  else if (index < 0) currentIndex = slides.length - 1;
  else currentIndex = index;

  const slidesContainer = document.querySelector('.slides');
  if (slidesContainer) {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // update titik indikator
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[currentIndex]) dots[currentIndex].classList.add('active');
}

// Fungsi tombol next & prev
function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// Auto-slide tiap 5 detik
function startAutoSlide() {
  if (slides.length === 0) return;
  slideInterval = setInterval(nextSlide, 5000);
}

// Reset timer setelah interaksi manual
function resetTimer() {
  clearInterval(slideInterval);
  startAutoSlide();
}

// Event listener tombol panah
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetTimer();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetTimer();
  });
}

// Event listener titik
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    resetTimer();
  });
});

// Jalankan saat halaman berisi slider
if (slides.length > 0) {
  showSlide(currentIndex);
  startAutoSlide();
}

// --- FUNGSI UNTUK HALAMAN LOKASI ---
function findLocation() {
  alert("Membuka Google Maps menuju lokasi Fisc...");
  window.open("https://www.google.com/maps/place/SMK+Hang+Tuah+1+Jakarta", "_blank");
}

// === ORDER MENU VIA WHATSAPP ===
function orderMenu(menuName, qtyId) {
  const qty = document.getElementById(qtyId).value;
  const phone = "628973852390"; // nomor WA
  const message = `Halo FISC! Saya ingin memesan ${qty} ${menuName}. Apakah masih tersedia?`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// === Dropdown Klik untuk Menu Kontak ===
document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.querySelector('.dropdown');
  const menu = document.querySelector('.dropdown-menu');

  if (dropdown && menu) {
    dropdown.addEventListener('click', function (e) {
      e.stopPropagation(); // agar klik di dalam dropdown tidak menutup menu
      menu.classList.toggle('show');
    });

    // tutup dropdown kalau klik di luar area
    document.addEventListener('click', function () {
      menu.classList.remove('show');
    });
  }
});

// === BURGER NAV FUNCTIONALITY (TAMBAHAN BARU) ===
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  // Cek jika elemen burger nav ada di halaman
  if (burger && nav) {
    burger.addEventListener('click', function () {
      // Toggle nav
      nav.classList.toggle('nav-active');
      
      // Animate links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
      });
      
      // Burger animation
      burger.classList.toggle('toggle');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
          link.style.animation = '';
        });
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
      const isClickInsideNav = nav.contains(event.target);
      const isClickOnBurger = burger.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnBurger && nav.classList.contains('nav-active')) {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
          link.style.animation = '';
        });
      }
    });
  }
});
