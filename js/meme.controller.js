
const gCanvas = document.getElementById('canvas')
const gCtx = gCanvas.getContext('2d')
const textInput = document.getElementById('textInput')

const colorPicker = document.getElementById('colorPicker')
const increaseFontSizeBtn = document.getElementById('increaseFontSize')
const decreaseFontSizeBtn = document.getElementById('decreaseFontSize')

const addLineBtn = document.getElementById('addLineBtn')
addLineBtn.addEventListener('click', addNewLine)

const switchLineBtn = document.getElementById('switchLineBtn')
switchLineBtn.addEventListener('click', switchLine)

colorPicker.addEventListener('input', handleColorChange)
increaseFontSizeBtn.addEventListener('click', increaseFontSize)
decreaseFontSizeBtn.addEventListener('click', decreaseFontSize)

gCanvas.addEventListener('click', onTextClick)


const selectedImgId = 2


renderMeme(selectedImgId)


function renderMeme(selectedImgId) {
    const selectedImg = gImgs.find(img => img.id === selectedImgId)
    const img = new Image()


    img.src = selectedImg.url
    img.onload = function () {
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)


        gMeme.lines.forEach((memeLine, idx) => {
            gCtx.font = `${memeLine.size}px Impact`
            gCtx.fillStyle = memeLine.color
            gCtx.strokeStyle = 'black'
            gCtx.lineWidth = 2

            const textX = gCanvas.width / 2 - gCtx.measureText(memeLine.txt).width / 2
            const textY = 50 + idx * 30

            if (idx === gMeme.selectedLineIdx) {
                gCtx.beginPath()
                gCtx.rect(textX - 5, textY - 5, gCtx.measureText(memeLine.txt).width + 10, -memeLine.size - 10)
                gCtx.strokeStyle = 'black'
                gCtx.stroke()
            }

            gCtx.fillText(memeLine.txt, textX, textY)
            gCtx.strokeText(memeLine.txt, textX, textY)
        })

        updateDownloadLink()
    }
}

function updateDownloadLink() {
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = gCanvas.toDataURL();
}

textInput.addEventListener('input', function () {
    const newText = textInput.value
    setLineTxt(newText)
    renderMeme(gMeme.selectedImgId)
})



function handleColorChange(event) {
    const newColor = event.target.value
    setTextColor(newColor)
    renderMeme(gMeme.selectedImgId)
}


function increaseFontSize() {
    setFontSize(gMeme.lines[gMeme.selectedLineIdx].size + 2)
    renderMeme(gMeme.selectedImgId)
}


function decreaseFontSize() {
    setFontSize(gMeme.lines[gMeme.selectedLineIdx].size - 2)
    renderMeme(gMeme.selectedImgId)
}

function addNewLine() {
    gMeme.lines.push({
        txt: 'New line',
        size: 20,
        color: 'white'
    })
    renderMeme(gMeme.selectedImgId)
}

function switchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
    renderMeme(gMeme.selectedImgId)
}

function shareToFacebook() {
    alert('Sharing to Facebook...')
}
