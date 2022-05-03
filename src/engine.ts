import ExtendedGameObject, { ExtendedGameObjects } from "./objects/extendedObjects"
import { detectCollisionBetweenTwoCircles, detectCollisionBetweenTwoPolygons } from "./utils/collision"
import InputManager from "./utils/input"
import TimeManager from "./utils/time"

const Input = new InputManager()
const Time = new TimeManager()

interface AbsolutePosition {
  x: number,
  y: number
}

type Percentage = `${number}%`

interface PercentagePosition {
  x: Percentage,
  y: Percentage
}

type GameWindowOptions = {
  [key: string]: any
  width?: number,
  height?: number,
  backgroundColor?: string,
  borderWidth?: number,
  borderColor?: string,
  backgroundImage?: HTMLImageElement,
  position?: AbsolutePosition | PercentagePosition
  CSSTransform?: string
}

class GameWindow {
  options: GameWindowOptions = {
    width: 1280,
    height: 720,
    backgroundColor: "gray",
    borderWidth: 1,
    borderColor: "black",
    position: { x: "50%", y: "50%" },
    CSSTransform: "translate(-50%, -50%)"
  }
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, options?: GameWindowOptions) {
    this.canvas = canvas
    this.ctx = ctx
    if(options) {
      Object.keys(options).forEach(key => {
        if (options[key]) this.options[key] = options[key]
      })
    }
    this.configure()
  }
  configure(): void {
    if (this.options.width) this.canvas.width = this.options.width
    if (this.options.height) this.canvas.height = this.options.height
    this.canvas.style.position = "absolute"
    if (this.options.position) { 
      this.canvas.style.left = this.options.position.x.toString()
      this.canvas.style.top = this.options.position.y.toString()
    }
    if (this.options.backgroundColor) this.canvas.style.backgroundColor = this.options.backgroundColor
    if (this.options.borderWidth) this.canvas.style.borderWidth = this.options.borderWidth.toString()
    if (this.options.borderColor) this.canvas.style.borderColor = this.options.borderColor
    if (this.options.CSSTransform) this.canvas.style.transform = this.options.CSSTransform
    document.body.oncontextmenu = () => { return false }
  }
}

export default class RuntimeEngine {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  gameWindow: GameWindow
  gameObjects: ExtendedGameObject[] = []
  constructor(windowOptions?: GameWindowOptions) {
    this.canvas = document.body.appendChild(document.createElement("canvas"))
    const ctx = this.canvas.getContext("2d")
    if(ctx !== null) this.ctx = ctx 
    else throw new Error("Your browser does not support Canvas Engine :(")
    this.gameWindow = new GameWindow(this.canvas, this.ctx, windowOptions)
  }
  clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  addObject(...objects: ExtendedGameObject[]): ExtendedGameObject | ExtendedGameObject[] {
    objects.forEach(object => this.gameObjects.push(object))
    if (objects.length > 1) return objects
    else return objects[0]
  }
  findObjectByName(name: string): ExtendedGameObject {
    const object = this.gameObjects.find(object => object.name === name)
    if (!object) throw `Object "${name}" not found.`
    return object
  }
  detectCollisionBetweenTwoObjects(object1: ExtendedGameObject | string, object2: ExtendedGameObject | string): boolean {
    let firstObject: ExtendedGameObject
    let secondObject: ExtendedGameObject

    if (typeof object1 === "string") {
      const objectToFind = this.findObjectByName(object1)
      if (!objectToFind) throw `Object ${object1} not found.`
      else firstObject = objectToFind
    } else {
      firstObject = object1
    }

    if (typeof object2 === "string") {
      const objectToFind = this.findObjectByName(object2)
      if (!objectToFind) throw `Object ${object2} not found.`
      else secondObject = objectToFind
    } else {
      secondObject = object2
    }

    if (firstObject instanceof ExtendedGameObjects.Circle && secondObject instanceof ExtendedGameObjects.Circle) return detectCollisionBetweenTwoCircles(secondObject.position.x, secondObject.position.y, secondObject.radius, firstObject.position.x, firstObject.position.y, firstObject.radius)
    else if (firstObject instanceof ExtendedGameObjects.Polygon && secondObject instanceof ExtendedGameObjects.Polygon) return detectCollisionBetweenTwoPolygons(firstObject.coordinates, secondObject.coordinates)
    else throw "This type of collision doesn't exist!"
  }
  update(): void {
    this.clearCanvas()
    if (this.gameObjects.length > 0) {
      this.gameObjects.forEach(object => {
        if (!object.update) return
        object.update(this.ctx)
      })
    }
  }
}

export {
  ExtendedGameObjects as GameObjects,
  Input,
  Time
}