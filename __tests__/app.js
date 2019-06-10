"use strict";

const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator game: prompting for appname", () => {
  const componentName = "dummy-site";
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ appname: componentName });
  });

  it("created base project files", () => {
    assert.file(`${componentName}/README.md`);
    assert.file(`${componentName}/package.json`);
    assert.file(`${componentName}/Gulpfile.js`);
  });

  it("created base dot files", () => {
    assert.file(`${componentName}/.editorconfig`);
  });

  it("created folder structure", () => {
    assert.file(`${componentName}/app/`);
    assert.file(`${componentName}/app/pages/index.html`);
    assert.file(`${componentName}/app/scss/main.scss`);
    assert.file(`${componentName}/app/static/favicon.ico`);
  });
});

describe("generator game: give appname through arguments", () => {
  const componentName = "dummy-site";
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withArguments(componentName);
  });

  it("created project files and folders", () => {
    assert.file(`${componentName}/Gulpfile.js`);
    assert.file(`${componentName}/.editorconfig`);
    assert.file(`${componentName}/app/data.json`);
    assert.file(`${componentName}/app/images/.gitkeep`);
  });
});
