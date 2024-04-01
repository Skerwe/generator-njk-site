import helpers from "yeoman-test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("generator-njk-site test", () => {
  const componentName = "dummy-site";
  let runResult;

  describe("generator njk: prompting for site name", () => {
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/app"), {}, {})
        .withAnswers({ appname: componentName })
        .run();
    });

    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });

    it("created base project files", () => {
      runResult.assertFile(`${componentName}/README.md`);
      runResult.assertFile(`${componentName}/package.json`);
      runResult.assertFile(`${componentName}/package-lock.json`);
      runResult.assertFile(`${componentName}/Gulpfile.js`);
    });

    it("created base dot files", () => {
      runResult.assertFile(`${componentName}/.editorconfig`);
      runResult.assertFile(`${componentName}/.gitattributes`);
      runResult.assertFile(`${componentName}/.gitignore`);
    });

    it("created folder structure", () => {
      runResult.assertFile(`${componentName}/tests/index.test.js`);
      runResult.assertFile(`${componentName}/app/data.json`);
      runResult.assertFile(`${componentName}/app/pages/index.njk`);
      runResult.assertFile(`${componentName}/app/scss/main.scss`);
      runResult.assertFile(`${componentName}/app/static/favicon.ico`);
    });
  });

  describe("generator njk: give site name through arguments", () => {
    beforeEach(async () => {
      runResult = await helpers
        .create(path.join(__dirname, "../generators/app"), {}, {})
        .withArguments(componentName)
        .run();
    });

    afterEach(() => {
      if (runResult) {
        runResult.restore();
      }
    });

    it("created project files and folders", () => {
      runResult.assertFile(`${componentName}/Gulpfile.js`);
      runResult.assertFile(`${componentName}/.editorconfig`);
      runResult.assertFile(`${componentName}/app/data.json`);
      runResult.assertFile(`${componentName}/app/images/.gitkeep`);
    });
  });
});
