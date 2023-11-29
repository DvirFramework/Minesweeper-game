var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['politic', 'funny'] },
              { id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog'] },
              { id: 3, url: 'img/3.jpg', keywords: ['cute', 'dog'] },
              { id: 4, url: 'img/4.jpg', keywords: ['cute', 'cat'] },
              { id: 5, url: 'img/5.jpg', keywords: ['cute', 'baby'] },
              { id: 6, url: 'img/6.jpg', keywords: ['funny', 'celeb'] },
              { id: 7, url: 'img/7.jpg', keywords: ['cute', 'baby'] },
              { id: 8, url: 'img/8.jpg', keywords: ['funny', 'clone'] },
              { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
              { id: 10, url: 'img/10.jpg', keywords: ['politic', 'funny'] }
]
var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel'
            ,
            size: 25,
            color: 'white',
            font: 'Impact', 
            align: 'center', 
            x: 50,
            y: 50,
            width: 0,
            height: 0
        },
        {
            txt: 'And create memes',
            size: 20,
            color: 'white',
            font: 'Impact', 
            align: 'center', 
            x: 50,
            y: 50,
            width: 0,
            height: 0
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme() {
    return gMeme
}

function setLineTxt(newTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
}

function setImg(selectedImgId) {
    gMeme.selectedImgId = selectedImgId
}

function setTextColor(newColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = newColor
}

function setFontSize(newSize) {
    gMeme.lines[gMeme.selectedLineIdx].size = newSize
}

function changeFontFamily() {
    const fontFamily = document.getElementById('fontFamilySelect').value
    gMeme.lines[gMeme.selectedLineIdx].font = fontFamily
    renderMeme(gMeme.selectedImgId)
}

function changeFontSize() {
    const fontSize = document.getElementById('fontSizeInput').value
    gMeme.lines[gMeme.selectedLineIdx].size = parseInt(fontSize)
    renderMeme(gMeme.selectedImgId)
}

