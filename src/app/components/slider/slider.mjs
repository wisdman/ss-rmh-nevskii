import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class SliderComponent extends AbstractComponent {
  static TAG_NAME = "ss-slider"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE
}


// <script type="module">
//     import { SliderComponent } from "./components/index.mjs"
//     void async function main(argument) {
//       const contentConfig = `/content${window.location.pathname}.json`
//       let contentData
//       try {
//         const response = await fetch(contentConfig)
//         contentData = await response.json()
//       } catch (error) {
//         document.body.innerHTML = `<h1>Incorrect SS data by path: ${contentConfig}</h1>`
//         return
//       }

//       const sliderNode = new SliderComponent(contentData)
//       document.body.appendChild(sliderNode)
//     }()
//   </script>