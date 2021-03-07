// pages/musiclist/musiclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trackIds: [],
    tracks: [],
    listInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("pages/musiclist.js options: ", options)
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        playlistId: options.playlistId,
        $url: 'musiclist'
      }
    }).then((res) => {
      console.log("pages/musiclist.js musiclist: ", res)
      const pl = res.result.playlist
      this.setData({
        trackIds: res.result.playlist.trackIds,
        tracks: res.result.playlist.tracks,
        listInfo: {
          coverImgUrl: pl.coverImgUrl,
          name: pl.name,
          description: pl.description,
          createTime: pl.createTime,
          tags: pl.tags
        }
      })
      this._setMusiclist()
      wx.hideLoading()
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

  },


  _setMusiclist() {
    wx.setStorageSync('musiclist', this.data.tracks)
  },
})