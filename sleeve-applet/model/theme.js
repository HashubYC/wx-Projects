// 业务对象
import {Http} from "../utils/http";

class Theme {
    static locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'

    // 实例属性
    themes = []

    // static async getThemes() {
    async getThemes() {
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        // return await Http.request({
        this.themes = await Http.request({
            url: `theme/by/names`,
            data: {
                names
            }
        })
    }

    // 实例方法
    async getHomeLocationA() {
        // 无需for循环，find，函数式编程
        return this.themes.find(t => t.name === Theme.locationA)
    }

    async getHomeLocationE() {
        return this.themes.find(t => t.name === Theme.locationE)
    }

    async getHomeLocationF() {
        return this.themes.find(t => t.name === Theme.locationF)
    }

    getHomeLocationH() {
        return this.themes.find(t => t.name === Theme.locationH)
    }

    // 不需要加 await
    static getHomeLocationESpu() {
        return Theme.getThemeSpuByName(Theme.locationE)
    }
    // 不需要加 await
    static getThemeSpuByName(name) {
        return Http.request({
            url: `theme/name/${name}/with_spu`,
        })
    }






    // static async getHomeLocationA() {
    //     return await Http.request({
    //         url: `theme/by/names`,
    //         data: {
    //             names: Theme.locationA
    //         },
    //         // callback: data => {
    //         //     console.log("model/theme.js: ", data)
    //         //     callback(data)
    //         // }
    //     })
    // }

    // static async getHomeLocationE() {
    //     return await Http.request({
    //         url: `theme/by/names`,
    //         data: {
    //             names: Theme.locationE
    //         }
    //     })
    // }
}

export {
    Theme
}