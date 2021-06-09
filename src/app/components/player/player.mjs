import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

// const 

export class PlayerComponent extends AbstractComponent {
  static TAG_NAME = "ss-player"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  #video = document.createElement("video")
  #canvas = this.$("canvas") ?? document.createElement("canvas")
  #gl = this.#canvas.getContext("webgl")

  #bigTriangleBuffer = (() => {
    const buffer = this.#gl.createBuffer()
    this.#gl.bindBuffer(this.#gl.ARRAY_BUFFER, buffer)
    this.#gl.bufferData(this.#gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 4, 4, -1]), this.#gl.STATIC_DRAW)
    return buffer
  })()

  play = url => {
    console.dir(url)
    this.#video.remove()
    this.#video.src = url
    this.root.appendChild(this.#video)
    this.#video.loop = true
    this.#video.muted = true
    this.#video.play()
  }

  dummy = () => {
    console.log("dummy")
  }

  #loop = timestamp => {

  }

  get #size() {
    const { width, height } = this.getBoundingClientRect()
    const ratio = width/height
    return { width, height, ratio }
  }

  connectedCallback() {
    const { width, height, ratio } = this.#size
    this.#canvas.width = width
    this.#canvas.height = height
    this.#gl.viewport(0, 0, width, height)

    this.#gl.pixelStorei(this.#gl.UNPACK_FLIP_Y_WEBGL, true)
  }

  disconnectedCallback() {
  }
}



// private initWebGL() {
//         const [width, height] = this.size
//         this.canvas.width = width
//         this.canvas.height = height

//         const gl = this.canvas.getContext("webgl")
//         if(!gl) {
//             throw new Error(`WebGL context creation error`)
//         }
//         gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
//         const buffer = gl.createBuffer()
//         gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
//         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 4, 4, -1]), // a-big-triangle
//         gl.STATIC_DRAW)
//         
//         return gl
//     }
