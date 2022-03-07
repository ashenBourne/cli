#! /usr/bin/env node

import { Command } from "commander"
import consola from "consola"
const program = new Command();
program
    .version(`cli@ 1.0.4`)
    .usage(`<command> [options]`)
program
    .command("show <option>")
    .option("-C,--ctrl", "指定ctrl")
    .action((options) => {
        consola.info("执行下此命令")
        consola.info(options)
    })