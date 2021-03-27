const {Http} = require("../utils/http");

class Category {
    // static async getGridCategory() {
    static async getHomeLocationC() {
        return await Http.request({
            url: `category/grid/all`,
        })
    }
}

export {
    Category
}