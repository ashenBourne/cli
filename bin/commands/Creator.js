import { getRepos, getTag } from "../../api/request.js"
import Inquires from "inquirer"
import ora from "ora"
import downLoadGitFile from "download-git-repo"
import util from "util"
import path from "path"

// 暂停
async function sleep(time) {
    return new Promise((resolve, reject) => {
        return setTimeout(resolve, time);
    })
}
// 构建loading
async function createLoading(fn, message, arg) {
    const spinner = ora(message)
    spinner.start()
    // 如果失败了，重新开始
    try {
        let res = arg ? await fn(...arg) : await fn()
        spinner.succeed()
        return res
    } catch (error) {
        console.log(error)
        spinner.fail("抓取失败，重亲抓取")
        await sleep(2000)
        return createLoading(fn, message, arg)
    }
}
// async function createLoading2(fn, message, arg) {
//     const spinner = ora(message)
//     spinner.start()
//     // 如果失败了，重新开始
//     try {
//         let res = arg ? await fn(...arg) : await fn()
//         spinner.succeed()
//         return res
//     } catch (error) {
//         console.log(error)
//         spinner.fail("抓取失败，重亲抓取")
//         await sleep(2000)
//         return createLoading(fn, message)
//     }
// }
class Creator {
    constructor(name, dirPath) {
        this.name = name
        this.dirPath = dirPath
        // 下载promise
        this.downLoadPromise = util.promisify(downLoadGitFile)
    }
    // 获取仓库
    async fetchRepos() {
        let res = await createLoading(getRepos, "正在抓取远程仓库……")
        if (!res) return
        let names = res.map(item => item.name)
        let { choise } = await Inquires.prompt([
            {
                name: "choise",
                type: "list",
                message: "请选择仓库",
                choices: names
            }
        ])
        console.log("选择仓库为：" + choise)
        return choise
    }
    async fetchTag(repo) {
        let tags = await createLoading(getTag, "正在获取tag列表", [repo])
        let names = tags.map(item => item.name)
        let { choise } = await Inquires.prompt([
            {
                name: "choise",
                type: "list",
                message: "请选择tag",
                choices: names
            }
        ])
        console.log("选择tag为：" + choise)
        return choise
    }
    async download(repo, tag) {
        let requestPath = `ashenBourne/${repo}${tag ? '#' + tag : ''}`
        // let localPath = path.join(process.cwd(), `${this.name}@${tag}`)
        // console.log(this.dirPath);
        let res = await createLoading(this.downLoadPromise, "正在下载模板", [requestPath, this.dirPath])
        // this.downLoadPromise(requestPath, this.dirPath)
        return res

    }
    async create() {
        // 1、获取仓库
        let repo = await this.fetchRepos()
        // 2、获取tag
        let tag = await this.fetchTag(repo)
        // 3、下载创建
        this.download(repo, tag)
    }
}
export default Creator