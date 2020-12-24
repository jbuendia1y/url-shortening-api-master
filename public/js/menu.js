const menuToggle = document.getElementsByClassName('menu__img')[0]
const menu = document.getElementsByClassName('menu__box')[0]

menuToggle.addEventListener('click',()=>{
    menu.classList.toggle('menu__active')
})

