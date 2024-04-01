import Generator from "yeoman-generator";
import chalk from "chalk";
import yosay from "yosay";

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("appname", { type: String, required: false });
  }

  prompting() {
    this.log(
      yosay(`
        Welcome to the ${chalk.blue("Nunjucks and SASS with Gulp")} ${chalk.red(
        "static site"
      )} generator!`)
    );

    if (this.options.appname) {
      return;
    }

    const prompts = [
      {
        type: "input",
        name: "appname",
        message: "What is the project name?",
        default: "generic-site"
      }
    ];

    return this.prompt(prompts).then((props) => {
      this.options.appname = props.appname;
    });
  }

  writing() {
    this.log("Generating project structure ...");

    this.fs.copy(
      this.templatePath("**/.*"),
      this.destinationPath(this.options.appname),
      {
        onlyFiles: false,
        deep: true,
        dot: false,
        unique: true
      }
    );

    this.fs.copy(
      this.templatePath(),
      this.destinationPath(this.options.appname)
    );
  }

  end() {
    this.log(
      `Project ${chalk.red(
        this.options.appname
      )} completed. Thank you for using this generator. Good bye :)`
    );
  }
}
