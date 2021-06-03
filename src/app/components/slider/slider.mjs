import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"
import { SlideComponent } from "../slide/slide.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class SliderComponent extends AbstractComponent {
  static TAG_NAME = "ss-slider"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  #currentSlideNode = this.$(".current-slide")
  set #currentSlide(value) {
    requestAnimationFrame(() => this.#currentSlideNode.innerText = value)
  }

  #presentationMaster = undefined
  constructor({title = "Incorrect title", slides = []} = {}, presentationMaster ) {
    super()
    this.#presentationMaster = presentationMaster
    this.$(".header").innerText = title
    this.#initSlides(slides)
  }

  #initSlides = (slides) => {
    this.$(".slides-count").innerText = slides.length
    
    const carouselNode = this.$("ss-carousel")
    slides.forEach((slideData, id) => {
      const slideNode = new SlideComponent({...slideData, id: id + 1})
      carouselNode.appendChild(slideNode)
    })
  }

  #onSlideActive = ({detail:{id}}) => this.#currentSlide = id
  #onSelectSlide = ({detail:{dataset}}) => this.#presentationMaster?.send({play: dataset.presentation ?? "" })

  async connectedCallback() {
    const carouselNode = this.$("ss-carousel")
    carouselNode.addEventListener("active", this.#onSlideActive, { passive: true })
    carouselNode.addEventListener("select", this.#onSelectSlide, { passive: true })
    setTimeout(carouselNode.reset, 100)
  }

  disconnectedCallback() {
    this.$("ss-carousel").removeEventListener("active", this.#onSlideActive)
    this.$("ss-carousel").removeEventListener("select", this.#onSelectSlide)
  }

  reset = () => this.$("ss-carousel").reset({ behavior: "smooth" })
}