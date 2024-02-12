// let header = document.createElement('header');
// header.className = "header";
// let containet = document.createElement('div');
// containet.className = "container";
// let logo = document.createElement('h1');
// logo.className = "logo";
// document.body.append(header);
// header.append(containet);

const btnBurger = document.querySelector('.burger__btn'),
      menu = document.querySelector('.burger');

btnBurger.addEventListener('click', function() {
    menu.classList.toggle('active');
    btnBurger.innerHTML = menu.classList.contains('active')? btnBurger.innerHTML = "&#x2A09;" : "&#9776;";
});


