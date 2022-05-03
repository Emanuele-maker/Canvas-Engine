import RuntimeEngine, { GameObjects } from "./engine"

const game = new RuntimeEngine({
  width: 600,
  height: 600
})

const flappyImageMid = new Image()
flappyImageMid.src = "./img/yellowbird-midflap.png"

const flappyImageDown = new Image()
flappyImageDown.src = "./img/yellowbird-downflap.png"

const flappyImageUp = new Image()
flappyImageUp.src = "./img/yellowbird-upflap.png"

game.addObject(new GameObjects.Sprite("flappy", 50, 50, 150, 150, {
  time: 100,
  frames: [flappyImageDown, flappyImageMid, flappyImageUp]
}))

const logic = () => {
}

const runtime = () => {
  game.update()
  logic()
  requestAnimationFrame(runtime)
}
runtime()
