const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const url = require('url')

let mainWindow

const Menu = electron.Menu
const template = [{
  label: 'Edit',
  submenu: [{
    label: 'Undo',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: 'Redo',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: 'Select All',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  }]
}]

function createWindow() {
  mainWindow = new BrowserWindow({width: 540, height: 306, maxWidth: 540, maxHeight: 306, frame: false, alwaysOnTop: true})

  mainWindow.loadURL(url.format({
    hostname: 'pinboard.in',
    pathname: 'add',
    // For testing, increase array positions by one
    search: 'url=' + process.argv[1] + '&title=' + process.argv[2],
    protocol: 'https:',
    slashes: true
  }))

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.executeJavaScript('document.getElementsByTagName("td")[4].innerHTML = "desc"')
    mainWindow.webContents.insertCSS('#popup_header{-webkit-user-select:none;-webkit-app-region:drag}')
    mainWindow.webContents.insertCSS('body{background-color:#f1f1f1;;font-family:-apple-system,BlinkMacSystemFont,sans-serif}a{color:#88a80d}td{color:dimgrey}input,textarea{border:0;padding:8px;border-radius:4px}textarea{max-width:425px}input:focus,textarea:focus{outline:2px solid #88a80d}input[type=submit]{width:440px;background-color:#88a80d;color:white}.bd{border:none !important;}.match{color:dimgrey !important}.active{color:white !important;background-color:#88a80d !important}') // Style the page. If removing this, height should be set to 252 and width to 546
  });

  mainWindow.on('closed', function() {
    mainWindow = null
    app.quit()
  })
}

app.on('ready', createWindow)
