// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
const Canvas = props => {
  const { draw, ...rest } = props
  const canvasRef = useCanvas(props.draw)
  return <canvas ref={canvasRef} {...rest}/>
}

const useCanvas = draw => {
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId

    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return canvasRef
}

export default Canvas
