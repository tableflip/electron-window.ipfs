const { ipcRenderer } = require('electron')
const { createProxyClient } = require('ipfs-postmsg-proxy')

const msgEventName = 'ipfs-postmsg-proxy:message'

window.ipfs = createProxyClient({
  postMessage: data => ipcRenderer.send(msgEventName, data),
  addListener: (_, handler) => ipcRenderer.on(msgEventName, handler),
  removeListener: (_, handler) => ipcRenderer.removeListener(msgEventName, handler),
  getMessageData: (_, data) => data
})
