// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const rp = require('request-promise');
const playlistCollection = db.collection('playlist')
const URL = 'http://musicapi.xiecheng.live/personalized'

const MAX_LIMIT = 10

// 云函数入口函数
exports.main = async (event, context) => {


  // 突破获取数据条数的限制
  const countResult = playlistCollection.count()
  const total = countResult.total
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    //                              从                  取多少
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  let list = {
    data: []
  }
  if (tasks.length > 0) {
    list = (await Promise.all(tasks)).reduce((acc, cur) => {
      return {
        data: acc.data.concat(cur.data)
      }
    })
  }

  // const list = await playlistCollection.get()
  // const playlist =  await rp(URL).then((res) => {
  //   return JSON.paser(res).result
  // })
  // console.log(playlist)

  // 去重
  // const newData = []
  // for (let i=0;i<playlistCollection.length;i++){
  //   let flag = true
  //   for (let j=0;j<list.data.length;j++){
  //     if (playlist[i].id===list.data[i].id){
  //       flag = false
  //       break
  //     }
  //   }
  //   if(flag){
  //     newData.push(playlist[i])
  //   }
  // }

  // 插入
  // for (let i=0;i<newData.length;i++){
  //   await playlistCollection.add({
  //     data: {
  //       ...playlist[i],
  //       createTime: db.serverDate(),
  //     }
  //   }).then((res)=>{
  //     console.log('插入成功')
  //   }).catch((err)=>{
  //     console.log('插入失败')
  //   })
  // }
  // return newData.length
}