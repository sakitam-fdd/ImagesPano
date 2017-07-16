/**
 * Created by FDD on 2017/7/16.
 * @desc 工具条
 */
import * as DomUtils from '../dom/domUtils'
import DeviceOrientationUtils from '../utils/DeviceOrientationUtils'
import Button from './Button'
class ToolBar {
  constructor (args) {
    this.options = args || {}
    this.hidden = false
    this.mHidden = false
    this.hiddenTimer = null
    this.toolBarContainer = null
    this.style = {
      backgroundColor: 'rgba(61, 61, 61, 0.5)',
      buttonsColor: 'rgba(255, 255, 255, 0.7)',
      buttonsBackgroundColor: 'transparent',
      activeButtonsBackgroundColor: 'rgba(255, 255, 255, 0.1)',
      buttonsHeight: 20,
      autorotateThickness: 1,
      zoomRangeWidth: 50,
      zoomRangeThickness: 1,
      zoomRangeDisk: 7,
      fullscreenRatio: 4 / 3,
      fullscreenThickness: 2,
      gyroscopeThickness: 1,
      virtualRealityRatio: 4 / 3,
      virtualRealityBorderRadius: 2
    }
    this.colors = ['backgroundColor', 'buttonsColor', 'buttonsBackgroundColor', 'activeButtonsBackgroundColor']
    this.numbers = ['buttonsHeight', 'autorotateThickness', 'zoomRangeWidth', 'zoomRangeThickness', 'zoomRangeDisk', 'fullscreenRatio', 'fullscreenThickness']
  }

  /**
   * 重新设置样式
   * @param style
   */
  setStyle (style) {
    for (let property in this.style) {
      if ((property in style) && ToolBar.checkValue(property, style[property])) {
        this.style[property] = style[property]
      }
    }
  }

  create () {
    this.toolBarContainer = DomUtils.create('div', 'images-pano-tool-bar')
    this.toolBarContainer.style.backgroundColor = this.style.backgroundColor
    let autorotate = new Button(this.options, 'autorotate', this.style)
    this.toolBarContainer.appendChild(autorotate.getButton())
    let zoom = new Button(this.options, 'zoom', this.style)
    this.toolBarContainer.appendChild(zoom.getButton())
    let fullscreen = new Button(this.options, 'fullscreen', this.style)
    this.toolBarContainer.appendChild(fullscreen.getButton())
    if (DeviceOrientationUtils.isDeviceOrientationSupported) {
      let orientation = new Button(this.options, 'orientation', this.style)
      this.toolBarContainer.appendChild(orientation.getButton())
      let vr = new Button(this.options, 'virtual-reality', this.style)
      this.toolBarContainer.appendChild(vr.getButton())
    }
  }

  /**
   * 获取工具条实例
   * @returns {null}
   */
  getBar () {
    return this.toolBarContainer
  }

  /**
   * 显示工具栏
   * @desc 注意工具条不需要一直显示，给定时间后隐藏
   */
  show () {
    let that = this
    if (this.hiddenTimer) {
      window.clearTimeout(this.hiddenTimer)
      if (!this.hidden && this.mHidden) {
        this.hiddenTimer = window.setTimeout(() => {
          that.hide()
        }, 5000)
      }
    }
    if (this.hidden) {
      this.toolBarContainer.style.bottom = 0
      this.hidden = false
      if (that.mHidden) {
        this.hiddenTimer = window.setTimeout(() => {
          that.hide()
        }, 5000)
      }
    }
  }

  /**
   * 隐藏工具栏
   */
  hide () {
    if (!this.hidden) {
      this.toolBarContainer.style.bottom = (-this.toolBarContainer.offsetHeight + 1) + 'px'
      this.hidden = true
    }
  }

  /**
   * 返回当前工具状态
   * @returns {boolean}
   */
  isHidden () {
    return this.hidden
  }

  /**
   * 工具是否必须被隐藏
   * @param state
   */
  mustBeHidden (state) {
    this.mHidden = (state !== undefined) ? !!state : true
    if (this.mHidden) {
      this.hide()
    } else {
      this.show()
    }
  }

  /**
   * 检查属性是否包含值
   * @param property
   * @param value
   * @returns {boolean}
   */
  static checkValue = (property, value) => {
    return (
      (
        ToolBar.inArray(property, this.colors) && (typeof value === 'string') &&
        (
          value === 'transparent' ||
          !!value.match(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/) ||
          !!value.match(/^rgb\((1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(,\s*(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){2}\)$/) ||
          !!value.match(/^rgba\(((1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]),\s*){3}(0(\.[0-9]*)?|1)\)$/)
        )
      ) ||

      // Number
      (ToolBar.inArray(property, this.numbers) && !isNaN(parseFloat(value)) && isFinite(value) && value >= 0)
    )
  }
  /**
   * 判断某个值是否在数组中
   * @param searched
   * @param array
   * @returns {boolean}
   */
  static inArray = (searched, array) => {
    let r = false
    array.every(item => {
      if (searched === array) {
        r = true
        return false
      } else {
        return true
      }
    })
    return r
  }
}
export default ToolBar
