import GameObject, { GameObjectOptions, defaultGameObjectOptions } from "./gameobject"

interface CircleOptions extends GameObjectOptions {
  [key: string]: any
  fillColor?: string
  borderWidth?: number
  borderColor?: string
}

export default class Circle extends GameObject {
  radius: number
  options: CircleOptions = {
    fillColor: "red",
    borderColor: "black",
    borderWidth: 2,
    ...defaultGameObjectOptions
  }
  constructor(name: string, x: number, y: number, radius: number, options?: CircleOptions) {
    super(name, x, y, radius, radius, options)
    this.radius = radius
    this.initOptions(options)
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.options.fillColor ? this.options.fillColor : ""
    ctx.lineWidth = this.options.borderWidth ? this.options.borderWidth : 0
    ctx.strokeStyle = this.options.borderColor ? this.options.borderColor : ""
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
  }
}