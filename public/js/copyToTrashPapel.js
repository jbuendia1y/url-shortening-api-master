const shortLinks = document.getElementsByClassName('shortLinks')[0]

const copyListen = (e)=>{
    e.preventDefault()
    if(e.target.className == 'shortLinks__button'){
        copyToTrashPapel(e.target.previousElementSibling.textContent)
        changeButtonCopy(e.target)
    }
}
const copyToTrashPapel = (text)=>{
    var aux = document.createElement("input");
    aux.setAttribute("value", text);

    document.body.appendChild(aux);

    aux.select();

    document.execCommand("copy");
    document.body.removeChild(aux);
}

const changeButtonCopy = (button)=>{
    button.classList.add('shortLinks__button-copied')
    let text = button.textContent
    button.textContent = 'Copied!'

    setTimeout(()=>{
        button.classList.remove('shortLinks__button-copied')
        button.textContent = text
    },1000)
}

if(shortLinks.childElementCount === 0){
    shortLinks.addEventListener('click',copyListen)
}