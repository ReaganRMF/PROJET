const button = document.querySelector(".button");
const menu = document.querySelector(".menu");
const lien1 = document.querySelector("#lien1");
const lien2 = document.querySelector("#lien2");
const lien3 = document.querySelector("#lien3");

button.onclick = function () {
    button.classList.toggle("active");
    menu.classList.toggle("active");
};

lien1.onclick = function () {
    button.classList.toggle("active");
    menu.classList.toggle("active");
};
lien2.onclick = function () {
    button.classList.toggle("active");
    menu.classList.toggle("active");
};
lien3.onclick = function () {
    button.classList.toggle("active");
    menu.classList.toggle("active");
};

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

    /*// Ajouter des bulles animées dans le header
    const header = document.querySelector("header");
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.width = `${Math.random() * 30 + 10}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.animationDuration = `${Math.random() * 5 + 5}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        header.appendChild(bubble);
    }*/

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

    // Remplir progressivement le verre de vin
    setTimeout(() => {
        wineGlass.style.height = "60px";
    }, 1000);

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