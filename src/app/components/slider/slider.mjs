import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class SliderComponent extends AbstractComponent {
  static TAG_NAME = "ss-slider"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  constructor({title, slides}) {
    super()
    console.log(title, slides)
  }
}