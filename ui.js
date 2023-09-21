function trimString(str, maxWidth) {
  if (str.lenght < maxWidth) return str;

  return str.slice(0, maxWidth) + '...'
}


export function renderMails(outlet, data) {

  if (!data) return;
  /* console.log(outlet,data) */

  outlet.innerHTML = data.map((mail) => `
    <div class="mail" data-id=${mail.id}>
            <div class="mail-left">
              <input type="checkbox"/>
              <i id="star" class="bi bi-star 
              ${mail.stared && "star-active" }"></i>
              <span>${mail.sender}</span>
            </div>
            <div class="mail-right">
              <p class="message-title">${trimString(mail.title, 15)}</p>
              <p class="message-desc">
                ${trimString(mail.message, 40)}
              </p>
              <p class="message-date">${mail.date}</p>

              <button id="delete">Delete</button>
            </div>
          </div>
    `).join(" ")


}

export function showModal(modal, willOpen) {

  modal.style.display = willOpen ? "grid" : "none"

}

export function renderCategories(outlet, data, selectedCategory) {
  outlet.innerHTML = ''
  
  data.forEach((category) => {
      const categoryItem = document.createElement("a")
      categoryItem.dataset.name = category.title
      categoryItem.className = selectedCategory === category.title && "active-category"
      categoryItem.innerHTML = `
          <i class="${category.class}"></i>
          <span>${category.title}</span>
              
              `;
              outlet.appendChild(categoryItem)
  })
}