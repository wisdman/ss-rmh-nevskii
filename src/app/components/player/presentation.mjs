
const PRESENTATION_URL = `${window.location.origin}/presentation.html`

export class Presentation {

  #connections = new Set()

  constructor({ master = false } = {}) {
    if (master) return this.#initMaster()
    return this.#initSlave()
  }

  #addConnection = connection => {
    connection.addEventListener("message", ({data}) => {
      console.log(`Message: ${data}`)
    })

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
    if (!(await this.#availability(request))) return this
    const newConnection = await REQUEST.start()
    this.#connections.add(newConnection)
    return this
  }

  #initSlave = async () => {
    const connectionList = await navigator.presentation?.receiver?.connectionList
    if (connectionList instanceof PresentationConnectionList) {
      connectionList.connections.forEach(this.#addConnection)
      connectionList.addEventListener("connectionavailable", ({connection}) => this.#addConnection(connection))
    }

    return this
  }

  send = message => {
    console.log(message)
    // this.#connections.forEach()
  }
}
