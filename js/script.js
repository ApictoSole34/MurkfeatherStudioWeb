document.addEventListener("DOMContentLoaded", () => {


    /* =========================================================
       PROJECT ACCORDION
    ========================================================= */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach((card) => {

        const toggle =
            card.querySelector(".project-toggle");

        const toggleText =
            card.querySelector(".toggle-text");


        if (!toggle) {
            return;
        }


        toggle.addEventListener("click", () => {

            const isOpen =
                card.classList.contains("is-open");


            projectCards.forEach((otherCard) => {

                if (otherCard === card) {
                    return;
                }


                otherCard.classList.remove("is-open");


                const otherToggle =
                    otherCard.querySelector(
                        ".project-toggle"
                    );

                const otherToggleText =
                    otherCard.querySelector(
                        ".toggle-text"
                    );


                if (otherToggle) {

                    otherToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                if (otherToggleText) {

                    otherToggleText.textContent =
                        "Expand project";

                }

            });


            if (isOpen) {

                card.classList.remove("is-open");


                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                if (toggleText) {

                    toggleText.textContent =
                        "Expand project";

                }

            } else {

                card.classList.add("is-open");


                toggle.setAttribute(
                    "aria-expanded",
                    "true"
                );


                if (toggleText) {

                    toggleText.textContent =
                        "Collapse project";

                }


                setTimeout(() => {

                    card.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 150);

            }

        });

    });



    /* =========================================================
       LIGHTBOX
    ========================================================= */

    const projectImages =
        document.querySelectorAll(
            ".project-image img"
        );


    const lightbox =
        document.createElement("div");


    lightbox.className =
        "lightbox";


    lightbox.innerHTML = `

        <button
            class="lightbox-close"
            type="button"
            aria-label="Close"
        >
            ×
        </button>

        <img
            class="lightbox-image"
            src=""
            alt=""
        >

        <video
            class="lightbox-video"
            controls
            playsinline
        ></video>

    `;


    document.body.appendChild(
        lightbox
    );


    const lightboxImage =
        lightbox.querySelector(
            ".lightbox-image"
        );


    const lightboxVideo =
        lightbox.querySelector(
            ".lightbox-video"
        );


    const lightboxClose =
        lightbox.querySelector(
            ".lightbox-close"
        );


    function resetLightboxMedia() {

        lightboxImage.style.display =
            "none";


        lightboxVideo.style.display =
            "none";


        lightboxVideo.pause();


        lightboxVideo.removeAttribute(
            "src"
        );


        lightboxVideo.load();

    }


    function openImageLightbox(image) {

        resetLightboxMedia();


        lightboxImage.src =
            image.src;


        lightboxImage.alt =
            image.alt;


        lightboxImage.style.display =
            "block";


        lightbox.classList.add(
            "is-visible"
        );


        document.body.style.overflow =
            "hidden";

    }


    function openVideoLightbox(
        src,
        startTime = 0
    ) {

        resetLightboxMedia();


        lightboxVideo.src =
            src;


        lightboxVideo.style.display =
            "block";


        lightbox.classList.add(
            "is-visible"
        );


        document.body.style.overflow =
            "hidden";


        lightboxVideo.currentTime =
            startTime;


        lightboxVideo.play().catch(
            () => {}
        );

    }


    function closeLightbox() {

        lightbox.classList.remove(
            "is-visible"
        );


        document.body.style.overflow =
            "";


        lightboxVideo.pause();

    }


    projectImages.forEach((image) => {

        image.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                openImageLightbox(image);

            }
        );

    });



    /* =========================================================
       PROJECT VIDEO LIGHTBOX
    ========================================================= */

    const projectVideos =
        document.querySelectorAll(
            ".project-video"
        );


    projectVideos.forEach((videoWrapper) => {

        const video =
            videoWrapper.querySelector(
                "video"
            );


        if (!video) {
            return;
        }


        const source =
            video.querySelector(
                "source"
            );


        const videoSrc =
            source
                ? source.src
                : video.src;


        const expandButton =
            document.createElement(
                "button"
            );


        expandButton.type =
            "button";


        expandButton.className =
            "video-expand-btn";


        expandButton.setAttribute(
            "aria-label",
            "Enlarge video"
        );


        expandButton.innerHTML =
            "⤢";


        videoWrapper.appendChild(
            expandButton
        );


        expandButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                openVideoLightbox(
                    videoSrc,
                    video.currentTime
                );

            }
        );

    });



    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );


    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );



    /* =========================================================
       CERTIFICATE VIEWER
    ========================================================= */

    const certificateButtons =
        document.querySelectorAll(
            ".certificate-view"
        );


    const certificateModal =
        document.querySelector(
            ".certificate-modal"
        );


    const certificateModalContent =
        document.querySelector(
            ".certificate-modal-content"
        );


    const certificateModalTitle =
        document.querySelector(
            ".certificate-modal-title"
        );


    const certificateModalImage =
        document.querySelector(
            ".certificate-modal-image"
        );


    const certificateModalPdf =
        document.querySelector(
            ".certificate-modal-pdf"
        );


    const certificateModalClose =
        document.querySelector(
            ".certificate-modal-close"
        );


    const certificateModalFrame =
        document.querySelector(
            ".certificate-modal-frame"
        );


    function openCertificate(button) {

        if (!certificateModal) {
            return;
        }


        const path =
            button.dataset.certificate;


        const type =
            button.dataset.certificateType;


        const title =
            button.dataset.certificateTitle ||
            "Certificate";


        if (!path) {

            console.error(
                "Certificate path is missing."
            );

            return;

        }


        certificateModalTitle.textContent =
            title;


        certificateModalImage.style.display =
            "none";


        certificateModalPdf.style.display =
            "none";


        certificateModalImage.removeAttribute(
            "src"
        );


        certificateModalPdf.removeAttribute(
            "src"
        );


        certificateModalFrame.classList.remove(
            "image-mode",
            "pdf-mode"
        );


        if (type === "image") {

            certificateModalImage.src =
                path;


            certificateModalImage.style.display =
                "block";


            certificateModalFrame.classList.add(
                "image-mode"
            );

        }


        if (type === "pdf") {

            certificateModalPdf.src =
                path;


            certificateModalPdf.style.display =
                "block";


            certificateModalFrame.classList.add(
                "pdf-mode"
            );

        }


        certificateModal.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";


        requestAnimationFrame(() => {

            certificateModal.classList.add(
                "show"
            );

        });

    }


    function closeCertificate() {

        if (!certificateModal) {
            return;
        }


        certificateModal.classList.remove(
            "show"
        );


        setTimeout(() => {

            certificateModal.classList.remove(
                "active"
            );


            certificateModalImage.removeAttribute(
                "src"
            );


            certificateModalPdf.removeAttribute(
                "src"
            );


            document.body.style.overflow =
                "";

        }, 300);

    }


    certificateButtons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                openCertificate(button);

            }
        );

    });


    certificateModalClose.addEventListener(
        "click",
        closeCertificate
    );


    certificateModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                certificateModal
            ) {

                closeCertificate();

            }

        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                if (
                    certificateModal.classList.contains(
                        "active"
                    )
                ) {

                    closeCertificate();

                }


                if (
                    lightbox.classList.contains(
                        "is-visible"
                    )
                ) {

                    closeLightbox();

                }

            }

        }
    );

});