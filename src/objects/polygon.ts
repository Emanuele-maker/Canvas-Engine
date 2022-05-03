import GameObject, { GameObjectOptions, defaultGameObjectOptions } from "./gameobject"

interface PolygonOptions extends GameObjectOptions {
  [key: string]: any
  fillColor?: string
  borderColor?: string
  borderWidth?: number
  angle?: number
}

export interface PVector {
  x: number,
  y: number
}

export default class Polygon extends GameObject {
  options: PolygonOptions = {
    fillColor: "red",
    borderColor: "black",
    borderWidth: 2,
    angle: 0,
    ...defaultGameObjectOptions
  }
  sides: number
  size: number
  coordinates: PVector[]
  constructor(name: string, x: number, y: number, numberOfSides: number, size: number, options?: PolygonOptions) {
    super(name, x, y, size, size, options)
    this.sides = numberOfSides
    this.size = size
    this.initOptions(options)
    this.coordinates = this.generateCoordinates((this.options.angle || 0) * (Math.PI / 180))
  }
  generateCoordinates(rotation: number) {
    const coordinates = []
    for (let i = 0; i < this.sides; i++) {
      coordinates.push({
        x: parseFloat((this.position.x + this.size * Math.cos(rotation + (i * 2 * Math.PI / this.sides))).toFixed(4)),
        y: parseFloat((this.position.y + this.size * Math.sin(rotation + (i * 2 * Math.PI / this.sides))).toFixed(4))
      })
    }
    return coordinates
  }
  rotate(angle: number, clockwise: boolean = true) {
    if (!this.options.angle) return
    return clockwise ? this.options.angle += angle : this.options.angle -= angle
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.options.borderColor) ctx.strokeStyle = this.options.borderColor
    if (this.options.fillColor) ctx.fillStyle = this.options.fillColor
    if (this.options.borderWidth) ctx.lineWidth = this.options.borderWidth

    let rad;
    if (this.options.angle) rad = this.options.angle * Math.PI / 180
    else rad = 0
    const coordinates = this.generateCoordinates(rad)

    ctx.save()

    ctx.beginPath()
    coordinates.forEach((coordinate, index) => {
      if (index === 0) {
        ctx.moveTo(coordinate.x, coordinate.y)
      } else {
        ctx.lineTo(coordinate.x, coordinate.y)
      }
    })
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
    ctx.restore()
  }
}