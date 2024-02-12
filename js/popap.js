const contact = document.querySelectorAll('.contact');

/*-------NOTIFICATION POPAP -------*/
const openPopap = document.querySelector('.open-popap');
const closePopap = document.querySelector('.close-popap');
const popap = document.querySelector(".popap");
const title = document.querySelectorAll(".icon");
const content = document.querySelector(".popap-content");

let currentItem = 0;
// openPopap.addEventListener('click', () => {
//     popap.showModal()
// })

closePopap.addEventListener('click', () => {
    popap.close();
    title[currentItem].style.display = "none";
})

popap.addEventListener('click', (e) => {
    if (e.target === popap) {
        popap.close();
        title[currentItem].style.display = "none";
    }
    
})

/*-------NOTIFICATION POPAP -------*/

contact.forEach((cont, index) => {
    cont.addEventListener('click', () => {
        ShowCarrentIcon(index)
    })
});

function ShowCarrentIcon(index) {
    currentItem = index;
    title[index].style.display = "block";
    content.innerText = title[index].dataset.text;
    popap.showModal();
    
};
