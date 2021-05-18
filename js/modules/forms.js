import {closeModal, openModal} from "./modal";
import {postData} from "../services/services";

function forms(formSelector, modalTimerId) {
    // Forms
    const forms = document.querySelectorAll(formSelector);

    const msg = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро свяжемся!",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener("submit", event => {
            event.preventDefault();

            const statusMsg = document.createElement("img");
            statusMsg.src = msg.loading;
            statusMsg.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMsg);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(msg.success);
                form.reset();
                statusMsg.remove();
            }).catch(() => {
                showThanksModal(msg.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add('hide');

        openModal(".modal", modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal(".modal");
        }, 4000);
    }
}

export default forms;