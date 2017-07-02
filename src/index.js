require('./style/index.scss')
import * as DomUtils from './dom/domUtils'
import * as browserUtils from './browserUtils/browser'
import mix from './utils/mixin'
import AjaxUtil from './utils/ajax'
class ImagesPano extends mix(AjaxUtil) {
  constructor (params) {
    super()
    /**
     * 当前版本, 每次修订版本加1
     * @params 主版本号：当你做了不兼容的 API 修改, 次版本号：当你做了向下兼容的功能性新增,修订号：当你做了向下兼容的问题修正.
     * @type {string}
     */
    this.version = '1.0.0'
    /**
     * 当前配置
     * @type {*}
     */
    this.options = params || {}
    /**
     * 要实例化的dom（当前容器）
     * @type {Element}
     */
    this.container = (typeof this.options['container'] === 'string') ? document.getElementById(this.options['container']) : this.options['container']
    /**
     * 加载时的文字提示
     * @type {null}
     */
    this.loadingText = (this.options['loadingText'] !== undefined) ? this.options['loadingText'] : null
    /**
     * three容器
     * @type {Element}
     */
    this.containerInner = DomUtils.create('div', 'images-pano-content-inner')
    /**
     * 是否以XMP文件模型读取数据
     * 什么是XMP？原来XMP是“Extensible Metadata Platform”（可扩展元数据平台）的缩写。
     * 是Adobe推出的一套元数据（Metadata）描述标准，最常出现在影像相关应用上
     * @type {boolean}
     */
    this.readxmp = (this.options['useXmpData'] !== undefined) ? !!this.options['useXmpData'] : true
    /**
     * 是否允许数据跨域（图片数据）
     * @type {boolean}
     */
    this.corsAnonymous = (this.options['corsAnonymous'] !== undefined) ? !!this.options['corsAnonymous'] : true
    /**
     * 初始化
     */
    this.init()
  }

  /**
   * Get this version
   * @returns {string}
   */
  getVersion () {
    return this.version
  }

  /**
   * 初始化
   */
  init () {
    if (this.loadingText && this.container) {
      this.container.innerText = this.loadingText
    } else {
      this.container.innerText = '正在加载中。。。'
    }
    // 判断浏览器是否支持canvas
    if (!browserUtils.isCanvasSupported()) {
      this.container.textContent = 'Canvas is not supported, update your browser!'
      return false
    }
    // 判断THREE是否被引入
    if (window.THREE === undefined) {
      console.log('THREE is not load')
      this.container.textContent = 'THREE is not load'
      return false
    }
    // 使用XMP文件模型引入
    if (this.readxmp && !this.options['panorama'].match(/^data:image\/[a-z]+;base64/)) {
      this.loadXMP().then(res => {
        console.log(res)
      }).catch(error => {
        console.log(error)
      })
    } else {
      this.createBuffer()
    }
  }

  createBuffer () {
    console.log('buffer')
  }
}
export default ImagesPano
