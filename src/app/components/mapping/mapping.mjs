import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"
import { FindHomography } from "./homography.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class MappingComponent extends AbstractComponent {
  static TAG_NAME = "ss-mapping"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  #surfaceNode = this.$(".surface")
  #corners = []

  constructor(corners = [0,0,1920,0,1920,1080,0,1080]) {
    super()
    this.#corners = corners
  }

  map([x1 = 0, y1 = 0, x2 = 0, y2 = 0, x3 = 0, y3 = 0, x4 = 0, y4 = 0] = this.#corners) {
    const matrix = FindHomography(
      this.offsetWidth, this.offsetHeight,
      x1, y1, x2, y2, x3, y3, x4, y4
    )
    this.style.transform = `matrix3d(${matrix.join(",")})`
    console.log(JSON.stringify(this.#corners))
  }

  connectedCallback() {
    this.map()
  }
}