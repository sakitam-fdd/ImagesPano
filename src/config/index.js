/**
 * Created by FDD on 2017/7/22.
 * @desc 默认配置
 */
class DefaultConfig {
  /**
   * 默认四个像素的微笑移动视为点击事件
   * @type {number}
   */
  static MOVE_THRESHOLD = 4
  /**
   * 两次点击间隔小于300ms视为双击
   * @type {number}
   */
  static DBLCLICK_DELAY = 300
  /**
   * 鼠标移动惯性计算
   * @type {number}
   */
  static INERTIA_WINDOW = 300
  /**
   * 模型球形半径
   * @type {number}
   */
  static SPHERE_RADIUS = 100
  /**
   * 球形顶点
   * @type {number}
   */
  static SPHERE_VERTICES = 64
  /**
   * 弓形顶点
   * @type {number}
   */
  static CUBE_VERTICES = 8
  /**
   * 阵列的立方体纹理的顺序
   * @type {[*]}
   */
  static CUBE_MAP = [0, 2, 4, 5, 3, 1]

  /**
   * 阵列hash纹理顺序
   * @type {[*]}
   */
  static CUBE_HASHMAP = ['left', 'right', 'top', 'bottom', 'back', 'front']
  /**
   * 键值定义
   * @type {{33: string, 34: string, 37: string, 38: string, 39: string, 40: string, 107: string, 109: string}}
   */
  static KEYMAP = {
    33: 'PageUp',
    34: 'PageDown',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    107: '+',
    109: '-'
  }
  /**
   * 系统参数
   * @type {{loaded: boolean, pixelRatio: number, isWebGLSupported: boolean, isCanvasSupported: boolean, deviceOrientationSupported: null, maxTextureWidth: number, mouseWheelEvent: null, fullscreenEvent: null}}
   */
  static SYSTEM = {
    loaded: false,
    pixelRatio: 1,
    isWebGLSupported: false,
    isCanvasSupported: false,
    deviceOrientationSupported: null,
    maxTextureWidth: 0,
    mouseWheelEvent: null,
    fullscreenEvent: null
  }
  /**
   * 图标
   * @type {{}}
   */
  static ICONS = {}
  /**
   * 默认配置
   * @type {{panorama: null, container: null, caption: null, autoload: boolean, usexmpdata: boolean, pano_data: null, webgl: boolean, min_fov: number, max_fov: number, default_fov: null, default_long: number, default_lat: number, longitude_range: null, latitude_range: null, move_speed: number, time_anim: number, anim_speed: string, anim_lat: null, fisheye: boolean, navbar: [*], tooltip: {offset: number, arrow_size: number, delay: number}, lang: {autorotate: string, zoom: string, zoomOut: string, zoomIn: string, download: string, fullscreen: string, markers: string, gyroscope: string}, mousewheel: boolean, mousemove: boolean, keyboard: boolean, gyroscope: boolean, move_inertia: boolean, click_event_on_marker: boolean, transition: {duration: number, loader: boolean}, loading_img: null, loading_txt: string, size: null, cache_texture: number, templates: {}, markers: Array}}
   */
  static DEFAULTS = {
    panorama: null,
    container: null,
    caption: null,
    autoload: true,
    usexmpdata: true,
    pano_data: null,
    webgl: true,
    min_fov: 30,
    max_fov: 90,
    default_fov: null,
    default_long: 0,
    default_lat: 0,
    longitude_range: null,
    latitude_range: null,
    move_speed: 1,
    time_anim: 2000,
    anim_speed: '2rpm',
    anim_lat: null,
    fisheye: false,
    navbar: [
      'autorotate',
      'zoom',
      'download',
      'markers',
      'caption',
      'gyroscope',
      'fullscreen'
    ],
    tooltip: {
      offset: 5,
      arrow_size: 7,
      delay: 100
    },
    lang: {
      autorotate: 'Automatic rotation',
      zoom: 'Zoom',
      zoomOut: 'Zoom out',
      zoomIn: 'Zoom in',
      download: 'Download',
      fullscreen: 'Fullscreen',
      markers: 'Markers',
      gyroscope: 'Gyroscope'
    },
    mousewheel: true,
    mousemove: true,
    keyboard: true,
    gyroscope: false,
    move_inertia: true,
    click_event_on_marker: false,
    transition: {
      duration: 1500,
      loader: true
    },
    loading_img: null,
    loading_txt: 'Loading...',
    size: null,
    cache_texture: 5,
    templates: {},
    markers: []
  }
}

export default DefaultConfig
