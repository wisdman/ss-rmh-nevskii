import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class CarouselComponent extends AbstractComponent {
  static TAG_NAME = "ss-carousel"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE
}
