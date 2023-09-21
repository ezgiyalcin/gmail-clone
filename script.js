import { months, categories } from "./constants.js"
import { renderMails, showModal, renderCategories } from "./ui.js"

const strMailData = localStorage.getItem("data")
const mailData = JSON.parse(strMailData)

const hamburgerMenu = document.querySelector(".hamburger-menu")
const navigation = document.querySelector("nav")

const mailsArea = document.querySelector(".mails-area")
const createMail = document.querySelector(".create-mail")
const modal = document.querySelector(".modal-wrapper")
const closeBtn = document.querySelector("#close-btn")
const createMailForm = document.querySelector(".create-mail-form")
const categoryArea = document.querySelector(".nav-middle")
const searchButton = document.querySelector("#search-icon")
const searchInput = document.querySelector("#search-input")


hamburgerMenu.addEventListener("click", handleMenu)

searchButton.addEventListener("click", searchMails)
createMail.addEventListener("click", () => showModal(modal, true))
closeBtn.addEventListener("click", () => showModal(modal, false))
createMailForm.addEventListener("submit", sendMail)


mailsArea.addEventListener("click", updateMail)

categoryArea.addEventListener("click", watchCategory)

document.addEventListener("DOMContentLoaded", () => {
    renderCategories(categoryArea,categories, "Inbox")
    renderMails(mailsArea, mailData)
    if (window.innerWidth < 1100) {
        navigation.classList.add('hide')
    }
})


window.addEventListener("resize", (e) => {

    const width = e.target.innerWidth
    if (width < 1100) {
        navigation.classList.add('hide')
    }
    else {
        navigation.classList.remove('hide')
    }
}
)

function handleMenu() {
    navigation.classList.toggle("hide")
}

function getDate() {
    const dateArr = new Date();
    const day = dateArr.getDay().toString();
    const month = dateArr.getMonth();
    const year = dateArr.getFullYear();
    const monthName = months[month]
    return [day, monthName].join(" ")

}


function sendMail(e) {
    e.preventDefault();
    const receiver = e.target[0].value
    const title = e.target[1].value
    const message = e.target[2].value
    if (!receiver || !title || !message) {

        Toastify({
            text: "Please fill the form.",
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                borderRadius: "4px",
            },
        }).showToast();
        return
    }


    const newMail = {
        id: new Date().getTime(),
        sender: "Ezgi",
        receiver,
        title,
        starred: false,
        message,
        date: getDate(),

    }

    mailData.unshift(newMail)

    const strData = JSON.stringify(mailData)
    localStorage.setItem("data", strData)

    renderMails(mailsArea, mailData)

    showModal(modal, false)

    e.target[0].value = ''
    e.target[1].value = ''
    e.target[2].value = ''

    Toastify({
        text: "Your mail sent succesfully.",
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        duration: 3000,
        style: {
            background: '#7CFC00',
            color: 'white',
            borderRadius: "4px",
        },
    }).showToast();




}


function updateMail(e) {
    const mail = e.target.parentElement.parentElement
    const mailId = mail.dataset.id
    if (e.target.id === 'delete') {

        const filteredData = mailData.filter((i) => i.id != mailId)
        const strData = JSON.stringify(filteredData)
        localStorage.setItem('data', strData)
        mail.remove()
    }
    if (e.target.id === 'star') {

        const foundMail = mailData.find((i) => i.id == mailId)
        const updatedItem = { ...foundMail, stared: !foundMail.stared }
        const index = mailData.findIndex((i) => i.id == mailId)
        mailData[index] = updatedItem
        JSON.stringify(mailData)
        localStorage.setItem("data", JSON.stringify(mailData))
        renderMails(mailsArea, mailData)
      
    }
}

function watchCategory(e){
    const selectedCategory = e.target.dataset.name
    
    renderCategories(categoryArea, categories , selectedCategory)

    if (selectedCategory=== "Starred"){
       const filteredMails=  mailData.filter((i)=> i.stared === true)
        renderMails(mailsArea,filteredMails)
        return
    }
    renderMails(mailsArea,mailData)
}
function searchMails(){
  const filteredData = mailData.filter((i)=>i.message.toLowerCase().includes(searchInput.value.toLowerCase()))
   renderMails(mailsArea,filteredData)
}