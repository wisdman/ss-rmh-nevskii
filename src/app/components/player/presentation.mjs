
const PRESENTATION_URL = `${window.location.origin}/presentation.html`


export class Presentation extends EventTarget {

  #connections = new Set()

  constructor({ master = false } = {}) {
    super()
    if (master) return this.#initMaster()
    return this.#initSlave()
  }

  #addConnection = connection => {
    connection.addEventListener("message", this.#onMessage)

    connection.addEventListener("close", ({reason}) => {
      console.log(`Connection closed: ${reason}`)
      this.#connections.delete(connection)
    })

    connection.addEventListener("terminated", (event) => {
      console.log(`Connection terminated: ${event}`)
      this.#connections.delete(connection)
    })

    this.#connections.add(connection)
  }

  #availability = async request => {
    try {
      const availability = await request.getAvailability()
      console.log(`Available presentation displays: ${availability.value}`)
      return availability.value
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  #initMaster = async () => {
    const request = new PresentationRequest(PRESENTATION_URL)
    // if (!(await this.#availability(request))) {
    //   // Open new tab for debug
    //   const connection = window.open(PRESENTATION_URL, "PRESENTATION")
    //   this.#connections.add(connection)
    //   return this
    // } else {
      const newConnection = await request.start()
      this.#connections.add(newConnection)
    // }

    this.#initListeners()
    return this
  }

  #initSlave = async () => {
    const connectionList = await navigator.presentation?.receiver?.connectionList
    if (connectionList instanceof PresentationConnectionList) {
      connectionList.connections.forEach(this.#addConnection)
      connectionList.addEventListener("connectionavailable", ({connection}) => this.#addConnection(connection))
    } else {
      this.#connections.add(window)
    }

    this.#initListeners()
    return this
  }

  #initListeners = () => {
    this.#connections.forEach(connection => connection.addEventListener("message", this.#onMessage))
  }

  #onMessage = ({data}) => {
    try {
      data = JSON.parse(data)
    } catch (error) {
      console.error("Incorrect message: ", error)
      return
    } 
    for (const [message, detail] of Object.entries(data)) {
      this.dispatchEvent(new CustomEvent(message, { detail }))
    }
  }

  send = (messageData = {}) => {
    const message = JSON.stringify(messageData)
    this.#connections.forEach(connection => {
      if (connection instanceof PresentationConnection) {
        connection.send(message)
        return
      }

      if (connection instanceof Window) {
        connection.postMessage(message, PRESENTATION_URL)
        return
      }
    })
  }
}
