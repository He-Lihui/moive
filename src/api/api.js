// 发送具体的请求
import http from '@/api/http.js'
import {
    nowPlayingListUri,
    comingSoonListUri,
    moiveDetailUri
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

