import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class CarouselComponent extends AbstractComponent {
  static TAG_NAME = "ss-carousel"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  #onSlidePointeruUp(event) {
    event.stopPropagation()
    event.path[0].scrollIntoView({behavior: "smooth"})
  }

  #intersectionObserverCallback = (entries) => {
    requestAnimationFrame(() => {
      entries.forEach(({target, intersectionRatio}) => target.style.setProperty("--intersection-ratio", intersectionRatio))
    })
  }

  #intersectionObserver = undefined
  
  connectedCallback() {
    const threshold = Number.parseInt(window.getComputedStyle(this).getPropertyValue("--ss-slide-threshold"))
    this.#intersectionObserver = new IntersectionObserver(this.#intersectionObserverCallback, {
      root: this.$(".wrapper"),
      threshold: Array.from(new Array(threshold), (_, i) => (i+1)/threshold),
    })

    this.$$(".slide").forEach(slideNode => {
      slideNode.addEventListener("pointerup", this.#onSlidePointeruUp, { passive: true })
      this.#intersectionObserver.observe(slideNode)
    })
  }

  disconnectedCallback() {
    this.$$(".slide").forEach(slideNode => {
      slideNode.removeEventListener("pointerup", this.#onSlidePointeruUp)
      this.#intersectionObserver.unobserve(slideNode)
    })
  }
}
