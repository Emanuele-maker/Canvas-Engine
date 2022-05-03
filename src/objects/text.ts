import GameObject, { GameObjectOptions, defaultGameObjectOptions } from "./gameobject"

interface TextOptions extends GameObjectOptions {
  [key: string]: any
  font?: string,
  size?: number,
  fillColor?: string,
  borderColor?: string,
  maxWidth?: number,
  angle?: number
}

export default class Text extends GameObject {
  text: string
  options: TextOptions = {
    fillColor: "red",
    borderColor: "black",
    borderWidth: 2,
    angle: 0,
    ...defaultGameObjectOptions
  }
  constructor(name: string, text: string, x: number, y: number, options?: TextOptions) {
    super(name, x, y, 0, 0, options)
    this.text = text
    this.initOptions(options)
  }
  draw(ctx: CanvasRenderingContext2D) {
    const lineHeight = 15
    ctx.font = `${this.options.size}px ${this.options.font}`
    ctx.fillStyle = this.options.fillColor ? this.options.fillColor : ""
    ctx.lineWidth = this.options.borderWidth ? this.options.borderWidth : 0
    ctx.strokeStyle = this.options.borderColor ? this.options.borderColor : ""
    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    ctx.rotate((this.options.angle || 0) * Math.PI / 180)
    ctx.textAlign = "center"
    ctx.beginPath()
    ctx.strokeText(this.text, 0, lineHeight / 2, this.options.maxWidth)
    ctx.fillText(this.text, 0, lineHeight / 2, this.options.maxWidth)
    ctx.closePath()
    ctx.restore()
  }
}