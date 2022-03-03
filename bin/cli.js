const Command =require("commander").Command
const commitLint= require("./commands/commit-lint.js") 

const program = new Command();

program
    .version(`cli@ ${require("../package.json").version}`)
    .description("查看版本")
program
    .command('commit-lint <gitParams>')
    .description('Lint commit message')
    .action(commitLint);

program.parse();