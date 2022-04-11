# extext
Fast web development now in your browser using [CodeMirror](https://codemirror.net/).

I hope the code is not too complex such that you can use the code as the basis to use as a code editor for your own projects.

This project started off from my [tiny-code-editor](https://github.com/lewdev/tiny-code-editor) which was inspired by [Mini Code Editor](https://xem.github.io/miniCodeEditor/) by [xem](https://twitter.com/MaximeEuziere).

## ⚒️ Features
* Run HTML code in your browser using a Sublime Text-like editor.
* Download your work to an `html` file (i.e. `extext-20220312-182230.html`)
* The editor saves what you last ran on `localStorage`.
* Toggle between Horizontal and Vertical views.
* Minimal design.

## 💻 CodeMirror Features Enabled
* Sublime Text key-shortcuts
* Brackets matching
* Brackets auto complete
* Text highlight matching
* Tag highlight matching
* JavaScript hint and auto complete. ([details](https://codemirror.net/demo/complete.html))

## ⌨ Additional Key Shortcuts
* `Ctrl-'` or `Ctrl-S`: Run code in `iframe`.
* `Ctrl-S` : Saves text in editor to `extext-{timestamp}.html` file.
* `Ctrl-D` : (overridden) Delete line
* `Shift-Alt-Down` : Duplicate line
* `Shift-Alt-Up` : Duplicate line

<p align="center">
  <a href="https://lewdev.github.io/apps/extext">
    <img src="https://lewdev.github.io/apps/extext/img/main-icon.png" width="400"/><br/>
    👉 Try Extext Here
  </a><br/>
</p>

## ⛰ Screenshots

<p align="center">
  <a href="https://lewdev.github.io/apps/extext/screenshots/screenshot-1.png">
    <img src="https://lewdev.github.io/apps/extext/screenshots/screenshot-1.png" width="200" />
  </a>
  <a href="https://lewdev.github.io/apps/extext/screenshots/screenshot-2.png">
    <img src="https://lewdev.github.io/apps/extext/screenshots/screenshot-2.png" width="200" />
  </a>
</p>

## 👉 Next Features

Features I may or may not implement in the future.

* Help menu that displays all key shortcuts
* Github Gist integration. Enable loading and saving Gists.
* (separate, but related app) A JavaScript code-challenge builder.

## 🛠️ Tools & Resources used

* [CodeMirror](https://codemirror.net) the text editor code.
* html-minifier
* google-closure-compiler
* clean-css
* ant
* [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (vscode extension)

## 👤 Author: Lewis Nakao
I am a software engineer in Hawaii. Find more stuff I made [here](https://lewdev.github.io).

If you like to support me in building these apps in open source:

* [❤️ Sponsor Me](https://github.com/sponsors/lewdev)
* [💸 Send money via Paypal](https://paypal.me/lewisnakao)
