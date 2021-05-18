import {getResource} from "../services/services";

function cards() {
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

    const menu = document.querySelector(".menu__field div.container");

    getResource("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                menu.append(new MenuCard(title, descr, price, img, altimg).render());
            });
        });

    // axios.get('http://localhost:3000/menu')
    //     .then(({data}) => {
    //                 data.forEach(({img, altimg, title, descr, price}) => {
    //                     menu.append(new MenuCard(title, descr, price, img, altimg).render());
    //                 });
    //             });

}

export default cards;