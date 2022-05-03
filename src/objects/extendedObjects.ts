import Circle from "./circle"
import Polygon from "./polygon"
import Text from "./text"
import Sprite from "./sprite"

type ExtendedGameObjectType = Circle | Polygon | Text | Sprite

export const ExtendedGameObjects = {
  Circle,
  Polygon,
  Text,
  Sprite
}

export default ExtendedGameObjectType