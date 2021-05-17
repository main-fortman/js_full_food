function calc() {
// Calc

const result = document.querySelector(".calculating__result span");
let sex = localStorage.getItem("sex") || "female",
    height, 
    weight,
    age,
    ratio = +localStorage.getItem("ratio") || 1.375;

localStorage.setItem("sex", sex);
localStorage.setItem("ratio", ratio);

function initLocalSettings(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    elements.forEach(element => {
        element.classList.remove(activeClass);
        if (element.getAttribute("id") == localStorage.getItem("sex")) {
            element.classList.add(activeClass);
        }
        if (element.getAttribute("data-ratio") == localStorage.getItem("ratio")) {
            element.classList.add(activeClass);
        }
    });
}

function calcTotal() {
    if (!sex || !height || ! weight || !age || !ratio) {
        result.textContent = "xxxx";
        return;
    }

    if (sex == "female") {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}

function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    document.querySelector(parentSelector).addEventListener("click", e => {
        if (e.target.classList.contains("calculating__choose-item")) {
            if(e.target.getAttribute("data-ratio")) {
                ratio = +e.target.getAttribute("data-ratio");
                localStorage.setItem("ratio", ratio);
            } else {
                sex = e.target.getAttribute("id");
                localStorage.setItem("sex", sex);
            }

            elements.forEach(item => {
                item.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);

            calcTotal();
        }
    });
}

function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", () => {

        if (input.value.match(/\D/g)) {
            input.style.border = "1px solid red";
        } else {
            input.style.border = "none";
        }

        switch(input.getAttribute("id")) {
            case "height":
                height = +input.value;
                break;
            case "weight":
                weight = +input.value;
                break;
            case "age":
                age = +input.value;
                break;
        }

        calcTotal();
    });
}

calcTotal();
initLocalSettings("#gender", "calculating__choose-item_active");
initLocalSettings(".calculating__choose_big", "calculating__choose-item_active");

getStaticInformation("#gender", "calculating__choose-item_active");
getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");

getDynamicInformation("#height");
getDynamicInformation("#weight");
getDynamicInformation("#age");
}

module.exports = calc;