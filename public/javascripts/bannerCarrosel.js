function setupCarousel(carouselSelector, interval) {
  const carousel = document.querySelector(carouselSelector);
  const slides = carousel.querySelectorAll('.banner');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, interval);
}

// Carrossel 1
setupCarousel('.banner-carrossel1 .carousel-container', 10000);

// Carrossel 2
setupCarousel('.banner-carrossel2 .carousel-container', 10000);
