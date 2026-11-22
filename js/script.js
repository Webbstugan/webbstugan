
/* =========================================
   WEBBSTUGAN - JAVASCRIPT
========================================= */

// 1. MOBILE MENU

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Stäng meny" : "Öppna meny"
        );
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Öppna meny");
        });
    });
}


// 2. SCROLL ANIMATIONS

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


// 3. FOOTER YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// 4. CLOSE MENU WHEN RESIZING

window.addEventListener("resize", () => {

    if (window.innerWidth > 700 && navLinks && menuToggle) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Öppna meny");
    }

});


// 5. CONTACT FORM

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Skickar...";
        formStatus.textContent = "";
        formStatus.className = "form-status";

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            const result = await response.json();

            if (response.ok && result.success) {

                formStatus.textContent =
                    "Tack för din förfrågan! Vi har tagit emot ditt meddelande och återkommer så snart vi kan.";

                formStatus.classList.add("success");

                contactForm.reset();

            } else {

                throw new Error("Formuläret kunde inte skickas.");

            }

        } catch (error) {

            formStatus.textContent =
                "Det gick inte att skicka meddelandet just nu. Försök igen eller mejla oss direkt på webbstugan.kontakt@gmail.com.";

            formStatus.classList.add("error");

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;

        }

    });

}