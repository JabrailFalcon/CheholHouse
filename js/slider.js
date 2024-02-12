const modal = document.querySelector('.modal__container'),
      btnUae = document.querySelector('.map__btn__uae'),
      btnUA = document.querySelector('.map__btn__ukr'),
      btnClose = document.querySelector('.CloseModal');

//console.log(btnMap.length);
// Исходные данные по слайду (const)
const sliderItem = document.querySelectorAll('.slider__item'),
    sliderContent = document.querySelectorAll('.slider__content'),
    sliderBtnNext = document.querySelector('.slider__btn-next'),
    sliderBtnPrev = document.querySelector('.slider__btn-prev'),
    sliderContainer = document.querySelector('.slider__container'),
    contentUAE = document.querySelector('.__uae'),
    contentUA = document.querySelector('.__ukr');

let sliderDots,
    itemCount = 0, 
    sliderWidht = sliderContainer.offsetWidth,
    targetCountry = 0,
    targetItemCount = 0;

window.addEventListener('resize', showSlide);

btnUae.addEventListener('click', function () {
    sliderContent[1].style.display = 'none';
    modal.classList.add('__show');
    targetCountry = 0; 
    targetItemCount = contentUAE.childElementCount;
    createDot(); 
    sliderDots = document.querySelectorAll('.slider__dot');
    showSlide();
    clickDot();
    checkedWith();
});

btnUA.addEventListener('click', function() {
    sliderContent[0].style.display = 'none';
    modal.classList.add('__show');
    targetCountry = 1;
    targetItemCount = contentUA.childElementCount;
    createDot(); 
    sliderDots = document.querySelectorAll('.slider__dot');
    showSlide();
    clickDot();
    checkedWith();
});

btnClose.addEventListener('click', function () {
    modal.classList.remove('__show');
    location.reload();
});


// Адаптивность слайдера
//window.addEventListener('resize', showSlide);
//
sliderBtnNext.addEventListener('click', nextSlide);
sliderBtnPrev.addEventListener('click', prevSlide);

// Автоматическое перелистывание слайдов
/*
setInterval(() => {
    nextSlide()
 }, 3000);
*/



// Задаем нужную ширену item и sliderContent
function showSlide() {
    sliderWidht = sliderContainer.offsetWidth;
    sliderContent[targetCountry].style.width = sliderWidht * targetItemCount + 'px';
    sliderItem.forEach(item => item.style.width = sliderWidht + 'px');
    //stepSlide();
    
}

// Перелистываем слайд вперед
function nextSlide() {
    itemCount++;
    if (itemCount >= targetItemCount) itemCount = 0;

    stepSlide();
    thisSlider(itemCount);
}

// Перелистываем слайд назад
function prevSlide() {
    itemCount--;
    if (itemCount < 0) itemCount = targetItemCount - 1;

    stepSlide();
    thisSlider(itemCount);
}

// Задает шаг перемещения слайдов
function stepSlide() {
    sliderContent[targetCountry].style.transform = `translateX(${-itemCount * sliderWidht}px)`;
}

// создаем dot
function createDot() {
    const sliderWrapper = document.querySelector('div.slider__wrapper');
    let n = targetItemCount -1;

    for (let i = 0; i <= n; i++) {
        if (n > 0) {
            const elemDot = document.createElement('div');
            sliderWrapper.appendChild(elemDot);
            elemDot.classList.add('slider__dot');
        } else {
            break
        }
    }

    sliderDots = document.querySelectorAll('.slider__dot');
    activeFirst();
}

function deleteDot() {
    const sliderWrapper = document.querySelector('div.slider__wrapper');
    let n = targetItemCount -1;

    for (let i = 0; i <= n; i++) {
        if (n > 0) {
            while (sliderWrapper.firstChild) {
                sliderWrapper.removeChild(sliderWrapper.firstChild);
            }
        } else {
            break
        }
    }
}


function activeFirst() {
    if (targetItemCount > 1) sliderDots[0].classList.add('active-dot');

};

// Указывает какой dot по счету активен
function thisSlider(index) {
    sliderDots.forEach(item => item.classList.remove('active-dot'));
    sliderDots[index].classList.add('active-dot');
}

// Вешает клик на dot

function clickDot(){
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            console.log('click');
            itemCount = index;
            stepSlide();
            thisSlider(itemCount);
        })
    });
};

function checkedWith() {
    if(sliderContent[targetCountry].style.width === '0px')
    {
        location.reload();
    }

}