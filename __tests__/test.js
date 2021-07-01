"use strict";

const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator njk: prompting for site name", () => {
  const componentName = "dummy-site";
  let tempPath;

  beforeAll(() =>
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ appname: componentName })
      .then((result) => {
        tempPath = result.cwd;
      })
  );

  it("created base project files", () => {
    assert.file([
      `${tempPath}/${componentName}/README.md`,
      `${tempPath}/${componentName}/package.json`,
      `${tempPath}/${componentName}/package-lock.json`,
      `${tempPath}/${componentName}/Gulpfile.js`
    ]);
  });

  it("created base dot files", () => {
    assert.file([
      `${tempPath}/${componentName}/.editorconfig`,
      `${tempPath}/${componentName}/.gitattributes`,
      `${tempPath}/${componentName}/.gitignore`
    ]);
  });

  it("created folder structure", () => {
    assert.file([
      `${tempPath}/${componentName}/tests/`,
      `${tempPath}/${componentName}/app/`,
      `${tempPath}/${componentName}/app/pages/index.njk`,
      `${tempPath}/${componentName}/app/scss/main.scss`,
      `${tempPath}/${componentName}/app/static/favicon.ico`
    ]);
  });
});

describe("generator njk: give site name through arguments", () => {
  const componentName = "dummy-site";
  let tempPath;

  beforeAll(() =>
    helpers
      .run(path.join(__dirname, "../generators/app"))
      .withArguments(componentName)
      .then((result) => {
        tempPath = result.cwd;
      })
  );

  it("created project files and folders", () => {
    assert.file([
      `${tempPath}/${componentName}/Gulpfile.js`,
      `${tempPath}/${componentName}/.editorconfig`,
      `${tempPath}/${componentName}/app/data.json`,
      `${tempPath}/${componentName}/app/images/.gitkeep`
    ]);
  });
});
