const lineWidth = document.getElementById('line-width')
const color = document.getElementById('color')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 800
canvas.height = 800
ctx.lineWidth = lineWidth.value
let isPainting = false

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

// All the user actions has to be an event
canvas.addEventListener('mousemove', onMove)
canvas.addEventListener('mousedown', startPainting)
canvas.addEventListener('mouseup', cancelPainting)
canvas.addEventListener('mouseleave', cancelPainting)

lineWidth.addEventListener('change', onLineWidthChange)
color.addEventListener('change', onColorChange)
