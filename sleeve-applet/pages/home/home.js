// pages/home/home.js
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    bannerB: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: async function (options) {
      // 改写为 ES6 形式
  async onLoad(options) {
    // Theme.getHomeLocationA 会直接返回一个结果
    // const data = await Theme.getHomeLocationA(
        // data => {
      // this.setData({
      //   topTheme: data[0]
      // })
    // }

    // )
    // console.log("home/home.js: data：", data)
    // this.setData({
    //   topTheme: data[0]
    // })
    await this.initAllData()
  },

  // ES6 的写法
  async initAllData() {
    const themeA = await Theme.getHomeLocationA()
    const bannerB = await Banner.getHomeLocationB()
    this.setData({
      themeA: themeA[0],
      bannerB,
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})