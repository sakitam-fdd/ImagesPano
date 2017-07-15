class ThreeInstance {
  loadTexture (path) {
    let texture = new THREE.Texture()
    let loader = new THREE.ImageLoader()
    let onLoad = (img) => {
      texture.needsUpdate = true
      texture.image = img
      this.createScene(texture)
    }
    loader.load(path, onLoad)
  }

  createScene (texture) {
    // New size?
    if (new_viewer_size.width !== undefined)
      container.style.width = new_viewer_size.width.css;

    if (new_viewer_size.height !== undefined)
      container.style.height = new_viewer_size.height.css;

    fitToContainer();

    // The chosen renderer depends on whether WebGL is supported or not
    renderer = (isWebGLSupported()) ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
    renderer.setSize(viewer_size.width, viewer_size.height);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(PSV_FOV_MAX, viewer_size.ratio, 1, 300);
    camera.position.set(0, 0, 0);
    scene.add(camera);

    // Sphere
    var geometry = new THREE.SphereGeometry(200, rings, segments);
    var material = new THREE.MeshBasicMaterial({map: texture, overdraw: true});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.scale.x = -1;
    scene.add(mesh);

    // Canvas container
    canvas_container = document.createElement('div');
    canvas_container.style.position = 'absolute';
    canvas_container.style.zIndex = 0;
    root.appendChild(canvas_container);

    // Navigation bar?
    if (display_navbar) {
      navbar.setStyle(navbar_style);
      navbar.create();
      root.appendChild(navbar.getBar());
    }

    // Overlay?
    if (overlay !== null) {
      // Add the image
      var overlay_img = document.createElement('img');

      overlay_img.onload = function () {
        overlay_img.style.display = 'block';

        // Image position
        overlay_img.style.position = 'absolute';
        overlay_img.style[overlay.position.x] = '5px';
        overlay_img.style[overlay.position.y] = '5px';

        if (overlay.position.y == 'bottom' && display_navbar)
          overlay_img.style.bottom = (navbar.getBar().offsetHeight + 5) + 'px';

        // Should we resize the image?
        if (overlay.size !== undefined) {
          overlay_img.style.width = overlay.size.width;
          overlay_img.style.height = overlay.size.height;
        }

        root.appendChild(overlay_img);
      };

      overlay_img.src = overlay.image;
    }

    // Adding events
    addEvent(window, 'resize', fitToContainer);

    if (user_interactions_allowed) {
      addEvent(canvas_container, 'mousedown', onMouseDown);
      addEvent(document, 'mousemove', onMouseMove);
      addEvent(canvas_container, 'mousemove', showNavbar);
      addEvent(document, 'mouseup', onMouseUp);

      addEvent(canvas_container, 'touchstart', onTouchStart);
      addEvent(document, 'touchend', onMouseUp);
      addEvent(document, 'touchmove', onTouchMove);

      if (scroll_to_zoom) {
        addEvent(canvas_container, 'mousewheel', onMouseWheel);
        addEvent(canvas_container, 'DOMMouseScroll', onMouseWheel);
      }

      self.addAction('fullscreen-mode', toggleArrowKeys);
    }

    addEvent(document, 'fullscreenchange', fullscreenToggled);
    addEvent(document, 'mozfullscreenchange', fullscreenToggled);
    addEvent(document, 'webkitfullscreenchange', fullscreenToggled);
    addEvent(document, 'MSFullscreenChange', fullscreenToggled);

    sphoords.addListener(onDeviceOrientation);

    // First render
    container.innerHTML = '';
    container.appendChild(root);

    var canvas = renderer.domElement;
    canvas.style.display = 'block';

    canvas_container.appendChild(canvas);
    render();

    // Zoom?
    if (zoom_lvl > 0)
      zoom(zoom_lvl);

    // Animation?
    anim();

    /**
     * Indicates that the loading is finished: the first image is rendered
     * @callback PhotoSphereViewer~onReady
     **/

    triggerAction('ready');
  }

  /**
   * Renders an image.
   * @private
   * @return {void}
   **/
  render () {
    let point = new THREE.Vector3()
    point.setX(Math.cos(lat) * Math.sin(long))
    point.setY(Math.sin(lat))
    point.setZ(Math.cos(lat) * Math.cos(long))
    camera.lookAt(point)
    if (stereo_effect !== null) {
      stereo_effect.render(scene, camera)
    } else {
      renderer.render(scene, camera)
    }
  }

  /**
   * Starts the stereo effect.
   * @private
   * @return {void}
   **/

  startStereo () {
    stereo_effect = new THREE.StereoEffect(renderer);
    stereo_effect.eyeSeparation = eyes_offset;
    stereo_effect.setSize(viewer_size.width, viewer_size.height);

    startDeviceOrientation();
    enableFullscreen();
    navbar.mustBeHidden();
    render();

    /**
     * Indicates that the stereo effect has been toggled.
     * @callback PhotoSphereViewer~onStereoEffectToggled
     * @param {boolean} enabled - `true` if stereo effect is enabled, `false` otherwise
     **/

    triggerAction('stereo-effect', true);
  }

  /**
   * Stops the stereo effect.
   * @private
   * @return {void}
   **/

  stopStereo () {
    stereo_effect = null;
    renderer.setSize(viewer_size.width, viewer_size.height);

    navbar.mustBeHidden(false);
    render();

    triggerAction('stereo-effect', false);
  }

  /**
   * Toggles the stereo effect (virtual reality).
   * @public
   * @return {void}
   **/

  toggleStereo () {
    if (stereo_effect !== null)
      stopStereo();

    else
      startStereo();
  }

  /**
   * Automatically animates the panorama.
   * @private
   * @return {void}
   **/

  anim () {
    if (anim_delay !== false)
      anim_timeout = setTimeout(startAutorotate, anim_delay);
  }

  /**
   * Automatically rotates the panorama.
   * @private
   * @return {void}
   **/

  autorotate () {
    lat -= (lat - anim_lat_target) * anim_lat_offset;

    long += anim_long_offset;

    var again = true;

    if (!whole_circle) {
      long = stayBetween(long, PSV_MIN_LONGITUDE, PSV_MAX_LONGITUDE);

      if (long == PSV_MIN_LONGITUDE || long == PSV_MAX_LONGITUDE) {
        // Must we reverse the animation or simply stop it?
        if (reverse_anim)
          anim_long_offset *= -1;

        else {
          stopAutorotate();
          again = false;
        }
      }
    }

    long = getAngleMeasure(long, true);

    triggerAction('position-updated', {
      longitude: long,
      latitude: lat
    });

    render();

    if (again)
      autorotate_timeout = setTimeout(autorotate, PSV_ANIM_TIMEOUT);
  }

  /**
   * Starts the autorotate animation.
   * @private
   * @return {void}
   **/

  startAutorotate () {
    autorotate();

    /**
     * Indicates that the autorotate animation state has changed.
     * @callback PhotoSphereViewer~onAutorotateChanged
     * @param {boolean} enabled - `true` if animation is enabled, `false` otherwise
     **/

    triggerAction('autorotate', true);
  }

  /**
   * Stops the autorotate animation.
   * @private
   * @return {void}
   **/

  stopAutorotate () {
    clearTimeout(anim_timeout);
    anim_timeout = null;

    clearTimeout(autorotate_timeout);
    autorotate_timeout = null;

    triggerAction('autorotate', false);
  }

  /**
   * Launches/stops the autorotate animation.
   * @public
   * @return {void}
   **/

  toggleAutorotate () {
    clearTimeout(anim_timeout);

    if (!!autorotate_timeout)
      stopAutorotate();

    else
      startAutorotate();
  }
}

export default ThreeInstance
