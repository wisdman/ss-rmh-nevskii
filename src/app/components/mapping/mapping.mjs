import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"
import { FindHomography } from "./homography.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class MappingComponent extends AbstractComponent {
  static TAG_NAME = "ss-mapping"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  get #size() {
    const { width, height } = this.getBoundingClientRect()
    const ratio = width/height
    return { width, height, ratio }
  }

  #srcCords = []
  #defaultCorners = []

  map(corners = this.#defaultCorners) {
    console.log(corners)
    const matrix = FindHomography(this.#srcCords, corners)
    this.style.transform = `matrix3d(${matrix.join(",")})`
  }

  connectedCallback() {
    const { width, height } = this.#size
    
    this.#srcCords = [
        0   ,    0   , // [0] left-top
      width ,    0   , // [1] right-top
      width , height , // [2] right-bottom
        0   , height , // [3] left- bottom
    ]

    this.#defaultCorners = [
        0   ,    0   , // [0] left-top
      width ,    0   , // [1] right-top
      width , height , // [2] right-bottom
        0   , height , // [3] left- bottom
    ]
  }
}