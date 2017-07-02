class AjaxUtil {
  loadXMP () {
    let xhr = null
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
      try {
        xhr = new ActiveXObject('Msxml2.XMLHTTP')
      } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }
    } else {
      this.container.textContent = 'XHR is not supported, update your browser!'
      return false
    }
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(xhr.responseText)
        } else {
          reject('error')
        }
      }
      xhr.open('GET', this.options['panorama'], true)
      xhr.send(null)
    })
  }
}

export default AjaxUtil
