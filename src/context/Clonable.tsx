// Base interface for context - it must be able to make a clone to trigger refresh of page
export class Clonable {
  clone(): Clonable {
    const copy = new (this.constructor as { new (): Clonable })()
    Object.assign(copy, this)
    return copy
  }
}
