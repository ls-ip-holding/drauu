import { Point } from '../types'
import { BaseModel } from './base'

export class EraserModel extends BaseModel<SVGPathElement> {

  override onMove(point: Point) {
    if (!this.el)
      this.onStart(point)

    const target = this.event.target as HTMLElement
    const svg = document.getElementById('svg')
    
    if (target && svg && target != svg && !target.id) { // (If it has an id, it already will be stacked!)
      // We are going to hide the original, and saving a shallow clone on the stack.
      target.style.display = 'none'
      const clone = target.cloneNode(false) as HTMLElement

      // With a random id assigned to both, we can later refind the original and unhide it.
      const randomNumber = Math.floor(Math.random() * 100000)
      target.id = 'original-' + randomNumber 
      clone.id = 'clone-' + randomNumber
      this.drauu._undoStack.push(clone)
    }

    return true
  }

  override onEnd() {
    return false
  }

}
