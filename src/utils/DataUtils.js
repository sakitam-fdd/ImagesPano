/**
 * Created by FDD on 2017/7/12.
 * @desc 数据处理工具
 */
import * as browserUtils from '../browserUtils/browser'
class DataUtils {
  /**
   * 返回谷歌XMP数据
   * @param file
   * @returns {string}
   */
  getXMPData (file) {
    let [a, b, data] = [0, 0, '']
    while ((a = file.indexOf('<x:xmpmeta', b)) !== -1 && (b = file.indexOf('</x:xmpmeta>', a)) !== -1) {
      data = file.substring(a, b)
      if (data.indexOf('GPano:') !== -1) {
        return data
      }
    }
    return ''
  }

  /**
   * 创建一个标准尺寸的图片
   */
  createBuffer (panoSize, capturedView) {
    let img = new Image()
    img.onload = function () {
      let defaultPanoSize = {
        fullWidth: img.width,
        fullHeight: img.height,
        croppedWidth: img.width,
        croppedHeight: img.height,
        croppedX: null,
        croppedY: null
      }

      if (capturedView.horizontalFov !== 360 || capturedView.verticalFov !== 180) {
        panoSize.croppedWidth = defaultPanoSize.croppedWidth
        panoSize.croppedHeight = defaultPanoSize.croppedHeight
        panoSize.full_width = defaultPanoSize.fullWidth
        panoSize.full_height = defaultPanoSize.fullHeight
        // Horizontal FOV indicated
        if (capturedView.horizontalFov !== 360) {
          let rh = capturedView.horizontalFov / 360.0
          panoSize.fullWidth = panoSize.croppedWidth / rh
        }
        // Vertical FOV indicated
        if (capturedView.verticalFov !== 180) {
          let rv = capturedView.verticalFov / 180.0
          panoSize.fullHeight = panoSize.croppedHeight / rv
        }
      } else {
        // Cropped panorama: dimensions defined by the user
        for (let key in panoSize) {
          if (panoSize[key] === null && defaultPanoSize[key] !== undefined) {
            panoSize[key] = defaultPanoSize[key]
          }
        }
        // Do we have to recalculate the coordinates?
        if (this.recalculateCoords) {
          if (panoSize.croppedWidth !== defaultPanoSize.croppedWidth) {
            var rx = defaultPanoSize.croppedWidth / panoSize.croppedWidth
            panoSize.croppedWidth = defaultPanoSize.croppedWidth
            panoSize.fullWidth *= rx
            panoSize.croppedX *= rx
          }
          if (panoSize.croppedHeight !== defaultPanoSize.croppedHeight) {
            let ry = defaultPanoSize.croppedHeight / panoSize.croppedHeight
            panoSize.croppedHeight = defaultPanoSize.croppedHeight
            panoSize.fullHeight *= ry
            panoSize.croppedY *= ry
          }
        }
      }
      // Middle if cropped_x/y is null
      if (panoSize.croppedX === null) {
        panoSize.croppedX = (panoSize.fullWidth - panoSize.croppedWidth) / 2
      }
      if (panoSize.croppedY === null) {
        panoSize.croppedY = (panoSize.fullHeight - panoSize.croppedHeight) / 2
      }
      // Size limit for mobile compatibility
      let maxWidth = 2048
      if (browserUtils.isWebGLSupported()) {
        let canvasTmp = document.createElement('canvas')
        let ctxTmp = canvasTmp.getContext('webgl')
        maxWidth = ctxTmp.getParameter(ctxTmp.MAX_TEXTURE_SIZE)
      }
      // Buffer width (not too big)
      let newWidth = Math.min(panoSize.fullWidth, maxWidth)
      let r = newWidth / panoSize.fullWidth
      panoSize.fullWidth = newWidth
      panoSize.croppedWidth *= r
      panoSize.croppedX *= r
      img.width = panoSize.croppedWidth
      // Buffer height (proportional to the width)
      panoSize.fullWidth *= r
      panoSize.croppedHeight *= r
      panoSize.cropped_y *= r
      img.height = panoSize.croppedHeight
      // Buffer creation
      let buffer = document.createElement('canvas')
      buffer.width = panoSize.fullWidth
      buffer.height = panoSize.fullHeight
      let ctx = buffer.getContext('2d')
      ctx.drawImage(img, panoSize.croppedX, panoSize.croppedY, panoSize.croppedWidth, panoSize.croppedHeight)
      this.loadTexture(buffer.toDataURL('image/jpeg'))
    }
    // CORS when the panorama is not given as a base64 string
    if (this.corsAnonymous && !this.options['imageUrl'].match(/^data:image\/[a-z]+;base64/)) {
      img.setAttribute('crossOrigin', 'anonymous')
    }
    img.src = this.options['imageUrl']
  }
}

export default DataUtils
