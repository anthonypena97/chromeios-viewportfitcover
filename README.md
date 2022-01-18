# chromeios-viewportfitcover
A Work Around for mimicking Safari's viewport-fit: cover on Chrome, which extends a web page past the iPhone notch.

![MIT License badge](https://img.shields.io/badge/license-MIT_License-green)

[![chromeios-viewport-demo](https://user-images.githubusercontent.com/79285555/149988718-ac127706-4d0f-4e2c-a7c8-01b738398868.gif)](https://anthonypena97.github.io/chromeios-viewportfitcover/)

#### Demo Site: https://anthonypena97.github.io/chromeios-viewportfitcover/

<p> ---------------------------------------- </p>

Application written in Typescript, within a [Three.Js](https://threejs.org/) enviornment to generate HTML Canvas.

## Creator Message

*I could not find a solution for extending the web page past the iPhone 12 notch for Google Chrome, so I set to figure it out myself. Safari developed a solution with the inclusion of [Viewport-fit: cover](https://webkit.org/blog/7929/designing-websites-for-iphone-x/). My use case was for a 3D Web App I was making and wanted the HTMLcanvas/scene to take up the whole space. This is not the perfect solution, but I hope you may find use of it, or that it might help you find your own approach. The client.ts (javascript for page) is written within a three.js enviornment, but I'm sure you can draw your own solutions for your own context with some studying. I found this solution by noticing when one zooms on a page on the Chrome iOS app, the whole viewport is used. Email me if you have any questons. Peace!*

## Table of Contents

- [Solution](#solution)
- [Usage](#usage)
- [Installation](#installation)
- [Notes](#notes)
- [License](#license)
- [Version History](#version)
- [Contributing](#contributing)
- [Questions](#questions)
- [Acknowledgmenets](#acknowledgments)

## Soltution

In simple terms, my approach to extending the web page past the iPhone notch is to zoom on the page, and scroll to the middle.

Details with my function names and numbers:
- Include event listener for window resizing, which triggers a function (onWindowResize) to determine if window is mobile and landscape (checkLandscape)
- Declare a zoom value with desired number, I chose 1.5
- If mobile and landscape, zoom page with css property `zoom`, or in my case, multiply the htmlCanvas size width and height by determined zoom amount
- If document includes `overflow: hidden` styling, it must be "unlocked" momentarily with `overflow: visible`
- Declare `middleX` with a value to equal `innerWidth * zoom / 6`
- Delare `middleY` with a value value to equal `innerHieght * zoom / 6`
- use `window.scrollTo(middleX, middleY)`
- Lock page again by adding `overflow: hidden` styling where needed

## Usage

To view a working demo of the soltion, simply visit [chromeios-viewportfitcover](https://anthonypena97.github.io/chromeios-viewportfitcover/)
The blue is the HTMLCanvas and red is the HTML Document with a background color of red.

## Installation

To work with code:

- download, fork, or clone repository
- open terminal in application root directory
- enter,`npm i`
- analyze client.ts and index.html
- enter, `npm run dev` for development
- enter, `npm run build` once complete
- copy new bundle.js, index.html, and any public assets from dist/client/ folder
- use copied files for deployment

## Notes

This application has been tested through and written for Chrome v.97, Safari v.14, iOS v.14, Safari iOs, Chrome iOs, and Instagram. This application is responsive to both Desktop and Mobile use cases.

## License

MIT License

Copyright (c) 2022 Anthony Pena

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation fil (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge,publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Version History

- v1.0.0 is latest version
  - - See [commit change](https://github.com/anthonypena97/chromios-viewportfitcover/commits/main) or See [release history](https://github.com/anthonypena97/chromeios-viewportfitcover/releases)

## Contributing

Please refer to the [Contributor Covenenant](https://www.contributor-covenant.org/) for guidelines on contributing on this project.

## Questions

For any inquiries or questions, please contact Anthony Pena via:

- GitHub: [anthonypena97](https://github.com/anthonypena97)
- Email: <anthony.e.p3na@gmail.com>

## Acknowledgments

Inspiration, code snippets, etc.

- [Emerald Isle Record Page](http://theemeraldisle.us/)
