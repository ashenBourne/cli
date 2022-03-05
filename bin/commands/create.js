import fs from "fs-extra";
import path from "path";
import consola from "./common.js"
import Inquires from "inquirer"
import Creator from "./Creator.js"
// 删除
function remove(path) {
    fs.remove(path, (err) => {
        if (err) {
            consola.error(err)
        }
    })

}
// 创建新项目:如果命令行里有--force之类的，跳过提示，强制覆盖
export default function createNewPorject(name, options) {
    let dirPath = path.join(process.cwd(), name)
    // 查看是否重名
    if (fs.existsSync(dirPath)) {
        if (options.force) {
            // 强制覆盖并重写
            remove(dirPath)
        } else {
            // 相比confirm，更喜欢用list
            Inquires.prompt([
                {
                    type: "list",
                    message: "是否覆盖该目录",
                    name: "choice",
                    choices: [
                        {
                            name: "覆盖",
                            value: true
                        }, {
                            name: "取消",
                            value: false
                        }
                    ]
                }
            ]).then(res => {
                if (res.choice) {
                    remove(dirPath)
                } else {
                    return
                }
            })
        }


    }
    const creator = new Creator(name, dirPath)
    creator.create()
}