import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class PlayerComponent extends AbstractComponent {
  static TAG_NAME = "ss-player"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE
}