

class WebTemplate {

  load(templateURL) {
    let promise = this.constructor.retrieveTemplate(templateURL)

    return promise;
  }

  render(targEls, /* ... */) {
    let content;
    let data;
    let els;

    if (targEls.constructor === HTMLCollection) {
      els = Array.from(targEls)
    } else if (!Array.isArray(targEls)) {
      els = Array.of(targEls);
    }

    if (arguments.length > 2) {
      // three arguments indicate that data was provided.
      data = arguments[1];
      content = arguments[2];

    } else {
      // two arguments indicates that no data was provided.
      content = arguments[1];

    }

    for (let elsIdx = 0; elsIdx < els.length; elsIdx++) {
      let el = els[elsIdx];

      // append our content to the target element.
      this.constructor.applyTemplate(el, content, true);

      if (data) {
        // apploy given data to the target element.
        this.constructor.applyData(el, data);
      }

    }

  }

  static retrieveTemplate(url) {
    let promise = new Promise(((resolve, reject) => {

      if (this.cache[url]) {
        let content = this.cache[url];

        resolve(content);

      } else {

       WebTemplateHelpers.ajaxCall('GET', url, resolve);

      }

    }).bind(this));

    return promise
      .then(((content) => {

        this.cache[url] = content;

        return content;
      }).bind(this))
  }

  static applyTemplate(targEl, content, shouldAppend) {

    if (shouldAppend) {
      targEl.innerHTML += content;

    } else {
      targEl.innerHTML = content;

    }

  }

  static applyData(targEl, obj) {

    for (let pathStr in obj) {
      let elsChildren = WebTemplateHelpers.getElements(pathStr, targEl)
      let data = obj[pathStr];

      if (!Array.isArray(data)) {
        data = Array.of(data);
      }

      for (let childIdx = 0; childIdx < elsChildren.length; childIdx++) {
        let childEl = elsChildren[childIdx];
        let dataEntry = data[childIdx % data.length];

        for (let attrib in dataEntry) {
          childEl[attrib] = dataEntry[attrib];

        }

      }

    }

  }

  static get cache() {

    if (!window.templateCache) {
      window.templateCache = {};
    }

    return window.templateCache;
  }

}
