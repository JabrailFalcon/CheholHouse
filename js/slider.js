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
    sliderWidht = 0,
    targetCountry,
    targetItemCount = 0,
    touchStartX = 0,
    touchEndX = 0;

    

// Задаем нужную ширену item и sliderContent
window.addEventListener('resize', showSlide);

function reset() {
    targetItemCount = 0;
    itemCount = 0;
    sliderWidht = 0;
    touchStartX = 0;
    touchEndX = 0;

};

function showSlide() {
    sliderWidht = sliderContainer.offsetWidth;
    sliderContent[targetCountry].style.width = sliderWidht * targetItemCount + 'px';
    sliderItem.forEach(item => item.style.width = sliderWidht + 'px');
    stepSlide();  
}

function init() {  
    showSlide(); 
    createDot(); 
    sliderDots = document.querySelectorAll('.slider__dot');
    clickDot();
    checkedWith();
    //swiper();
} 

btnUae.addEventListener('click', function () {
    reset();
    targetCountry = 0;
    if (sliderContent[0].style.display === 'none'){
        sliderContent[0].style.display = 'flex';
    }
    sliderContent[1].style.display = 'none';   
   
    targetItemCount = contentUAE.childElementCount;  
    modal.classList.add('__show');  
    init();
});

btnUA.addEventListener('click', function() {
    reset();
    targetCountry = 1;
    if (sliderContent[1].style.display === 'none'){
        sliderContent[1].style.display = 'flex';
    }
    sliderContent[0].style.display = 'none';
    targetItemCount = contentUA.childElementCount;
    modal.classList.add('__show');
    init();
});                                                         



btnClose.addEventListener('click', function () {
    modal.classList.remove('__show');
    //location.reload();
    deleteDot();
});


// Адаптивность слайдера
//window.addEventListener('resize', showSlide);
//
sliderBtnNext.addEventListener('click', nextSlide);
sliderBtnPrev.addEventListener('click', prevSlide);

// swiper
function handleGesture() {
    if (touchEndX < touchStartX) {
        nextSlide();  
    } else if (touchEndX > touchStartX) {
        prevSlide();          
    }
  }

  sliderContent.forEach(iter => {
    swiper(iter);
  });

  function swiper(iter) {
     iter.addEventListener("touchstart", function (e) {
        touchStartX = e.touches[0].clientX;
      });
      
      iter.addEventListener("touchend", function (e) {
        touchEndX = e.changedTouches[0].clientX;
        handleGesture();
      });
  };
  
// Автоматическое перелистывание слайдов
/*
setInterval(() => {
    nextSlide()
 }, 3000);
*/
function activeFirst() {
    if (targetItemCount > 1) sliderDots[0].classList.add('active-dot');

};

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

// Задает шаг перемещения слайдов  "translate(-" + itemCount * sliderWidht + "px)"
function stepSlide() {
    sliderContent[targetCountry].style.transform = `translateX(${-itemCount * sliderWidht}px)`;
}

// Указывает какой dot по счету активен
function thisSlider(index) {
    sliderDots.forEach(item => item.classList.remove('active-dot'));
    sliderDots[index].classList.add('active-dot');
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
//

 // ->

// --------------------------------------
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

//
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