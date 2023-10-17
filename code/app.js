const modeBtn = document.getElementById('mode-btn')
const deleteBtn = document.getElementById('delete-btn')
const eraserBtn = document.getElementById('eraser-btn')
const colorOptions = Array.from(
  document.getElementsByClassName('color-option')
)
const color = document.getElementById('color')
const lineWidth = document.getElementById('line-width')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 800

canvas.width = 800
canvas.height = 800
ctx.lineWidth = lineWidth.value
let isPainting = false
let isFilling = false

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY)
    ctx.stroke()
    return
  }
  // To make all lines seperated depends on width and colours
  ctx.beginPath()
  ctx.moveTo(event.offsetX, event.offsetY)
}

function startPainting() {
  isPainting = true
}
function cancelPainting() {
  isPainting = false
}

function onLineWidthChange(event) {
  //Updated the ctx with new value
  ctx.lineWidth = event.target.value
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value
  ctx.fillStyle = event.target.value
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color
  ctx.strokeStyle = colorValue
  ctx.fillStyle = colorValue
  color.value = colorValue
}

function onModeClick() {
  if (isFilling) {
    isFilling = false
    modeBtn.innerText = 'Fill'
  } else {
    isFilling = true
    modeBtn.innerText = 'Draw'
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }
}

function onDeleteClick() {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

function onEraserClick() {
  ctx.strokeStyle = 'white'
  isFilling = false
  modeBtn.innerText = 'Fill'
}

function onMove(event) {
  if (isPainting) {
    if (isFilling) {
      ctx.lineTo(event.offsetX, event.offsetY)
      ctx.stroke()
    } else {
      ctx.lineTo(event.offsetX, event.offsetY)
      ctx.stroke()
    }
    return
  }
  // To make all lines separated depending on width and colors
  ctx.beginPath()
  ctx.moveTo(event.offsetX, event.offsetY)
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }
}

function onSaveClick() {
  const url = canvas.toDataURL()
  const a = document.createElement('a')
  a.href = url
  a.download = 'myDrawing.jpg'
  a.click()
}

function onModeClick() {
  if (isFilling) {
    isFilling = false
    modeBtn.innerText = 'Fill'
  } else {
    isFilling = true
    modeBtn.innerText = 'Draw'
  }
}

// All the user actions has to be an event
canvas.addEventListener('mousemove', onMove)
canvas.addEventListener('mousedown', startPainting)
canvas.addEventListener('mouseup', cancelPainting)
canvas.addEventListener('mouseleave', cancelPainting)
canvas.addEventListener('click', onCanvasClick)

lineWidth.addEventListener('change', onLineWidthChange)
color.addEventListener('change', onColorChange)


colorOptions.forEach(color => color.addEventListener('click', onColorClick))
modeBtn.addEventListener('click', onModeClick)
deleteBtn.addEventListener('click', onDeleteClick)
eraserBtn.addEventListener('click', onEraserClick)