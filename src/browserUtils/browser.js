/**
 * Detects whether canvas is supported
 * @returns {boolean}
 */
const isCanvasSupported = () => {
  let canvas = document.createElement('canvas')
  return !!(canvas.getContext && canvas.getContext('2d'))
}

/**
 * Detects whether WebGL is supported
 * @returns {boolean}
 */
const isWebGLSupported = () => {
  let canvas = document.createElement('canvas')
  return !!(window.WebGLRenderingContext && canvas.getContext('webgl'))
}

export {
  isCanvasSupported,
  isWebGLSupported
}
