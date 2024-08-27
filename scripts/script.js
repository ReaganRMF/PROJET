document.addEventListener("DOMContentLoaded", () => {
    const wineCards = document.querySelectorAll(".wine-card");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.1 }
    );

    wineCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(50px)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // Animation de flottement pour les cartes de vin
    wineCards.forEach((card) => {
        card.addEventListener("mouseover", () => {
            card.style.animation = "float 3s ease-in-out infinite";
        });
        card.addEventListener("mouseout", () => {
            card.style.animation = "none";
        });
    });

    // Animation de balancement pour les images de vin
    const wineImages = document.querySelectorAll(".wine-image");
    wineImages.forEach((image) => {
        image.addEventListener("mouseover", () => {
            image.style.animation = "sway 2s ease-in-out infinite";
        });
        image.addEventListener("mouseout", () => {
            image.style.animation = "none";
        });
    });

    // Ajouter des gouttes de vin animées
    wineCards.forEach((card) => {
        setInterval(() => {
            const drop = document.createElement("div");
            drop.classList.add("wine-drop");
            drop.style.left = `${Math.random() * 100}%`;
            card.appendChild(drop);
            setTimeout(() => {
                drop.remove();
            }, 2000);
        }, 3000);
    });

    // Ajouter des étincelles sur les boutons CTA
    const ctaButtons = document.querySelectorAll(".cta-button");
    ctaButtons.forEach((button) => {
        button.addEventListener("mouseover", () => {
            for (let i = 0; i < 5; i++) {
                const sparkle = document.createElement("div");
                sparkle.classList.add("sparkle");
                sparkle.style.left = `${Math.random() * 100}%`;
                sparkle.style.top = `${Math.random() * 100}%`;
                button.appendChild(sparkle);
                setTimeout(() => {
                    sparkle.remove();
                }, 1500);
            }
        });
    });

    // Animation du bouchon qui saute
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("cta-button")) {
            const cork = document.createElement("div");
            cork.classList.add("cork-pop");
            cork.style.left = `${e.clientX}px`;
            cork.style.top = `${e.clientY}px`;
            document.body.appendChild(cork);
            setTimeout(() => {
                cork.remove();
            }, 2000);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const wineGlass = document.querySelector(".wine");
    const infoCards = document.querySelectorAll(".info-card");

    /*// Remplir progressivement le verre de vin
    setTimeout(() => {
        wineGlass.style.height = "60px";
    }, 1000);*/

    // Faire apparaître les cartes d'information
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.1 }
    );

    infoCards.forEach((card) => {
        observer.observe(card);
    });

    // Ajouter des raisins flottants
    const main = document.querySelector("main");
    for (let i = 0; i < 5; i++) {
        const grape = document.createElement("span");
        grape.textContent = "🍇";
        grape.classList.add("floating-grape");
        grape.style.left = `${Math.random() * 100}%`;
        grape.style.top = `${Math.random() * 100}%`;
        grape.style.animationDelay = `${Math.random() * 2}s`;
        main.appendChild(grape);
    }

    // Ajouter des tourbillons
    for (let i = 0; i < 3; i++) {
        const swirl = document.createElement("div");
        swirl.classList.add("swirl");
        swirl.style.left = `${Math.random() * 100}%`;
        swirl.style.top = `${Math.random() * 100}%`;
        swirl.style.animationDelay = `${Math.random() * 2}s`;
        main.appendChild(swirl);
    }
});
document.addEventListener("DOMContentLoaded", (event) => {
    const gallery = document.querySelector(".gallery-container");
    const prevBtn = document.querySelector(".gallery-nav.prev");
    const nextBtn = document.querySelector(".gallery-nav.next");
    const dotsContainer = document.querySelector(".gallery-dots");
    const items = document.querySelectorAll(".gallery-item");
    let currentIndex = 0;

    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("gallery-dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => showImage(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".gallery-dot");

    function showImage(index) {
        gallery.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });
        currentIndex = index;
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % items.length;
        showImage(currentIndex);
    });

    // Auto-scroll
    let interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        showImage(currentIndex);
    }, 5000);

    // Pause auto-scroll on hover
    const galleryWrapper = document.querySelector(".gallery-wrapper");
    galleryWrapper.addEventListener("mouseenter", () => {
        clearInterval(interval);
    });

    galleryWrapper.addEventListener("mouseleave", () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            showImage(currentIndex);
        }, 5000);
    });
});

(function () {
    emailjs.init("QRjp7UxToZssAA_Lk");

    const form = document.getElementById("email-form");
    const statusMessage = document.getElementById("status-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Envoi en cours...";

        emailjs.sendForm("service_1u6gp6v", "template_y69f6ei", this).then(
            function () {
                showStatus("Message envoyé avec succès !", "success");
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = "Envoyer l'email";
            },
            function (error) {
                showStatus(
                    "Erreur lors de l'envoi du message. Veuillez réessayer.",
                    "error"
                );
                submitButton.disabled = false;
                submitButton.textContent = "Envoyer l'email";
            }
        );
    });

    document
        .getElementById("whatsapp-btn")
        .addEventListener("click", function () {
            const phoneNumber = "+243813297352";
            const message = encodeURIComponent(
                "Bonjour, je vous contacte à propos de vos vins."
            );
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
        });

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = type;
        statusMessage.classList.add("show-status");

        setTimeout(() => {
            statusMessage.classList.remove("show-status");
        }, 5000);
    }

    // Animations des champs de formulaire
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
        input.addEventListener("focus", function () {
            this.style.transform = "scale(1.02)";
        });
        input.addEventListener("blur", function () {
            this.style.transform = "scale(1)";
        });
    });
})();

// Script pour créer des bulles animées
function createBubbles() {
    const footer = document.querySelector('.footer');
    const bubbleCount = 20;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

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

    // Smooth scroll for anchor links
    links.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            let target = document.querySelector(this.getAttribute("href"));
            gsap.to(window, { duration: 1, scrollTo: target });
        });
    });

    // Update active link on scroll
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

    window.addEventListener("scroll", updateActiveLink);

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

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections
    gsap.utils.toArray(".section").forEach((section, index) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
            },
        });

        tl.to(section, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
        })
            .to(
                section.querySelector("h2"),
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.6"
            )
            .to(
                section.querySelectorAll("p"),
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.2,
                },
                "-=0.6"
            )
            .to(
                section.querySelector(".btn"),
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.4"
            )
            .to(
                section.querySelectorAll(".highlight"),
                {
                    backgroundSize: "100% 0.3em",
                    duration: 0.8,
                    stagger: 0.2,
                },
                "-=0.8"
            );

        if (index % 2 === 0) {
            tl.from(
                section.querySelector("img"),
                {
                    x: -100,
                    opacity: 0,
                    duration: 1,
                },
                "-=1"
            );
        } else {
            tl.from(
                section.querySelector("img"),
                {
                    x: 100,
                    opacity: 0,
                    duration: 1,
                },
                "-=1"
            );
        }
    });

    // Parallax effect
    gsap.utils.toArray(".image-container").forEach((container) => {
        gsap.to(container, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                scrub: true,
            },
        });
    });

    // Floating animation for the first image
    gsap.to(".float-animation", {
        y: -20,
        rotation: 2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
    });

    // Bubble animation
    const bubblesContainer = document.querySelector(".bubbles");
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.width = `${Math.random() * 20 + 10}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.animationDelay = `${Math.random() * 4}s`;
        bubblesContainer.appendChild(bubble);
    }

    // Text reveal animation
    gsap.utils.toArray("p").forEach((p) => {
        let words = p.textContent.split(" ");
        p.innerHTML = words
            .map((word) => `<span class="word">${word}</span>`)
            .join(" ");

        gsap.from(p.querySelectorAll(".word"), {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.05,
            scrollTrigger: {
                trigger: p,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });
    });
});