const iMove = document.querySelectorAll('._iMove');
const word = document.querySelector('._drobWord');

function AnimateWord(word){
    let text = word.dataset.text;
    text.split('').forEach((letter,ind) => {
    let span = document.createElement('span');
    span.innerText = letter;
    if (letter == '|') span.classList.add('_iMove', 'Flash', '_active');
    setTimeout(()=> word.append(span),ind*200);
  })
}



if(iMove.length > 0) {
    window.addEventListener('scroll', iMoveOnScroll);   
}

function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.scrollX  || document.documentElement.scrollLeft,
        scrollTop = window.scrollY  || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }    
}

function iMoveOnScroll() {
    iMove.forEach(elem => {
       
        let iMovePoint = offset(elem).top;
       
        if (elem.clientHeight > window.innerHeight) {
            iMovePoint = window.innerHeight - window.innerHeight / 4;    
        }
        if((window.scrollY + window.innerHeight) > iMovePoint && window.scrollY < (iMovePoint + elem.clientHeight / 4) && !elem.classList.contains('_active'))
        {
            setTimeout(() => {
                elem.classList.add('_active');
            }, elem.getAttribute('delay'))
            
        }
        if(window.scrollY > (iMovePoint + elem.clientHeight) && !elem.classList.contains('noReplay') || window.scrollY + window.innerHeight < iMovePoint && !elem.classList.contains('noReplay')) {
            elem.classList.remove('_active');
        }
       
    });    
}

setTimeout(() => { 
    iMoveOnScroll();
    AnimateWord(word);
}, 300);

