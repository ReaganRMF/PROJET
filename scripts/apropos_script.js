document.addEventListener("DOMContentLoaded", (event) => {
    const gallery = document.querySelector(".gallery");
    const items = document.querySelectorAll(".gallery-item");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots-container");

    let currentIndex = 0;

    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        gallery.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        goToSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        goToSlide(currentIndex);
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // Auto-advance slides
    setInterval(nextSlide, 5000);

    // Initial state
    updateDots();

    // Touch events for mobile swiping
    let touchStartX = 0;
    let touchEndX = 0;

    gallery.addEventListener(
        "touchstart",
        (e) => {
            touchStartX = e.changedTouches[0].screenX;
        },
        false
    );

    gallery.addEventListener(
        "touchend",
        (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        },
        false
    );

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    }
});


document.addEventListener("DOMContentLoaded", (event) => {
    const bottles = document.querySelectorAll(".bottle");
    bottles.forEach((bottle) => {
        bottle.style.animation = "none";
        bottle.offsetHeight; // Trigger reflow
        bottle.style.animation = null;
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        },
        { threshold: 0.1 }
    );

    document
        .querySelectorAll(
            ".section, .characteristic, .gallery-image, .image-caption, .fade-in, .slide-in-left, .slide-in-right, .rotate-in"
        )
        .forEach((el) => observer.observe(el));

    const parallaxBg = document.querySelector(".parallax-bg");
    window.addEventListener("scroll", () => {
        const scrollPosition = window.pageYOffset;
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

    const fruits = document.querySelectorAll(".fruit");
    fruits.forEach((fruit, index) => {
        fruit.style.animationDelay = `${index * 2}s`;
    });
});