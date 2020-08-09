# A Nunjucks and Gulp static site boilerplate

![Bitbucket Pipelines](https://img.shields.io/bitbucket/pipelines/Skerwe/nunjucks-static-site-boilerplate?style=for-the-badge)

Use [Gulp](https://gulpjs.com/) to build Sass styles and Nunjucks templates. This is the starting point for a static website.

## Getting Started

### Prerequisites

*__Note:__ if you've previously installed Gulp globally, run `npm rm --global gulp` to remove it. [Details here.](https://medium.com/gulpjs/gulp-sips-command-line-interface-e53411d4467)*

Make sure these are installed first.

- [Node.js](http://nodejs.org)
- [Gulp Command Line Utility](http://gulpjs.com) `npm install --global gulp-cli`

### Quick Start

Clone the repository with the name of your new project:  
`git clone https://Skerwe@bitbucket.org/Skerwe/nunjucks-static-site-boilerplate.git <project-name>`

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files and dependencies.
3. When it's done installing, run one of the tasks to get going:
    - `gulp` manually compiles files.
    - `gulp serve` automatically compiles files and applies changes using [BrowserSync](https://browsersync.io/) when you make changes to your source files.
4. Alternatively run:
    - `npm run build` to compile files.
    - `npm start` to serve and watch files with BrowserSync.
    - `npm test` run [TestCafe](https://devexpress.github.io/testcafe/) static page tests.

## License

This project is licensed under the MIT License -- see the [LICENSE](LICENSE) file for details
