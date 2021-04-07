import noop from './noop'
import {raf} from './RAF'

export const intersectionOvserver = (el, cb) => {

  cb = cb ?? noop
  const b = el.getBoundingClientRect()

  if (b.top < window.innerHeight && -b.top <= b.height) {
    if (!el.classList.contains('js-in-view')) {
      el.classList.add('js-in-view')
      cb()
    }
  } else {
    el.classList.contains('js-in-view') && el.classList.remove('js-in-view')
  }

  return {
    on: () => raf.on(intersectionOvserver.bind(null, el, cb)),
    off: () => raf.off(intersectionOvserver.bind(null, el, cb))
  }
}
