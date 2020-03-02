

class WebTemplateHelpers {

  static ajaxCall(method, url, callback, data) {
    let req = new XMLHttpRequest();

    req.onload = function(userCallback, err) {

      switch(this.status / 100) {
        case 2: // any 2xx response.
          userCallback.call(undefined, this.response);
          break;
        //case 3: // any 3xx response.
        //  throw new Error('request was redirected');
        //  break;
        case 4: // any 4xx response.
          throw new Error('a client request error has occurred');
          break;
        case 5: // any 5xx response.
          throw new Error('a server error has occurred');
          break;
      };

    }.bind(req, callback);

    req.open(method, url, true);  // asynchronous request.

    //req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // lol...SpringMVC.
    //req.setRequestHeader('Content-Type', 'multipart/form-data');
    req.setRequestHeader('Content-Type', 'text/plain; charset=utf-8');
    //req.setRequestHeader('Accept', 'application/json'); // lol...SpringMVC.
    //req.responseType = 'json';

    req.send(JSON.stringify(data));
    //req.send(data);
  }

  static getElements(selectorStr, baseEl) {
    let pathAry = selectorStr.split(/\s+/);
    let els = [document || baseEl];
    let elsChildren;

    for (let pathAryIdx = 0; pathAryIdx < pathAry.length; pathAryIdx++) {
      let pathKey = pathAry[pathAryIdx];
      let id = pathKey.replace(/^[#\.]/, '');

      elsChildren = [];

      for (let elsIdx = 0; elsIdx < els.length; elsIdx++) {
        let el = els[elsIdx];
        let ary;

        if (this.isTag(pathKey)) {
          let tagEls = el.getElementsByTagName(id);

          ary = Array.from(tagEls);

        } else if (this.isClass(pathKey)) {
          let classEls = el.getElementsByClassName(id);

          ary = Array.from(classEls);

        } else if (this.isId(pathKey)) {
          let idEl = el.getElementById(id);

          ary = [idEl];
        }

        elsChildren = elsChildren.concat(ary);
      }

      els = elsChildren;
    }

    return els;
  }

  static isTag(identifier) {
    let regex = this.tagRegex;

    return !!identifier.match(regex);
  }

  static isId(identifier) {
    let regex = this.idRegex;

    return !!identifier.match(regex);
  }

  static isClass(identifier) {
    let regex = this.classRegex;

    return !!identifier.match(regex);
  }


  static get tagRegex() {
    return /^\w/;
  }

  static get idRegex() {
    return /^#/;
  }

  static get classRegex() {
    return /^\./;
  }

}
