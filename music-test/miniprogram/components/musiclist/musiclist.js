// components/musiclist/musiclist.js
Component({
  /**
   * 组件的属性列表
   * 调用组件时传递的
   */
  properties: {
    trackIds: Array,
    tracks: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingId: -1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event) {
      // 事件源 事件处理函数 事件对象 事件类型
      console.log("点击歌曲： ", event.currentTarget.dataset)
      const ds = event.currentTarget.dataset
      this.setData({
        playingId: ds.musicId
      })
      // 个人： 点击事件跳转 使用wx.navigateTo
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${ds.musicId}&index=${ds.index}`,
      })
    }
    // from_trackIds_to_get() {
    //   wx.navigateTo({
    //     url: `../../pages/musiclist/musiclist?playlistId=${this.properties.trackIds.id}`,
    //   })
    // }
  }
})