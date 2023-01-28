# fetch如何取消重复请求
> 使用 AbortController 和 fetch 可以取消重复请求。使用方式如下：

1. 首先，在你的代码中创建一个 AbortController 对象。

```js
const controller = new AbortController();
```

2. 然后，在你的 fetch 请求中使用这个对象的 signal 属性。
```js
fetch(url, { signal: controller.signal });
```
3. 在你需要取消请求时，调用 controller.abort() 方法。
```js
controller.abort();

```
> error 注意：AbortController 是一个新的API, 浏览器支持可能不完全。
