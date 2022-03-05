import { Command } from "commander"
import commitLint from "./commands/commit-lint.js"
import create from "./commands/create.js"
import fs from "fs"
import path from "path"

let res = fs.readFileSync(path.join(process.cwd(), '/package.json'), 'utf-8')
let info = JSON.parse(res)
const program = new Command();
// 版本
program
    .version(`cli@ ${info.version}`)
    .usage(`<command> [options]`)

// 创建项目
program
    .command(`create <project-name>`)
    .description("创建一个新项目")
    .option('-F,--force', '覆盖')
    .action(create)


//  commit提交格式化验证 
program
    .command('commit-lint <gitParams>')
    .description('Lint commit message')
    .action(commitLint);

program.parse();