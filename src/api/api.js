// 发送具体的请求
import http from '@/api/http.js'
import {
    nowPlayingListUri,
    comingSoonListUri,
    moiveDetailUri,
    cityListUri
} from "@/config/url"

// 请求正在热映的列表数据
export const nowPlayingListData = (pageNum) => {
    // http.headers.info = "film";
  return http.get(nowPlayingListUri + pageNum)
}
//  请求即将上映的列表数据
export const comingSoonUriListData = (pageNum) => {
  return http.get(comingSoonListUri + pageNum)
}

// 请求电影详情数据
export const movieDetailData = (filmId) => {
  http.defaults.headers.info = "info";
  return http.get(moiveDetailUri + filmId)
}
//  获取城市列表的数据

export const cityListData = async() => {
  http.defaults.headers.info = "city";
  let ret = await http.get(cityListUri);
  //  定义基本的数据
  let cities = ret.data.data.cities;
  let codeList = []  // 存放 A-Z 的索引  （完整的26个字符）
  let dataList = []  // 存放城市信息
  let indexList = [] // 存放 A-Z 的索引 （经过筛选的字母）

  // 生成26个字母
  for(let i =  65 ; i <= 90; i++ ){
    codeList.push(String.fromCharCode(i))
  }
  //  开始处理数据
  codeList.forEach((element) => {
  // 与城市信息的pinyin 字段进行对比，筛选字符
    let tempArr = cities.filter((item) => element.toLowerCase() ==item.pinyin.substr(0,1))
    if( tempArr.length > 0 ){
        indexList.push(element)
        dataList.push({
          index: element,
          data: tempArr
        });
      }
    })
    return Promise.resolve([dataList,indexList])
}

