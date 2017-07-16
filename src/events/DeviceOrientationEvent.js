class DeviceOrientationEvent {
  constructor () {
    /**
     * 是否支持设备方向
     * @type {boolean}
     */
    this.isDeviceOrientationSupported = false
    /**
     * 标识记录
     * @type {boolean}
     */
    this.recording = false
  }

  getScreenOrientation () {
    var screen_orientation = null

    if (!!screen.orientation)
      screen_orientation = screen.orientation;

    else if (!!screen.mozOrientation)
      screen_orientation = screen.mozOrientation;

    else if (!!screen.msOrientation)
      screen_orientation = screen.msOrientation;

    else if (!!window.orientation || window.orientation === 0)
      switch (window.orientation) {
        case 0:
          screen_orientation = 'portrait-primary';
          break;
        case 180:
          screen_orientation = 'portrait-secondary';
          break;
        case -90:
          screen_orientation = 'landscape-primary';
          break;
        case 90:
          screen_orientation = 'landscape-secondary';
          break;
      }

    // Are the specs respected?
    return (screen_orientation !== null && (typeof screen_orientation == 'object')) ? screen_orientation.type : screen_orientation;
  }

  /**
   * 开始监测设备方向
   * @returns {boolean}
   */
  startOrientation () {
    try {
      if (this.isDeviceOrientationSupported) {
        window.addEventListener('deviceorientation', onDeviceOrientation, false)
        this.recording = true
        return true
      } else {
        // throw new Error('不支持设备方向监测！')
        return false
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 停止检测
   */
  stopOrientation () {
    if (this.recording) {
      window.removeEventListener('deviceorientation', onDeviceOrientation, false)
      this.recording = false
    }
  }

  /**
   * toggle
   */
  toggle () {
    if (this.recording) {
      this.stopOrientation()
    } else {
      this.startOrientation()
    }
  }

  onDeviceOrientation (evt) {
    // Current screen orientation
    orientation = Sphoords.getScreenOrientation();

    // Coordinates depend on the orientation
    var theta = 0, phi = 0;

    switch (orientation) {
      // Portrait mode
      case 'portrait-primary':
        theta = evt.alpha + evt.gamma;
        phi = evt.beta - 90;

        break;

      // Landscape mode
      case 'landscape-primary':
        // If "-90" is not present for theta, origin won't be the same than for portrait mode
        theta = evt.alpha + evt.beta - 90;
        phi = -evt.gamma - 90;

        // The user looks to the top while phi "looks" to the bottom
        if (Math.abs(evt.beta) > 90) {
          // Here browser engines have different behaviors
          // Hope we have a really respected standard soon

          switch (engine) {
            case 'Blink':
              phi += 180;
              break;

            case 'Gecko':
            default:
              phi = -phi;
              break;
          }
        }

        //fix to work on iOS (tested on Safari and Chrome)
        if (engine === 'WebKit' && !!window.orientation) {
          if (phi < 0) {
            phi = (phi + 180) * -1;
          }
          if (theta >= 180) {
            theta = theta - 180;
          } else {
            theta = theta + 180;
          }
        }

        break;

      // Landscape mode (inversed)
      case 'landscape-secondary':
        // Still the same reason for "+90"
        theta = evt.alpha - evt.beta + 90;
        phi = evt.gamma - 90;

        // The user looks to the top while phi "looks" to the bottom
        if (Math.abs(evt.beta) > 90) {
          // Here again, some different behaviors…

          switch (engine) {
            case 'Blink':
              phi += 180;
              break;

            case 'Gecko':
            default:
              phi = -phi;
              break;
          }
        }

        // fix to work on iOS (tested on Safari and Chrome)
        if (engine === 'WebKit' && !!window.orientation) {
          if (phi < 0) {
            phi = (phi + 180) * -1;
          }
          if (theta >= 180) {
            theta = theta - 180;
          } else {
            theta = theta + 180;
          }
        }

        break;

      // Portrait mode (inversed)
      case 'portrait-secondary':
        theta = evt.alpha - evt.gamma;
        phi = 180 - (evt.beta - 90);
        phi = 270 - evt.beta;

        break;
    }

    // First, we want phi to be between -π and π
    phi = getPrincipalAngle(phi);

    if (phi >= 180)
      phi -= 360;

    // We store the right values
    long_deg = getPrincipalAngle(theta);
    lat_deg = Math.max(-90, Math.min(90, phi));

    long = long_deg * DEG_TO_RAD;
    lat = lat_deg * DEG_TO_RAD;

    // We execute the wanted functions
    executeListeners();
  }

  executeListeners () {
    if (!!listeners.length) {
      for (var i = 0, l = listeners.length; i < l; ++i) {
        listeners[i]({
          longitude: long,
          latitude: lat
        });
      }
    }
  }

  getCoordinates () {
    return {
      longitude: long,
      latitude: lat
    }
  }

  getCoordinatesInDegrees () {
    return {
      longitude: longDeg,
      latitude: latDeg
    }
  }

  getScreenOrientation () {
    return orientation
  }

  getPrincipalAngle (angle) {
    return angle - Math.floor(angle / 360.0) * 360.0
  }

  addListener (f) {
    listeners.push(f)
  }

  isEventAttached () {
    return this.recording
  }

  /**
   * 检测浏览器内核
   * @returns {*}
   */
  _detectBrowserEngine () {
    let ua = navigator.userAgent
    if (/Gecko\/[0-9.]+/.test(ua)) {
      return 'Gecko'
    }
    if (/Chrome\/[0-9.]+/.test(ua)) {
      return 'Blink'
    }
    if (/AppleWebKit\/[0-9.]+/.test(ua)) {
      return 'WebKit'
    }
    if (/Trident\/[0-9.]+/.test(ua)) {
      return 'Trident'
    }
    if (/Opera\/[0-9.]+/.test(ua)) {
      return 'Presto'
    }
    return 'Gecko'
  }
}

export default DeviceOrientationEvent
