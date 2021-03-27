const {Paging} = require("../utils/paging");
const {Http} = require("../utils/http");

class SpuPaging {
    static async getLatestPaging() {
        // 这里请求的是分页的数据，和 banner.js 不同
        return new Paging({url: `spu/latest`}, 5)
    }
}

export {
    SpuPaging
}