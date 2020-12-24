const form = document.getElementsByClassName('shortForm')[0]
const largeLink = form.querySelector('.shortForm__link')
const formButton = form.querySelector('.shortForm__button')

const loading = form.querySelector('.shortForm__loading')

const validateInput = ()=>{
    if(largeLink.value == null || largeLink.value == ""){
        viewError("")
    }else if(largeLink.value !== null && largeLink.value !== ""){
        loading.classList.toggle('shortForm__loading-active')
        const regex = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/gm
        if(regex.test(largeLink.value)){
            hiddenError()
            getShortLink(largeLink.value)
        }else if(!regex.test(largeLink.value)){
            loading.classList.toggle('shortForm__loading-active')
            return viewError("invalid")
        }
    }
}

const getShortLink = async(largeLinkI)=>{
    await fetch(`https://api.shrtco.de/v2/shorten?url=${largeLinkI}`)
        .then(res => res.json() )
        .then(data=>{
           
            let link = largeLinkI

            const shortLinks = document.getElementsByClassName('shortLinks')[0]
            const fragment = document.createDocumentFragment()
            const shortLinks__item = document.createElement('div')

            shortLinks__item.classList.add('shortLinks__item')

            //  Parts of shortLinks__item
            const shortLinks__largeLink = document.createElement('p')
            shortLinks__largeLink.classList.add('shortLinks__largeLink')

            const regexHttp = /http(s)?:\/\//gm
            if(regexHttp.test(link)){
                shortLinks__largeLink.textContent = link
            }else if (!regexHttp.test(link)){
                shortLinks__largeLink.textContent = `https://${link}`
            }

            const shortLinks__box = document.createElement('div')
            shortLinks__box.classList.add('shortLinks__box')
            shortLinks__box.innerHTML = `
                    <a class="shortLinks__link" href="${data.result.full_short_link}" target="_blank">${data.result.full_short_link}</a>
                    <a class="shortLinks__button" href="#">Copy</a>
            `

            //  Add
            shortLinks__item.append(shortLinks__largeLink)
            shortLinks__item.append(shortLinks__box)

            fragment.append(shortLinks__item)
            shortLinks.append(fragment)
            loading.classList.toggle('shortForm__loading-active')
        })
        .catch(data =>{
            loading.classList.toggle('shortForm__loading-active')
            viewError("invalid")
        })
}

const viewError = (value)=>{
    const errForm = form.querySelector('.shortForm__error-invalid')
    errForm.classList.add('shortForm__error-active')
    largeLink.classList.add('shortForm__error-input')
    if(value == ""){
        errForm.textContent = 'Please add a Link'
    }else if(value == "invalid"){
        errForm.textContent = 'Insert a valid link'
    }
}

const hiddenError = ()=>{
    const errForm = form.querySelector('.shortForm__error-invalid')
    errForm.classList.remove('shortForm__error-active')
    largeLink.classList.remove('shortForm__error-input')
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    validateInput()
})