(function () {
  'use strict';

  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const cards = track.querySelectorAll('.carousel__card');
  const total = cards.length;
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');

  const mql = window.matchMedia('(min-width: 1024px)');

  let currentIndex = 0;
  let visibleCount = mql.matches ? 3 : 1;

  function maxIndex() {
    return Math.max(0, total - visibleCount);
  }

  function updateCarousel() {
    const gapRem = 1.5; // --spacing-lg
    const offsetX = `calc(-${currentIndex} * (${100 / visibleCount}% + ${gapRem / visibleCount}rem))`;
    track.style.transform = `translateX(${offsetX})`;

    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= maxIndex();
  }

  prevBtn.addEventListener('click', function () {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', function () {
    if (currentIndex < maxIndex()) {
      currentIndex += 1;
      updateCarousel();
    }
  });

  mql.addEventListener('change', function (e) {
    visibleCount = e.matches ? 3 : 1;
    currentIndex = Math.min(currentIndex, maxIndex());
    updateCarousel();
  });

  // Initial render
  updateCarousel();
}());
