export default class InputManager {
  private keysPressed: number[] = []
  private mouseButtonsPressed: number[] = []
  private cursorPositon: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0
  }
  constructor() {
    window.addEventListener("keydown", (event) => {
      if (!this.keysPressed.includes(event.keyCode)) this.keysPressed.push(event.keyCode)
    })
    window.addEventListener("keyup", (event) => {
      const keyIndex = this.keysPressed.indexOf(event.keyCode)
      this.keysPressed.splice(keyIndex, 1)
    })
    window.addEventListener("mousedown", (event) => {
      this.cursorPositon = {
        x: event.offsetX,
        y: event.offsetY
      }
      if (!this.keysPressed.includes(event.button)) this.keysPressed.push(event.button)      
    })
    window.addEventListener("mousemove", (event) => {
      this.cursorPositon = {
        x: event.offsetX,
        y: event.offsetY
      }
    })
    window.addEventListener("mouseup", (event) => {
      const buttonIndex = this.mouseButtonsPressed.indexOf(event.button)
      this.mouseButtonsPressed.splice(buttonIndex, 1)
    })
    window.addEventListener("touchstart", (event) => {
      this.cursorPositon = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
      }
      if (!this.mouseButtonsPressed.includes(0)) this.mouseButtonsPressed.push(0)
    })
    window.addEventListener("touchmove", (event) => {
      this.cursorPositon = {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
      }
    })
    window.addEventListener("touchend", () => {
      const touchIndex = this.mouseButtonsPressed.indexOf(0)
      this.mouseButtonsPressed.splice(touchIndex, 1)
    })
  }
  isKeyPressed(key: number) {
    return this.keysPressed.includes(key)
  }
  isMouseButtonPressed(button: number) {
    return this.mouseButtonsPressed.includes(button)
  }
  get mouseX() {
    return this.cursorPositon.x
  }
  get mouseY() {
    return this.cursorPositon.y
  }
}
