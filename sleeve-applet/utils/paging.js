import {Http} from "./http";
import boolean from "../miniprogram_npm/lin-ui/common/async-validator/validator/boolean";

class Paging {
    // 需要数据时，不关心细节
    // 需要保存状态
    // 因此需要使用实例化对象
    // new Paging

    start
    count
    req
    locker = false // 默认打开
    url
    moreData = true // 会先判断
    accumulator = []

    constructor(req, count = 10, start = 0) {
        this.start = start
        this.count = count
        // this.url = url
        this.req = req
        this.url = req.url // 最原始的url
    }

    async getMoreData() {
        if (!this.moreData) {
            return
        }
        // 发送数据之前先检测 数据锁，是否开启
        if (!this._getLocker()) {
            return
        }
        // 等待解锁，使用await
        const data = await this._actualGetData()
        this._releaseLocker()
        return data
    }

    async _actualGetData() {
        const req = this._getCurrentReq()
        let paging = await Http.request(req)
        if (!paging) {
            return null
        }
        if (paging.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: [] // 累加器
            }
        }
        // 可能其他地方会用到
        this.moreData = Paging._moreData(paging.total_page, paging.page)
        if (this.moreData) {
            this.start += this.count
        }

        this._accumulate(paging.items)
        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator // 累加器
        }
        // return {
        //     empty: boolean,
        //     items: [],
        //     moreData: boolean,
        //     accumulator: [] // 累加器
        // }
    }

    _accumulate(items) {
        this.accumulator = this.accumulator.concat(items)
    }

    static _moreData(totalPage, pageNum) { // moreData 的判断
        return pageNum < totalPage - 1
    }

    _getCurrentReq() {
        // 防止修改req
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        // url = v1/spu/latest + '?' + params
        // url = v1/spu/latest?other=abc.js + '&' + params
        // if (url.indexOf('?') !== -1) {
        if (url.includes('?')) {
            url += '&' + params
        } else {
            url += '?' + params
        }
        this.req.url = url
        return this.req
    }

    _getLocker() {
        if (this.locker) { // true 为锁住了
            return false
        }
        this.locker = true
        return true
    }

    _releaseLocker() {
        this.locker = false
    }
}

export {
    Paging
}