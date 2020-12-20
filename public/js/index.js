/* ................MENU................ */
const menuToggle = document.getElementsByClassName('menu__img')[0]
const menu = document.getElementsByClassName('menu__box')[0]

menuToggle.addEventListener('click',()=>{
    menu.classList.toggle('menu__active')
})


/* ................FORM................ */
const form = document.getElementsByClassName('shortForm')[0]
const largeLink = form.querySelector('.shortForm__link')
const formButton = form.querySelector('.shortForm__button')

const validateInput = ()=>{
    if(largeLink.value == null || largeLink.value == ""){
        viewError("")
    }else if(largeLink.value !== null && largeLink.value !== ""){
        getShortLink(largeLink.value)
    }
}

const getShortLink = (largeLinkI)=>{
    fetch(`https://api.shrtco.de/v2/shorten?url=${largeLinkI}`)
        .then(res => res.json() )
        .then(data=>{
            if(!data.ok)    viewError("invalid")
            else if(data.ok)    hiddenError()
            const shortLinks = document.getElementsByClassName('shortLinks')[0]
            const fragment = document.createDocumentFragment()
            const shortLinks__item = document.createElement('div')

            shortLinks__item.classList.add('shortLinks__item')

            shortLinks__item.innerHTML = `
                <p class="shortLinks__largeLink">https://${largeLinkI}</p>
                <div class="shortLinks__box">
                    <a class="shortLinks__link" href="${data.result.full_short_link}" target="_blank">${data.result.full_short_link}</a>
                    <a class="shortLinks__button" href="#">Copy</a>
                </div>
            `
            fragment.append(shortLinks__item)
            shortLinks.append(fragment)
        })
}

const viewError = (value)=>{
    const errForm = form.querySelector('.shortForm__error-invalid')
    errForm.classList.add('shortForm__error-active')
    if(value == ""){
        errForm.textContent = 'Please add a Link'
    }else if(value == "invalid"){
        errForm.textContent = 'Insert a valid link'
    }
}

const hiddenError = ()=>{
    const errForm = form.querySelector('.shortForm__error-invalid')
    errForm.classList.remove('shortForm__error-active')
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    validateInput()
})