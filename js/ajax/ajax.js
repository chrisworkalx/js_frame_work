/**
 * 封装一个ajax
 *
 *
 */

function stringGetParams(url, params) {
  return Object.keys(params).reduce((prev, nextKey) => {
    const quot = prev.includes('?') ? '&' : '?';
    prev += `${quot}${nextKey}=${params[nextKey]}`;
    return prev;
  }, url);
}

class MyAjax {
  constructor(options) {
    this.options = this.initOption(options);
    this.initRequest();
  }

  static onXHRStateChange(options = this.options) {
    // const that = this;
    // readyState五个状态
    // 0:未初始化(Uninitialized)。尚未调用 open()方法。
    // 1:已打开(Open)。已调用 open()方法，尚未调用 send()方法。
    // 2:已发送(Sent)。已调用 send()方法，尚未收到响应。
    // 3:接收中(Receiving)。已经收到部分响应。
    // 4:完成(Complete)。已经收到所有响应，可以使用了。
    return function () {
      // console.log('MyAjax.xhr--init', MyAjax.xhr);
      if (MyAjax.xhr.readyState === 4) {
        options.complete && options.complete();
        if (MyAjax.xhr.status === 200) {
          // console.log('MyAjax.xhr-success', MyAjax.xhr);
          options.success && options.success(MyAjax.xhr.responseText);
        } else {
          // console.log('MyAjax.xhr-error', MyAjax.xhr);
          options.error &&
            options.error(MyAjax.xhr, MyAjax.xhr.status, MyAjax.xhr.statusText);
        }
      }
    }.bind(this);
  }

  static xhr = new XMLHttpRequest();

  initRequest() {
    const { type, data, url, success, error, complete } = this.options;
    const isGet = type.toLowerCase() === 'get';
    if (isGet) {
      MyAjax.getMethod(url, data, success, error, complete);
    } else {
      MyAjax.postMethod(url, data, success, error, complete);
    }
  }

  static getMethod(url, params, success, error, complete) {
    console.log('this', this);
    const finalUrl = stringGetParams(url, params);
    let combineOptions = {
      url: finalUrl,
      type: 'get',
      success,
      error,
      complete
    };
    this.options = this.options
      ? {
          ...this.options,
          combineOptions
        }
      : combineOptions;
    MyAjax.xhr.open('get', finalUrl);
    MyAjax.xhr.onreadystatechange = this.onXHRStateChange();
    MyAjax.xhr.send();
    return MyAjax.xhr;
  }

  static postMethod(url, params, success, error, complete) {
    // console.log('params', params);
    const finalData = JSON.stringify(params || {});
    let combineOptions = {
      url,
      type: 'post',
      data: finalData,
      success,
      error,
      complete
    };
    this.options = this.options
      ? {
          ...this.options,
          combineOptions
        }
      : combineOptions;

    // console.log('finalData', finalData);
    MyAjax.xhr.open('post', url);
    MyAjax.xhr.setRequestHeader('Content-type', 'application/json'); //默认配置
    MyAjax.xhr.onreadystatechange = this.onXHRStateChange();
    MyAjax.xhr.send(finalData);
    return MyAjax.xhr;
  }

  initOption(options) {
    options.type = options.type.toUpperCase() || 'GET';
    options.async ||= true;
    options.data ||= {};
    options.dataType ||= 'JSON';
    options.timeout ||= 10000;
    options.complete ||= function () {};
    options.success ||= function () {};
    options.error ||= function () {};
    return options;
  }

  abort() {
    if (MyAjax.xhr) {
      MyAjax.xhr.abort();
      MyAjax.xhr = null;
    }
  }
}
