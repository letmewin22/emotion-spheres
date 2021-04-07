import {raf} from './RAF'
import {state} from '../state'
import noop from './noop'

export const onLoaded = (cb = noop) => {

  const detectLoading = () => {
    if (state.isLoaded) {
      cb()
      raf.off(detectLoading)
    }
  }

  raf.on(detectLoading)
}
