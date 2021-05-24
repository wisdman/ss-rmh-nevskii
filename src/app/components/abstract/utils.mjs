
const MJS_RX = /\.mjs$/i

export const CSS = metaURL => metaURL.replace(MJS_RX,".css")
export const HTML = async metaURL => {
  const path = metaURL.replace(MJS_RX,".html")
  const response = await fetch(path)
  return await response.text()
}
