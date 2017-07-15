class Observable {
  on (events, callback) {
    this.__events = this.__events || {}
    if (typeof events === 'object') {
      for (let event in events) {
        if (events.hasOwnProperty(event)) {
          this.__events[event] = this.__events[event] || []
          this.__events[event].push(events[event])
        }
      }
    } else {
      events.split(' ').forEach(function (event) {
        this.__events[event] = this.__events[event] || []
        this.__events[event].push(callback)
      }, this)
    }
    return this
  }

  un (events, callback) {
    this.__events = this.__events || {}
    if (typeof events === 'object') {
      for (let event in events) {
        if (events.hasOwnProperty(event) && (event in this.__events)) {
          let index = this.__events[event].indexOf(events[event])
          if (index !== -1) this.__events[event].splice(index, 1)
        }
      }
    } else if (!!events) {
      events.split(' ').forEach(function (event) {
        if (event in this.__events) {
          if (callback) {
            let index = this.__events[event].indexOf(callback)
            if (index !== -1) this.__events[event].splice(index, 1)
          } else {
            this.__events[event].length = 0
          }
        }
      }, this)
    } else {
      this.__events = {}
    }
    return this
  }

  once (events, callback) {
    this.__once = this.__once || {}
    if (typeof events === 'object') {
      for (let event in events) {
        if (events.hasOwnProperty(event)) {
          this.__once[event] = this.__once[event] || []
          this.__once[event].push(events[event])
        }
      }
    } else {
      events.split(' ').forEach(function (event) {
        this.__once[event] = this.__once[event] || []
        this.__once[event].push(callback)
      }, this)
    }
    return this
  }

  trigger (event) {
    let args = Array.prototype.slice.call(arguments, 1)
    let e = new uEvent.Event(event, args)
    var i, l, f;
    args.push(e)
    if (this.__events && event in this.__events) {
      for (i = 0, l = this.__events[event].length; i < l; i++) {
        f = this.__events[event][i]
        if (typeof f === 'object') {
          f.handleEvent(e)
        } else {
          f.apply(this, args)
        }
        if (e.isPropagationStopped()) {
          return e
        }
      }
    }
    if (this.__once && event in this.__once) {
      for (i = 0, l = this.__once[event].length; i < l; i++) {
        f = this.__once[event][i];
        if (typeof f === 'object') {
          f.handleEvent(e)
        } else {
          f.apply(this, args)
        }
        if (e.isPropagationStopped()) {
          delete this.__once[event]
          return e
        }
      }
      delete this.__once[event]
    }
    return e
  }

  change (event, value) {
    var args = Array.prototype.slice.call(arguments, 1)
    var e = new uEvent.Event(event, args)
    var i, l, f

    args.push(e)

    if (this.__events && event in this.__events) {
      for (i = 0, l = this.__events[event].length; i < l; i++) {
        args[0] = value
        f = this.__events[event][i]
        if (typeof f === 'object') {
          value = f.handleEvent(e)
        } else {
          value = f.apply(this, args)
        }
        if (e.isPropagationStopped()) {
          return value
        }
      }
    }

    return value;
  }

  static Event = function (type, args) {
    let typeReadOnly = type
    let argsReadonly = args
    Object.defineProperties(this, {
      'type': {
        get: function () {
          return typeReadOnly
        },
        set: function (value) {
        },
        enumerable: true
      },
      'args': {
        get: function () {
          return argsReadonly
        },
        set: function (value) {
        },
        enumerable: true
      }
    })
    this.isDefaultPrevented = false
    this.isPropagationStopped = true
    this.preventDefault = function () {
      this.isDefaultPrevented = true
    }
    this.stopPropagation = function () {
      this.isPropagationStopped = true
    }
  }
  static mixin = function (target, names) {
    names = names || {}
    target = (typeof target === 'function' ? target.prototype : target)
    (['on', 'off', 'once', 'trigger', 'change']).forEach(function (name) {
      let method = names[name] || name;
      target[method] = uEvent.prototype[name]
    })
    Object.defineProperties(target, {
      '__events': {
        value: null,
        writable: true
      },
      '__once': {
        value: null,
        writable: true
      }
    })
  }
  static unByKey = function (key) {
    if (Array.isArray(key)) {
      for (var i = 0, ii = key.length; i < ii; ++i) {
      }
    } else {
    }
  }
}
export default Observable
