import galleryItems from "./prod.js";
import refs from "./refs.js";
const { list, modalDiv, img, closeBtn } = refs



function createEl(array) {
    
   return array.map(((element) => {
        
        const { preview, original, description } = element
        return `<li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>` 
    })).join('')
    
}
const markUp = createEl(galleryItems)
// рендер разметки
list.insertAdjacentHTML('afterbegin', markUp)
closeBtn.insertAdjacentHTML('afterbegin', '<img width=15 height=15 src="../images/cross-svgrepo-com.svg">')
// open modal
list.addEventListener('click', (e) => {
    console.log(e.target.nodeName);
    e.preventDefault()
    if(e.target.nodeName === 'IMG') {
      showElement(modalDiv)
    }
    const link = e.target.getAttribute('data-source')
    const altName = e.target.getAttribute('alt');
    img.setAttribute('alt', altName)
    img.setAttribute('src', link)
    
})



// close modal backdrop
modalDiv.addEventListener('click', (e) => {
  const condition =  e.target.classList.contains('lightbox__overlay'); 
    if (condition) {
        hideElement(modalDiv)
    }
})
// close modal X button
closeBtn.addEventListener('click', () => {
    hideElement(modalDiv)
})
// close modal esc button
window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
       hideElement(modalDiv)
   }
})

function showElement() {
     modalDiv.classList.add('is-open') 
}
function hideElement() {
    modalDiv.classList.remove('is-open')
    img.setAttribute('src', "")  // зачистка src
}
// const options = {
//     root: list,
//     rootMargin: '0px',
//     threshold: 0.5,
// }
// const observer = new IntersectionObserver(callback, options)
// function callback(entries) {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             console.log(entry.target);
//             entry.target.classList.add('observe')
//         } else {
//             entry.target.classList.remove('observe')
//         }
       
//     })
// }

// const items = [...list.children]
// console.log(items);

// items.forEach((item) => 
//  observer.observe(item)   
// )