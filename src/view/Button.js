/**
 * Created by FDD on 2017/7/16.
 * @desc 按钮创建foc
 */
import {addEvent} from '../events/Events'
import * as DomUtils from '../dom/domUtils'
class Button {
  constructor (options, type, style) {
    this.button = ''
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
        // Fullscreen icon size
        var fullscreen_width = style.buttonsHeight * style.fullscreenRatio;
        var fullscreen_vertical_space = style.buttonsHeight * 0.3;
        var fullscreen_vertical_border = (style.buttonsHeight - fullscreen_vertical_space) / 2;
        var fullscreen_horizontal_space = fullscreen_width * 0.3;
        var fullscreen_horizontal_border = (fullscreen_width - fullscreen_horizontal_space) / 2 - style.fullscreenThickness;
        var fullscreen_vertical_int = style.buttonsHeight - style.fullscreenThickness * 2;
        // Fullscreen button
        button = document.createElement('div');
        button.style.cssFloat = 'right';
        button.style.boxSizing = 'inherit';
        button.style.padding = '10px';
        button.style.width = fullscreen_width + 'px';
        button.style.height = style.buttonsHeight + 'px';
        button.style.backgroundColor = style.buttonsBackgroundColor;
        button.style.cursor = 'pointer';
        addEvent(button, 'click', function(){psv.toggleFullscreen();});
        // Fullscreen icon left side
        var fullscreen_left = document.createElement('div');
        fullscreen_left.style.cssFloat = 'left';
        fullscreen_left.style.boxSizing = 'inherit';
        fullscreen_left.style.width = style.fullscreenThickness + 'px';
        fullscreen_left.style.height = fullscreen_vertical_space + 'px';
        fullscreen_left.style.borderStyle = 'solid';
        fullscreen_left.style.borderColor = style.buttonsColor + ' transparent';
        fullscreen_left.style.borderWidth = fullscreen_vertical_border + 'px 0';
        button.appendChild(fullscreen_left);
        // Fullscreen icon top/bottom sides (first half)
        var fullscreen_tb_1 = document.createElement('div');
        fullscreen_tb_1.style.cssFloat = 'left';
        fullscreen_tb_1.style.boxSizing = 'inherit';
        fullscreen_tb_1.style.width = fullscreen_horizontal_border + 'px';
        fullscreen_tb_1.style.height = fullscreen_vertical_int + 'px';
        fullscreen_tb_1.style.borderStyle = 'solid';
        fullscreen_tb_1.style.borderColor = style.buttonsColor + ' transparent';
        fullscreen_tb_1.style.borderWidth = style.fullscreenThickness + 'px 0';
        button.appendChild(fullscreen_tb_1);
        // Fullscreen icon top/bottom sides (second half)
        var fullscreen_tb_2 = document.createElement('div');
        fullscreen_tb_2.style.cssFloat = 'left';
        fullscreen_tb_2.style.boxSizing = 'inherit';
        fullscreen_tb_2.style.marginLeft = fullscreen_horizontal_space + 'px';
        fullscreen_tb_2.style.width = fullscreen_horizontal_border + 'px';
        fullscreen_tb_2.style.height = fullscreen_vertical_int + 'px';
        fullscreen_tb_2.style.borderStyle = 'solid';
        fullscreen_tb_2.style.borderColor = style.buttonsColor + ' transparent';
        fullscreen_tb_2.style.borderWidth = style.fullscreenThickness + 'px 0';
        button.appendChild(fullscreen_tb_2);
        // Fullscreen icon right side
        var fullscreen_right = document.createElement('div');
        fullscreen_right.style.cssFloat = 'left';
        fullscreen_right.style.boxSizing = 'inherit';
        fullscreen_right.style.width = style.fullscreenThickness + 'px';
        fullscreen_right.style.height = fullscreen_vertical_space + 'px';
        fullscreen_right.style.borderStyle = 'solid';
        fullscreen_right.style.borderColor = style.buttonsColor + ' transparent';
        fullscreen_right.style.borderWidth = fullscreen_vertical_border + 'px 0';
        button.appendChild(fullscreen_right);
        var fullscreen_clearer = document.createElement('div');
        fullscreen_clearer.style.clear = 'left';
        button.appendChild(fullscreen_clearer);
        // (In)active
        psv.addAction('fullscreen-mode', toggleActive);
        break
      case 'orientation':
        // Gyroscope icon sizes
        var gyroscope_sphere_width = style.buttonsHeight - style.gyroscopeThickness * 2;
        var gyroscope_ellipses_big_axis = gyroscope_sphere_width - style.gyroscopeThickness * 4;
        var gyroscope_ellipses_little_axis = gyroscope_sphere_width / 10;

        // Gyroscope button
        button = document.createElement('div');
        button.style.cssFloat = 'right';
        button.style.boxSizing = 'inherit';
        button.style.padding = '10px';
        button.style.width = style.buttonsHeight + 'px';
        button.style.height = style.buttonsHeight + 'px';
        button.style.backgroundColor = style.buttonsBackgroundColor;
        button.style.position = 'relative';
        button.style.cursor = 'pointer';

        addEvent(button, 'click', function(){psv.toggleDeviceOrientation();});

        var gyroscope_sphere = document.createElement('div');
        gyroscope_sphere.style.boxSizing = 'inherit';
        gyroscope_sphere.style.width = gyroscope_sphere_width + 'px';
        gyroscope_sphere.style.height = gyroscope_sphere_width + 'px';
        gyroscope_sphere.style.borderRadius = '50%';
        gyroscope_sphere.style.border = style.gyroscopeThickness + 'px solid ' + style.buttonsColor;
        button.appendChild(gyroscope_sphere);

        var gyroscope_hor_ellipsis = document.createElement('div');
        gyroscope_hor_ellipsis.style.boxSizing = 'inherit';
        gyroscope_hor_ellipsis.style.width = gyroscope_ellipses_big_axis + 'px';
        gyroscope_hor_ellipsis.style.height = gyroscope_ellipses_little_axis + 'px';
        gyroscope_hor_ellipsis.style.borderRadius = '50%';
        gyroscope_hor_ellipsis.style.border = style.gyroscopeThickness + 'px solid ' + style.buttonsColor;
        gyroscope_hor_ellipsis.style.position = 'absolute';
        gyroscope_hor_ellipsis.style.top = '50%';
        gyroscope_hor_ellipsis.style.left = '50%';
        gyroscope_hor_ellipsis.style.marginTop = -(gyroscope_ellipses_little_axis / 2 + style.gyroscopeThickness) + 'px';
        gyroscope_hor_ellipsis.style.marginLeft = -(gyroscope_ellipses_big_axis / 2 + style.gyroscopeThickness) + 'px';
        button.appendChild(gyroscope_hor_ellipsis);

        var gyroscope_ver_ellipsis = document.createElement('div');
        gyroscope_ver_ellipsis.style.boxSizing = 'inherit';
        gyroscope_ver_ellipsis.style.width = gyroscope_ellipses_little_axis + 'px';
        gyroscope_ver_ellipsis.style.height = gyroscope_ellipses_big_axis + 'px';
        gyroscope_ver_ellipsis.style.borderRadius = '50%';
        gyroscope_ver_ellipsis.style.border = style.gyroscopeThickness + 'px solid ' + style.buttonsColor;
        gyroscope_ver_ellipsis.style.position = 'absolute';
        gyroscope_ver_ellipsis.style.top = '50%';
        gyroscope_ver_ellipsis.style.left = '50%';
        gyroscope_ver_ellipsis.style.marginTop = -(gyroscope_ellipses_big_axis / 2 + style.gyroscopeThickness) + 'px';
        gyroscope_ver_ellipsis.style.marginLeft = -(gyroscope_ellipses_little_axis / 2 + style.gyroscopeThickness) + 'px';
        button.appendChild(gyroscope_ver_ellipsis);

        // (In)active
        psv.addAction('device-orientation', toggleActive);

        break;
      case 'virtual-reality':
        // Sizes
        var vr_width = style.buttonsHeight * style.virtualRealityRatio;

        var vr_eye_diameter = vr_width / 4;
        var vr_eye_offset = vr_eye_diameter / 2;

        // Button
        button = document.createElement('div');
        button.style.cssFloat = 'right';
        button.style.position = 'relative';
        button.style.boxSizing = 'inherit';
        button.style.padding = '10px';
        button.style.width = vr_width + 'px';
        button.style.height = style.buttonsHeight + 'px';
        button.style.backgroundColor = style.buttonsBackgroundColor;
        button.style.cursor = 'pointer';

        addEvent(button, 'click', function(){psv.toggleStereo();});

        // Icon
        var vr_rect = document.createElement('div');
        vr_rect.style.boxSizing = 'inherit';
        vr_rect.style.width = vr_width + 'px';
        vr_rect.style.height = style.buttonsHeight + 'px';
        vr_rect.style.borderRadius = style.virtualRealityBorderRadius + 'px';
        vr_rect.style.backgroundColor = style.buttonsColor;
        button.appendChild(vr_rect);

        var left_eye = document.createElement('div');
        left_eye.style.boxSizing = 'inherit';
        left_eye.style.width = vr_eye_diameter + 'px';
        left_eye.style.height = vr_eye_diameter + 'px';
        left_eye.style.position = 'absolute';
        left_eye.style.top = (vr_eye_offset + 10) + 'px';
        left_eye.style.left = (vr_eye_offset + 10) + 'px';
        left_eye.style.borderRadius = '50%';
        left_eye.style.backgroundColor = style.backgroundColor;
        button.appendChild(left_eye);

        var right_eye = document.createElement('div');
        right_eye.style.boxSizing = 'inherit';
        right_eye.style.width = vr_eye_diameter + 'px';
        right_eye.style.height = vr_eye_diameter + 'px';
        right_eye.style.position = 'absolute';
        right_eye.style.top = (vr_eye_offset + 10) + 'px';
        right_eye.style.right = (vr_eye_offset + 10) + 'px';
        right_eye.style.borderRadius = '50%';
        right_eye.style.backgroundColor = style.backgroundColor;
        button.appendChild(right_eye);

        var nose = document.createElement('div');
        nose.style.boxSizing = 'inherit';
        nose.style.width = vr_eye_diameter + 'px';
        nose.style.height = (style.buttonsHeight / 2) + 'px';
        nose.style.position = 'absolute';
        nose.style.left = '50%';
        nose.style.bottom = '10px';
        nose.style.marginLeft = -(vr_eye_diameter / 2) + 'px';
        nose.style.borderTopLeftRadius = '50% 60%';
        nose.style.borderTopRightRadius = '50% 60%';
        nose.style.backgroundColor = style.backgroundColor;
        button.appendChild(nose);

        //(In)active
        psv.addAction('stereo-effect', toggleActive);

        break;
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
