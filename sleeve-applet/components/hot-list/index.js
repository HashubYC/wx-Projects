// components/hot-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banner: Object,
  },

  /**
   * 组件数据字段监听器，用于监听 properties 和 data 的变化
   * 接收的是Object对象
   */
  observers: {
    'banner': function (banner) {
      if (!banner) {return}
      if(banner.items.length === 0) {return}
      const left = banner.items.find(i => i.name === 'left')
      const rightTop = banner.items.find(i => i.name === 'right-top')
      const rightBottom = banner.items.find(i => i.name === 'right-bottom')
      // 数据绑定
      this.setData({
        left,
        rightTop,
        rightBottom,
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
