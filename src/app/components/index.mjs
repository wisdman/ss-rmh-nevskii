export { AbstractComponent } from "./abstract/index.mjs"
export * from "./carousel/carousel.mjs"
export * from "./detector/detector.mjs"
export * from "./loader/loader.mjs"
export * from "./mapping/mapping.mjs"
export * from "./player/player.mjs"
export * from "./slide/slide.mjs"
export * from "./slider/slider.mjs"

import { InitComponents } from "./abstract/index.mjs"
import * as COMPONENTS from "./index.mjs"
await InitComponents(COMPONENTS)