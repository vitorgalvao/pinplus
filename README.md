To support my continued open-source work, pick a method:

[<img src='https://upload.wikimedia.org/wikipedia/commons/5/53/PayPal_2014_logo.svg' height='18' alt='Support via Paypal'>](https://www.paypal.me/vitorgalvao)&nbsp;&nbsp;
[<img src='https://upload.wikimedia.org/wikipedia/commons/c/c5/Bitcoin_logo.svg' height='15' alt='Support via Bitcoin'>](http://vitorgalvao.com/bitcoin_tip_jar.html)

# <img src='https://i.imgur.com/4cX4Eex.png' width='45' align='center' alt='PinPlus logo'> PinPlus

### PinPlus

Use a CLI to call a GUI to add Pinboard bookmarks. Built for use with the [PinPlus Alfred Workflow](https://github.com/vitorgalvao/alfred-workflows/tree/master/PinPlus).

![](https://i.imgur.com/NasZq96.png)

## Usage

Pinplus works by loading [Pinboard’s add a link page](https://pinboard.in/add) with your given parameters to auto-fill options and a few style modifications. The first time you open it, you’ll need to login to your Pinboard account.

While you can simply open PinPlus and add a bookmark from there, it’s meant to be called with its CLI:

```bash
PinPlus.app/Contents/MacOS/PinPlus "{{page_url}}" "{{page_title}}"
```

In conjunction with the [AppleScript and JavaScript for Automation to get frontmost tab’s url and title of various browsers gist](https://gist.github.com/vitorgalvao/5392178), you can easily grab the required information from the active tab of your frontmost browser to automated filling the details.

## Install

[Download the latest version](https://github.com/vitorgalvao/pinplus/releases), or install via the [PinPlus Alfred Workflow](https://github.com/vitorgalvao/alfred-workflows/tree/master/PinPlus).

## Development

Built with [Electron](http://electron.atom.io).

`npm start` will call `electron main.js` and only then give the arguments. This means that while testing, an extra argument is passed on the command line. As such, the `process.argv` array positions need to be increased by one when testing, and be returned to their original state before building the app.

##### Commands

- Install dependencies: `npm install`
- Run: `npm start`
- Build for macOS: `npm run build-macos`
- Build for all platforms: `npm run build`

Currently, only macOS is supported. I do not intend to officially support other platforms in the near future since I cannot consistently and reliably test on them, but am willing to add support if someone wants to collaborate in doing the legwork.

#### License

The Unlicense (Public Domain, essentially)
