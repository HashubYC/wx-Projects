// 业务对象
import {config} from "../config/config";

class Theme {
    static getHomeLocationA(callback) {
        wx.request({
            // url:"http://se.talelin.com/v1/theme/by/names?names=t-1",
            // url:"http://se.talelin.com/v1/theme/by/names",
            url: `${config.apiBaseUrl}theme/by/names`, // ES6模板字符串
            method: "GET",
            data: {
                names: 't-1'
            },
            header: {
                appkey: config.appkey
            },
            success: res => {
                console.log("res: ", res.data)
                callback(res.data) // 回调函数
                // this.setData({
                //     topTheme: res.data[0]
                // })
            }
        })
    }
}
export {
    Theme
}