import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

const DEVICE_FILTER = ({kind}) => kind === "videoinput"
const MAX_ERRORS = 10

export class DetectorComponent extends AbstractComponent {
  static TAG_NAME = "ss-detector"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  #canvas = this.$("canvas")
  #ctx = this.#canvas.getContext("2d")

  #errorCount = 0
  get errorCount() { return this.#errorCount }
  set errorCount(value) { 
    this.#errorCount = value
    if (this.#errorCount > MAX_ERRORS) 
      window.location.reload()
  }

  #getVideoStream = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const [device] = devices.filter(DEVICE_FILTER)
      const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact : device.deviceId } } })
      return stream
    } catch (error) {
      console.error("Device detection error: ", error)
      this.errorCount++
      return null
    }
  }

  #detectionLoop = (imageСapturer, textDetector) => {
    const canvas = this.#canvas
    const ctx = this.#ctx
    return new Promise((_, reject) => {
      async function loop() {
        try {
          const frame = await imageСapturer.grabFrame()
          
          canvas.width = frame.width + 10
          canvas.height = frame.height + 10
          ctx.drawImage(frame, 5, 5, frame.width, frame.height)

          const textBlocks = await textDetector.detect(frame)

          ctx.lineWidth = 2
          ctx.strokeStyle = "red"

          for(let i = 0; i < textBlocks.length; i++) {
            const textBlock = textBlocks[i].boundingBox
            ctx.rect(5 + textBlock.x, 5 + textBlock.y, textBlock.width, textBlock.height)
            ctx.stroke()        
          }

        } catch(error) {
          reject(error)
          return
        }
        requestAnimationFrame(loop)
      }
      requestAnimationFrame(loop)
    })
  }

  #mainLoop = async () => {
    const stream = await this.#getVideoStream()
    if (!stream) this.#reloadMainLoop()
    
    const [track] = stream.getVideoTracks()
    const imageСapturer = new ImageCapture(track)
    const textDetector = new TextDetector()

    try {
      await this.#detectionLoop(imageСapturer, textDetector)
    } catch (error) {
      console.error("Image detection error: ", error)
      this.errorCount++
      this.#reloadMainLoop()
    }
  }

  #reloadMainLoop = () => setTimeout(this.#mainLoop, 100)         

  async connectedCallback() {
    this.#reloadMainLoop()
  }
}