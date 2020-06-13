const { app, BrowserWindow, globalShortcut, Menu } = require('electron')
const url = require('url')
const execSync = require('child_process').execSync

let mainWindow
const grey_bf = '#f1f1f1'

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

function getUrlTitle(pageUrl, pageTitle) {
  if (pageUrl) return [pageUrl, pageTitle]

  // If no arguments are given, try to get info from frontmost browser
  return execSync(`/usr/bin/osascript -l JavaScript -e "
    const frontmost_app_name = Application('System Events').applicationProcesses.where({ frontmost: true }).name()[0]
    const frontmost_app = Application(frontmost_app_name)

    const chromium_variants = ['Google Chrome', 'Chromium', 'Opera', 'Vivaldi', 'Brave Browser', 'Microsoft Edge']
    const webkit_variants = ['Safari', 'Webkit']

    if (chromium_variants.some(app_name => frontmost_app_name.startsWith(app_name))) {
      var current_tab_title = frontmost_app.windows[0].activeTab.name()
      var current_tab_url = frontmost_app.windows[0].activeTab.url()
    } else if (webkit_variants.some(app_name => frontmost_app_name.startsWith(app_name))) {
      var current_tab_title = frontmost_app.documents[0].name()
      var current_tab_url = frontmost_app.documents[0].url()
    } else {
      var current_tab_title = ''
      var current_tab_url = ''
    }

    current_tab_url + '|' + current_tab_title
  "`).toString().trim().split('|')
}

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 540,
    height: 306,
    maxWidth: 540,
    maxHeight: 306,
    frame: false,
    backgroundColor: grey_bf,
    alwaysOnTop: true,
    show: false // Avoid initial flash of no content by not showing window on start
  })

  // Try to get url and title from CLI arguments
  if (process.defaultApp) process.argv.shift(); // Normalise argument positions when running with electron and built app
  const pageInfo = getUrlTitle(process.argv[1], process.argv[2])

  mainWindow.loadURL(url.format({
    hostname: 'pinboard.in',
    pathname: 'add',
    search: 'url=' + pageInfo[0] + '&title=' + pageInfo[1],
    protocol: 'https:',
    slashes: true
  }))

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.executeJavaScript('descCell = document.getElementsByTagName("td")[4];if (descCell.innerHTML === "description") descCell.innerHTML = "desc"')
    mainWindow.webContents.insertCSS('#popup_header{-webkit-user-select:none;-webkit-app-region:drag}')
    mainWindow.webContents.insertCSS('body{background-color:' + grey_bf + ';font-family:-apple-system,BlinkMacSystemFont,sans-serif}a{color:#88a80d}td{color:dimgrey}#title>a{pointer-events:none}input,textarea{border:0;padding:8px;border-radius:4px}textarea{max-width:425px}input:focus,textarea:focus{outline:2px solid #88a80d}input[type=submit]{width:440px;background-color:#88a80d;color:white}input[name=username],input[name=password]{width:424px}.bd{border:none !important}.match{color:dimgrey !important}.active{color:white !important;background-color:#88a80d !important}') // Style the page. If removing this, height should be set to 252 and width to 546

    mainWindow.show() // Show window after content loads
  })

  globalShortcut.register('Escape', function() { app.quit() })
})
