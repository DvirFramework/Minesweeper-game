
var gGalleryImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['politic', 'funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog'] }
]


function renderGallery() {
    const gallerySection = document.querySelector('.image-gallery')

    gallerySection.innerHTML = ''

    gGalleryImgs.forEach(img => {
        const imgElement = document.createElement('img')
        imgElement.src = img.url
        imgElement.alt = `Image ${img.id}`
        imgElement.addEventListener('click', function () {
            onImgSelect(img.id)
        })

        gallerySection.appendChild(imgElement)
    })
}


function onImgSelect(selectedImgId) {
    setImg(selectedImgId)
    renderMeme(selectedImgId)
}

document.addEventListener('DOMContentLoaded', function () {
    const galleryImages = document.querySelectorAll('.image-gallery img')
    galleryImages.forEach(imgElement => {
        imgElement.addEventListener('click', function () {
            const selectedImgId = parseInt(imgElement.getAttribute('data-img-id'))
            onImgSelect(selectedImgId)
        })
    })
})
