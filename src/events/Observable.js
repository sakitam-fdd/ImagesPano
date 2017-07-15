let Events = {}
let __cnt = 0
/**
 * 事件分发
 * @param eventName
 * @param callback
 * @param context
 * @returns {(*|*)[]}
 */
const on = (eventName, callback, context) => {
  return bindEvent(eventName, callback, 0, context)
}
/**
 * 取消监听
 * @param event
 * @returns {boolean}
 */
const un = (event) => {
  let [eventName, key, r, type] = ['', '', false, (typeof event)]
  if (type === 'string') {
    if (hasOwnKey(Events, event)) {
      delete Events[event]
      return true
    }
    return false
  } else if (type === 'object') {
    eventName = event[0]
    key = event[1]
    if (hasOwnKey(Events, eventName) && hasOwnKey(Events[eventName], key)) {
      delete Events[eventName][key]
      return true
    }
    return false
  } else if (type === 'function') {
    eachEvent(Events, function (keyA, itemA) {
      eachEvent(itemA, function (keyB, itemB) {
        if (itemB[0] === event) {
          delete Events[keyA][keyB]
          r = true
        }
      })
    })
    return r
  }
  return true
}
/**
 * 事件监听（只触发一次）
 * @param eventName
 * @param callback
 * @param context
 * @returns {(*|*)[]}
 */
const once = (eventName, callback, context) => {
  return bindEvent(eventName, callback, 1, context)
}
/**
 * 响应事件
 * @param eventName
 * @param args
 */
const action = (eventName, args) => {
  if (hasOwnKey(Events, eventName)) {
    eachEvent(Events[eventName], function (key, item) {
      item[0].apply(item[2], args)
      if (item[1]) {
        delete Events[eventName][key]
      }
    })
  }
}
/**
 * 实时触发响应
 * @param eventName
 */
const dispatch = (eventName) => {
  let args = slice(arguments, 1)
  setTimeout(function () {
    action(eventName, args)
  })
}
/**
 * 延后触发响应
 * @param eventName
 */
const dispatchSync = (eventName) => {
  action(eventName, slice(arguments, 1))
}
/**
 * 清空发布中心
 */
const clear = () => {
  Events = {}
}
/**
 * 绑定事件
 * @param eventName
 * @param callback
 * @param isOne
 * @param context
 * @returns {[*,*]}
 */
const bindEvent = (eventName, callback, isOne, context) => {
  if (typeof eventName !== 'string' || typeof callback !== 'function') {
    throw new Error('传入的事件名称和回调函数有误！')
  }
  if (!hasOwnKey(Events, eventName)) {
    Events[eventName] = {}
  }
  Events[eventName][++__cnt] = [callback, isOne, context]
  return [eventName, __cnt]
}
const hasOwnKey = Function.call.bind(Object.hasOwnProperty)
const slice = Function.call.bind(Array.prototype.slice)
const eachEvent = (obj, callback) => {
  for (let key in obj) {
    if (hasOwnKey(obj, key)) {
      callback(key, obj[key])
    }
  }
}
export default {
  on,
  once,
  un,
  dispatch,
  dispatchSync,
  clear
}
