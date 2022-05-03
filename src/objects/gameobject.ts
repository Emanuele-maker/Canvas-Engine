import InputManager from "../utils/input"

const input = new InputManager()

type Behaviour = "movement"

export interface GameObjectOptions {
  [key: string]: any
  leftKeyBindings?: number | number[],
  rightKeyBindings?: number | number[],
  upKeyBindings?: number | number[],
  downKeyBindings?: number | number[],
  speedX?: number,
  speedY?: number,
  behaviours?: Behaviour[]
}

export const defaultGameObjectOptions: GameObjectOptions = {
  leftKeyBindings: [37, 65],
  rightKeyBindings: [39, 68],
  upKeyBindings: [38, 87],
  downKeyBindings: [40, 83],
  speedX: 3.5,
  speedY: 3,
  behaviours: []
}

export default class GameObject {
  name: string
  position: {
    x: number
    y: number
  }
  scale: {
    width: number
    height: number
  }
  maxSpeed: {
    x: number,
    y: number
  } = {
    x: 2,
    y: 2
  }
  speed: {
    x: number,
    y: number
  } = {
    x: 0,
    y: 0
  }
  options: GameObjectOptions = { ...defaultGameObjectOptions }
  constructor(name: string, x: number, y: number, width: number, height: number, options?: GameObjectOptions) {
    this.name = name
    this.position = {
      x: x,
      y: y
    }
    this.scale = {
      width: width,
      height: height
    }

    if (options) {
      Object.keys(options).forEach(key => {
        if (options[key]) this.options[key] = options[key]
      })
    }

    if (this.options.speedX) this.maxSpeed.x = this.options.speedX
    if (this.options.speedY) this.maxSpeed.y = this.options.speedY
  }
  initOptions(options: GameObjectOptions | undefined): void {
    if (options) {
      Object.keys(options).forEach(key => {
        if (options[key]) this.options[key] = options[key]
      })
    }
  }
  draw(ctx: CanvasRenderingContext2D): void {}
  moveLeft(): void {
    this.speed.x = -this.maxSpeed.x
  }
  moveRight(): void {
    this.speed.x = this.maxSpeed.x
  }
  moveUp(): void {
    this.speed.y = -this.maxSpeed.y
  }
  moveDown(): void {
    this.speed.y = this.maxSpeed.y
  }
  checkInputs(): void {
    if (typeof this.options.leftKeyBindings === "number") {
      if (input.isKeyPressed(this.options.leftKeyBindings)) this.moveLeft()
    } else if (typeof this.options.leftKeyBindings === "object") {
      if (this.options.leftKeyBindings.some(binding => input.isKeyPressed(binding))) this.moveLeft()
    }

    if (typeof this.options.rightKeyBindings === "number") {
      if (input.isKeyPressed(this.options.rightKeyBindings)) this.moveRight()
    } else if (typeof this.options.rightKeyBindings === "object") {
      if (this.options.rightKeyBindings.some(binding => input.isKeyPressed(binding))) this.moveRight()
    }

    if (typeof this.options.upKeyBindings === "number") {
      if (input.isKeyPressed(this.options.upKeyBindings)) this.moveRight()
    } else if (typeof this.options.upKeyBindings === "object") {
      if (this.options.upKeyBindings.some(binding => input.isKeyPressed(binding))) this.moveUp()
    }

    if (typeof this.options.downKeyBindings === "number") {
      if (input.isKeyPressed(this.options.downKeyBindings)) this.moveRight()
    } else if (typeof this.options.downKeyBindings === "object") {
      if (this.options.downKeyBindings.some(binding => input.isKeyPressed(binding))) this.moveDown()
    }

    const leftNotPressed = (typeof this.options.leftKeyBindings === "object" && !this.options.leftKeyBindings.some(binding => input.isKeyPressed(binding))) || (typeof this.options.leftKeyBindings === "number" && !input.isKeyPressed(this.options.leftKeyBindings))
    const rightNotPressed = (typeof this.options.rightKeyBindings === "object" && !this.options.rightKeyBindings.some(binding => input.isKeyPressed(binding))) || (typeof this.options.rightKeyBindings === "number" && !input.isKeyPressed(this.options.rightKeyBindings))
    const upNotPressed = (typeof this.options.upKeyBindings === "object" && !this.options.upKeyBindings.some(binding => input.isKeyPressed(binding))) || (typeof this.options.upKeyBindings === "number" && !input.isKeyPressed(this.options.upKeyBindings))
    const downNotPressed = (typeof this.options.downKeyBindings === "object" && !this.options.downKeyBindings.some(binding => input.isKeyPressed(binding))) || (typeof this.options.downKeyBindings === "number" && !input.isKeyPressed(this.options.downKeyBindings))

    if (leftNotPressed && rightNotPressed) this.speed.x = 0
    if (upNotPressed && downNotPressed) this.speed.y = 0
  }
  apllySpeed() {
    this.position.x += this.speed.x
    this.position.y += this.speed.y
  }
  setOption(optionName: string, value: any) {
    if (!this.options[optionName]) throw `You tried to modify an unexisting option "${optionName}" for object named "${this.name}"`
    this.options[optionName] = value
  }
  update(ctx: CanvasRenderingContext2D): void {
    if (this.options.behaviours?.includes("movement")) {
      this.checkInputs()
    }
    this.apllySpeed()
    this.draw(ctx)
  }
}