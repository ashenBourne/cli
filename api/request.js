import axios from "axios"
axios.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data
    } else {

        Promise.reject(res)
    }
    return res
}, error => {
    return Promise.reject(error)
})
// 获取所有仓库
export function getRepos() {
    return axios.get("https://api.github.com/users/ashenBourne/repos")
}
// 获取tag
export function getTag(repo) {
    return axios.get(`https://api.github.com/repos/ashenBourne/${repo}/tags`)
}

export default {
    getRepos
}
