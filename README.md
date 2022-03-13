# (npm) packk
Simple to use tool that packs and minifies JavaScript files into one single file.

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

This is a command line tool only.
The following steps demonstrate the installation and usage.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation and Usage

1. Install via NPM
   ```sh
   npm i -g packk
   ```
2. Generate a packk.json template file.
   This is where all the configuration will be.
   ```sh
   packk init
   ```
3. Configure the packk file
   ```json
   {
    "output": "./dist/out.js",
    "prefix": "This will be shown before the source code in the packaged file",
    "anonymize": true,
    "files": [
      "./src/foo.js",
      "./src/bar.js",
      "./src/foobar.js"
    ]
   }
   ```
   Note: if the anonymize flag is set to true, the entire packaged code will be wrapped in an anonymous function so that it is not accessible from the browser console.
   
   
5. Package the source files 
   ```sh
   packk <filepath to packk.json file>
   ```
   

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

E-Mail: plate.felix@gmx.de

Project Link: [https://github.com/tensoid/packk](https://github.com/tensoid/packk)

NPM Link:  [https://www.npmjs.com/package/packk](https://www.npmjs.com/package/packk)

<p align="right">(<a href="#top">back to top</a>)</p>
