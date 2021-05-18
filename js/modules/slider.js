function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prevSliderButton = document.querySelector(prevArrow),
          nextSliderButton = document.querySelector(nextArrow),
          currentSlideSpan = document.querySelector(currentCounter),
          totalSlidesSpan = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = +window.getComputedStyle(slidesWrapper).width.match(/\d+/g);
    
    let slideIndex = 1;
    let offset = 0;

    const totalSlidesNum = slides.length;
    totalSlidesSpan.textContent = zeroFill(totalSlidesNum);

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    
    slidesWrapper.style.overflow = "hidden";

    slides.forEach(slide => {
        slide.style.width = width + "px";
    });

    slider.style.position = "relative";

    const indicators = document.createElement("ol"),
          dots = [];

    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    for (let i = 0; i < totalSlidesNum; i++) {
        const dot = document.createElement("li");
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add("dot");
        indicators.append(dot);
        dots.push(dot);
        if (i == 0) {
            dot.style.opacity = 1;
        }
    }

    updateCurrentSlideNum();

    dots.forEach(dot => {
        dot.addEventListener("click", e => {
            const slideTo = e.target.getAttribute("data-slide-to");
            slideIndex = slideTo;
            offset = width * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            updateCurrentSlideNum();
        });
    });

    prevSliderButton.addEventListener("click", () => {
        if (offset == 0) {
            offset = width * (slides.length - 1);
        } else {
            offset -= width;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex = slideIndex == 1 ? totalSlidesNum : slideIndex - 1;
        updateCurrentSlideNum();
    });

    nextSliderButton.addEventListener("click", () => {
        if (offset == width * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += width;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex = slideIndex == totalSlidesNum ? 1 : slideIndex + 1;
        updateCurrentSlideNum();
    });

    function updateCurrentSlideNum() {
        currentSlideSpan.textContent = zeroFill(slideIndex);

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex - 1].style.opacity = 1;
    }

    function zeroFill(num) {
        return +num > 9 ? num : `0${num}`;
    }
}

export default slider;