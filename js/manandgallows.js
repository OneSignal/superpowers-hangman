import Canvas from './canvas';

const drawLine = (ctx, x, y, x2, y2) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

const drawCircle = (ctx, x, y, radius) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2, true);
  ctx.stroke();
}

const gallowsStrokeWidth = 5
const gallowsTop = 20
const gallowsLeft = 20
const gallowsHeight = 100
const gallowsWidth = 50
const gallowsHookHeight = 20
const bodyStrokeWidth = 3
const headSize = 10
const bodyLength = 30
const armLengthX = 15
const armLengthY = 10
const armStart = bodyLength / 3
const legLengthX = 15
const legLengthY = 20
const eyeWidth = 4
const eyeStrokeWidth = 1
const legStart = bodyLength
const bodyCenterline = gallowsLeft + gallowsWidth/2 + gallowsWidth
const topOfBody = gallowsTop + gallowsHookHeight + headSize + headSize

const gallows1 = (ctx) => {
  ctx.lineWidth = gallowsStrokeWidth
  drawLine(ctx,
           gallowsLeft,
           gallowsTop + gallowsHeight,
           gallowsLeft + gallowsWidth,
           gallowsTop + gallowsHeight
          )
}

const gallows2 = (ctx) => {
  ctx.lineWidth = gallowsStrokeWidth
  drawLine(ctx,
           gallowsLeft + gallowsWidth/2,
           gallowsTop,
           gallowsLeft + gallowsWidth/2,
           gallowsTop + gallowsHeight
          )
}

const gallows3 = (ctx) => {
  ctx.lineWidth = gallowsStrokeWidth
  drawLine(ctx,
           gallowsLeft + gallowsWidth/2,
           gallowsTop,
           gallowsLeft + gallowsWidth/2 + gallowsWidth,
           gallowsTop
          )
}

const gallows4 = (ctx) => {
  ctx.lineWidth = gallowsStrokeWidth
  drawLine(ctx,
           gallowsLeft + gallowsWidth/2 + gallowsWidth,
           gallowsTop,
           gallowsLeft + gallowsWidth/2 + gallowsWidth,
           gallowsTop + gallowsHookHeight
          )
}

const head = (ctx) => {
  ctx.lineWidth = bodyStrokeWidth
  drawCircle(
    ctx,
    gallowsLeft + gallowsWidth/2 + gallowsWidth,
    gallowsTop + gallowsHookHeight + headSize,
    headSize
  )
}

const body = (ctx) => {
  ctx.lineWidth = bodyStrokeWidth
  drawLine(ctx,
           bodyCenterline,
           topOfBody,
           bodyCenterline,
           topOfBody + bodyLength
          )
}
const leftArm = (ctx) => {
  ctx.lineWidth = bodyStrokeWidth
  drawLine(ctx,
           bodyCenterline,
           topOfBody + armStart,
           bodyCenterline - armLengthX,
           topOfBody + armStart - armLengthY
          )
}
const rightArm = (ctx) => {
  ctx.lineWidth = bodyStrokeWidth
  drawLine(ctx,
           bodyCenterline,
           topOfBody + armStart,
           bodyCenterline + armLengthX,
           topOfBody + armStart - armLengthY
          )
}
const leftLeg = (ctx) => {
  ctx.lineWidth = bodyStrokeWidth
  drawLine(ctx,
           bodyCenterline,
           topOfBody + legStart,
           bodyCenterline - legLengthX,
           topOfBody + legStart + legLengthY
          )
}
const rightLeg = (ctx) => {
  ctx.lineWidth = bodyStrokeWidth
  drawLine(ctx,
           bodyCenterline,
           topOfBody + legStart,
           bodyCenterline + legLengthX,
           topOfBody + legStart + legLengthY
          )
}

const drawX = (ctx, x, y, width, height) => {
  drawLine(ctx, x, y, x + width, y + height)
  drawLine(ctx, x, y + height, x + width, y)
}

const dead = (ctx) => {
  ctx.lineWidth = eyeStrokeWidth
  ctx.strokeStyle = 'red'
  drawX(ctx, bodyCenterline - headSize/2.5 - eyeWidth/2, topOfBody - headSize * 1.25, eyeWidth, eyeWidth)
  drawX(ctx, bodyCenterline + headSize/2.5 - eyeWidth/2, topOfBody - headSize * 1.25, eyeWidth, eyeWidth)
}

const stages = [
  gallows1,
  gallows2,
  gallows3,
  gallows4,

  head,
  body,
  leftArm,
  rightArm,
  leftLeg,
  rightLeg,

  dead,
]

export const maximumBadGuesses = stages.length - 1;

const ManAndGallows = (props) => {
  const hangmanDraw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#c0ffee'
    ctx.rect(0, 0, 200, 200);
    ctx.fill();

    ctx.strokeStyle = '#000000'

    stages.forEach((stage, i) => {
      if (i < props.badGuessCount) {
        stage.call(this, ctx)
      }
    })
  }

  return (
    <Canvas draw={hangmanDraw} />
  )
}

export default ManAndGallows
