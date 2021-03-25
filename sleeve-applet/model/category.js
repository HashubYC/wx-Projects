const {Http} = require("../utils/http");

class Category {
    static async getGridCategory() {
        return await Http.request({
            url: `category/grid/all`,
        })
    }
}

export {
    Category
}