// 业务对象
import {Http} from "../utils/http";

class Theme {
    static async getHomeLocationA() {
        return await Http.request({
            url: `theme/by/names`,
            data: {
                names: 't-1'
            },
            // callback: data => {
            //     console.log("model/theme.js: ", data)
            //     callback(data)
            // }
        })
    }
}

export {
    Theme
}