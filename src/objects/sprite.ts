import GameObject, { GameObjectOptions, defaultGameObjectOptions } from "./gameobject"

interface Animation {
  frames: HTMLImageElement[]
  time: number
}

interface SpriteOptions extends GameObjectOptions {
  [key: string]: any
}

export default class Sprite extends GameObject {
  options: SpriteOptions = {
    ...defaultGameObjectOptions
  }
  animation: Animation
  currentFrame: HTMLImageElement
  frameTime: number
  frameCount: number = 0
  constructor(name: string, x: number, y: number, width: number, height: number, animation: Animation, options?: SpriteOptions) {
    super(name, x, y, width, height, options)
    this.animation = animation
    this.currentFrame = this.animation.frames[0]
    this.frameTime = Math.round(this.animation.time / this.animation.frames.length)
    this.initOptions(options)
  }
  private animate() {
    if (this.frameTime === this.frameCount) {
      this.currentFrame = this.animation.frames[this.animation.frames.indexOf(this.currentFrame) + 1]
      this.frameCount = 0
    } else {
      this.frameCount++
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.animate()

    const rad: number = (this.options.angle || 0) * Math.PI / 180

    ctx.save()

    ctx.translate(this.position.x + this.scale.width / 2, this.position.y + this.scale.height / 2)
    ctx.rotate(rad)
    ctx.drawImage(this.currentFrame, this.scale.width / 2 * (-1), this.scale.height / 2 * (-1), this.scale.width, this.scale.height)

    ctx.restore()
  }
}