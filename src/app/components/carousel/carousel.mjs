import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

const DEBOUNCE = 750

export class CarouselComponent extends AbstractComponent {
  static TAG_NAME = "ss-carousel"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  #lastSlide = undefined
  #lastUpdate = performance.now()
  #onSliderIntersecting = target => {
    this.dispatchEvent(new CustomEvent("active", { detail: target }))
    setTimeout(() => {
      if (performance.now() - this.#lastUpdate > DEBOUNCE && this.#lastSlide !== target) {
        this.#lastSlide = target
        this.dispatchEvent(new CustomEvent("select", { detail: this.#lastSlide }))
      }
    }, DEBOUNCE)
    this.#lastUpdate = performance.now()
  }

  #intersectionObserverCallback = (entries) => {
    requestAnimationFrame(() => {
      entries.forEach(({target, intersectionRatio}) => {
        target.style.setProperty("--intersection-ratio", intersectionRatio)
      })
    })
    entries.forEach(({target, intersectionRatio}) => {
      if (intersectionRatio === 1) this.#onSliderIntersecting(target)
    })
  }

  #intersectionObserver = undefined
  
  connectedCallback() {
    const threshold = Number.parseInt(window.getComputedStyle(this).getPropertyValue("--ss-slide-threshold"))
    this.#intersectionObserver = new IntersectionObserver(this.#intersectionObserverCallback, {
      root: this.$(".wrapper"),
      threshold: Array.from(new Array(threshold), (_, i) => (i+1)/threshold),
    })

    this.$$("ss-slide").forEach(slideNode => this.#intersectionObserver.observe(slideNode))
  }

  disconnectedCallback() {
    this.$$("ss-slide").forEach(slideNode => this.#intersectionObserver.unobserve(slideNode))
  }

  reset = () => {
    this.$(".wrapper").scrollTo(0, 0)
    this.#onSliderIntersecting(this.firstElementChild)
  }
}
