require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from "./modules/tabs";
import modal, {openModal} from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calc from "./modules/calc";
import slider from "./modules/slider";
import forms from "./modules/forms";

window.addEventListener("DOMContentLoaded", () => {
   
    const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 500000);

    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    modal("[data-modal]", ".modal");
    timer(".timer", "2021-06-01");
    cards();
    forms("form", modalTimerId);
    slider({
        container: ".offer__slider", 
        slide: ".offer__slide", 
        nextArrow: ".offer__slider-next", 
        prevArrow: ".offer__slider-prev", 
        totalCounter: "span#total", 
        currentCounter: "span#current", 
        wrapper: ".offer__slider-wrapper", 
        field: ".offer__slider-inner"
    });
    calc();
});