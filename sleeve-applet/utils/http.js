import {promisic} from "./util";

const {config} = require("../config/config");

class Http {
    static async request({url, data, callback, method = "GET"}) {
        // wx.request
        const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                appkey: config.appkey
            },
            // success(res) {
            //     callback(res.data)
            // }
        })
        return res.data
    }
}

// // wx.request
// // wx.request不要+()
// // 把一个函数当作参数传递到另一个函数
// // 动态类型的语言非常常见  java C# 需要委托
// promisic(wx.request)({ // 原来的wx.request传递什么参数，这个便传递什么参数
//     url: `${config.apiBaseUrl}${url}`,
//     data: data,
// })

export {
    Http
}