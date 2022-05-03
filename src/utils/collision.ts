import { PVector } from "../objects/polygon"

const detectCollisionBetweenTwoCircles = (x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): boolean => {
  const squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)

  return squareDistance <= ((r1 + r2) * (r1 + r2))
}

const lineLine = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) => {

  // calculate the direction of the lines
  let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
  let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

  // if uA and uB are between 0-1, lines are colliding
  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true
  }
  return false
}

const polyPoint = (vertices: PVector[], px: number, py: number) => {
  let collision = false

  // go through each of the vertices, plus the next
  // vertex in the list
  let next = 0
  for (let current = 0; current < vertices.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current + 1
    if (next === vertices.length) next = 0

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    let vc: PVector = vertices[current]   // c for "current"
    let vn: PVector = vertices[next]       // n for "next"

    // compare position, flip 'collision' variable
    // back and forth
    if (((vc.y > py && vn.y < py) || (vc.y < py && vn.y > py)) &&
         (px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x)) {
            collision = !collision
    }
  }
  return collision
}

const polyLine = (vertices: PVector[], x1: number, y1: number, x2: number, y2: number): boolean => {

  // go through each of the vertices, plus the next
  // vertex in the list
  let next = 0
  for (let current = 0; current < vertices.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current + 1
    if (next === vertices.length) next = 0

    // get the PVectors at our current position
    // extract X/Y coordinates from each
    let x3 = vertices[current].x
    let y3 = vertices[current].y
    let x4 = vertices[next].x
    let y4 = vertices[next].y;

    // do a Line/Line comparison
    // if true, return 'true' immediately and
    // stop testing (faster)
    let hit: boolean = lineLine(x1, y1, x2, y2, x3, y3, x4, y4)
    return hit
  }

  // never got a hit
  return false;
}

const detectCollisionBetweenTwoPolygons = (p1: PVector[], p2: PVector[]) => {
  // go through each of the vertices, plus the next
  // vertex in the list
  let next = 0
  for (let current = 0; current < p1.length; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current + 1
    if (next === p1.length) next = 0

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    let vc: PVector = p1[current]    // c for "current"
    let vn: PVector = p1[next]       // n for "next"

    // now we can use these two points (a line) to compare
    // to the other polygon's vertices using polyLine()
    let collision = polyLine(p2, vc.x, vc.y, vn.x, vn.y)
    if (collision) return true

    // optional: check if the 2nd polygon is INSIDE the first
    collision = polyPoint(p1, p2[0].x, p2[0].y)
    if (collision) return true
  }

  return false
}


export {
  detectCollisionBetweenTwoCircles,
  detectCollisionBetweenTwoPolygons
}