#! /usr/bin/env node
import { Command } from "commander"
import commitLint from "./commands/commit-lint.js"
import create from "./commands/create.js"

const program = new Command();
// 版本
program
    .version(`cli@ 1.0.2`)
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