function modal() {
    // Modal

    const modal = document.querySelector(".modal");
    const feedbackOpenButtons = document.querySelectorAll("[data-modal]");
    
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = "hidden";
        
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        modal.classList.toggle("show");
        document.body.style.overflow = "";
    }

    feedbackOpenButtons.forEach( btn => {
        btn.addEventListener("click", openModal);
    });

    modal.addEventListener("click", event => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.code == "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 500000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;