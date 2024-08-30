// Script pour créer des bulles animées
function createBubbles() {
    const footer = document.querySelector(".footer");
    const bubbleCount = 20;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        const size = Math.random() * 30 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 4 + 4}s`;
        bubble.style.animationDelay = `${Math.random() * 2}s`;

        footer.appendChild(bubble);
    }
}

// Appeler la fonction pour créer les bulles
createBubbles();

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    const header = document.querySelector("header");
    const menuIcon = document.querySelector(".menu-icon");
    const nav = document.querySelector("nav ul");
    const links = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll(".section");
    let lastScrollTop = 0;

    // Toggle menu on mobile
    menuIcon.addEventListener("click", () => {
        nav.classList.toggle("show");
        gsap.from("nav ul li", {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
        });
    });

    // Scroll animation for header
    window.addEventListener(
        "scroll",
        () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                header.classList.remove("scroll-up");
                header.classList.add("scroll-down");
            } else {
                header.classList.remove("scroll-down");
                header.classList.add("scroll-up");
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        },
        false
    );

    /*/ Smooth scroll for anchor links
      links.forEach((link) => {
          link.addEventListener("click", function (e) {
              e.preventDefault();
              let target = document.querySelector(this.getAttribute("href"));
              gsap.to(window, { duration: 1, scrollTo: target });
          });
      });*/

    /*// Update active link on scroll
      function updateActiveLink() {
          let fromTop = window.scrollY + header.offsetHeight + 1;
  
          links.forEach((link) => {
              let section = document.querySelector(link.hash);
  
              if (
                  section.offsetTop <= fromTop &&
                  section.offsetTop + section.offsetHeight > fromTop
              ) {
                  link.classList.add("active");
              } else {
                  link.classList.remove("active");
              }
          });
      }
  
      window.addEventListener("scroll", updateActiveLink);*/

    // Progress bar
    function updateProgressBar() {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    }

    window.addEventListener("scroll", updateProgressBar);

    // GSAP animations for sections
    sections.forEach((section, index) => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse",
            },
        });
    });

    // Logo animation
    gsap.to(".logo-icon", {
        rotation: 360,
        duration: 2,
        ease: "elastic.out(1, 0.3)",
        scrollTrigger: {
            trigger: "header",
            start: "top top",
            end: "bottom top",
            toggleActions: "play none none reverse",
        },
    });
});


//script pour l'annimation du logo
document.addEventListener("DOMContentLoaded", (event) => {
    const svg = document.querySelector(".mon_logo");
    svg.addEventListener("click", () => {
        svg.style.transform = "scale(1.1)";
        svg.style.transition = "transform 0.3s ease-in-out";
        setTimeout(() => {
            svg.style.transform = "scale(1)";
        }, 300);
    });
});

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


document.getElementById("lien-whatsapp").addEventListener("click", function () {
    const phoneNumber = "+243813297352";
    const message = encodeURIComponent(
        "Bonjour, je vous contacte à propos de vos vins."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
});

document.getElementById("lien-gmail").addEventListener("click", () => {
    const subject = "Bonjour devellopeur";
    const message =
        "Je vous contacte apropos du site giardino king, je voudrait en savoir plus sur ça";

    window.location.href = `mailto:reaganfukibulu43@gmail.com?${subject}=${message}`;
});