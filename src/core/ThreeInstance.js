import DefaultConfig from '../config/index'
class ThreeInstance {
  /**
   * 加载THREE场景数据
   * @desc 使用裁剪模式时必须提供六张全景图，完整的全景图裁剪拼接（前后左右上下）
   * @param panorama
   * @returns {*}
   */
  loadTexture (panorama) {
    let tempPanorama = []
    if (Array.isArray(panorama)) {
      if (panorama.length !== 6) {
        throw new Error('使用裁剪模式时必须提供六张全景图！')
      }
      for (let i = 0; i < 6; i++) {
        tempPanorama[i] = panorama[DefaultConfig.CUBE_MAP[i]]
      }
      panorama = tempPanorama
    } else if (typeof panorama === 'object') {
      let flag = DefaultConfig.CUBE_HASHMAP.every(side => {
        return !!panorama[side]
      })
      if (!flag) {
        throw new Error('使用裁剪模式时必须提供六张全景图')
      }
      DefaultConfig.CUBE_HASHMAP.forEach((side, index) => {
        tempPanorama[index] = panorama[side]
      })
      panorama = tempPanorama
    }
    if (Array.isArray(panorama)) {
      if (this.prop.isCubemap === false) {
        throw new Error('初始化失败！')
      }
      if (this.config.fisheye) {
        console.warn('鱼眼模式下全景图可能会发生变形！')
      }

      if (this.config.cache_texture === DefaultConfig.DEFAULTS.cache_texture) {
        this.config.cache_texture *= 6
      }
      this.prop.isCubemap = true
      return this._loadCubemapTexture(panorama)
    } else {
      if (this.prop.isCubemap === true) {
        throw new Error('当前模式下使用立方体地图初始化，不能切换到等角度全景图。')
      }
      this.prop.isCubemap = false
      return this.loadEquirectangularTexture(panorama)
    }
  }

  /**
   * 加载THREE纹理数据
   * @param panorama
   * @returns {*}
   * @private
   */
  loadEquirectangularTexture (panorama) {
    if (this.config.cacheTexture) {
      let cache = this.getPanoramaCache(panorama)
      if (cache) {
        this.prop.pano_data = cache.pano_data
      }
    }
    return (this._loadXMP(panorama).then(panoData => {
      let loader = new THREE.ImageLoader()
      let progress = panoData ? 100 : 0
      loader.setCrossOrigin('anonymous')
      let onload = function(img) {
        progress = 100;

        this.loader.setProgress(progress);

        /**
         * @event panorama-load-progress
         * @memberof PhotoSphereViewer
         * @summary Triggered while a panorama image is loading
         * @param {string} panorama
         * @param {int} progress
         */
        this.trigger('panorama-load-progress', panorama, progress);

        // Config XMP data
        if (!pano_data && this.config.pano_data) {
          pano_data = PSVUtils.clone(this.config.pano_data);
        }

        // Default XMP data
        if (!pano_data) {
          pano_data = {
            full_width: img.width,
            full_height: img.height,
            cropped_width: img.width,
            cropped_height: img.height,
            cropped_x: 0,
            cropped_y: 0
          };
        }

        this.prop.pano_data = pano_data;

        var texture;

        var ratio = Math.min(pano_data.full_width, PhotoSphereViewer.SYSTEM.maxTextureWidth) / pano_data.full_width;

        // resize image / fill cropped parts with black
        if (ratio !== 1 || pano_data.cropped_width != pano_data.full_width || pano_data.cropped_height != pano_data.full_height) {
          var resized_pano_data = PSVUtils.clone(pano_data);

          resized_pano_data.full_width *= ratio;
          resized_pano_data.full_height *= ratio;
          resized_pano_data.cropped_width *= ratio;
          resized_pano_data.cropped_height *= ratio;
          resized_pano_data.cropped_x *= ratio;
          resized_pano_data.cropped_y *= ratio;

          img.width = resized_pano_data.cropped_width;
          img.height = resized_pano_data.cropped_height;

          var buffer = document.createElement('canvas');
          buffer.width = resized_pano_data.full_width;
          buffer.height = resized_pano_data.full_height;

          var ctx = buffer.getContext('2d');
          ctx.drawImage(img, resized_pano_data.cropped_x, resized_pano_data.cropped_y, resized_pano_data.cropped_width, resized_pano_data.cropped_height);

          texture = new THREE.Texture(buffer);
        }
        else {
          texture = new THREE.Texture(img);
        }

        texture.needsUpdate = true;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;

        if (this.config.cache_texture) {
          this.putPanoramaCache({
            panorama: panorama,
            image: texture,
            pano_data: pano_data
          });
        }

        defer.resolve(texture);
      }
      let onprogress = function(e) {
        if (e.lengthComputable) {
          var new_progress = parseInt(e.loaded / e.total * 100);

          if (new_progress > progress) {
            progress = new_progress;
            this.loader.setProgress(progress);
            this.trigger('panorama-load-progress', panorama, progress);
          }
        }
      }
      let onerror = function(e) {
        this.container.textContent = 'Cannot load image';
        defer.reject(e);
        throw new PSVError('Cannot load image');
      };
      loader.load(panorama, onload.bind(this), onprogress.bind(this), onerror.bind(this))
    }).bind(this))
  }

  /**
   * 创建六面立方体纹理数据
   * @param panorama
   * @private
   */
  loadCubemapTexture (panorama) {
    let [loader, progress, loaded, done] = [new THREE.ImageLoader(), [0, 0, 0, 0, 0, 0], [], 0]
    loader.setCrossOrigin('anonymous');
    let onend = function() {
      loaded.forEach(function(img) {
        img.needsUpdate = true;
        img.minFilter = THREE.LinearFilter
        img.generateMipmaps = false
      })
    }
    console.log(onend(), progress, done)
  }

  /**
   * 创建纹理
   * @param texture
   * @private
   */
  setTexture (texture) {
    if (!this.scene) {
      this.createScene()
    }
    if (this.prop.isCubemap) {
      for (let i = 0; i < 6; i++) {
        if (this.mesh.material.materials[i].map) {
          this.mesh.material.materials[i].map.dispose()
        }
        this.mesh.material.materials[i].map = texture[i]
      }
    } else {
      if (this.mesh.material.map) {
        this.mesh.material.map.dispose()
      }
      this.mesh.material.map = texture
    }
    this.render()
  }

  /**
   * 创建3D场景和GUI组件
   */
  createScene () {
    this.raycaster = new THREE.Raycaster()
    this.renderer = DefaultConfig.SYSTEM.isWebGLSupported && this.config.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer()
    this.renderer.setSize(this.prop.size.width, this.prop.size.height)
    this.renderer.setPixelRatio(DefaultConfig.SYSTEM.pixelRatio)
    let cameraDistance = DefaultConfig.SPHERE_RADIUS
    if (this.prop.isCubemap) {
      cameraDistance *= Math.sqrt(3)
    }
    if (this.config.fisheye) {
      cameraDistance += DefaultConfig.SPHERE_RADIUS
    }
    this.camera = new THREE.PerspectiveCamera(this.config.default_fov, this.prop.size.width / this.prop.size.height, 1, cameraDistance)
    this.camera.position.set(0, 0, 0)
    if (this.config.gyroscope && PSVUtils.checkTHREE('DeviceOrientationControls')) {
      this.doControls = new THREE.DeviceOrientationControls(this.camera)
    }
    this.scene = new THREE.Scene()
    this.scene.add(this.camera)
    if (this.prop.isCubemap) {
      this.createCubemap()
    } else {
      this.createSphere()
    }
    // create canvas container
    this.canvasContainer = document.createElement('div')
    this.canvasContainer.className = 'psv-canvas-container'
    this.renderer.domElement.className = 'psv-canvas'
    this.container.appendChild(this.canvasContainer)
    this.canvasContainer.appendChild(this.renderer.domElement)
  }

  /**
   * 创建球形网格
   * @private
   */
  createSphere () {
    let geometry = new THREE.SphereGeometry(
      DefaultConfig.SPHERE_RADIUS,
      DefaultConfig.SPHERE_VERTICES,
      DefaultConfig.SPHERE_VERTICES,
      -PSVUtils.HalfPI
    )
    let material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      overdraw: DefaultConfig.SYSTEM.isWebGLSupported && this.config.webgl ? 0 : 1
    })
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.scale.x = -1
    this.scene.add(this.mesh)
  }

  /**
   * 创建立方体网格
   */
  createCubemap () {
    let geometry = new THREE.BoxGeometry(
      DefaultConfig.SPHERE_RADIUS * 2, DefaultConfig.SPHERE_RADIUS * 2, DefaultConfig.SPHERE_RADIUS * 2,
      DefaultConfig.CUBE_VERTICES, DefaultConfig.CUBE_VERTICES, DefaultConfig.CUBE_VERTICES
    )
    let materials = [];
    for (let i = 0; i < 6; i++) {
      materials.push(new THREE.MeshBasicMaterial({
        overdraw: DefaultConfig.SYSTEM.isWebGLSupported && this.config.webgl ? 0 : 1
      }))
    }
    this.mesh = new THREE.Mesh(geometry, new THREE.MultiMaterial(materials))
    this.mesh.position.x -= DefaultConfig.SPHERE_RADIUS
    this.mesh.position.y -= DefaultConfig.SPHERE_RADIUS
    this.mesh.position.z -= DefaultConfig.SPHERE_RADIUS
    this.mesh.applyMatrix(new THREE.Matrix4().makeScale(1, 1, -1))
    this.scene.add(this.mesh)
    let hiddenMaterial = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      visible: false
    })
    let hiddenMesh = new THREE.Mesh(geometry, hiddenMaterial)
    this.scene.add(hiddenMesh)
  }

  /**
   * 从当前过渡新纹理
   * @param texture
   * @param position
   * @private
   */
  transition (texture, position) {
    if (this.prop.isCubemap) {
      throw new Error('不能转换')
    }
    // create a new sphere with the new texture
    let geometry = new THREE.SphereGeometry(
      PhotoSphereViewer.SPHERE_RADIUS * 0.9,
      PhotoSphereViewer.SPHERE_VERTICES,
      PhotoSphereViewer.SPHERE_VERTICES,
      -PSVUtils.HalfPI
    )
    let material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      overdraw: DefaultConfig.SYSTEM.isWebGLSupported && this.config.webgl ? 0 : 1,
      map: texture,
      transparent: true,
      opacity: 0
    })
    let mesh = new THREE.Mesh(geometry, material)
    mesh.scale.x = -1
    if (position) {
      mesh.rotateY(position.longitude - this.prop.longitude)
      let axis = new THREE.Vector3(0, 1, 0).cross(this.camera.getWorldDirection()).normalize()
      let q = new THREE.Quaternion().setFromAxisAngle(axis, position.latitude - this.prop.latitude)
      mesh.quaternion.multiplyQuaternions(q, mesh.quaternion)
    }
    this.scene.add(mesh)
    this.render()
  }

  /**
   * 平滑过渡反向自转
   * @private
   */
  reverseAutorotate () {
    let that = this
    let newSpeed = -this.config.animSpeed
    let range = this.config.longitudeRange
    this.config.longitudeRange = null
  }

  /**
   * 添加全景数据到缓存
   * @param cache
   * @private
   */
  putPanoramaCache (cache) {
    if (!this.config.cacheTexture) {
      throw new Error('数据无法存入缓存');
    }
    let existingCache = this.getPanoramaCache(cache.panorama)
    if (existingCache) {
      existingCache.image = cache.image
      existingCache.panoData = cache.panoData
    } else {
      // 删除历史元素
      this.prop.cache = this.prop.cache.slice(0, this.config.cacheTexture - 1)
      this.prop.cache.unshift(cache)
    }
  }

  /**
   * 停止所有动作
   */
  stopAll () {
    this.stopAutorotate()
    this.stopAnimation()
    this.stopGyroscopeControl()
  }
}

export default ThreeInstance
