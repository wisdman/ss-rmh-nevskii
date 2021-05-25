import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class SlideComponent extends AbstractComponent {
  static TAG_NAME = "ss-slide"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  constructor({ id, image, presentation } = {}) {
    super()
    this.dataset.presentation = presentation
    this.id = id
    this.$("img").src = image
  }

  #onPointeruUp(event) {
    event.stopPropagation()
    this.scrollIntoView({behavior: "smooth"})
  }

  connectedCallback() {
    this.addEventListener("pointerup", this.#onPointeruUp, { passive: true })
  }

  disconnectedCallback() {
    this.removeEventListener("pointerup", this.#onPointeruUp)
  }
}