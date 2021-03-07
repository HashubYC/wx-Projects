// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const rp = require('request-promise')

const BASE_URL = 'https://netease-cloud-music-api-woad.vercel.app'

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const app = new TcbRouter({
    event
  })
  app.router('playlist', async (ctx, next) => {
    ctx.body = await cloud.database().collection('playlist')
      .skip(event.start)
      .limit(event.count)
      .orderBy('createTime', 'asc') // asc 可使用desc查看最新
      .get()
      .then((res) => {
        return res
      })
  })

  app.router('musiclist', async (ctx, next) => {
    rp(BASE_URL + '/login?email=hua1055757507@163.com&password=hua19990919')
    ctx.body = await rp(BASE_URL + '/playlist/detail?id=' + parseInt(event.playlistId))
      .then((res) => {
        return JSON.parse(res)
      })
  })

  app.router('musicUrl01', async (ctx, next) => {
    // 大部分音乐没有url播放地址，可听vip
    ctx.body = await rp(BASE_URL + `/song/url?id=${event.musicId}`).then((res) => {
      return res
    })
  })

  app.router('musicUrl02', async (ctx, next) => {
    let musicUrl_test = 'https://music.163.com/song/media/outer/url?id=' + event.musicId + '.mp3'
    ctx.body = musicUrl_test
  })

  app.router('lyric', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + '/lyric?id=' + event.musicId).then((res) => {
      return res
    })
  })

  // app.router('trackIds', async (ctx, next) => {
  //   const tasks = []
  //   event.trackIds.forEach(element => {
  //       let promise = await rp(BASE_URL + '/song/detail?ids=' + parseInt(element))
  //       tasks.push(promise)
  //     }
  //   let musiclist = {
  //     data: []
  //   }
  //   if (tasks.length > 0) {
  //     list = (await Promise.all(tasks)).reduce((acc, cur) => {
  //       return {
  //         data: acc.data.concat(cur.data)
  //       }
  //     })
  //   }
  // })

  return app.serve()
}