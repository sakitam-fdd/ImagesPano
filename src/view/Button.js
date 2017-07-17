/**
 * Created by FDD on 2017/7/16.
 * @desc 按钮创建foc
 */
import {addEvent} from '../events/Events'
import * as DomUtils from '../dom/domUtils'
class Button {
  constructor (options, type, style) {
    this.button = null
    this.mousedown = false
    this.options = options
    this.type = type
    this.style = style
    this.zoomValue = ''
    this.zoomRangeBg = ''
    this.zoomRange = ''
    this.create()
  }

  create () {
    switch (this.type) {
      case 'autorotate':
        this.createAutoRotate()
        break
      case 'zoom':
        this.createZoomButton()
        break
      case 'fullscreen':
        this.creatFullScreen()
        break
      case 'orientation':
        this.creatOrientation()
        break
      case 'virtual-reality':
        this.creatVirtualReality()
        break
    }
  }

  /**
   * 创建自动旋转按钮
   */
  createAutoRotate () {
    let that = this
    let autorotateSphereWidth = this.style.buttonsHeight - this.style.autorotateThickness * 2
    let autorotateEquatorHeight = autorotateSphereWidth / 10
    // Autorotate button
    that.button = DomUtils.create('div', 'images-pano-tool-button-autorotate')
    that.button.style.width = that.style.buttonsHeight + 'px'
    that.button.style.height = that.style.buttonsHeight + 'px'
    that.button.style.backgroundColor = that.style.buttonsBackgroundColor
    let autorotateSphere = DomUtils.create('div', 'images-pano-tool-button-autorotate-sphere', that.button)
    autorotateSphere.style.width = autorotateSphereWidth + 'px'
    autorotateSphere.style.height = autorotateSphereWidth + 'px'
    autorotateSphere.style.border = that.style.autorotateThickness + 'px solid ' + that.style.buttonsColor
    let autorotateEquator = DomUtils.create('div', 'images-pano-tool-button-autorotate-equator', that.button)
    autorotateEquator.style.width = autorotateSphereWidth + 'px'
    autorotateEquator.style.height = autorotateEquatorHeight + 'px'
    autorotateEquator.style.border = that.style.autorotateThickness + 'px solid ' + that.style.buttonsColor
    autorotateEquator.style.marginTop = -(autorotateEquatorHeight / 2 + that.style.autorotateThickness) + 'px'
    addEvent(that.button, 'click', () => {
      that.options.toggleAutorotate()
    })
    this.options.addAction('autorotate', (event) => {
      that.toggleActive(event)
    })
  }

  /**
   * 创建缩放按钮
   */
  createZoomButton () {
    let that = this
    that.button = DomUtils.create('div', 'images-pano-tool-zoom-button')
    // Zoom "-"
    let zoomMinus = DomUtils.create('div', 'images-pano-tool-zoom-minus', that.button)
    zoomMinus.style.height = that.style.buttonsHeight + 'px'
    zoomMinus.style.backgroundColor = that.style.buttonsBackgroundColor
    zoomMinus.style.lineHeight = that.style.buttonsHeight + 'px'
    zoomMinus.style.color = that.style.buttonsColor
    zoomMinus.textContent = '-'
    // Zoom "+"
    let zoomPlus = DomUtils.create('div', 'images-pano-tool-zoom-plus', that.button)
    zoomPlus.style.height = that.style.buttonsHeight + 'px'
    zoomPlus.style.backgroundColor = that.style.buttonsBackgroundColor
    zoomPlus.style.lineHeight = that.style.buttonsHeight + 'px'
    zoomPlus.style.color = that.style.buttonsColor
    zoomPlus.textContent = '+'
    // Zoom range
    this.zoomRangeBg = DomUtils.create('div', 'images-pano-tool-zoom-range-bg', that.button)
    this.zoomRangeBg.style.padding = (10 + (that.style.buttonsHeight - that.style.zoomRangeThickness) / 2) + 'px 5px'
    this.zoomRangeBg.style.backgroundColor = that.style.buttonsBackgroundColor
    this.zoomRange = DomUtils.create('div', 'images-pano-tool-zoom-range', that.zoomRangeBg)
    this.zoomRange.style.width = this.style.zoomRangeWidth + 'px'
    this.zoomRange.style.height = this.style.zoomRangeThickness + 'px'
    this.zoomRange.style.backgroundColor = this.style.buttonsColor
    this.zoomValue = DomUtils.create('div', 'images-pano-tool-zoom-value', that.zoomRange)
    this.zoomValue.style.top = ((this.style.zoomRangeThickness - this.style.zoomRangeDisk) / 2) + 'px'
    this.zoomValue.style.left = -(this.style.zoomRangeDisk / 2) + 'px'
    this.zoomValue.style.width = this.style.zoomRangeDisk + 'px'
    this.zoomValue.style.height = this.style.zoomRangeDisk + 'px'
    this.zoomValue.style.backgroundColor = this.style.buttonsColor
    that.options.addAction('zoom-updated', event => {
      that.moveZoomValue(event)
    })
    addEvent(that.zoomRangeBg, 'mousedown', event => {
      that.initZoomChangeWithMouse(event)
    })
    addEvent(that.zoomRangeBg, 'touchstart', event => {
      that.initZoomChangeByTouch(event)
    })
    addEvent(document, 'mousemove', event => {
      that.changeZoomWithMouse(event)
    })
    addEvent(document, 'touchmove', event => {
      that.changeZoomByTouch(event)
    })
    addEvent(document, 'mouseup', event => {
      that.stopZoomChange(event)
    })
    addEvent(document, 'touchend', event => {
      that.stopZoomChange(event)
    })
    addEvent(zoomPlus, 'click', () => {
      that.options.zoomIn()
    })
    addEvent(zoomMinus, 'click', () => {
      that.options.zoomOut()
    })
  }

  /**
   * 创建全屏按钮
   */
  creatFullScreen () {
    // Fullscreen icon size
    let that = this
    that.button = DomUtils.create('div', 'images-pano-tool-fullScreen-button')
    let fullscreenWidth = that.style.buttonsHeight * that.style.fullscreenRatio
    let fullscreenVerticalSpace = that.style.buttonsHeight * 0.3
    let fullscreenVerticalBorder = (that.style.buttonsHeight - fullscreenVerticalSpace) / 2
    let fullscreenHorizontalSpace = fullscreenWidth * 0.3
    let fullscreenHorizontalBorder = (fullscreenWidth - fullscreenHorizontalSpace) / 2 - that.style.fullscreenThickness
    let fullscreenVerticalInt = that.style.buttonsHeight - that.style.fullscreenThickness * 2
    // Fullscreen button
    that.button.style.width = fullscreenWidth + 'px'
    that.button.style.height = that.style.buttonsHeight + 'px'
    that.button.style.backgroundColor = that.style.buttonsBackgroundColor
    // Fullscreen icon left side
    let fullscreenLeft = DomUtils.create('div', 'images-pano-tool-fullScreen-left-button', that.button)
    fullscreenLeft.style.width = that.style.fullscreenThickness + 'px'
    fullscreenLeft.style.height = fullscreenVerticalSpace + 'px'
    fullscreenLeft.style.borderColor = that.style.buttonsColor + ' transparent'
    fullscreenLeft.style.borderWidth = fullscreenVerticalBorder + 'px 0'
    // Fullscreen icon top/bottom sides (first half)
    let fullscreenTab = DomUtils.create('div', 'images-pano-tool-fullScreen-left-tb', that.button)
    fullscreenTab.style.width = fullscreenHorizontalBorder + 'px'
    fullscreenTab.style.height = fullscreenVerticalInt + 'px'
    fullscreenTab.style.borderColor = that.style.buttonsColor + ' transparent'
    fullscreenTab.style.borderWidth = that.style.fullscreenThickness + 'px 0'
    // Fullscreen icon top/bottom sides (second half)
    let fullscreenTab_ = DomUtils.create('div', 'images-pano-tool-fullScreen-left-tb', that.button)
    fullscreenTab_.style.marginLeft = fullscreenHorizontalSpace + 'px'
    fullscreenTab_.style.width = fullscreenHorizontalBorder + 'px'
    fullscreenTab_.style.height = fullscreenVerticalInt + 'px'
    fullscreenTab_.style.borderColor = that.style.buttonsColor + ' transparent'
    fullscreenTab_.style.borderWidth = that.style.fullscreenThickness + 'px 0'
    // Fullscreen icon right side
    let fullscreenRight = DomUtils.create('div', 'images-pano-tool-fullScreen-right-button', that.button)
    fullscreenRight.style.width = that.style.fullscreenThickness + 'px'
    fullscreenRight.style.height = fullscreenVerticalSpace + 'px'
    fullscreenRight.style.borderColor = that.style.buttonsColor + ' transparent'
    fullscreenRight.style.borderWidth = fullscreenVerticalBorder + 'px 0'
    addEvent(that.button, 'click', event => {
      that.options.toggleFullscreen()
    })
    that.options.addAction('fullscreen-mode', event => {
      that.toggleActive(event)
    })
  }

  /**
   * 创建方向控制按钮
   */
  creatOrientation () {
    // Gyroscope icon sizes
    let that = this
    that.button = DomUtils.create('div', 'images-pano-tool-orientation-button')
    let gyroscopeSphereWidth = that.style.buttonsHeight - that.style.gyroscopeThickness * 2
    let gyroscopeEllipsesBigAxis = gyroscopeSphereWidth - that.style.gyroscopeThickness * 4
    let gyroscopeEllipsesLittleAxis = gyroscopeSphereWidth / 10
    that.button.style.width = that.style.buttonsHeight + 'px'
    that.button.style.height = that.style.buttonsHeight + 'px'
    that.button.style.backgroundColor = that.style.buttonsBackgroundColor
    let gyroscopeSphere = DomUtils.create('div', 'images-pano-tool-sphere-button', that.button)
    gyroscopeSphere.style.width = gyroscopeSphereWidth + 'px'
    gyroscopeSphere.style.height = gyroscopeSphereWidth + 'px'
    gyroscopeSphere.style.border = that.style.gyroscopeThickness + 'px solid ' + that.style.buttonsColor
    let gyroscopeHorEllipsis = DomUtils.create('div', 'images-pano-tool-hor-ellipsis-button', that.button)
    gyroscopeHorEllipsis.style.width = gyroscopeEllipsesBigAxis + 'px'
    gyroscopeHorEllipsis.style.height = gyroscopeEllipsesLittleAxis + 'px'
    gyroscopeHorEllipsis.style.border = that.style.gyroscopeThickness + 'px solid ' + that.style.buttonsColor
    gyroscopeHorEllipsis.style.marginTop = -(gyroscopeEllipsesLittleAxis / 2 + that.style.gyroscopeThickness) + 'px'
    gyroscopeHorEllipsis.style.marginLeft = -(gyroscopeEllipsesBigAxis / 2 + that.style.gyroscopeThickness) + 'px'
    let gyroscopeVerEllipsis = DomUtils.create('div', 'images-pano-tool-ver-ellipsis-button', that.button)
    gyroscopeVerEllipsis.style.width = gyroscopeEllipsesLittleAxis + 'px'
    gyroscopeVerEllipsis.style.height = gyroscopeEllipsesBigAxis + 'px'
    gyroscopeVerEllipsis.style.border = that.style.gyroscopeThickness + 'px solid ' + that.style.buttonsColor
    gyroscopeVerEllipsis.style.marginTop = -(gyroscopeEllipsesBigAxis / 2 + that.style.gyroscopeThickness) + 'px'
    gyroscopeVerEllipsis.style.marginLeft = -(gyroscopeEllipsesLittleAxis / 2 + that.style.gyroscopeThickness) + 'px'
    addEvent(that.button, 'click', event => {
      that.options.toggleDeviceOrientation()
    })
    that.options.addAction('device-orientation', event => {
      that.toggleActive(event)
    })
  }

  /**
   * VR
   */
  creatVirtualReality () {
    let that = this
    let vrWidth = that.style.buttonsHeight * that.style.virtualRealityRatio
    let vrEyeDiameter = vrWidth / 4
    let vrEyeOffset = vrEyeDiameter / 2
    // Button
    that.button = DomUtils.create('div', 'images-pano-tool-virtual-reality-button')
    that.button.style.width = vrWidth + 'px'
    that.button.style.height = that.style.buttonsHeight + 'px'
    that.button.style.backgroundColor = that.style.buttonsBackgroundColor
    // Icon
    let vrRect = DomUtils.create('div', 'images-pano-tool-vr-rect-button', that.button)
    vrRect.style.width = vrWidth + 'px'
    vrRect.style.height = that.style.buttonsHeight + 'px'
    vrRect.style.borderRadius = that.style.virtualRealityBorderRadius + 'px'
    vrRect.style.backgroundColor = that.style.buttonsColor
    let leftEye = DomUtils.create('div', 'images-pano-tool-vr-left-eye-button', that.button)
    leftEye.style.width = vrEyeDiameter + 'px'
    leftEye.style.height = vrEyeDiameter + 'px'
    leftEye.style.top = (vrEyeOffset + 10) + 'px'
    leftEye.style.left = (vrEyeOffset + 10) + 'px'
    leftEye.style.backgroundColor = that.style.backgroundColor
    let rightEye = DomUtils.create('div', 'images-pano-tool-vr-right-eye-button', that.button)
    rightEye.style.width = vrEyeDiameter + 'px'
    rightEye.style.height = vrEyeDiameter + 'px'
    rightEye.style.top = (vrEyeOffset + 10) + 'px'
    rightEye.style.right = (vrEyeOffset + 10) + 'px'
    rightEye.style.backgroundColor = that.style.backgroundColor
    let nose = DomUtils.create('div', 'images-pano-tool-vr-nose-button', that.button)
    nose.style.width = vrEyeDiameter + 'px'
    nose.style.height = (that.style.buttonsHeight / 2) + 'px'
    nose.style.marginLeft = -(vrEyeDiameter / 2) + 'px'
    nose.style.backgroundColor = that.style.backgroundColor
    addEvent(that.button, 'click', event => {
      that.options.toggleStereo()
    })
    that.options.addAction('stereo-effect', event => {
      that.toggleActive(event)
    })
  }

  /**
   * 获取按钮实例
   * @returns {string}
   */
  getButton () {
    return this.button
  }

  /**
   * 改变按钮状态
   * @param active
   */
  toggleActive (active) {
    if (active) {
      this.button.style.backgroundColor = this.style.activeButtonsBackgroundColor
    } else {
      this.button.style.backgroundColor = this.style.buttonsBackgroundColor
    }
  }

  /**
   * 缩放值
   * @param level
   */
  moveZoomValue (level) {
    this.zoomValue.style.left = (level / 100 * this.style.zoomRangeWidth - this.style.zoomRangeDisk / 2) + 'px'
  }

  /**
   * 初始化zoomchange
   * @param evt
   */
  initZoomChangeWithMouse (evt) {
    this.initZoomChange(parseInt(evt.clientX))
  }

  /**
   * 初始化zoomchange
   * @param evt
   */
  initZoomChangeByTouch (evt) {
    let touch = evt.touches[0]
    if (touch.target === this.zoomRangeBg || touch.target === this.zoomRange || touch.target === this.zoomValue) {
      this.initZoomChange(parseInt(touch.clientX))
    }
  }

  /**
   * 初始化zoom
   * @param x
   */
  initZoomChange (x) {
    this.mousedown = true
    this.changeZoom(x)
  }

  /**
   * 停止缩放
   * @param evt
   */
  stopZoomChange (evt) {
    this.mousedown = false
  }

  /**
   * 鼠标缩放
   * @param evt
   */
  changeZoomWithMouse (evt) {
    evt.preventDefault()
    this.changeZoom(parseInt(evt.clientX))
  }

  /**
   * 触摸缩放
   * @param evt
   */
  changeZoomByTouch (evt) {
    let touch = evt.touches[0]
    if (touch.target === this.zoomRangeBg || touch.target === this.zoomRange || touch.target === this.zoomValue) {
      evt.preventDefault()
      this.changeZoom(parseInt(touch.clientX))
    }
  }

  /**
   * Zoom change.
   * @param x
   */
  changeZoom (x) {
    if (this.mousedown) {
      let userInput = x - this.zoomRange.getBoundingClientRect().left
      let zoomLevel = userInput / this.style.zoomRangeWidth * 100
      this.options.zoom(zoomLevel)
    }
  }
}

export default Button
