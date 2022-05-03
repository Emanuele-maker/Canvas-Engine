export default class TimeManager {
  currentMs: number = new Date().getMilliseconds()
  previousMs: number = 0
  msCount: number = 0
  wait(ms: number) {
    while (this.msCount < ms) {
      this.currentMs = new Date().getMilliseconds()
      if (this.currentMs !== this.previousMs) this.msCount++
      this.previousMs = this.currentMs
    }
  }
}