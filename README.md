To support my continued open-source work, pick a method:

[<img src='https://upload.wikimedia.org/wikipedia/commons/5/53/PayPal_2014_logo.svg' height='18' alt='Support via Paypal'>](https://www.paypal.me/vitorgalvao)&nbsp;&nbsp;
[<img src='https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg' height='15' alt='Support via Bitcoin'>](http://vitorgalvao.com/bitcoin_tip_jar.html)&nbsp;&nbsp;
[<img src='https://dl.dropboxusercontent.com/s/y3pft1fbmer5v22/society6.svg' height='19' alt='Support via Society6'>](https://vitorgalvao.com/society6)

# <img src='https://i.imgur.com/4cX4Eex.png' width='45' align='center' alt='PinPlus logo'> PinPlus

GUI to add Pinboard bookmarks, controllable via CLI. Built for use with the [PinPlus Alfred Workflow](https://github.com/vitorgalvao/alfred-workflows/tree/master/PinPlus), but works just as well as a standalone app.

![](https://i.imgur.com/NasZq96.png)

## Usage

Pinplus works by loading [Pinboard’s add a link page](https://pinboard.in/add) with your given parameters to auto-fill options and a few style modifications. The first time you open it, you’ll need to login to your Pinboard account.

If you open PinPlus with a web browser as your frontmost app, it’ll grab the URL and title directly from the page. You can also give it a URL and title from the command line:

```bash
PinPlus.app/Contents/MacOS/PinPlus "{{page_url}}" "{{page_title}}"
```

## Install

[Download the latest version](https://github.com/vitorgalvao/pinplus/releases).

## Development

Built with [Electron](http://electron.atom.io).

`npm start` will call `electron main.js` and only then give the arguments. This means that while testing, an extra argument is passed on the command line. As such, the `process.argv` array positions need to be increased by one when testing, and be returned to their original state before building the app.

##### Commands

- Install dependencies: `npm install`
- Run: `npm start`
- Build for macOS: `npm run build-macos`
- Build for all platforms: `npm run build`
- Build for macOS and package as a zip: `npm run package-macos`
- Build for all platforms and package as a zip: `npm run package`

Currently, only macOS is supported. I do not intend to officially support other platforms in the near future since I cannot consistently and reliably test on them, but am willing to add support if someone wants to collaborate in doing the legwork.

#### License

The Unlicense (Public Domain, essentially)
