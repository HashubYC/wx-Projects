// components/progress-bar/progress-bar.js
let movableAreaWidth = 0; // 歌曲播放进度条宽度
let movableViewWidth = 0; // 歌曲圆点宽度
let backgroundAudioManager = wx.getBackgroundAudioManager()
let currentSec = -1; // 当前播放的秒数
let isMoving = false; // 用户是否拖拽进度条圆点 解决：当进度条拖动的时候和 updatatime 事件有冲突的问题
let duration = 0; // 储存歌曲总时长 ，以秒为单位

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /** 
   * 组件中的生命周期函数
   */
  lifetimes: {
    ready() {
      this._getMovableDis()
      this._bindBGMEvent()
    },
  },


  /*
   * 组件的初始数据
   */
  data: {
    showTime: {
      currentTime: '00:00',
      totalTime: '00:00',
    },
    movableDis: 0, // 移动的距离
    progress: 0, // 进度条移动的距离
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 进度条圆点移动事件
     */
    onChange(event) {
      // 拖动进度条的时候，event事件属性下的 source 属性会等于'touch'
      if (event.detail.source == 'touch') {
        // 注意：不是通过 setData 修改的值不会同步到页面 (只是在 this.data 上新增属性)
        this.data.progress = event.detail.x / (movableAreaWidth - movableViewWidth) * 100;
        this.data.movableDis = event.detail.x;
        isMoving = true;
      }
    },
    /**
     * 用户停止拖拽（松开进度条圆点）
     */
    onTouchEnd() {
      let currentTimeFmt = this._formatTime(backgroundAudioManager.currentTime);
      this.setData({
        progress: this.data.progress,
        movableDis: this.data.movableDis,
        ['showTime.currentTime']: `${ currentTimeFmt.min }:${ currentTimeFmt.sec }`
      });
      //设置音乐进度
      backgroundAudioManager.seek(this.data.progress * backgroundAudioManager.duration / 100);
      isMoving = false;
    },
    /**
     * 获取当前设备中的进度条及其进度条圆点的尺寸
     */
    _getMovableDis() {
      const query = this.createSelectorQuery() // 在compinents中，所以this。如果在pages中，用wx
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec((rect) => {
        console.log("进度条信息：", rect)
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
      })
    },

    _bindBGMEvent() {
      // 播放事件
      backgroundAudioManager.onPlay(() => {
        isMoving = false;
        // this.triggerEvent('musicPlay');
      });
      // 监听背景音频停止事件
      backgroundAudioManager.onStop(() => {
        console.log('onStop');
      });
      // 监听背景音频暂停事件
      backgroundAudioManager.onPause(() => {
        // this.triggerEvent('musicPause');
      });
      // 监听背景音频加载中事件
      backgroundAudioManager.onWaiting(() => {
        console.log('onWaiting')
      });
      // 监听背景音频进入可播放状态事件
      backgroundAudioManager.onCanplay(() => {
        if (typeof backgroundAudioManager.duration !== 'undefined') {
          this._durationTime();
        } else {
          // 定时器
          setTimeout(() => {
            this._durationTime();
          }, 1000);
        }
      });
      // 监听背景音频播放进度更新事件
      backgroundAudioManager.onTimeUpdate(() => {
        if (isMoving) return;

        const currentTime = backgroundAudioManager.currentTime;
        const duration = backgroundAudioManager.duration
        const sec = currentTime.toString().split('.')[0];
        // 性能优化 (因为onTimeUpdate事件每秒约执行4次，频繁的setData影响性能)
        if (sec != currentSec) {
          const currentTimeFmt = this._formatTime(currentTime); // 格式化时间
          this.setData({
            // 进度条圆点的位置更新
            movableDis: (movableAreaWidth - movableViewWidth) * currentTime / duration,
            // 进度条白色背景宽度更新
            progress: currentTime / duration * 100,
            // 设置当前播放的时间
            ['showTime.currentTime']: `${ currentTimeFmt.min }:${ currentTimeFmt.sec }`
          });
          currentSec = sec;
          // 联动歌词
          this.triggerEvent('timeUpdate-progress-bar', {
            currentTime  // event.detail.currentTime
          });
        }
      });
      // 监听背景音频自然播放结束事件
      backgroundAudioManager.onEnded(() => {
        // 触发事件 传给父组件
        this.triggerEvent('musicEnd');
      });
      // 监听背景音频播放错误事件
      backgroundAudioManager.onError((res) => {
        console.error(res.errMsg)
        console.error(res.errCode)
        wx.showToast({
          title: '错误：' + res.errCode,
        })
      });
    },

    /**
     * 获取音乐总时长，并调用时间格式化函数，把格式化后的字符串赋值给界面数据
     */
    _durationTime() {
      duration = backgroundAudioManager.duration
      // console.log('duration: ', duration)
      this.setData({
        ['showTime.totalTime']: `${ this._formatTime(duration).min }:${ this._formatTime(duration).sec }`
      });
    },
    /**
     * 格式化时间
     */
    _formatTime(times) {
      // 向下取整，获取分钟
      let min = Math.floor(times / 60);
      // 向下取余数,获取秒数
      let sec = Math.floor(times % 60);
      return {
        'min': this._parseZero(min),
        'sec': this._parseZero(sec)
      }
    },
    /**
     * 歌词时间（分）补零
     */
    _parseZero(sec) {
      // return sec < 10 ? `0${ sec }` : time;
      return sec < 10 ? '0' + sec : sec
    }
  }
})