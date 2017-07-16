/**
 * 获取两数值之间的随机值
 * @param t1 <下限>
 * @param t2 <上限>
 * @param t3 <需要保留的小数位, 不能大于十五位>
 * @returns {*}
 */
export const getrandom = (t1, t2, t3) => {
  if (!t1 || isNaN(t1)) {
    t1 = 0
  }
  if (!t2 || isNaN(t2)) {
    t2 = 1
  }
  if (!t3 || isNaN(t3)) {
    t3 = 0
  }
  t3 = t3 > 15 ? 15 : t3
  let [ra, du] = [(Math.random() * (t2 - t1) + t1), (Math.pow(10, t3))]
  ra = (Math.round(ra * du) / du)
  return ra
}

/**
 * 获取id
 * @returns {*|string|!Array.<T>}
 */
export const getuuid = () => {
  let [s, hexDigits] = [[], '0123456789abcdef']
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  return (s.join(''))
}

/**
 * 去除字符串前后空格
 * @param str
 * @returns {*}
 */
export const trim = (str) => {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '')
}

/**
 * 将类名截取成数组
 * @param str
 * @returns {Array|*}
 */
export const splitWords = (str) => {
  return trim(str).split(/\s+/)
}

/**
 * 确保值在给定的范围内
 * @param x
 * @param min
 * @param max
 * @returns {number}
 */
export const stayBetween = (x, min, max) => {
  return Math.max(min, Math.min(max, x))
}

/**
 * 计算两点之间的距离（距离的平方）
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number}
 */
export const dist = (x1, y1, x2, y2) => {
  let x = x2 - x1
  let y = y2 - y1
  return (x * x + y * y)
}

/**
 * 返回角度的度量（0和2π之间）
 * @param angle
 * @param allowed
 * @returns {number}
 */
export const getAngleMeasure = (angle, allowed) => {
  allowed = (allowed !== undefined) ? !!allowed : false
  return ((allowed && angle === 2 * Math.PI) ? 2 * Math.PI : angle - Math.floor(angle / (2.0 * Math.PI)) * 2.0 * Math.PI)
}
