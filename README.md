# electron-window.ipfs

> This is a test repo to see if we can add `window.ipfs` to a web page bundled in electron.

In this repo we're using the [`<webview>`](https://electronjs.org/docs/api/webview-tag) tag in the renderer process to load up a web app from a URL.

```html
<webview
  src="https://ipfs.io/ipfs/QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn/"
  preload="./webview.js"></webview>
```

The web app makes use of `window.ipfs` if it is available.

The [`preload`](https://electronjs.org/docs/api/webview-tag#preload) attribute allows us to run a script on the `<webview>` page before other scripts run. We use `preload` to create the `window.ipfs` object that the app can use.

**webview.js**

```js
const { ipcRenderer } = require('electron')
const { createProxyClient } = require('ipfs-postmsg-proxy')

window.ipfs = createProxyClient({
  postMessage: data => ipcRenderer.send('ipfs-postmsg-proxy:message', data),
  addListener: (_, handler) => ipcRenderer.on('ipfs-postmsg-proxy:message', handler),
  removeListener: (_, handler) => ipcRenderer.removeListener('ipfs-postmsg-proxy:message', handler),
  getMessageData: (_, data) => data
})
```

The `window.ipfs` object is a proxy that uses IPC messaging to communicate with the IPFS node running in the main process. We're using [`ipfs-postmsg-proxy`](https://github.com/tableflip/ipfs-postmsg-proxy) for this.
