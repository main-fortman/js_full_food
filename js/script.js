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

    const feedbackPopup = document.querySelector(".modal");
    const feedbackCloseButton = document.querySelector("[data-close]");
    const feedbackOpenButtons = document.querySelectorAll("[data-modal]");
    
    function openModal() {
        feedbackPopup.classList.toggle("show");
        document.body.style.overflow = "hidden";
        
        // clearInterval(modalTimerId);
    }

    function closeModal() {
        feedbackPopup.classList.toggle("show");
        document.body.style.overflow = "";
    }

    feedbackOpenButtons.forEach( btn => {
        btn.addEventListener("click", openModal);
    });

    feedbackCloseButton.addEventListener("click", closeModal);

    feedbackPopup.addEventListener("click", event => {
        if (event.target === feedbackPopup) {
            closeModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.code == "Escape" && feedbackPopup.classList.contains("show")) {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);

    const obj = {
        num: 5,
        say: function() {
            console.log(this.num);
            const say1 = () => {
                console.log(this.num);
            };
            say1();
        }
    };

    obj.say();

    // Menu

    class MenuCard {
        constructor(title, desc, price, img, alt) {
            this.title = title;
            this.desc = desc;
            this.price = price;
            this.img = img;
            this.alt = alt;
            this.transfer = 27;

            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const comp = document.createElement("div");
            comp.classList.add("menu__item");
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

    const menuItems = [
        new MenuCard(
            'Меню "Фитнес',
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            8,
            'img/tabs/vegy.jpg',
            'vegy'
        ),
        new MenuCard(
            'Меню “Премиум”',
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            12,
            'img/tabs/elite.jpg',
            'elite'
        ),
        new MenuCard(
            'Меню "Постное"',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            10,
            'img/tabs/post.jpg',
            'post'
        )
    ];

    const menu = document.querySelector(".menu__field div.container");
    menuItems.forEach(menuItem => {
        menu.append(menuItem.render());
    });
});