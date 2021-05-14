window.addEventListener("DOMContentLoaded", () => {
    
    const tabs = document.querySelectorAll(".tabheader__item");
    const tabsContent = document.querySelectorAll(".tabcontent");
    const tabsParent = document.querySelector(".tabheader__items");
            
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });
        tabs.forEach(tab => {
            tab.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", event => {
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = "2021-05-11";

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - new Date();
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t/ 1000) % 60);

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        return num;
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector("#days");
        const hours = timer.querySelector("#hours");
        const minutes = timer.querySelector("#minutes");
        const seconds = timer.querySelector("#seconds");

        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

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

    // const obj = {
    //     num: 5,
    //     say: function() {
    //         console.log(this.num);
    //         const say1 = () => {
    //             console.log(this.num);
    //         };
    //         say1();
    //     }
    // };

    // obj.say();

    // Menu

    class MenuCard {
        constructor(title, desc, price, img, alt, ...classes) {
            this.title = title;
            this.desc = desc;
            this.price = price;
            this.img = img;
            this.alt = alt;
            this.classes = classes.length ? classes : ["menu__item"];

            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const comp = document.createElement("div");
            this.classes.forEach(className => comp.classList.add(className));
            comp.innerHTML = `
                <img src="${this.img}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.desc}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            return comp;
        }
    }

    const getResource = async url => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    const menu = document.querySelector(".menu__field div.container");

    // getResource("http://localhost:3000/menu")
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             menu.append(new MenuCard(title, descr, price, img, altimg).render());
    //         });
    //     });

    axios.get('http://localhost:3000/menu')
        .then(({data}) => {
                    data.forEach(({img, altimg, title, descr, price}) => {
                        menu.append(new MenuCard(title, descr, price, img, altimg).render());
                    });
                });

    // Forms
    const forms = document.querySelectorAll("form");

    const msg = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро свяжемся!",
        failure: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });

        return await res.json();
    };

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

        openModal();

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
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

    // Slider
    const slides = document.querySelectorAll(".offer__slide"),
          prevSliderButton = document.querySelector(".offer__slider-prev"),
          nextSliderButton = document.querySelector(".offer__slider-next"),
          currentSlideSpan = document.querySelector("span#current"),
          totalSlidesSpan = document.querySelector("span#total"),
          slidesWrapper = document.querySelector(".offer__slider-wrapper"),
          slidesField = document.querySelector(".offer__slider-inner"),
          width = window.getComputedStyle(slidesWrapper).width;
    
    let slideIndex = 1;
    let offset = 0;

    updateCurrentSlideNum();

    const totalSlidesNum = slides.length;
    totalSlidesSpan.textContent = zeroFill(totalSlidesNum);

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    
    slidesWrapper.style.overflow = "hidden";

    slides.forEach(slide => {
        slide.style.width = width;
    });

    prevSliderButton.addEventListener("click", () => {
        if (offset == 0) {
            offset = Number.parseInt(width) * (slides.length - 1);
        } else {
            offset -= Number.parseInt(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex = slideIndex == 1 ? totalSlidesNum : slideIndex - 1;
        updateCurrentSlideNum();
    });

    nextSliderButton.addEventListener("click", () => {
        if (offset == Number.parseInt(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += Number.parseInt(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex = slideIndex == totalSlidesNum ? 1 : slideIndex + 1;
        updateCurrentSlideNum();
    });

    function updateCurrentSlideNum() {
        currentSlideSpan.textContent = zeroFill(slideIndex);
    }

    // showSlide();

    // prevSliderButton.addEventListener("click", () => {
    //     slideIndex = slideIndex == 1 ? totalSlidesNum : slideIndex - 1;
    //     showSlide();
    // });

    // nextSliderButton.addEventListener("click", () => {
    //     slideIndex = slideIndex == totalSlidesNum ? 1 : slideIndex + 1;
    //     showSlide();
    // });

    function zeroFill(num) {
        return +num > 9 ? num : `0${num}`;
    }

    // function showSlide() {
    //     slides.forEach( (slide, i) => {
    //         if (slideIndex == i + 1) {
    //             slide.classList.add("show");
    //             slide.classList.remove("hide");
    //         } else {
    //             slide.classList.add("hide");
    //             slide.classList.remove("show");
    //         }
    //     });
    //     currentSlideSpan.textContent = zeroFill(slideIndex);
    // }
});