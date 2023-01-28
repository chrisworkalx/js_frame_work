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
> 在取消操作后，在 fetch promise 上的 catch 块将被调用，并且将传递一个 AbortError 对象。
```js
fetch(url, { signal: controller.signal }).catch(err => {
    if (err.name === 'AbortError') {
      console.log('Fetch abort')
    } else {
      console.log('Fetch Error:', err)
    }
  });
任何时候都可以调用 controller.abort() 取消fetch请求，但是请注意在某些情况下取消可能不会立即生效。
```

> 调用 controller.abort() 方法可以立即取消请求，但是在某些情况下可能不会立即生效。

> 首先，请确保你在请求中使用了 AbortController 的 signal 属性，例如在 fetch 请求中：
```js
fetch(url, { signal: controller.signal });

```

然后，在取消请求时，可以尝试以下方法来确保取消立即生效:

立即调用 controller.abort() 。在请求还未发出或者正在进行时立即取消。

在 fetch promise 的 then 块或者 catch 块中调用 controller.abort() 方法。这样就可以确保请求已经发出,并且正在进行,可以立即取消。

使用 setTimeout 函数调用 controller.abort() 方法。 例如：

```js
setTimeout(() => {
    controller.abort();
}, 0);

```
<p style="color: red;">
    这样可以确保请求已经发出,并且正在进行,可以立即取消。

注意：在取消操作后，在 fetch promise 上的 catch 块将被调用，并且将传递一个 AbortError 对象。

总之，在使用AbortController取消fetch请求时，需要根据不同的场景来确定最佳的取消时机。
</p>
