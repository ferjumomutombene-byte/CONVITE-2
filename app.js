/* =====================================================
   ANTÓNIO & SARIA
   CONVITE DIGITAL PREMIUM
   APP.JS — VERSÃO COMPLETA
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTOS PRINCIPAIS
    ================================================= */

    const openingScreen =
        document.getElementById("opening-screen");

    const openButton =
        document.getElementById("open-invitation");

    const music =
        document.getElementById("wedding-music");

    const musicButton =
        document.getElementById("music-button");

    const menuToggle =
        document.getElementById("menu-toggle");

    const mobileMenu =
        document.getElementById("mobile-menu");

    const mobileMenuClose =
        document.getElementById("mobile-menu-close");


    /* =================================================
       ESTADO
    ================================================= */

    let musicPlaying = false;

    let guestName = "";

    let selectedGift = null;


    /* =================================================
       CONVIDADO PERSONALIZADO
    ================================================= */

    function getGuestName() {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const name =
            params.get("convidado");

        if (!name) {
            return "";
        }

        return decodeURIComponent(name)
            .replace(/\+/g, " ")
            .trim();

    }


    guestName =
        getGuestName();


    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }


    function personalizeInvitation() {

        if (!guestName) {
            return;
        }


        const guestInput =
            document.getElementById(
                "guest-name"
            );


        if (guestInput) {

            guestInput.value =
                guestName;

        }


        const heroText =
            document.querySelector(
                ".hero-text"
            );


        if (heroText) {

            heroText.innerHTML = `
                É uma alegria ter
                <strong>${escapeHTML(guestName)}</strong>
                conosco neste momento tão especial.
            `;

        }


        const openingContent =
            document.querySelector(
                ".opening-content"
            );


        if (openingContent) {

            const existing =
                document.querySelector(
                    ".guest-welcome"
                );


            if (!existing) {

                const welcome =
                    document.createElement(
                        "p"
                    );

                welcome.className =
                    "guest-welcome";

                welcome.innerHTML = `
                    Preparámos este convite
                    especialmente para
                    <strong>
                        ${escapeHTML(guestName)}
                    </strong>
                `;

                const button =
                    openingContent.querySelector(
                        "#open-invitation"
                    );

                openingContent.insertBefore(
                    welcome,
                    button
                );

            }

        }

    }


    personalizeInvitation();


    /* =================================================
       TELA DE ABERTURA
    ================================================= */

    if (openButton) {

        openButton.addEventListener(
            "click",
            () => {

                if (openingScreen) {

                    openingScreen.classList.add(
                        "hidden"
                    );

                }

                document.body.style.overflow =
                    "auto";


                startMusic();

            }
        );

    }


    /* =================================================
       MÚSICA
    ================================================= */

    function startMusic() {

        if (!music) {
            return;
        }


        music.volume = 0.35;


        const playPromise =
            music.play();


        if (
            playPromise &&
            typeof playPromise.then ===
                "function"
        ) {

            playPromise
                .then(() => {

                    musicPlaying = true;

                    updateMusicButton();

                })
                .catch(() => {

                    musicPlaying = false;

                    updateMusicButton();

                });

        }

    }


    function updateMusicButton() {

        if (!musicButton) {
            return;
        }


        musicButton.innerHTML =
            musicPlaying
                ? "❚❚"
                : "♫";


        musicButton.setAttribute(
            "aria-label",
            musicPlaying
                ? "Pausar música"
                : "Reproduzir música"
        );

    }


    if (musicButton) {

        musicButton.addEventListener(
            "click",
            () => {

                if (!music) {
                    return;
                }


                if (musicPlaying) {

                    music.pause();

                    musicPlaying =
                        false;

                } else {

                    music.play()
                        .then(() => {

                            musicPlaying =
                                true;

                            updateMusicButton();

                        })
                        .catch(() => {});

                    return;

                }


                updateMusicButton();

            }
        );

    }


    /* =================================================
       MENU MOBILE
    ================================================= */

    function openMobileMenu() {

        if (!mobileMenu) {
            return;
        }

        mobileMenu.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeMobileMenu() {

        if (!mobileMenu) {
            return;
        }

        mobileMenu.classList.remove(
            "active"
        );

        if (
            !openingScreen ||
            openingScreen.classList.contains(
                "hidden"
            )
        ) {

            document.body.style.overflow =
                "auto";

        }

    }


    menuToggle?.addEventListener(
        "click",
        openMobileMenu
    );


    mobileMenuClose?.addEventListener(
        "click",
        closeMobileMenu
    );


    document
        .querySelectorAll(
            ".mobile-menu a"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    /* =================================================
       NAVEGAÇÃO AO ROLAR
    ================================================= */

    const navigation =
        document.querySelector(
            ".premium-nav"
        );


    let lastScroll =
        window.scrollY;


    window.addEventListener(
        "scroll",
        () => {

            if (!navigation) {
                return;
            }


            const currentScroll =
                window.scrollY;


            if (
                currentScroll > 50
            ) {

                navigation.classList.add(
                    "nav-scrolled"
                );

            } else {

                navigation.classList.remove(
                    "nav-scrolled"
                );

            }


            if (
                currentScroll >
                    lastScroll &&
                currentScroll >
                    140
            ) {

                navigation.classList.add(
                    "nav-hidden"
                );

            } else {

                navigation.classList.remove(
                    "nav-hidden"
                );

            }


            lastScroll =
                currentScroll;

        },
        {
            passive: true
        }
    );


    /* =================================================
       GALERIA — LIGHTBOX
    ================================================= */

    const galleryPhotos =
        document.querySelectorAll(
            ".gallery-photo"
        );


    if (galleryPhotos.length) {

        createLightbox();


        galleryPhotos.forEach(
            (photo, index) => {

                photo.style.cursor =
                    "zoom-in";


                photo.addEventListener(
                    "click",
                    () => {

                        openLightbox(index);

                    }
                );

            }
        );

    }


    let currentGalleryIndex =
        0;


    let lightbox =
        null;


    let lightboxImage =
        null;


    let lightboxCounter =
        null;


    function createLightbox() {

        lightbox =
            document.createElement(
                "div"
            );

        lightbox.id =
            "premium-lightbox";

        lightbox.innerHTML = `

            <div class="lightbox-backdrop"></div>

            <button
                class="lightbox-close"
                aria-label="Fechar galeria"
            >
                ×
            </button>

            <button
                class="lightbox-prev"
                aria-label="Foto anterior"
            >
                ‹
            </button>

            <div class="lightbox-content">

                <img
                    class="lightbox-image"
                    alt="Fotografia do casamento"
                >

                <div
                    class="lightbox-counter"
                ></div>

            </div>

            <button
                class="lightbox-next"
                aria-label="Próxima foto"
            >
                ›
            </button>

        `;


        document.body.appendChild(
            lightbox
        );


        lightboxImage =
            lightbox.querySelector(
                ".lightbox-image"
            );


        lightboxCounter =
            lightbox.querySelector(
                ".lightbox-counter"
            );


        lightbox
            .querySelector(
                ".lightbox-close"
            )
            .addEventListener(
                "click",
                closeLightbox
            );


        lightbox
            .querySelector(
                ".lightbox-backdrop"
            )
            .addEventListener(
                "click",
                closeLightbox
            );


        lightbox
            .querySelector(
                ".lightbox-prev"
            )
            .addEventListener(
                "click",
                previousPhoto
            );


        lightbox
            .querySelector(
                ".lightbox-next"
            )
            .addEventListener(
                "click",
                nextPhoto
            );

    }


    function getGalleryImage(index) {

        const photo =
            galleryPhotos[index];


        if (!photo) {
            return "";
        }


        const computedStyle =
            window.getComputedStyle(
                photo
            );


        const backgroundImage =
            computedStyle.backgroundImage;


        const match =
            backgroundImage.match(
                /url\(["']?(.*?)["']?\)/
            );


        if (!match) {
            return "";
        }


        return match[1];

    }


    function openLightbox(index) {

        if (!lightbox) {
            return;
        }


        currentGalleryIndex =
            index;


        updateLightbox();


        lightbox.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    }


    function updateLightbox() {

        const image =
            getGalleryImage(
                currentGalleryIndex
            );


        if (lightboxImage && image) {

            lightboxImage.src =
                image;

        }


        if (lightboxCounter) {

            lightboxCounter.textContent =
                `${currentGalleryIndex + 1} / ${galleryPhotos.length}`;

        }

    }


    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );


        if (
            !mobileMenu ||
            !mobileMenu.classList.contains(
                "active"
            )
        ) {

            document.body.style.overflow =
                "auto";

        }

    }


    function nextPhoto() {

        if (!galleryPhotos.length) {
            return;
        }


        currentGalleryIndex =
            (
                currentGalleryIndex + 1
            ) %
            galleryPhotos.length;


        updateLightbox();

    }


    function previousPhoto() {

        if (!galleryPhotos.length) {
            return;
        }


        currentGalleryIndex =
            (
                currentGalleryIndex -
                1 +
                galleryPhotos.length
            ) %
            galleryPhotos.length;


        updateLightbox();

    }


    /* =================================================
       TECLADO DA GALERIA
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                nextPhoto();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousPhoto();

            }

        }
    );


    /* =================================================
       SWIPE DA GALERIA
    ================================================= */

    let touchStartX =
        0;


    let touchEndX =
        0;


    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        lightbox.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0]
                        .screenX;


                const difference =
                    touchStartX -
                    touchEndX;


                if (
                    Math.abs(difference) <
                    50
                ) {
                    return;
                }


                if (difference > 0) {

                    nextPhoto();

                } else {

                    previousPhoto();

                }

            },
            {
                passive: true
            }
        );

    }


    /* =================================================
       GOOGLE MAPS
    ================================================= */

    const mapButton =
        document.getElementById(
            "map-button"
        );


    if (mapButton) {

        mapButton.addEventListener(
            "click",
            () => {

                /*
                 * COLOQUE AQUI O LINK REAL
                 * DO LOCAL DO CASAMENTO.
                 */

                const mapURL =
                    "https://www.google.com/maps";


                window.open(
                    mapURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* =================================================
       PRESENTES
    ================================================= */

    const gifts = [

        {
            id: 1,
            name: "Presente 01",
            available: 5
        },

        {
            id: 2,
            name: "Presente 02",
            available: 3
        },

        {
            id: 3,
            name: "Presente 03",
            available: 1
        },

        {
            id: 4,
            name: "Presente 04",
            available: 4
        },

        {
            id: 5,
            name: "Presente 05",
            available: 2
        },

        {
            id: 6,
            name: "Presente 06",
            available: 5
        }

    ];


    function renderGifts() {

        const container =
            document.getElementById(
                "gift-list"
            );


        if (!container) {
            return;
        }


        container.innerHTML = "";


        gifts.forEach(
            gift => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "gift-card";


                card.innerHTML = `

                    <h3>
                        ${escapeHTML(
                            gift.name
                        )}
                    </h3>

                    <p>
                        Disponibilidade:
                        ${gift.available}
                    </p>

                    <button
                        class="gift-button"
                        data-gift="${gift.id}"
                        ${
                            gift.available <= 0
                                ? "disabled"
                                : ""
                        }
                    >
                        ${
                            gift.available <= 0
                                ? "Indisponível"
                                : "Escolher presente"
                        }
                    </button>

                `;


                container.appendChild(
                    card
                );

            }
        );

    }


    renderGifts();


    const giftList =
        document.getElementById(
            "gift-list"
        );


    giftList?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".gift-button"
                );


            if (!button) {
                return;
            }


            const giftID =
                Number(
                    button.dataset.gift
                );


            const gift =
                gifts.find(
                    item =>
                        item.id ===
                        giftID
                );


            if (
                !gift ||
                gift.available <= 0
            ) {
                return;
            }


            const currentGuest =
                guestName ||
                document
                    .getElementById(
                        "guest-name"
                    )
                    ?.value
                    .trim() ||
                "Convidado";


            if (
                selectedGift !== null
            ) {

                alert(
                    "Você já escolheu um presente."
                );

                return;

            }


            const confirmed =
                window.confirm(
                    `${currentGuest}, deseja escolher ${gift.name}?`
                );


            if (!confirmed) {
                return;
            }


            gift.available--;

            selectedGift =
                gift.id;


            renderGifts();


            buttonSelectedState(
                gift.id
            );


            alert(
                `${gift.name} foi reservado para você.`
            );

        }
    );


    function buttonSelectedState(
        giftID
    ) {

        const buttons =
            document.querySelectorAll(
                ".gift-button"
            );


        buttons.forEach(
            button => {

                button.disabled =
                    true;


                if (
                    Number(
                        button.dataset.gift
                    ) === giftID
                ) {

                    button.textContent =
                        "Presente escolhido";

                }

            }
        );

    }


    /* =================================================
       RSVP
    ================================================= */

    const rsvpForm =
        document.getElementById(
            "rsvp-form"
        );


    rsvpForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "guest-name"
                    )
                    ?.value
                    .trim();


            const attendance =
                document
                    .getElementById(
                        "attendance"
                    )
                    ?.value;


            const guests =
                document
                    .getElementById(
                        "guests"
                    )
                    ?.value;


            const message =
                document
                    .getElementById(
                        "message"
                    )
                    ?.value
                    .trim();


            const result =
                document.getElementById(
                    "rsvp-message"
                );


            if (
                !name ||
                !attendance
            ) {

                if (result) {

                    result.textContent =
                        "Por favor, preencha os campos obrigatórios.";

                }

                return;

            }


            /*
             * NÚMERO DO WHATSAPP
             */

            const whatsappNumber =
                "258875696973";


            const attendanceText =
                attendance === "yes"
                    ? "SIM, estarei presente"
                    : "NÃO poderei estar presente";


            const whatsappMessage =

`Olá António & Saria! 💍

Aqui é ${name}.

CONFIRMAÇÃO DE PRESENÇA

Presença:
${attendanceText}

Número de pessoas:
${guests || "Não informado"}

Mensagem:
${message || "Sem mensagem"}

Convite digital desenvolvido por Fluxo Digital MZ.`;


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    whatsappMessage
                )}`;


            if (result) {

                result.textContent =
                    "A abrir o WhatsApp para enviar a sua confirmação...";

            }


            setTimeout(
                () => {

                    window.open(
                        whatsappURL,
                        "_blank",
                        "noopener,noreferrer"
                    );

                },
                300
            );

        }
    );


    /* =================================================
       REVEAL — ANIMAÇÕES AO ROLAR
    ================================================= */

    const revealElements =
        document.querySelectorAll(
            `
            .section-container,
            .story-item,
            .couple-photo,
            .schedule-item,
            .gallery-photo,
            .gift-card,
            .map-card
            `
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal"
                );


                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =================================================
       EFEITO PARALLAX SUAVE NO HERO
    ================================================= */

    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (!heroImage) {
                return;
            }


            const scroll =
                window.scrollY;


            if (
                scroll <
                window.innerHeight
            ) {

                heroImage.style.transform =
                    `scale(1.08) translateY(${scroll * 0.08}px)`;

            }

        },
        {
            passive: true
        }
    );


    /* =================================================
       LINK SUAVE
    ================================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView(
                        {
                            behavior:
                                "smooth",
                            block:
                                "start"
                        }
                    );

                }
            );

        });


    /* =================================================
       INICIALIZAÇÃO
    ================================================= */

    updateMusicButton();


    /*
     * Mantém a página bloqueada
     * enquanto a abertura estiver visível.
     */

    if (
        openingScreen &&
        !openingScreen.classList.contains(
            "hidden"
        )
    ) {

        document.body.style.overflow =
            "hidden";

    } else {

        document.body.style.overflow =
            "auto";

    }

});
