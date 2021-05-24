export { AbstractComponent } from "./abstract/index.mjs"
export * from "./carousel/carousel.mjs"
export * from "./slider/slider.mjs"

import { InitComponents } from "./abstract/index.mjs"
import * as COMPONENTS from "./index.mjs"
await InitComponents(COMPONENTS)