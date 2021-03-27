// pages/home/home.js
import { Theme } from '../../model/theme'
import { Banner } from '../../model/banner'
import { Category } from '../../model/category'
import { Activity } from '../../model/activity'
import { SpuPaging } from '../../model/spu-paging'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    bannerB: null,
    grid: [],
    activityD: null,
    spuPaging: null,
    loadingType: 'loading',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: async function (options) {
  // 改写为 ES6 形式
  async onLoad (options) {
    await this.initAllData()
    await this.initBottomSpuList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const data = await this.data.spuPaging.getMoreData()
    if (!data) {
      return
    }
    wx.lin.renderWaterFlow(data.items)
    // 判断是否触底
    if(!data.moreData){
      this.setData({
        loadingType: 'end' // 只能是end/loading
      })
    }
  },

  // 瀑布流
  async initBottomSpuList () {
    const paging = await SpuPaging.getLatestPaging()
    this.data.spuPaging = paging

    const data = await paging.getMoreData() // 必须加await
    if (!data) {
      return
    }
    // 将数据传递到 瀑布流
    wx.lin.renderWaterFlow(data.items)
  },

  // ES6 的写法
  async initAllData () {
    // // const themeA = await Theme.getHomeLocationA()

    // const themes = await Theme.getThemes()
    // 无需for循环，find，函数式编程
    // const themeA = themes.find(t => t.name === 't-1')

    const theme = new Theme()
    await theme.getThemes()

    const themeA = await theme.getHomeLocationA()
    const themeE = await theme.getHomeLocationE()

    let themeESpu = []
    if (themeE.online) {
      // 静态使用 Theme
      // 需要+await
      // 此处必须加await，根据getHomeLocationESpu() 的函数调用一步一步递推，可知Http中有async
      const data = await Theme.getHomeLocationESpu()
      if (data) {
        themeESpu = data.spu_list.slice(0, 8) // 截取数据
      }
    }

    const themeF = await theme.getHomeLocationF()

    const bannerB = await Banner.getHomeLocationB()
    const grid = await Category.getHomeLocationC()
    const activityD = await Activity.getHomeLocationD()

    const bannerG = await Banner.getHomeLocationG()

    const themeH = theme.getHomeLocationH()

    this.setData({
      // themeA: themeA[0],
      // themeA: themeA,
      themeA,
      bannerB,
      grid,
      activityD,
      themeE,
      themeESpu,
      themeF,
      bannerG,
      themeH,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})